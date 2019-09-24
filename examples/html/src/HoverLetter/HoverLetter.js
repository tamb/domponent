import { Exponent } from "domponent";

export default class HoverLetter extends Exponent {
  constructor(conf) {
    super(conf);
    this.styleID = "hover-letter__style";
    this.splitWord();
  }

  splitWord() {
    let html = this.letters.textContent
      .toString()
      .split("")
      .map(item => {
        return `<span tabindex="0" class="hoverable">${item}</span>`;
      });

    let htmlString = "";
    html.forEach(item => (htmlString += item));
    this.letters.innerHTML = "";
    this.letters.innerHTML = htmlString;

    if (!document.getElementById(this.styleID)) {
      this.placeStyles();
    }
  }
  toggleColor() {
    this.$root.classList.toggle("white");
  }

  placeStyles() {
    const style = `<style id="${this.styleID}">
        .hoverable{
            transition: transform .25s;
            display: inline-block;
            cursor: pointer;
        }
        .hoverable:hover,
        .hoverable:focus{
            transform: scale(1.4);
        }
        .white{
          color: #ffffff;
        }
    </style>`;
    document.head.insertAdjacentHTML("beforeend", style);
  }
}
