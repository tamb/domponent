import { Component } from "domponent";

export default class Navigation extends Component {
  constructor(conf) {
    super(conf);
    this.styleID = "collapse-comp-styles";
    this.menu = this.$root.querySelector('[data-ref="menu"]');
    this.open = this.$root.querySelector('[data-ref="open"]');
    this.close = this.$root.querySelector('[data-ref="close"]');

    this.changeNav = this.changeNav.bind(this);
    console.log()
    if (!document.getElementById(this.styleID)) {
      const style = `<style id="${this.styleID}">
            *, ::after, ::before {
                box-sizing: border-box;
            }
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
    this.setState({opened: !this.state.opened},
      this.changeNav)
  }

  changeNav(){
    if(this.state.opened){
      this.menu.classList.add('show');
      this.open.style.display = 'none';
      this.close.style.display = 'block';
    } else {
      this.menu.classList.remove('show');
      this.open.style.display = 'block';
      this.close.style.display = 'none';
    }
  }
}
