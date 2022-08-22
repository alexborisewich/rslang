export default class Homepage {
  createElement() {
    return `<section class="homepage">
      <div class="homepage__container container">
        <div class="homepage__about">
          <div class="about__app">
            <h2 class="homepage__title title">О приложении</h2>
            <p class="homepage__text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quae adipisci
              architecto commodi nobis. Eum accusantium quae nobis ipsam amet, quo dignissimos fuga quod distinctio
              soluta, asperiores deserunt impedit odit?
            </p>
            <button class="homepage__btn btn">Смотреть</button>
          </div>
          <div class="about__team">
            <h2 class="homepage__title title">О команде</h2>
            <p class="homepage__text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quae adipisci
              architecto commodi nobis. Eum accusantium quae nobis ipsam amet, quo dignissimos fuga quod distinctio
              soluta, asperiores deserunt impedit odit?
            </p>
            <button class="homepage__btn btn">Смотреть</button>
          </div>
          <nav class="homepage__nav">
            <button class="homepage__nav-btn"></button>
            <button class="homepage__nav-btn"></button>
          </nav>
        </div>
        <div class="homepage__img">
        </div>
      </div>
    </section>`;
  }
}
