import { WordDictionary, Game } from '../../../common/interface/interface';
import { getRandomArrId, getRandomBoolean, getRandomInteger, playSound } from '../../../common/utils/utils';
import api from '../../api/api';

const response = await api.getDataPage(1, 2);
const objectJSON = (await response.json()) as WordDictionary[];

// page1 group 1

class LogicSprintGame {
  createLogic() {
    const wordInEnglish = document.querySelector('.sprint__word');
    const wordInEnglishTranslate = document.querySelector('.sprint__translate');

    const scorePoint = document.querySelector('.sprint__score');
    const timerSprint = document.querySelector('.sprint__timer');
    const backToNewGame = document.querySelector('.sprint__back-to-new-game');
    const sprintBackBlock = document.querySelector('.sprint__back') as HTMLButtonElement;
    const btnTrue = document.querySelector('.sprint__answer-btn-true') as HTMLButtonElement;
    const btnFalse = document.querySelector('.sprint__answer-btn-false') as HTMLButtonElement;

    let WORDS_GROUP: WordDictionary[];
    let WORDS_GAME: WordDictionary[];

    let indexesWord: number[] = [];
    let idWord: number | undefined = 0;
    let idTranslate: number | undefined = 0;
    let round = 0;
    let series = 0;
    let seriesMax = 0;
    const mute = false;
    let score = 0;
    let timerOn = false;

    let correctList: WordDictionary[] = [];
    let errorList: WordDictionary[] = [];

    const objectGames: Game = {
      words: objectJSON,
      hardWords: [],
      hard: '',
      group: objectJSON[0].group,
      page: objectJSON[0].page,
    };

    // page1 group 1

    const getWordsGroup = () => {
      /// if (objectGames.hard) return hardWords;
      return objectGames.words.filter((item) => item.group === objectGames.group);
    };
    const getWordsGame = () => {
      if (objectGames.page) return objectGames.words.filter((item) => item.page === objectGames.page - round);
      return WORDS_GROUP;
    };

    window.onload = function () {
      sprintBackBlock.style.display = 'none';
      if (!timerOn) {
        timerOn = true;
        const animation = setInterval(function () {
          if (Number(timerSprint!.textContent) === 0) {
            clearInterval(animation);
            timerOn = false;
            sprintBackBlock.style.display = 'flex';
            alert(score);
          } else {
            timerSprint!.textContent = `${Number(timerSprint!.textContent) - 1}`;
          }
        }, 1000);
      }
    };

    const checkArrLength = (object: Game) => {
      if (object.words.length) {
        WORDS_GROUP = getWordsGroup();
        WORDS_GAME = getWordsGame();
        indexesWord = getRandomArrId(WORDS_GAME.length);
        console.log(WORDS_GAME.length);
        idWord = indexesWord.pop();
        idTranslate = getRandomBoolean() ? idWord : getRandomInteger(WORDS_GAME.length);
        wordInEnglish!.textContent = WORDS_GAME[idWord!].word;
        wordInEnglishTranslate!.textContent = WORDS_GAME[idTranslate!].wordTranslate;
      }
    };
    checkArrLength(objectGames);

    btnTrue?.addEventListener('click', function () {
      const correctAnswer = idWord === idTranslate;
      playSound(correctAnswer === true, mute);
      if (correctAnswer === true) {
        correctList.push(WORDS_GAME[idWord!]);
        series += 1;
        console.log(series);
        console.log(correctList);
        seriesMax = seriesMax < series ? series : seriesMax;
        score += Math.min(series * 20, 80);
        scorePoint!.textContent = `${score}`;
      } else {
        errorList.push(WORDS_GAME[idWord!]);
        series = 0;
        console.log(errorList);
      }
      if (indexesWord.length) {
        idWord = indexesWord.pop();
        idTranslate = getRandomBoolean() ? idWord : getRandomInteger(19);
        wordInEnglish!.textContent = WORDS_GAME[idWord!].word;
        wordInEnglishTranslate!.textContent = WORDS_GAME[idTranslate!].wordTranslate;
      } else {
        indexesWord = getRandomArrId(WORDS_GAME.length);
        if (objectGames.page > round) {
          round += 1;
          WORDS_GAME = getWordsGame();
          idWord = indexesWord.pop();
          idTranslate = getRandomBoolean() ? idWord : getRandomInteger(19);
          wordInEnglish!.textContent = WORDS_GAME[idWord!].word;
          wordInEnglishTranslate!.textContent = WORDS_GAME[idTranslate!].wordTranslate;
        }
      }
    });

    btnFalse?.addEventListener('click', function () {
      const correctAnswer = idWord === idTranslate;
      playSound(correctAnswer === false, mute);
      if (correctAnswer === false) {
        errorList.push(WORDS_GAME[idWord!]);
        series = 0;
        console.log(errorList);
      } else {
        correctList.push(WORDS_GAME[idWord!]);
        series += 1;
        seriesMax = seriesMax < series ? series : seriesMax;
        score += Math.min(series * 20, 80);
        scorePoint!.textContent = `${score}`;
      }
      if (indexesWord.length) {
        idWord = indexesWord.pop();
        idTranslate = getRandomBoolean() ? idWord : getRandomInteger(19);
        wordInEnglish!.textContent = WORDS_GAME[idWord!].word;
        wordInEnglishTranslate!.textContent = WORDS_GAME[idTranslate!].wordTranslate;
      } else {
        indexesWord = getRandomArrId(WORDS_GAME.length);
        if (objectGames.page > round) {
          round += 1;
          WORDS_GAME = getWordsGame();
          idWord = indexesWord.pop();
          idTranslate = getRandomBoolean() ? idWord : getRandomInteger(19);
          wordInEnglish!.textContent = WORDS_GAME[idWord!].word;
          wordInEnglishTranslate!.textContent = WORDS_GAME[idTranslate!].wordTranslate;
        }
      }
    });

    const onClickNewGameSprint = function () {
      indexesWord = getRandomArrId(WORDS_GAME.length);
      idWord = indexesWord.pop();
      idTranslate = getRandomBoolean() ? idWord : getRandomInteger(19);
      wordInEnglish!.textContent = WORDS_GAME[idWord!].word;
      wordInEnglishTranslate!.textContent = WORDS_GAME[idTranslate!].wordTranslate;
      scorePoint!.textContent = `0`;
      correctList = [];
      errorList = [];
      series = 0;
      score = 0;

      timerSprint!.textContent = '60';
      sprintBackBlock.style.display = 'none';
      btnTrue.disabled = false;
      btnTrue.disabled = false;
      if (!timerOn) {
        timerOn = true;
        const animation = setInterval(function () {
          if (Number(timerSprint!.textContent) === 0) {
            clearInterval(animation);
            timerOn = false;
            sprintBackBlock.style.display = 'flex';
            btnTrue.disabled = true;
            btnTrue.disabled = true;
            alert(score);
          } else {
            timerSprint!.textContent = `${Number(timerSprint!.textContent) - 1}`;
          }
        }, 1000);
      }
    };
    backToNewGame!.addEventListener('click', onClickNewGameSprint);
  }
}

export default LogicSprintGame;
