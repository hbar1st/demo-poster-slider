import { PosterSlider } from "./index.js";
import pic1 from "./assets/poster-1479785_640.jpg";
import pic2 from "./assets/orange-3491497_640.jpg";
import pic3 from "./assets/love-1125204_640.jpg";

const images = [pic1, pic2, pic3];
const altText = ["poster", "orange poster", "love poster"];
const elementArr = [];
for (let i = 0; i < 5; i++) {
  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", images[i]);
  imgEl.setAttribute("alt", altText[i]);
  elementArr.push(imgEl);
}
new PosterSlider(document, elementArr);
/**


<div class="navigation">
<a href="#post-1" data-id="post-1"></a>
<a href="#post-2" data-id="post-1"></a>
<a href="#post-3" data-id="post-1"></a>
<a href="#post-4" data-id="post-1"></a>
<a href="#post-5" data-id="post-1"></a>
</div>
*/
