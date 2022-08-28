import { Dictionary } from '../../../common/interface/interface';
import {
  checkUserAnswer,
  getSprintData,
  setRoundState,
  switchGameStatus,
} from '../../../store/reducers/sprint/sprintReducer';
import store from '../../../store/store';

export default class SprintController {
  state = store.getState().sprint;

  startGame() {
    store.dispatch(getSprintData({ group: this.state.group, page: this.state.page })).then(() => {
      store.dispatch(switchGameStatus(true));
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

  setUserAnswer(answer: boolean) {
    store.dispatch(checkUserAnswer(answer));
    this.startRound();
  }

  finishGame() {
    console.log('game is finished');
    store.dispatch(switchGameStatus(false));
  }

  getRandomWord = (array: Dictionary[]) => {
    const idx = Math.floor(Math.random() * array.length);
    return array[idx];
  };
}
