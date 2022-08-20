import Footer from './Footer';
import Header from './Header';
import Main from './Main';

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
