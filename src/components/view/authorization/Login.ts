export default class Login {
  createElement() {
    return `<section class="auth">
        <div class="auth__container">
          <div class="auth__form-wrapper">
            <a href="#" class="auth__close-form" id="close-form">X</a>
            <form class="auth__form form " id="log-form" action="#" autocomplete="on">
              <h2 class="form__title">Войти</h2>
              <div class="form__message"></div>
              <ul class="form__input-list">
                <li class="form__input-item">
                  <input class="form__input" id="email-input" type="email" autofocus placeholder="Email" required>
                  <div class="form__input-message"></div>
                </li>
                <li class="form__input-item">
                  <input type="password" class="form__input" id="password-input" autofocus placeholder="Пароль" required>
                  <div class="form__input-message"></div>
                </li>
                <li class="form__input-item">
                  <input type="checkbox" class="form__checkbox" value="showpassword">
                  <label class="form__input-label" for="showpassword">Показать пароль</label>
                </li>
                <li class="form__input-item">
                  <input type="checkbox" class="form__checkbox" value="loginkeeping">
                  <label class="form__input-label" for="loginkeeping">Запомнить меня</label>
                </li>
              </ul>
              <div class="form__btn-wrapper">
                <button class="form__btn btn" type="submit">Войти</button>
                <button class="form__btn btn" type="reset">Очистить</button>
              </div>
  
              <p class="form__text">
                <a href="#" class="form__link">Забыли имя или пароль?</a>
              </p>
            </form>
            <p class="auth__text">Еще не зарегистрированы?
              <a href="#" class="auth__link" id="link-create-account">Создать аккаунт</a>
            </p>
          </div>
        </div>
      </section>`;
  }
}
