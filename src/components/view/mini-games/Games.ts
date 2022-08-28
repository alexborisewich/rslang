export default class Games {
  createElement() {
    return `<section class="games">
      <div class="games__container container">
        <div class="games__select">
          <a class="games__audiochallenge-link game-link" href="#">
            <span class="game-link__title">Аудиовызов</span>
            <span class="game-link__img-wrapper">
              <img class="game-link__img" src="" alt="">
            </span>
          </a>
          <ul class="games__level-list">
            <li class="games__level-item">
              <input class="games__level-input" type="radio" id="A1" name="level-select" value = "0" checked>
              <label class="games__level-label" for="A1">
                <span class="games__level-title">A1</span>
                <span class="games__level-name">Elementary</span></label>
            </li>
            <li class="games__level-item">
              <input class="games__level-input" type="radio" id="A2" name="level-select" value = "1">
              <label class="games__level-label" for="A2">
                <span class="games__level-title">A2</span>
                <span class="games__level-name">Pre-Intermediate</span>
              </label>
            </li>
            <li class="games__level-item">
              <input class="games__level-input" type="radio" id="B1" name="level-select" value = "2">
              <label class="games__level-label" for="B1">
                <span class="games__level-title">B1</span>
                <span class="games__level-name">Intermediate</span>
              </label>
            </li>
            <li class="games__level-item">
              <input class="games__level-input" type="radio" id="B2" name="level-select" value = "3">
              <label class="games__level-label" for="B2">
                <span class="games__level-title">B2</span>
                <span class="games__level-name">Upper-Intermediate</span>
              </label>
            </li>
            <li class="games__level-item">
              <input class="games__level-input" type="radio" id="C1" name="level-select" value = "4">
              <label class="games__level-label" for="C1">
                <span class="games__level-title">C1</span>
                <span class="games__level-name">Advanced</span>
              </label>
            </li>
            <li class="games__level-item">
              <input class="games__level-input" type="radio" id="C2" name="level-select" value = "5">
              <label class="games__level-label" for="C2">
                <span class="games__level-title">C2</span>
                <span class="games__level-name">Proficiency</span>
              </label>
            </li>
          </ul>
          <a class="games__audiochallenge-link game-link" href="#">
            <span class="game-link__title" id = "sprint-link">Спринт</span>
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
      </div>
    </section>`;
  }
}
