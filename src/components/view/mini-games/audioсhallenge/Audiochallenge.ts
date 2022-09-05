import api from '../../../api/api';
import muteOnSVG from '../../../../assets/mute-on.svg';
import muteOffSVG from '../../../../assets/mute-off.svg';
import fullScreenOnSVG from '../../../../assets/fullscreen-on.svg';
import fullScrennOffSVG from '../../../../assets/fullscreen-off.svg';
import closeSVG from '../../../../assets/close.svg';
import heartSVG from '../../../../assets/heart.svg';
import playSVG from '../../../../assets/play.svg';
import succesSVG from '../../../../assets/success.svg';
import wrongSVG from '../../../../assets/wrong.svg';
import scoreSVG from '../../../../assets/score.svg';
import streakSVG from '../../../../assets/streak.svg';
import restartSVG from '../../../../assets/restart.svg';
import gamesSVG from '../../../../assets/games.svg';
import preloaderGIF from '../../../../assets/preloader.gif';
import { Dictionary, Statistic } from '../../../../common/interface/interface';
import {
  getRandomNumber,
  shuffleArray,
  playSound,
  playBackgroundSound,
  Timer,
  play,
  removeClasses,
  toggleFullscreen,
  togglePreloader,
  toggleHide,
  decorate,
  disable,
  asyncPlay,
} from '../../../../common/utils/utils';
import store from '../../../../store/store';
import { switchTab } from '../../../../store/reducers/app/appReducer';
import { UserState } from '../../../../common/types/user/types';

export default class AudioChallengeGame {
  level: number;

  page: number;

  container = document.querySelector('.main') as HTMLDivElement;

  api = api;

  words: Dictionary[] | null = null;

  current = 0;

  timer = new Timer();

  questions: Dictionary[] = [];

  score = 0;

  scoreStep = 20;

  attemptCounter = 5;

  maxStreak = 0;

  streakCounter = 0;

  isEnded = false;

  muted = false;

  userId: string;

  token: string;

  statistic: Statistic;

  isLoggedOn: boolean;

  constructor(level?: number, page?: number) {
    if (level) this.level = level;
    else this.level = 0;
    if (page || page === 0) this.page = page;
    else this.page = getRandomNumber(30);
    const userState: UserState = JSON.parse(JSON.stringify(store.getState().user)) as UserState;
    ({ userId: this.userId, token: this.token, statistic: this.statistic, isLoggedOn: this.isLoggedOn } = userState);
  }

  async start() {
    this.renderGame();
    this.btnsHandler();
    this.keyboardHandler();
    this.attemptHandler();
    await this.setData()
      .then(() => playBackgroundSound())
      .then(() => togglePreloader())
      .then(() => this.timer.start())
      .then(() => this.finishGame());
  }

