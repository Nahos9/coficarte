import{b as w,c as C,V as i,f as _}from"./VOverlay-acd7e103.js";import{E as g,aV as T,aW as h,aC as A,aE as L,af as N,G as R,H as x,I as B,aX as I,aY as O,ag as E,aZ as G,a_ as M,r as $,A as c,z,K as D,a as n,a$ as F,aN as H,n as u}from"./main-8a2ce3a6.js";const K=g({multiLine:Boolean,timeout:{type:[Number,String],default:5e3},vertical:Boolean,...T({location:"bottom"}),...h(),...A(),...L(),...N(),...R(w({transition:"v-snackbar-transition"}),["persistent","noClickAnimation","scrim","scrollStrategy"])},"VSnackbar"),X=x()({name:"VSnackbar",props:K(),emits:{"update:modelValue":a=>!0},setup(a,v){let{slots:t}=v;const e=B(a,"modelValue"),{locationStyles:m}=I(a),{positionClasses:d}=O(a),{scopeId:f}=C(),{themeClasses:k}=E(a),{colorClasses:b,colorStyles:V,variantClasses:P}=G(a),{roundedClasses:y}=M(a),r=$();c(e,o),c(()=>a.timeout,o),z(()=>{e.value&&o()});let l=-1;function o(){window.clearTimeout(l);const s=Number(a.timeout);!e.value||s===-1||(l=window.setTimeout(()=>{e.value=!1},s))}function S(){window.clearTimeout(l)}return D(()=>{const[s]=i.filterProps(a);return n(i,u({ref:r,class:["v-snackbar",{"v-snackbar--active":e.value,"v-snackbar--multi-line":a.multiLine&&!a.vertical,"v-snackbar--vertical":a.vertical},d.value,a.class],style:a.style},s,{modelValue:e.value,"onUpdate:modelValue":p=>e.value=p,contentProps:u({class:["v-snackbar__wrapper",k.value,b.value,y.value,P.value],style:[m.value,V.value],onPointerenter:S,onPointerleave:o},s.contentProps),persistent:!0,noClickAnimation:!0,scrim:!1,scrollStrategy:"none",_disableGlobalStack:!0},f),{default:()=>[F(!1,"v-snackbar"),t.default&&n("div",{class:"v-snackbar__content",role:"status","aria-live":"polite"},[t.default()]),t.actions&&n(H,{defaults:{VBtn:{variant:"text",ripple:!1}}},{default:()=>[n("div",{class:"v-snackbar__actions"},[t.actions()])]})],activator:t.activator})}),_({},r)}});export{X as V};
