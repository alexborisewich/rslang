import {
  addComplexWord,
  addLearnedWord,
  changePage,
  changePlayState,
  deleteComplexWord,
  deleteLearnedWord,
  fetchWords,
  selectDifficulty,
  selectWord,
  switchDictionaryTab,
} from '../../store/reducers/dictionary/dictionaryReducer';
import { switchTab } from '../../store/reducers/app/appReducer';
import { parseID, playAudio } from '../../common/utils/utils';
import store from '../../store/store';
import api from '../api/api';
import { logIn, logOut } from '../../store/reducers/user/userReducer';
import { LoginResponse } from '../../common/types/user/types';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import AudioChallengeGame from './mini-games/audioсhallenge/Audiochallenge';

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
      const targetImg = e.target as HTMLImageElement;

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
        this.body.querySelectorAll('.game-link').forEach((link) => link.addEventListener('click', gamesHandler));
      }
      if (targetLink.id === 'audiochallenge-link') {
        const audioGame = new AudioChallengeGame();
        audioGame.renderStartScreen();
      }

      if (targetLink.id === 'games-link') store.dispatch(switchTab('games'));
      if (targetLink.id === 'sprint-link') store.dispatch(switchTab('sprint'));
      if (targetLink.id === 'statistic-link') store.dispatch(switchTab('statistic'));
      if (targetLink.id === 'team-link') store.dispatch(switchTab('team'));
      if (targetImg.id === 'theme-btn') {
        this.body.classList.toggle('theme--light');
        this.body.classList.toggle('theme--dark');
        targetImg.classList.toggle('header__theme-switcher--active');
      }
    };

    const mainHandler = (e: Event) => {
      const targetLink = e.target as HTMLLinkElement;
      const targetBtn = e.target as HTMLButtonElement;
      const targetSpan = e.target as HTMLSpanElement;
      const wordDiv = targetSpan.closest('.textbook__word') as HTMLDivElement;

      if (targetLink.id === 'link-create-account') store.dispatch(switchTab('registration'));
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
      if (targetBtn.id === 'all-words-btn') store.dispatch(switchDictionaryTab('all'));
      if (targetBtn.id === 'complex-words-btn') store.dispatch(switchDictionaryTab('complex'));
      if (targetBtn.id === 'add-complex') {
        const selected = store.getState().dictionary.selectedWord;
        const { words } = store.getState().dictionary;
        const complex = words.find((word) => word.id === selected);
        if (complex) store.dispatch(addComplexWord(complex));
      }
      if (targetBtn.id === 'delete-complex') {
        const selected = store.getState().dictionary.selectedWord;
        const { complexWords } = store.getState().dictionary;
        const complex = complexWords.find((word) => word.id === selected);
        if (complex) store.dispatch(deleteComplexWord(complex));
      }
      if (targetBtn.id === 'add-learned') {
        const selected = store.getState().dictionary.selectedWord;
        const words =
          store.getState().dictionary.activeTab === 'all'
            ? store.getState().dictionary.words
            : store.getState().dictionary.complexWords;
        const learned = words.find((word) => word.id === selected);
        if (learned) store.dispatch(addLearnedWord(learned));
      }
      if (targetBtn.id === 'delete-learned') {
        const selected = store.getState().dictionary.selectedWord;
        const { learnedWords } = store.getState().dictionary;
        const learned = learnedWords.find((word) => word.id === selected);
        if (learned) store.dispatch(deleteLearnedWord(learned));
      }

      if (targetBtn.id === 'play-audio-btn') {
        const selected = store.getState().dictionary.selectedWord;
        const words =
          store.getState().dictionary.activeTab === 'all'
            ? store.getState().dictionary.words
            : store.getState().dictionary.complexWords;

        const word = words.find((el) => el.id === selected);
        if (word) {
          store.dispatch(changePlayState(true));
          playAudio(word.audio)
            .then(() => playAudio(word.audioMeaning))
            .then(() => playAudio(word.audioExample))
            .then(() => {
              store.dispatch(changePlayState(false));
            });
        }
      }

      if (targetBtn.id === 'audiochallenge-btn') {
        const state = store.getState().dictionary;
        const { group, page } = state;
        const audioGame = new AudioChallengeGame(group as number, page);
        audioGame.renderStartScreen();
      }
      if (targetBtn.id === 'sprint-btn') store.dispatch(switchTab('sprint'));
    };

    const gamesHandler = (e: Event) => {
      const getLevelNumber = () =>
        +(document.querySelector('input[name="level-select"]:checked') as HTMLInputElement).value;
      const targetGameLink = e.target;
      if ((targetGameLink as HTMLElement).closest('.games__audiochallenge-link')) {
        const audioGame = new AudioChallengeGame(getLevelNumber());
        audioGame.renderStartScreen();
      }
      if ((targetGameLink as HTMLElement).closest('.games__sprint-link')) {
        console.warn('GameSprint not implemented');
      }
    };

    const regFormHandler = (e: Event) => {
      e.preventDefault();
      const email = main.querySelector('#email-input') as HTMLInputElement;
      const password = main.querySelector('#password-input') as HTMLInputElement;
      api
        .createUser({ email: email.value, password: password.value })
        .then(() => store.dispatch(switchTab('login')))
        .catch(console.warn);
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
        .catch(console.warn);
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
