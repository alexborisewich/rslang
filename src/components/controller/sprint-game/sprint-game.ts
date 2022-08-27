import { WordDictionary, Game } from '../../../common/interface/interface';
import { getRandomArrId, getRandomBoolean, getRandomInteger, playSound } from '../../../common/utils/utils';
// import api from '../../api/api';
import store from '../../../store/store';
import { switchTab } from '../../../store/reducers/app/appReducer';
import { objectJSON, LogicGames } from '../games/games';

// const response = await api.getDataPage(Number(startNewLogic.numberOfPage), 1);
// const objectJSON = (await response.json()) as WordDictionary[];

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
    const closeGame = document.querySelector('.games__close-btn');
    const answerResult = document.querySelector('.games__finish') as HTMLElement;
    const backToGames = document.querySelector('.sprint__back-to-list-games');

    closeGame?.addEventListener('click', function () {
      store.dispatch(switchTab('homepage'));
    });
    backToGames?.addEventListener('click', function () {
      store.dispatch(switchTab('games'));
      const startLogic = new LogicGames();
      startLogic.createLogic();
    });

    btnTrue.disabled = true;
    btnFalse.disabled = true;

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
      words: objectJSON.object,
      hardWords: [],
      hard: '',
      group: objectJSON.object[0].group,
      page: objectJSON.object[0].page,
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

    const checkArrLength = (object: Game) => {
      if (object.words.length) {
        WORDS_GROUP = getWordsGroup();
        WORDS_GAME = getWordsGame();
        indexesWord = getRandomArrId(WORDS_GAME.length);
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
      btnFalse.disabled = false;
      if (!timerOn) {
        timerOn = true;
        const animation = setInterval(function () {
          if (Number(timerSprint!.textContent) === 0) {
            clearInterval(animation);
            timerOn = false;
            sprintBackBlock.style.display = 'flex';
            btnTrue.disabled = true;
            btnFalse.disabled = true;
            answerResult.innerHTML = `<div class="games__finish-container">
            <h3 class="games__finish-title">Ваш результат: ${score} очков</h3>
            <h4 class="games__finish-title"> Длина серии: ${series} </h4>
            <div class="games__answers-counters">
            <span class="games__answers-right">Знаю:
              <span class="games__correct-count">${correctList.length}</span>
            </span>
            <span class="games__answers-wrong">Не знаю:
              <span class="games__wrong-count">${errorList.length}</span>
            </span>
            </div>
            <table class="games__finish-statistic">
              <thead>
                <tr>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                </tr>
              </thead>
              <tbody class = "tbody-items">
              <tr>
              <td>англ. слово</td>
              <td>[]</td>
              <td>рус. слово</td>
            </tr>
            <tr>
            <td colspan="3" style = "text-align: center; background-color:#00FF00"> Изученные</td>
            </tr>
            ${correctList.map((word: WordDictionary) => {
              return `<tr>
                <td>${word.word}</td>
                <td>${word.transcription}</td>
                <td>${word.wordTranslate}</td>
              </tr>`;
            })}
            <tr>
            <td colspan="3" style = "text-align: center; background-color:#FF0000"> Не изученные</td>
            </tr>
            ${errorList.map((word: WordDictionary) => {
              return `<tr>
                <td>${word.word}</td>
                <td>${word.transcription}</td>
                <td>${word.wordTranslate}</td>
              </tr>`;
            })}
              </tbody>
            </table>
            <button class="games__exit-btn btn">Выйти</button>
          </div>`;
            answerResult.style.display = 'flex';
            document.querySelector('.games__exit-btn')?.addEventListener('click', function () {
              answerResult.style.display = 'none';
            });
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
