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
    };
    this.options = Object.assign(defaults, options);
    this.currentSlide = 0;
    this.init();
  }

  slide = (value) => {
    let targetSlide = this.currentSlide + value;
    if (targetSlide < 0) {
      targetSlide = this.imgElementsArr.length - 1;
    } else if (targetSlide === this.imgElementsArr.length) {
      targetSlide = 0;
    }

    const posterElList = this.docObj.querySelectorAll(
      `${this.options.parentSelector} .poster`
    );
    Object.values(posterElList).forEach((el) => {
      if (Number(el.getAttribute("id").slice(5)) === targetSlide) {
        window.location.href = `#${el.getAttribute("id")}`;
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
        button.style.backgroundColor = "blue";
      } else {
        button.style.backgroundColor = "white";
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
    for (let i = 0; i < this.imgElementsArr.length; i++) {
      const buttonEl = this.docObj.createElement("button");
      buttonEl.setAttribute("type", "button");
      buttonEl.setAttribute("name", "nav-button");
      buttonEl.setAttribute("data-slider-id", `post-${i}`);
      if (i === 0) {
        buttonEl.style.backgroundColor = "blue"; //first button initially blue background
      }
      this.navigationEl.appendChild(buttonEl);
    }
    posterFrameEl.appendChild(this.navigationEl);

    const parentEl = this.docObj.querySelector(this.options.parentSelector);
    parentEl.appendChild(posterFrameEl);
  }

  navigate(e) {
    const id = e.target.getAttribute("data-slider-id");

    if (id) {
      window.location.href = `#${id}`;
      this.currentSlide = Number(id.slice(5));
    }

    this.syncNavigation();
  }
}
