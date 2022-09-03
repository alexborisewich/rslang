import closeSVG from '../../../assets/close.svg';

export default class Login {
  createElement() {
    return `<section class="auth">
        <div class="auth__container --hidden">
          <div class="auth__form-wrapper">
            <a href="#" class="auth__close-form">${closeSVG}</a>
            <form class="auth__form form " id="log-form" action="#" autocomplete="off" novalidate>
              <h2 class="form__title">Войти</h2>
              <div class="form__message"></div>
              <ul class="form__input-list">
                <li class="form__input-item">
                  <input class="form__input" id="email-input" name="email" type="email" autofocus
                          placeholder="Email" required autocomplete="new-email">
                  <div class="form__input-message"></div>
                </li>
                <li class="form__input-item">
                  <input type="password" class="form__input" id="password-input" name="password" autofocus
                          placeholder="Пароль" required autocomplete="new-password">
                  <div class="form__input-message"></div>
                </li>
                <li class="form__input-item">
                  <input type="password" class="form__input" id="password-input-repeat" name="passwordRepeat" autofocus
                          placeholder="Подтвердите пароль" required autocomplete="new-password">
                  <div class="form__input-message"></div>
                </li>
                <li class="form__input-item">
                  <input type="checkbox" class="form__checkbox" id="showpassword" name="showPassword">
                  <label class="form__input-label" for="showpassword">Показать пароль</label>
                </li>
                <li class="form__input-item">
                  <input type="checkbox" class="form__checkbox" id="loginkeeping" name="loginKeep" checked>
                  <label class="form__input-label" for="loginkeeping">Запомнить меня</label>
                </li>
              </ul>
              <div class="form__btn-wrapper">
                <button class="form__btn form-btn btn-submit"  type="submit">Войти</button>
                <button class="form__btn form-btn btn-reset" type="reset">Очистить</button>
              </div>
            </form>
            <p class="auth__text">Еще не зарегистрированы?
              <a href="#" class="auth__link" id="link-create-account">Создать аккаунт</a>
            </p>
          </div>
        </div>
      </section>`;
  }
}
