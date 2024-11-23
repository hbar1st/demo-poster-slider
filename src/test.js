import { PosterSlider } from "./index.js";
import pic1 from "./assets/poster-1479785_640.jpg";
import pic2 from "./assets/orange-3491497_640.jpg";
import pic3 from "./assets/love-1125204_640.jpg";
import pic4 from "./assets/coffee-7095440_640.png";
import pic5 from "./assets/look-8432000_640.jpg";

const images = [pic1, pic2, pic3, pic4, pic5];
const altText = ["poster", "orange poster", "coffee poster", "look poster"];
const elementArr = [];
for (let i = 0; i < 5; i++) {
  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", images[i]);
  imgEl.setAttribute("alt", altText[i]);
  elementArr.push(imgEl);
}
new PosterSlider(document, elementArr);
