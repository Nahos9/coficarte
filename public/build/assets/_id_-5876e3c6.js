import{v as b}from"./visa-0e974ed6.js";import{f as V,u as s,c as n,a as r,w as l,k as u,p as C,q as k,o as f,V as y,d as i,b as e,t as a}from"./main-6c5357b5.js";import{u as N}from"./useApi-83881d3c.js";import{c as R}from"./createUrl-93691d1d.js";import{V as B,a as c}from"./VRow-8103f026.js";import{V as v}from"./VCard-dc87bf31.js";import{V as m}from"./VCardText-e8274b7b.js";import{V as j}from"./VSpacer-3a0846c1.js";import{V as q}from"./VDivider-7b29517b.js";import"./index-593e39a4.js";import"./VAvatar-de22e4a2.js";import"./VImg-9d008c95.js";const A={key:0},D={key:0},E={class:"d-flex flex-column gap-y-6"},L={class:"text-no-wrap"},S=["src"],T=["src"],$={style:{color:"white"}},M={key:0,style:{color:"white","font-weight":"150px"}},P={key:1,style:{color:"white","font-weight":"150px"}},U={style:{color:"white","font-weight":"150px"}},z={style:{color:"white","font-weight":"150px"}},F={class:"d-flex flex-column text-sm-end"},G={style:{color:"white"},class:"text-body-2 my-4 order-sm-1 order-0"},H={style:{color:"white"},class:"text-body-2 my-4 order-sm-1 order-0"},rt={__name:"[id]",async setup(I){let d,p;const g=C(),h=k();let _="/credit-card";const{data:o}=([d,p]=V(()=>N(R(`/credit-card/${Number(h.params.id)}`,{query:{with_possessor:"true",with_lot:"true",with_receptionist:"true"}}))),d=await d,p(),d);return o.value.status==200?(console.log(o.value),o.value=o.value.data.creditCard,o.value.status=="sold"&&(_="/credit-card/historical")):g.push("/credit-card"),o.value.card_number_fr,(x,t)=>s(o)?(f(),n("section",A,[r(B,null,{default:l(()=>[r(c,{cols:"12"},{default:l(()=>[r(v,null,{default:l(()=>[r(m,{class:"d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg"},{default:l(()=>[r(c,{cols:"10"},{default:l(()=>[r(y,{"prepend-icon":"tabler-arrow-narrow-left",to:s(_)},{default:l(()=>t[0]||(t[0]=[i(" Cartes ")])),_:1},8,["to"])]),_:1}),x.$can("update","credit-card")?(f(),n("div",D,[r(c,{cols:" 2",class:"text-right"},{default:l(()=>[r(y,{"append-icon":"tabler-edit",to:{name:"credit-card-edit-id",params:{id:s(o).id}},disabled:s(o).status=="sold"},{default:l(()=>t[1]||(t[1]=[i(" Modifier ")])),_:1},8,["to","disabled"])]),_:1})])):u("",!0)]),_:1}),r(m,{class:"d-flex flex-wrap justify-center center flex-column flex-sm-row print-row text-lg text-white-custom"},{default:l(()=>[r(c,{cols:"6"},{default:l(()=>[e("div",E,[r(v,{flat:"",color:"rgba(201, 60, 47,0.8)"},{default:l(()=>[r(m,{class:"d-flex flex-sm-row flex-column"},{default:l(()=>{var w;return[e("div",L,[e("img",{src:x.logop,height:"25"},null,8,S),e("img",{src:s(b),height:"25"},null,8,T),t[7]||(t[7]=e("h4",{class:"my-2 text-body-1 text-high-emphasis d-flex align-center"},[e("div",{style:{color:"white"},class:"me-4"}," Cofina ")],-1)),t[8]||(t[8]=e("br",null,null,-1)),e("div",$,[t[2]||(t[2]=i(" Numéro: ")),e("strong",null,a(s(o).card_number_fr),1)]),t[9]||(t[9]=e("br",null,null,-1)),s(o).lot?(f(),n("div",M,[t[3]||(t[3]=i(" Lot: ")),e("strong",null,a((w=s(o).lot)==null?void 0:w.first_card_number_fr),1)])):u("",!0),s(o).lot?(f(),n("div",P,[t[4]||(t[4]=i(" Référence de la facture: ")),e("strong",null,a(s(o).invoice_reference),1)])):u("",!0),e("div",U,[t[5]||(t[5]=i(" Receptioniste: ")),e("strong",null,a(s(o).receptionist.name),1)]),e("div",z,[t[6]||(t[6]=i(" Possesseur: ")),e("strong",null,a(s(o).possessor.name),1)])]),r(j),e("div",F,[e("span",G,"Livré le "+a(s(o).delivery_date_fr),1),e("span",H,"Expire le "+a(s(o).expiration_date_fr),1)]),t[10]||(t[10]=e("br",null,null,-1))]}),_:1})]),_:1})])]),_:1})]),_:1}),r(q)]),_:1})]),_:1})]),_:1})])):u("",!0)}};export{rt as default};
