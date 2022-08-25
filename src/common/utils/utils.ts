// eslint-disable-next-line import/prefer-default-export
export const parseID = (string: string): number => parseInt(string.replace(/[^\d]/g, ''), 10);

export const createArrId = (number:number) => {
  const array:number[]  = [];
  Array(number).fill(0).forEach((_item:number, id:number) => array.push(id));
  return array;
};

export const getRandomArrId = (number:number) => {
  let array = createArrId(number);
  for (let i = number - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const getRandomBoolean = () => {
  return Math.random() < 0.5;
}

export const getRandomInteger = (maxNum:number) => {
  return Math.floor(Math.random() * Math.floor(maxNum));
};

export const playSound = (answer:boolean, mute:boolean) => {
  const audio = new Audio();
  if (!mute) {
    audio.src = answer ? '../assets/music/correct.mp3' : '../assets/music/error.mp3';
    audio.play();
  }
};

