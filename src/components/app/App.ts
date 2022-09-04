import store from '../../store/store';
import AppView from '../view/appView';

export default class App {
  view = new AppView();

  start() {
    this.view.renderApp();
    store.subscribe(() => {
      localStorage.setItem('userState', JSON.stringify(store.getState().user));
      this.view.renderApp();
      //   console.log(localStorage.getItem('userState'));
    });
  }
}
