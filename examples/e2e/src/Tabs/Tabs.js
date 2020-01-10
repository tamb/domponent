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
    for (let i = 0; i < this.$refs.tabPane.length; i++) {
      if (i === this.state.activeTab) {
        this.$refs.tab[i].classList.add("open");
        this.$refs.tabPane[i].classList.add("open");
      } else {
        this.$refs.tab[i].classList.remove("open");
        this.$refs.tabPane[i].classList.remove("open");
      }
    }
  }
}
