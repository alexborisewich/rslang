// import api from '../../api/api';
import { WordDictionary } from '../../../common/interface/interface';
import object from './dictionairyWords';

export const objectJSON: { object: WordDictionary[] } = { object: [] };

export class LogicGames {
  createLogic() {
    const games = document.querySelector('.games');
    games?.addEventListener('change', (event) => {
      const input = event.target as HTMLInputElement;
      objectJSON.object = object.filter((val) => val.group === Number(input.value));
      console.log(object.filter((val) => val.group === Number(input.value)));
    });
  }
}
