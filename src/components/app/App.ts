import { checkUser } from '../../common/utils/utils';
import { logIn } from '../../store/reducers/user/userReducer';
import store from '../../store/store';
import AppView from '../view/appView';

export default class App {
  view = new AppView();

  start() {
    const storedUser = checkUser();
    if (storedUser) store.dispatch(logIn(storedUser));
    this.view.renderApp();
    store.subscribe(() => this.view.renderApp());
  }
}
