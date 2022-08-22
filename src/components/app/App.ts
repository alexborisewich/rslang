import AppView from '../view/appView';

export default class App {
  view = new AppView();

  start() {
    this.view.renderApp();
  }
}
