import{bH as xe,bM as pe,D as j,r as V,a3 as $,aS as ce,aN as L,P as T,bN as Le,bO as de,bP as ee,bQ as te,bR as me,g as C,y as K,bS as ye,ac as M,a6 as ge,an as ue,bT as Pe,ak as Ce,bU as Be,ay as fe,n as I,aP as De,W as z,a0 as _e,z as Ne,bV as Re,ai as We,bW as He,bX as Ie,Y as Ve,aQ as $e,af as qe,G as ze,H as je,ag as Ye,$ as Ge,a9 as Qe,aa as Ue,aR as Xe,bY as Ze,J as Je,a as _,bZ as Ke,x as et,am as tt,v as nt,F as ot,bd as at,b_ as rt}from"./main-6c5357b5.js";import{B as ne,g as he,n as it,a as lt,s as st}from"./easing-9f15041e.js";import{m as ct,M as ut}from"./VImg-9d008c95.js";const U=new WeakMap;function ft(e,n){Object.keys(n).forEach(t=>{if(xe(t)){const a=pe(t),r=U.get(e);if(n[t]==null)r==null||r.forEach(o=>{const[i,l]=o;i===a&&(e.removeEventListener(a,l),r.delete(o))});else if(!r||![...r].some(o=>o[0]===a&&o[1]===n[t])){e.addEventListener(a,n[t]);const o=r||new Set;o.add([a,n[t]]),U.has(e)||U.set(e,o)}}else n[t]==null?e.removeAttribute(t):e.setAttribute(t,n[t])})}function vt(e,n){Object.keys(n).forEach(t=>{if(xe(t)){const a=pe(t),r=U.get(e);r==null||r.forEach(o=>{const[i,l]=o;i===a&&(e.removeEventListener(a,l),r.delete(o))})}else e.removeAttribute(t)})}function Ae(e){if(typeof e.getRootNode!="function"){for(;e.parentNode;)e=e.parentNode;return e!==document?null:document}const n=e.getRootNode();return n!==document&&n.getRootNode({composed:!0})!==document?null:n}function dt(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;for(;e;){if(n?mt(e):ve(e))return e;e=e.parentElement}return document.scrollingElement}function Z(e,n){const t=[];if(n&&e&&!n.contains(e))return t;for(;e&&(ve(e)&&t.push(e),e!==n);)e=e.parentElement;return t}function ve(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const n=window.getComputedStyle(e);return n.overflowY==="scroll"||n.overflowY==="auto"&&e.scrollHeight>e.clientHeight}function mt(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const n=window.getComputedStyle(e);return["scroll","auto"].includes(n.overflowY)}function yt(e){for(;e;){if(window.getComputedStyle(e).position==="fixed")return!0;e=e.offsetParent}return!1}const oe=Symbol("Forwarded refs");function ae(e,n){let t=e;for(;t;){const a=Reflect.getOwnPropertyDescriptor(t,n);if(a)return a;t=Object.getPrototypeOf(t)}}function Qt(e){for(var n=arguments.length,t=new Array(n>1?n-1:0),a=1;a<n;a++)t[a-1]=arguments[a];return e[oe]=t,new Proxy(e,{get(r,o){if(Reflect.has(r,o))return Reflect.get(r,o);if(!(typeof o=="symbol"||o.startsWith("$")||o.startsWith("__"))){for(const i of t)if(i.value&&Reflect.has(i.value,o)){const l=Reflect.get(i.value,o);return typeof l=="function"?l.bind(i.value):l}}},has(r,o){if(Reflect.has(r,o))return!0;if(typeof o=="symbol"||o.startsWith("$")||o.startsWith("__"))return!1;for(const i of t)if(i.value&&Reflect.has(i.value,o))return!0;return!1},set(r,o,i){if(Reflect.has(r,o))return Reflect.set(r,o,i);if(typeof o=="symbol"||o.startsWith("$")||o.startsWith("__"))return!1;for(const l of t)if(l.value&&Reflect.has(l.value,o))return Reflect.set(l.value,o,i);return!1},getOwnPropertyDescriptor(r,o){var l;const i=Reflect.getOwnPropertyDescriptor(r,o);if(i)return i;if(!(typeof o=="symbol"||o.startsWith("$")||o.startsWith("__"))){for(const c of t){if(!c.value)continue;const f=ae(c.value,o)??("_"in c.value?ae((l=c.value._)==null?void 0:l.setupState,o):void 0);if(f)return f}for(const c of t){const f=c.value&&c.value[oe];if(!f)continue;const u=f.slice();for(;u.length;){const d=u.shift(),g=ae(d.value,o);if(g)return g;const x=d.value&&d.value[oe];x&&u.push(...x)}}}}})}function re(e,n){return{x:e.x+n.x,y:e.y+n.y}}function gt(e,n){return{x:e.x-n.x,y:e.y-n.y}}function be(e,n){if(e.side==="top"||e.side==="bottom"){const{side:t,align:a}=e,r=a==="left"?0:a==="center"?n.width/2:a==="right"?n.width:a,o=t==="top"?0:t==="bottom"?n.height:t;return re({x:r,y:o},n)}else if(e.side==="left"||e.side==="right"){const{side:t,align:a}=e,r=t==="left"?0:t==="right"?n.width:t,o=a==="top"?0:a==="center"?n.height/2:a==="bottom"?n.height:a;return re({x:r,y:o},n)}return re({x:n.width/2,y:n.height/2},n)}const ke={static:wt,connected:St},ht=j({locationStrategy:{type:[String,Function],default:"static",validator:e=>typeof e=="function"||e in ke},location:{type:String,default:"bottom"},origin:{type:String,default:"auto"},offset:[Number,String,Array]},"VOverlay-location-strategies");function bt(e,n){const t=V({}),a=V();$&&(ce(()=>!!(n.isActive.value&&e.locationStrategy),o=>{var i,l;T(()=>e.locationStrategy,o),L(()=>{a.value=void 0}),typeof e.locationStrategy=="function"?a.value=(i=e.locationStrategy(n,e,t))==null?void 0:i.updateLocation:a.value=(l=ke[e.locationStrategy](n,e,t))==null?void 0:l.updateLocation}),window.addEventListener("resize",r,{passive:!0}),L(()=>{window.removeEventListener("resize",r),a.value=void 0}));function r(o){var i;(i=a.value)==null||i.call(a,o)}return{contentStyles:t,updateLocation:a}}function wt(){}function Et(e,n){n?e.style.removeProperty("left"):e.style.removeProperty("right");const t=it(e);return n?t.x+=parseFloat(e.style.right||0):t.x-=parseFloat(e.style.left||0),t.y-=parseFloat(e.style.top||0),t}function St(e,n,t){yt(e.activatorEl.value)&&Object.assign(t.value,{position:"fixed",top:0,[e.isRtl.value?"right":"left"]:0});const{preferredAnchor:r,preferredOrigin:o}=Le(()=>{const m=de(n.location,e.isRtl.value),v=n.origin==="overlap"?m:n.origin==="auto"?ee(m):de(n.origin,e.isRtl.value);return m.side===v.side&&m.align===te(v).align?{preferredAnchor:me(m),preferredOrigin:me(v)}:{preferredAnchor:m,preferredOrigin:v}}),[i,l,c,f]=["minWidth","minHeight","maxWidth","maxHeight"].map(m=>C(()=>{const v=parseFloat(n[m]);return isNaN(v)?1/0:v})),u=C(()=>{if(Array.isArray(n.offset))return n.offset;if(typeof n.offset=="string"){const m=n.offset.split(" ").map(parseFloat);return m.length<2&&m.push(0),m}return typeof n.offset=="number"?[n.offset,0]:[0,0]});let d=!1;const g=new ResizeObserver(()=>{d&&x()});T([e.activatorEl,e.contentEl],(m,v)=>{let[P,p]=m,[w,s]=v;w&&g.unobserve(w),P&&g.observe(P),s&&g.unobserve(s),p&&g.observe(p)},{immediate:!0}),L(()=>{g.disconnect()});function x(){if(d=!1,requestAnimationFrame(()=>{requestAnimationFrame(()=>d=!0)}),!e.activatorEl.value||!e.contentEl.value)return;const m=e.activatorEl.value.getBoundingClientRect(),v=Et(e.contentEl.value,e.isRtl.value),P=Z(e.contentEl.value),p=12;P.length||(P.push(document.documentElement),e.contentEl.value.style.top&&e.contentEl.value.style.left||(v.x-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x")||0),v.y-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y")||0)));const w=P.reduce((S,E)=>{const y=E.getBoundingClientRect(),b=new ne({x:E===document.documentElement?0:y.x,y:E===document.documentElement?0:y.y,width:E.clientWidth,height:E.clientHeight});return S?new ne({x:Math.max(S.left,b.left),y:Math.max(S.top,b.top),width:Math.min(S.right,b.right)-Math.max(S.left,b.left),height:Math.min(S.bottom,b.bottom)-Math.max(S.top,b.top)}):b},void 0);w.x+=p,w.y+=p,w.width-=p*2,w.height-=p*2;let s={anchor:r.value,origin:o.value};function A(S){const E=new ne(v),y=be(S.anchor,m),b=be(S.origin,E);let{x:k,y:F}=gt(y,b);switch(S.anchor.side){case"top":F-=u.value[0];break;case"bottom":F+=u.value[0];break;case"left":k-=u.value[0];break;case"right":k+=u.value[0];break}switch(S.anchor.align){case"top":F-=u.value[1];break;case"bottom":F+=u.value[1];break;case"left":k-=u.value[1];break;case"right":k+=u.value[1];break}return E.x+=k,E.y+=F,E.width=Math.min(E.width,c.value),E.height=Math.min(E.height,f.value),{overflows:he(E,w),x:k,y:F}}let D=0,N=0;const W={x:0,y:0},Y={x:!1,y:!1};let G=-1;for(;!(G++>10);){const{x:S,y:E,overflows:y}=A(s);D+=S,N+=E,v.x+=S,v.y+=E;{const b=ye(s.anchor),k=y.x.before||y.x.after,F=y.y.before||y.y.after;let q=!1;if(["x","y"].forEach(O=>{if(O==="x"&&k&&!Y.x||O==="y"&&F&&!Y.y){const h={anchor:{...s.anchor},origin:{...s.origin}},R=O==="x"?b==="y"?te:ee:b==="y"?ee:te;h.anchor=R(h.anchor),h.origin=R(h.origin);const{overflows:H}=A(h);(H[O].before<=y[O].before&&H[O].after<=y[O].after||H[O].before+H[O].after<(y[O].before+y[O].after)/2)&&(s=h,q=Y[O]=!0)}}),q)continue}y.x.before&&(D+=y.x.before,v.x+=y.x.before),y.x.after&&(D-=y.x.after,v.x-=y.x.after),y.y.before&&(N+=y.y.before,v.y+=y.y.before),y.y.after&&(N-=y.y.after,v.y-=y.y.after);{const b=he(v,w);W.x=w.width-b.x.before-b.x.after,W.y=w.height-b.y.before-b.y.after,D+=b.x.before,v.x+=b.x.before,N+=b.y.before,v.y+=b.y.before}break}const B=ye(s.anchor);return Object.assign(t.value,{"--v-overlay-anchor-origin":`${s.anchor.side} ${s.anchor.align}`,transformOrigin:`${s.origin.side} ${s.origin.align}`,top:M(ie(N)),left:e.isRtl.value?void 0:M(ie(D)),right:e.isRtl.value?M(ie(-D)):void 0,minWidth:M(B==="y"?Math.min(i.value,m.width):i.value),maxWidth:M(we(ge(W.x,i.value===1/0?0:i.value,c.value))),maxHeight:M(we(ge(W.y,l.value===1/0?0:l.value,f.value)))}),{available:W,contentBox:v}}return T(()=>[r.value,o.value,n.offset,n.minWidth,n.minHeight,n.maxWidth,n.maxHeight],()=>x()),K(()=>{const m=x();if(!m)return;const{available:v,contentBox:P}=m;P.height>v.y&&requestAnimationFrame(()=>{x(),requestAnimationFrame(()=>{x()})})}),{updateLocation:x}}function ie(e){return Math.round(e*devicePixelRatio)/devicePixelRatio}function we(e){return Math.ceil(e*devicePixelRatio)/devicePixelRatio}let le=!0;const J=[];function Ot(e){!le||J.length?(J.push(e),se()):(le=!1,e(),se())}let Ee=-1;function se(){cancelAnimationFrame(Ee),Ee=requestAnimationFrame(()=>{const e=J.shift();e&&e(),J.length?se():le=!0})}const X={none:null,close:Pt,block:Ct,reposition:Rt},xt=j({scrollStrategy:{type:[String,Function],default:"block",validator:e=>typeof e=="function"||e in X}},"VOverlay-scroll-strategies");function pt(e,n){if(!$)return;let t;ue(async()=>{t==null||t.stop(),n.isActive.value&&e.scrollStrategy&&(t=Pe(),await K(),t.active&&t.run(()=>{var a;typeof e.scrollStrategy=="function"?e.scrollStrategy(n,e,t):(a=X[e.scrollStrategy])==null||a.call(X,n,e,t)}))}),L(()=>{t==null||t.stop()})}function Pt(e){function n(t){e.isActive.value=!1}Te(e.activatorEl.value??e.contentEl.value,n)}function Ct(e,n){var i;const t=(i=e.root.value)==null?void 0:i.offsetParent,a=[...new Set([...Z(e.activatorEl.value,n.contained?t:void 0),...Z(e.contentEl.value,n.contained?t:void 0)])].filter(l=>!l.classList.contains("v-overlay-scroll-blocked")),r=window.innerWidth-document.documentElement.offsetWidth,o=(l=>ve(l)&&l)(t||document.documentElement);o&&e.root.value.classList.add("v-overlay--scroll-blocked"),a.forEach((l,c)=>{l.style.setProperty("--v-body-scroll-x",M(-l.scrollLeft)),l.style.setProperty("--v-body-scroll-y",M(-l.scrollTop)),l!==document.documentElement&&l.style.setProperty("--v-scrollbar-offset",M(r)),l.classList.add("v-overlay-scroll-blocked")}),L(()=>{a.forEach((l,c)=>{const f=parseFloat(l.style.getPropertyValue("--v-body-scroll-x")),u=parseFloat(l.style.getPropertyValue("--v-body-scroll-y"));l.style.removeProperty("--v-body-scroll-x"),l.style.removeProperty("--v-body-scroll-y"),l.style.removeProperty("--v-scrollbar-offset"),l.classList.remove("v-overlay-scroll-blocked"),l.scrollLeft=-f,l.scrollTop=-u}),o&&e.root.value.classList.remove("v-overlay--scroll-blocked")})}function Rt(e,n,t){let a=!1,r=-1,o=-1;function i(l){Ot(()=>{var u,d;const c=performance.now();(d=(u=e.updateLocation).value)==null||d.call(u,l),a=(performance.now()-c)/(1e3/60)>2})}o=(typeof requestIdleCallback>"u"?l=>l():requestIdleCallback)(()=>{t.run(()=>{Te(e.activatorEl.value??e.contentEl.value,l=>{a?(cancelAnimationFrame(r),r=requestAnimationFrame(()=>{r=requestAnimationFrame(()=>{i(l)})})):i(l)})})}),L(()=>{typeof cancelIdleCallback<"u"&&cancelIdleCallback(o),cancelAnimationFrame(r)})}function Te(e,n){const t=[document,...Z(e)];t.forEach(a=>{a.addEventListener("scroll",n,{passive:!0})}),L(()=>{t.forEach(a=>{a.removeEventListener("scroll",n)})})}const At=Symbol.for("vuetify:v-menu"),kt=j({closeDelay:[Number,String],openDelay:[Number,String]},"delay");function Tt(e,n){const t={},a=r=>()=>{if(!$)return Promise.resolve(!0);const o=r==="openDelay";return t.closeDelay&&window.clearTimeout(t.closeDelay),delete t.closeDelay,t.openDelay&&window.clearTimeout(t.openDelay),delete t.openDelay,new Promise(i=>{const l=parseInt(e[r]??0,10);t[r]=window.setTimeout(()=>{n==null||n(o),i(o)},l)})};return{runCloseDelay:a("closeDelay"),runOpenDelay:a("openDelay")}}const Ft=j({activator:[String,Object],activatorProps:{type:Object,default:()=>({})},openOnClick:{type:Boolean,default:void 0},openOnHover:Boolean,openOnFocus:{type:Boolean,default:void 0},closeOnContentClick:Boolean,...kt()},"VOverlay-activator");function Mt(e,n){let{isActive:t,isTop:a}=n;const r=V();let o=!1,i=!1,l=!0;const c=C(()=>e.openOnFocus||e.openOnFocus==null&&e.openOnHover),f=C(()=>e.openOnClick||e.openOnClick==null&&!e.openOnHover&&!c.value),{runOpenDelay:u,runCloseDelay:d}=Tt(e,s=>{s===(e.openOnHover&&o||c.value&&i)&&!(e.openOnHover&&t.value&&!a.value)&&(t.value!==s&&(l=!0),t.value=s)}),g={onClick:s=>{s.stopPropagation(),r.value=s.currentTarget||s.target,t.value=!t.value},onMouseenter:s=>{var A;(A=s.sourceCapabilities)!=null&&A.firesTouchEvents||(o=!0,r.value=s.currentTarget||s.target,u())},onMouseleave:s=>{o=!1,d()},onFocus:s=>{De(s.target,":focus-visible")!==!1&&(i=!0,s.stopPropagation(),r.value=s.currentTarget||s.target,u())},onBlur:s=>{i=!1,s.stopPropagation(),d()}},x=C(()=>{const s={};return f.value&&(s.onClick=g.onClick),e.openOnHover&&(s.onMouseenter=g.onMouseenter,s.onMouseleave=g.onMouseleave),c.value&&(s.onFocus=g.onFocus,s.onBlur=g.onBlur),s}),m=C(()=>{const s={};if(e.openOnHover&&(s.onMouseenter=()=>{o=!0,u()},s.onMouseleave=()=>{o=!1,d()}),c.value&&(s.onFocusin=()=>{i=!0,u()},s.onFocusout=()=>{i=!1,d()}),e.closeOnContentClick){const A=Ce(At,null);s.onClick=()=>{t.value=!1,A==null||A.closeParents()}}return s}),v=C(()=>{const s={};return e.openOnHover&&(s.onMouseenter=()=>{l&&(o=!0,l=!1,u())},s.onMouseleave=()=>{o=!1,d()}),s});T(a,s=>{s&&(e.openOnHover&&!o&&(!c.value||!i)||c.value&&!i&&(!e.openOnHover||!o))&&(t.value=!1)});const P=V();ue(()=>{P.value&&K(()=>{r.value=Be(P.value)})});const p=fe("useActivator");let w;return T(()=>!!e.activator,s=>{s&&$?(w=Pe(),w.run(()=>{Lt(e,p,{activatorEl:r,activatorEvents:x})})):w&&w.stop()},{flush:"post",immediate:!0}),L(()=>{w==null||w.stop()}),{activatorEl:r,activatorRef:P,activatorEvents:x,contentEvents:m,scrimEvents:v}}function Lt(e,n,t){let{activatorEl:a,activatorEvents:r}=t;T(()=>e.activator,(c,f)=>{if(f&&c!==f){const u=l(f);u&&i(u)}c&&K(()=>o())},{immediate:!0}),T(()=>e.activatorProps,()=>{o()}),L(()=>{i()});function o(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:l(),f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;c&&ft(c,I(r.value,f))}function i(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:l(),f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;c&&vt(c,I(r.value,f))}function l(){var u,d;let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e.activator,f;if(c)if(c==="parent"){let g=(d=(u=n==null?void 0:n.proxy)==null?void 0:u.$el)==null?void 0:d.parentNode;for(;g!=null&&g.hasAttribute("data-no-activator");)g=g.parentNode;f=g}else typeof c=="string"?f=document.querySelector(c):"$el"in c?f=c.$el:f=c;return a.value=(f==null?void 0:f.nodeType)===Node.ELEMENT_NODE?f:null,a.value}}function Bt(){if(!$)return z(!1);const{ssr:e}=_e();if(e){const n=z(!1);return Ne(()=>{n.value=!0}),n}else return z(!0)}const Dt=j({eager:Boolean},"lazy");function _t(e,n){const t=z(!1),a=C(()=>t.value||e.eager||n.value);T(n,()=>t.value=!0);function r(){e.eager||(t.value=!1)}return{isBooted:t,hasContent:a,onAfterLeave:r}}function Nt(){const n=fe("useScopeId").vnode.scopeId;return{scopeId:n?{[n]:""}:void 0}}const Se=Symbol.for("vuetify:stack"),Q=Re([]);function Wt(e,n,t){const a=fe("useStack"),r=!t,o=Ce(Se,void 0),i=Re({activeChildren:new Set});We(Se,i);const l=z(+n.value);ce(e,()=>{var d;const u=(d=Q.at(-1))==null?void 0:d[1];l.value=u?u+10:+n.value,r&&Q.push([a.uid,l.value]),o==null||o.activeChildren.add(a.uid),L(()=>{if(r){const g=Ie(Q).findIndex(x=>x[0]===a.uid);Q.splice(g,1)}o==null||o.activeChildren.delete(a.uid)})});const c=z(!0);r&&ue(()=>{var d;const u=((d=Q.at(-1))==null?void 0:d[0])===a.uid;setTimeout(()=>c.value=u)});const f=C(()=>!i.activeChildren.size);return{globalTop:He(c),localTop:f,stackStyles:C(()=>({zIndex:l.value}))}}function Ht(e){return{teleportTarget:C(()=>{const t=e.value;if(t===!0||!$)return;const a=t===!1?document.body:typeof t=="string"?document.querySelector(t):t;if(a==null)return;let r=a.querySelector(":scope > .v-overlay-container");return r||(r=document.createElement("div"),r.className="v-overlay-container",a.appendChild(r)),r})}}function It(){return!0}function Fe(e,n,t){if(!e||Me(e,t)===!1)return!1;const a=Ae(n);if(typeof ShadowRoot<"u"&&a instanceof ShadowRoot&&a.host===e.target)return!1;const r=(typeof t.value=="object"&&t.value.include||(()=>[]))();return r.push(n),!r.some(o=>o==null?void 0:o.contains(e.target))}function Me(e,n){return(typeof n.value=="object"&&n.value.closeConditional||It)(e)}function Vt(e,n,t){const a=typeof t.value=="function"?t.value:t.value.handler;n._clickOutside.lastMousedownWasOutside&&Fe(e,n,t)&&setTimeout(()=>{Me(e,t)&&a&&a(e)},0)}function Oe(e,n){const t=Ae(e);n(document),typeof ShadowRoot<"u"&&t instanceof ShadowRoot&&n(t)}const $t={mounted(e,n){const t=r=>Vt(r,e,n),a=r=>{e._clickOutside.lastMousedownWasOutside=Fe(r,e,n)};Oe(e,r=>{r.addEventListener("click",t,!0),r.addEventListener("mousedown",a,!0)}),e._clickOutside||(e._clickOutside={lastMousedownWasOutside:!1}),e._clickOutside[n.instance.$.uid]={onClick:t,onMousedown:a}},unmounted(e,n){e._clickOutside&&(Oe(e,t=>{var o;if(!t||!((o=e._clickOutside)!=null&&o[n.instance.$.uid]))return;const{onClick:a,onMousedown:r}=e._clickOutside[n.instance.$.uid];t.removeEventListener("click",a,!0),t.removeEventListener("mousedown",r,!0)}),delete e._clickOutside[n.instance.$.uid])}};function qt(e){const{modelValue:n,color:t,...a}=e;return _(at,{name:"fade-transition",appear:!0},{default:()=>[e.modelValue&&_("div",I({class:["v-overlay__scrim",e.color.backgroundColorClasses.value],style:e.color.backgroundColorStyles.value},a),null)]})}const zt=j({absolute:Boolean,attach:[Boolean,String,Object],closeOnBack:{type:Boolean,default:!0},contained:Boolean,contentClass:null,contentProps:null,disabled:Boolean,noClickAnimation:Boolean,modelValue:Boolean,persistent:Boolean,scrim:{type:[Boolean,String],default:!0},zIndex:{type:[Number,String],default:2e3},...Ft(),...Ve(),...$e(),...Dt(),...ht(),...xt(),...qe(),...ct()},"VOverlay"),Ut=ze()({name:"VOverlay",directives:{ClickOutside:$t},inheritAttrs:!1,props:{_disableGlobalStack:Boolean,...zt()},emits:{"click:outside":e=>!0,"update:modelValue":e=>!0,afterLeave:()=>!0},setup(e,n){let{slots:t,attrs:a,emit:r}=n;const o=je(e,"modelValue"),i=C({get:()=>o.value,set:h=>{h&&e.disabled||(o.value=h)}}),{teleportTarget:l}=Ht(C(()=>e.attach||e.contained)),{themeClasses:c}=Ye(e),{rtlClasses:f,isRtl:u}=Ge(),{hasContent:d,onAfterLeave:g}=_t(e,i),x=Qe(C(()=>typeof e.scrim=="string"?e.scrim:null)),{globalTop:m,localTop:v,stackStyles:P}=Wt(i,Ue(e,"zIndex"),e._disableGlobalStack),{activatorEl:p,activatorRef:w,activatorEvents:s,contentEvents:A,scrimEvents:D}=Mt(e,{isActive:i,isTop:v}),{dimensionStyles:N}=Xe(e),W=Bt(),{scopeId:Y}=Nt();T(()=>e.disabled,h=>{h&&(i.value=!1)});const G=V(),B=V(),{contentStyles:S,updateLocation:E}=bt(e,{isRtl:u,contentEl:B,activatorEl:p,isActive:i});pt(e,{root:G,contentEl:B,activatorEl:p,isActive:i,updateLocation:E});function y(h){r("click:outside",h),e.persistent?O():i.value=!1}function b(){return i.value&&m.value}$&&T(i,h=>{h?window.addEventListener("keydown",k):window.removeEventListener("keydown",k)},{immediate:!0});function k(h){var R,H;h.key==="Escape"&&m.value&&(e.persistent?O():(i.value=!1,(R=B.value)!=null&&R.contains(document.activeElement)&&((H=p.value)==null||H.focus())))}const F=Ze();ce(()=>e.closeOnBack,()=>{rt(F,h=>{m.value&&i.value?(h(!1),e.persistent?O():i.value=!1):h()})});const q=V();T(()=>i.value&&(e.absolute||e.contained)&&l.value==null,h=>{if(h){const R=dt(G.value);R&&R!==document.scrollingElement&&(q.value=R.scrollTop)}});function O(){e.noClickAnimation||B.value&&lt(B.value,[{transformOrigin:"center"},{transform:"scale(1.03)"},{transformOrigin:"center"}],{duration:150,easing:st})}return Je(()=>{var h;return _(ot,null,[(h=t.activator)==null?void 0:h.call(t,{isActive:i.value,props:I({ref:w},s.value,e.activatorProps)}),W.value&&d.value&&_(Ke,{disabled:!l.value,to:l.value},{default:()=>[_("div",I({class:["v-overlay",{"v-overlay--absolute":e.absolute||e.contained,"v-overlay--active":i.value,"v-overlay--contained":e.contained},c.value,f.value,e.class],style:[P.value,{top:M(q.value)},e.style],ref:G},Y,a),[_(qt,I({color:x,modelValue:i.value&&!!e.scrim},D.value),null),_(ut,{appear:!0,persisted:!0,transition:e.transition,target:p.value,onAfterLeave:()=>{g(),r("afterLeave")}},{default:()=>{var R;return[et(_("div",I({ref:B,class:["v-overlay__content",e.contentClass],style:[N.value,S.value]},A.value,e.contentProps),[(R=t.default)==null?void 0:R.call(t,{isActive:i})]),[[tt,i.value],[nt("click-outside"),{handler:y,closeConditional:b,include:()=>[p.value]}]])]}})])]})])}),{activatorEl:p,animateClick:O,contentEl:B,globalTop:m,localTop:v,updateLocation:E}}});export{Ut as V,zt as a,Nt as b,At as c,Qt as f,dt as g,Dt as m,_t as u};