  renderStartScreen() {
    this.container.innerHTML = '';
    this.container.innerHTML = `
    <section class="audiochallenge container">
    <div class="audiochallenge__start-screen start">
        <h2 class="start__title">Аудиовызов</h2>
        <div class="start__instruction-wrapper">
          <p class="start__instruction">Используйте клавиши:</p>
          <p class="start__instruction">
            <span class="start__key" ><i>1</i></span>, <span class="start__key" ><i>2</i></span>,
            <span class="start__key" ><i>3</i></span>, <span class="start__key" ><i>4</i></span>,
            <span class="start__key" ><i>5</i></span>, для ответа</p>
          <p class="start__instruction"><span class="start__key --long" ><i>⏎ Enter</i></span>,
            для отображения правильного ответа</p>
          <p class="start__instruction"><span class="start__key" ><i>⇨</i></span>, для перехода к следующему вопросу</p>
          <p class="start__instruction"><span class="start__key --long" ><i>Space</i></span>,
          для повторного воспроизведения</p>
        </div>
        <div class="start__select-level-wrapper">
          <label for="games-select-level">Выберите уровень сложности</label>
          <select class="start__level" name="-level" id="-level">
            <option value="0">A1 Elementary</option>
            <option value="1">A2 Pre-Intermediate</option>
            <option value="2">B1 Intermediate</option>
            <option value="3">B2 Upper-Intermediate</option>
            <option value="4">C1 Advanced</option>
            <option value="5">C2 Proficiency</option>
        </select>
        </div>
        <button class="start__btn audiogame-btn btn-start">Играть</button>
      </div>
      </section>`;
    const levelSelector = this.container.querySelector('.start__level') as HTMLSelectElement;
    if (this.level) levelSelector.selectedIndex = this.level;
    levelSelector.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      this.level = target.selectedIndex;
    });
    const startBtn = this.container.querySelector('.btn-start') as HTMLButtonElement;
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    startBtn.addEventListener('click', this.start.bind(this));
  }

  renderGame() {
    this.container.innerHTML = `
    <section class="audiochallenge container">
    <div class="audiochallenge__preloader preloader visible">
        <img class="preloader__img" src="${preloaderGIF}" alt="preloader">
      </div>
      <audio class="audiochallenge__answer-sound" audio preload="auto"></audio>
      <audio class="audiochallenge__bg-sound" preload="auto"></audio>
      <div class="audiochallenge__control-btn-wrapper">
        <button class="audiochallenge__mute-btn audiogame-btn btn-mute">${muteOffSVG}</button>
        <button class="audiochallenge__screen-btn audiogame-btn btn-screen">${fullScreenOnSVG}</button>
        <button class="audiochallenge__close-btn audiogame-btn btn-exit">${closeSVG}</button>
      </div>
      <div class="audiochallenge__game game">
        <div class="game__header">
          <div class="game__timer timer"></div>
          <div class="game__score score">
            <span class="score__title" >Score: </span>
            <span class="score__pointer">${this.score}</span>
          </div>
          <div class="game__streak streak">
          <span class="streak__title" >Better streak: </span>
          <span class="streak__pointer">${this.maxStreak}</span>
          </div>
          <ul class="game__lives-list">
            <li class="game__lives-item">${heartSVG}</li>
            <li class="game__lives-item">${heartSVG}</li>
            <li class="game__lives-item">${heartSVG}</li>
            <li class="game__lives-item">${heartSVG}</li>
            <li class="game__lives-item">${heartSVG}</li>
          </ul>
        </div>
        <div class="game__body"></div>
        <div class="game__footer">
          <div class="game__answer-wrapper">
            <button class="game__answer-btn audiogame-btn btn-answer"></button>
            <button class="game__answer-btn audiogame-btn btn-answer"></button>
            <button class="game__answer-btn audiogame-btn btn-answer"></button>
            <button class="game__answer-btn audiogame-btn btn-answer"></button>
            <button class="game__answer-btn audiogame-btn btn-answer"></button>
          </div>
          <div class="game__skip-wrapper">
            <button class="game__not-answer-btn icon-github audiogame-btn btn-not-answer">Показать ответ</button>
            <button class="game__next-btn audiogame-btn btn-next --hidden">Следующий вопрос</button>
          </div>
        </div>
      </div>
      <div class="audiochallenge__finish finish --hidden"></div>
      </section>`;
  }

  btnsHandler() {
    const answerBtns = this.container.querySelectorAll('.btn-answer');
    answerBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        removeClasses(answerBtns);
        this.checkAnswer.call(this, e, answerBtns);
      });
    });
    const notAnswerBtn = this.container.querySelector('.btn-not-answer') as HTMLButtonElement;
    notAnswerBtn?.addEventListener('click', () => {
      removeClasses(answerBtns);
      this.skipAnswer.call(this);
      disable(answerBtns);
      toggleHide(notAnswerBtn, nextBtn);
    });
    const nextBtn = this.container.querySelector('.btn-next') as HTMLButtonElement;
    nextBtn?.addEventListener('click', (e) => {
      removeClasses(answerBtns);
      this.toNextQuestion.call(this, e);
      disable(answerBtns);
      toggleHide(notAnswerBtn, nextBtn);
    });
    const fullScreenBtn = this.container.querySelector('.btn-screen') as HTMLButtonElement;
    fullScreenBtn?.addEventListener('click', () => {
      toggleFullscreen(this.container, fullScreenBtn, fullScreenOnSVG, fullScrennOffSVG);
    });
    const muteBtn = this.container.querySelector('.btn-mute');
    muteBtn?.addEventListener('click', () => {
      this.muted = !this.muted;
      muteBtn.innerHTML = this.muted ? muteOnSVG : muteOffSVG;
      this.container?.querySelectorAll('audio').forEach((el, i) => {
        if (i < 2) el.muted = !el.muted;
      });
    });
    const exitBtn = this.container.querySelector('.btn-exit');
    exitBtn?.addEventListener('click', () => store.dispatch(switchTab('homepage')));
  }

  keyboardHandler() {
    const answerBtns = this.container.querySelectorAll('.btn-answer');
    const notAnswerBtn = this.container.querySelector('.btn-not-answer') as HTMLButtonElement;
    const nextBtn = this.container.querySelector('.btn-next') as HTMLButtonElement;
    const questionSpeaker = this.container.querySelector('.game__speaker') as HTMLElement;
    const correctSpeaker = this.container.querySelector('.correct__speaker') as HTMLElement;
    const nextKeyboardBtn = 'ArrowRight';
    const answerKeyboardBtn = 'Enter';
    const soundKeyboardBtn = 'Space';
    const keyboardKeys: { [key: string]: boolean } = {
      Digit1: false,
      Digit2: false,
      Digit3: false,
      Digit4: false,
      Digit5: false,
      Enter: false,
      ArrowRight: false,
      Space: false,
    };
    function handleKeyDown(e: KeyboardEvent) {
      const keyPressed = e.code;
      if (keyboardKeys[keyPressed] || keyboardKeys[keyPressed] === undefined) {
        return;
      }
      keyboardKeys[keyPressed] = true;
    }
    function handleKeyUp(e: KeyboardEvent) {
      const keyPressed = e.code;
      if (keyboardKeys[keyPressed]) {
        if (keyPressed === nextKeyboardBtn) {
          if (nextBtn.classList.contains('--hidden')) return;
          nextBtn.click();
          return;
        }
        if (keyPressed === answerKeyboardBtn) {
          if (notAnswerBtn.classList.contains('--hidden')) return;
          notAnswerBtn.click();
          return;
        }
        if (keyPressed === soundKeyboardBtn) {
          if (nextBtn.classList.contains('--hidden')) questionSpeaker.click();
          else correctSpeaker.click();
          return;
        }
        const index = +keyPressed.slice(-1);
        (answerBtns[index - 1] as HTMLButtonElement).click();
        keyboardKeys[keyPressed] = false;
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
  }

  scoreHahdler() {
    const scorePointer = this.container.querySelector('.score__pointer') as HTMLSpanElement;
    scorePointer.textContent = String(this.score);
    const scoreDecorator = document.createElement('span');
    scoreDecorator.className = 'score__decorator';
    scorePointer.append(scoreDecorator);
    decorate(scoreDecorator);
    scoreDecorator.textContent = `+${this.scoreStep}`;
  }

  streakHundler() {
    const streakPointer = this.container.querySelector('.streak__pointer') as HTMLSpanElement;
    streakPointer.textContent = String(this.maxStreak);
  }

  attemptHandler() {
    const livesPointers = this.container.querySelectorAll('.game__heart-svg');
    livesPointers.forEach((livePointer, index) => {
      if (!livePointer.getAttribute('attempt')) (livePointer as HTMLElement).dataset.attempt = String(index + 1);
    });
    for (let i = this.attemptCounter + 1; i <= livesPointers.length; i += 1) {
      const heart = this.container.querySelector(`.game__heart-svg[data-attempt="${i}"]`);
      if (!heart?.classList.contains('lost')) heart?.classList.add('--lost');
    }
    if (!this.attemptCounter) this.timer.stop();
  }

  async getData(page: number) {
    const response = await this.api.getDataPage(this.level, page);
    return (await response.json()) as Promise<Dictionary[]>;
  }

  renderGameBody() {
    if (this.words) {
      const {
        word,
        image,
        audio,
        audioMeaning,
        audioExample,
        textMeaning,
        textExample,
        transcription,
        textExampleTranslate,
        textMeaningTranslate,
      } = this.words[this.current];
      const baseLink = this.api.baseApi;
      const gameBody = this.container.querySelector('.game__body') as HTMLElement;
      gameBody.innerHTML = `<button class="game__speaker speaker question-btn">
        ${playSVG}<audio class="speaker__question-sound" src ="${baseLink}${audio}" preload="auto"></audio>
        </button>
        <div class="game__correct-data correct --hidden">
          <div class="correct__img-wrapper">
            <img class="correct__img" src="${baseLink}${image}" alt="${word}">
            <button class="correct__speaker speaker correct-btn">${playSVG}</button>
          </div>
          <div class="correct__text-data-wrapper">
            <p class="correct__word">${word} ${transcription}</p>
            <p class="correct__meaning">${textMeaning}</p>
            <p class="correct__meaninig-translate">${textMeaningTranslate}</p>
            <p class="correct__example">${textExample}</p>
            <p class="correct__example-translate">${textExampleTranslate}</p>
          </div>
        </div>`;
      const questionAudioBtn = this.container.querySelector('.question-btn') as HTMLButtonElement;
      questionAudioBtn.addEventListener('click', () => play(questionAudioBtn.lastElementChild as HTMLAudioElement));
      const correctAudioBtn = this.container.querySelector('.correct-btn') as HTMLButtonElement;
      correctAudioBtn.addEventListener('click', () => {
        disable(correctAudioBtn);
        asyncPlay(baseLink + audio)
          .then(() => asyncPlay(baseLink + audioMeaning))
          .then(() => asyncPlay(baseLink + audioExample))
          .then(() => disable(correctAudioBtn));
      });
    }
  }

  async setData() {
    if (!this.words) this.words = await this.getData(this.page);
    if (this.current === this.words.length) {
      if (this.page === 0) {
        this.timer.stop();
        this.isEnded = !this.isEnded;
      }
      if (this.page !== 0) {
        this.page -= 1;
        this.words = await this.getData(this.page);
        this.current = 0;
      }
    }
    if (this.isEnded) return;
    const { wordTranslate, audio } = this.words[this.current];
    this.renderGameBody();
    setTimeout(() => play(new Audio(this.api.baseApi + audio)), 500);
    const answers: string[] = [];
    answers.push(wordTranslate);
    for (let i = 0; i < 4; i += 1) {
      let wrongAnswer: string = this.words[getRandomNumber(this.words.length)].wordTranslate;
      const answerSet = new Set(answers);
      while (answerSet.has(wrongAnswer)) wrongAnswer = this.words[getRandomNumber(this.words.length)].wordTranslate;
      answers.push(wrongAnswer);
    }
    shuffleArray(answers);
    const answerBtns = this.container.querySelectorAll('.btn-answer');
    answerBtns.forEach((btn, i) => {
      btn.textContent = `${answers[i]}`;
    });
    this.questions.push(this.words[this.current]);
  }

  checkAnswer(e: Event, answerBtns: NodeListOf<Element>) {
    const words = this.words as Dictionary[];
    const { wordTranslate } = words[this.current];
    const { target } = e;
    const userAnswer = (target as HTMLElement).textContent;
    const notAnswerBtn = this.container.querySelector('.btn-not-answer') as HTMLButtonElement;
    const nextBtn = this.container.querySelector('.btn-next') as HTMLButtonElement;
    if (userAnswer === wordTranslate) {
      this.questions[this.questions.length - 1].correctAnswer = 1;
      if (this.isLoggedOn) {
        this.statistic.optional.audiochallenge.totalCorrect += 1;
        this.api.setUserStat(this.userId, this.token, this.statistic);
      }
      this.streakCounter += 1;
      if (this.streakCounter > this.maxStreak) this.maxStreak = this.streakCounter;
      this.streakHundler();
      this.score += this.scoreStep;
      (target as HTMLElement).classList.add('--right');
      playSound('right');
      this.scoreHahdler();
      this.toNextQuestion();
    } else {
      toggleHide(notAnswerBtn, nextBtn);
      this.showCorrectAnswer();
      this.attemptCounter -= 1;
      this.streakCounter = 0;
      this.questions[this.questions.length - 1].correctAnswer = 0;
      playSound('wrong');
      (target as HTMLElement).classList.add('--wrong');
      disable(answerBtns);
      answerBtns.forEach((btn) => {
        if (btn.textContent === wordTranslate) btn.classList.add('--right');
      });
      this.attemptHandler();
    }
  }

  skipAnswer() {
    playSound('wrong');
    if (this.words) {
      const { wordTranslate } = this.words[this.current];
      const answerBtns = this.container.querySelectorAll('.btn-answer');
      answerBtns.forEach((btn) => {
        if (btn.textContent === wordTranslate) btn.classList.add('--right');
      });
    }
    this.attemptCounter -= 1;
    this.streakCounter = 0;
    this.questions[this.questions.length - 1].correctAnswer = 0;
    this.attemptHandler();
    this.showCorrectAnswer();
  }

  async toNextQuestion(e?: Event) {
    if (e) this.showCorrectAnswer();
    this.current += 1;
    await this.setData();
  }

  showCorrectAnswer() {
    const correctData = this.container.querySelector('.correct') as HTMLElement;
    const questionData = this.container.querySelector('.speaker') as HTMLElement;
    toggleHide(correctData, questionData);
  }

  renderFinishScreen() {
    const finishScreen = this.container.querySelector('.finish') as HTMLElement;
    finishScreen.innerHTML += `<div class="finish__container">
          <h3 class="finish__title">Результаты игры</h3>
          <div class="finish__answers-wrapper">
            <span class="finish__right">
              <span class="finish__icon">${succesSVG}</span>
              <span class="finish__right-count">1</span>
            </span>
            <span class="finish__wrong">
              <span class="finish__icon">${wrongSVG}</span>
              <span class="finish__wrong-count">1</span>
            </span>
            <span class="finish__score">
              <span class="finish__icon">${scoreSVG}</span>
              <span class="finish__score-count">${this.score}</span>
            </span>
            <span class="finish__streak">
              <span class="finish__icon">${streakSVG}</span>
              <span class="finish__streak-count">${this.maxStreak}</span>
            </span>
          </div>
          <div class="finish__table-wrapper">
          <table class="finish__statistic-table"><tbody></tbody></table>
          </div>
          <div class="finish__btn-wrapper">
            <button class="finish__restart-btn audiogame-btn btn-restart">${restartSVG}</button>
            <button class="finish__change-btn audiogame-btn btn-change">${gamesSVG}</button>
            <button class="finish__exit-btn audiogame-btn btn-close">${closeSVG}</button>
          </div>
        </div>`;
    this.renderTableStatisticData();
    this.container
      .querySelectorAll('.finish__audio-cell')
      .forEach((cell) => cell.addEventListener('click', () => play(cell.lastElementChild as HTMLAudioElement)));
    const restartBtn = this.container.querySelector('.btn-restart');
    restartBtn?.addEventListener('click', () => {
      this.setDefaultValues();
      this.renderStartScreen();
    });
    const changeGameBtn = this.container.querySelector('.btn-change');
    changeGameBtn?.addEventListener('click', () => store.dispatch(switchTab('games')));
    const closeBtn = this.container.querySelector('.btn-close');
    closeBtn?.addEventListener('click', () => finishScreen.classList.add('--hidden'));
  }

  renderTableStatisticData() {
    const tableBody = this.container.querySelector('tbody') as HTMLElement;
    const rightContainer = this.container.querySelector('.finish__right-count') as HTMLElement;
    const wrongContainer = this.container.querySelector('.finish__wrong-count') as HTMLElement;
    let rightCount = 0;
    let wrongCount = 0;
    for (let i = 0; i < this.questions.length; i += 1) {
      const { audio, word, transcription, wordTranslate, correctAnswer } = this.questions[i];
      if (correctAnswer) rightCount += 1;
      else wrongCount += 1;
      tableBody.innerHTML += `<tr class="${correctAnswer ? 'right-row' : 'wrong-row'}">
          <td class="finish__audio-cell">${playSVG}<audio src="${this.api.baseApi}${audio}" preload ="auto"></audio>
          </td><td>${word}</td><td>${transcription}</td><td>${wordTranslate}</td>
        </tr>`;
    }
    rightContainer.innerHTML = String(rightCount);
    wrongContainer.innerHTML = String(wrongCount);
  }

  setDefaultValues() {
    this.isEnded = false;
    this.words = null;
    this.timer = new Timer();
    this.current = 0;
    this.questions = [];
    this.score = 0;
    this.attemptCounter = 5;
    this.maxStreak = 0;
    this.streakCounter = 0;
  }

  finishGame() {
    this.renderFinishScreen();
    this.isEnded = !this.isEnded;
    this.statistic.optional.audiochallenge.finished += 1;
    this.statistic.optional.audiochallenge.totalScore += this.score;
    this.api.setUserStat(this.userId, this.token, this.statistic);
    const footerBtnWrapper = this.container.querySelector('.game__skip-wrapper') as HTMLElement;
    footerBtnWrapper.innerHTML = `
      <button class="game__finish-btn audiogame-btn btn-finish">Показать статистику</button>`;
    const answerBtns = this.container.querySelectorAll('.btn-answer');
    disable(answerBtns);
    const finishScreen = this.container.querySelector('.finish') as HTMLElement;
    const finishBtn = this.container.querySelector('.btn-finish') as HTMLElement;
    finishBtn.addEventListener('click', () => finishScreen.classList.remove('--hidden'));
  }
}
