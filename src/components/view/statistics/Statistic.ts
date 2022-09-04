export default class Statistic {
  createElement() {
    return `<section class="stat">
    <div class="stat__container container">
      <div class="stat__data">
        <div class="stat__short-term" id="stat-view">
          <h2 class="stat__title title">Статистика за сегодня</h2>
          <div class="stat__today">
            <div class="stat__item">
              <h2 class="stat__count">0</h2>
              <p class="stat__description">количество слов изучено</p>
            </div>
            <div class="stat__item">
              <h2 class="stat__count">0%</h2>
              <p class="stat__description">правильных ответов</p>
            </div>
          </div>
          <h2 class="stat__title title">Статистика игр</h2>
          <div class="stat__games">
            <div class="stat__item">
              <h2 class="stat__game">Аудиовызов</h2>
              <p class="stat__description">Изучено слов: 0</p>
              <p class="stat__description">Правильных ответов: 0</p>
              <p class="stat__description">Максимальная длина серии правильных ответов: 0</p>
            </div>
            <div class="stat__item">
              <h2 class="stat__game">Спринт</h2>
              <p class="stat__description">Изучено слов: 0</p>
              <p class="stat__description">Правильных ответов: 0</p>
              <p class="stat__description">Максимальная длина серии правильных ответов: 0</p>
            </div>
          </div>
        </div>
        <div class="stat__long-term --hidden" id="stat-view">
          <h2 class="stat__title title">Статистика за все время</h2>
          <canvas class="stat__chart" id="chart"></canvas>
        </div>
      </div>
      <ul class="stat__nav dot-nav">
        <li class="dot-nav__item">
          <a href="#" class="dot-nav__link --active" id="dot-stat">
            <span class="dot-nav__circle"></span>
          </a>
        </li>
        <li class="dot-nav__item">
          <a href="#" class="dot-nav__link" id="dot-stat">
            <span class="dot-nav__circle"></span>
          </a>
        </li>
      </ul>
    </div>
  </section>`;
  }
}
