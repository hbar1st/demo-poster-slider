import "./styles.css";
export { PosterSlider };

/**
 *
 * @param {*} docObj  the document object
 * @param {*} imgElementsArr an array of HTMLImgElement objects
 * @param {*} options  an object which contains { width: <optional-string>, height: <optional-string>, parentSelector: <optional-css-selector-string}.
 */
class PosterSlider {
  constructor(docObj, imgElementsArr, options) {
    this.docObj = docObj;
    this.imgElementsArr = imgElementsArr;
    const defaults = {
      width: "426px",
      height: "640px",
      parentSelector: "body",
      slideTimer: 5000,
      "aspect-ratio": "2 / 3",
    };
    this.options = Object.assign(defaults, options);

    this.currentSlide = 0;
    let root = this.docObj.documentElement;
    root.style.setProperty("--poster-width", this.options.width);
    root.style.setProperty("--aspect-ratio", this.options["aspect-ratio"]);

    this.init();
    setInterval(this.startSlideShow, this.options.slideTimer);
  }

  startSlideShow = () => {
    this.slide(1);
  };

  slide = (value) => {
    let useScroll = true;
    let targetSlide = this.currentSlide + value;
    if (targetSlide < 0) {
      targetSlide = this.imgElementsArr.length - 1;
      useScroll = false;
    } else if (targetSlide === this.imgElementsArr.length) {
      targetSlide = 0;
      useScroll = false;
    }

    const posterElList = this.docObj.querySelectorAll(
      `${this.options.parentSelector} .poster`
    );
    Object.values(posterElList).forEach((el) => {
      if (Number(el.getAttribute("id").slice(5)) === targetSlide) {
        if (useScroll) {
          el.scrollIntoView({ behavior: "smooth", inline: "start" });
        } else {
          window.location.href = `#${el.getAttribute("id")}`;
        }
      }
    });

    this.currentSlide = targetSlide;
    this.syncNavigation();
  };

  syncNavigation() {
    Object.values(this.navigationEl.children).forEach((button) => {
      if (
        Number(button.getAttribute("data-slider-id").slice(5)) ===
        this.currentSlide
      ) {
        button.style.backgroundColor = getComputedStyle(
          button
        ).getPropertyValue("--nav-button-hover-color");
      } else {
        button.style.backgroundColor = getComputedStyle(
          button
        ).getPropertyValue("--nav-button-background-color");
      }
    });
  }

  init() {
    const posterFrameEl = this.docObj.createElement("div");
    posterFrameEl.classList.add("poster-frame");

    const backBtn = this.docObj.createElement("button");
    backBtn.setAttribute("type", "button");
    backBtn.innerHTML = `<img src="${new URL(
      "./assets/arrow_back.svg",
      import.meta.url
    )}" alt="slide back">`;
    backBtn.classList.add("back");
    posterFrameEl.appendChild(backBtn);

    backBtn.addEventListener("click", () => {
      this.slide(-1);
    });

    const sliderDiv = this.docObj.createElement("div");
    sliderDiv.classList.add("poster-slider");

    for (let i = 0; i < this.imgElementsArr.length; i++) {
      this.imgElementsArr[i].setAttribute("data-slider-id", `post-${i}`);
      const spanEl = this.docObj.createElement("span");
      spanEl.classList.add("poster");
      spanEl.setAttribute("id", `post-${i}`);
      spanEl.appendChild(this.imgElementsArr[i]);
      sliderDiv.appendChild(spanEl);
    }

    posterFrameEl.appendChild(sliderDiv);

    const forthBtn = this.docObj.createElement("button");
    forthBtn.setAttribute("type", "button");
    forthBtn.innerHTML = `<img src="${new URL(
      "./assets/arrow_forward.svg",
      import.meta.url
    )}" alt="slide forward">`;
    forthBtn.classList.add("forth");
    forthBtn.addEventListener("click", () => this.slide(1));
    posterFrameEl.appendChild(forthBtn);

    this.navigationEl = this.docObj.createElement("div");
    this.navigationEl.classList.add("navigation");
    this.navigationEl.addEventListener("click", this.navigate.bind(this));

    const parentEl = this.docObj.querySelector(this.options.parentSelector);
    for (let i = 0; i < this.imgElementsArr.length; i++) {
      const buttonEl = this.docObj.createElement("button");
      buttonEl.setAttribute("type", "button");
      buttonEl.setAttribute("name", "nav-button");
      buttonEl.setAttribute("data-slider-id", `post-${i}`);
      if (i === 0) {
        buttonEl.style.backgroundColor = getComputedStyle(
          parentEl
        ).getPropertyValue("--nav-button-hover-color");
      }
      this.navigationEl.appendChild(buttonEl);
    }
    posterFrameEl.appendChild(this.navigationEl);

    parentEl.appendChild(posterFrameEl);
  }

  navigate(e) {
    const id = e.target.getAttribute("data-slider-id");
    const el = this.docObj.querySelector(`#${id}`);
    el.scrollIntoView({ behavior: "smooth", inline: "start" });

    this.currentSlide = Number(id.slice(5));
    this.syncNavigation();
  }
}
