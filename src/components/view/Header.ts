export default class Header {
  createElement() {
    return `<header class="header">
    <div class=" header__container">
      <a class="header__logo logo" href="#"></a>
      <nav class="header__menu menu">
        <ul class="menu__list">
          <li class="menu__item">
            <a class="menu__link" href="#">Главная</a>
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#">Учебник</a>
          </li>
          <li class="menu__item">
            <a class="menu__link submenu-title" href="#">Игры</a>
            <ul class="submenu__list">
              <li>
                <a class="submenu__link" href="#">Аудиовызов</a>
              </li>
              <li>
                <a class="submenu__link" href="#">Спринт</a>
              </li>
            </ul>
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#">Статистика</a>
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#">О команде</a>
          </li>
        </ul>
      </nav>
      <button class="header__theme-btn btn" type="button">Изменить тему</button>
      <button class="header__auth-btn btn" type="button">Войти</button>
    </div>
  </header>`;
  }

  render(parent: HTMLBodyElement) {
    parent.insertAdjacentHTML('beforeend', this.createElement());
  }
}
