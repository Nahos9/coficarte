import{b0 as E,e as l}from"./main-6c5357b5.js";import{w as q,a as R}from"./index-593e39a4.js";import{u as A}from"./useAbility-0154d632.js";class S extends Error{constructor(r,s){super(r,s),this.name="FetchError",s!=null&&s.cause&&!this.cause&&(this.cause=s.cause)}}function $(o){var a,p,e,c,h;const r=((a=o.error)==null?void 0:a.message)||((p=o.error)==null?void 0:p.toString())||"",s=((e=o.request)==null?void 0:e.method)||((c=o.options)==null?void 0:c.method)||"GET",f=((h=o.request)==null?void 0:h.url)||String(o.request)||"/",u=`[${s}] ${JSON.stringify(f)}`,i=o.response?`${o.response.status} ${o.response.statusText}`:"<no response>",d=`${u}: ${i}${r?` ${r}`:""}`,t=new S(d,o.error?{cause:o.error}:void 0);for(const n of["request","options","response"])Object.defineProperty(t,n,{get(){return o[n]}});for(const[n,y]of[["data","_data"],["status","status"],["statusCode","status"],["statusText","statusText"],["statusMessage","statusText"]])Object.defineProperty(t,n,{get(){return o.response&&o.response[y]}});return t}const j=new Set(Object.freeze(["PATCH","POST","PUT","DELETE"]));function m(o="GET"){return j.has(o.toUpperCase())}function C(o){if(o===void 0)return!1;const r=typeof o;return r==="string"||r==="number"||r==="boolean"||r===null?!0:r!=="object"?!1:Array.isArray(o)?!0:o.buffer?!1:o.constructor&&o.constructor.name==="Object"||typeof o.toJSON=="function"}const _=new Set(["image/svg","application/xml","application/xhtml","application/html"]),k=/^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;function v(o=""){if(!o)return"json";const r=o.split(";").shift()||"";return k.test(r)?"json":_.has(r)||r.startsWith("text/")?"text":"blob"}function D(o,r,s,f){const u=P((r==null?void 0:r.headers)??(o==null?void 0:o.headers),s==null?void 0:s.headers,f);let i;return(s!=null&&s.query||s!=null&&s.params||r!=null&&r.params||r!=null&&r.query)&&(i={...s==null?void 0:s.params,...s==null?void 0:s.query,...r==null?void 0:r.params,...r==null?void 0:r.query}),{...s,...r,query:i,params:i,headers:u}}function P(o,r,s){if(!r)return new s(o);const f=new s(r);if(o)for(const[u,i]of Symbol.iterator in o||Array.isArray(o)?o:new s(o))f.set(u,i);return f}async function b(o,r){if(r)if(Array.isArray(r))for(const s of r)await s(o);else await r(o)}const O=new Set([408,409,425,429,500,502,503,504]),F=new Set([101,204,205,304]);function T(o={}){const{fetch:r=globalThis.fetch,Headers:s=globalThis.Headers,AbortController:f=globalThis.AbortController}=o;async function u(t){const a=t.error&&t.error.name==="AbortError"&&!t.options.timeout||!1;if(t.options.retry!==!1&&!a){let e;typeof t.options.retry=="number"?e=t.options.retry:e=m(t.options.method)?0:1;const c=t.response&&t.response.status||500;if(e>0&&(Array.isArray(t.options.retryStatusCodes)?t.options.retryStatusCodes.includes(c):O.has(c))){const h=typeof t.options.retryDelay=="function"?t.options.retryDelay(t):t.options.retryDelay||0;return h>0&&await new Promise(n=>setTimeout(n,h)),i(t.request,{...t.options,retry:e-1})}}const p=$(t);throw Error.captureStackTrace&&Error.captureStackTrace(p,i),p}const i=async function(a,p={}){const e={request:a,options:D(a,p,o.defaults,s),response:void 0,error:void 0};e.options.method&&(e.options.method=e.options.method.toUpperCase()),e.options.onRequest&&await b(e,e.options.onRequest),typeof e.request=="string"&&(e.options.baseURL&&(e.request=q(e.request,e.options.baseURL)),e.options.query&&(e.request=R(e.request,e.options.query),delete e.options.query),"query"in e.options&&delete e.options.query,"params"in e.options&&delete e.options.params),e.options.body&&m(e.options.method)&&(C(e.options.body)?(e.options.body=typeof e.options.body=="string"?e.options.body:JSON.stringify(e.options.body),e.options.headers=new s(e.options.headers||{}),e.options.headers.has("content-type")||e.options.headers.set("content-type","application/json"),e.options.headers.has("accept")||e.options.headers.set("accept","application/json")):("pipeTo"in e.options.body&&typeof e.options.body.pipeTo=="function"||typeof e.options.body.pipe=="function")&&("duplex"in e.options||(e.options.duplex="half")));let c;if(!e.options.signal&&e.options.timeout){const n=new f;c=setTimeout(()=>{const y=new Error("[TimeoutError]: The operation was aborted due to timeout");y.name="TimeoutError",y.code=23,n.abort(y)},e.options.timeout),e.options.signal=n.signal}try{e.response=await r(e.request,e.options)}catch(n){return e.error=n,e.options.onRequestError&&await b(e,e.options.onRequestError),await u(e)}finally{c&&clearTimeout(c)}if((e.response.body||e.response._bodyInit)&&!F.has(e.response.status)&&e.options.method!=="HEAD"){const n=(e.options.parseResponse?"json":e.options.responseType)||v(e.response.headers.get("content-type")||"");switch(n){case"json":{const y=await e.response.text(),g=e.options.parseResponse||E;e.response._data=g(y);break}case"stream":{e.response._data=e.response.body||e.response._bodyInit;break}default:e.response._data=await e.response[n]()}}return e.options.onResponse&&await b(e,e.options.onResponse),!e.options.ignoreResponseError&&e.response.status>=400&&e.response.status<600?(e.options.onResponseError&&await b(e,e.options.onResponseError),await u(e)):e.response},d=async function(a,p){return(await i(a,p))._data};return d.raw=i,d.native=(...t)=>r(...t),d.create=(t={},a={})=>T({...o,...a,defaults:{...o.defaults,...a.defaults,...t}}),d}const w=function(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")}(),H=w.fetch?(...o)=>w.fetch(...o):()=>Promise.reject(new Error("[ofetch] global.fetch is not supported!")),U=w.Headers,B=w.AbortController,J=T({fetch:H,Headers:U,AbortController:B}),M=J.create({baseURL:"/api",onRequest:async({options:o})=>{o.headers={...o.headers,Accept:"application/json"};const r=l("userToken").value;r&&(o.headers={...o.headers,Authorization:`Bearer ${r}`})},onResponse:async({response:o})=>{o.status===401?(l("userToken").value=null,l("userData").value=null,l("userAbilityRules").value=null,A().update([]),window.location.href="/login"):o._data.status===403&&(o._data.errors.sub_code[0]=="002"?(l("userToken").value=null,l("userData").value=null,l("userAbilityRules").value=null,window.location.href="/not-authorized"):o._data.errors.sub_code[0]=="002"&&window.location.href!="/settings/user/security"&&(window.location.href="/settings/user/security"))}});export{M as $};
