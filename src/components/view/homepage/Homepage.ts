export default class Homepage {
  createElement() {
    return `<section class="homepage">
    <div class="homepage__container container">
      <div class="homepage__about">
        <div class="about__app">
          <h2 class="homepage__title title">УЧИТЬСЯ - ЛЕГКО!</h2>
          <p class="homepage__text">
            С приложением RSLang обучение превращается в увлекательную игру.
          </p>
          <p class="homepage__text">
            В учебнике мы собрали более 3000 самых используемых слов, а миниигры помогут закрепить материал.
          </p>
          <button class="homepage__btn btn">
            Смотреть
          </button>
        </div>

      </div>
      <div class="homepage__img-container">
        <img class="homepage__img-promo" src="./assets/promo-image-new.svg" />
      </div>
    </div>
  </section>`;
  }
}
