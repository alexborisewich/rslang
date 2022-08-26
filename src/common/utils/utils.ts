// eslint-disable-next-line import/prefer-default-export
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
