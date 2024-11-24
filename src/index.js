import "./styles.css";
export { PosterSlider };

/**
 *
 * @param {*} docObj  the document object
 * @param {*} imgElementsArr an array of HTMLImgElement objects
 * @param {*} options  an object which contains { width: <optional-string>, height: <optional-string>, parentSelector: <optional-css-selector-string}.
 */
class PosterSlider {
  static dataID = "data-slider-id";

  constructor(docObj, imgElementsArr, options) {
    this.docObj = docObj;
    this.imgElementsArr = imgElementsArr;
    const defaults = {
      width: 426, //in pixels
      height: 640, //in pixels
      parentSelector: "body",
      slideTimer: 5000,
      "aspect-ratio": "2 / 3",
    };
    this.options = Object.assign(defaults, options);

    this.currentSlide = 0;
    let root = this.docObj.documentElement;
    root.style.setProperty("--poster-width", `${this.options.width}px`);
    root.style.setProperty("--aspect-ratio", this.options["aspect-ratio"]);

    this.init();
    setInterval(this.startSlideShow, this.options.slideTimer);
  }

  startSlideShow = () => {
    this.slide(-1);
  };

  navigate(e) {
    if (e.target.hasAttribute(PosterSlider.dataID)) {
      const id = e.target.getAttribute(PosterSlider.dataID);
      this.currentSlide = Number(id.slice(5));
      this.moveTo(this.currentSlide);

      this.syncNavigation();
    }
  }

  moveTo = (slideNumber) => {
    if (slideNumber === 0) {
      this.setLeftPos(this.posterSlider, 0);
    } else {
      this.setLeftPos(
        this.posterSlider,
        slideNumber * -1 * Number(this.options.width)
      );
    }
  };

  slide = (value) => {
    let useScroll = true; //it is true if we are scrolling back and forth and false if we reached the first or last image
    let targetSlide = this.currentSlide - value;
    if (targetSlide < 0) {
      targetSlide = this.imgElementsArr.length - 1; //if at the start, jump to the end immediately
      useScroll = false;
    } else if (targetSlide === this.imgElementsArr.length) {
      targetSlide = 0; //if at the end, just to the start immediately
      useScroll = false;
    }

    if (useScroll) {
      const currentpos = this.posterSlider.style.left.slice(0, -2);
      const newVal = +currentpos + value * Number(this.options.width);
      this.setLeftPos(this.posterSlider, newVal);
    } else {
      this.moveTo(targetSlide);
    }
    this.currentSlide = targetSlide;
    this.syncNavigation();
  };

  setLeftPos(el, num) {
    el.style.left = `${num}px`;
  }

  syncNavigation() {
    Object.values(this.navigationEl.children).forEach((button) => {
      if (
        Number(button.getAttribute(PosterSlider.dataID).slice(5)) ===
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
      this.slide(1);
    });

    const sliderDiv = this.docObj.createElement("div");
    sliderDiv.classList.add("poster-slider");
    this.posterSlider = sliderDiv;

    for (let i = 0; i < this.imgElementsArr.length; i++) {
      this.imgElementsArr[i].setAttribute(PosterSlider.dataID, `post-${i}`);
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
    forthBtn.addEventListener("click", () => this.slide(-1));
    posterFrameEl.appendChild(forthBtn);

    this.navigationEl = this.docObj.createElement("div");
    this.navigationEl.classList.add("navigation");
    this.navigationEl.addEventListener("click", this.navigate.bind(this));

    const parentEl = this.docObj.querySelector(this.options.parentSelector);
    for (let i = 0; i < this.imgElementsArr.length; i++) {
      const buttonEl = this.docObj.createElement("button");
      buttonEl.setAttribute("type", "button");
      buttonEl.setAttribute("name", "nav-button");
      buttonEl.setAttribute(PosterSlider.dataID, `post-${i}`);
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
}