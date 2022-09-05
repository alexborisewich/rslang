import store from '../../../store/store';

export default class Statistic {
  statistic = store.getState().user.statistic;

  sprintStat = this.statistic.optional.sprint;

  createElement() {
    return `<section class="stat">
    <div class="stat__container container">
      <div class="stat__data">
        <div class="stat__short-term" id="stat-view">
          <h2 class="stat__title title">Статистика</h2>
          <div class="stat__today">
            <div class="stat__item">
              <h2 class="stat__count">${this.statistic.learnedWords}</h2>
              <p class="stat__description">Количество изученных слов</p>
            </div>
            <div class="stat__item">
              <h2 class="stat__count">${this.statistic.optional.words.complexWords.length}</h2>
              <p class="stat__description">Количество сложных слов</p>
            </div>
          </div>
          <h2 class="stat__title title">Статистика игр</h2>
          <div class="stat__games">
            <div class="stat__item">
              <h2 class="stat__game">Аудиовызов</h2>
              <p class="stat__description">Всего сыграно: ${this.statistic.optional.audiochallenge.finished}</p>
              <p class="stat__description">
                Всего правильных ответов: ${this.statistic.optional.audiochallenge.totalCorrect}
              </p>
              <p class="stat__description">
                Всего очков набрано: ${this.statistic.optional.audiochallenge.totalScore}
              </p>
            </div>
            <div class="stat__item">
              <h2 class="stat__game">Спринт</h2>
              <p class="stat__description">Всего сыграно: ${this.sprintStat.finished}</p>
              <p class="stat__description">Всего правильных ответов: ${this.sprintStat.totalCorrect}</p>
              <p class="stat__description">Всего очков набрано: ${this.sprintStat.totalScore}</p>
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
