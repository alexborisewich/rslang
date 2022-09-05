import { Dictionary } from '../../../common/interface/interface';
import { switchTab } from '../../../store/reducers/app/appReducer';
import {
  checkUserAnswer,
  getSprintData,
  init,
  setRoundState,
  showSprintStat,
  switchGameStatus,
  toggleFullscreen,
} from '../../../store/reducers/sprint/sprintReducer';
import { sendStat } from '../../../store/reducers/user/userReducer';
import store from '../../../store/store';

class SprintController {
  sprintState = store.getState().sprint;

  time = this.sprintState.time;

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
    this.time = this.sprintState.time;
  }

  getUserAnswer(answer: boolean) {
    store.dispatch(checkUserAnswer(answer));
    this.startRound();
  }

  finishGame() {
    store.dispatch(switchGameStatus(false));
    store.dispatch(showSprintStat(true));
    this.stopTimer(this.interval);

    const { userId, token, statistic, isLoggedOn } = store.getState().user;
    const { correct, score } = store.getState().sprint;
    console.log(isLoggedOn);
    if (isLoggedOn) {
      const stat = {
        ...statistic,
        optional: {
          ...statistic.optional,
          sprint: {
            ...statistic.optional.sprint,
            finished: statistic.optional.sprint.finished + 1,
            totalScore: statistic.optional.sprint.totalScore + score,
            totalCorrect: +statistic.optional.sprint.totalCorrect + correct.length,
          },
        },
      };
      console.log(stat.optional.sprint.finished);
      store.dispatch(sendStat({ userId, token, statistic: stat }));
    }
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

  toggleFullscreen(container: HTMLBodyElement) {
    if (!document.fullscreenElement) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    store.dispatch(toggleFullscreen());
  }
}

export default new SprintController();
