import{a as b,b as y,V as f,f as D}from"./VOverlay-cd754bf3.js";import{D as h,G as S,H as x,r as T,a3 as w,P as v,g as B,n as m,J as F,a as g,aT as I,y as R,a5 as O}from"./main-6c5357b5.js";import{V as A}from"./dialog-transition-7556fd62.js";const C=h({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...b({origin:"center center",scrollStrategy:"block",transition:{component:A},zIndex:2400})},"VDialog"),z=S()({name:"VDialog",props:C(),emits:{"update:modelValue":a=>!0},setup(a,p){let{slots:c}=p;const n=x(a,"modelValue"),{scopeId:V}=y(),o=T();function i(l){var r,s;const e=l.relatedTarget,t=l.target;if(e!==t&&((r=o.value)!=null&&r.contentEl)&&((s=o.value)!=null&&s.globalTop)&&![document,o.value.contentEl].includes(t)&&!o.value.contentEl.contains(t)){const u=O(o.value.contentEl);if(!u.length)return;const d=u[0],P=u[u.length-1];e===d?P.focus():d.focus()}}w&&v(()=>n.value&&a.retainFocus,l=>{l?document.addEventListener("focusin",i):document.removeEventListener("focusin",i)},{immediate:!0}),v(n,async l=>{var e,t;await R(),l?(e=o.value.contentEl)==null||e.focus({preventScroll:!0}):(t=o.value.activatorEl)==null||t.focus({preventScroll:!0})});const E=B(()=>m({"aria-haspopup":"dialog","aria-expanded":String(n.value)},a.activatorProps));return F(()=>{const[l]=f.filterProps(a);return g(f,m({ref:o,class:["v-dialog",{"v-dialog--fullscreen":a.fullscreen,"v-dialog--scrollable":a.scrollable},a.class],style:a.style},l,{modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,"aria-modal":"true",activatorProps:E.value,role:"dialog"},V),{activator:c.activator,default:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return g(I,{root:"VDialog"},{default:()=>{var s;return[(s=c.default)==null?void 0:s.call(c,...t)]}})}})}),D({},o)}});export{z as V};
