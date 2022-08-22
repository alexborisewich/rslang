import store from '../../../store/store';

export default class Header {
  state = store.getState().user;

  createElement() {
    return `<header class="header">
    <div class=" header__container">
      <a class="header__logo logo" href="#"></a>
      <nav class="header__menu menu">
        <ul class="menu__list">
          <li class="menu__item">
            <a class="menu__link" id="homepage-link" href="#">Главная</a>
          </li>
          <li class="menu__item">
            <a class="menu__link" id="dictionary-link" href="#">Учебник</a>
          </li>
          <li class="menu__item">
            <a class="menu__link submenu-title" id="games-link" href="#">Игры</a>
            <ul class="submenu__list">
              <li>
                <a class="submenu__link" id="audiochallenge-link" href="#">Аудиовызов</a>
              </li>
              <li>
                <a class="submenu__link" id="sprint-link" href="#">Спринт</a>
              </li>
            </ul>
          </li>
          <li class="menu__item">
            <a class="menu__link" id="statistic-link" href="#">Статистика</a>
          </li>
          <li class="menu__item">
            <a class="menu__link" id="team-link" href="#">О команде</a>
          </li>
        </ul>
      </nav>
      <button class="header__theme-btn btn" type="button">Изменить тему</button>
      ${
        this.state.isLoggedOn
          ? '<button class="header__auth-btn btn" type="button" id="logout-btn">Выйти</button>'
          : '<button class="header__auth-btn btn" type="button" id="login-btn">Войти</button>'
      }      
    </div>
  </header>`;
  }

  render(parent: HTMLBodyElement) {
    parent.insertAdjacentHTML('beforeend', this.createElement());
  }
}
