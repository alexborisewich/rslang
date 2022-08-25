import store from '../../../store/store';
import Login from '../authorization/Login';
import Registration from '../authorization/Registration';
import Dictionary from '../dictionary/Dictionary';
import Homepage from '../homepage/Homepage';
import Games from '../mini-games/Games';
import Statistic from '../statistics/Statistic';
import Team from '../team/Team';
import SprintGame from '../mini-games/sprint/Sprint';

export default class Main {
  renderContent() {
    const state = store.getState().app;

    switch (state.activeTab) {
      case 'dictionary':
        return new Dictionary().createElement();
      case 'games':
        return new Games().createElement();
      case 'sprint':
        return new SprintGame().createElement();
      case 'team':
        return new Team().createElement();
      case 'statistic':
        return new Statistic().createElement();
      case 'registration':
        return new Registration().createElement();
      case 'login':
        return new Login().createElement();

      default:
        return new Homepage().createElement();
    }
  }

  createElement() {
    return `<main class="main">${this.renderContent()}</main>`;
  }

  render(parent: HTMLBodyElement) {
    parent.insertAdjacentHTML('beforeend', this.createElement());
  }
}
