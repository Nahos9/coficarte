import{r as c}from"./validators-be8c4c00.js";import{E as J,G as H,H as K,I as O,J as z,g as j,K as Q,L as W,a as e,n as F,r as b,e as X,f as S,c as Y,b as _,w as t,s as Z,p as ee,v as ae,o as le,u as d,x as te,V as T,d as q,l as $,t as re,y as oe}from"./main-8a2ce3a6.js";import{_ as se}from"./AppDateTimePicker-8bd66547.js";import{_ as ue}from"./AppTextField-07f6e824.js";import{_ as ie}from"./AppAutocomplete-34b174ba.js";import{_ as B}from"./AppSelect-e33e2ba3.js";import{$ as de}from"./api-1ebcaa35.js";import{u as N}from"./useApi-8e466988.js";import{c as L}from"./createUrl-3a0347f8.js";import{_ as ne}from"./_plugin-vue_export-helper-c27b6911.js";import{V as me}from"./VForm-79a6b6c9.js";import{V as ce}from"./VSnackbar-dcddbb8c.js";import{V as h,a as u}from"./VRow-74808a81.js";import{V as pe}from"./VCard-693346bf.js";import{V as _e}from"./VCardText-c81f1811.js";import{m as ve,a as R}from"./VSelect-433c6789.js";import{m as fe,u as Ve,V as M}from"./VTextField-cbbb89fa.js";import"./VOverlay-acd7e103.js";import"./VImg-79f17a5f.js";import"./VList-b321f205.js";import"./VAvatar-132991f5.js";import"./VDivider-85e868c4.js";import"./VMenu-cf241f55.js";import"./dialog-transition-4bde7fad.js";import"./VChip-a382220c.js";import"./index-593e39a4.js";import"./useAbility-35676043.js";const be=J({...fe(),...H(ve(),["inline"])},"VCheckbox"),ye=K()({name:"VCheckbox",inheritAttrs:!1,props:be(),emits:{"update:modelValue":n=>!0,"update:focused":n=>!0},setup(n,m){let{attrs:f,slots:k}=m;const a=O(n,"modelValue"),{isFocused:C,focus:w,blur:s}=Ve(n),y=z(),U=j(()=>n.id||`checkbox-${y}`);return Q(()=>{const[A,P]=W(f),[D,I]=M.filterProps(n),[E,g]=R.filterProps(n);return e(M,F({class:["v-checkbox",n.class]},A,D,{modelValue:a.value,"onUpdate:modelValue":v=>a.value=v,id:U.value,focused:C.value,style:n.style}),{...k,default:v=>{let{id:x,messagesId:o,isDisabled:l,isReadonly:p}=v;return e(R,F(E,{id:x.value,"aria-describedby":o.value,disabled:l.value,readonly:p.value},P,{modelValue:a.value,"onUpdate:modelValue":i=>a.value=i,onFocus:w,onBlur:s}),k)}})}),{}}});const ge={class:"d-flex align-center justify-center pa-2"},xe={class:"d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6"},ke={class:"d-flex flex-column justify-center"},Ce={class:"d-flex gap-4 align-center flex-wrap"},qe={__name:"add",async setup(n){let m,f;const k=ee(),a=b({sale_date:null,credit_card_id:null,number_id:"8456",customer_type:null,customer_name:null,type_piece:null,number_piece:null,date_expiration:null,account_number:null,account_type_id:null,customer_phone_number:null,is_dotation:!1}),C=()=>({sale_date:"",credit_card_id:"",number_id:"",customer_type:"",customer_name:"",type_piece:"",number_piece:"",date_expiration:"",account_type_id:"",customer_phone_number:"",is_dotation:""}),w=[{value:"cni",title:"Carte d'identité nationale"},{value:"passport",title:"Passeport"},{value:"residence_certificate",title:"Certificat de résidence"},{value:"driving_licence",title:"Permis de conduire"},{value:"carte_sej",title:"Carte de séjour"}],s=b(C()),y=b(),U=()=>{var o;(o=y.value)==null||o.validate().then(async({valid:l})=>{if(l){const p=await de("/sale",{method:"POST",body:{sale_date:a.value.sale_date,credit_card_id:a.value.credit_card_id,number_id:a.value.number_id,customer_type:a.value.customer_type,customer_name:a.value.customer_name,type_piece:a.value.type_piece,number_piece:a.value.number_piece,date_expiration:a.value.date_expiration,account_number:a.value.account_number,account_type_id:a.value.account_type_id,customer_phone_number:a.value.customer_phone_number,is_dotation:a.value.is_dotation}});if(s.value=C(),p.status==201)x.value="success",g.value=!0,k.push("/sale");else{x.value="error",g.value=!0,v.value="";for(const i in p.errors)p.errors[i].forEach(V=>{console.log(i+": "+V),s.value[i]+=V+`
`,v.value+=i+": "+V+", "})}oe(()=>{var i;(i=y.value)==null||i.resetValidation()})}})},A=X("userData").value,{data:P}=([m,f]=S(()=>N(L("/credit-card",{query:{possessor_id:A.id,status:"owned",paginate:"false"}}))),m=await m,f(),m),D=j(()=>P.value.data),{data:I}=([m,f]=S(()=>N(L("/account-type",{query:{paginate:"false"}}))),m=await m,f(),m),E=j(()=>I.value.data),g=b(!1),v=b(""),x=b("success");return(o,l)=>{const p=ie,i=ue,V=se,G=ae("mask");return le(),Y("div",null,[l[16]||(l[16]=_("div",{class:"d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6"},[_("div",{class:"d-flex flex-column justify-center"},[_("h4",{class:"text-h4 font-weight-medium"},"Ajouter des cartes"),_("span",null,"Informations sur la première cartes du lot")])],-1)),e(me,{ref_key:"refForm",ref:y,onSubmit:Z(U,["prevent"])},{default:t(()=>[e(h,null,{default:t(()=>[e(u,{md:"12"},{default:t(()=>[e(pe,{class:"mb-6",title:"Information des cartes"},{default:t(()=>[e(_e,null,{default:t(()=>[e(h,null,{default:t(()=>[e(u,{cols:"12",md:"12",lg:"9"},{default:t(()=>[e(h,null,{default:t(()=>[e(u,{cols:"12",md:"12",lg:"12"},{default:t(()=>[e(p,{modelValue:a.value.credit_card_id,"onUpdate:modelValue":l[0]||(l[0]=r=>a.value.credit_card_id=r),items:d(D),"error-messages":s.value.credit_card_id,label:"Carte vendu","item-title":"card_number_fr","item-value":"id",rules:["requiredValidator"in o?o.requiredValidator:d(c)]},null,8,["modelValue","items","error-messages","rules"])]),_:1}),e(u,{cols:"12",md:"12",lg:"12"},{default:t(()=>[te(e(i,{modelValue:a.value.number_id,"onUpdate:modelValue":l[1]||(l[1]=r=>a.value.number_id=r),"error-messages":s.value.number_id,label:"4 Derniers chiffres du numéro de la carte",placeholder:"Ex: 2595",rules:["requiredValidator"in o?o.requiredValidator:d(c)]},null,8,["modelValue","error-messages","rules"]),[[G,"####"]])]),_:1}),e(u,{cols:"12",md:"12",lg:"12"},{default:t(()=>[e(B,{modelValue:a.value.customer_type,"onUpdate:modelValue":l[2]||(l[2]=r=>a.value.customer_type=r),items:[{title:"Entreprise",value:"business"},{title:"Particulier",value:"particular"}],"error-messages":s.value.customer_type,label:"Type de l'acheteur",rules:["requiredValidator"in o?o.requiredValidator:d(c)]},null,8,["modelValue","error-messages","rules"])]),_:1}),e(u,{cols:"12",md:"12",lg:"12"},{default:t(()=>[e(i,{modelValue:a.value.customer_name,"onUpdate:modelValue":l[3]||(l[3]=r=>a.value.customer_name=r),"error-messages":s.value.customer_name,label:"Nom du client",placeholder:"Ex: John",rules:["requiredValidator"in o?o.requiredValidator:d(c)]},null,8,["modelValue","error-messages","rules"])]),_:1}),e(u,{cols:"12"},{default:t(()=>[e(B,{modelValue:a.value.type_piece,"onUpdate:modelValue":l[4]||(l[4]=r=>a.value.type_piece=r),items:w,"error-messages":s.value.type_piece,label:"Type de la pièce d'identité",rules:["requiredValidator"in o?o.requiredValidator:d(c)]},null,8,["modelValue","error-messages","rules"])]),_:1}),e(u,{cols:"12"},{default:t(()=>[e(i,{modelValue:a.value.number_piece,"onUpdate:modelValue":l[5]||(l[5]=r=>a.value.number_piece=r),"error-messages":s.value.number_piece,label:"Numéro de la pièce",placeholder:"Ex: GA2456TA",rules:["requiredValidator"in o?o.requiredValidator:d(c)]},null,8,["modelValue","error-messages","rules"])]),_:1}),e(u,{cols:"12"},{default:t(()=>[e(V,{modelValue:a.value.date_expiration,"onUpdate:modelValue":l[6]||(l[6]=r=>a.value.date_expiration=r),"error-messages":s.value.date_expiration,label:"Date de validité de la pièce d'identité",rules:["requiredValidator"in o?o.requiredValidator:d(c)]},null,8,["modelValue","error-messages","rules"])]),_:1}),e(u,{cols:"12",md:"12",lg:"12"},{default:t(()=>[e(i,{modelValue:a.value.account_number,"onUpdate:modelValue":l[7]||(l[7]=r=>a.value.account_number=r),type:"number","error-messages":s.value.account_number,label:"Numéro de compte du client",placeholder:"Ex: 371360000786"},null,8,["modelValue","error-messages"])]),_:1}),e(u,{cols:"12",md:"12",lg:"12"},{default:t(()=>[e(i,{modelValue:a.value.customer_phone_number,"onUpdate:modelValue":l[8]||(l[8]=r=>a.value.customer_phone_number=r),"error-messages":s.value.customer_phone_number,label:"Numéro de téléphone du client",placeholder:"Ex: +241 77 56 76 00"},null,8,["modelValue","error-messages"])]),_:1}),e(u,{cols:"12",md:"12",lg:"12"},{default:t(()=>[e(ye,{modelValue:a.value.is_dotation,"onUpdate:modelValue":l[9]||(l[9]=r=>a.value.is_dotation=r),"error-messages":s.value.is_dotation,label:"Dotation"},null,8,["modelValue","error-messages"])]),_:1}),e(u,{cols:"12",md:"12",lg:"12"},{default:t(()=>[e(p,{modelValue:a.value.account_type_id,"onUpdate:modelValue":l[10]||(l[10]=r=>a.value.account_type_id=r),items:d(E),"error-messages":s.value.account_type_id,label:"Type de compte","item-title":"name","item-value":"id",rules:["requiredValidator"in o?o.requiredValidator:d(c)]},null,8,["modelValue","items","error-messages","rules"])]),_:1})]),_:1})]),_:1}),e(u,{cols:"12",md:"12",lg:"3"},{default:t(()=>[_("div",ge,[e(V,{modelValue:a.value.sale_date,"onUpdate:modelValue":l[11]||(l[11]=r=>a.value.sale_date=r),"error-messages":s.value.sale_date,label:"Date de la vente",rules:["requiredValidator"in o?o.requiredValidator:d(c)],config:{inline:!0},class:"calendar-date-picker"},null,8,["modelValue","error-messages","rules"])])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(u,{cols:"12"},{default:t(()=>[_("div",xe,[_("div",ke,[e(u,{cols:"11"},{default:t(()=>[e(T,{"prepend-icon":"tabler-arrow-narrow-left",to:"/sale"},{default:t(()=>l[13]||(l[13]=[q(" ventes ")])),_:1})]),_:1})]),_("div",Ce,[e(T,{type:"reset",variant:"tonal",color:"primary"},{default:t(()=>[e($,{start:"",icon:"tabler-circle-minus"}),l[14]||(l[14]=q(" Effacer "))]),_:1}),e(T,{type:"submit",class:"me-3"},{default:t(()=>[l[15]||(l[15]=q(" Enregistrer ")),e($,{end:"",icon:"tabler-checkbox"})]),_:1})])])]),_:1})]),_:1})]),_:1},512),e(ce,{modelValue:g.value,"onUpdate:modelValue":l[12]||(l[12]=r=>g.value=r),transition:"scale-transition",location:"top end",color:x.value},{default:t(()=>[q(re(v.value),1)]),_:1},8,["modelValue","color"])])}}},Ye=ne(qe,[["__scopeId","data-v-75ff2e0a"]]);export{Ye as default};
