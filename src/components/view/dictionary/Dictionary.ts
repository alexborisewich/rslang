import store from '../../../store/store';

export default class Dictionary {
  state = store.getState().dictionary;

  private renderWords() {
    return this.state.words
      .map((word) => {
        return `<div class="textbook__word ${word.id === this.state.selectedWord ? 'textbook__word--active' : ''}" id=${
          word.id
        }>
            <span class="word__text">${word.word}</span>
            <span class="word__text">${word.wordTranslate}</span>
          </div>`;
      })
      .join('');
  }

  private renderCard() {
    const selected = this.state.words.find((word) => word.id === this.state.selectedWord);
    if (!selected) return '';
    return `<div class="textbook__card card">
    <img class="card__img" src='https://rslang-172.herokuapp.com/${selected.image}'/>
    <div class="card__content">
      <div class="card__main">
        <h2 class="card__word">${selected.word}</h2>
        <h3 class="card__translate">${selected.wordTranslate}</h3>
        <span class="card__transcription">${selected.transcription}</span>
        <button class="card__play btn" type="button">Воспроизвести</button>
      </div>
      <button class="card__btn-set-compound btn">Добавить в сложные</button>
      <button class="card__btn-set-learned btn">Изучено</button>
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
        <button class="textbook__set-btn btn" type="button">Все слова</button>
        <button class="textbook__set-btn btn" type="button">Сложные слова</button>
        <button class="textbook__set-btn btn" type="button">Аудиовызов</button>
        <button class="textbook__set-btn btn" type="button">Спринт</button>
        <div class="textbook__words-container">
        <div class="textbook__words">
        ${this.renderWords()}
        </div>
        
      </div>
      <nav class="textbook__pagination">
        <button class="pagination__btn textbook__btn-prev" ${this.state.page === 0 ? 'disabled' : ''}> << </button>
        <span class="textbook__page-pointer">${this.state.page + 1}</span>
        <button class="pagination__btn textbook__btn-next" ${this.state.page >= 29 ? 'disabled' : ''}> >> </button>
      </nav>
      </div>
      
      <div class="textbook__card-container">
      ${this.renderCard()}
      </div>
      
    </div>
  </section>`;
  }
}

// <h4 class="card__statistic card-subtitle">Прогресс изучения</h4>
//             <ul class="card__statistic-list">
//               <li class="card__statistic-item">
//                 <span class="card__statistic-new">Новое или Изучено</span>
//                 <span class="card__statistic-counter">+ или -</span>
//               </li>
//               <li class="card__statistic-item">
//                 <span class="card__statistic-game">Аудиовызов</span>
//                 <span class="card__statistic-counter">Правильно: 0</span>
//                 <span class="card__statistic-counter">Неправильно: 0</span>
//               </li>
//               <li class="card__statistic-item">
//                 <span class="card__statistic-game">Спринт</span>
//                 <span class="card__statistic-counter">Правильно: 0</span>
//                 <span class="card__statistic-counter">Неправильно: 0</span>
//               </li>
//             </ul>
