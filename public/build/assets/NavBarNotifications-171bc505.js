import{a as T}from"./formatters-1588bd0d.js";import{g as S,h as $,o as d,i as x,w as t,a as e,m as A,u as c,k as b,v as _,d as r,t as f,am as g,c as k,F as C,S as R,j as w,b as h,aL as L,q as M,V as E,r as q,bv as F,bw as U,bx as D}from"./main-af2b2d5d.js";import{P as j}from"./vue3-perfect-scrollbar.esm-89fc7606.js";/* empty css                                                      */import{V as z,a as O}from"./VBadge-d28f65bb.js";import{V as Y}from"./VMenu-87bd5e8d.js";import{V as H,a as W,b as G,c as J}from"./VCard-bf989272.js";import{V as K}from"./VTooltip-8f8d1a45.js";import{V}from"./VDivider-e22d08d7.js";import{V as Q,a as B,b as I,d as X}from"./VList-eefec05a.js";import{V as Z}from"./VAvatar-962a7ec6.js";import"./VImg-c0d910b9.js";import"./VOverlay-cb1675d4.js";import"./dialog-transition-2395bc87.js";import"./VCardText-ca8377a1.js";const ee={key:0},te={class:"text-xs text-disabled"},ae={class:"d-flex flex-column align-center gap-4"},ie={style:{"block-size":"28px","inline-size":"28px"}},se={__name:"Notifications",props:{notifications:{type:Array,required:!0},badgeProps:{type:null,required:!1,default:void 0},location:{type:null,required:!1,default:"bottom end"}},emits:["read","unread","remove","click:notification"],setup(y,{emit:n}){const o=y,m=n,u=S(()=>o.notifications.some(a=>a.isSeen===!1)),p=()=>{const a=o.notifications.map(s=>s.id);u.value?m("read",a):m("unread",a)},l=S(()=>o.notifications.filter(a=>a.isSeen===!1).length);return(a,s)=>{const v=$("IconBtn");return d(),x(v,{id:"notification-btn"},{default:t(()=>[e(z,A(o.badgeProps,{"model-value":o.notifications.some(i=>!i.isSeen),color:"error",content:c(l),class:"notification-badge"}),{default:t(()=>[e(b,{size:"26",icon:"tabler-bell"})]),_:1},16,["model-value","content"]),e(Y,{activator:"parent",width:"380px",location:o.location,offset:"14px","close-on-content-click":!1},{default:t(()=>[e(H,{class:"d-flex flex-column"},{default:t(()=>[e(W,{class:"notification-section"},{append:t(()=>[_(e(v,{onClick:p},{default:t(()=>[e(b,{icon:c(u)?"tabler-mail-opened":"tabler-mail"},null,8,["icon"]),e(K,{activator:"parent",location:"start"},{default:t(()=>[r(f(c(u)?"Mark all as read":"Mark all as unread"),1)]),_:1})]),_:1},512),[[g,o.notifications.length]])]),default:t(()=>[e(G,{class:"text-lg"},{default:t(()=>s[0]||(s[0]=[r(" Notifications ")])),_:1})]),_:1}),e(V),e(c(j),{options:{wheelPropagation:!1},style:{"max-block-size":"23.75rem"}},{default:t(()=>[e(Q,{class:"notification-list rounded-0 py-0"},{default:t(()=>[(d(!0),k(C,null,R(o.notifications,(i,P)=>(d(),k(C,{key:i.title},[P>0?(d(),x(V,{key:0})):w("",!0),e(B,{link:"",lines:"one","min-height":"66px",class:"list-item-hover-class",onClick:N=>a.$emit("click:notification",i)},{prepend:t(()=>[e(O,{start:""},{default:t(()=>[e(Z,{size:"40",color:i.color&&i.icon?i.color:void 0,image:i.img||void 0,icon:i.icon||void 0,variant:i.img?void 0:"tonal"},{default:t(()=>[i.text?(d(),k("span",ee,f(("avatarText"in a?a.avatarText:c(T))(i.text)),1)):w("",!0)]),_:2},1032,["color","image","icon","variant"])]),_:2},1024)]),append:t(()=>[h("div",ae,[e(z,{dot:"",color:i.isSeen?"#a8aaae":"primary",class:L(`${i.isSeen?"visible-in-hover":""} ms-1`),onClick:M(N=>a.$emit(i.isSeen?"unread":"read",[i.id]),["stop"])},null,8,["color","class","onClick"]),h("div",ie,[e(v,{size:"small",class:"visible-in-hover",onClick:N=>a.$emit("remove",i.id)},{default:t(()=>[e(b,{size:"20",icon:"tabler-x"})]),_:2},1032,["onClick"])])])]),default:t(()=>[e(I,{class:"font-weight-medium"},{default:t(()=>[r(f(i.title),1)]),_:2},1024),e(X,null,{default:t(()=>[r(f(i.subtitle),1)]),_:2},1024),h("span",te,f(i.time),1)]),_:2},1032,["onClick"])],64))),128)),_(e(B,{class:"text-center text-medium-emphasis",style:{"block-size":"56px"}},{default:t(()=>[e(I,null,{default:t(()=>s[1]||(s[1]=[r("No Notification Found!")])),_:1})]),_:1},512),[[g,!o.notifications.length]])]),_:1})]),_:1}),e(V),_(e(J,{class:"notification-footer"},{default:t(()=>[e(E,{block:""},{default:t(()=>s[2]||(s[2]=[r(" View All Notifications ")])),_:1})]),_:1},512),[[g,o.notifications.length]])]),_:1})]),_:1},8,["location"])]),_:1})}}},oe="/build/assets/paypal-01b645d1.svg",Ve={__name:"NavBarNotifications",setup(y){const n=q([{id:1,img:F,title:"Congratulation Flora! 🎉",subtitle:"Won the monthly best seller badge",time:"Today",isSeen:!0},{id:2,text:"Tom Holland",title:"New user registered.",subtitle:"5 hours ago",time:"Yesterday",isSeen:!1},{id:3,img:U,title:"New message received 👋🏻",subtitle:"You have 10 unread messages",time:"11 Aug",isSeen:!0},{id:4,img:oe,title:"PayPal",subtitle:"Received Payment",time:"25 May",isSeen:!1,color:"error"},{id:5,img:D,title:"Received Order 📦",subtitle:"New order received from john",time:"19 Mar",isSeen:!0}]),o=l=>{n.value.forEach((a,s)=>{l===a.id&&n.value.splice(s,1)})},m=l=>{n.value.forEach(a=>{l.forEach(s=>{s===a.id&&(a.isSeen=!0)})})},u=l=>{n.value.forEach(a=>{l.forEach(s=>{s===a.id&&(a.isSeen=!1)})})},p=l=>{l.isSeen||m([l.id])};return(l,a)=>{const s=se;return d(),x(s,{notifications:c(n),onRemove:o,onRead:m,onUnread:u,"onClick:notification":p},null,8,["notifications"])}}};export{Ve as default};
