import{v as B}from"./visa-0e974ed6.js";import{f as h,u as o,c as y,a as s,w as l,k as c,p as A,q,o as m,V as L,d as i,b as t,j as g,t as a,l as f}from"./main-6c5357b5.js";import{u as b}from"./useApi-83881d3c.js";import{c as V}from"./createUrl-93691d1d.js";import{V as T,a as u}from"./VRow-8103f026.js";import{V as x}from"./VCard-dc87bf31.js";import{V as d}from"./VCardText-e8274b7b.js";import{V as z}from"./VChip-383f7682.js";import{V as _}from"./VAvatar-de22e4a2.js";import{V as v}from"./VDivider-7b29517b.js";import{V as D}from"./VSpacer-3a0846c1.js";import"./index-593e39a4.js";import"./VImg-9d008c95.js";const E={key:0},I={class:"text-h5 mt-4"},S={class:"d-flex justify-space-around gap-x-6 gap-y-2 flex-wrap mb-6"},P={class:"d-flex align-center me-8"},U={class:"text-h5"},$={class:"d-flex align-center me-8"},F={class:"text-h5"},G={class:"d-flex align-center me-4"},H={class:"text-h5"},J={class:"text-h5 mt-4"},K={class:"d-flex justify-space-around gap-x-6 gap-y-2 flex-wrap mb-6"},M={class:"d-flex align-center me-8"},O={class:"text-sm"},Q={class:"d-flex align-center me-4"},W={class:"text-sm"},X={class:"d-flex flex-column gap-y-6"},Y={class:"text-no-wrap"},Z=["src"],tt=["src"],et={style:{color:"white"}},st={key:0,style:{color:"white","font-weight":"150px"}},lt={key:1,style:{color:"white","font-weight":"150px"}},rt={style:{color:"white","font-weight":"150px"}},ot={class:"d-flex flex-column text-sm-end"},at={style:{color:"white"},class:"text-body-2 my-4 order-sm-1 order-0"},nt={style:{color:"white"},class:"text-body-2 my-4 order-sm-1 order-0"},it={style:{color:"white"},class:"text-body-2 my-4 order-sm-1 order-0"},Vt={__name:"[id]",async setup(dt){let n,p;const C=A(),k=q();let N="/sale";const{data:r}=([n,p]=h(()=>b(V(`/sale/${Number(k.params.id)}`,{query:{with_seller:"true","with_credit_card<lot":"true","with_credit_card<receptionist":"true",with_account_type:"true"}}))),n=await n,p(),n),{data:j}=([n,p]=h(()=>b(V("/sale",{query:{paginate:"false"}}))),n=await n,p(),n);return r.value.status==200?r.value=r.value.data.sale:C.push("/sale"),(R,e)=>o(r)?(m(),y("section",E,[s(T,null,{default:l(()=>[s(u,{cols:"12"},{default:l(()=>[s(x,null,{default:l(()=>[s(d,{class:"d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg"},{default:l(()=>[s(u,{cols:"10"},{default:l(()=>[s(L,{"prepend-icon":"tabler-arrow-narrow-left",to:o(N)},{default:l(()=>e[0]||(e[0]=[i(" Ventes ")])),_:1},8,["to"])]),_:1})]),_:1}),s(d,{class:"d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg"},{default:l(()=>[s(u,{cols:"12"},{default:l(()=>e[1]||(e[1]=[t("h2",null,"Intervenants",-1)])),_:1}),s(u,null,{default:l(()=>[o(r)?(m(),g(x,{key:0},{default:l(()=>[s(d,{class:"text-center pt-12"},{default:l(()=>[e[2]||(e[2]=t("h5",{class:"text-h5 mt-4"}," Acheteur ",-1)),t("h5",I,a(o(r).customer_name),1),s(z,{label:"",color:"secondary",size:"small",class:"text-capitalize mt-4"},{default:l(()=>[i(a(o(r).account_type.name),1)]),_:1})]),_:1}),s(d,null,{default:l(()=>[t("div",S,[t("div",P,[s(_,{size:40,rounded:"",color:"primary",variant:"tonal",class:"me-4"},{default:l(()=>[s(f,{icon:"tabler-building-bank",size:"24"})]),_:1}),t("div",null,[t("h5",U,a(o(r).account_number??"-"),1),e[3]||(e[3]=t("span",{class:"text-sm"},"Compte",-1))])]),t("div",$,[s(_,{size:40,rounded:"",color:"primary",variant:"tonal",class:"me-4"},{default:l(()=>[s(f,{icon:"tabler-phone",size:"24"})]),_:1}),t("div",null,[t("h5",F,a(o(r).customer_phone_number??"-"),1),e[4]||(e[4]=t("span",{class:"text-sm"},"Teléphone",-1))])]),t("div",G,[s(_,{size:38,rounded:"",color:"primary",variant:"tonal",class:"me-4"},{default:l(()=>[s(f,{icon:{business:"tabler-building-store",particular:"tabler-user"}[o(r).customer_type],size:"24"},null,8,["icon"])]),_:1}),t("div",null,[t("h5",H,a(o(r).customer_type_fr),1),e[5]||(e[5]=t("span",{class:"text-sm"},"Catégorie",-1))])])]),s(v,{class:"my-4"})]),_:1})]),_:1})):c("",!0)]),_:1}),s(u,null,{default:l(()=>[o(r)?(m(),g(x,{key:0},{default:l(()=>[s(d,{class:"text-center pt-12"},{default:l(()=>[e[6]||(e[6]=t("h5",{class:"text-h5 mt-4"}," Vendeur ",-1)),t("h5",J,a(o(r).seller.email),1),s(z,{label:"",color:"secondary",size:"small",class:"text-capitalize mt-4"},{default:l(()=>[i(a(o(r).seller.profile_fr),1)]),_:1})]),_:1}),s(d,null,{default:l(()=>[t("div",K,[t("div",M,[s(_,{size:40,rounded:"",color:"primary",variant:"tonal",class:"me-4"},{default:l(()=>[s(f,{icon:"tabler-user",size:"24"})]),_:1}),t("div",null,[e[7]||(e[7]=t("h5",{class:"text-h5"}," Nom ",-1)),t("span",O,a(o(r).seller.name),1)])]),t("div",Q,[s(_,{size:38,rounded:"",color:"primary",variant:"tonal",class:"me-4"},{default:l(()=>[s(f,{icon:"tabler-wallet",size:"24"})]),_:1}),t("div",null,[e[8]||(e[8]=t("h5",{class:"text-h5"}," Nombre de vente ",-1)),t("span",W,a(o(j).total),1)])])]),s(v,{class:"my-4"})]),_:1})]),_:1})):c("",!0)]),_:1})]),_:1}),s(d,{class:"d-flex flex-wrap justify-center center flex-column flex-sm-row print-row text-lg text-white-custom"},{default:l(()=>[s(u,{cols:"12"},{default:l(()=>e[9]||(e[9]=[t("h2",null,"Carte vendu",-1)])),_:1}),s(u,{cols:"6"},{default:l(()=>[t("div",X,[s(x,{flat:"",color:"rgba(201, 60, 47,0.8)"},{default:l(()=>[s(d,{col:"6",class:"d-flex flex-sm-row flex-column"},{default:l(()=>{var w;return[t("div",Y,[t("img",{src:R.logop,height:"25"},null,8,Z),t("img",{src:o(B),height:"25"},null,8,tt),e[14]||(e[14]=t("h4",{class:"my-2 text-body-1 text-high-emphasis d-flex align-center"},[t("div",{style:{color:"white"},class:"me-4"}," Cofina ")],-1)),e[15]||(e[15]=t("br",null,null,-1)),t("div",et,[e[10]||(e[10]=i(" Numéro: ")),t("strong",null,a(o(r).credit_card.card_number_fr),1)]),e[16]||(e[16]=t("br",null,null,-1)),o(r).credit_card.lot?(m(),y("div",st,[e[11]||(e[11]=i(" Lot: ")),t("strong",null,a((w=o(r).credit_card.lot)==null?void 0:w.first_card_number_fr),1)])):c("",!0),e[17]||(e[17]=t("br",null,null,-1)),o(r).credit_card.lot?(m(),y("div",lt,[e[12]||(e[12]=i(" Référence de la facture: ")),t("strong",null,a(o(r).credit_card.invoice_reference),1)])):c("",!0),e[18]||(e[18]=t("br",null,null,-1)),t("div",rt,[e[13]||(e[13]=i(" Receptioniste: ")),t("strong",null,a(o(r).credit_card.receptionist.name),1)])]),s(D),t("div",ot,[t("span",at,"Livré le "+a(o(r).credit_card.delivery_date_fr),1),t("span",nt,"Expire le "+a(o(r).credit_card.expiration_date_fr),1),t("span",it,[e[19]||(e[19]=i("Prix de vente: ")),t("strong",null,a(o(r).sale_price_fr),1)])]),e[20]||(e[20]=t("br",null,null,-1))]}),_:1})]),_:1})])]),_:1})]),_:1}),s(v)]),_:1})]),_:1})]),_:1})])):c("",!0)}};export{Vt as default};
