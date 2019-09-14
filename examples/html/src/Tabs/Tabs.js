import { Component } from "domponent";

import "./Tabs.scss";

export default class Tabs extends Component {
  constructor(conf) {
    super(conf);
    this.state = {
      activeTab: 0
    };
  }

  connected() {
    this.setTabs();
  }

  stateDidUpdate() {
    this.setTabs();
  }

  changeActiveTab(event) {
    const tab = event.target;
    const tabNumber = tab.dataset.tabNumber;
    this.setState({ activeTab: parseInt(tabNumber) });
  }

  setTabs() {
    for (let i = 0; i < this.tabPane.length; i++) {
      if (i === this.state.activeTab) {
        this.tab[i].classList.add("open");
        this.tabPane[i].classList.add("open");
      } else {
        this.tab[i].classList.remove("open");
        this.tabPane[i].classList.remove("open");
      }
    }
  }
}
