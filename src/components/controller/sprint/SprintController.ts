import { Dictionary } from '../../../common/interface/interface';
import { switchTab } from '../../../store/reducers/app/appReducer';
import {
  getSprintData,
  init,
  setRoundState,
  showSprintStat,
  switchGameStatus,
} from '../../../store/reducers/sprint/sprintReducer';
import store from '../../../store/store';

class SprintController {
  state = store.getState().sprint;

  time = this.state.time;

  interval = 0;

  startGame() {
    const { group, page } = store.getState().sprint;
    this.stopTimer(this.interval);
    store.dispatch(init());
    store.dispatch(getSprintData({ group, page })).then(() => {
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
      if (this.time === 1) this.finishGame();
      const { time } = store.getState().sprint;
      if (time === 1) this.finishGame();
    }, 1000);
    return +interval;
  }

  stopTimer(id: number) {
    clearInterval(id);
    this.time = this.state.time;
  }

  getUserAnswer(answer: boolean) {
    store.dispatch(getSprintData({ group: this.state.group, page: this.state.page })).then(() => {
      store.dispatch(switchGameStatus(true));
      this.startRound();
    });
  }

  finishGame() {
    console.log('game is finished');
    store.dispatch(switchGameStatus(false));
    store.dispatch(showSprintStat(true));
    this.stopTimer(this.interval);
  }

  backToGames() {
    this.stopTimer(this.interval);
    store.dispatch(switchTab('games'));
    this.stopTimer(this.interval);
    this.showStatistic();
  }

  showStatistic() {}

  closeGame() {
    this.stopTimer(this.interval);
    store.dispatch(switchTab('homepage'));
  }

  getRandomWord = (array: Dictionary[]) => {
    const idx = Math.floor(Math.random() * array.length);
    return array[idx];
  };
}

export default new SprintController();
