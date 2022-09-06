import store from '../../../store/store';
import schoolSVG from '../../../assets/rsschool.svg';

export default class Footer {
  appState = store.getState().app;

  createElement() {
    const { isFullscreen } = store.getState().sprint;
    return `<footer class="footer ${
      isFullscreen || this.appState.activeTab === 'sprint' || this.appState.activeTab === 'audiochallenge'
        ? 'hidden'
        : ''
    }">
        <div class="footer__container container">
          <p class="footer__copyright">© 2022 RSLang</p>
          <ul class="footer__team-list">
            <li class="footer__team-item">
              <a class="footer__team-link" href="https://github.com/Axe11er" target="_blank">Alexander Naumov</a>
            </li>
            <li class="footer__team-item">
              <a class="footer__team-link" href="https://github.com/alexborisewich" target="_blank">Aliaksei
                Barysewich</a>
            </li>
            <li class="footer__team-item">
              <a class="footer__team-link" href="https://github.com/PiachkoAliaksey"
                  target="_blank">Aliaksey Piachko</a>
            </li>
          </ul>
          <a class="footer__rsschool-link" target="_blank" href="https://rs.school/js/">
            ${schoolSVG}
          </a>
        </div>
      </footer>`;
  }

  render(parent: HTMLBodyElement) {
    parent.insertAdjacentHTML('beforeend', this.createElement());
  }
}
