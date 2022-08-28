import { Dictionary } from '../../../common/interface/interface';
import {
  checkUserAnswer,
  getSprintData,
  init,
  setRoundState,
  switchGameStatus,
} from '../../../store/reducers/sprint/sprintReducer';
import store from '../../../store/store';

class SprintController {
  state = store.getState().sprint;

  time = this.state.time;

  interval = 0;

  startGame() {
    this.stopTimer(this.interval);
    store.dispatch(init());
    store.dispatch(getSprintData({ group: this.state.group, page: this.state.page })).then(() => {
      store.dispatch(switchGameStatus(true));
      this.interval = this.startTimer();
      this.startRound();
    });
  }

  startRound() {
    const { words } = store.getState().sprint;
    if (words.length) {
      const question = this.getRandomWord(words);
      const answer = Math.random() > 0.5 ? question : this.getRandomWord(words);
      store.dispatch(setRoundState({ question, answer }));
    } else this.finishGame();
  }

  startTimer() {
    const interval = setInterval(() => {
      this.time -= 1;
      const div = document.querySelector('.sprint__timer') as HTMLDivElement;
      div.textContent = `${this.time}`;
      //   store.dispatch(tick());
      if (this.time === 1) this.finishGame();
    }, 1000);
    return +interval;
  }

  stopTimer(id: number) {
    clearInterval(id);
    this.time = this.state.time;
  }

  getUserAnswer(answer: boolean) {
    store.dispatch(checkUserAnswer(answer));
    this.startRound();
  }

  finishGame() {
    console.log('game is finished');
    store.dispatch(switchGameStatus(false));
    this.stopTimer(this.interval);
    this.showStatistic();
  }

  showStatistic() {}

  backToGames() {
    this.stopTimer(this.interval);
  }

  closeGame() {
    this.stopTimer(this.interval);
  }

  getRandomWord = (array: Dictionary[]) => {
    const idx = Math.floor(Math.random() * array.length);
    return array[idx];
  };
}

export default new SprintController();
