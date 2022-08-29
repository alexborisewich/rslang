// eslint-disable-next-line import/prefer-default-export
import timerSVG from '../../assets/timer.svg';
import bgSound from '../../assets/bg.mp3';

export const parseID = (string: string): number => parseInt(string.replace(/[^\d]/g, ''), 10);
export const playAudio = (trackUrl: string) => {
  const baseApi = 'https://rslang-172.herokuapp.com/';
  const audio = new Audio();
  audio.src = `${baseApi}${trackUrl}`;
  return new Promise((resolve) => {
    audio.play();
    audio.addEventListener('ended', () => {
      resolve('end');
    });
  });
};

export function getRandomNumber(length: number) {
  return Math.floor(Math.random() * length);
}

export function shuffleArray(array: string[]) {
  array.sort(() => Math.random() - 0.5);
}

export function play(el: HTMLAudioElement) {
  el.currentTime = 0;
  el.addEventListener('canplay', () => {
    (() => el.play())();
  });
}

export function asyncPlay(audioPath: string) {
  const audio = new Audio(audioPath);
  return new Promise((resolve) => {
    play(audio);
    audio.addEventListener('ended', () => resolve('end of audio'));
  });
}

export function playSound(answer: string) {
  const audio = document.querySelector('.audiochallenge__answer-sound') as HTMLAudioElement;
  audio.setAttribute('src', `assets/${answer}.mp3`);
  audio.volume = 1;
  play(audio);
}

export function playBackgroundSound() {
  const backgroundSound = document.querySelector('.audiochallenge__bg-sound') as HTMLAudioElement;
  backgroundSound.setAttribute('loop', 'loop');
  backgroundSound.src = bgSound;
  backgroundSound.volume = 0.02;
  play(backgroundSound);
}

export function toggleHide(firstEl: HTMLElement, secondEl: HTMLElement) {
  firstEl.classList.toggle('--hidden');
  secondEl.classList.toggle('--hidden');
}

export function removeClasses(btns: NodeListOf<Element>) {
  btns.forEach((btn) => {
    btn.classList.remove('--right');
    btn.classList.remove('--wrong');
  });
}

export function disable(btns: NodeListOf<Element> | HTMLButtonElement) {
  if ((btns as NodeListOf<Element>).length) {
    (btns as NodeListOf<HTMLButtonElement>).forEach((el) => {
      el.disabled = !el.disabled;
    });
  } else {
    (btns as HTMLButtonElement).disabled = !(btns as HTMLButtonElement).disabled;
  }
}

export function toggleFullscreen(el: HTMLElement, btn: HTMLButtonElement, onSVG: string, offSVG: string) {
  if (!document.fullscreenElement) {
    el.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
  btn.innerHTML = document.fullscreenElement ? onSVG : offSVG;
}

export function togglePreloader() {
  const preloader = document.querySelector('.preloader');
  preloader?.classList.toggle('visible');
}

export function decorate(el: HTMLElement) {
  let opacity = 1;
  let transform = 0;
  let scale = 1;
  function stepAnimate() {
    opacity -= 0.05;
    transform += 7.5;
    scale += 0.05;
    if (opacity <= 0 && transform >= 150 && scale >= 2) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-150%) scale(2, 2)';
      return;
    }
    el.style.opacity = String(opacity);
    el.style.transform = `translateY(-${transform}%) scale(${scale}, ${scale})`;
    requestAnimationFrame(stepAnimate);
  }
  stepAnimate();
}

export class Timer {
  timer: HTMLElement | null = null;

  colors = {
    positive: {
      color: 'green',
    },
    middle: {
      color: 'orange',
      step: 30,
    },
    negative: {
      color: 'red',
      step: 10,
    },
  };

  timeLimit = 120;

  timeExpired = 0;

  timeLeft = 120;

  isEnded = false;

  render() {
    this.timer = document.querySelector('.timer') as HTMLElement;
    this.timer.innerHTML = `${timerSVG}
      <span class="timer__counter">${this.formatTime()}</span>`;
  }

  formatTime() {
    const minutes = Math.floor(this.timeLeft / 60);
    let seconds: number | string = this.timeLeft % 60;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
  }

  setRemainingColor(time: number, timerPathRemaining: HTMLElement) {
    const { negative, middle, positive } = this.colors;
    if (time <= negative.step) {
      timerPathRemaining.classList.remove(middle.color);
      timerPathRemaining.classList.add(negative.color);
    } else if (time <= middle.step) {
      timerPathRemaining.classList.remove(positive.color);
      timerPathRemaining.classList.add(middle.color);
    }
  }

  calculateTimeFraction() {
    const timeFraction = this.timeLeft / this.timeLimit;
    return timeFraction - (1 / this.timeLimit) * (1 - timeFraction);
  }

  setCircleDashArray(timerPathRemaining: HTMLElement) {
    const radius = Number(document.querySelector('.timer__path-expired')?.getAttribute('r'));
    const timerLength = 2 * Math.PI * radius;
    const circleDashArray = `${this.calculateTimeFraction() * timerLength} ${timerLength}`;
    timerPathRemaining.setAttribute('stroke-dasharray', circleDashArray);
  }

  stop() {
    this.isEnded = !this.isEnded;
  }

  async start() {
    return new Promise((resolve) => {
      this.render();
      const timerPathRemaining = this.timer?.querySelector('.timer__path-remaining') as HTMLElement;
      const timerCounter = document.querySelector('.timer__counter') as HTMLElement;
      const timerInterval = setInterval(() => {
        this.timeExpired += 1;
        this.timeLeft = this.timeLimit - this.timeExpired;
        timerCounter.innerHTML = this.formatTime();
        this.setCircleDashArray(timerPathRemaining);
        this.setRemainingColor(this.timeLeft, timerPathRemaining);
        if (this.isEnded) {
          clearInterval(timerInterval);
          resolve('Timer was stopped!');
        }
        if (this.timeLeft === 0) {
          this.stop();
          clearInterval(timerInterval);
          resolve('Time is up!');
        }
      }, 1000);
    });
  }
}
