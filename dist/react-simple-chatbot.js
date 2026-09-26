!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("styled-components")):"function"==typeof define&&define.amd?define(["react","styled-components"],t):"object"==typeof exports?exports.ReactSimpleChatbot=t(require("react"),require("styled-components")):e.ReactSimpleChatbot=t(e.React,e.styled)}(Object("undefined"!=typeof self?self:this),(e,t)=>(()=>{var s={694(e,t,s){"use strict";var r=s(925);function n(){}function i(){}i.resetWarningCache=n,e.exports=function(){function e(e,t,s,n,i,o){if(o!==r){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function t(){return e}e.isRequired=e;var s={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:n};return s.PropTypes=s,s}},556(e,t,s){e.exports=s(694)()},925(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},108(e){e.exports=function(e,t){var s=["abcdefghijklmnopqrstuvwxyz","ABCDEFGHIJKLMNOPQRSTUVWXYZ","0123456789","~!@#$%^&()_+-={}[];',"],r="";(t=t||"aA0").split("").forEach(function(e){isNaN(parseInt(e))?/[a-z]/.test(e)?r+=s[0]:/[A-Z]/.test(e)?r+=s[1]:r+=s[3]:r+=s[2]}),e=e||30;for(var n="";e--;)n+=r.charAt(Math.floor(Math.random()*r.length));return n}},36(t){"use strict";t.exports=e},713(e){"use strict";e.exports=t}};const r={};function n(e){const t=r[e];if(void 0!==t)return t.exports;const i=r[e]={exports:{}};return s[e](i,i.exports,n),i.exports}n.n=e=>{const t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};let i={};return(()=>{"use strict";n.r(i),n.d(i,{Loading:()=>f,default:()=>qe});var e=n(36),t=n.n(e),s=n(556),r=n.n(s),o=n(108),a=n.n(o),l=n(713),p=n.n(l);const c=(e,t=1)=>{const s=(e=>{e=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(e,t,s,r)=>t+t+s+s+r+r);const t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null})(e);return`rgba(${s.r}, ${s.g}, ${s.b}, ${t})`},d=l.keyframes`
  0% { opacity: .2; }
  20% { opacity: 1; }
  100% { opacity: .2; }
`,u=l.keyframes`
  100% { transform: scale(1); }
`,h=l.keyframes`
  25% { transform: rotate(-1deg); }
  100% { transform: rotate(1deg); }
`,g=p().span`
  animation: ${d} 1.4s infinite both;
  animation-delay: ${e=>e.delay};
`,f=()=>t().createElement("span",{className:"rsc-loading"},t().createElement(g,{delay:"0s"},"."),t().createElement(g,{delay:".2s"},"."),t().createElement(g,{delay:".4s"},".")),b=p().div`
  background: #fff;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;
  display: flex;
  justify-content: center;
  margin: 0 6px 10px 6px;
  padding: 16px;
`;class y extends e.Component{state={loading:!0};componentDidMount(){const{speak:e,step:t,previousValue:s,triggerNextStep:r}=this.props,{delay:n,waitAction:i}=t;setTimeout(()=>{this.setState({loading:!1},()=>{i||t.rendered||r(),e(t,s)})},n)}renderComponent=()=>{const{step:e,steps:s,previousStep:r,triggerNextStep:n}=this.props,{component:i}=e;return t().cloneElement(i,{step:e,steps:s,previousStep:r,triggerNextStep:n})};render(){const{loading:e}=this.state,{style:s}=this.props;return t().createElement(b,{className:"rsc-cs",style:s},e?t().createElement(f,null):this.renderComponent())}}y.propTypes={previousStep:r().objectOf(r().any).isRequired,previousValue:r().oneOfType([r().string,r().bool,r().number,r().object,r().array]),speak:r().func,step:r().objectOf(r().any).isRequired,steps:r().objectOf(r().any).isRequired,style:r().objectOf(r().any).isRequired,triggerNextStep:r().func.isRequired},y.defaultProps={previousValue:"",speak:()=>{}};const m=y,v=p().li`
  animation: ${u} 0.3s ease forwards;
  cursor: pointer;
  display: inline-block;
  margin: 2px;
  transform: scale(0);
`,S={background:"#f5f8fb",fontFamily:"monospace",headerBgColor:"#6e48aa",headerFontColor:"#fff",headerFontSize:"16px",botBubbleColor:"#6E48AA",botFontColor:"#fff",userBubbleColor:"#fff",userFontColor:"#4a4a4a"},x=p().button`
  background: ${({theme:e})=>e.botBubbleColor};
  border: 0;
  border-radius: 22px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  color: ${({theme:e})=>e.botFontColor};
  display: inline-block;
  font-size: 14px;
  padding: 12px;

  &:hover {
    opacity: 0.7;
  }
  &:active,
  &:hover:focus {
    outline:none;
  }
`;x.defaultProps={theme:S};const k=x,w=p().ul`
  margin: 2px 0 12px 0;
  padding: 0 6px;
`,E=p().div``;class $ extends e.Component{onOptionClick=({value:e})=>{const{triggerNextStep:t}=this.props;t({value:e})};renderOption=e=>{const{bubbleOptionStyle:s,step:r}=this.props,{user:n}=r,{value:i,label:o}=e;return t().createElement(v,{key:i,className:"rsc-os-option"},t().createElement(k,{className:"rsc-os-option-element",style:s,user:n,onClick:()=>this.onOptionClick({value:i})},o))};render(){const{step:e}=this.props,{options:s}=e;return t().createElement(E,{className:"rsc-os"},t().createElement(w,{className:"rsc-os-options"},Object.keys(s).map(e=>s[e]).map(this.renderOption)))}}$.propTypes={bubbleOptionStyle:r().objectOf(r().any).isRequired,step:r().objectOf(r().any).isRequired,triggerNextStep:r().func.isRequired};const C=$,O=p().div`
  animation: ${u} 0.3s ease forwards;
  background: ${e=>e.user?e.theme.userBubbleColor:e.theme.botBubbleColor};
  border-radius: ${e=>{const{isFirst:t,isLast:s,user:r}=e;return t||s?!t&&s?r?"18px 0 18px 18px":"0 18px 18px 18px":e.user?"18px 18px 0 18px":"18px 18px 18px 0":r?"18px 0 0 18px":"0 18px 18px 0px"}};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  color: ${e=>e.user?e.theme.userFontColor:e.theme.botFontColor};
  display: inline-block;
  font-size: 14px;
  max-width: 50%;
  margin: ${e=>{const{isFirst:t,showAvatar:s,user:r}=e;return!t&&s?r?"-8px 46px 10px 0":"-8px 0 10px 46px":t||s?"0 0 10px 0":r?"-8px 0px 10px 0":"-8px 0 10px 0px"}};
  overflow: hidden;
  position: relative;
  padding: 12px;
  transform: scale(0);
  transform-origin: ${e=>{const{isFirst:t,user:s}=e;return t?s?"bottom right":"bottom left":s?"top right":"top left"}};
`;O.defaultProps={theme:S};const q=O,j=p().img`
  animation: ${u} 0.3s ease forwards;
  border-radius: ${e=>e.user?"50% 50% 50% 0":"50% 50% 0 50%"};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;
  height: 40px;
  min-width: 40px;
  padding: 3px;
  transform: scale(0);
  transform-origin: ${e=>e.user?"bottom left":"bottom right"};
  width: 40;
`,N=p().div`
  display: inline-block;
  order: ${e=>e.user?"1":"0"};
  padding: 6px;
`,I=p().div`
  align-items: flex-end;
  display: flex;
  justify-content: ${e=>e.user?"flex-end":"flex-start"};
`;class M extends e.Component{state={loading:!0};componentDidMount(){const{step:e,speak:t,previousValue:s,triggerNextStep:r}=this.props,{component:n,delay:i,waitAction:o}=e,a=n&&o;setTimeout(()=>{this.setState({loading:!1},()=>{a||e.rendered||r(),t(e,s)})},i)}getMessage=()=>{const{previousValue:e,step:t}=this.props,{message:s}=t;return s?s.replace(/{previousValue}/g,e):""};renderMessage=()=>{const{step:e,steps:s,previousStep:r,triggerNextStep:n}=this.props,{component:i}=e;return i?t().cloneElement(i,{step:e,steps:s,previousStep:r,triggerNextStep:n}):this.getMessage()};render(){const{step:e,isFirst:s,isLast:r,avatarStyle:n,bubbleStyle:i,hideBotAvatar:o,hideUserAvatar:a}=this.props,{loading:l}=this.state,{avatar:p,user:c,botName:d}=e,u=c?!a:!o,h=c?"Your avatar":`${d}'s avatar`;return t().createElement(I,{className:"rsc-ts "+(c?"rsc-ts-user":"rsc-ts-bot"),user:c},t().createElement(N,{className:"rsc-ts-image-container",user:c},s&&u&&t().createElement(j,{className:"rsc-ts-image",style:n,showAvatar:u,user:c,src:p,alt:h})),t().createElement(q,{className:"rsc-ts-bubble",style:i,user:c,showAvatar:u,isFirst:s,isLast:r},l?t().createElement(f,null):this.renderMessage()))}}M.propTypes={avatarStyle:r().objectOf(r().any).isRequired,isFirst:r().bool.isRequired,isLast:r().bool.isRequired,bubbleStyle:r().objectOf(r().any).isRequired,hideBotAvatar:r().bool.isRequired,hideUserAvatar:r().bool.isRequired,previousStep:r().objectOf(r().any),previousValue:r().oneOfType([r().string,r().bool,r().number,r().object,r().array]),speak:r().func,step:r().objectOf(r().any).isRequired,steps:r().objectOf(r().any),triggerNextStep:r().func.isRequired},M.defaultProps={previousStep:{},previousValue:"",speak:()=>{},steps:{}};const R=M,B=[{key:"id",types:["string","number"],required:!0},{key:"user",types:["boolean"],required:!0},{key:"hideExtraControl",types:["boolean"],required:!1},{key:"trigger",types:["string","number","function"],required:!1},{key:"validator",types:["function"],required:!1},{key:"end",types:["boolean"],required:!1},{key:"placeholder",types:["string"],required:!1},{key:"inputAttributes",types:["object"],required:!1},{key:"metadata",types:["object"],required:!1}],A=[{key:"id",types:["string","number"],required:!0},{key:"message",types:["string","function"],required:!0},{key:"avatar",types:["string"],required:!1},{key:"trigger",types:["string","number","function"],required:!1},{key:"delay",types:["number"],required:!1},{key:"end",types:["boolean"],required:!1},{key:"placeholder",types:["string"],required:!1},{key:"hideInput",types:["boolean"],required:!1},{key:"hideExtraControl",types:["boolean"],required:!1},{key:"inputAttributes",types:["object"],required:!1},{key:"metadata",types:["object"],required:!1}],z=[{key:"id",types:["string","number"],required:!0},{key:"options",types:["object"],required:!0},{key:"end",types:["boolean"],required:!1},{key:"placeholder",types:["string"],required:!1},{key:"hideInput",types:["boolean"],required:!1},{key:"hideExtraControl",types:["boolean"],required:!1},{key:"inputAttributes",types:["object"],required:!1},{key:"metadata",types:["object"],required:!1}],T=[{key:"id",types:["string","number"],required:!0},{key:"component",types:["any"],required:!0},{key:"avatar",types:["string"],required:!1},{key:"replace",types:["boolean"],required:!1},{key:"waitAction",types:["boolean"],required:!1},{key:"asMessage",types:["boolean"],required:!1},{key:"trigger",types:["string","number","function"],required:!1},{key:"delay",types:["number"],required:!1},{key:"end",types:["boolean"],required:!1},{key:"placeholder",types:["string"],required:!1},{key:"hideInput",types:["boolean"],required:!1},{key:"hideExtraControl",types:["boolean"],required:!1},{key:"inputAttributes",types:["object"],required:!1},{key:"metadata",types:["object"],required:!1}],F=[{key:"id",types:["string","number"],required:!0},{key:"update",types:["string","number"],required:!0},{key:"trigger",types:["string","number","function"],required:!0},{key:"placeholder",types:["string"],required:!1},{key:"inputAttributes",types:["object"],required:!1},{key:"metadata",types:["object"],required:!1}],{parse:V,stringify:P}=JSON,{keys:L}=Object,U=String,D="string",H={},_="object",K=(e,t)=>t,W=e=>e instanceof U?U(e):e,Y=(e,t)=>typeof t===D?new U(t):t,J=(e,t,s)=>{const r=U(t.push(s)-1);return e.set(s,r),r},Z=(e,t)=>{const s=V(e,Y).map(W),r=t||K;let n=s[0];if(typeof n===_&&n){const e=[],t=((e,t,s,r)=>n=>{for(let i=L(n),{length:o}=i,a=0;a<o;a++){const o=i[a],l=n[o];if(l instanceof U){const i=e[+l];typeof i!==_||s.has(i)?n[o]=r.call(n,o,i):(s.add(i),n[o]=H,t.push({o:n,k:o,r:i}))}else n[o]!==H&&(n[o]=r.call(n,o,l))}return n})(s,e,new Set,r);n=t(n);let i=0;for(;i<e.length;){const{o:s,k:n,r:o}=e[i++];s[n]=r.call(s,n,t(o))}}return r.call({"":n},"",n)},G=(e,t,s)=>{const r=t&&typeof t===_?(e,s)=>""===e||-1<t.indexOf(e)?s:void 0:t||K,n=new Map,i=[],o=[];let a=+J(n,i,r.call({"":e},"",e)),l=!a;for(;a<i.length;)l=!0,o[a]=P(i[a++],p,s);return"["+o.join(",")+"]";function p(e,t){if(l)return l=!l,t;const s=r.call(this,e,t);switch(typeof s){case _:if(null===s)return s;case D:return n.get(s)||J(n,i,s)}return s}},Q={parse(e){let t=[];if(e.user)t=B;else if(e.message)t=A;else if(e.options)t=z;else if(e.component)t=T;else{if(!e.update)throw new Error(`The step ${G(e)} is invalid`);t=F}for(let s=0,r=t.length;s<r;s+=1){const{key:r,types:n,required:i}=t[s];if(!e[r]&&i)throw new Error(`Key '${r}' is required in step ${G(e)}`);if(e[r]&&"any"!==n[0]&&n.indexOf(typeof e[r])<0)throw new Error(`The type of '${r}' value must be ${n.join(" or ")} instead of ${typeof e[r]}`)}const s=t.map(e=>e.key);for(const t in e)s.indexOf(t)<0&&(console.error(`Invalid key '${t}' in step '${e.id}'`),delete e[t]);return e},checkInvalidIds(e){for(const t in e){const s=e[t],r=e[t].trigger;if("function"!=typeof r)if(s.options){const r=s.options.filter(e=>"function"!=typeof e.trigger).map(e=>e.trigger);for(let s=0,n=r.length;s<n;s+=1){const n=r[s];if(n&&!e[n])throw new Error(`The id '${n}' triggered by option ${s+1} in step '${e[t].id}' does not exist`)}}else if(r&&!e[r])throw new Error(`The id '${r}' triggered by step '${e[t].id}' does not exist`)}}},X=Q,ee=()=>{try{return"undefined"!=typeof window?window.localStorage:null}catch(e){return null}},te=p().div`
  background: ${({theme:e})=>e.background};
  border-radius: 10px;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.15);
  font-family: ${({theme:e})=>e.fontFamily};
  overflow: hidden;
  position: ${({floating:e})=>e?"fixed":"relative"};
  bottom: ${({floating:e,floatingStyle:t})=>e?t.bottom||"32px":"initial"};
  top: ${({floating:e,floatingStyle:t})=>e&&t.top||"initial"};
  right: ${({floating:e,floatingStyle:t})=>e?t.right||"32px":"initial"};
  left: ${({floating:e,floatingStyle:t})=>e&&t.left||"initial"};
  width: ${({width:e})=>e};
  height: ${({height:e})=>e};
  z-index: 999;
  transform: ${({opened:e})=>e?"scale(1)":"scale(0)"};
  transform-origin: ${({floatingStyle:e})=>e.transformOrigin||"bottom right"};
  transition: transform 0.3s ease;

  @media screen and (max-width: 568px) {
    border-radius: ${({floating:e})=>e?"0":""};
    bottom: 0 !important;
    left: initial !important;
    height: 100%;
    right: 0 !important;
    top: initial !important;
    width: 100%;
  }
`;te.defaultProps={theme:S};const se=te,re=p().div`
  height: calc(${e=>e.height} - ${e=>e.hideInput?"56px":"112px"});
  overflow-y: scroll;
  margin-top: 2px;
  padding-top: 6px;

  @media screen and (max-width: 568px) {
    height: ${e=>e.floating?"calc(100% - 112px)":""};
  }
`,ne=p().div`
  align-items: center;
  background: ${({theme:e})=>e.headerBgColor};
  color: ${({theme:e})=>e.headerFontColor};
  display: flex;
  fill: ${({theme:e})=>e.headerFontColor};
  height: 56px;
  justify-content: space-between;
  padding: 0 10px;
`;ne.defaultProps={theme:S};const ie=ne,oe=p().h2`
  margin: 0;
  font-size: ${({theme:e})=>e.headerFontSize};
`;oe.defaultProps={theme:S};const ae=oe,le=p().a`
  cursor: pointer;
`,pe=p().a`
  align-items: center;
  cursor: pointer;
  background: ${({theme:e})=>e.headerBgColor};
  bottom: 32px;
  border-radius: 100%;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  fill: ${({theme:e})=>e.headerFontColor};
  height: 56px;
  justify-content: center;
  position: fixed;
  right: 32px;
  transform: ${e=>e.opened?"scale(0)":"scale(1)"};
  transition: transform 0.3s ease;
  width: 56px;
  z-index: 999;
`;pe.defaultProps={theme:{headerBgColor:"#6e48aa",headerFontColor:"#fff"}};const ce=pe,de=p().img`
  height: 24px;
  width: 24px;
`,ue=p().div`
  position: relative;
`,he=p().input`
  animation: ${e=>e.invalid?l.css`
          ${h} .2s ease
        `:""};
  border: 0;
  border-radius: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top: ${e=>e.invalid?"0":"1px solid #eee"};
  box-shadow: ${e=>e.invalid?"inset 0 0 2px #E53935":"none"};
  box-sizing: border-box;
  color: ${e=>e.invalid?"#E53935":""};
  font-size: 16px;
  opacity: ${e=>e.disabled&&!e.invalid?".5":"1"};
  outline: none;
  padding: ${e=>e.hasButton?"16px 52px 16px 10px":"16px 10px"};
  width: 100%;
  -webkit-appearance: none;

  &:disabled {
    background: #fff;
  }

  @media screen and (max-width: 568px) {
    border-bottom-left-radius: ${e=>e.floating?"0":"10px"};
    border-bottom-right-radius: ${e=>e.floating?"0":"10px"};
  }
`,ge=p().button`
  background-color: transparent;
  border: 0;
  border-bottom-right-radius: 10px;
  box-shadow: none;
  cursor: ${e=>e.disabled?"default":"pointer"};
  fill: ${e=>{const{speaking:t,invalid:s,theme:r}=e;return t?r.headerBgColor:s?"#E53935":"#4a4a4a"}};
  opacity: ${e=>e.disabled&&!e.invalid?".5":"1"};
  outline: none;
  padding: 14px 16px 12px 16px;
  &:before {
    content: '';
    position: absolute;
    width: 23px;
    height: 23px;
    border-radius: 50%;
    animation: ${({theme:e,speaking:t})=>{return t?l.css`
            ${s=e.headerBgColor,l.keyframes`
  0% { box-shadow: 0 0 0 0 ${c(s,.4)}; }
  70% { box-shadow: 0 0 0 10px ${c(s,0)}; }
  100% { box-shadow: 0 0 0 0 ${c(s,0)}; }
`} 2s ease infinite
          `:"";var s}};
  }
  &:not(:disabled):hover {
    opacity: 0.7;
  }
`;ge.defaultProps={theme:S};const fe=ge,be=()=>{};class ye{static isSupported(){return"webkitSpeechRecognition"in window}constructor(e=be,t=be,s=be,r="en"){this.state={inputValue:"",lang:r,onChange:e,onEnd:t,onStop:s},this.onResult=this.onResult.bind(this),this.onEnd=this.onEnd.bind(this),this.setup()}onChange(e){const{onChange:t}=this.state;this.setState({inputValue:e}),t(e)}onFinal(e){this.setState({inputValue:e}),this.recognition.stop()}onEnd(){const{onStop:e,onEnd:t,force:s}=this.state;this.setState({speaking:!1}),s?e():t()}onResult(e){let t="",s="";for(let r=e.resultIndex;r<e.results.length;r+=1)e.results[r].isFinal?(s+=e.results[r][0].transcript,this.onFinal(s)):(t+=e.results[r][0].transcript,this.onChange(t))}setState(e){this.state=Object.assign({},this.state,e)}setup(){if(!ye.isSupported())return this;const{webkitSpeechRecognition:e}=window;return this.recognition=new e,this.recognition.continuous=!0,this.recognition.interimResults=!0,this.recognition.lang=this.state.lang,this.recognition.onresult=this.onResult,this.recognition.onend=this.onEnd,this}setLang(e){return this.setState({lang:e}),this.setup(),this}speak(){if(!ye.isSupported())return this;const{speaking:e}=this.state;return e?(this.setState({force:!0}),this.recognition.stop()):(this.recognition.start(),this.setState({speaking:!0,inputValue:""})),this}}const me=()=>t().createElement("svg",{height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},t().createElement("path",{d:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"}),t().createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),ve=()=>t().createElement("svg",{height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},t().createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),t().createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),Se=({size:e})=>t().createElement("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",width:e,height:e,viewBox:"0 0 500 500"},t().createElement("g",null,t().createElement("g",null,t().createElement("polygon",{points:"0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75"}))));Se.propTypes={size:r().number},Se.defaultProps={size:20};const xe=Se,ke=({size:e})=>t().createElement("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",width:e,height:e,viewBox:"0 0 400 400"},t().createElement("g",null,t().createElement("path",{d:"M290.991,240.991c0,26.392-21.602,47.999-48.002,47.999h-11.529c-26.4,0-48.002-21.607-48.002-47.999V104.002   c0-26.4,21.602-48.004,48.002-48.004h11.529c26.4,0,48.002,21.604,48.002,48.004V240.991z"}),t().createElement("path",{d:"M342.381,209.85h-8.961c-4.932,0-8.961,4.034-8.961,8.961v8.008c0,50.26-37.109,91.001-87.361,91.001   c-50.26,0-87.109-40.741-87.109-91.001v-8.008c0-4.927-4.029-8.961-8.961-8.961h-8.961c-4.924,0-8.961,4.034-8.961,8.961v8.008   c0,58.862,40.229,107.625,96.07,116.362v36.966h-34.412c-4.932,0-8.961,4.039-8.961,8.971v17.922c0,4.923,4.029,8.961,8.961,8.961   h104.688c4.926,0,8.961-4.038,8.961-8.961v-17.922c0-4.932-4.035-8.971-8.961-8.971h-34.43v-36.966   c55.889-8.729,96.32-57.5,96.32-116.362v-8.008C351.342,213.884,347.303,209.85,342.381,209.85z"})));ke.propTypes={size:r().number},ke.defaultProps={size:20};const we=ke,Ee=()=>/iphone|ipod|android|ie|blackberry|fennec/i.test(navigator.userAgent),$e=e=>"string"==typeof e;function Ce(){return Ce=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)({}).hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e},Ce.apply(null,arguments)}class Oe extends e.Component{constructor(e){var t;super(e),this.content=null,this.input=null,this.supportsScrollBehavior=!1,this.setContentRef=e=>{this.content=e},this.setInputRef=e=>{this.input=e},this.state={renderedSteps:[],previousSteps:[],currentStep:{},previousStep:{},steps:{},disabled:!0,opened:e.opened||!e.floating,inputValue:"",inputInvalid:!1,speaking:!1,recognitionEnable:e.recognitionEnable&&ye.isSupported(),defaultUserSettings:{}},this.speak=(t=e.speechSynthesis,(e,s)=>{const{lang:r,voice:n,enable:i}=t,{user:o}=e;if(!window.SpeechSynthesisUtterance||!window.speechSynthesis)return;if(o)return;if(!i)return;const a=(e=>{const{message:t,metadata:s={}}=e;return $e(s.speak)?s.speak:$e(t)?t:""})(e),l=new window.SpeechSynthesisUtterance;l.text=a.replace(/{previousValue}/g,s),l.lang=r,l.voice=n,window.speechSynthesis.speak(l)})}componentDidMount(){const{steps:e}=this.props,{botDelay:t,botAvatar:s,botName:r,cache:n,cacheName:i,customDelay:o,enableMobileAutoFocus:a,userAvatar:l,userDelay:p}=this.props,c={},d={delay:t,avatar:s,botName:r},u={delay:p,avatar:l,hideInput:!1,hideExtraControl:!1},h={delay:o};for(let t=0,s=e.length;t<s;t+=1){const s=e[t];let r={};s.user?r=u:s.message||s.asMessage?r=d:s.component&&(r=h),c[s.id]=Object.assign({},r,X.parse(s))}X.checkInvalidIds(c);const g=e[0];if(g.message){const{message:e}=g;g.message="function"==typeof e?e():e,c[g.id].message=g.message}const{recognitionEnable:f}=this.state,{recognitionLang:b}=this.props;f&&(this.recognition=new ye(this.onRecognitionChange,this.onRecognitionEnd,this.onRecognitionStop,b)),this.supportsScrollBehavior="scrollBehavior"in document.documentElement.style,this.content&&(this.content.addEventListener("DOMNodeInserted",this.onNodeInserted),window.addEventListener("resize",this.onResize));const{currentStep:y,previousStep:m,previousSteps:v,renderedSteps:S}=((e,t)=>{const{cacheName:s,cache:r,firstStep:n,steps:i}=e,o=n,a=n.user?[]:[i[o.id]],l=n.user?[]:[i[o.id]],p=r?ee():null;let c=null;if(p)try{c=p.getItem(s)}catch(e){c=null}if(c)try{const e=Z(c),r=e.renderedSteps[e.renderedSteps.length-1];if(!r||!r.end){for(let t=0,s=e.renderedSteps.length;t<s;t+=1){const s=e.renderedSteps[t];if(e.renderedSteps[t].delay=0,e.renderedSteps[t].rendered=!0,s.component){const{id:r}=s;e.renderedSteps[t].component=i[r].component}}const{trigger:s,end:r,options:n}=e.currentStep,{id:o}=e.currentStep;if(n&&delete e.currentStep.rendered,!s&&!r)if(n)for(let t=0;t<n.length;t+=1)e.currentStep.options[t].trigger=i[o].options[t].trigger;else e.currentStep.trigger=i[o].trigger;return e.currentStep.user&&t(),e}p.removeItem(s)}catch(e){console.info(`Unable to parse cache named:${s}. \nThe cache where probably created with an older version of react-simple-chatbot.\n`,e)}return n.user&&t(),{currentStep:o,previousStep:{},previousSteps:l,renderedSteps:a}})({cacheName:i,cache:n,firstStep:g,steps:c},()=>{this.setState({disabled:!1},()=>{!a&&Ee()||this.input&&this.input.focus()})});this.setState({currentStep:y,defaultUserSettings:u,previousStep:m,previousSteps:v,renderedSteps:S,steps:c})}static getDerivedStateFromProps(e,t){const{opened:s,toggleFloating:r}=e;return void 0!==r&&void 0!==s&&s!==t.opened?{...t,opened:s}:t}componentWillUnmount(){this.content&&(this.content.removeEventListener("DOMNodeInserted",this.onNodeInserted),window.removeEventListener("resize",this.onResize))}onNodeInserted=e=>{const{currentTarget:t}=e,{enableSmoothScroll:s}=this.props;s&&this.supportsScrollBehavior?t.scroll({top:t.scrollHeight,left:0,behavior:"smooth"}):t.scrollTop=t.scrollHeight};onResize=()=>{this.content.scrollTop=this.content.scrollHeight};onRecognitionChange=e=>{this.setState({inputValue:e})};onRecognitionEnd=()=>{this.setState({speaking:!1}),this.handleSubmitButton()};onRecognitionStop=()=>{this.setState({speaking:!1})};onValueChange=e=>{this.setState({inputValue:e.target.value})};getTriggeredStep=(e,t)=>{const s=this.generateRenderedStepsById();return"function"==typeof e?e({value:t,steps:s}):e};getStepMessage=e=>{const{previousSteps:t}=this.state,s=t.length>0?t.length-1:0,r=this.generateRenderedStepsById(),n=t[s].value;return"function"==typeof e?e({previousValue:n,steps:r}):e};generateRenderedStepsById=()=>{const{previousSteps:e}=this.state,t={};for(let s=0,r=e.length;s<r;s+=1){const{id:r,message:n,value:i,metadata:o}=e[s];t[r]={id:r,message:n,value:i,metadata:o}}return t};triggerNextStep=e=>{const{enableMobileAutoFocus:t}=this.props,{defaultUserSettings:s,previousSteps:r,renderedSteps:n,steps:i}=this.state;let{currentStep:o,previousStep:l}=this.state;const p=o.end;if(e&&e.value&&(o.value=e.value),e&&e.hideInput&&(o.hideInput=e.hideInput),e&&e.hideExtraControl&&(o.hideExtraControl=e.hideExtraControl),e&&e.trigger&&(o.trigger=this.getTriggeredStep(e.trigger,e.value)),p)this.handleEnd();else if(o.options&&e){const t=o.options.filter(t=>t.value===e.value)[0],i=this.getTriggeredStep(t.trigger,o.value);delete o.options,o=Object.assign({},o,t,s,{user:!0,message:t.label,trigger:i}),n.pop(),r.pop(),n.push(o),r.push(o),this.setState({currentStep:o,renderedSteps:n,previousSteps:r})}else if(o.trigger){o.replace&&n.pop();const e=this.getTriggeredStep(o.trigger,o.value);let s=Object.assign({},i[e]);if(s.message)s.message=this.getStepMessage(s.message);else if(s.update){const e=s;if(s=Object.assign({},i[e.update]),s.options)for(let t=0,r=s.options.length;t<r;t+=1)s.options[t].trigger=e.trigger;else s.trigger=e.trigger}s.key=a()(24),l=o,o=s,this.setState({renderedSteps:n,currentStep:o,previousStep:l},()=>{s.user?this.setState({disabled:!1},()=>{!t&&Ee()||this.input&&this.input.focus()}):(n.push(s),r.push(s),this.setState({renderedSteps:n,previousSteps:r}))})}const{cache:c,cacheName:d}=this.props;c&&setTimeout(()=>{((e,t)=>{const s=Z(G(t));for(const e in s)for(let t=0,r=s[e].length;t<r;t+=1)s[e][t].component&&(s[e][t].component=s[e][t].id);const r=ee();if(r)try{r.setItem(e,G(s))}catch(e){}})(d,{currentStep:o,previousStep:l,previousSteps:r,renderedSteps:n})},300)};handleEnd=()=>{const{handleEnd:e}=this.props;if(e){const{previousSteps:t}=this.state,s=t.map(e=>{const{id:t,message:s,value:r,metadata:n}=e;return{id:t,message:s,value:r,metadata:n}}),r=[];for(let e=0,s=t.length;e<s;e+=1){const{id:s,message:n,value:i,metadata:o}=t[e];r[s]={id:s,message:n,value:i,metadata:o}}e({renderedSteps:s,steps:r,values:t.filter(e=>e.value).map(e=>e.value)})}};isInputValueEmpty=()=>{const{inputValue:e}=this.state;return!e||0===e.length};isLastPosition=e=>{const{renderedSteps:t}=this.state,{length:s}=t,r=t.map(e=>e.key).indexOf(e.key);if(s<=1||r+1===s)return!0;const n=t[r+1];return!n.message&&!n.asMessage||e.user!==n.user};isFirstPosition=e=>{const{renderedSteps:t}=this.state,s=t.map(e=>e.key).indexOf(e.key);if(0===s)return!0;const r=t[s-1];return!r.message&&!r.asMessage||e.user!==r.user};handleKeyPress=e=>{"Enter"===e.key&&this.submitUserMessage()};handleSubmitButton=()=>{const{speaking:e,recognitionEnable:t}=this.state;if((this.isInputValueEmpty()||e)&&t)return this.recognition.speak(),void(e||this.setState({speaking:!0}));this.submitUserMessage()};submitUserMessage=()=>{const{defaultUserSettings:e,inputValue:t,previousSteps:s,renderedSteps:r}=this.state;let{currentStep:n}=this.state;if(!n.validator||!this.checkInvalidInput()){const i={message:t,value:t};n=Object.assign({},e,n,i),r.push(n),s.push(n),this.setState({currentStep:n,renderedSteps:r,previousSteps:s,disabled:!0,inputValue:""},()=>{this.input&&this.input.blur()})}};checkInvalidInput=()=>{const{enableMobileAutoFocus:e}=this.props,{currentStep:t,inputValue:s}=this.state,r=t.validator(s),n=s;return!("boolean"==typeof r&&r||(this.setState({inputValue:r.toString(),inputInvalid:!0,disabled:!0},()=>{setTimeout(()=>{this.setState({inputValue:n,inputInvalid:!1,disabled:!1},()=>{!e&&Ee()||this.input&&this.input.focus()})},2e3)}),0))};toggleChatBot=e=>{const{toggleFloating:t}=this.props;t?t({opened:e}):this.setState({opened:e})};renderStep=(e,s)=>{const{renderedSteps:r}=this.state,{avatarStyle:n,bubbleStyle:i,bubbleOptionStyle:o,customStyle:a,hideBotAvatar:l,hideUserAvatar:p,speechSynthesis:c}=this.props,{options:d,component:u,asMessage:h}=e,g=this.generateRenderedStepsById(),f=s>0?r[s-1]:{};return u&&!h?t().createElement(m,{key:s,speak:this.speak,step:e,steps:g,style:a,previousStep:f,previousValue:f.value,triggerNextStep:this.triggerNextStep}):d?t().createElement(C,{key:s,step:e,previousValue:f.value,triggerNextStep:this.triggerNextStep,bubbleOptionStyle:o}):t().createElement(R,{key:s,step:e,steps:g,speak:this.speak,previousStep:f,previousValue:f.value,triggerNextStep:this.triggerNextStep,avatarStyle:n,bubbleStyle:i,hideBotAvatar:l,hideUserAvatar:p,speechSynthesis:c,isFirst:this.isFirstPosition(e),isLast:this.isLastPosition(e)})};render(){const{currentStep:e,disabled:s,inputInvalid:r,inputValue:n,opened:i,renderedSteps:o,speaking:a,recognitionEnable:l}=this.state,{className:p,contentStyle:c,extraControl:d,controlStyle:u,floating:h,floatingIcon:g,floatingStyle:f,footerStyle:b,headerComponent:y,headerTitle:m,hideHeader:v,hideSubmitButton:S,inputStyle:x,placeholder:k,inputAttributes:w,recognitionPlaceholder:E,style:$,submitButtonStyle:C,width:O,height:q}=this.props,j=y||t().createElement(ie,{className:"rsc-header"},t().createElement(ae,{className:"rsc-header-title"},m),h&&t().createElement(le,{className:"rsc-header-close-button",onClick:()=>this.toggleChatBot(!1)},t().createElement(ve,null)));let N;void 0!==d&&(N=t().cloneElement(d,{disabled:s,speaking:a,invalid:r}));const I=(this.isInputValueEmpty()||a)&&l?t().createElement(we,null):t().createElement(xe,null),M=a?E:e.placeholder||k,R=e.inputAttributes||w;return t().createElement("div",{className:`rsc ${p}`},h&&t().createElement(ce,{className:"rsc-float-button",style:f,opened:i,onClick:()=>this.toggleChatBot(!0)},"string"==typeof g?t().createElement(de,{src:g}):g),t().createElement(se,{className:"rsc-container",floating:h,floatingStyle:f,opened:i,style:$,width:O,height:q},!v&&j,t().createElement(re,{className:"rsc-content",ref:this.setContentRef,floating:h,style:c,height:q,hideInput:e.hideInput},o.map(this.renderStep)),t().createElement(ue,{className:"rsc-footer",style:b},!e.hideInput&&t().createElement(he,Ce({type:"textarea",style:x,ref:this.setInputRef,className:"rsc-input",placeholder:r?"":M,onKeyPress:this.handleKeyPress,onChange:this.onValueChange,value:n,floating:h,invalid:r,disabled:s,hasButton:!S},R)),t().createElement("div",{style:u,className:"rsc-controls"},!e.hideInput&&!e.hideExtraControl&&N,!e.hideInput&&!S&&t().createElement(fe,{className:"rsc-submit-button",style:C,onClick:this.handleSubmitButton,invalid:r,disabled:s,speaking:a},I)))))}}Oe.propTypes={avatarStyle:r().objectOf(r().any),botAvatar:r().string,botName:r().string,botDelay:r().number,bubbleOptionStyle:r().objectOf(r().any),bubbleStyle:r().objectOf(r().any),cache:r().bool,cacheName:r().string,className:r().string,contentStyle:r().objectOf(r().any),customDelay:r().number,customStyle:r().objectOf(r().any),controlStyle:r().objectOf(r().any),enableMobileAutoFocus:r().bool,enableSmoothScroll:r().bool,extraControl:r().objectOf(r().element),floating:r().bool,floatingIcon:r().oneOfType([r().string,r().element]),floatingStyle:r().objectOf(r().any),footerStyle:r().objectOf(r().any),handleEnd:r().func,headerComponent:r().element,headerTitle:r().string,height:r().string,hideBotAvatar:r().bool,hideHeader:r().bool,hideSubmitButton:r().bool,hideUserAvatar:r().bool,inputAttributes:r().objectOf(r().any),inputStyle:r().objectOf(r().any),opened:r().bool,toggleFloating:r().func,placeholder:r().string,recognitionEnable:r().bool,recognitionLang:r().string,recognitionPlaceholder:r().string,speechSynthesis:r().shape({enable:r().bool,lang:r().string,voice:"undefined"!=typeof window?r().instanceOf(window.SpeechSynthesisVoice):r().any}),steps:r().arrayOf(r().object).isRequired,style:r().objectOf(r().any),submitButtonStyle:r().objectOf(r().any),userAvatar:r().string,userDelay:r().number,width:r().string},Oe.defaultProps={avatarStyle:{},botDelay:1e3,botName:"The bot",bubbleOptionStyle:{},bubbleStyle:{},cache:!1,cacheName:"rsc_cache",className:"",contentStyle:{},customStyle:{},controlStyle:{position:"absolute",right:"0",top:"0"},customDelay:1e3,enableMobileAutoFocus:!1,enableSmoothScroll:!1,extraControl:void 0,floating:!1,floatingIcon:t().createElement(me,null),floatingStyle:{},footerStyle:{},handleEnd:void 0,headerComponent:void 0,headerTitle:"Chat",height:"520px",hideBotAvatar:!1,hideHeader:!1,hideSubmitButton:!1,hideUserAvatar:!1,inputStyle:{},opened:void 0,placeholder:"Type the message ...",inputAttributes:{},recognitionEnable:!1,recognitionLang:"en",recognitionPlaceholder:"Listening ...",speechSynthesis:{enable:!1,lang:"en",voice:null},style:{},submitButtonStyle:{},toggleFloating:void 0,userDelay:1e3,width:"350px",botAvatar:"data:image/svg+xml,%3csvg version='1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e%3cpath d='M303 70a47 47 0 1 0-70 40v84h46v-84c14-8 24-23 24-40z' fill='%2393c7ef'/%3e%3cpath d='M256 23v171h23v-84a47 47 0 0 0-23-87z' fill='%235a8bb0'/%3e%3cpath fill='%2393c7ef' d='M0 240h248v124H0z'/%3e%3cpath fill='%235a8bb0' d='M264 240h248v124H264z'/%3e%3cpath fill='%2393c7ef' d='M186 365h140v124H186z'/%3e%3cpath fill='%235a8bb0' d='M256 365h70v124h-70z'/%3e%3cpath fill='%23cce9f9' d='M47 163h419v279H47z'/%3e%3cpath fill='%2393c7ef' d='M256 163h209v279H256z'/%3e%3cpath d='M194 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%233c5d76'/%3e%3cpath d='M380 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%231e2e3b'/%3e%3cpath d='M186 349a70 70 0 1 0 140 0H186z' fill='%233c5d76'/%3e%3cpath d='M256 349v70c39 0 70-31 70-70h-70z' fill='%231e2e3b'/%3e%3c/svg%3e",userAvatar:"data:image/svg+xml,%3csvg viewBox='-208.5 21 100 100' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ccircle cx='-158.5' cy='71' fill='%23F5EEE5' r='50'/%3e%3cdefs%3e%3ccircle cx='-158.5' cy='71' id='a' r='50'/%3e%3c/defs%3e%3cclipPath id='b'%3e%3cuse overflow='visible' xlink:href='%23a'/%3e%3c/clipPath%3e%3cpath clip-path='url(%23b)' d='M-108.5 121v-14s-21.2-4.9-28-6.7c-2.5-.7-7-3.3-7-12V82h-30v6.3c0 8.7-4.5 11.3-7 12-6.8 1.9-28.1 7.3-28.1 6.7v14h100.1z' fill='%23E6C19C'/%3e%3cg clip-path='url(%23b)'%3e%3cdefs%3e%3cpath d='M-108.5 121v-14s-21.2-4.9-28-6.7c-2.5-.7-7-3.3-7-12V82h-30v6.3c0 8.7-4.5 11.3-7 12-6.8 1.9-28.1 7.3-28.1 6.7v14h100.1z' id='c'/%3e%3c/defs%3e%3cclipPath id='d'%3e%3cuse overflow='visible' xlink:href='%23c'/%3e%3c/clipPath%3e%3cpath clip-path='url(%23d)' d='M-158.5 100.1c12.7 0 23-18.6 23-34.4 0-16.2-10.3-24.7-23-24.7s-23 8.5-23 24.7c0 15.8 10.3 34.4 23 34.4z' fill='%23D4B08C'/%3e%3c/g%3e%3cpath d='M-158.5 96c12.7 0 23-16.3 23-31 0-15.1-10.3-23-23-23s-23 7.9-23 23c0 14.7 10.3 31 23 31z' fill='%23F2CEA5'/%3e%3c/svg%3e"};const qe=Oe})(),i})());
//# sourceMappingURL=react-simple-chatbot.js.map