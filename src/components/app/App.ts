import store from '../../store/store';
import AppView from '../view/appView';

export default class App {
  view = new AppView();

  start() {
    // store.dispatch(fetchWords());
    this.view.renderApp();
    store.subscribe(() => this.view.renderApp());
  }
}
