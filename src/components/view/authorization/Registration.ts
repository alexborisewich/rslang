export default class Login {
  createElement() {
    return `<section class="auth">
      <div class="auth__container">
        <div class="auth__form-wrapper">
          <a href="#" class="auth__close-form">X</a>
          <form class="auth__form form" action="#">
            <div class="form__avatar">
              <img class="form__avatar-img" id="preview" src="#" alt="">
            </div>
            <h2 class="form__title">Создать новый аккаунт</h2>
            <div class="form__message"></div>
            <ul class="form__input-list">
              <li class="form__input-item">
                <input type="text" class="form__input" autofocus placeholder="Имя" required>
                <div class="form__input-message"></div>
              </li>
              <li class="form__input-item">
                <input type="email" class="form__input" placeholder="Email" required>
                <div class="form__input-message"></div>
              </li>
              <li class="form__input-item">
                <input type="password" class="form__input" placeholder="Пароль">
                <div class="form__input-message"></div>
              </li>
              <li class="form__input-item">
                <input type="password" class="form__input" placeholder="Подтвердите пароль">
                <div class="form__input-message"></div>
              </li>
              <li class="form__input-item">
                <input type="checkbox" class="form__checkbox" value="showpassword">
                <label class="form__input-label" for="showpassword">Показать пароль</label>
              </li>
              <li class="form__input-item">
                <input type="checkbox" class="form__checkbox" value="agree">
                <label class="form__input-label" for="agree">Я согласен на обработку персональных данных</label>
              </li>
              <li class="form__input-item">
                <input type="file" class="form__input form__input--file" id="file" accept="image/*">
                <label class="form__label-btn btn" for="file">Загрузить фото</label>
                <div class="form__input-message"></div>
              </li>
            </ul>
            <div class="form__btn-wrapper">
              <button class="form__btn btn" type="submit">Продолжить</button>
              <button class="form__btn btn" type="reset">Очистить</button>
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
