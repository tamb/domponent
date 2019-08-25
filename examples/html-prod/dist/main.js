!function(t){var e={};function n(s){if(e[s])return e[s].exports;var o=e[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(s,o,function(e){return t[e]}.bind(null,o));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){!function(t){"use strict";const e={component:"component",key:"key",props:"props",action:"action",state:"state",bind:"bind"},n={INHERITS_FROM:"<-",FROM_COMPONENT:".",KEY_VALUE:":",MULTIPLE_VALUES:"|",METHOD_CALL:"->",LIST:","},s={ONCE:"once",PASSIVE:"passive",CAPTURE:"capture"};class o{constructor(t){this.$root=t.element,this.$app=t.app,this.$key=t.key,this.$name=t.element.getAttribute(`data-${this.$app.$datasets.component}`)}}function i(t,e){t.textContent=e}function r(t){return t.trim().split(n.KEY_VALUE)}function a(t){return t.trim().split(n.MULTIPLE_VALUES)}function c(t){return t.trim().split(n.FROM_COMPONENT)}function p(t){return[...this.$root.querySelectorAll(t)].filter(t=>t.closest(`[data-${this.$app.$datasets.component}]`)===this.$root)}function u(){this.$b=[],p.call(this,`[data-${this.$app.$datasets.action}]`).forEach(t=>{const e=a(t.getAttribute(`data-${this.$app.$datasets.action}`)),o={el:t,actions:[]};e.forEach(e=>{const i=function(t){return e.trim().split(n.METHOD_CALL)}(),r=i[0],a=c(i[1]);if(a[0]===this.$name){let e={};if(a[2]){const t=function(t){return a[2].trim().split(n.LIST)}();for(let n in s)e[s[n]]=t.includes(s[n])}const i=this[a[1]].bind(this);t.addEventListener(r,i,e),o.actions.push({event:r,handler:i,options:e})}},this),this.$b.push(o)},this)}function l(t){this.$d.forEach(e=>{(function(t){this.propsWillUpdate();const e=Object.assign({},this.props);for(let e in this.$p){const n=this.$p[e];t.includes(this.$p[e].parentComponentKey)&&(this.props[e]=n.parentComponent.state[n.parentComponentKey],this.$p[e].els&&this.$p[e].els.forEach(t=>{updateDOM(t,this.props[e])}))}this.propsDidUpdate(e)}).call(this.$app.registeredComponents[e],t)})}function d(){const t=this.$root.getAttribute(`data-${this.$app.$datasets.props}`);if(t){const e={};return a(t).forEach(t=>{const s=function(t){return t.trim().split(n.INHERITS_FROM)}(t),o=r(s[1]),i=s[0],a=this.$app.registeredComponents[o[0]],c=o[1];a.$d.add(this.$key);const u=[...p.call(this,`[${this.$app.$datasets.bind}^="props:${i}"]`)];this.props[i]=a.state[c],e[i]={parentComponent:a,parentComponentKey:c,els:u.length>0?u:null}},this),e}return null}class h extends o{constructor(t,e=!1){super(t),this.connecting(),this.props={},this.$d=new Set,this.$p=d.call(this),u.call(this),!e&&this.connected()}connecting(){}connected(){}disconnecting(){}propsWillUpdate(){}propsDidUpdate(){}}t.Component=class extends h{constructor(t){super(t,!0),this.state={},this.$s=function(){const t=p.call(this,`[data-${this.$app.$datasets.bind}^="state:"]`);if(t.length>0){const e={};return t.forEach(t=>{const n={};a(t.getAttribute(`data-${this.$app.$datasets.bind}`)).forEach(s=>{var o=c(r(s)[1])[1];n.el=t,e[o]||(e[o]=[]),e[o].push(n)})},this),e}return null}.call(this),function(){const t=this.$root.getAttribute(`data-${this.$app.$datasets.state}`);t&&this.setState(JSON.parse(t))}.call(this),this.connected()}stateWillUpdate(){}stateDidUpdate(){}setState(t=this.state,e){this.stateWillUpdate();const n=[];for(let e in t)t[e]!==this.state[e]&&(n.push(e),this.state[e]=t[e],this.$s&&this.$s[e]&&this.$s[e].forEach(n=>{i(n.el,t[e])}));var s;this.$d.size>0&&l.call(this,n),(s=e)&&s(),this.stateDidUpdate()}},t.Exponent=h,t.Init=function(t){return this.components=t.components,this.registeredComponents={},this.$datasets=(()=>{const n=e;if(t.dataAttributes)for(let e in t.dataAttributes)n[e]=t.dataAttributes[e];return n})(),this._cc=(e,n)=>{const s=e.getAttribute(`data-${this.$datasets.key}`)||"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)});this.registeredComponents[s]=new(t.components[e.getAttribute(`data-${this.$datasets.component}`)])({element:e,key:s,app:this}),n&&n()},this._dc=(t,e)=>{this.registeredComponents[t].disconnecting(),function(){this.$b.forEach(t=>{console.log("binding",t),t.actions.forEach(e=>{t.el.removeEventListener(e.event,e.handler,e.options)},this)},this)}.call(this.registeredComponents[t]),delete this.registeredComponents[t],e&&e()},this._rc=(t,e,n)=>{this.components[t]=e,n&&n()},this._urc=(t,e)=>{delete this.component[t],e&&e()},[...t.selector.querySelectorAll(`[data-${this.$datasets.component}]`)].forEach(t=>{this._cc(t)},this),t.appCreated&&t.appCreated(),{createComponent:(t,e)=>this._cc(t,e),deleteComponent:(t,e)=>this._dc(t,e),register:(t,e,n)=>this._rc(t,e,n),unregister:(t,e)=>this._urc(t,e)}},Object.defineProperty(t,"__esModule",{value:!0})}(e)},function(t,e,n){"use strict";n.r(e);var s=n(0);var o=function(t){const e=document.getElementById("async"),n=Math.floor(100*Math.random()),s=`\n    <div class="col-md-3">\n    <div id="${t}" data-component="Counter" data-state='{"count":${n},"isEven":${n%2==0}}'>\n    <h2 data-action="mousedown->Counter.goBlue|mouseup->Counter.goGreen">Async Counter</h2>\n    <div>count: <span data-bind="state:Counter.count"></span></div>\n    <button type="button" data-action="click->Counter.decrement" class="btn btn-danger">\n      -1\n    </button>\n    \n    <button\n      type="button"\n      data-action="click->Counter.increment|mouseover->Counter.goBlue|mouseout->Counter.goGreen"\n      class="btn btn-success"\n    >\n      +1\n    </button>\n    \n  </div>\n    </div>\n  `;e.insertAdjacentHTML("beforeend",s)};console.time("appCreation");const i=new s.Init({selector:document.getElementById("root"),components:{Counter:class extends s.Component{constructor(t){super(t),this.state={count:parseInt(this.state.count)||0,isEven:this.state.isEven},this.setState(),this.setYellow()}increment(t){const e={},n=parseInt(this.state.count+1,10);e.count=n,e.isEven=n%2==0,this.setState(e,()=>console.log("Single Callback",this))}decrement(t){const e={},n=parseInt(this.state.count-1,10);e.count=n,e.isEven=n%2==0,this.setState(e)}goBlue(t){t.target.style.color="blue"}goGreen(t){t.target.style.color="green"}stateDidUpdate(){this.setYellow()}setYellow(){this.state.isEven?this.$root.classList.add("yellow"):this.$root.classList.remove("yellow")}},CurrentTime:class extends s.Component{constructor(t){super(t),this.state={hours:"",seconds:"",minutes:""},setInterval(()=>{this.changeTime()},1e3)}changeTime(){const t=new Date;this.setState({seconds:t.getSeconds(),hours:t.getHours(),minutes:t.getMinutes()})}},DisplayAnything:class extends s.Exponent{constructor(t){super(t),this.objects=this.$root.querySelector(".propObjects"),this.displayProps()}propsDidUpdate(t){this.displayProps()}displayProps(){this.objects.textContent=`isTopcounterEven: ${this.props.isTopCounterEven}`}},Name:class extends s.Component{constructor(t){super(t),this.state={name:"Thomas"}}handleInput(t){this.setState({name:t.target.value})}stateWillUpdate(){this.secondInput=this.$root.querySelector(".above-controlled")}stateDidUpdate(){this.secondInput.value=this.state.name}}},appCreated:()=>console.log("app created")});console.timeEnd("appCreation"),window.DomponentApp=i,setTimeout(()=>{o("id2"),i.createComponent(document.getElementById("id2"))},1e3),setTimeout(()=>{o("id3"),i.createComponent(document.getElementById("id3"))},3e3)}]);