import { Registration } from '../../../common/interface/interface';
import { LoginResponse } from '../../../common/types/user/types';
import { switchTab } from '../../../store/reducers/app/appReducer';
import { logIn } from '../../../store/reducers/user/userReducer';
import store from '../../../store/store';
import api from '../../api/api';

export default class AutorizationHandler {
  form: HTMLFormElement;

  api = api;

  isValid = false;

  constructor() {
    [this.form] = [document.forms[0]];
  }

  start() {
    this.showForm();
    this.listen();
  }

  showForm() {
    setTimeout(() => this.form.closest('.auth__container')?.classList.remove('--hidden'), 0);
  }

  hideForm() {
    this.form.closest('.auth__container')?.classList.add('--hidden');
    setTimeout(() => store.dispatch(switchTab('homepage')), 300);
  }

  listen() {
    Array.from(this.form.elements).forEach((el) => {
      if ((el as HTMLInputElement).type !== 'checkbox')
        el.addEventListener('blur', (e) => {
          this.validate(e);
          el.addEventListener('input', () => {
            this.clearFormMessage();
            this.clearInputMessage(el as HTMLInputElement);
          });
        });
    });
    if (this.form.file)
      (this.form.file as HTMLInputElement).addEventListener('change', () => {
        this.clearInputMessage(this.form.file as HTMLInputElement);
        this.preview();
      });
    (this.form.showPassword as HTMLInputElement).addEventListener('change', () => this.togglePasswordHide.call(this));
    this.form.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      if (this.isValid) {
        if (this.form.id === 'log-form') {
          this.logIn();
        } else this.register();
      } else this.setFormMessage('error', 'Поля не заполнены или содержат некорректные данные');
    });
    this.form.closest('.auth')?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.auth__close-form') || target.classList.contains('auth')) {
        this.hideForm();
      }
    });
  }

  validate(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.id === 'name' && target.value.length === 0) {
      this.setInputMessage(target, 'Заполните поле');
    }
    if (target.id === 'email-input' && (this.form.email as HTMLInputElement).validity.typeMismatch) {
      this.setInputMessage(target, 'Некорректный адрес email');
    }
    if (target.id === 'password-input' && target.value.length > 0 && target.value.length < 8) {
      this.setInputMessage(target, 'Пароль должен содержать не менее 8 символов');
    }
    if (target.id === 'password-input-repeat' && target.value !== (this.form.password as HTMLInputElement).value) {
      this.setInputMessage(target, 'Введен неверный пароль');
    }
    if (target.validity.valueMissing) {
      this.setInputMessage(target, 'Заполните поле');
    }
    this.isValid = !Array.from(this.form.elements).some((el) => el.classList.contains('form__input--error'));
  }

  async register() {
    await this.api
      .createUser({
        name: (this.form.email as HTMLInputElement).value,
        email: (this.form.email as HTMLInputElement).value,
        password: (this.form.password as HTMLInputElement).value,
      })
      .then((response) => {
        if (response.ok) {
          this.setFormMessage('success', 'Аккаунт успешно создан');
          return response.json();
        }
        if (response.status === 422) this.setFormMessage('error', 'Неправильный email или пароль.');
        else if (!response.ok) this.setFormMessage('error', 'Произошла ошибка');
        return undefined;
      })
      .then(async (data) => {
        if (data !== undefined) {
          const userData = data as unknown as Registration;
          const { email, password } = userData;
          if ((this.form.enter as HTMLInputElement).checked) {
            this.logIn(email, password);
          }
          // this.hideForm();
        }
      });
  }

  async logIn(mail?: string, pass?: string) {
    const email = mail || (this.form.email as HTMLInputElement).value;
    const password = pass || (this.form.password as HTMLInputElement).value;
    await this.api
      .loginUser({ email, password })
      .then((response) => {
        if (response.ok) {
          this.setFormMessage('success', 'Вход выполнен успешно.');
          return response.json();
        }
        if (response.status === 403) this.setFormMessage('error', 'Неправильный email или пароль.');
        else if (response.status === 404)
          this.setFormMessage('error', 'Пользователь не найден.<br>Проверьте данные и повторите попытку.');
        else if (!response.ok) this.setFormMessage('error', 'Произошла ошибка');
        return undefined;
      })
      .then((data) => {
        if (data !== undefined) {
          const userData = data as unknown as LoginResponse;
          store.dispatch(logIn(userData));
          store.dispatch(switchTab('homepage'));
          if ((this.form.loginKeep as HTMLInputElement).checked) {
            localStorage.setItem('user', JSON.stringify(userData));
          } else {
            sessionStorage.setItem('user', JSON.stringify(userData));
          }
          // this.hideForm();
        }
      });
  }

  setFormMessage(type: string, message: string) {
    const formMessage = this.form.querySelector('.form__message') as HTMLElement;
    formMessage.innerHTML = message;
    formMessage.classList.add(`form__message--${type}`);
  }

  clearFormMessage() {
    const formMessage = this.form.querySelector('.form__message') as HTMLElement;
    formMessage.textContent = '';
    formMessage.classList.remove('form__message--success', 'form__message--error');
  }

  setInputMessage(el: HTMLInputElement, message: string) {
    el.classList.add('form__input--error');
    ((el.parentElement as HTMLElement).querySelector('.form__input-message') as HTMLElement).innerHTML = message;
  }

  clearInputMessage(el: HTMLInputElement) {
    el.classList.remove('form__input--error');
    ((el.parentElement as HTMLElement).querySelector('.form__input-message') as HTMLElement).innerHTML = '';
  }

  preview() {
    const avatar = document.querySelector('.form__avatar') as HTMLElement;
    const file = ((this.form.file as HTMLInputElement).files as FileList)[0] as Blob;
    const fileSize = +(file.size / 1024 / 1024).toFixed(2);
    const extensions = ['image/png', 'image/svg+xml', 'image/jpeg', 'image/gif'];
    if ((this.form.file as HTMLInputElement).files && ((this.form.file as HTMLInputElement).files as FileList)) {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        avatar.innerHTML = `<img class="form__avatar-img" src="${(e.target as FileReader).result}" />`;
      });
      if (((this.form.file as HTMLInputElement).files as FileList).length > 1)
        this.setInputMessage(
          this.form.file as HTMLInputElement,
          'Превышено количество выбранных файлов.<br>Выберите один файл.'
        );
      else if (fileSize > 2)
        this.setInputMessage(
          this.form.file as HTMLInputElement,
          `Превышен максимальный размер файла - ${fileSize} МБ.<br>Выберите файл размером до 2 МБ.`
        );
      else if (!extensions.includes(file.type)) {
        this.setInputMessage(
          this.form.file as HTMLInputElement,
          'Тип файла не поддерживается.<br>Выберите файл с расширением: PNG, SVG, JPEG, GIF.'
        );
      } else {
        reader.readAsDataURL(file);
      }
    }
  }

  togglePasswordHide() {
    (this.form.password as HTMLInputElement).type = (this.form.showPassword as HTMLInputElement).checked
      ? 'text'
      : 'password';
    (this.form.passwordRepeat as HTMLInputElement).type = (this.form.showPassword as HTMLInputElement).checked
      ? 'text'
      : 'password';
  }
}
