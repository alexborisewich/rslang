// import { fetchWords } from '../../store/reducers/dictionary/dictionaryReducer';
import store from '../../store/store';
import AppView from '../view/appView';

export default class App {
  view = new AppView();

  //   state = store.getState().dictionary;

  start() {
    // store.dispatch(fetchWords({ group: this.state.group, page: this.state.page }));
    this.view.renderApp();
    store.subscribe(() => this.view.renderApp());
  }
}