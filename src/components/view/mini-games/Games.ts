export default class Games {
  createElement() {
    return `<section class="games">
    <div class="games__container container">
      <div class="games__btn-wpapper">
        <button class="games__sound-btn">Звук</button>
        <button class="games__screen-btn">На весь экран</button>
        <button class="games__close-btn">Закрыть</button>
      </div>
      <div class="games__select">
        <a class="games__audiochallenge-link game-link" href="#">
          <span class="game-link__title">Аудиовызов</span>
          <span class="game-link__img-wrapper">
            <img class="game-link__img" src="" alt="">
          </span>
        </a>
        <ul class="games__level-list">
          <li class="games__level-item">
            <input class="games__level-input" type="radio" id="A1" name="level-select" checked>
            <label class="games__level-label" for="A1">
              <span class="games__level-title">A1</span>
              <span class="games__level-name">Elementary</span></label>
          </li>
          <li class="games__level-item">
            <input class="games__level-input" type="radio" id="A2" name="level-select">
            <label class="games__level-label" for="A2">
              <span class="games__level-title">A2</span>
              <span class="games__level-name">Pre-Intermediate</span>
            </label>
          </li>
          <li class="games__level-item">
            <input class="games__level-input" type="radio" id="B1" name="level-select">
            <label class="games__level-label" for="B1">
              <span class="games__level-title">B1</span>
              <span class="games__level-name">Intermediate</span>
            </label>
          </li>
          <li class="games__level-item">
            <input class="games__level-input" type="radio" id="B2" name="level-select">
            <label class="games__level-label" for="B2">
              <span class="games__level-title">B2</span>
              <span class="games__level-name">Upper-Intermediate</span>
            </label>
          </li>
          <li class="games__level-item">
            <input class="games__level-input" type="radio" id="C1" name="level-select">
            <label class="games__level-label" for="C1">
              <span class="games__level-title">C1</span>
              <span class="games__level-name">Advanced</span>
            </label>
          </li>
          <li class="games__level-item">
            <input class="games__level-input" type="radio" id="C2" name="level-select">
            <label class="games__level-label" for="C2">
              <span class="games__level-title">C2</span>
              <span class="games__level-name">Proficiency</span>
            </label>
          </li>
        </ul>
        <a class="games__audiochallenge-link game-link" href="#">
          <span class="game-link__title">Спринт</span>
          <span class="game-link__img-wrapper">
            <img class="game-link__img" src="" alt="">
          </span>
        </a>
      </div>
      <div class="games__start-screen">
        <h2 class="games__title">Аудиовызов</h2>
        <p class="games__instruction">Инструкция</p>
        <label for="games-select-level">Уровень сложности</label>
        <select class="games__select-level" name="games-select-level" id="games-select-level">
          <option value="1">A1 Elementary</option>
          <option value="2">A2 Pre-Intermediate</option>
          <option value="3">B1 Intermediate</option>
          <option value="4">B2 Upper-Intermediate</option>
          <option value="5">C1 Advanced</option>
          <option value="6">C2 Proficiency</option>
        </select>
        <button class="games__btn-start btn">Начать</button>
      </div>
      <div class="games__audiochallenge audiochallenge">
        <div class="audiochallenge__gameplay">
          <ul class="audiochallenge__lives-list">
            <li class="audiochallenge__lives-item">+</li>
            <li class="audiochallenge__lives-item">+</li>
            <li class="audiochallenge__lives-item">+</li>
            <li class="audiochallenge__lives-item">+</li>
            <li class="audiochallenge__lives-item">+</li>
          </ul>
          <div class="audiochallenge__speaker">
            <img class="audiochallenge__speaker-img" src="" alt="">
          </div>
          <ul class="audiochallenge__answer-list">
            <li class="audiochallenge__answer-item">
              <span>1</span>
            </li>
            <li class="audiochallenge__answer-item">
              <span>2</span>
            </li>
            <li class="audiochallenge__answer-item">
              <span>3</span>
            </li>
            <li class="audiochallenge__answer-item">
              <span>4</span>
            </li>
            <li class="audiochallenge__answer-item">
              <span>5</span>
            </li>
          </ul>
          <button class="audiochallenge__answer-btn btn">Не знаю</button>
        </div>
      </div>
      <div class="games__sprint sprint">
        <div class="sprint__header">
          <div class="sprint__score">
            <p class="sprint__score-pointer">0</p>
            <p class="sprint__score-animate">+20</p>
          </div>
          <!-- here svg with series length status -->
          <div class="sprint__timer timer">
            <svg class="timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <g class="timer__circle">
                <circle class="timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                <path class="timer__path-remaining" id="timer-path-remaining" stroke-dasharray="283"
                      d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"></path>
              </g>
            </svg>
            <span class="timer__counter" id="base-timer-label"></span>
          </div>
        </div>
        <div class="sprint__body">
          <p class="sprint__question">
            <span class="sprint__word">word</span>
            =
            <span class="sprint__translate">слово</span>
            ?
          </p>
          <div class="sprint__answer">
            <button class="sprint-answer__btn btn">Неверно</button>
            <button class="sprint-answer__btn btn">Верно</button>
          </div>
        </div>
      </div>
      <div class="games__finish">
        <div class="games__finish-container">
          <h3 class="games__finish-title">Результаты</h3>
          <div class="games__answers-counters">
            <span class="games__answers-right">Знаю:
              <span class="games__correct-count">1</span>
            </span>
            <span class="games__answers-wrong">Не знаю:
              <span class="games__wrong-count">1</span>
            </span>
          </div>
          <table class="games__finish-statistic">
            <thead>
              <tr>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Звук</td>
                <td>англ слово</td>
                <td>[]</td>
                <td>рус слово</td>
                <td>+ или-</td>
              </tr>
            </tbody>
          </table>
          <button class="games__restart-btn btn">Играть еще</button>
          <button class="games__change-btn btn">Игры</button>
          <button class="games__exit-btn btn">Выйти</button>
        </div>
      </div>
    </div>
  </section>`;
  }
}
