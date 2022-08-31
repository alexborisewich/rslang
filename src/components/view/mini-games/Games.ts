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
          <a class="games__sprint-link game-link" href="#">
            <span class="game-link__title" id = "games-sprint-link">Спринт</span>
            <span class="game-link__img-wrapper">
              <img class="game-link__img" src="" alt="">
            </span>
          </a>
        </div>
      </div>
    </section>`;
  }
}
