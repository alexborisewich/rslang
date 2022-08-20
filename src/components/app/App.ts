import AppView from '../view/AppView';

export default class App {
  view = new AppView();

  start() {
    this.view.renderApp();
  }
}
