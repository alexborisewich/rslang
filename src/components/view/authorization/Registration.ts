import closeSVG from '../../../assets/close.svg';
import avatarSVG from '../../../assets/avatar.svg';

export default class Registration {
  createElement() {
    return `<section class="auth --hidden">
    <div class="auth__container">
    <div class="auth__form-wrapper">
        <a href="#" class="auth__close-form">${closeSVG}</a>
        <form class="auth__form form" id="reg-form" action="#" autocomplete="off" novalidate>
          <div class="form__avatar">${avatarSVG}</div>
          <h2 class="form__title">Создать новый аккаунт</h2>
          <div class="form__message"></div>
          <ul class="form__input-list">
            <li class="form__input-item">
              <input class="form__input" id="username-input" name="name" type="text"
                      autofocus placeholder="Имя" required autocomplete="new-username">
              <div class="form__input-message"></div>
            </li>
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
              <input type="checkbox" class="form__checkbox" id="enter" name="enter">
              <label class="form__input-label" for="enter">Войти в аккаунт</label>
            </li>
            <li class="form__input-item">
            <input type="checkbox" class="form__checkbox" id="loginkeeping" name="loginKeep" checked>
            <label class="form__input-label" for="loginkeeping">Запомнить меня</label>
            </li>
            <li class="form__input-item">
              <input type="file" class="form__input form__input--file" id="file" name="file" accept="image/*">
              <label class="form__label-btn form-btn btn-download" for="file">Загрузить аватар</label>
              <div class="form__input-message"></div>
            </li>
          </ul>
          <div class="form__btn-wrapper">
            <button class="form__btn form-btn btn-submit" type="submit" id="register-btn">Продолжить</button>
            <button class="form__btn form-btn btn-reset" type="reset">Очистить</button>
          </div>
        </form>
        <p class="auth__text">Уже есть аккаунт?
          <a href="#" class="auth__link" id="link-login">Войти</a>
        </p>
      </div>
      </div>
      </section>`;
  }
}
