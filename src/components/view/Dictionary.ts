export default class Dictionary {
  createElement() {
    return `<section class="textbook">
    <div class="textbook__container container">
      <div class="textbook__workspace">
        <h2 class="textbook__title title">Учебник</h2>
        <a class="textbook__set-level"> Выберите уровень</a>
        <ul class="textbook__level-list">
          <li class="textbook__level-item">
            <button>
              <span>Elementary</span>
              <span>A1</span>
            </button>
          </li>
          <li class="textbook__level-item">
            <button>
              <span>Pre-Intermediate</span>
              <span>A2</span>
            </button>
          </li>
          <li class="textbook__level-item">
            <button>
              <span>Intermediate</span>
              <span>B1</span>
            </button>
          </li>
          <li class="textbook__level-item">
            <button>
              <span>Upper-Intermediate</span>
              <span>B2</span>
            </button>
          </li>
          <li class="textbook__level-item">
            <button>
              <span>Advanced</span>
              <span>C1</span>
            </button>
          </li>
          <li class="textbook__level-item">
            <button>
              <span>Proficiency</span>
              <span>C2</span>
            </button>
          </li>
        </ul>
        <button class="textbook__set-btn btn" type="button">Сложные слова</button>
        <button class="textbook__set-btn btn" type="button">Настройки</button>
        <button class="textbook__minigames-link">Миниигры</button>
        <h1 class="textbook__subtitle">Слова</h1>
        <div class="textbook__words">
          <a href="" class="textbook__link">
            <span class="textbook__word">Word</span>
            <span class="textbook__translate">Слово</span>
          </a>
        </div>
      </div>
      <div class="textbook__card card">
        <div class="card__img"></div>
        <div class="card__content">
          <div class="card__main">
            <h2 class="card__word">Word</h2>
            <h3 class="card__translate">Слово</h3>
            <span class="card__transcription">[]</span>
            <button class="card__play" type="button"></button>
          </div>
          <button class="card__btn-set-compound btn">Добавить в сложные</button>
          <button class="card__btn-set-learned btn">Изучено</button>
          <div class="card-description">
            <h4 class="card__mean card-subtitle"> Значение </h3>
              <p>Description</p>
              <p>Описание</p>
              <h4 class="card__example card-subtitle"> Пример </h3>
                <p>Example</p>
                <p>Пример</p>
                <h4 class="card__statistic card-subtitle">Прогресс изучения</h4>
                <ul class="card__statistic-list">
                  <li class="card__statistic-item">
                    <span class="card__statistic-new">Новое или Изучено</span>
                    <span class="card__statistic-counter">+ или -</span>
                  </li>
                  <li class="card__statistic-item">
                    <span class="card__statistic-game">Аудиовызов</span>
                    <span class="card__statistic-counter">Правильно: 0</span>
                    <span class="card__statistic-counter">Неправильно: 0</span>
                  </li>
                  <li class="card__statistic-item">
                    <span class="card__statistic-game">Спринт</span>
                    <span class="card__statistic-counter">Правильно: 0</span>
                    <span class="card__statistic-counter">Неправильно: 0</span>
                  </li>
                </ul>
          </div>
        </div>
      </div>
      <nav class="textbook__pagination">
        <button class="textbook__btn-prev">Предыдущая</button>
        <span class="textbook__page-pointer">1</span>
        <button class="textbook__btn-next">Следующая</button>
      </nav>
    </div>
  </section>`;
  }
}
