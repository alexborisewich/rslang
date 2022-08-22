import Footer from './layout/Footer';
import Header from './layout/Header';
import Main from './layout/Main';

export default class AppView {
  body = document.querySelector('body') as HTMLBodyElement;

  listen() {}

  renderHeader() {
    new Header().render(this.body);
  }

  renderMain() {
    new Main().render(this.body);
  }

  renderFooter() {
    new Footer().render(this.body);
  }

  renderApp() {
    this.body.innerHTML = '';
    this.renderHeader();
    this.renderMain();
    this.renderFooter();
  }
}
