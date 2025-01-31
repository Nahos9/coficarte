import{_ as N}from"./AppAutocomplete-da2ee21a.js";import{_ as P}from"./AppSelect-eb5d54d3.js";import{_ as j}from"./AppTextField-d3945dd9.js";import{r as m,f as A,g as M,c as I,a as e,w as l,u as a,i as L,F as O,p as h,q as z,o as G,s as H,V as v,d as f,b as x,l as E,t as J,y as K}from"./main-6c5357b5.js";import{u as $}from"./useApi-83881d3c.js";import{c as F}from"./createUrl-93691d1d.js";import{$ as Q}from"./api-606af7a9.js";import{V,a as n}from"./VRow-8103f026.js";import{V as W}from"./VSnackbar-06b63ae1.js";import{V as X}from"./VForm-88f4e97a.js";import{V as Y}from"./VCard-dc87bf31.js";import{V as Z}from"./VCardText-e8274b7b.js";import"./VInput-1661bdca.js";import"./easing-9f15041e.js";import"./VImg-9d008c95.js";import"./VTextField-2fd207a8.js";import"./VOverlay-cd754bf3.js";import"./VList-d87f67dd.js";import"./VAvatar-de22e4a2.js";import"./VDivider-7b29517b.js";import"./dialog-transition-7556fd62.js";import"./VMenu-64afd89b.js";import"./VChip-383f7682.js";import"./index-593e39a4.js";import"./useAbility-0154d632.js";const ee={class:"d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6"},re={class:"d-flex gap-4 align-center flex-wrap"},Ee={__name:"[id]",async setup(ae){let d,c;const R=h(),y=z();let q="/user";const k=()=>({name:"",email:"",password:"",profile:"",activated:"",password_change_required:"",agency_id:""}),i=m(k()),{data:S}=([d,c]=A(()=>$(F(`/user/${y.params.id}`,{query:{}}))),d=await d,c(),d),o=m(S.value.data.user),C=m(),T=()=>{var b;(b=C.value)==null||b.validate().then(async({valid:r})=>{if(r){const s=await Q(`/user/${y.params.id}`,{method:"PUT",body:{name:o.value.name,email:o.value.email,password:o.value.password,profile:o.value.profile,activated:o.value.activated,password_change_required:o.value.password_change_required,agency_id:o.value.agency_id}});if(i.value=k(),s.status==200)R.push(q);else{s.errors.name&&(i.value.name=s.errors.name[0],s.errors.name=null),s.errors.email&&(i.value.email=s.errors.email[0],s.errors.email=null),s.errors.password&&(i.value.password=s.errors.password[0],s.errors.password=null),s.errors.profile&&(i.value.profile=s.errors.profile[0],s.errors.profile=null),s.errors.activated&&(i.value.activated=s.errors.activated[0],s.errors.activated=null),s.errors.password_change_required&&(i.value.password_change_required=s.errors.password_change_required[0],s.errors.password_change_required=null),s.errors.agency_id&&(i.value.agency_id=s.errors.agency_id[0],s.errors.agency_id=null),w.value="";let u=!1;for(const p in s.errors)s.errors[p]!=null&&(U.value="error",s.errors[p].forEach(t=>{u=!0,w.value+=p+": "+t+"<br>"}));g.value=u}K(()=>{})}})},{data:B}=([d,c]=A(()=>$(F("/agency",{query:{paginate:"false"}}))),d=await d,c(),d),g=m(!1),w=m(""),U=m("success"),D=M(()=>B.value.data),_=m(!1);return(b,r)=>{const s=j,u=P,p=N;return G(),I(O,null,[e(V,null,{default:l(()=>[e(n,{cols:"12",md:"12"},{default:l(()=>[e(X,{ref_key:"refForm",ref:C,onSubmit:H(T,["prevent"])},{default:l(()=>[e(V,null,{default:l(()=>[e(n,{cols:"11"},{default:l(()=>[e(v,{"prepend-icon":"tabler-arrow-narrow-left",to:a(q)},{default:l(()=>r[9]||(r[9]=[f(" Utilisateurs ")])),_:1},8,["to"])]),_:1}),e(n,{cols:"1",class:"text-right"},{default:l(()=>[e(v,{"append-icon":"tabler-eye",to:{name:"user-id",params:{id:a(y).params.id}}},{default:l(()=>r[10]||(r[10]=[f(" Voir ")])),_:1},8,["to"])]),_:1})]),_:1}),e(V,null,{default:l(()=>[e(n,{md:"12"},{default:l(()=>[e(Y,{class:"mb-6",title:"Modification du user de comité"},{default:l(()=>[e(Z,null,{default:l(()=>[e(V,null,{default:l(()=>[e(n,{cols:"12",md:"12",lg:"6"},{default:l(()=>[e(s,{modelValue:a(o).name,"onUpdate:modelValue":r[0]||(r[0]=t=>a(o).name=t),"error-messages":a(i).name,label:"Nom"},null,8,["modelValue","error-messages"])]),_:1}),e(n,{cols:"12",md:"12",lg:"6"},{default:l(()=>[e(s,{modelValue:a(o).email,"onUpdate:modelValue":r[1]||(r[1]=t=>a(o).email=t),"error-messages":a(i).email,type:"email",label:"Email"},null,8,["modelValue","error-messages"])]),_:1}),e(n,{cols:"12",md:"12",lg:"6"},{default:l(()=>[e(u,{modelValue:a(o).profile,"onUpdate:modelValue":r[2]||(r[2]=t=>a(o).profile=t),items:[{name:"Administrateur",id:"admin"},{name:"Chargé de clientèle",id:"responsible_for_customer"},{name:"Responsable marketing",id:"marketing_manager"},{name:"Chef d'agence",id:"agency_head"},{name:"Controlleur interne",id:"audit_controller"}],"error-messages":a(i).profile,label:"Profile","item-title":"name","item-value":"id",required:""},null,8,["modelValue","error-messages"])]),_:1}),e(n,{cols:"12",md:"12",lg:"6"},{default:l(()=>[e(p,{modelValue:a(o).agency_id,"onUpdate:modelValue":r[3]||(r[3]=t=>a(o).agency_id=t),items:a(D),"error-messages":a(i).agency_id,label:"Agency","item-title":"name","item-value":"id",required:""},null,8,["modelValue","items","error-messages"])]),_:1}),e(n,{cols:"12",md:"12",lg:"6"},{default:l(()=>[e(u,{modelValue:a(o).activated,"onUpdate:modelValue":r[4]||(r[4]=t=>a(o).activated=t),items:[{name:"Activé",id:!0},{name:"Désactivé",id:!1}],"error-messages":a(i).activated,label:"Activation","item-title":"name","item-value":"id",required:""},null,8,["modelValue","error-messages"])]),_:1}),e(n,{cols:"12",md:"12",lg:"6"},{default:l(()=>[e(u,{modelValue:a(o).password_change_required,"onUpdate:modelValue":r[5]||(r[5]=t=>a(o).password_change_required=t),items:[{name:"Obligatoire",id:!0},{name:"Facultatif",id:!1}],"error-messages":a(i).password_change_required,label:"Changement de mot de passe","item-title":"name","item-value":"id",required:""},null,8,["modelValue","error-messages"])]),_:1}),e(n,{cols:"12",md:"12",lg:"12"},{default:l(()=>[e(s,{modelValue:a(o).password,"onUpdate:modelValue":r[6]||(r[6]=t=>a(o).password=t),label:"Password",placeholder:"············",type:a(_)?"text":"password","error-messages":a(i).password,"append-inner-icon":a(_)?"tabler-eye-off":"tabler-eye","onClick:appendInner":r[7]||(r[7]=t=>_.value=!a(_)),class:"mb-8"},null,8,["modelValue","type","error-messages","append-inner-icon"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(n,{cols:"12"},{default:l(()=>[x("div",ee,[r[13]||(r[13]=x("div",{class:"d-flex flex-column justify-center"},null,-1)),x("div",re,[e(v,{type:"reset",variant:"tonal",color:"primary"},{default:l(()=>[e(E,{start:"",icon:"tabler-circle-minus"}),r[11]||(r[11]=f(" Effacer "))]),_:1}),e(v,{type:"submit",class:"me-3"},{default:l(()=>[r[12]||(r[12]=f(" Enregistrer ")),e(E,{end:"",icon:"tabler-checkbox"})]),_:1})])])]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1}),e(W,{modelValue:a(g),"onUpdate:modelValue":r[8]||(r[8]=t=>L(g)?g.value=t:null),transition:"scale-transition",location:"top end",color:a(U)},{default:l(()=>[f(J(a(w)),1)]),_:1},8,["modelValue","color"])],64)}}};export{Ee as default};
