import{C as f,r as v,A as V,h as y,o as c,i,w as o,a as s,k as g,u as n,b as k,t as h,y as x,c as S,F as b,S as w,d as B}from"./main-af2b2d5d.js";import{V as C}from"./VTooltip-8f8d1a45.js";import{V as I}from"./VMenu-87bd5e8d.js";import{V as T,a as N}from"./VList-eefec05a.js";import"./VOverlay-cb1675d4.js";import"./VImg-c0d910b9.js";import"./dialog-transition-2395bc87.js";import"./VAvatar-962a7ec6.js";import"./VDivider-e22d08d7.js";const z={class:"text-capitalize"},L={__name:"ThemeSwitcher",props:{themes:{type:Array,required:!0}},setup(l){const r=l,t=f(),a=v([t.theme]);return V(()=>t.theme,()=>{a.value=[t.theme]},{deep:!0}),(m,p)=>{const d=y("IconBtn");return c(),i(d,{color:"rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))"},{default:o(()=>{var u;return[s(g,{icon:(u=r.themes.find(e=>e.name===n(t).theme))==null?void 0:u.icon,size:"26"},null,8,["icon"]),s(C,{activator:"parent","open-delay":"1000","scroll-strategy":"close"},{default:o(()=>[k("span",z,h(n(t).theme),1)]),_:1}),s(I,{activator:"parent",offset:"14px"},{default:o(()=>[s(T,{selected:n(a),"onUpdate:selected":p[0]||(p[0]=e=>x(a)?a.value=e:null)},{default:o(()=>[(c(!0),S(b,null,w(r.themes,({name:e,icon:_})=>(c(),i(N,{key:e,value:e,"prepend-icon":_,color:"primary",class:"text-capitalize",onClick:()=>{n(t).theme=e}},{default:o(()=>[B(h(e),1)]),_:2},1032,["value","prepend-icon","onClick"]))),128))]),_:1},8,["selected"])]),_:1})]}),_:1})}}},j={__name:"NavbarThemeSwitcher",setup(l){const r=[{name:"system",icon:"tabler-device-laptop"},{name:"light",icon:"tabler-sun-high"},{name:"dark",icon:"tabler-moon"}];return(t,a)=>{const m=L;return c(),i(m,{themes:r})}}};export{j as default};
