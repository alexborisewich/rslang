export default class Team {
  createElement() {
    return `<section class="team">
    <div class="team__container container">
      <div class="team__teammates">
      <div class="team__teammate teammate">
        <div class="teammate__photo-container">
        <img class="teammate__photo" src="https://avatars.githubusercontent.com/u/26056975?v=4" alt="photo" />
        </div>
        <p class="teammate__name">Alexander Naumov</p>
        <a class="teammate__github" target="_blank" href="https://github.com/Axe11er">Github</a>
        <p class="teammate__role">Teamlead</p>
        <p class="teammate__description">Основной вклад: реализация словаря,
        реализация статистики, работа с Redux, стилизация приложения, помощь в реализации игры Спринт</p>
      </div>
      <div class="team__teammate teammate">
        <div class="teammate__photo-container">
        <img class="teammate__photo" src="https://avatars.githubusercontent.com/u/95849918?v=4" alt="photo" />
        </div>
        <p class="teammate__name">Aliaksei Barysewich</p>
        <a class="teammate__github" target="_blank" href="https://github.com/alexborisewich">Github</a>
        <p class="teammate__role">Developer</p>
        <p class="teammate__description">Основной вклад: помощь с организацией работы над проектом, деплой сервера,
        создание верстки и стилей для приложения, реализация игры Аудиовызов, реализация авторизации</p>
      </div>
      <div class="team__teammate teammate">
        <div class="teammate__photo-container">
        <img class="teammate__photo" src="https://avatars.githubusercontent.com/u/89007269?v=4" alt="photo" />
        </div>
        <p class="teammate__name">Aliaksey Piachko</p>
        <a class="teammate__github" target="_blank" href="https://github.com/PiachkoAliaksey">Github</a>
        <p class="teammate__role">Developer</p>
        <p class="teammate__description">Основной вклад: реализация миниигры Спринт,
        создание API для работы с сервером, дополнительная стилизация приложения,
        запись видео и подготовка презентации проекта, собрал нас всех вместе :)</p>
      </div>
      </div>
    </div>
    </section>`;
  }
}
