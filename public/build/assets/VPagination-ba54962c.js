import{h as gt,o as ft,j as mt,w as bt,a as r,l as Ve,D as _,H as M,g as w,an as De,ai as H,ak as U,a6 as fe,G as N,ah as oe,V as A,ao as yt,n as $,ac as G,r as Q,ap as W,aq as me,ar as _e,aa as T,as as ee,at as Y,X as q,au as ht,av as pt,a9 as St,J as z,aw as Pt,F as K,d as xe,s as we,t as xt,Y as Be,a7 as Ce,Z as Le,af as Ae,ag as $e,a8 as wt,ax as Z,ay as kt,P as ke,ab as te,az as Tt,aA as It,aB as Vt,aC as Dt,aD as _t,aE as Bt,$ as Ct,a0 as Lt,W as At,a2 as $t,aF as Te,y as Ie}from"./main-6c5357b5.js";import{a as Ft,V as be,b as Et,u as Rt}from"./AppAutocomplete-da2ee21a.js";const ia={__name:"DialogCloseBtn",props:{icon:{type:String,required:!1,default:"tabler-x"},iconSize:{type:String,required:!1,default:"20"}},setup(e){const l=e;return(a,t)=>{const n=gt("IconBtn");return ft(),mt(n,{variant:"elevated",class:"v-dialog-close-btn"},{default:bt(()=>[r(Ve,{icon:l.icon,size:l.iconSize},null,8,["icon","size"])]),_:1})}}};const Fe=_({page:{type:[Number,String],default:1},itemsPerPage:{type:[Number,String],default:10}},"DataTable-paginate"),Ee=Symbol.for("vuetify:data-table-pagination");function Re(e){const l=M(e,"page",void 0,t=>+(t??1)),a=M(e,"itemsPerPage",void 0,t=>+(t??10));return{page:l,itemsPerPage:a}}function Ne(e){const{page:l,itemsPerPage:a,itemsLength:t}=e,n=w(()=>a.value===-1?0:a.value*(l.value-1)),u=w(()=>a.value===-1?t.value:Math.min(t.value,n.value+a.value)),d=w(()=>a.value===-1||t.value===0?1:Math.ceil(t.value/a.value));De(()=>{l.value>d.value&&(l.value=d.value)});function s(v){a.value=v,l.value=1}function o(){l.value=fe(l.value+1,1,d.value)}function c(){l.value=fe(l.value-1,1,d.value)}function i(v){l.value=fe(v,1,d.value)}const b={page:l,itemsPerPage:a,startIndex:n,stopIndex:u,pageCount:d,itemsLength:t,nextPage:o,prevPage:c,setPage:i,setItemsPerPage:s};return H(Ee,b),b}function Nt(){const e=U(Ee);if(!e)throw new Error("Missing pagination!");return e}function Ot(e){const{items:l,startIndex:a,stopIndex:t,itemsPerPage:n}=e;return{paginatedItems:w(()=>n.value<=0?l.value:l.value.slice(a.value,t.value))}}const ye=_({prevIcon:{type:String,default:"$prev"},nextIcon:{type:String,default:"$next"},firstIcon:{type:String,default:"$first"},lastIcon:{type:String,default:"$last"},itemsPerPageText:{type:String,default:"$vuetify.dataFooter.itemsPerPageText"},pageText:{type:String,default:"$vuetify.dataFooter.pageText"},firstPageLabel:{type:String,default:"$vuetify.dataFooter.firstPage"},prevPageLabel:{type:String,default:"$vuetify.dataFooter.prevPage"},nextPageLabel:{type:String,default:"$vuetify.dataFooter.nextPage"},lastPageLabel:{type:String,default:"$vuetify.dataFooter.lastPage"},itemsPerPageOptions:{type:Array,default:()=>[{value:10,title:"10"},{value:25,title:"25"},{value:50,title:"50"},{value:100,title:"100"},{value:-1,title:"$vuetify.dataFooter.itemsPerPageAll"}]},showCurrentPage:Boolean},"VDataTableFooter"),ae=N()({name:"VDataTableFooter",props:ye(),setup(e,l){let{slots:a}=l;const{t}=oe(),{page:n,pageCount:u,startIndex:d,stopIndex:s,itemsLength:o,itemsPerPage:c,setItemsPerPage:i}=Nt(),b=w(()=>e.itemsPerPageOptions.map(v=>typeof v=="number"?{value:v,title:v===-1?t("$vuetify.dataFooter.itemsPerPageAll"):String(v)}:{...v,title:t(v.title)}));return()=>{var v;return r("div",{class:"v-data-table-footer"},[(v=a.prepend)==null?void 0:v.call(a),r("div",{class:"v-data-table-footer__items-per-page"},[r("span",null,[t(e.itemsPerPageText)]),r(Ft,{items:b.value,modelValue:c.value,"onUpdate:modelValue":y=>i(Number(y)),density:"compact",variant:"outlined","hide-details":!0},null)]),r("div",{class:"v-data-table-footer__info"},[r("div",null,[t(e.pageText,o.value?d.value+1:0,s.value,o.value)])]),r("div",{class:"v-data-table-footer__pagination"},[r(A,{icon:e.firstIcon,variant:"plain",onClick:()=>n.value=1,disabled:n.value===1,"aria-label":t(e.firstPageLabel)},null),r(A,{icon:e.prevIcon,variant:"plain",onClick:()=>n.value=Math.max(1,n.value-1),disabled:n.value===1,"aria-label":t(e.prevPageLabel)},null),e.showCurrentPage&&r("span",{key:"page",class:"v-data-table-footer__page"},[n.value]),r(A,{icon:e.nextIcon,variant:"plain",onClick:()=>n.value=Math.min(u.value,n.value+1),disabled:n.value===u.value,"aria-label":t(e.nextPageLabel)},null),r(A,{icon:e.lastIcon,variant:"plain",onClick:()=>n.value=u.value,disabled:n.value===u.value,"aria-label":t(e.lastPageLabel)},null)])])}}}),he=yt({align:{type:String,default:"start"},fixed:Boolean,fixedOffset:[Number,String],height:[Number,String],lastFixed:Boolean,noPadding:Boolean,tag:String,width:[Number,String]},(e,l)=>{let{slots:a,attrs:t}=l;const n=e.tag??"td";return r(n,$({class:["v-data-table__td",{"v-data-table-column--fixed":e.fixed,"v-data-table-column--last-fixed":e.lastFixed,"v-data-table-column--no-padding":e.noPadding},`v-data-table-column--align-${e.align}`],style:{height:G(e.height),width:G(e.width),left:G(e.fixedOffset||null)}},t),{default:()=>{var u;return[(u=a.default)==null?void 0:u.call(a)]}})}),Gt=_({headers:{type:Array,default:()=>[]}},"DataTable-header"),Oe=Symbol.for("vuetify:data-table-headers");function Ge(e,l){const a=Q([]),t=Q([]);De(()=>{var y,S,p;const u=e.headers.length?Array.isArray(e.headers[0])?e.headers:[e.headers]:[],d=u.flatMap((g,f)=>g.map(P=>({column:P,row:f}))),s=u.length,o={title:"",sortable:!1},c={...o,width:48};if((y=l==null?void 0:l.groupBy)!=null&&y.value.length){const g=d.findIndex(f=>{let{column:P}=f;return P.key==="data-table-group"});g<0?d.unshift({column:{...o,key:"data-table-group",title:"Group",rowspan:s},row:0}):d.splice(g,1,{column:{...o,...d[g].column},row:d[g].row})}if((S=l==null?void 0:l.showSelect)!=null&&S.value){const g=d.findIndex(f=>{let{column:P}=f;return P.key==="data-table-select"});g<0?d.unshift({column:{...c,key:"data-table-select",rowspan:s},row:0}):d.splice(g,1,{column:{...c,...d[g].column},row:d[g].row})}if((p=l==null?void 0:l.showExpand)!=null&&p.value){const g=d.findIndex(f=>{let{column:P}=f;return P.key==="data-table-expand"});g<0?d.push({column:{...c,key:"data-table-expand",rowspan:s},row:0}):d.splice(g,1,{column:{...c,...d[g].column},row:d[g].row})}const i=W(s).map(()=>[]),b=W(s).fill(0);d.forEach(g=>{let{column:f,row:P}=g;const B=f.key??(typeof f.value=="string"?f.value:null),I=f.value??f.key??null;for(let m=P;m<=P+(f.rowspan??1)-1;m++)i[m].push({...f,key:B,value:I,fixedOffset:b[m],sortable:f.sortable??B!=null}),b[m]+=Number(f.width??0)}),i.forEach(g=>{for(let f=g.length;f--;f>=0)if(g[f].fixed){g[f].lastFixed=!0;return}});const v=new Set;a.value=i.map(g=>{const f=[];for(const P of g)v.has(P.key)||(v.add(P.key),f.push(P));return f}),t.value=i.at(-1)??[]});const n={headers:a,columns:t};return H(Oe,n),n}function ue(){const e=U(Oe);if(!e)throw new Error("Missing headers!");return e}const Mt={showSelectAll:!1,allSelected:()=>[],select:e=>{var t;let{items:l,value:a}=e;return new Set(a?[(t=l[0])==null?void 0:t.value]:[])},selectAll:e=>{let{selected:l}=e;return l}},Me={showSelectAll:!0,allSelected:e=>{let{currentPage:l}=e;return l},select:e=>{let{items:l,value:a,selected:t}=e;for(const n of l)a?t.add(n.value):t.delete(n.value);return t},selectAll:e=>{let{value:l,currentPage:a,selected:t}=e;return Me.select({items:a,value:l,selected:t})}},He={showSelectAll:!0,allSelected:e=>{let{allItems:l}=e;return l},select:e=>{let{items:l,value:a,selected:t}=e;for(const n of l)a?t.add(n.value):t.delete(n.value);return t},selectAll:e=>{let{value:l,allItems:a,selected:t}=e;return He.select({items:a,value:l,selected:t})}},Ht=_({showSelect:Boolean,selectStrategy:{type:[String,Object],default:"page"},modelValue:{type:Array,default:()=>[]},valueComparator:{type:Function,default:_e}},"DataTable-select"),ze=Symbol.for("vuetify:data-table-selection");function je(e,l){let{allItems:a,currentPage:t}=l;const n=M(e,"modelValue",e.modelValue,g=>new Set(me(g).map(f=>{var P;return((P=a.value.find(B=>e.valueComparator(f,B.value)))==null?void 0:P.value)??f})),g=>[...g.values()]),u=w(()=>a.value.filter(g=>g.selectable)),d=w(()=>t.value.filter(g=>g.selectable)),s=w(()=>{if(typeof e.selectStrategy=="object")return e.selectStrategy;switch(e.selectStrategy){case"single":return Mt;case"all":return He;case"page":default:return Me}});function o(g){return me(g).every(f=>n.value.has(f.value))}function c(g){return me(g).some(f=>n.value.has(f.value))}function i(g,f){const P=s.value.select({items:g,value:f,selected:new Set(n.value)});n.value=P}function b(g){i([g],!o([g]))}function v(g){const f=s.value.selectAll({value:g,allItems:u.value,currentPage:d.value,selected:new Set(n.value)});n.value=f}const y=w(()=>n.value.size>0),S=w(()=>{const g=s.value.allSelected({allItems:u.value,currentPage:d.value});return!!g.length&&o(g)}),p={toggleSelect:b,select:i,selectAll:v,isSelected:o,isSomeSelected:c,someSelected:y,allSelected:S,showSelectAll:s.value.showSelectAll};return H(ze,p),p}function se(){const e=U(ze);if(!e)throw new Error("Missing selection!");return e}const zt=_({sortBy:{type:Array,default:()=>[]},customKeySort:Object,multiSort:Boolean,mustSort:Boolean},"DataTable-sort"),We=Symbol.for("vuetify:data-table-sort");function qe(e){const l=M(e,"sortBy"),a=T(e,"mustSort"),t=T(e,"multiSort");return{sortBy:l,mustSort:a,multiSort:t}}function Ke(e){const{sortBy:l,mustSort:a,multiSort:t,page:n}=e,u=o=>{if(o.key==null)return;let c=l.value.map(b=>({...b}))??[];const i=c.find(b=>b.key===o.key);i?i.order==="desc"?a.value?i.order="asc":c=c.filter(b=>b.key!==o.key):i.order="desc":t.value?c=[...c,{key:o.key,order:"asc"}]:c=[{key:o.key,order:"asc"}],l.value=c,n&&(n.value=1)};function d(o){return!!l.value.find(c=>c.key===o.key)}const s={sortBy:l,toggleSort:u,isSorted:d};return H(We,s),s}function jt(){const e=U(We);if(!e)throw new Error("Missing sort!");return e}function Wt(e,l,a){const t=oe();return{sortedItems:w(()=>a.value.length?qt(l.value,a.value,t.current.value,e.customKeySort):l.value)}}function qt(e,l,a,t){const n=new Intl.Collator(a,{sensitivity:"accent",usage:"sort"});return[...e].sort((u,d)=>{for(let s=0;s<l.length;s++){const o=l[s].key,c=l[s].order??"asc";if(c===!1)continue;let i=ee(u.raw,o),b=ee(d.raw,o);if(c==="desc"&&([i,b]=[b,i]),t!=null&&t[o]){const v=t[o](i,b);if(!v)continue;return v}if(i instanceof Date&&b instanceof Date)return i.getTime()-b.getTime();if([i,b]=[i,b].map(v=>v!=null?v.toString().toLocaleLowerCase():v),i!==b)return Y(i)&&Y(b)?0:Y(i)?-1:Y(b)?1:!isNaN(i)&&!isNaN(b)?Number(i)-Number(b):n.compare(i,b)}return 0})}const Ue=_({color:String,sticky:Boolean,multiSort:Boolean,sortAscIcon:{type:q,default:"$sortAsc"},sortDescIcon:{type:q,default:"$sortDesc"},...ht()},"VDataTableHeaders"),le=N()({name:"VDataTableHeaders",props:Ue(),setup(e,l){let{slots:a,emit:t}=l;const{toggleSort:n,sortBy:u,isSorted:d}=jt(),{someSelected:s,allSelected:o,selectAll:c,showSelectAll:i}=se(),{columns:b,headers:v}=ue(),{loaderClasses:y}=pt(e),S=(I,m)=>{if(!(!e.sticky&&!I.fixed))return{position:"sticky",zIndex:I.fixed?4:e.sticky?3:void 0,left:I.fixed?G(I.fixedOffset):void 0,top:e.sticky?`calc(var(--v-table-header-height) * ${m})`:void 0}};function p(I){const m=u.value.find(C=>C.key===I.key);return m?m.order==="asc"?e.sortAscIcon:e.sortDescIcon:e.sortAscIcon}const{backgroundColorClasses:g,backgroundColorStyles:f}=St(e,"color"),P=w(()=>({headers:v.value,columns:b.value,toggleSort:n,isSorted:d,sortBy:u.value,someSelected:s.value,allSelected:o.value,selectAll:c,getSortIcon:p,getFixedStyles:S})),B=I=>{let{column:m,x:C,y:R}=I;const h=m.key==="data-table-select"||m.key==="data-table-expand";return r(he,{tag:"th",align:m.align,class:["v-data-table__th",{"v-data-table__th--sortable":m.sortable,"v-data-table__th--sorted":d(m)},y.value],style:{width:G(m.width),minWidth:G(m.width),...S(m,R)},colspan:m.colspan,rowspan:m.rowspan,onClick:m.sortable?()=>n(m):void 0,lastFixed:m.lastFixed,noPadding:h},{default:()=>{var V;const x=`column.${m.key}`,k={column:m,selectAll:c,isSorted:d,toggleSort:n,sortBy:u.value,someSelected:s.value,allSelected:o.value,getSortIcon:p};return a[x]?a[x](k):m.key==="data-table-select"?((V=a["column.data-table-select"])==null?void 0:V.call(a,k))??(i&&r(be,{modelValue:o.value,indeterminate:s.value&&!o.value,"onUpdate:modelValue":c},null)):r("div",{class:"v-data-table-header__content"},[r("span",null,[m.title]),m.sortable&&r(Ve,{key:"icon",class:"v-data-table-header__sort-icon",icon:p(m)},null),e.multiSort&&d(m)&&r("div",{key:"badge",class:["v-data-table-header__sort-badge",...g.value],style:f.value},[u.value.findIndex(D=>D.key===m.key)+1])])}})};z(()=>r(K,null,[a.headers?a.headers(P.value):v.value.map((I,m)=>r("tr",null,[I.map((C,R)=>r(B,{column:C,x:R,y:m},null))])),e.loading&&r("tr",{class:"v-data-table-progress"},[r("th",{colspan:b.value.length},[r(Pt,{name:"v-data-table-progress",active:!0,color:typeof e.loading=="boolean"?void 0:e.loading,indeterminate:!0},{default:a.loader})])])]))}}),Kt=_({groupBy:{type:Array,default:()=>[]}},"DataTable-group"),Xe=Symbol.for("vuetify:data-table-group");function Je(e){return{groupBy:M(e,"groupBy")}}function Ye(e){const{groupBy:l,sortBy:a}=e,t=Q(new Set),n=w(()=>l.value.map(c=>({...c,order:c.order??!1})).concat(a.value));function u(c){return t.value.has(c.id)}function d(c){const i=new Set(t.value);u(c)?i.delete(c.id):i.add(c.id),t.value=i}function s(c){function i(b){const v=[];for(const y of b.items)"type"in y&&y.type==="group"?v.push(...i(y)):v.push(y);return v}return i({type:"group",items:c,id:"dummy",key:"dummy",value:"dummy",depth:0})}const o={sortByWithGroups:n,toggleGroup:d,opened:t,groupBy:l,extractRows:s,isGroupOpen:u};return H(Xe,o),o}function Ze(){const e=U(Xe);if(!e)throw new Error("Missing group!");return e}function Ut(e,l){if(!e.length)return[];const a=new Map;for(const t of e){const n=ee(t.raw,l);a.has(n)||a.set(n,[]),a.get(n).push(t)}return a}function Qe(e,l){let a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,t=arguments.length>3&&arguments[3]!==void 0?arguments[3]:"root";if(!l.length)return[];const n=Ut(e,l[0]),u=[],d=l.slice(1);return n.forEach((s,o)=>{const c=l[0],i=`${t}_${c}_${o}`;u.push({depth:a,id:i,key:c,value:o,items:d.length?Qe(s,d,a+1,i):s,type:"group"})}),u}function et(e,l){const a=[];for(const t of e)"type"in t&&t.type==="group"?(t.value!=null&&a.push(t),(l.has(t.id)||t.value==null)&&a.push(...et(t.items,l))):a.push(t);return a}function tt(e,l,a){return{flatItems:w(()=>{if(!l.value.length)return e.value;const n=Qe(e.value,l.value.map(u=>u.key));return et(n,a.value)})}}const Xt=_({item:{type:Object,required:!0}},"VDataTableGroupHeaderRow"),Jt=N()({name:"VDataTableGroupHeaderRow",props:Xt(),setup(e,l){let{slots:a}=l;const{isGroupOpen:t,toggleGroup:n,extractRows:u}=Ze(),{isSelected:d,isSomeSelected:s,select:o}=se(),{columns:c}=ue(),i=w(()=>u([e.item]));return()=>r("tr",{class:"v-data-table-group-header-row",style:{"--v-data-table-group-header-row-depth":e.item.depth}},[c.value.map(b=>{var v,y;if(b.key==="data-table-group"){const S=t(e.item)?"$expand":"$next",p=()=>n(e.item);return((v=a["data-table-group"])==null?void 0:v.call(a,{item:e.item,count:i.value.length,props:{icon:S,onClick:p}}))??r(he,{class:"v-data-table-group-header-row__column"},{default:()=>[r(A,{size:"small",variant:"text",icon:S,onClick:p},null),r("span",null,[e.item.value]),r("span",null,[xe("("),i.value.length,xe(")")])]})}if(b.key==="data-table-select"){const S=d(i.value),p=s(i.value)&&!S,g=f=>o(i.value,f);return((y=a["data-table-select"])==null?void 0:y.call(a,{props:{modelValue:S,indeterminate:p,"onUpdate:modelValue":g}}))??r("td",null,[r(be,{modelValue:S,indeterminate:p,"onUpdate:modelValue":g},null)])}return r("td",null,null)})])}}),Yt=_({expandOnClick:Boolean,showExpand:Boolean,expanded:{type:Array,default:()=>[]}},"DataTable-expand"),at=Symbol.for("vuetify:datatable:expanded");function lt(e){const l=T(e,"expandOnClick"),a=M(e,"expanded",e.expanded,s=>new Set(s),s=>[...s.values()]);function t(s,o){const c=new Set(a.value);o?c.add(s.value):c.delete(s.value),a.value=c}function n(s){return a.value.has(s.value)}function u(s){t(s,!n(s))}const d={expand:t,expanded:a,expandOnClick:l,isExpanded:n,toggleExpand:u};return H(at,d),d}function nt(){const e=U(at);if(!e)throw new Error("foo");return e}const Zt=_({index:Number,item:Object,onClick:Function},"VDataTableRow"),Qt=N()({name:"VDataTableRow",props:Zt(),setup(e,l){let{slots:a}=l;const{isSelected:t,toggleSelect:n}=se(),{isExpanded:u,toggleExpand:d}=nt(),{columns:s}=ue();z(()=>r("tr",{class:["v-data-table__tr",{"v-data-table__tr--clickable":!!e.onClick}],onClick:e.onClick},[e.item&&s.value.map((o,c)=>r(he,{align:o.align,fixed:o.fixed,fixedOffset:o.fixedOffset,lastFixed:o.lastFixed,noPadding:o.key==="data-table-select"||o.key==="data-table-expand",width:o.width},{default:()=>{var y,S;const i=e.item,b=`item.${o.key}`,v={index:e.index,item:i.raw,internalItem:i,value:ee(i.columns,o.key),column:o,isSelected:t,toggleSelect:n,isExpanded:u,toggleExpand:d};return a[b]?a[b](v):o.key==="data-table-select"?((y=a["item.data-table-select"])==null?void 0:y.call(a,v))??r(be,{disabled:!i.selectable,modelValue:t([i]),onClick:we(()=>n(i),["stop"])},null):o.key==="data-table-expand"?((S=a["item.data-table-expand"])==null?void 0:S.call(a,v))??r(A,{icon:u(i)?"$collapse":"$expand",size:"small",variant:"text",onClick:we(()=>d(i),["stop"])},null):xt(v.value)}}))]))}}),rt=_({loading:[Boolean,String],loadingText:{type:String,default:"$vuetify.dataIterator.loadingText"},hideNoData:Boolean,items:{type:Array,default:()=>[]},noDataText:{type:String,default:"$vuetify.noDataText"},rowHeight:Number,"onClick:row":Function},"VDataTableRows"),ne=N()({name:"VDataTableRows",props:rt(),setup(e,l){let{emit:a,slots:t}=l;const{columns:n}=ue(),{expandOnClick:u,toggleExpand:d,isExpanded:s}=nt(),{isSelected:o,toggleSelect:c}=se(),{toggleGroup:i,isGroupOpen:b}=Ze(),{t:v}=oe();return z(()=>{var y,S;return e.loading?r("tr",{class:"v-data-table-rows-loading",key:"loading"},[r("td",{colspan:n.value.length},[((y=t.loading)==null?void 0:y.call(t))??v(e.loadingText)])]):!e.loading&&!e.items.length&&!e.hideNoData?r("tr",{class:"v-data-table-rows-no-data",key:"no-data"},[r("td",{colspan:n.value.length},[((S=t["no-data"])==null?void 0:S.call(t))??v(e.noDataText)])]):r(K,null,[e.items.map((p,g)=>{var B;if(p.type==="group")return t["group-header"]?t["group-header"]({index:g,item:p,columns:n.value,isExpanded:s,toggleExpand:d,isSelected:o,toggleSelect:c,toggleGroup:i,isGroupOpen:b}):r(Jt,{key:`group-header_${p.id}`,item:p},t);const f={index:g,item:p.raw,internalItem:p,columns:n.value,isExpanded:s,toggleExpand:d,isSelected:o,toggleSelect:c},P={...f,props:{key:`item_${p.key??p.index}`,onClick:u.value||e["onClick:row"]?I=>{var m;u.value&&d(p),(m=e["onClick:row"])==null||m.call(e,I,{item:p.raw,internalItem:p})}:void 0,index:g,item:p}};return r(K,null,[t.item?t.item(P):r(Qt,P.props,t),s(p)&&((B=t["expanded-row"])==null?void 0:B.call(t,f))])})])}),{}}});const ot=_({fixedHeader:Boolean,fixedFooter:Boolean,height:[Number,String],hover:Boolean,...Be(),...Ce(),...Le(),...Ae()},"VTable"),re=N()({name:"VTable",props:ot(),setup(e,l){let{slots:a}=l;const{themeClasses:t}=$e(e),{densityClasses:n}=wt(e);return z(()=>r(e.tag,{class:["v-table",{"v-table--fixed-height":!!e.height,"v-table--fixed-header":e.fixedHeader,"v-table--fixed-footer":e.fixedFooter,"v-table--has-top":!!a.top,"v-table--has-bottom":!!a.bottom,"v-table--hover":e.hover},t.value,n.value,e.class],style:e.style},{default:()=>{var u,d,s;return[(u=a.top)==null?void 0:u.call(a),a.default?r("div",{class:"v-table__wrapper",style:{height:G(e.height)}},[r("table",null,[a.default()])]):(d=a.wrapper)==null?void 0:d.call(a),(s=a.bottom)==null?void 0:s.call(a)]}})),{}}}),ea=_({items:{type:Array,default:()=>[]},itemValue:{type:[String,Array,Function],default:"id"},itemSelectable:{type:[String,Array,Function],default:null},returnObject:Boolean},"DataTable-items");function ta(e,l,a,t){const n=e.returnObject?l:Z(l,e.itemValue),u=Z(l,e.itemSelectable,!0),d=t.reduce((s,o)=>(o.key!=null&&(s[o.key]=Z(l,o.value)),s),{});return{type:"item",key:e.returnObject?Z(l,e.itemValue):n,index:a,value:n,selectable:u,columns:d,raw:l}}function aa(e,l,a){return l.map((t,n)=>ta(e,t,n,a))}function ut(e,l){return{items:w(()=>aa(e,e.items,l.value))}}function st(e){let{page:l,itemsPerPage:a,sortBy:t,groupBy:n,search:u}=e;const d=kt("VDataTable"),s=w(()=>({page:l.value,itemsPerPage:a.value,sortBy:t.value,groupBy:n.value,search:u.value}));ke(()=>u==null?void 0:u.value,()=>{l.value=1});let o=null;ke(s,()=>{_e(o,s.value)||(d.emit("update:options",s.value),o=s.value)},{deep:!0,immediate:!0})}const it=_({...rt(),width:[String,Number],search:String,...Yt(),...Kt(),...Gt(),...ea(),...Ht(),...zt(),...Ue(),...ot()},"DataTable"),la=_({...Fe(),...it(),...Et(),...ye()},"VDataTable");N()({name:"VDataTable",props:la(),emits:{"update:modelValue":e=>!0,"update:page":e=>!0,"update:itemsPerPage":e=>!0,"update:sortBy":e=>!0,"update:options":e=>!0,"update:groupBy":e=>!0,"update:expanded":e=>!0},setup(e,l){let{emit:a,slots:t}=l;const{groupBy:n}=Je(e),{sortBy:u,multiSort:d,mustSort:s}=qe(e),{page:o,itemsPerPage:c}=Re(e),{columns:i,headers:b}=Ge(e,{groupBy:n,showSelect:T(e,"showSelect"),showExpand:T(e,"showExpand")}),{items:v}=ut(e,i),y=T(e,"search"),{filteredItems:S}=Rt(e,v,y,{transform:j=>j.columns}),{toggleSort:p}=Ke({sortBy:u,multiSort:d,mustSort:s,page:o}),{sortByWithGroups:g,opened:f,extractRows:P,isGroupOpen:B,toggleGroup:I}=Ye({groupBy:n,sortBy:u}),{sortedItems:m}=Wt(e,S,g),{flatItems:C}=tt(m,n,f),R=w(()=>C.value.length),{startIndex:h,stopIndex:x,pageCount:k,setItemsPerPage:V}=Ne({page:o,itemsPerPage:c,itemsLength:R}),{paginatedItems:D}=Ot({items:C,startIndex:h,stopIndex:x,itemsPerPage:c}),F=w(()=>P(D.value)),{isSelected:ie,select:E,selectAll:de,toggleSelect:ce,someSelected:ve,allSelected:ge}=je(e,{allItems:v,currentPage:F}),{isExpanded:O,toggleExpand:J}=lt(e);st({page:o,itemsPerPage:c,sortBy:u,groupBy:n,search:y}),te({VDataTableRows:{hideNoData:T(e,"hideNoData"),noDataText:T(e,"noDataText"),loading:T(e,"loading"),loadingText:T(e,"loadingText")}});const L=w(()=>({page:o.value,itemsPerPage:c.value,sortBy:u.value,pageCount:k.value,toggleSort:p,setItemsPerPage:V,someSelected:ve.value,allSelected:ge.value,isSelected:ie,select:E,selectAll:de,toggleSelect:ce,isExpanded:O,toggleExpand:J,isGroupOpen:B,toggleGroup:I,items:F.value,groupedItems:D.value,columns:i.value,headers:b.value}));return z(()=>{const[j]=ae.filterProps(e),[dt]=le.filterProps(e),[ct]=ne.filterProps(e),[vt]=re.filterProps(e);return r(re,$({class:["v-data-table",{"v-data-table--show-select":e.showSelect,"v-data-table--loading":e.loading},e.class],style:e.style},vt),{top:()=>{var X;return(X=t.top)==null?void 0:X.call(t,L.value)},default:()=>{var X,pe,Se,Pe;return t.default?t.default(L.value):r(K,null,[(X=t.colgroup)==null?void 0:X.call(t,L.value),r("thead",null,[r(le,dt,t)]),(pe=t.thead)==null?void 0:pe.call(t,L.value),r("tbody",null,[t.body?t.body(L.value):r(ne,$(ct,{items:D.value}),t)]),(Se=t.tbody)==null?void 0:Se.call(t,L.value),(Pe=t.tfoot)==null?void 0:Pe.call(t,L.value)])},bottom:()=>t.bottom?t.bottom(L.value):r(K,null,[r(ae,j,{prepend:t["footer.prepend"]})])})}),{}}});const na=_({itemsLength:{type:[Number,String],required:!0},...Fe(),...it(),...ye()},"VDataTableServer"),da=N()({name:"VDataTableServer",props:na(),emits:{"update:modelValue":e=>!0,"update:page":e=>!0,"update:itemsPerPage":e=>!0,"update:sortBy":e=>!0,"update:options":e=>!0,"update:expanded":e=>!0,"update:groupBy":e=>!0},setup(e,l){let{emit:a,slots:t}=l;const{groupBy:n}=Je(e),{sortBy:u,multiSort:d,mustSort:s}=qe(e),{page:o,itemsPerPage:c}=Re(e),i=w(()=>parseInt(e.itemsLength,10)),{columns:b,headers:v}=Ge(e,{groupBy:n,showSelect:T(e,"showSelect"),showExpand:T(e,"showExpand")}),{items:y}=ut(e,b),{toggleSort:S}=Ke({sortBy:u,multiSort:d,mustSort:s,page:o}),{opened:p,isGroupOpen:g,toggleGroup:f,extractRows:P}=Ye({groupBy:n,sortBy:u}),{pageCount:B,setItemsPerPage:I}=Ne({page:o,itemsPerPage:c,itemsLength:i}),{flatItems:m}=tt(y,n,p),{isSelected:C,select:R,selectAll:h,toggleSelect:x,someSelected:k,allSelected:V}=je(e,{allItems:y,currentPage:y}),{isExpanded:D,toggleExpand:F}=lt(e),ie=w(()=>P(y.value));st({page:o,itemsPerPage:c,sortBy:u,groupBy:n,search:T(e,"search")}),H("v-data-table",{toggleSort:S,sortBy:u}),te({VDataTableRows:{hideNoData:T(e,"hideNoData"),noDataText:T(e,"noDataText"),loading:T(e,"loading"),loadingText:T(e,"loadingText")}});const E=w(()=>({page:o.value,itemsPerPage:c.value,sortBy:u.value,pageCount:B.value,toggleSort:S,setItemsPerPage:I,someSelected:k.value,allSelected:V.value,isSelected:C,select:R,selectAll:h,toggleSelect:x,isExpanded:D,toggleExpand:F,isGroupOpen:g,toggleGroup:f,items:ie.value,groupedItems:m.value,columns:b.value,headers:v.value}));z(()=>{const[de]=ae.filterProps(e),[ce]=le.filterProps(e),[ve]=ne.filterProps(e),[ge]=re.filterProps(e);return r(re,$({class:["v-data-table",{"v-data-table--loading":e.loading},e.class],style:e.style},ge),{top:()=>{var O;return(O=t.top)==null?void 0:O.call(t,E.value)},default:()=>{var O,J,L,j;return t.default?t.default(E.value):r(K,null,[(O=t.colgroup)==null?void 0:O.call(t,E.value),r("thead",{class:"v-data-table__thead",role:"rowgroup"},[r(le,$(ce,{sticky:e.fixedHeader}),t)]),(J=t.thead)==null?void 0:J.call(t,E.value),r("tbody",{class:"v-data-table__tbody",role:"rowgroup"},[t.body?t.body(E.value):r(ne,$(ve,{items:m.value}),t)]),(L=t.tbody)==null?void 0:L.call(t,E.value),(j=t.tfoot)==null?void 0:j.call(t,E.value)])},bottom:()=>t.bottom?t.bottom(E.value):r(ae,de,{prepend:t["footer.prepend"]})})})}}),ca=(e,l)=>{const a=(e.page-1)*e.itemsPerPage+1,t=Math.min(e.page*e.itemsPerPage,l);return`Entrée ${l===0?0:a} à ${t} sur ${l} Entrées`};function ra(){const e=Q([]);Tt(()=>e.value=[]);function l(a,t){e.value[t]=a}return{refs:e,updateRef:l}}const oa=_({activeColor:String,start:{type:[Number,String],default:1},modelValue:{type:Number,default:e=>e.start},disabled:Boolean,length:{type:[Number,String],default:1,validator:e=>e%1===0},totalVisible:[Number,String],firstIcon:{type:q,default:"$first"},prevIcon:{type:q,default:"$prev"},nextIcon:{type:q,default:"$next"},lastIcon:{type:q,default:"$last"},ariaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.root"},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},firstAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.first"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},lastAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.last"},ellipsis:{type:String,default:"..."},showFirstLastPage:Boolean,...It(),...Be(),...Ce(),...Vt(),...Dt(),..._t(),...Le({tag:"nav"}),...Ae(),...Bt({variant:"text"})},"VPagination"),va=N()({name:"VPagination",props:oa(),emits:{"update:modelValue":e=>!0,first:e=>!0,prev:e=>!0,next:e=>!0,last:e=>!0},setup(e,l){let{slots:a,emit:t}=l;const n=M(e,"modelValue"),{t:u,n:d}=oe(),{isRtl:s}=Ct(),{themeClasses:o}=$e(e),{width:c}=Lt(),i=At(-1);te(void 0,{scoped:!0});const{resizeRef:b}=$t(h=>{if(!h.length)return;const{target:x,contentRect:k}=h[0],V=x.querySelector(".v-pagination__list > *");if(!V)return;const D=k.width,F=V.offsetWidth+parseFloat(getComputedStyle(V).marginRight)*2;i.value=p(D,F)}),v=w(()=>parseInt(e.length,10)),y=w(()=>parseInt(e.start,10)),S=w(()=>e.totalVisible?parseInt(e.totalVisible,10):i.value>=0?i.value:p(c.value,58));function p(h,x){const k=e.showFirstLastPage?5:3;return Math.max(0,Math.floor(+((h-x*k)/x).toFixed(2)))}const g=w(()=>{if(v.value<=0||isNaN(v.value)||v.value>Number.MAX_SAFE_INTEGER)return[];if(S.value<=1)return[n.value];if(v.value<=S.value)return W(v.value,y.value);const h=S.value%2===0,x=h?S.value/2:Math.floor(S.value/2),k=h?x:x+1,V=v.value-x;if(k-n.value>=0)return[...W(Math.max(1,S.value-1),y.value),e.ellipsis,v.value];if(n.value-V>=(h?1:0)){const D=S.value-1,F=v.value-D+y.value;return[y.value,e.ellipsis,...W(D,F)]}else{const D=Math.max(1,S.value-3),F=D===1?n.value:n.value-Math.ceil(D/2)+y.value;return[y.value,e.ellipsis,...W(D,F),e.ellipsis,v.value]}});function f(h,x,k){h.preventDefault(),n.value=x,k&&t(k,x)}const{refs:P,updateRef:B}=ra();te({VPaginationBtn:{color:T(e,"color"),border:T(e,"border"),density:T(e,"density"),size:T(e,"size"),variant:T(e,"variant"),rounded:T(e,"rounded"),elevation:T(e,"elevation")}});const I=w(()=>g.value.map((h,x)=>{const k=V=>B(V,x);if(typeof h=="string")return{isActive:!1,key:`ellipsis-${x}`,page:h,props:{ref:k,ellipsis:!0,icon:!0,disabled:!0}};{const V=h===n.value;return{isActive:V,key:h,page:d(h),props:{ref:k,ellipsis:!1,icon:!0,disabled:!!e.disabled||+e.length<2,color:V?e.activeColor:e.color,ariaCurrent:V,ariaLabel:u(V?e.currentPageAriaLabel:e.pageAriaLabel,h),onClick:D=>f(D,h)}}}})),m=w(()=>{const h=!!e.disabled||n.value<=y.value,x=!!e.disabled||n.value>=y.value+v.value-1;return{first:e.showFirstLastPage?{icon:s.value?e.lastIcon:e.firstIcon,onClick:k=>f(k,y.value,"first"),disabled:h,ariaLabel:u(e.firstAriaLabel),ariaDisabled:h}:void 0,prev:{icon:s.value?e.nextIcon:e.prevIcon,onClick:k=>f(k,n.value-1,"prev"),disabled:h,ariaLabel:u(e.previousAriaLabel),ariaDisabled:h},next:{icon:s.value?e.prevIcon:e.nextIcon,onClick:k=>f(k,n.value+1,"next"),disabled:x,ariaLabel:u(e.nextAriaLabel),ariaDisabled:x},last:e.showFirstLastPage?{icon:s.value?e.firstIcon:e.lastIcon,onClick:k=>f(k,y.value+v.value-1,"last"),disabled:x,ariaLabel:u(e.lastAriaLabel),ariaDisabled:x}:void 0}});function C(){var x;const h=n.value-y.value;(x=P.value[h])==null||x.$el.focus()}function R(h){h.key===Te.left&&!e.disabled&&n.value>+e.start?(n.value=n.value-1,Ie(C)):h.key===Te.right&&!e.disabled&&n.value<y.value+v.value-1&&(n.value=n.value+1,Ie(C))}return z(()=>r(e.tag,{ref:b,class:["v-pagination",o.value,e.class],style:e.style,role:"navigation","aria-label":u(e.ariaLabel),onKeydown:R,"data-test":"v-pagination-root"},{default:()=>[r("ul",{class:"v-pagination__list"},[e.showFirstLastPage&&r("li",{key:"first",class:"v-pagination__first","data-test":"v-pagination-first"},[a.first?a.first(m.value.first):r(A,$({_as:"VPaginationBtn"},m.value.first),null)]),r("li",{key:"prev",class:"v-pagination__prev","data-test":"v-pagination-prev"},[a.prev?a.prev(m.value.prev):r(A,$({_as:"VPaginationBtn"},m.value.prev),null)]),I.value.map((h,x)=>r("li",{key:h.key,class:["v-pagination__item",{"v-pagination__item--is-active":h.isActive}],"data-test":"v-pagination-item"},[a.item?a.item(h):r(A,$({_as:"VPaginationBtn"},h.props),{default:()=>[h.page]})])),r("li",{key:"next",class:"v-pagination__next","data-test":"v-pagination-next"},[a.next?a.next(m.value.next):r(A,$({_as:"VPaginationBtn"},m.value.next),null)]),e.showFirstLastPage&&r("li",{key:"last",class:"v-pagination__last","data-test":"v-pagination-last"},[a.last?a.last(m.value.last):r(A,$({_as:"VPaginationBtn"},m.value.last),null)])])]})),{}}});export{da as V,ia as _,va as a,ca as p};
