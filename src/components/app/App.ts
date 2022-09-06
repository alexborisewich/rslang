import { logIn } from '../../store/reducers/user/userReducer';
import store from '../../store/store';
import AppView from '../view/appView';

export default class App {
  view = new AppView();

  start() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser) as {
        message: string;
        name: string;
        refreshToken: string;
        token: string;
        userId: string;
      };
      store.dispatch(logIn(user));
    }

    this.view.renderApp();
    store.subscribe(() => this.view.renderApp());
  }
}
