import { Dictionary } from '../../../common/interface/interface';
import { switchTab } from '../../../store/reducers/app/appReducer';
import {
  checkUserAnswer,
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
    store.dispatch(checkUserAnswer(answer));
    this.startRound();
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

// answerResult.innerHTML = `<div class="games__finish-container">
//             <h3 class="games__finish-title">Ваш результат: ${score} очков</h3>
//             <h4 class="games__finish-title"> Длина серии: ${series} </h4>
//             <div class="games__answers-counters">
//             <span class="games__answers-right">Знаю:
//               <span class="games__correct-count">${correctList.length}</span>
//             </span>
//             <span class="games__answers-wrong">Не знаю:
//               <span class="games__wrong-count">${errorList.length}</span>
//             </span>
//             </div>
//             <table class="games__finish-statistic">
//               <thead>
//                 <tr>
//                   <th>1</th>
//                   <th>2</th>
//                   <th>3</th>
//                 </tr>
//               </thead>
//               <tbody class = "tbody-items">
//               <tr>
//               <td>англ. слово</td>
//               <td>[]</td>
//               <td>рус. слово</td>
//             </tr>
//             <tr>
//             <td colspan="3" style = "text-align: center; background-color:#00FF00"> Изученные</td>
//             </tr>
//             ${correctList.map((word: WordDictionary) => {
//               return `<tr>
//                 <td>${word.word}</td>
//                 <td>${word.transcription}</td>
//                 <td>${word.wordTranslate}</td>
//               </tr>`;
//             })}
//             <tr>
//             <td colspan="3" style = "text-align: center; background-color:#FF0000"> Не изученные</td>
//             </tr>
//             ${errorList.map((word: WordDictionary) => {
//               return `<tr>
//                 <td>${word.word}</td>
//                 <td>${word.transcription}</td>
//                 <td>${word.wordTranslate}</td>
//               </tr>`;
//             })}
//               </tbody>
//             </table>
//             <button class="games__exit-btn btn">Выйти</button>
//           </div>`;
//             answerResult.style.display = 'flex';
//             document.querySelector('.games__exit-btn')?.addEventListener('click', function () {
//               answerResult.style.display = 'none';
