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

    this.init();
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
    /*
    backBtn.addEventListner("click", ()=>{ goBack(-1)})
*/

    const sliderDiv = this.docObj.createElement("div");
    sliderDiv.classList.add("poster-slider");

    for (let i = 0; i < this.imgElementsArr.length; i++) {
      this.imgElementsArr[i].setAttribute("data-slider-id", `post-${i}`);
      sliderDiv.appendChild(this.imgElementsArr[i]);
    }

    posterFrameEl.appendChild(sliderDiv);

    const forthBtn = this.docObj.createElement("button");
    forthBtn.setAttribute("type", "button");
    forthBtn.innerHTML = `<img src="${new URL(
      "./assets/arrow_forward.svg",
      import.meta.url
    )}" alt="slide forward">`;
    forthBtn.classList.add("forth");

    posterFrameEl.appendChild(forthBtn);

    const navigationEl = this.docObj.createElement("div");
    navigationEl.classList.add("navigation");
    for (let i = 0; i < this.imgElementsArr.length; i++) {
      const buttonEl = this.docObj.createElement("button");
      buttonEl.setAttribute("type", "radio");
      buttonEl.setAttribute("name", "nav-button");
      buttonEl.setAttribute("data-slider-id", `post-${i}`);
      navigationEl.appendChild(buttonEl);
    }
    posterFrameEl.appendChild(navigationEl);

    const parentEl = this.docObj.querySelector(this.options.parentSelector);
    parentEl.appendChild(posterFrameEl);
  }

  navigate(e) {
    console.log(e.target);
  }
}
