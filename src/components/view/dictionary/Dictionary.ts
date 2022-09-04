import store from '../../../store/store';

export default class Dictionary {
  dictionaryState = store.getState().dictionary;

  userState = store.getState().user;

  words = this.dictionaryState.activeTab === 'all' ? this.dictionaryState.words : this.userState.statistic.complexWords;

  private renderWords() {
    return this.words
      .map((word) => {
        return `<div class="textbook__word
        ${word.id === this.dictionaryState.selectedWord ? 'textbook__word--active' : ''}
        ${this.userState.statistic.complexWords.some((el) => el.id === word.id) ? 'textbook__word--complex' : ''}
        ${this.userState.statistic.learnedWords.some((el) => el.id === word.id) ? 'textbook__word--learned' : ''}
        ${
          this.userState.statistic.complexWords.some((el) => el.id === word.id) &&
          this.userState.statistic.learnedWords.some((el) => el.id === word.id)
            ? 'textbook__word--complex-and-learned'
            : ''
        }
        textbook__word--group-${word.group}"
        id=${word.id}>
            <span class="word__text">${word.word}</span>
            <span class="word__text">${word.wordTranslate}</span>
          </div>`;
      })
      .join('');
  }

  private renderCard() {
    const selected = this.words.find((word) => word.id === this.dictionaryState.selectedWord);
    if (!selected) return '';
    return `<div class="textbook__card card textbook__card--group-${this.dictionaryState.group}">
    <img class="card__img" src='https://rslang-172.herokuapp.com/${selected.image}'/>
    <div class="card__content">
      <div class="card__main">
        <h2 class="card__word">${selected.word}</h2>
        <h3 class="card__translate">${selected.wordTranslate}</h3>
        <span class="card__transcription">${selected.transcription}</span>
        <div class="card__buttons">
         <button class="card__play btn" type="button" id="play-audio-btn"
         ${this.dictionaryState.isPlaying ? 'disabled' : ''}>Воспроизвести</button>
         <div class="card__user-buttons ${this.userState.isLoggedOn ? '' : 'hidden'}">
         <button class="card__btn-set-complex btn
         ${this.userState.statistic.complexWords.some((word) => word.id === selected.id) ? 'hidden' : ''}
         " id="add-complex">Добавить в сложные</button>
         <button class="card__btn-set-complex btn
         ${!this.userState.statistic.complexWords.some((word) => word.id === selected.id) ? 'hidden' : ''}
         " id="delete-complex">Удалить из сложных</button>
         <button class="card__btn-set-learned btn
         ${this.userState.statistic.learnedWords.some((word) => word.id === selected.id) ? 'hidden' : ''}
         " id="add-learned">Изучено</button>
         <button class="card__btn-set-learned btn
         ${!this.userState.statistic.learnedWords.some((word) => word.id === selected.id) ? 'hidden' : ''}

         " id="delete-learned">Удалить из изученных</button>
         </div>
        </div>
      </div>
      <div class="card-description">
        <h4 class="card__mean card-subtitle">Значение</h3>
          <p>${selected.textMeaning}</p>
          <p>${selected.textMeaningTranslate}</p>
          <h4 class="card__example card-subtitle">Пример</h3>
            <p>${selected.textExample}</p>
            <p>${selected.textExampleTranslate}</p>
      </div>
    </div>
  </div>`;
  }

  createElement() {
    return `<section class="textbook">
    <div class="textbook__container container">
      <div class="textbook__workspace">
        <h2 class="textbook__title title">Выберите уровень</h2>
        <a class="textbook__set-level"></a>
        <ul class="textbook__level-list">
          <li class="textbook__level-item textbook__level-item--a1">
            <span class="textbook__difficulty-btn" id="group-0">
              Elementary A1
            </span>
          </li>
          <li class="textbook__level-item textbook__level-item--a2">
            <span class="textbook__difficulty-btn" id="group-1">
              Pre-Intermediate A2
            </span>
          </li>
          <li class="textbook__level-item textbook__level-item--b1">
            <span class="textbook__difficulty-btn" id="group-2">
              Intermediate B1
            </span>
          </li>
          <li class="textbook__level-item textbook__level-item--b2">
            <span class="textbook__difficulty-btn" id="group-3">
              Upper-Intermediate B2
            </span>
          </li>
          <li class="textbook__level-item textbook__level-item--c1">
            <span class="textbook__difficulty-btn" id="group-4">
              Advanced C1
            </span>
          </li>
          <li class="textbook__level-item textbook__level-item--c2">
            <span class="textbook__difficulty-btn" id="group-5">
              Proficiency C2
            </span>
          </li>
        </ul>
        <div class="textbook__buttons">
        <div class="textbook__user-buttons ${this.userState.isLoggedOn ? '' : 'hidden'}">
        <button class="textbook__set-btn btn" type="button" id="all-words-btn"
        ${this.dictionaryState.activeTab === 'all' ? 'disabled' : ''}>Все слова</button>
        <button class="textbook__set-btn btn" type="button" id="complex-words-btn"
        ${this.dictionaryState.activeTab === 'complex' ? 'disabled' : ''}>Сложные слова</button>
        </div>
        <button class="textbook__set-btn btn" id="audiochallenge-btn" type="button">Аудиовызов</button>
        <button class="textbook__set-btn btn" id="dictionary-sprint-link" type="button">Спринт</button>
        </div>
        <div class="textbook__words-container">
        <div class="textbook__words">
        ${this.renderWords()}
        </div>
      </div>
      <nav class="textbook__pagination">
        <input type="button" class="pagination__btn textbook__btn-prev" id='prev-button'
        ${this.dictionaryState.page === 0 ? 'disabled' : ''}/> <label class="textbook__btn-prev-label
        ${this.dictionaryState.page === 0 ? 'textbook__btn-label--disabled' : ''}"
        for="prev-button"> << </label>
        <span class="textbook__page-pointer">${this.dictionaryState.page + 1}</span>
        <input type="button" class="pagination__btn textbook__btn-next" id='next-button'
        ${this.dictionaryState.page >= 29 ? 'disabled' : ''}/>
        <label class="textbook__btn-next-label textbook__btn-label
        ${this.dictionaryState.page >= 29 ? 'textbook__btn-label--disabled' : ''}"
        for="next-button"> >> </label>
      </nav>
      </div>
      <div class="textbook__card-container">
      ${this.renderCard()}
      </div>
    </div>
  </section>`;
  }
}
