import Dictionary from './Dictionary';
import Games from './Games';
import Homepage from './Homepage';
import Login from './Login';
import Registration from './Registration';
import Statistic from './Statistic';
import Team from './Team';

export default class Main {
  renderContent() {
    const state = { active: 'homepage' };

    switch (state.active) {
      case 'dictionary':
        return new Dictionary().createElement();
      case 'games':
        return new Games().createElement();
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
