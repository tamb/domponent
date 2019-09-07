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
    this.tabLength = parseInt(this.$root.dataset.tabLength);
    this.setTabs();
  }

  stateDidUpdate() {
    this.setTabs();
  }

  changeActiveTab(event) {
    console.log(this);
    const tab = event.target;
    const tabNumber = tab.dataset.tabNumber;
    this.setState({ activeTab: parseInt(tabNumber) });
  }

  setTabs() {
    for (let i = 0; i < this.tabLength; i++) {
      const tab = this[`tab${i}`];
      const tabPane = this[`tabPane${i}`];
      if (i === this.state.activeTab) {
        tab.classList.add("open");
        tabPane.classList.add("open");
      } else {
        tab.classList.remove("open");
        tabPane.classList.remove("open");
      }
    }
  }
}
