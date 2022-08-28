import { Dictionary } from '../../../common/interface/interface';
import store from '../../../store/store';

export default class SprintController {
  state = store.getState().sprint;

  startGame() {
    const question = this.getRandomWord(this.state.words);
    const answer = Math.random() > 0.5 ? question.wordTranslate : this.getRandomWord(this.state.words).wordTranslate;
    // store.dispatch(setQuestion(question));
  }

  finishGame() {}

  getRandomWord = (array: Dictionary[]) => {
    const idx = Math.floor(Math.random() * array.length);
    return array[idx];
  };
}
