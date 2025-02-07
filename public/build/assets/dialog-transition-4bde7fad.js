import{H as b,a as y,n as V,bd as u,E as A}from"./main-8a2ce3a6.js";import{a as f,d as B,s as v,e as C,n as F}from"./VOverlay-acd7e103.js";const T=A({target:Object},"v-dialog-transition"),S=b()({name:"VDialogTransition",props:T(),setup(g,i){let{slots:e}=i;const o={onBeforeEnter(t){t.style.pointerEvents="none",t.style.visibility="hidden"},async onEnter(t,d){var c;await new Promise(n=>requestAnimationFrame(n)),await new Promise(n=>requestAnimationFrame(n)),t.style.visibility="";const{x:s,y:a,sx:p,sy:l,speed:r}=x(g.target,t),m=f(t,[{transform:`translate(${s}px, ${a}px) scale(${p}, ${l})`,opacity:0},{}],{duration:225*r,easing:B});(c=w(t))==null||c.forEach(n=>{f(n,[{opacity:0},{opacity:0,offset:.33},{}],{duration:225*2*r,easing:v})}),m.finished.then(()=>d())},onAfterEnter(t){t.style.removeProperty("pointer-events")},onBeforeLeave(t){t.style.pointerEvents="none"},async onLeave(t,d){var c;await new Promise(n=>requestAnimationFrame(n));const{x:s,y:a,sx:p,sy:l,speed:r}=x(g.target,t);f(t,[{},{transform:`translate(${s}px, ${a}px) scale(${p}, ${l})`,opacity:0}],{duration:125*r,easing:C}).finished.then(()=>d()),(c=w(t))==null||c.forEach(n=>{f(n,[{},{opacity:0,offset:.2},{opacity:0}],{duration:125*2*r,easing:v})})},onAfterLeave(t){t.style.removeProperty("pointer-events")}};return()=>g.target?y(u,V({name:"dialog-transition"},o,{css:!1}),e):y(u,{name:"dialog-transition"},e)}});function w(g){var e;const i=(e=g.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list"))==null?void 0:e.children;return i&&[...i]}function x(g,i){const e=g.getBoundingClientRect(),o=F(i),[t,d]=getComputedStyle(i).transformOrigin.split(" ").map($=>parseFloat($)),[s,a]=getComputedStyle(i).getPropertyValue("--v-overlay-anchor-origin").split(" ");let p=e.left+e.width/2;s==="left"||a==="left"?p-=e.width/2:(s==="right"||a==="right")&&(p+=e.width/2);let l=e.top+e.height/2;s==="top"||a==="top"?l-=e.height/2:(s==="bottom"||a==="bottom")&&(l+=e.height/2);const r=e.width/o.width,m=e.height/o.height,c=Math.max(1,r,m),n=r/c||0,E=m/c||0,h=o.width*o.height/(window.innerWidth*window.innerHeight),P=h>.12?Math.min(1.5,(h-.12)*10+1):1;return{x:p-(t+o.left),y:l-(d+o.top),sx:n,sy:E,speed:P}}export{S as V};
