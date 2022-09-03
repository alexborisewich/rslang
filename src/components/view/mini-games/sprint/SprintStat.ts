import { Dictionary } from '../../../../common/interface/interface';
import store from '../../../../store/store';
import api from '../../../api/api';

export default class SprintStat {
  state = store.getState().sprint;

  createElement() {
    return `<div class="sprint__finish-container">
    <h3 class="sprint__finish-title">Ваш результат: ${this.state.score} очков</h3>
    <h4 class="sprint__finish-title"> Длина серии: ${this.state.maxStreak} </h4>
    <div class="sprint__answers-counters">
    <span class="sprint__answers-right">Знаю:
      <span class="sprint__correct-count">${this.state.correct.length}</span>
    </span>
    <span class="sprint__answers-wrong">Не знаю:
      <span class="sprint__wrong-count">${this.state.wrong.length}</span>
    </span>
    </div>
    <hr/>
    <table class="sprint__finish-statistic">
      <tbody class ="tbody-items">
    <tr>
    <td colspan="4" style ="text-align: center; background-color:#9acd32">Верно</td>
    </tr>
    ${this.state.correct
      .map((word: Dictionary) => {
        return `<tr>
        <td class="sprint__finish-audio-btn" id="finish-audio-btn">&#128265;
        <audio src="${api.baseApi}${word.audio}" preload ="auto"></audio></td>
        <td>${word.word}</td>
        <td>${word.transcription}</td>
        <td>${word.wordTranslate}</td>
      </tr>`;
      })
      .join('')}
    <tr>
    <td colspan="4" style = "text-align: center; background-color:#FF7F50">Не верно</td>
    </tr>
    ${this.state.wrong
      .map((word: Dictionary) => {
        return `<tr>
        <td class="sprint__finish-audio-btn" id="finish-audio-btn">&#128265;
        <audio src="${api.baseApi}${word.audio}" preload ="auto"></audio></td>
        <td>${word.word}</td>
        <td>${word.transcription}</td>
        <td>${word.wordTranslate}</td>
      </tr>`;
      })
      .join('')}
      </tbody>
    </table>
    <button class="sprint__exit-btn btn" id="close-sprint-stat">Выйти</button>
  </div>`;
  }
}
