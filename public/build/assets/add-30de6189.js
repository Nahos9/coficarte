import{r as S}from"./validators-be8c4c00.js";import{r as u,f as T,g as $,c as I,b as n,a as r,w as o,s as P,p as R,o as B,u as b,V as x,l as q,d as k,y as F}from"./main-276112f6.js";import{_ as L}from"./AppAutocomplete-44d0561a.js";import{_ as M}from"./AppSelect-64bc018d.js";import{_ as V}from"./AppTextField-b981902d.js";import{$ as N}from"./api-024e2dfc.js";import{u as D}from"./useApi-18850fce.js";import{c as O}from"./createUrl-b8957e91.js";import{_ as H}from"./_plugin-vue_export-helper-c27b6911.js";import{V as z}from"./VForm-e05b516f.js";import{V as G}from"./VSnackbar-ae807d5e.js";import{V as C,a as i}from"./VRow-507d2620.js";import{V as J}from"./VCard-5ab8a938.js";import{V as K}from"./VCardText-bf95dae8.js";import"./VTextField-afd8f7dc.js";import"./VImg-ea895d59.js";import"./VOverlay-4f3d716d.js";import"./VSelect-68002142.js";import"./VList-a42ca4ab.js";import"./VAvatar-3c74ef22.js";import"./VDivider-01cbde56.js";import"./dialog-transition-e4e964c2.js";import"./VMenu-70193b87.js";import"./VChip-f5afc124.js";import"./index-593e39a4.js";import"./useAbility-42453ee0.js";const Q={class:"d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6"},W={class:"d-flex gap-4 align-center flex-wrap"},X=["innerHTML"],Y={__name:"add",async setup(Z){let p,y;const A=R(),l=u({name:"test",email:"test@gmail.com",password:"P@sse123",profile:"marketing_manager",activated:!1,password_change_required:!0,agency_id:1}),w=()=>({name:"",email:"",password:"",profile:"",activated:"",password_change_required:"",agency_id:""}),t=u(w()),_=u(),U=()=>{var m;(m=_.value)==null||m.validate().then(async({valid:a})=>{if(a){const e=await N("/user",{method:"POST",body:{name:l.value.name,email:l.value.email,password:l.value.password,profile:l.value.profile,activated:l.value.activated,password_change_required:l.value.password_change_required,agency_id:l.value.agency_id}});if(t.value=w(),e.status==201)c.value="Utilisateur crée",g.value="success",f.value=!0,A.push("/user");else{e.errors.name&&(t.value.name=e.errors.name[0],e.errors.name=null),e.errors.email&&(t.value.email=e.errors.email[0],e.errors.email=null),e.errors.password&&(t.value.password=e.errors.password[0],e.errors.password=null),e.errors.profile&&(t.value.profile=e.errors.profile[0],e.errors.profile=null),e.errors.activated&&(t.value.activated=e.errors.activated[0],e.errors.activated=null),e.errors.password_change_required&&(t.value.password_change_required=e.errors.password_change_required[0],e.errors.password_change_required=null),e.errors.agency_id&&(t.value.agency_id=e.errors.agency_id[0],e.errors.agency_id=null),c.value="";let d=!1;for(const s in e.errors)e.errors[s]!=null&&(g.value="error",e.errors[s].forEach(E=>{d=!0,c.value+=s+": "+E+"<br>"}));f.value=d}F(()=>{var d;(d=_.value)==null||d.resetValidation()})}})},{data:h}=([p,y]=T(()=>D(O("/agency",{query:{paginate:"false"}}))),p=await p,y(),p),f=u(!1),c=u(""),g=u("success"),j=$(()=>h.value.data),v=u(!1);return(m,a)=>{const e=M,d=L;return B(),I("div",null,[a[12]||(a[12]=n("div",{class:"d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6"},[n("div",{class:"d-flex flex-column justify-center"},[n("h4",{class:"text-h4 font-weight-medium"}," Ajouter un utilisateur "),n("span",null,"Informations sur l'utilisateur")])],-1)),r(z,{ref_key:"refForm",ref:_,onSubmit:P(U,["prevent"])},{default:o(()=>[r(C,null,{default:o(()=>[r(i,{md:"12"},{default:o(()=>[r(J,{class:"mb-6",title:"Information du pv"},{default:o(()=>[r(K,null,{default:o(()=>[r(C,null,{default:o(()=>[r(i,{cols:"12",md:"12",lg:"6"},{default:o(()=>[r(V,{modelValue:l.value.name,"onUpdate:modelValue":a[0]||(a[0]=s=>l.value.name=s),"error-messages":t.value.name,label:"Nom"},null,8,["modelValue","error-messages"])]),_:1}),r(i,{cols:"12",md:"12",lg:"6"},{default:o(()=>[r(V,{modelValue:l.value.email,"onUpdate:modelValue":a[1]||(a[1]=s=>l.value.email=s),"error-messages":t.value.email,type:"email",label:"Email"},null,8,["modelValue","error-messages"])]),_:1}),r(i,{cols:"12",md:"12",lg:"6"},{default:o(()=>[r(e,{modelValue:l.value.profile,"onUpdate:modelValue":a[2]||(a[2]=s=>l.value.profile=s),items:[{name:"Administrateur",id:"admin"},{name:"Chargé de clientèle",id:"responsible_for_customer"},{name:"Responsable marketing",id:"marketing_manager"},{name:"Chef d'agence",id:"agency_head"},{name:"Controlleur interne",id:"audit_controller"},{name:"Chargé d'affaires",id:"caf"},{name:"Operations",id:"ops"}],"error-messages":t.value.profile,label:"Profile","item-title":"name","item-value":"id",required:""},null,8,["modelValue","error-messages"])]),_:1}),r(i,{cols:"12",md:"12",lg:"6"},{default:o(()=>[r(d,{modelValue:l.value.agency_id,"onUpdate:modelValue":a[3]||(a[3]=s=>l.value.agency_id=s),items:b(j),"error-messages":t.value.agency_id,label:"Agency","item-title":"name","item-value":"id",required:""},null,8,["modelValue","items","error-messages"])]),_:1}),r(i,{cols:"12",md:"12",lg:"6"},{default:o(()=>[r(e,{modelValue:l.value.activated,"onUpdate:modelValue":a[4]||(a[4]=s=>l.value.activated=s),items:[{name:"Activé",id:!0},{name:"Désactivé",id:!1}],"error-messages":t.value.activated,label:"Activation","item-title":"name","item-value":"id",required:""},null,8,["modelValue","error-messages"])]),_:1}),r(i,{cols:"12",md:"12",lg:"6"},{default:o(()=>[r(e,{modelValue:l.value.password_change_required,"onUpdate:modelValue":a[5]||(a[5]=s=>l.value.password_change_required=s),items:[{name:"Obligatoire",id:!0},{name:"Facultatif",id:!1}],"error-messages":t.value.password_change_required,label:"Changement de mot de passe","item-title":"name","item-value":"id",required:""},null,8,["modelValue","error-messages"])]),_:1}),r(i,{cols:"12",md:"12",lg:"12"},{default:o(()=>[r(V,{modelValue:l.value.password,"onUpdate:modelValue":a[6]||(a[6]=s=>l.value.password=s),label:"Password",placeholder:"············",rules:["requiredValidator"in m?m.requiredValidator:b(S)],type:v.value?"text":"password","error-messages":t.value.password,"append-inner-icon":v.value?"tabler-eye-off":"tabler-eye","onClick:appendInner":a[7]||(a[7]=s=>v.value=!v.value),class:"mb-8"},null,8,["modelValue","rules","type","error-messages","append-inner-icon"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),r(i,{cols:"12"},{default:o(()=>[n("div",Q,[a[11]||(a[11]=n("div",{class:"d-flex flex-column justify-center"},null,-1)),n("div",W,[r(x,{type:"reset",variant:"tonal",color:"primary"},{default:o(()=>[r(q,{start:"",icon:"tabler-circle-minus"}),a[9]||(a[9]=k(" Effacer "))]),_:1}),r(x,{type:"submit",class:"me-3"},{default:o(()=>[a[10]||(a[10]=k(" Enregistrer ")),r(q,{end:"",icon:"tabler-checkbox"})]),_:1})])])]),_:1})]),_:1})]),_:1},512),r(G,{modelValue:f.value,"onUpdate:modelValue":a[8]||(a[8]=s=>f.value=s),transition:"scale-transition",location:"top end",color:g.value},{default:o(()=>[n("div",{innerHTML:c.value},null,8,X)]),_:1},8,["modelValue","color"])])}}},Ae=H(Y,[["__scopeId","data-v-3fa49c68"]]);export{Ae as default};
