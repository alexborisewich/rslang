import {
  changePage,
  fetchWords,
  selectDifficulty,
  selectWord,
} from '../../store/reducers/dictionary/dictionaryReducer';
import { switchTab } from '../../store/reducers/app/appReducer';
import { parseID } from '../../common/utils/utils';
import store from '../../store/store';
import api from '../api/api';
import { logIn, logOut } from '../../store/reducers/user/userReducer';
import { LoginResponse } from '../../common/types/user/types';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import LogicSprintGame from '../controller/sprint-game/sprint-game';
import { LogicGames } from '../controller/games/games';

export default class AppView {
  body = document.querySelector('body') as HTMLBodyElement;

  listen() {
    const header = this.body.querySelector('.header') as HTMLDivElement;
    const main = this.body.querySelector('.main') as HTMLDivElement;
    const regForm = this.body.querySelector('#reg-form') as HTMLFormElement;
    const logForm = this.body.querySelector('#log-form') as HTMLFormElement;

    const headerHandler = (e: Event) => {
      const targetBtn = e.target as HTMLButtonElement;
      const targetLink = e.target as HTMLLinkElement;
      console.log(e.target);

      if (targetBtn.id === 'login-btn') store.dispatch(switchTab('login'));
      if (targetBtn.id === 'logout-btn') {
        store.dispatch(logOut());
        store.dispatch(switchTab('homepage'));
      }
      if (targetLink.id === 'homepage-link') store.dispatch(switchTab('homepage'));
      if (targetLink.id === 'dictionary-link') {
        const state = store.getState().dictionary;
        const { group, page } = state;

        store.dispatch(switchTab('dictionary'));
        store.dispatch(fetchWords({ group, page }));
      }
      if (targetLink.id === 'games-link') {
        store.dispatch(switchTab('games'));
        const startLogic = new LogicGames();
        startLogic.createLogic();
      }
      if (targetLink.id === 'sprint-link') {
        store.dispatch(switchTab('sprint'));
        const startSprintLogic = new LogicSprintGame();
        startSprintLogic.createLogic();
      }
      if (targetLink.id === 'statistic-link') store.dispatch(switchTab('statistic'));
      if (targetLink.id === 'team-link') store.dispatch(switchTab('team'));
    };

    const mainHandler = (e: Event) => {
      const targetLink = e.target as HTMLLinkElement;
      //   const targetDiv = e.target as HTMLDivElement;
      const targetBtn = e.target as HTMLButtonElement;
      const targetSpan = e.target as HTMLSpanElement;
      const wordDiv = targetSpan.closest('.textbook__word') as HTMLDivElement;

      console.log(e.target);

      if (targetLink.id === 'link-create-account') store.dispatch(switchTab('registration'));
      if (targetLink.id === 'sprint-link') {
        store.dispatch(switchTab('sprint'));
        const startSprintLogic = new LogicSprintGame();
        startSprintLogic.createLogic();
      }
      if (targetLink.id === 'link-login') store.dispatch(switchTab('login'));
      if (targetLink.id === 'close-form') store.dispatch(switchTab('homepage'));
      if (wordDiv) store.dispatch(selectWord(wordDiv.id));
      if (targetBtn.classList.contains('textbook__difficulty-btn')) {
        const id = parseID(targetBtn.id);
        store.dispatch(changePage(0));
        store.dispatch(selectDifficulty(id));
        store.dispatch(selectWord(''));
        const state = store.getState().dictionary;
        const { group, page } = state;
        store.dispatch(fetchWords({ group, page }));
      }
      if (targetBtn.classList.contains('pagination__btn')) {
        let { page } = store.getState().dictionary;
        const { group } = store.getState().dictionary;
        if (targetBtn.classList.contains('textbook__btn-prev')) page -= 1;
        if (targetBtn.classList.contains('textbook__btn-next')) page += 1;
        store.dispatch(changePage(page));
        store.dispatch(selectWord(''));
        store.dispatch(fetchWords({ group, page }));
      }
    };

    const regFormHandler = (e: Event) => {
      e.preventDefault();
      const email = main.querySelector('#email-input') as HTMLInputElement;
      const password = main.querySelector('#password-input') as HTMLInputElement;
      api
        .createUser({ email: email.value, password: password.value })
        .then(() => store.dispatch(switchTab('login')))
        .catch(console.log);
    };

    const logFormHandler = (e: Event) => {
      e.preventDefault();
      const email = main.querySelector('#email-input') as HTMLInputElement;
      const password = main.querySelector('#password-input') as HTMLInputElement;
      api
        .loginUser({ email: email.value, password: password.value })
        .then((response) => response.json())
        .then((data) => {
          const userData = data as LoginResponse;
          store.dispatch(logIn(userData));
        })
        .then(() => store.dispatch(switchTab('homepage')))
        .catch(console.log);
    };

    header.addEventListener('click', headerHandler);
    main.addEventListener('click', mainHandler);
    if (regForm) regForm.addEventListener('submit', regFormHandler);
    if (logForm) logForm.addEventListener('submit', logFormHandler);
  }

  renderHeader() {
    new Header().render(this.body);
  }

  renderMain() {
    new Main().render(this.body);
  }

  renderFooter() {
    new Footer().render(this.body);
  }

  renderApp() {
    this.body.innerHTML = '';
    this.renderHeader();
    this.renderMain();
    this.renderFooter();
    this.listen();
  }
}
