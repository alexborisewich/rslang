import store from '../../../store/store';
import loginSVG from '../../../assets/login.svg';
import logoutSVG from '../../../assets/logout.svg';
import { checkUser } from '../../../common/utils/utils';

export default class Header {
  userState = store.getState().user;

  appState = store.getState().app;

  createElement() {
    const body = document.querySelector('body') as HTMLBodyElement;
    const { isFullscreen } = store.getState().sprint;
    return `<header class="header ${isFullscreen ? 'hidden' : ''}">
    <div class=" header__container container">
      <a class="header__logo logo" href="#">
      <img class="logo__image" src="/assets/RS_Lang-logos_black.png" />
      </a>
      <nav class="header__menu menu">
        <ul class="menu__list">
          <li class="menu__item ${this.appState.activeTab === 'homepage' ? 'menu__item--active' : ''}">
            <a class="menu__link" id="homepage-link" href="#">Главная</a>
          </li>
          <li class="menu__item ${this.appState.activeTab === 'dictionary' ? 'menu__item--active' : ''}">
            <a class="menu__link" id="dictionary-link" href="#">Учебник</a>
          </li>
          <li class="menu__item ${this.appState.activeTab === 'games' ? 'menu__item--active' : ''}">
            <a class="menu__link" id="games-link" href="#">Игры</a>
          </li>
          <li class="menu__item ${this.appState.activeTab === 'statistic' ? 'menu__item--active' : ''}">
            <a class="menu__link" id="statistic-link" href="#">Статистика</a>
          </li>
          <li class="menu__item ${this.appState.activeTab === 'team' ? 'menu__item--active' : ''}">
            <a class="menu__link" id="team-link" href="#">О команде</a>
          </li>
        </ul>
      </nav>
      <div class="header__theme-switcher"><img class="header__theme-switcher-img
      ${body.classList.contains('theme--dark') ? 'header__theme-switcher--active' : ''}"
      id="theme-btn" src="assets/8328350.png"/></div>
      ${
        checkUser()
          ? `<button class="header__auth-btn btn" type="button" id="logout-btn">
              <span class="header__auth-text">Выйти</span>
              ${logoutSVG}
            </button>`
          : `<button class="header__auth-btn btn" type="button" id="login-btn">
              <span class="header__auth-text">Войти</span>
              ${loginSVG}
              </button>`
      }
    </div>
  </header>`;
  }

  render(parent: HTMLBodyElement) {
    parent.insertAdjacentHTML('beforeend', this.createElement());
  }
}
