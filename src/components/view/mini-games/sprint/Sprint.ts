import store from '../../../../store/store';
import sprintController from '../../../controller/sprint/SprintController';
import SprintStat from './SprintStat';

export default class Sprint {
  sprintState = store.getState().sprint;

  createElement() {
    return `<section class="sprint">
    ${this.sprintState.showStat ? new SprintStat().createElement() : ''}
      <div class="sprint__game">
      <div class="sprint__btn-wpapper">
          <button class="sprint__sound-btn">Звук</button>
          <button class="sprint__screen-btn">На весь экран</button>
          <button class="sprint__close-btn" id="close-sprint-game">&#9587</button>
      </div>
      <div class = "sprint__body">
      <div class="sprint__interface ${this.sprintState.isStarted ? '' : 'hidden'}">
      <div class = "sprint__header">
          <div class = "sprint__score">${this.sprintState.score}</div>
          <div class = "sprint__timer">${sprintController.time}</div>
      </div>
  
      <div class = "sprint__word">${this.sprintState.roundState.question?.word}</div>
      <div class = "sprint__translate">${this.sprintState.roundState.answer?.wordTranslate}</div>
      <div class = "sprint__answer">
          <button class = "sprint__answer-btn sprint__answer-btn-false" id="sprint-answer-false">&#10008</button>
          <button class = "sprint__answer-btn sprint__answer-btn-true" id="sprint-answer-true">&#10004</button>
      </div>
      </div>
      
      <div class = "sprint__back">
      <button class = "sprint__back-to-new-game" id="sprint-new-game">Новая игра</button>
      <button class = "sprint__back-to-list-games" id="back-to-games">К списку игр</button>
      </div>
    </div>
    <div class="games__finish">
  
    </div>
      </div>
    </section>`;
  }
}
