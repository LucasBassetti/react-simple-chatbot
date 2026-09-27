import{r as e,t}from"./react.yIOJJ3r4.js";var n=`-ms-`,r=`-moz-`,i=`-webkit-`,a=`comm`,o=`rule`,s=`decl`,c=`@import`,l=`@namespace`,u=`@keyframes`,d=`@layer`,f=Math.abs,p=String.fromCharCode,m=Object.assign;function h(e,t){return b(e,0)^45?(((t<<2^b(e,0))<<2^b(e,1))<<2^b(e,2))<<2^b(e,3):0}function g(e){return e.trim()}function _(e,t){return(e=t.exec(e))?e[0]:e}function v(e,t,n){return e.replace(t,n)}function y(e,t,n){return e.indexOf(t,n)}function b(e,t){return e.charCodeAt(t)|0}function x(e,t,n){return e.slice(t,n)}function S(e){return e.length}function ee(e){return e.length}function C(e,t){return t.push(e),e}function w(e,t){return e.map(t).join(``)}function T(e,t){return e.filter(function(e){return!_(e,t)})}var E=1,D=1,O=0,k=0,A=0,j=``;function te(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:E,column:D,length:o,return:``,siblings:s}}function M(e,t){return m(te(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function N(e){for(;e.root;)e=M(e.root,{children:[e]});C(e,e.siblings)}function ne(){return A}function re(){return A=k>0?b(j,--k):0,D--,A===10&&(D=1,E--),A}function P(){return A=k<O?b(j,k++):0,D++,A===10&&(D=1,E++),A}function F(){return b(j,k)}function ie(){return k}function I(e,t){return x(j,e,t)}function L(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function ae(e){return E=D=1,O=S(j=e),k=0,[]}function oe(e){return j=``,e}function se(e){return g(I(k-1,ue(e===91?e+2:e===40?e+1:e)))}function ce(e){for(;(A=F())&&A<33;)P();return L(e)>2||L(A)>3?``:` `}function le(e,t){for(;--t&&P()&&!(A<48||A>102||A>57&&A<65||A>70&&A<97););return I(e,ie()+(t<6&&F()==32&&P()==32))}function ue(e){for(;P();)switch(A){case e:return k;case 34:case 39:e!==34&&e!==39&&ue(A);break;case 40:e===41&&ue(e);break;case 92:P()}return k}function de(e,t){for(;P()&&e+A!==57&&(e+A!==84||F()!==47););return`/*`+I(t,k-1)+`*`+p(e===47?e:P())}function fe(e){for(;!L(F());)P();return I(e,k)}function pe(e){return oe(me(``,null,null,null,[``],e=ae(e),0,[0],e))}function me(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,m=0,h=0,g=0,_=1,ee=1,w=1,T=0,E=``,D=i,O=a,k=r,A=E;ee;)switch(g=T,T=P()){case 40:if(g!=108&&b(A,d-1)==58){y(A+=v(se(T),`&`,`&\f`),`&\f`,f(l?s[l-1]:0))!=-1&&(w=-1);break}case 34:case 39:case 91:A+=se(T);break;case 9:case 10:case 13:case 32:A+=ce(g);break;case 92:A+=le(ie()-1,7);continue;case 47:switch(F()){case 42:case 47:C(ge(de(P(),ie()),t,n,c),c),(L(g||1)==5||L(F()||1)==5)&&S(A)&&x(A,-1,void 0)!==` `&&(A+=` `);break;default:A+=`/`}break;case 123*_:s[l++]=S(A)*w;case 125*_:case 59:case 0:switch(T){case 0:case 125:ee=0;case 59+u:w==-1&&(A=v(A,/\f/g,``)),h>0&&(S(A)-d||_===0&&g===47)&&C(h>32?_e(A+`;`,r,n,d-1,c):_e(v(A,` `,``)+`;`,r,n,d-2,c),c);break;case 59:A+=`;`;default:if(C(k=he(A,t,n,l,u,i,s,E,D=[],O=[],d,a),a),T===123){if(u===0)me(A,t,k,k,D,a,d,s,O);else{switch(m){case 99:if(b(A,3)===110)break;case 108:if(b(A,2)===97)break;default:u=0;case 100:case 109:case 115:}u?me(e,k,k,r&&C(he(e,k,k,0,0,i,s,E,i,D=[],d,O),O),i,O,d,s,r?D:O):me(A,k,k,k,[``],O,0,s,O)}}}l=u=h=0,_=w=1,E=A=``,d=o;break;case 58:d=1+S(A),h=g;default:if(_<1){if(T==123)--_;else if(T==125&&_++==0&&re()==125)continue}switch(A+=p(T),T*_){case 38:w=u>0?1:(A+=`\f`,-1);break;case 44:s[l++]=(S(A)-1)*w,w=1;break;case 64:F()===45&&(A+=se(P())),m=F(),u=d=S(E=A+=fe(ie())),T++;break;case 45:g===45&&S(A)==2&&(_=0)}}return a}function he(e,t,n,r,i,a,s,c,l,u,d,p){for(var m=i-1,h=i===0?a:[``],_=ee(h),y=0,b=0,S=0;y<r;++y)for(var C=0,w=x(e,m+1,m=f(b=s[y])),T=e;C<_;++C)(T=g(b>0?h[C]+` `+w:v(w,/&\f/g,h[C])))&&(l[S++]=T);return te(e,t,n,i===0?o:c,l,u,d,p)}function ge(e,t,n,r){return te(e,t,n,a,p(ne()),x(e,2,-2),0,r)}function _e(e,t,n,r,i){return te(e,t,n,s,x(e,0,r),x(e,r+1,-1),r,i)}function ve(e,t,a){switch(h(e,t)){case 5103:return i+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return i+e+e;case 4855:return i+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return r+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return i+e+r+e+n+e+e;case 5936:switch(b(e,t+11)){case 114:return i+e+n+v(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return i+e+n+v(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return i+e+n+v(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return i+e+n+e+e;case 6165:return i+e+n+`flex-`+e+e;case 5187:return i+e+v(e,/(\w+).+(:[^]+)/,i+`box-$1$2`+n+`flex-$1$2`)+e;case 5443:return i+e+n+`flex-item-`+v(e,/flex-|-self/g,``)+(_(e,/flex-|baseline/)?``:n+`grid-row-`+v(e,/flex-|-self/g,``))+e;case 4675:return i+e+n+`flex-line-pack`+v(e,/align-content|flex-|-self/g,``)+e;case 5548:return i+e+n+v(e,`shrink`,`negative`)+e;case 5292:return i+e+n+v(e,`basis`,`preferred-size`)+e;case 6060:return i+`box-`+v(e,`-grow`,``)+i+e+n+v(e,`grow`,`positive`)+e;case 4554:return i+v(e,/([^-])(transform)/g,`$1`+i+`$2`)+e;case 6187:return v(v(v(e,/(zoom-|grab)/,i+`$1`),/(image-set)/,i+`$1`),e,``)+e;case 5495:case 3959:return v(e,/(image-set\([^]*)/,i+"$1$`$1");case 4968:return v(v(e,/(.+:)(flex-)?(.*)/,i+`box-pack:$3`+n+`flex-pack:$3`),/space-between/,`justify`)+i+e+e;case 4200:if(!_(e,/flex-|baseline/))return n+`grid-column-align`+x(e,t)+e;break;case 2592:case 3360:return n+v(e,`template-`,``)+e;case 4384:case 3616:return a&&a.some(function(e,n){return t=n,_(e.props,/grid-\w+-end/)})?~y(e+(a=a[t].value),`span`,0)?e:n+v(e,`-start`,``)+e+n+`grid-row-span:`+(~y(a,`span`,0)?_(a,/\d+/):+_(a,/\d+/)-_(e,/\d+/))+`;`:n+v(e,`-start`,``)+e;case 4896:case 4128:return a&&a.some(function(e){return _(e.props,/grid-\w+-start/)})?e:n+v(v(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return v(e,/(.+)-inline(.+)/,i+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(S(e)-1-t>6)switch(b(e,t+1)){case 109:if(b(e,t+4)!==45)break;case 102:return v(e,/(.+:)(.+)-([^]+)/,`$1`+i+`$2-$3$1`+r+(b(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~y(e,`stretch`,0)?ve(v(e,`stretch`,`fill-available`),t,a)+e:e}break;case 5152:case 5920:return v(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,r,i,a,o,s,c){return n+r+`:`+i+c+(a?n+r+`-span:`+(o?s:+s-i)+c:``)+e});case 4949:if(b(e,t+6)===121)return v(e,`:`,`:`+i)+e;break;case 6444:switch(b(e,b(e,14)===45?18:11)){case 120:return v(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+i+(b(e,14)===45?`inline-`:``)+`box$3$1`+i+`$2$3$1`+n+`$2box$3`)+e;case 100:return v(e,`:`,`:`+n)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return v(e,`scroll-`,`scroll-snap-`)+e}return e}function ye(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function be(e,t,n,r){switch(e.type){case d:if(e.children.length)break;case c:case l:case s:return e.return=e.return||e.value;case a:return``;case u:return e.return=e.value+`{`+ye(e.children,r)+`}`;case o:if(!S(e.value=e.props.join(`,`)))return``}return S(n=ye(e.children,r))?e.return=e.value+`{`+n+`}`:``}function xe(e){var t=ee(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function R(e){return function(t){t.root||(t=t.return)&&e(t)}}function Se(e,t,a,c){if(e.length>-1&&!e.return)switch(e.type){case s:e.return=ve(e.value,e.length,a);return;case u:return ye([M(e,{value:v(e.value,`@`,`@`+i)})],c);case o:if(e.length)return w(a=e.props,function(t){switch(_(t,c=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:N(M(e,{props:[v(t,/:(read-\w+)/,`:`+r+`$1`)]})),N(M(e,{props:[t]})),m(e,{props:T(a,c)});break;case`::placeholder`:N(M(e,{props:[v(t,/:(plac\w+)/,`:`+i+`input-$1`)]})),N(M(e,{props:[v(t,/:(plac\w+)/,`:`+r+`$1`)]})),N(M(e,{props:[v(t,/:(plac\w+)/,n+`input-$1`)]})),N(M(e,{props:[t]})),m(e,{props:T(a,c)})}return``})}}var z=e(t()),B=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,Ce=`active`,V=`data-styled-version`,H=`6.5.3`,we=`/*!sc*/
`,U=typeof window<`u`&&typeof document<`u`;function Te(e){if(typeof process<`u`){let t={}[e];if(t!==void 0&&t!==``)return t!==`false`}}var Ee=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:Te(`REACT_APP_SC_DISABLE_SPEEDY`)??Te(`SC_DISABLE_SPEEDY`)??(typeof process<`u`&&!1)),De=`sc-keyframes-`;function W(e,...t){return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var G=new Map,Oe=new Map,ke=1,Ae=e=>{if(G.has(e))return G.get(e);for(;Oe.has(ke);)ke++;let t=ke++;return G.set(e,t),Oe.set(t,e),t},je=e=>Oe.get(e),Me=(e,t)=>{ke=t+1,G.set(e,t),Oe.set(t,e)},Ne=Object.freeze([]),K=Object.freeze({});function Pe(e,t,n=K){return e.theme!==n.theme&&e.theme||t||n.theme}var Fe=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Ie=/(^-|-$)/g;function Le(e){return e.replace(Fe,`-`).replace(Ie,``)}var Re=/(a)(d)/gi,ze=e=>String.fromCharCode(e+(e>25?39:97));function Be(e){let t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=ze(t%52)+n;return(ze(t%52)+n).replace(Re,`$1-$2`)}var Ve=5381,q=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},He=e=>q(Ve,e);function Ue(e){return Be(He(e)>>>0)}function We(e){return e.displayName||e.name||`Component`}function Ge(e){return typeof e==`string`&&!0}function Ke(e){return Ge(e)?`styled.${e}`:`Styled(${We(e)})`}var qe=Symbol.for(`react.memo`),Je=Symbol.for(`react.forward_ref`),Ye={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},Xe={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Ze={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Qe={[Je]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[qe]:Ze};function $e(e){return(`type`in(t=e)&&t.type.$$typeof)===qe?Ze:`$$typeof`in e?Qe[e.$$typeof]:Ye;var t}var et=Object.defineProperty,tt=Object.getOwnPropertyNames,nt=Object.getOwnPropertySymbols,rt=Object.getOwnPropertyDescriptor,it=Object.getPrototypeOf,at=Object.prototype;function ot(e,t,n){if(typeof t!=`string`){let r=it(t);r&&r!==at&&ot(e,r,n);let i=tt(t).concat(nt(t)),a=$e(e),o=$e(t);for(let r=0;r<i.length;++r){let s=i[r];if(!(s in Xe||n&&n[s]||o&&s in o||a&&s in a)){let n=rt(t,s);try{et(e,s,n)}catch{}}}}return e}function st(e){return typeof e==`function`}var ct=Symbol.for(`react.forward_ref`);function lt(e){return e!=null&&(typeof e==`object`||typeof e==`function`)&&e.$$typeof===ct&&`styledComponentId`in e}function ut(e,t){return e&&t?e+` `+t:e||t||``}function dt(e,t){return e.join(t||``)}function ft(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function pt(e,t,n=!1){if(!n&&!ft(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=pt(e[n],t[n]);else if(ft(t))for(let n in t)e[n]=pt(e[n],t[n]);return e}function mt(e,t){Object.defineProperty(e,"toString",{value:t})}var ht=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){let t=this.groupSizes,n=t.length,r=n;for(;e>=r;)if(r<<=1,r<0)throw W(16,`${e}`);this.groupSizes=new Uint32Array(r),this.groupSizes.set(t),this.length=r;for(let e=n;e<r;e++)this.groupSizes[e]=0}let n=this.indexOfGroup(e+1),r=0;for(let i=0,a=t.length;i<a;i++)this.tag.insertRule(n,t[i])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){let t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let e=n;e<r;e++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t=``;if(e>=this.length||this.groupSizes[e]===0)return t;let n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n;for(let e=r;e<i;e++)t+=this.tag.getRule(e)+we;return t}},gt=`style[${B}][${V}="${H}"]`,_t=RegExp(`^${B}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),vt=e=>typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11,yt=e=>{if(!e)return document;if(vt(e))return e;if(`getRootNode`in e){let t=e.getRootNode();if(vt(t))return t}return document},bt=(e,t,n)=>{let r=n.split(`,`),i;for(let n=0,a=r.length;n<a;n++)(i=r[n])&&e.registerName(t,i)},xt=(e,t)=>{let n=(t.textContent??``).split(we),r=[];for(let t=0,i=n.length;t<i;t++){let i=n[t].trim();if(!i)continue;let a=i.match(_t);if(a){let t=0|parseInt(a[1],10),n=a[2];t!==0&&(Me(n,t),bt(e,n,a[3]),e.getTag().insertRules(t,r)),r.length=0}else r.push(i)}},St=e=>{let t=yt(e.options.target).querySelectorAll(gt);for(let n=0,r=t.length;n<r;n++){let r=t[n];r&&r.getAttribute(B)!==Ce&&(xt(e,r),r.parentNode&&r.parentNode.removeChild(r))}},Ct=!1;function wt(){if(!1!==Ct)return Ct;if(typeof document<`u`){let e=document.head.querySelector(`meta[property="csp-nonce"]`);if(e)return Ct=e.nonce||e.getAttribute(`content`)||void 0;let t=document.head.querySelector(`meta[name="sc-nonce"]`);if(t)return Ct=t.getAttribute(`content`)||void 0}return Ct=typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}var Tt=(e,t)=>{let n=document.head,r=e||n,i=document.createElement(`style`),a=(e=>{let t=Array.from(e.querySelectorAll(`style[${B}]`));return t[t.length-1]})(r),o=a===void 0?null:a.nextSibling;i.setAttribute(B,Ce),i.setAttribute(V,H);let s=t||wt();return s&&i.setAttribute(`nonce`,s),r.insertBefore(i,o),i},Et=class{constructor(e,t){this.element=Tt(e,t),this.element.appendChild(document.createTextNode(``)),this.sheet=(e=>{if(e.sheet)return e.sheet;let t=e.getRootNode().styleSheets??document.styleSheets;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r.ownerNode===e)return r}throw W(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){let t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``}},Dt=class{constructor(e,t){this.element=Tt(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){let n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:``}},Ot=U,kt={isServer:!U,useCSSOMInjection:!Ee},At=class e{static registerId(e){return Ae(e)}constructor(e=K,t={},n){this.options=Object.assign(Object.assign({},kt),e),this.gs=t,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!e.isServer,!this.server&&U&&Ot&&(Ot=!1,St(this)),mt(this,()=>(e=>{let t=e.getTag(),{length:n}=t,r=``;for(let i=0;i<n;i++){let n=je(i);if(n===void 0)continue;let a=e.names.get(n);if(a===void 0||!a.size)continue;let o=t.getGroup(i);if(o.length===0)continue;let s=B+`.g`+i+`[id="`+n+`"]`,c=``;for(let e of a)e.length>0&&(c+=e+`,`);r+=o+s+`{content:"`+c+`"}/*!sc*/
`}return r})(this))}rehydrate(){!this.server&&U&&St(this)}reconstructWithOptions(t,n=!0){let r=new e(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&U&&t.target!==this.options.target&&yt(this.options.target)!==yt(t.target)&&St(r),r}allocateGSInstance(e){return this.gs[e]=(this.gs[e]||0)+1}getTag(){return this.tag||=(e=(({useCSSOMInjection:e,target:t,nonce:n})=>e?new Et(t,n):new Dt(t,n))(this.options),new ht(e));var e}hasNameForId(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n}registerName(e,t){Ae(e),e.startsWith(De)&&this.keyframeIds.add(e);let n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))}insertRules(e,t,n){this.registerName(e,t),this.getTag().insertRules(Ae(e),n)}clearNames(e){this.names.has(e)&&this.names.get(e).clear()}clearRules(e){this.getTag().clearGroup(Ae(e)),this.clearNames(e)}clearTag(){this.tag=void 0}},jt=new WeakSet,Mt={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function Nt(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in Mt||e.startsWith(`--`)?String(t).trim():t+`px`}var J=47;function Pt(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t=``;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r>=65&&r<=90?`-`+String.fromCharCode(r+32):e[n]}return t.startsWith(`ms-`)?`-`+t:t}var Ft=Symbol.for(`sc-keyframes`);function It(e){return typeof e==`object`&&!!e&&Ft in e}function Lt(e){return st(e)&&!(e.prototype&&e.prototype.isReactComponent)}var Rt=e=>e==null||!1===e||e===``,zt=Symbol.for(`react.client.reference`);function Bt(e){return e.$$typeof===zt}function Vt(e,t){for(let n in e){let r=e[n];e.hasOwnProperty(n)&&!Rt(r)&&(Array.isArray(r)&&jt.has(r)||st(r)?t.push(Pt(n)+`:`,r,`;`):ft(r)?(t.push(n+` {`),Vt(r,t),t.push(`}`)):t.push(Pt(n)+`: `+Nt(n,r)+`;`))}}function Y(e,t,n,r,i=[]){if(Rt(e))return i;let a=typeof e;if(a===`string`)return i.push(e),i;if(a===`function`)return Bt(e)?i:Lt(e)&&t?Y(e(t),t,n,r,i):(i.push(e),i);if(Array.isArray(e)){for(let a=0;a<e.length;a++)Y(e[a],t,n,r,i);return i}return lt(e)?(i.push(`.${e.styledComponentId}`),i):It(e)?(n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i):Bt(e)?i:ft(e)&&e.toString===Object.prototype.toString?(Vt(e,i),i):(i.push(e.toString()),i)}var Ht=He(H),Ut=class{constructor(e,t,n){this.rules=e,this.componentId=t,this.baseHash=q(Ht,t),this.baseStyle=n,At.registerId(t)}generateAndInjectStyles(e,t,n){let r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;{let i=``;for(let r=0;r<this.rules.length;r++){let a=this.rules[r];if(typeof a==`string`)i+=a;else if(a){if(Lt(a)){let r=a(e);typeof r==`string`?i+=r:r!=null&&!1!==r&&(i+=dt(Y(r,e,t,n)))}else i+=dt(Y(a,e,t,n))}}if(i){this.dynamicNameCache||=new Map;let e=n.hash?n.hash+i:i,a=this.dynamicNameCache.get(e);if(!a){if(a=Be(q(q(this.baseHash,n.hash),i)>>>0),this.dynamicNameCache.size>=200){let e=this.dynamicNameCache.keys().next().value;e!==void 0&&this.dynamicNameCache.delete(e)}this.dynamicNameCache.set(e,a)}if(!t.hasNameForId(this.componentId,a)){let e=n(i,`.`+a,void 0,this.componentId);t.insertRules(this.componentId,a,e)}r=ut(r,a)}}return r}},Wt=/&/g;function Gt(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function Kt(e){let t=e.length,n=``,r=0,i=0,a=0,o=!1,s=!1;for(let c=0;c<t;c++){let l=e.charCodeAt(c);if(a!==0||o||l!==J||e.charCodeAt(c+1)!==42){if(o)l===42&&e.charCodeAt(c+1)===J&&(o=!1,c++);else if(l!==34&&l!==39||Gt(e,c)){if(a===0){if(l===123)i++;else if(l===125){if(i--,i<0){s=!0;let n=c+1;for(;n<t;){let t=e.charCodeAt(n);if(t===59||t===10)break;n++}n<t&&e.charCodeAt(n)===59&&n++,i=0,c=n-1,r=n;continue}i===0&&(n+=e.substring(r,c+1),r=c+1)}else l===59&&i===0&&(n+=e.substring(r,c+1),r=c+1)}}else a===0?a=l:a===l&&(a=0)}else o=!0,c++}return s||i!==0||a!==0?(r<t&&i===0&&a===0&&(n+=e.substring(r)),n):e}function qt(e,t){let n=t+` `,r=`,`+n;for(let i=0;i<e.length;i++){let a=e[i];if(a.type===`rule`){a.value=(n+a.value).replaceAll(`,`,r);let e=a.props,t=[];for(let r=0;r<e.length;r++)t[r]=n+e[r];a.props=t}Array.isArray(a.children)&&a.type!==`@keyframes`&&qt(a.children,t)}return e}function Jt({options:e=K,plugins:t=Ne}=K){let n,r,i,a=(e,t,i)=>i.startsWith(r)&&i.endsWith(r)&&i.replaceAll(r,``).length>0?`.${n}`:e,o=t.slice();o.push(e=>{e.type===`rule`&&e.value.includes(`&`)&&(i||=RegExp(`\\${r}\\b`,`g`),e.props[0]=e.props[0].replace(Wt,r).replace(i,a))}),e.prefix&&o.push(Se),o.push(be);let s=[],c=xe(o.concat(R(e=>s.push(e)))),l=(t,a=``,o=``,l=`&`)=>{n=l,r=a,i=void 0;let u=function(e){let t=e.indexOf(`//`)!==-1,n=e.indexOf(`}`)!==-1;if(!t&&!n)return e;if(!t)return Kt(e);let r=e.length,i=``,a=0,o=0,s=0,c=0,l=0,u=!1;for(;o<r;){let t=e.charCodeAt(o);if(t!==34&&t!==39||Gt(e,o)){if(s===0){if(t===J&&o+1<r&&e.charCodeAt(o+1)===42){for(o+=2;o+1<r&&(e.charCodeAt(o)!==42||e.charCodeAt(o+1)!==J);)o++;o+=2}else if(t!==40){if(t!==41){if(c>0)o++;else if(t===42&&o+1<r&&e.charCodeAt(o+1)===J)i+=e.substring(a,o),o+=2,a=o,u=!0;else if(t===J&&o+1<r&&e.charCodeAt(o+1)===J){for(i+=e.substring(a,o);o<r&&e.charCodeAt(o)!==10;)o++;a=o,u=!0}else t===123?l++:t===125&&l--,o++}else c>0&&c--,o++}else c++,o++}else o++}else s===0?s=t:s===t&&(s=0),o++}return u?(a<r&&(i+=e.substring(a)),l===0?i:Kt(i)):l===0?e:Kt(e)}(t),d=pe(o||a?o+` `+a+` { `+u+` }`:u);return e.namespace&&(d=qt(d,e.namespace)),s=[],ye(d,c),s},u=e,d=Ve;for(let e=0;e<t.length;e++)t[e].name||W(15),d=q(d,t[e].name);return u!=null&&u.namespace&&(d=q(d,u.namespace)),u!=null&&u.prefix&&(d=q(d,`p`)),l.hash=d===Ve?``:d.toString(),l}var Yt=new At,Xt=Jt(),Zt=z.createContext({shouldForwardProp:void 0,styleSheet:Yt,stylis:Xt,stylisPlugins:void 0});Zt.Consumer;function Qt(){return z.useContext(Zt)}var $t=z.createContext(void 0);$t.Consumer;function en(e){let t=z.useContext($t),n=z.useMemo(()=>function(e,t){if(!e)throw W(14);if(st(e))return e(t);if(Array.isArray(e)||typeof e!=`object`)throw W(8);return t?Object.assign(Object.assign({},t),e):e}(e.theme,t),[e.theme,t]);return e.children?z.createElement($t.Provider,{value:n},e.children):null}var tn=Object.prototype.hasOwnProperty,nn={};function rn(e,t){let n=typeof e==`string`?Le(e):`sc`;nn[n]=(nn[n]||0)+1;let r=n+`-`+Ue(H+n+nn[n]);return t?t+`-`+r:r}function an(e,t,n){let r=lt(e),i=e,a=!Ge(e),{attrs:o=Ne,componentId:s=rn(t.displayName,t.parentComponentId),displayName:c=Ke(e)}=t,l=t.displayName&&t.componentId?Le(t.displayName)+`-`+t.componentId:t.componentId||s,u=r&&i.attrs?i.attrs.concat(o).filter(Boolean):o,{shouldForwardProp:d}=t;if(r&&i.shouldForwardProp){let e=i.shouldForwardProp;if(t.shouldForwardProp){let n=t.shouldForwardProp;d=(t,r)=>e(t,r)&&n(t,r)}else d=e}let f=new Ut(n,l,r?i.componentStyle:void 0);function p(e,t){return function(e,t,n){let{attrs:r,componentStyle:i,defaultProps:a,foldedComponentIds:o,styledComponentId:s,target:c}=e,l=z.useContext($t),u=Qt(),d=e.shouldForwardProp||u.shouldForwardProp,f=Pe(t,l,a)||K,p,m;{let e=z.useRef(null),n=e.current;if(n!==null&&n[1]===f&&n[2]===u.styleSheet&&n[3]===u.stylis&&n[7]===i&&function(e,t,n){let r=e,i=t,a=0;for(let e in i)if(tn.call(i,e)&&(a++,r[e]!==i[e]))return!1;return a===n}(n[0],t,n[4]))p=n[5],m=n[6];else{p=function(e,t,n){let r=Object.assign(Object.assign({},t),{className:void 0,theme:n}),i=e.length>1;for(let n=0;n<e.length;n++){let a=e[n],o=st(a)?a(i?Object.assign({},r):r):a;for(let e in o)e===`className`?r.className=ut(r.className,o[e]):e===`style`?r.style=Object.assign(Object.assign({},r.style),o[e]):e in t&&t[e]===void 0||(r[e]=o[e])}return`className`in t&&typeof t.className==`string`&&(r.className=ut(r.className,t.className)),r}(r,t,f),m=i.generateAndInjectStyles(p,u.styleSheet,u.stylis);let n=0;for(let e in t)tn.call(t,e)&&n++;e.current=[t,f,u.styleSheet,u.stylis,n,p,m,i]}}let h=p.as||c,g=function(e,t,n,r){let i={};for(let a in e)e[a]===void 0||a[0]===`$`||a===`as`||a===`theme`&&e.theme===n||(a===`forwardedAs`?i.as=e.forwardedAs:r&&!r(a,t)||(i[a]=e[a]));return i}(p,h,f,d),_=ut(o,s);return m&&(_+=` `+m),p.className&&(_+=` `+p.className),g[Ge(h)&&h.includes(`-`)?`class`:`className`]=_,n&&(g.ref=n),(0,z.createElement)(h,g)}(m,e,t)}p.displayName=c;let m=z.forwardRef(p);return m.attrs=u,m.componentStyle=f,m.displayName=c,m.shouldForwardProp=d,m.foldedComponentIds=r?ut(i.foldedComponentIds,i.styledComponentId):``,m.styledComponentId=l,m.target=r?i.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(e){this._foldedDefaultProps=r?function(e,...t){for(let n of t)pt(e,n,!0);return e}({},i.defaultProps,e):e}}),mt(m,()=>`.${m.styledComponentId}`),a&&ot(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var on=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`));function sn(e,t){let n=[e[0]];for(let r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var cn=e=>(jt.add(e),e);function ln(e,...t){if(st(e)||ft(e))return cn(Y(sn(Ne,[e,...t])));let n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?Y(n):cn(Y(sn(n,t)))}function un(e,t,n=K){if(!t)throw W(1,t);let r=(r,...i)=>e(t,n,ln(r,...i));return r.attrs=r=>un(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)})),r.withConfig=r=>un(e,t,Object.assign(Object.assign({},n),r)),r}var dn=e=>un(an,e),X=dn;on.forEach(e=>{X[e]=dn(e)});var fn,pn=class{constructor(e,t){this[fn]=!0,this.inject=(e,t=Xt)=>{let n=this.getName(t);if(!e.hasNameForId(this.id,n)){let r=t(this.rules,n,`@keyframes`);e.insertRules(this.id,n,r)}},this.name=e,this.id=De+e,this.rules=t,Ae(this.id),mt(this,()=>{throw W(12,String(this.name))})}getName(e=Xt){return e.hash?this.name+Be(e.hash>>>0):this.name}};function mn(e,...t){let n=dt(ln(e,...t));return new pn(Ue(n),n)}fn=Ft,`${B}`,`${B}`,`${B}`;var hn=e=>{if(typeof e!=`string`)return null;let t=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(e,t,n,r)=>t+t+n+n+r+r),n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16)}:null},Z=(e,t=1)=>{let n=hn(e);return n?`rgba(${n.r}, ${n.g}, ${n.b}, ${t})`:`color-mix(in srgb, ${e} ${t*100}%, transparent)`},gn=mn`
  0%, 60%, 100% { opacity: .35; transform: translateY(0); }
  30% { opacity: 1; transform: translateY(-3px); }
`,_n=mn`
  from { opacity: 0; transform: translateY(6px) scale(.98); }
  to { opacity: 1; transform: none; }
`,vn=mn`
  25% { transform: translateX(-3px); }
  75% { transform: translateX(3px); }
`,yn=e=>mn`
  0% { box-shadow: 0 0 0 0 ${Z(e,.4)}; }
  70% { box-shadow: 0 0 0 10px ${Z(e,0)}; }
  100% { box-shadow: 0 0 0 0 ${Z(e,0)}; }
`,bn=ln`
  animation: ${_n} 0.25s ease-out both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,xn=X.span`
  animation: ${gn} 1.2s ease-in-out infinite both;
  animation-delay: ${({$delay:e})=>e};
  background: currentColor;
  border-radius: 50%;
  display: inline-block;
  height: 6px;
  width: 6px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.6;
  }
`,Sn=()=>z.createElement(`span`,{className:`rsc-loading`,role:`status`,"aria-label":`Typing`,style:{alignItems:`center`,display:`inline-flex`,gap:4,height:`1lh`,minHeight:`1.45em`,verticalAlign:`top`}},z.createElement(xn,{$delay:`0s`}),z.createElement(xn,{$delay:`.15s`}),z.createElement(xn,{$delay:`.3s`})),Cn=X.div`
  ${bn}
  background: #fff;
  border-radius: 14px;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.06),
    0 1px 3px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  margin: 0 0 12px ${({$offset:e})=>e}px;
  overflow-wrap: anywhere;
  padding: 16px;
`,wn=({step:e,previousValue:t,speak:n,triggerNextStep:r,waitAction:i})=>{let[a,o]=(0,z.useState)(!0),s=(0,z.useRef)(!1),c=(0,z.useRef)(!1),l=(0,z.useCallback)(e=>{c.current||(c.current=!0,r(e))},[r]);return(0,z.useEffect)(()=>{let t=setTimeout(()=>o(!1),e.delay);return()=>clearTimeout(t)},[e.delay]),(0,z.useEffect)(()=>{a||s.current||(s.current=!0,!e.rendered&&(i||l(),n(e,t)))},[a,t,n,e,l,i]),{loading:a,triggerNextStep:l}},Tn=(e,t)=>typeof e.type==`string`?e:(0,z.cloneElement)(e,t),En=()=>{},Dn=({step:e,steps:t,previousStep:n,previousValue:r=``,speak:i=En,style:a,hideBotAvatar:o=!1,triggerNextStep:s})=>{let{loading:c,triggerNextStep:l}=wn({step:e,previousValue:r,speak:i,triggerNextStep:s,waitAction:e.waitAction});return z.createElement(Cn,{className:`rsc-cs`,style:a,$offset:o?0:40},c||!e.component?z.createElement(Sn,null):Tn(e.component,{step:e,steps:t,previousStep:n,triggerNextStep:l}))},On=X.li`
  ${bn}
  display: block;
  margin: 0;
  padding: 0;
`,kn={background:`#f5f8fb`,fontFamily:`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,headerBgColor:`#6e48aa`,headerFontColor:`#fff`,headerFontSize:`16px`,botBubbleColor:`#6E48AA`,botFontColor:`#fff`,userBubbleColor:`#fff`,userFontColor:`#4a4a4a`},Q=e=>({theme:t})=>t?.[e]??kn[e],An=Q(`botBubbleColor`),jn=X.button`
  background: #fff;
  border: 1px solid ${An};
  border-radius: 999px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  color: ${An};
  cursor: pointer;
  display: inline-block;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  margin: 0;
  padding: 7px 14px;
  text-align: center;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    background: ${An};
    color: ${Q(`botFontColor`)};
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px ${e=>Z(An(e),.3)};
    outline: none;
  }
`,Mn=X.ul`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 2px 0 12px;
  padding: 0 0 0 ${({$offset:e})=>e}px;
`,Nn=X.div``,Pn=40,Fn=({step:e,bubbleOptionStyle:t,hideBotAvatar:n=!1,triggerNextStep:r})=>{let i=(0,z.useRef)(!1),{options:a=[]}=e,o=e=>{i.current||(i.current=!0,r({value:e}))};return z.createElement(Nn,{className:`rsc-os`},z.createElement(Mn,{className:`rsc-os-options`,$offset:n?0:Pn},a.map(({value:e,label:n})=>z.createElement(On,{key:String(e),className:`rsc-os-option`},z.createElement(jn,{type:`button`,className:`rsc-os-option-element`,style:t,onClick:()=>o(e)},n)))))},In=Q(`userBubbleColor`),Ln=Q(`botBubbleColor`),Rn=Q(`userFontColor`),zn=Q(`botFontColor`),$=`18px`,Bn=`6px`,Vn=X.div`
  ${bn}
  background: ${e=>e.$user?In(e):Ln(e)};
  border-radius: ${({$isFirst:e,$isLast:t,$user:n})=>{let r=e?$:Bn,i=t?$:Bn;return n?`${$} ${r} ${i} ${$}`:`${r} ${$} ${$} ${i}`}};
  box-shadow: ${({$user:e})=>e?`0 0 0 1px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.06)`:`none`};
  box-sizing: border-box;
  color: ${e=>e.$user?Rn(e):zn(e)};
  font-size: 14px;
  line-height: 1.45;
  max-width: 78%;
  min-width: 0;
  overflow-wrap: anywhere;
  padding: 9px 14px;
  position: relative;
  transform-origin: ${({$user:e})=>e?`top right`:`top left`};
`,Hn=X.img`
  ${bn}
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  display: block;
  height: 32px;
  max-width: none;
  object-fit: cover;
  padding: 3px;
  width: 32px;
`,Un=X.div`
  box-sizing: border-box;
  flex: 0 0 32px;
  height: 32px;
  /* centered on the first line of the message */
  margin-top: 4px;
  width: 32px;
`,Wn=X.div`
  align-items: flex-start;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${({$user:e})=>e?`row-reverse`:`row`};
  gap: 8px;
  margin-bottom: ${({$isLast:e})=>e?`12px`:`2px`};
`,Gn=()=>{},Kn=({step:e,steps:t={},previousStep:n={},previousValue:r=``,speak:i=Gn,triggerNextStep:a,avatarStyle:o,bubbleStyle:s,hideBotAvatar:c,hideUserAvatar:l,isFirst:u,isLast:d})=>{let{avatar:f,botName:p,component:m,message:h,user:g}=e,{loading:_,triggerNextStep:v}=wn({step:e,previousValue:r,speak:i,triggerNextStep:a,waitAction:!!(m&&e.waitAction)}),y=()=>m?Tn(m,{step:e,steps:t,previousStep:n,triggerNextStep:v}):typeof h==`string`?h.replace(/{previousValue}/g,String(r)):``,b=g?!l:!c,x=g?`Your avatar`:`${p}'s avatar`;return z.createElement(Wn,{className:`rsc-ts ${g?`rsc-ts-user`:`rsc-ts-bot`}`,$user:g,$isLast:d},b&&z.createElement(Un,{className:`rsc-ts-image-container`},u&&z.createElement(Hn,{className:`rsc-ts-image`,style:o,src:f,alt:x})),z.createElement(Vn,{className:`rsc-ts-bubble`,style:s,$user:g,$isFirst:u,$isLast:d},_?z.createElement(Sn,null):y()))},{parse:qn,stringify:Jn}=JSON,{keys:Yn}=Object,Xn=String,Zn=`string`,Qn={},$n=`object`,er=(e,t)=>t,tr=e=>e instanceof Xn?Xn(e):e,nr=(e,t)=>typeof t===Zn?new Xn(t):t,rr=(e,t,n,r)=>i=>{for(let a=Yn(i),{length:o}=a,s=0;s<o;s++){let o=a[s],c=i[o];if(c instanceof Xn){let a=e[+c];typeof a===$n&&!n.has(a)?(n.add(a),i[o]=Qn,t.push({o:i,k:o,r:a})):i[o]=r.call(i,o,a)}else i[o]!==Qn&&(i[o]=r.call(i,o,c))}return i},ir=(e,t,n)=>{let r=Xn(t.push(n)-1);return e.set(n,r),r},ar=(e,t)=>{let n=qn(e,nr).map(tr),r=t||er,i=n[0];if(typeof i===$n&&i){let e=[],t=rr(n,e,new Set,r);i=t(i);let a=0;for(;a<e.length;){let{o:n,k:i,r:o}=e[a++];n[i]=r.call(n,i,t(o))}}return r.call({"":i},``,i)},or=(e,t,n)=>{let r=t&&typeof t===$n?(e,n)=>e===``||-1<t.indexOf(e)?n:void 0:t||er,i=new Map,a=[],o=[],s=+ir(i,a,r.call({"":e},``,e)),c=!s;for(;s<a.length;)c=!0,o[s]=Jn(a[s++],l,n);return`[`+o.join(`,`)+`]`;function l(e,t){if(c)return c=!c,t;let n=r.call(this,e,t);switch(typeof n){case $n:if(n===null)return n;case Zn:return i.get(n)||ir(i,a,n)}return n}},sr=()=>{try{return typeof window<`u`?window.localStorage:null}catch{return null}},cr=(e,t)=>{let{cacheName:n,cache:r,firstStep:i,steps:a}=e,o=i,s=i.user?[]:[i],c=i.user?[]:[i],l={},u=r?sr():null,d=null;if(u)try{d=u.getItem(n)}catch{d=null}if(u&&d)try{let e=ar(d),r=e.renderedSteps[e.renderedSteps.length-1];if(r&&r.end)u.removeItem(n);else{for(let t=0,n=e.renderedSteps.length;t<n;t+=1){let n=e.renderedSteps[t];n.delay=0,n.rendered=!0,n.component&&=a[n.id].component}let{trigger:n,end:r,options:i,id:o}=e.currentStep;if(i&&delete e.currentStep.rendered,!n&&!r){let t=a[o].options;if(i&&t)for(let e=0;e<i.length;e+=1)i[e].trigger=t[e].trigger,i[e].value=t[e].value;else e.currentStep.trigger=a[o].trigger}return e.currentStep.user&&a[o]?.validator&&(e.currentStep.validator=a[o].validator),e.currentStep.user&&t(),e}}catch(e){console.info(`Unable to parse cache named:${n}. \nThe cache where probably created with an older version of react-simple-chatbot.\n`,e)}return i.user&&t(),{currentStep:o,previousStep:l,previousSteps:c,renderedSteps:s}},lr=(e,t)=>{let n=ar(or(t));for(let e of Object.keys(n)){let t=n[e],r=Array.isArray(t)?t:[];for(let e=0,t=r.length;e<t;e+=1)r[e].component&&(r[e].component=r[e].id)}let r=sr();if(r)try{r.setItem(e,or(n))}catch{}},ur=X.div`
  background: ${Q(`background`)};
  border-radius: 16px;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.06),
    0 12px 40px rgba(0, 0, 0, 0.14);
  box-sizing: border-box;
  color: #1f2937;
  display: flex;
  flex-direction: column;
  font-family: ${Q(`fontFamily`)};
  font-size: 14px;
  line-height: 1.45;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  position: ${({$floating:e})=>e?`fixed`:`relative`};
  bottom: ${({$floating:e,$floatingStyle:t})=>e?t.bottom||`32px`:`initial`};
  top: ${({$floating:e,$floatingStyle:t})=>e&&t.top||`initial`};
  right: ${({$floating:e,$floatingStyle:t})=>e?t.right||`32px`:`initial`};
  left: ${({$floating:e,$floatingStyle:t})=>e&&t.left||`initial`};
  width: ${({$width:e})=>e};
  height: ${({$height:e})=>e};
  z-index: 999;
  transform: ${({$opened:e})=>e?`scale(1)`:`scale(0)`};
  transform-origin: ${({$floatingStyle:e})=>e.transformOrigin||`bottom right`};
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);

  @media screen and (max-width: 568px) {
    border-radius: ${({$floating:e})=>e?`0`:``};
    bottom: 0 !important;
    left: initial !important;
    height: 100%;
    right: 0 !important;
    top: initial !important;
    width: 100%;
  }
`,dr=X.div`
  box-sizing: border-box;
  height: calc(
    ${({$height:e})=>e} - ${({$hideInput:e})=>e?`56px`:`112px`}
  );
  overflow-y: auto;
  /* reserve the scrollbar space, so the messages don't wrap again when it appears */
  scrollbar-gutter: stable;
  overscroll-behavior: contain;
  padding: 16px 12px 8px;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  scrollbar-width: thin;

  @media screen and (max-width: 568px) {
    height: ${({$floating:e})=>e?`calc(100% - 112px)`:``};
  }
`,fr=X.div`
  align-items: center;
  background: ${Q(`headerBgColor`)};
  box-sizing: border-box;
  color: ${Q(`headerFontColor`)};
  display: flex;
  fill: ${Q(`headerFontColor`)};
  flex-shrink: 0;
  gap: 8px;
  height: 56px;
  justify-content: space-between;
  padding: 0 8px 0 16px;
`,pr=X.h2`
  font-size: ${Q(`headerFontSize`)};
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,mr=X.a`
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: 36px;
  justify-content: center;
  transition: background-color 0.15s ease;
  width: 36px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.16);
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: -2px;
  }

  svg {
    height: 20px;
    width: 20px;
  }
`,hr=X.a`
  align-items: center;
  cursor: pointer;
  background: ${Q(`headerBgColor`)};
  bottom: 32px;
  border-radius: 50%;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.12),
    0 8px 24px rgba(0, 0, 0, 0.18);
  box-sizing: border-box;
  display: flex;
  fill: ${Q(`headerFontColor`)};
  height: 56px;
  justify-content: center;
  position: fixed;
  right: 32px;
  transform: ${({$opened:e})=>e?`scale(0)`:`scale(1)`};
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  width: 56px;
  z-index: 999;

  &:hover {
    transform: ${({$opened:e})=>e?`scale(0)`:`scale(1.06)`};
  }

  &:focus-visible {
    outline: 3px solid ${Q(`headerBgColor`)};
    outline-offset: 3px;
  }
`,gr=X.img`
  height: 28px;
  width: 28px;
`,_r=X.div`
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  flex-shrink: 0;
  position: relative;
`,vr=X.input`
  animation: ${({$invalid:e})=>e?ln`
          ${vn} 0.3s ease
        `:`none`};
  background: transparent;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  box-sizing: border-box;
  color: ${({$invalid:e})=>e?`#dc2626`:`#1f2937`};
  display: block;
  font: inherit;
  font-size: 15px;
  height: 55px;
  margin: 0;
  opacity: ${({disabled:e,$invalid:t})=>e&&!t?`0.6`:`1`};
  outline: none;
  padding: ${({$hasButton:e})=>e?`0 60px 0 16px`:`0 16px`};
  width: 100%;
  -webkit-appearance: none;

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    background: transparent;
    cursor: not-allowed;
  }
`,yr=Q(`headerBgColor`),br=X.button`
  align-items: center;
  background-color: ${e=>e.$speaking?Z(yr(e),.12):`transparent`};
  border: 0;
  border-radius: 50%;
  box-shadow: none;
  box-sizing: border-box;
  cursor: ${({disabled:e})=>e?`not-allowed`:`pointer`};
  display: flex;
  fill: ${e=>e.$invalid?`#dc2626`:e.disabled?`#9ca3af`:yr(e)};
  height: 40px;
  justify-content: center;
  margin: 8px;
  outline: none;
  padding: 0;
  position: relative;
  transition:
    background-color 0.15s ease,
    fill 0.15s ease;
  width: 40px;

  &:before {
    animation: ${e=>e.$speaking?ln`
            ${yn(yr(e))} 2s ease infinite
          `:`none`};
    border-radius: 50%;
    content: '';
    inset: 0;
    position: absolute;
  }

  &:not(:disabled):hover {
    background-color: ${e=>Z(yr(e),.1)};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${yr};
  }

  svg {
    height: 20px;
    width: 20px;
  }
`,xr=()=>{},Sr=class e{static isSupported(){return typeof window<`u`&&`webkitSpeechRecognition`in window}constructor(e=xr,t=xr,n=xr,r=`en`){this.onEnd=()=>{let{onStop:e,onEnd:t,force:n}=this.state;this.setState({speaking:!1,force:!1}),n?e():t()},this.onResult=e=>{let t=``,n=``;for(let r=e.resultIndex;r<e.results.length;r+=1)e.results[r].isFinal?(n+=e.results[r][0].transcript,this.onFinal(n)):(t+=e.results[r][0].transcript,this.onChange(t))},this.state={inputValue:``,lang:r,onChange:e,onEnd:t,onStop:n},this.setup()}onChange(e){let{onChange:t}=this.state;this.setState({inputValue:e}),t(e)}onFinal(e){let{onChange:t}=this.state;this.setState({inputValue:e}),t(e),this.recognition?.stop()}setState(e){this.state={...this.state,...e}}setup(){if(!e.isSupported())return this;let t=window.webkitSpeechRecognition;return this.recognition=new t,this.recognition.continuous=!0,this.recognition.interimResults=!0,this.recognition.lang=this.state.lang,this.recognition.onresult=this.onResult,this.recognition.onend=this.onEnd,this}setLang(e){return this.setState({lang:e}),this.setup(),this}speak(){if(!e.isSupported()||!this.recognition)return this;let{speaking:t}=this.state;return t?(this.setState({force:!0}),this.recognition.stop()):(this.recognition.start(),this.setState({speaking:!0,inputValue:``})),this}},Cr=()=>z.createElement(`svg`,{height:`28`,viewBox:`0 0 24 24`,width:`28`,xmlns:`http://www.w3.org/2000/svg`},z.createElement(`path`,{d:`M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 9h10v2H7V9zm6 5H7v-2h6v2zm4-6H7V6h10v2z`})),wr=()=>z.createElement(`svg`,{height:`24`,viewBox:`0 0 24 24`,width:`24`,xmlns:`http://www.w3.org/2000/svg`},z.createElement(`path`,{d:`M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12
      13.41 17.59 19 19 17.59 13.41 12z`}),z.createElement(`path`,{d:`M0 0h24v24H0z`,fill:`none`})),Tr=({size:e=20})=>z.createElement(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:e,height:e,viewBox:`0 0 24 24`},z.createElement(`path`,{d:`M3.4 20.4 20.85 12.92a1 1 0 0 0 0-1.84L3.4 3.6a.993.993 0 0 0-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z`})),Er=({size:e=20})=>z.createElement(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:e,height:e,viewBox:`0 0 24 24`},z.createElement(`path`,{d:`M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z`})),Dr=()=>/iphone|ipod|android|ie|blackberry|fennec/i.test(navigator.userAgent),Or=e=>typeof e==`string`,kr=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`,Ar=(e=24)=>{let t=``;for(let n=0;n<e;n+=1)t+=kr.charAt(Math.floor(Math.random()*62));return t},jr=e=>{let{message:t,metadata:n={}}=e;return Or(n.speak)?n.speak:Or(t)?t:``},Mr=e=>(t,n)=>{let{lang:r,voice:i,enable:a}=e,{user:o}=t;if(!window.SpeechSynthesisUtterance||!window.speechSynthesis||o||!a)return;let s=jr(t),c=new window.SpeechSynthesisUtterance;c.text=s.replace(/{previousValue}/g,String(n)),c.lang=r,c.voice=i,window.speechSynthesis.speak(c)},Nr=[{key:`id`,types:[`string`,`number`],required:!0},{key:`user`,types:[`boolean`],required:!0},{key:`hideExtraControl`,types:[`boolean`],required:!1},{key:`trigger`,types:[`string`,`number`,`function`],required:!1},{key:`validator`,types:[`function`],required:!1},{key:`end`,types:[`boolean`],required:!1},{key:`placeholder`,types:[`string`],required:!1},{key:`inputAttributes`,types:[`object`],required:!1},{key:`metadata`,types:[`object`],required:!1}],Pr=[{key:`id`,types:[`string`,`number`],required:!0},{key:`message`,types:[`string`,`function`],required:!0},{key:`avatar`,types:[`string`],required:!1},{key:`trigger`,types:[`string`,`number`,`function`],required:!1},{key:`delay`,types:[`number`],required:!1},{key:`end`,types:[`boolean`],required:!1},{key:`placeholder`,types:[`string`],required:!1},{key:`hideInput`,types:[`boolean`],required:!1},{key:`hideExtraControl`,types:[`boolean`],required:!1},{key:`inputAttributes`,types:[`object`],required:!1},{key:`metadata`,types:[`object`],required:!1}],Fr=[{key:`id`,types:[`string`,`number`],required:!0},{key:`options`,types:[`object`],required:!0},{key:`end`,types:[`boolean`],required:!1},{key:`placeholder`,types:[`string`],required:!1},{key:`hideInput`,types:[`boolean`],required:!1},{key:`hideExtraControl`,types:[`boolean`],required:!1},{key:`inputAttributes`,types:[`object`],required:!1},{key:`metadata`,types:[`object`],required:!1}],Ir=[{key:`id`,types:[`string`,`number`],required:!0},{key:`component`,types:[`any`],required:!0},{key:`avatar`,types:[`string`],required:!1},{key:`replace`,types:[`boolean`],required:!1},{key:`waitAction`,types:[`boolean`],required:!1},{key:`asMessage`,types:[`boolean`],required:!1},{key:`trigger`,types:[`string`,`number`,`function`],required:!1},{key:`delay`,types:[`number`],required:!1},{key:`end`,types:[`boolean`],required:!1},{key:`placeholder`,types:[`string`],required:!1},{key:`hideInput`,types:[`boolean`],required:!1},{key:`hideExtraControl`,types:[`boolean`],required:!1},{key:`inputAttributes`,types:[`object`],required:!1},{key:`metadata`,types:[`object`],required:!1}],Lr=[{key:`id`,types:[`string`,`number`],required:!0},{key:`update`,types:[`string`,`number`],required:!0},{key:`trigger`,types:[`string`,`number`,`function`],required:!0},{key:`placeholder`,types:[`string`],required:!1},{key:`inputAttributes`,types:[`object`],required:!1},{key:`metadata`,types:[`object`],required:!1}],Rr={parse(e){let t=[];if(e.user)t=Nr;else if(e.message)t=Pr;else if(e.options)t=Fr;else if(e.component)t=Ir;else if(e.update)t=Lr;else throw Error(`The step ${or(e)} is invalid`);for(let n=0,r=t.length;n<r;n+=1){let{key:r,types:i,required:a}=t[n];if(!e[r]&&a)throw Error(`Key '${r}' is required in step ${or(e)}`);if(e[r]&&i[0]!==`any`&&i.indexOf(typeof e[r])<0)throw Error(`The type of '${r}' value must be ${i.join(` or `)} instead of ${typeof e[r]}`)}let n=t.map(e=>e.key);for(let t of Object.keys(e))n.indexOf(t)<0&&(console.error(`Invalid key '${t}' in step '${e.id}'`),delete e[t]);return e},checkInvalidIds(e){for(let t of Object.keys(e)){let n=e[t],r=n.trigger;if(typeof r!=`function`){if(n.options){let t=n.options.filter(e=>typeof e.trigger!=`function`).map(e=>e.trigger);for(let r=0,i=t.length;r<i;r+=1){let i=t[r];if(i&&!e[i])throw Error(`The id '${i}' triggered by option ${r+1} in step '${n.id}' does not exist`)}}else if(r&&!e[r])throw Error(`The id '${r}' triggered by step '${n.id}' does not exist`)}}}},zr=[`steps`,`botAvatar`,`botDelay`,`botName`,`customDelay`,`userAvatar`,`userDelay`],Br=e=>{let t={};return zr.forEach(n=>{t[n]=e[n]}),t},Vr=(e,t)=>zr.some(n=>e[n]!==t[n]),Hr=({botAvatar:e,botDelay:t,botName:n,customDelay:r,steps:i,userAvatar:a,userDelay:o})=>{let s={},c={delay:t,avatar:e,botName:n},l={delay:o,avatar:a,hideInput:!1,hideExtraControl:!1},u={delay:r};for(let e of i){let t={};`user`in e&&e.user?t=l:`message`in e&&e.message||`asMessage`in e&&e.asMessage?t=c:`component`in e&&e.component&&(t=u);let n={...t,...Rr.parse(e)};Array.isArray(n.options)&&(n.options=n.options.map(e=>e.value===void 0?{...e,value:e.label}:e)),s[e.id]=n}return Rr.checkInvalidIds(s),{chatSteps:s,defaultUserSettings:l}},Ur=({id:e,message:t,value:n,metadata:r})=>({id:e,message:t,value:n,metadata:r}),Wr=e=>{let t={};for(let n of e)t[n.id]=Ur(n);return t},Gr=(e,t,n)=>typeof e==`function`?e({value:t,steps:Wr(n)}):e,Kr=(e,t)=>{if(typeof e!=`function`)return e;let n=t[t.length-1];return e({previousValue:n?n.value:void 0,steps:Wr(t)})},qr=e=>({renderedSteps:e.map(Ur),steps:Wr(e),values:e.filter(e=>e.value!==void 0).map(e=>e.value)}),Jr=e=>!!(e.message||e.asMessage),Yr=(e,t)=>{if(t===0)return!0;let n=e[t],r=e[t-1];return!Jr(r)||n.user!==r.user},Xr=(e,t)=>{let{length:n}=e;if(n<=1||t+1===n)return!0;let r=e[t],i=e[t+1];return!Jr(i)||r.user!==i.user},Zr=40,Qr=500,$r=(e,t,n)=>{let r=(0,z.useRef)(!0),i=(0,z.useRef)(0),a=(0,z.useRef)(void 0),o=(0,z.useRef)(0),s=(0,z.useCallback)(()=>{let t=e.current;t&&(n&&`scrollBehavior`in document.documentElement.style?(t.scroll({top:t.scrollHeight,left:0,behavior:`smooth`}),clearTimeout(a.current),a.current=setTimeout(()=>{r.current&&(t.scrollTop=t.scrollHeight,i.current=t.scrollTop)},Qr)):(t.scrollTop=t.scrollHeight,i.current=t.scrollTop))},[e,n]);return(0,z.useEffect)(()=>{let t=e.current;if(!t)return;let n=()=>{r.current&&s()},i;typeof ResizeObserver<`u`&&(i=new ResizeObserver(n));let o=()=>{Array.from(t.children).forEach(e=>i?.observe(e))};o();let c;typeof MutationObserver<`u`&&(c=new MutationObserver(()=>{o(),n()}),c.observe(t,{childList:!0,subtree:!0}));let l=()=>{r.current&&(t.scrollTop=t.scrollHeight)};return window.addEventListener(`resize`,l),()=>{c?.disconnect(),i?.disconnect(),clearTimeout(a.current),window.removeEventListener(`resize`,l)}},[e,s]),(0,z.useEffect)(()=>{t>o.current&&(r.current=!0,s()),o.current=t},[t,s]),(0,z.useCallback)(()=>{let t=e.current;if(!t)return;let{scrollTop:n}=t;t.scrollHeight-n-t.clientHeight<=Zr?r.current=!0:n<i.current&&(r.current=!1),i.current=n},[e])},ei=typeof window<`u`?z.useLayoutEffect:z.useEffect,ti=e=>{let t=(0,z.useRef)(e);return ei(()=>{t.current=e}),t},ni={avatarStyle:{},botDelay:1e3,botName:`The bot`,bubbleOptionStyle:{},bubbleStyle:{},cache:!1,cacheName:`rsc_cache`,className:``,contentStyle:{},customStyle:{},controlStyle:{position:`absolute`,right:`0`,top:`0`},customDelay:1e3,enableMobileAutoFocus:!1,enableSmoothScroll:!1,floating:!1,floatingIcon:z.createElement(Cr,null),floatingStyle:{},footerStyle:{},headerTitle:`Chat`,height:`520px`,hideBotAvatar:!1,hideHeader:!1,hideSubmitButton:!1,hideUserAvatar:!1,inputStyle:{},placeholder:`Type the message ...`,inputAttributes:{},recognitionEnable:!1,recognitionLang:`en`,recognitionPlaceholder:`Listening ...`,speechSynthesis:{enable:!1,lang:`en`,voice:null},style:{},submitButtonStyle:{},userDelay:1e3,width:`350px`,botAvatar:`data:image/svg+xml,%3csvg version='1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e%3cpath d='M303 70a47 47 0 1 0-70 40v84h46v-84c14-8 24-23 24-40z' fill='%2393c7ef'/%3e%3cpath d='M256 23v171h23v-84a47 47 0 0 0-23-87z' fill='%235a8bb0'/%3e%3cpath fill='%2393c7ef' d='M0 240h248v124H0z'/%3e%3cpath fill='%235a8bb0' d='M264 240h248v124H264z'/%3e%3cpath fill='%2393c7ef' d='M186 365h140v124H186z'/%3e%3cpath fill='%235a8bb0' d='M256 365h70v124h-70z'/%3e%3cpath fill='%23cce9f9' d='M47 163h419v279H47z'/%3e%3cpath fill='%2393c7ef' d='M256 163h209v279H256z'/%3e%3cpath d='M194 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%233c5d76'/%3e%3cpath d='M380 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%231e2e3b'/%3e%3cpath d='M186 349a70 70 0 1 0 140 0H186z' fill='%233c5d76'/%3e%3cpath d='M256 349v70c39 0 70-31 70-70h-70z' fill='%231e2e3b'/%3e%3c/svg%3e`,userAvatar:`data:image/svg+xml,%3csvg viewBox='-208.5 21 100 100' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ccircle cx='-158.5' cy='71' fill='%23F5EEE5' r='50'/%3e%3cdefs%3e%3ccircle cx='-158.5' cy='71' id='a' r='50'/%3e%3c/defs%3e%3cclipPath id='b'%3e%3cuse overflow='visible' xlink:href='%23a'/%3e%3c/clipPath%3e%3cpath clip-path='url(%23b)' d='M-108.5 121v-14s-21.2-4.9-28-6.7c-2.5-.7-7-3.3-7-12V82h-30v6.3c0 8.7-4.5 11.3-7 12-6.8 1.9-28.1 7.3-28.1 6.7v14h100.1z' fill='%23E6C19C'/%3e%3cg clip-path='url(%23b)'%3e%3cdefs%3e%3cpath d='M-108.5 121v-14s-21.2-4.9-28-6.7c-2.5-.7-7-3.3-7-12V82h-30v6.3c0 8.7-4.5 11.3-7 12-6.8 1.9-28.1 7.3-28.1 6.7v14h100.1z' id='c'/%3e%3c/defs%3e%3cclipPath id='d'%3e%3cuse overflow='visible' xlink:href='%23c'/%3e%3c/clipPath%3e%3cpath clip-path='url(%23d)' d='M-158.5 100.1c12.7 0 23-18.6 23-34.4 0-16.2-10.3-24.7-23-24.7s-23 8.5-23 24.7c0 15.8 10.3 34.4 23 34.4z' fill='%23D4B08C'/%3e%3c/g%3e%3cpath d='M-158.5 96c12.7 0 23-16.3 23-31 0-15.1-10.3-23-23-23s-23 7.9-23 23c0 14.7 10.3 31 23 31z' fill='%23F2CEA5'/%3e%3c/svg%3e`},ri=e=>{let t={...ni};return Object.entries(e).forEach(([e,n])=>{n!==void 0&&(t[e]=n)}),t},ii={renderedSteps:[],previousSteps:[],currentStep:{id:``},previousStep:{},disabled:!0,inputValue:``,inputInvalid:!1,speaking:!1},ai=2e3,oi=(e,t,n)=>e.map(e=>e===t?n:e),si=e=>{let t=ri(e),n=ti(t),r=(0,z.useRef)(null),i=(0,z.useRef)(null),a=(0,z.useRef)(null),o=(0,z.useRef)(null),s=(0,z.useRef)(void 0),[c,l]=(0,z.useState)(ii),u=(0,z.useRef)(c),d=(0,z.useCallback)(e=>{u.current={...u.current,...e},l(u.current)},[]),[f]=(0,z.useState)(()=>t.recognitionEnable&&Sr.isSupported()),p=t.toggleFloating!==void 0&&t.opened!==void 0,[m,h]=(0,z.useState)(()=>!!t.opened||!t.floating);p&&t.opened!==m&&h(!!t.opened);let g=p?!!t.opened:m,_=ti(g),[v,y]=(0,z.useState)(g);g&&!v&&y(!0);let[b,x]=(0,z.useState)(0),S=(0,z.useCallback)(()=>x(e=>e+1),[]);(0,z.useEffect)(()=>{let{enableMobileAutoFocus:e}=n.current;b>0&&(e||!Dr())&&i.current?.focus()},[b,n]);let ee=$r(r,c.renderedSteps.length,t.enableSmoothScroll),C=(0,z.useCallback)(()=>{let e=Br(n.current),t=o.current;if(t&&!Vr(t.stepsProps,e))return t;try{o.current={...Hr(e),stepsProps:e}}catch(n){if(!t)throw n;console.error(n),o.current={...t,stepsProps:e}}return o.current},[n]),w=(0,z.useCallback)((e,t)=>Mr(n.current.speechSynthesis)(e,t),[n]),T=(0,z.useCallback)(e=>{let{cache:t,cacheName:r,handleEnd:i}=n.current,{defaultUserSettings:a,chatSteps:o}=C(),{currentStep:s,previousStep:c,previousSteps:l,renderedSteps:f}=u.current,p=s.end,m=e=>{let t={...s,...e};f=oi(f,s,t),l=oi(l,s,t),s=t};if(e?.value!==void 0&&m({value:e.value}),e?.hideInput&&m({hideInput:e.hideInput}),e?.hideExtraControl&&m({hideExtraControl:e.hideExtraControl}),e?.trigger&&m({trigger:Gr(e.trigger,e.value,l)}),p)i&&i(qr(l)),d({currentStep:s,previousSteps:l,renderedSteps:f});else if(s.options&&e){let t=s.options.find(t=>t.value===e.value);if(!t)return;let n=Gr(t.trigger,s.value,l),{options:r,...i}=s,o={...i,...t,...a,user:!0,message:t.label,trigger:n};f=[...f.slice(0,-1),o],l=[...l.slice(0,-1),o],s=o,d({currentStep:s,renderedSteps:f,previousSteps:l})}else if(s.trigger){s.replace&&(f=f.slice(0,-1));let e={...o[Gr(s.trigger,s.value,l)]};if(e.message)e.message=Kr(e.message,l);else if(e.update){let t=e;e={...o[t.update]},e.options?e.options=e.options.map(e=>({...e,trigger:t.trigger})):e.trigger=t.trigger}e.key=Ar(),c=s,s=e,e.user?(d({renderedSteps:f,currentStep:s,previousStep:c,disabled:!1}),S()):(f=[...f,e],l=[...l,e],d({renderedSteps:f,previousSteps:l,currentStep:s,previousStep:c}))}if(t){let e={currentStep:s,previousStep:c,previousSteps:l,renderedSteps:f};setTimeout(()=>lr(r,e),300)}},[C,n,S,d]),E=(0,z.useCallback)(()=>{let{currentStep:e,inputValue:t}=u.current,n=!e.validator||e.validator(t);return typeof n==`boolean`&&n?!1:(d({inputValue:n.toString(),inputInvalid:!0,disabled:!0}),s.current=setTimeout(()=>{d({inputValue:t,inputInvalid:!1,disabled:!1}),S()},ai),!0)},[S,d]),D=(0,z.useCallback)(()=>{let{currentStep:e,inputValue:t,previousSteps:n,renderedSteps:r}=u.current,{defaultUserSettings:a}=C();if(e.validator&&E())return;let o={...a,...e,message:t,value:t};d({currentStep:o,renderedSteps:[...r,o],previousSteps:[...n,o],disabled:!0,inputValue:``}),i.current?.blur()},[E,C,d]);(0,z.useEffect)(()=>{let{cache:e,cacheName:t,steps:r}=n.current,i=Br(n.current),a=Hr(i);o.current={...a,stepsProps:i};let s={...a.chatSteps[r[0].id],key:Ar()};typeof s.message==`function`&&(s.message=s.message({previousValue:void 0,steps:{}}));let c=!1,l=cr({cacheName:t,cache:e,firstStep:s,steps:a.chatSteps},()=>{c=!0});d({...l,disabled:!c}),c&&_.current&&S()},[_,n,S,d]),(0,z.useEffect)(()=>{f&&(a.current=new Sr(e=>d({inputValue:e}),()=>{d({speaking:!1}),u.current.inputValue&&D()},()=>d({speaking:!1}),n.current.recognitionLang))},[n,f,d,D]),(0,z.useEffect)(()=>()=>clearTimeout(s.current),[]);let O=e=>{t.toggleFloating?t.toggleFloating({opened:e}):h(e)},k=(e,t)=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),O(t))},A=e=>{e.key===`Enter`&&!e.nativeEvent.isComposing&&D()},j=e=>{d({inputValue:e.target.value})},te=()=>{let{inputValue:e,speaking:t}=u.current;if((!e||t)&&f){a.current?.speak(),t||d({speaking:!0});return}D()},{avatarStyle:M,bubbleOptionStyle:N,bubbleStyle:ne,className:re,contentStyle:P,controlStyle:F,customStyle:ie,extraControl:I,floating:L,floatingIcon:ae,floatingStyle:oe,footerStyle:se,headerComponent:ce,headerTitle:le,height:ue,hideBotAvatar:de,hideHeader:fe,hideSubmitButton:pe,hideUserAvatar:me,inputAttributes:he,inputStyle:ge,placeholder:_e,recognitionPlaceholder:ve,style:ye,submitButtonStyle:be,width:xe}=t,{currentStep:R,disabled:Se,inputInvalid:B,inputValue:Ce,renderedSteps:V,speaking:H}=c,we=Wr(c.previousSteps),U=(e,t)=>{let{options:n,component:r,asMessage:i}=e,a=t>0?V[t-1]:{},o=e.key??`step-${t}`;return r&&!i?z.createElement(Dn,{key:o,speak:w,step:e,steps:we,style:ie,hideBotAvatar:de,previousStep:a,previousValue:a.value,triggerNextStep:T}):n?z.createElement(Fn,{key:o,step:e,triggerNextStep:T,bubbleOptionStyle:N,hideBotAvatar:de}):z.createElement(Kn,{key:o,step:e,steps:we,speak:w,previousStep:a,previousValue:a.value,triggerNextStep:T,avatarStyle:M,bubbleStyle:ne,hideBotAvatar:de,hideUserAvatar:me,isFirst:Yr(V,t),isLast:Xr(V,t)})},Te=ce||z.createElement(fr,{className:`rsc-header`},z.createElement(pr,{className:`rsc-header-title`},le),L&&z.createElement(mr,{className:`rsc-header-close-button`,role:`button`,tabIndex:0,"aria-label":`Close chat`,onClick:()=>O(!1),onKeyDown:e=>k(e,!1)},z.createElement(wr,null))),Ee=I&&(0,z.cloneElement)(I,typeof I.type==`string`?{disabled:Se}:{disabled:Se,speaking:H,invalid:B}),De=(!Ce||H)&&f,W=`Send message`;De&&(W=H?`Stop voice input`:`Start voice input`);let G=H?ve:R.placeholder||_e,Oe=R.inputAttributes||he;return z.createElement(`div`,{className:`rsc ${re}`},L&&z.createElement(hr,{className:`rsc-float-button`,style:oe,$opened:g,role:`button`,tabIndex:g?-1:0,"aria-label":`Open chat`,"aria-hidden":g,onClick:()=>O(!0),onKeyDown:e=>k(e,!0)},typeof ae==`string`?z.createElement(gr,{src:ae,alt:``}):ae),z.createElement(ur,{className:`rsc-container`,$floating:L,$floatingStyle:oe,$opened:g,style:ye,$width:xe,$height:ue},!fe&&Te,z.createElement(dr,{className:`rsc-content`,ref:r,onScroll:ee,$floating:L,style:P,$height:ue,$hideInput:R.hideInput},v&&V.map(U)),z.createElement(_r,{className:`rsc-footer`,style:se},!R.hideInput&&z.createElement(vr,{type:`text`,"aria-label":G||`Type the message`,style:ge,ref:i,className:`rsc-input`,placeholder:B?``:G,onKeyDown:A,onChange:j,value:Ce,$floating:L,$invalid:B,disabled:Se,$hasButton:!pe,...Oe}),z.createElement(`div`,{style:F,className:`rsc-controls`},!R.hideInput&&!R.hideExtraControl&&Ee,!R.hideInput&&!pe&&z.createElement(br,{type:`button`,"aria-label":W,className:`rsc-submit-button`,style:be,onClick:te,$invalid:B,disabled:Se,$speaking:H},De?z.createElement(Er,null):z.createElement(Tr,null))))))};export{Sn as n,en as r,si as t};