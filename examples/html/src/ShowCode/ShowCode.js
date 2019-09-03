import { Exponent } from "domponent";

export default class ShowCode extends Exponent {
  constructor(conf) {
    super(conf);
    this.styleID =  "collapse-comp-styles";
    if (!document.getElementById(this.styleID)) {
      const style = `<style id="${this.styleID}">
                  .fold {
                    display: block;
                    max-height: 0px;
                    overflow: hidden;
                    transition: max-height .5s cubic-bezier(0, 1, 0, 1);
                  }
                  .fold.show {
                      max-height: 99em;
                      transition: max-height .5s ease-in-out;
                    }
              </style>`;
      document.head.insertAdjacentHTML("beforeend", style);
    }
  }
  toggle(){
    console.log(this)
    this.foldable.classList.toggle('show');
  }
}
