var Zu=Object.defineProperty;var ef=(e,t,n)=>t in e?Zu(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var de=(e,t,n)=>(ef(e,typeof t!="symbol"?t+"":t,n),n);function Zs(e,t){const n=Object.create(null),r=e.split(",");for(let a=0;a<r.length;a++)n[r[a]]=!0;return t?a=>!!n[a.toLowerCase()]:a=>!!n[a]}function _a(e){if(G(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],a=ke(r)?af(r):_a(r);if(a)for(const s in a)t[s]=a[s]}return t}else{if(ke(e))return e;if(ye(e))return e}}const tf=/;(?![^(]*\))/g,nf=/:([^]+)/,rf=/\/\*.*?\*\//gs;function af(e){const t={};return e.replace(rf,"").split(tf).forEach(n=>{if(n){const r=n.split(nf);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function Be(e){let t="";if(ke(e))t=e;else if(G(e))for(let n=0;n<e.length;n++){const r=Be(e[n]);r&&(t+=r+" ")}else if(ye(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}function e_(e){if(!e)return null;let{class:t,style:n}=e;return t&&!ke(t)&&(e.class=Be(t)),n&&(e.style=_a(n)),e}const sf="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",of=Zs(sf);function Ec(e){return!!e||e===""}const us=e=>ke(e)?e:e==null?"":G(e)||ye(e)&&(e.toString===Ic||!Z(e.toString))?JSON.stringify(e,Tc,2):String(e),Tc=(e,t)=>t&&t.__v_isRef?Tc(e,t.value):Sn(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,a])=>(n[`${r} =>`]=a,n),{})}:Oc(t)?{[`Set(${t.size})`]:[...t.values()]}:ye(t)&&!G(t)&&!Rc(t)?String(t):t,me={},xn=[],it=()=>{},cf=()=>!1,lf=/^on[^a-z]/,wr=e=>lf.test(e),ei=e=>e.startsWith("onUpdate:"),Re=Object.assign,ti=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},uf=Object.prototype.hasOwnProperty,ie=(e,t)=>uf.call(e,t),G=Array.isArray,Sn=e=>xr(e)==="[object Map]",Oc=e=>xr(e)==="[object Set]",ff=e=>xr(e)==="[object RegExp]",Z=e=>typeof e=="function",ke=e=>typeof e=="string",ni=e=>typeof e=="symbol",ye=e=>e!==null&&typeof e=="object",Pc=e=>ye(e)&&Z(e.then)&&Z(e.catch),Ic=Object.prototype.toString,xr=e=>Ic.call(e),df=e=>xr(e).slice(8,-1),Rc=e=>xr(e)==="[object Object]",ri=e=>ke(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Xn=Zs(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),wa=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},pf=/-(\w)/g,ht=wa(e=>e.replace(pf,(t,n)=>n?n.toUpperCase():"")),hf=/\B([A-Z])/g,Hn=wa(e=>e.replace(hf,"-$1").toLowerCase()),xa=wa(e=>e.charAt(0).toUpperCase()+e.slice(1)),$a=wa(e=>e?`on${xa(e)}`:""),lr=(e,t)=>!Object.is(e,t),Qn=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},ta=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},mf=e=>{const t=parseFloat(e);return isNaN(t)?e:t},Mc=e=>{const t=ke(e)?Number(e):NaN;return isNaN(t)?e:t};let Ui;const gf=()=>Ui||(Ui=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});let We;class Lc{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=We,!t&&We&&(this.index=(We.scopes||(We.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const n=We;try{return We=this,t()}finally{We=n}}}on(){We=this}off(){We=this.parent}stop(t){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!t){const a=this.parent.scopes.pop();a&&a!==this&&(this.parent.scopes[this.index]=a,a.index=this.index)}this.parent=void 0,this._active=!1}}}function Nc(e){return new Lc(e)}function vf(e,t=We){t&&t.active&&t.effects.push(e)}function jc(){return We}function yf(e){We&&We.cleanups.push(e)}const ai=e=>{const t=new Set(e);return t.w=0,t.n=0,t},Hc=e=>(e.w&Bt)>0,Dc=e=>(e.n&Bt)>0,bf=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=Bt},_f=e=>{const{deps:t}=e;if(t.length){let n=0;for(let r=0;r<t.length;r++){const a=t[r];Hc(a)&&!Dc(a)?a.delete(e):t[n++]=a,a.w&=~Bt,a.n&=~Bt}t.length=n}},na=new WeakMap;let Jn=0,Bt=1;const fs=30;let rt;const rn=Symbol(""),ds=Symbol("");class si{constructor(t,n=null,r){this.fn=t,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,vf(this,r)}run(){if(!this.active)return this.fn();let t=rt,n=Ht;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=rt,rt=this,Ht=!0,Bt=1<<++Jn,Jn<=fs?bf(this):Wi(this),this.fn()}finally{Jn<=fs&&_f(this),Bt=1<<--Jn,rt=this.parent,Ht=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){rt===this?this.deferStop=!0:this.active&&(Wi(this),this.onStop&&this.onStop(),this.active=!1)}}function Wi(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let Ht=!0;const $c=[];function Dn(){$c.push(Ht),Ht=!1}function $n(){const e=$c.pop();Ht=e===void 0?!0:e}function ze(e,t,n){if(Ht&&rt){let r=na.get(e);r||na.set(e,r=new Map);let a=r.get(n);a||r.set(n,a=ai()),Fc(a)}}function Fc(e,t){let n=!1;Jn<=fs?Dc(e)||(e.n|=Bt,n=!Hc(e)):n=!e.has(rt),n&&(e.add(rt),rt.deps.push(e))}function _t(e,t,n,r,a,s){const i=na.get(e);if(!i)return;let o=[];if(t==="clear")o=[...i.values()];else if(n==="length"&&G(e)){const c=Number(r);i.forEach((l,u)=>{(u==="length"||u>=c)&&o.push(l)})}else switch(n!==void 0&&o.push(i.get(n)),t){case"add":G(e)?ri(n)&&o.push(i.get("length")):(o.push(i.get(rn)),Sn(e)&&o.push(i.get(ds)));break;case"delete":G(e)||(o.push(i.get(rn)),Sn(e)&&o.push(i.get(ds)));break;case"set":Sn(e)&&o.push(i.get(rn));break}if(o.length===1)o[0]&&ps(o[0]);else{const c=[];for(const l of o)l&&c.push(...l);ps(ai(c))}}function ps(e,t){const n=G(e)?e:[...e];for(const r of n)r.computed&&Ki(r);for(const r of n)r.computed||Ki(r)}function Ki(e,t){(e!==rt||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}function wf(e,t){var n;return(n=na.get(e))===null||n===void 0?void 0:n.get(t)}const xf=Zs("__proto__,__v_isRef,__isVue"),Bc=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(ni)),Sf=ii(),kf=ii(!1,!0),Af=ii(!0),Vi=Cf();function Cf(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const r=re(this);for(let s=0,i=this.length;s<i;s++)ze(r,"get",s+"");const a=r[t](...n);return a===-1||a===!1?r[t](...n.map(re)):a}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){Dn();const r=re(this)[t].apply(this,n);return $n(),r}}),e}function Ef(e){const t=re(this);return ze(t,"has",e),t.hasOwnProperty(e)}function ii(e=!1,t=!1){return function(r,a,s){if(a==="__v_isReactive")return!e;if(a==="__v_isReadonly")return e;if(a==="__v_isShallow")return t;if(a==="__v_raw"&&s===(e?t?Uf:Vc:t?Kc:Wc).get(r))return r;const i=G(r);if(!e){if(i&&ie(Vi,a))return Reflect.get(Vi,a,s);if(a==="hasOwnProperty")return Ef}const o=Reflect.get(r,a,s);return(ni(a)?Bc.has(a):xf(a))||(e||ze(r,"get",a),t)?o:Se(o)?i&&ri(a)?o:o.value:ye(o)?e?Jc(o):be(o):o}}const Tf=zc(),Of=zc(!0);function zc(e=!1){return function(n,r,a,s){let i=n[r];if(sn(i)&&Se(i)&&!Se(a))return!1;if(!e&&(!ra(a)&&!sn(a)&&(i=re(i),a=re(a)),!G(n)&&Se(i)&&!Se(a)))return i.value=a,!0;const o=G(n)&&ri(r)?Number(r)<n.length:ie(n,r),c=Reflect.set(n,r,a,s);return n===re(s)&&(o?lr(a,i)&&_t(n,"set",r,a):_t(n,"add",r,a)),c}}function Pf(e,t){const n=ie(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&n&&_t(e,"delete",t,void 0),r}function If(e,t){const n=Reflect.has(e,t);return(!ni(t)||!Bc.has(t))&&ze(e,"has",t),n}function Rf(e){return ze(e,"iterate",G(e)?"length":rn),Reflect.ownKeys(e)}const Uc={get:Sf,set:Tf,deleteProperty:Pf,has:If,ownKeys:Rf},Mf={get:Af,set(e,t){return!0},deleteProperty(e,t){return!0}},Lf=Re({},Uc,{get:kf,set:Of}),oi=e=>e,Sa=e=>Reflect.getPrototypeOf(e);function Or(e,t,n=!1,r=!1){e=e.__v_raw;const a=re(e),s=re(t);n||(t!==s&&ze(a,"get",t),ze(a,"get",s));const{has:i}=Sa(a),o=r?oi:n?ui:ur;if(i.call(a,t))return o(e.get(t));if(i.call(a,s))return o(e.get(s));e!==a&&e.get(t)}function Pr(e,t=!1){const n=this.__v_raw,r=re(n),a=re(e);return t||(e!==a&&ze(r,"has",e),ze(r,"has",a)),e===a?n.has(e):n.has(e)||n.has(a)}function Ir(e,t=!1){return e=e.__v_raw,!t&&ze(re(e),"iterate",rn),Reflect.get(e,"size",e)}function Ji(e){e=re(e);const t=re(this);return Sa(t).has.call(t,e)||(t.add(e),_t(t,"add",e,e)),this}function Yi(e,t){t=re(t);const n=re(this),{has:r,get:a}=Sa(n);let s=r.call(n,e);s||(e=re(e),s=r.call(n,e));const i=a.call(n,e);return n.set(e,t),s?lr(t,i)&&_t(n,"set",e,t):_t(n,"add",e,t),this}function qi(e){const t=re(this),{has:n,get:r}=Sa(t);let a=n.call(t,e);a||(e=re(e),a=n.call(t,e)),r&&r.call(t,e);const s=t.delete(e);return a&&_t(t,"delete",e,void 0),s}function Gi(){const e=re(this),t=e.size!==0,n=e.clear();return t&&_t(e,"clear",void 0,void 0),n}function Rr(e,t){return function(r,a){const s=this,i=s.__v_raw,o=re(i),c=t?oi:e?ui:ur;return!e&&ze(o,"iterate",rn),i.forEach((l,u)=>r.call(a,c(l),c(u),s))}}function Mr(e,t,n){return function(...r){const a=this.__v_raw,s=re(a),i=Sn(s),o=e==="entries"||e===Symbol.iterator&&i,c=e==="keys"&&i,l=a[e](...r),u=n?oi:t?ui:ur;return!t&&ze(s,"iterate",c?ds:rn),{next(){const{value:f,done:h}=l.next();return h?{value:f,done:h}:{value:o?[u(f[0]),u(f[1])]:u(f),done:h}},[Symbol.iterator](){return this}}}}function Et(e){return function(...t){return e==="delete"?!1:this}}function Nf(){const e={get(s){return Or(this,s)},get size(){return Ir(this)},has:Pr,add:Ji,set:Yi,delete:qi,clear:Gi,forEach:Rr(!1,!1)},t={get(s){return Or(this,s,!1,!0)},get size(){return Ir(this)},has:Pr,add:Ji,set:Yi,delete:qi,clear:Gi,forEach:Rr(!1,!0)},n={get(s){return Or(this,s,!0)},get size(){return Ir(this,!0)},has(s){return Pr.call(this,s,!0)},add:Et("add"),set:Et("set"),delete:Et("delete"),clear:Et("clear"),forEach:Rr(!0,!1)},r={get(s){return Or(this,s,!0,!0)},get size(){return Ir(this,!0)},has(s){return Pr.call(this,s,!0)},add:Et("add"),set:Et("set"),delete:Et("delete"),clear:Et("clear"),forEach:Rr(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=Mr(s,!1,!1),n[s]=Mr(s,!0,!1),t[s]=Mr(s,!1,!0),r[s]=Mr(s,!0,!0)}),[e,n,t,r]}const[jf,Hf,Df,$f]=Nf();function ci(e,t){const n=t?e?$f:Df:e?Hf:jf;return(r,a,s)=>a==="__v_isReactive"?!e:a==="__v_isReadonly"?e:a==="__v_raw"?r:Reflect.get(ie(n,a)&&a in r?n:r,a,s)}const Ff={get:ci(!1,!1)},Bf={get:ci(!1,!0)},zf={get:ci(!0,!1)},Wc=new WeakMap,Kc=new WeakMap,Vc=new WeakMap,Uf=new WeakMap;function Wf(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Kf(e){return e.__v_skip||!Object.isExtensible(e)?0:Wf(df(e))}function be(e){return sn(e)?e:li(e,!1,Uc,Ff,Wc)}function Vf(e){return li(e,!1,Lf,Bf,Kc)}function Jc(e){return li(e,!0,Mf,zf,Vc)}function li(e,t,n,r,a){if(!ye(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const s=a.get(e);if(s)return s;const i=Kf(e);if(i===0)return e;const o=new Proxy(e,i===2?r:n);return a.set(e,o),o}function Dt(e){return sn(e)?Dt(e.__v_raw):!!(e&&e.__v_isReactive)}function sn(e){return!!(e&&e.__v_isReadonly)}function ra(e){return!!(e&&e.__v_isShallow)}function Yc(e){return Dt(e)||sn(e)}function re(e){const t=e&&e.__v_raw;return t?re(t):e}function On(e){return ta(e,"__v_skip",!0),e}const ur=e=>ye(e)?be(e):e,ui=e=>ye(e)?Jc(e):e;function qc(e){Ht&&rt&&(e=re(e),Fc(e.dep||(e.dep=ai())))}function Gc(e,t){e=re(e);const n=e.dep;n&&ps(n)}function Se(e){return!!(e&&e.__v_isRef===!0)}function ot(e){return Xc(e,!1)}function hs(e){return Xc(e,!0)}function Xc(e,t){return Se(e)?e:new Jf(e,t)}class Jf{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:re(t),this._value=n?t:ur(t)}get value(){return qc(this),this._value}set value(t){const n=this.__v_isShallow||ra(t)||sn(t);t=n?t:re(t),lr(t,this._rawValue)&&(this._rawValue=t,this._value=n?t:ur(t),Gc(this))}}function le(e){return Se(e)?e.value:e}const Yf={get:(e,t,n)=>le(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const a=e[t];return Se(a)&&!Se(n)?(a.value=n,!0):Reflect.set(e,t,n,r)}};function Qc(e){return Dt(e)?e:new Proxy(e,Yf)}function qf(e){const t=G(e)?new Array(e.length):{};for(const n in e)t[n]=fi(e,n);return t}class Gf{constructor(t,n,r){this._object=t,this._key=n,this._defaultValue=r,this.__v_isRef=!0}get value(){const t=this._object[this._key];return t===void 0?this._defaultValue:t}set value(t){this._object[this._key]=t}get dep(){return wf(re(this._object),this._key)}}function fi(e,t,n){const r=e[t];return Se(r)?r:new Gf(e,t,n)}var Zc;class Xf{constructor(t,n,r,a){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this[Zc]=!1,this._dirty=!0,this.effect=new si(t,()=>{this._dirty||(this._dirty=!0,Gc(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!a,this.__v_isReadonly=r}get value(){const t=re(this);return qc(t),(t._dirty||!t._cacheable)&&(t._dirty=!1,t._value=t.effect.run()),t._value}set value(t){this._setter(t)}}Zc="__v_isReadonly";function Qf(e,t,n=!1){let r,a;const s=Z(e);return s?(r=e,a=it):(r=e.get,a=e.set),new Xf(r,a,s||!a,n)}function $t(e,t,n,r){let a;try{a=r?e(...r):e()}catch(s){Fn(s,t,n)}return a}function Xe(e,t,n,r){if(Z(e)){const s=$t(e,t,n,r);return s&&Pc(s)&&s.catch(i=>{Fn(i,t,n)}),s}const a=[];for(let s=0;s<e.length;s++)a.push(Xe(e[s],t,n,r));return a}function Fn(e,t,n,r=!0){const a=t?t.vnode:null;if(t){let s=t.parent;const i=t.proxy,o=n;for(;s;){const l=s.ec;if(l){for(let u=0;u<l.length;u++)if(l[u](e,i,o)===!1)return}s=s.parent}const c=t.appContext.config.errorHandler;if(c){$t(c,null,10,[e,i,o]);return}}Zf(e,n,a,r)}function Zf(e,t,n,r=!0){console.error(e)}let fr=!1,ms=!1;const Me=[];let dt=0;const kn=[];let vt=null,Xt=0;const el=Promise.resolve();let di=null;function ln(e){const t=di||el;return e?t.then(this?e.bind(this):e):t}function ed(e){let t=dt+1,n=Me.length;for(;t<n;){const r=t+n>>>1;dr(Me[r])<e?t=r+1:n=r}return t}function ka(e){(!Me.length||!Me.includes(e,fr&&e.allowRecurse?dt+1:dt))&&(e.id==null?Me.push(e):Me.splice(ed(e.id),0,e),tl())}function tl(){!fr&&!ms&&(ms=!0,di=el.then(rl))}function td(e){const t=Me.indexOf(e);t>dt&&Me.splice(t,1)}function nl(e){G(e)?kn.push(...e):(!vt||!vt.includes(e,e.allowRecurse?Xt+1:Xt))&&kn.push(e),tl()}function Xi(e,t=fr?dt+1:0){for(;t<Me.length;t++){const n=Me[t];n&&n.pre&&(Me.splice(t,1),t--,n())}}function aa(e){if(kn.length){const t=[...new Set(kn)];if(kn.length=0,vt){vt.push(...t);return}for(vt=t,vt.sort((n,r)=>dr(n)-dr(r)),Xt=0;Xt<vt.length;Xt++)vt[Xt]();vt=null,Xt=0}}const dr=e=>e.id==null?1/0:e.id,nd=(e,t)=>{const n=dr(e)-dr(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function rl(e){ms=!1,fr=!0,Me.sort(nd);const t=it;try{for(dt=0;dt<Me.length;dt++){const n=Me[dt];n&&n.active!==!1&&$t(n,null,14)}}finally{dt=0,Me.length=0,aa(),fr=!1,di=null,(Me.length||kn.length)&&rl()}}function rd(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||me;let a=n;const s=t.startsWith("update:"),i=s&&t.slice(7);if(i&&i in r){const u=`${i==="modelValue"?"model":i}Modifiers`,{number:f,trim:h}=r[u]||me;h&&(a=n.map(y=>ke(y)?y.trim():y)),f&&(a=n.map(mf))}let o,c=r[o=$a(t)]||r[o=$a(ht(t))];!c&&s&&(c=r[o=$a(Hn(t))]),c&&Xe(c,e,6,a);const l=r[o+"Once"];if(l){if(!e.emitted)e.emitted={};else if(e.emitted[o])return;e.emitted[o]=!0,Xe(l,e,6,a)}}function al(e,t,n=!1){const r=t.emitsCache,a=r.get(e);if(a!==void 0)return a;const s=e.emits;let i={},o=!1;if(!Z(e)){const c=l=>{const u=al(l,t,!0);u&&(o=!0,Re(i,u))};!n&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}return!s&&!o?(ye(e)&&r.set(e,null),null):(G(s)?s.forEach(c=>i[c]=null):Re(i,s),ye(e)&&r.set(e,i),i)}function Aa(e,t){return!e||!wr(t)?!1:(t=t.slice(2).replace(/Once$/,""),ie(e,t[0].toLowerCase()+t.slice(1))||ie(e,Hn(t))||ie(e,t))}let Ke=null,Ca=null;function sa(e){const t=Ke;return Ke=e,Ca=e&&e.type.__scopeId||null,t}function t_(e){Ca=e}function n_(){Ca=null}function pi(e,t=Ke,n){if(!t||e._n)return e;const r=(...a)=>{r._d&&co(-1);const s=sa(t);let i;try{i=e(...a)}finally{sa(s),r._d&&co(1)}return i};return r._n=!0,r._c=!0,r._d=!0,r}function Fa(e){const{type:t,vnode:n,proxy:r,withProxy:a,props:s,propsOptions:[i],slots:o,attrs:c,emit:l,render:u,renderCache:f,data:h,setupState:y,ctx:g,inheritAttrs:_}=e;let k,m;const d=sa(e);try{if(n.shapeFlag&4){const w=a||r;k=qe(u.call(w,w,f,s,y,h,g)),m=c}else{const w=t;k=qe(w.length>1?w(s,{attrs:c,slots:o,emit:l}):w(s,null)),m=t.props?c:sd(c)}}catch(w){tr.length=0,Fn(w,e,1),k=ne(Qe)}let b=k;if(m&&_!==!1){const w=Object.keys(m),{shapeFlag:A}=b;w.length&&A&7&&(i&&w.some(ei)&&(m=id(m,i)),b=wt(b,m))}return n.dirs&&(b=wt(b),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&(b.transition=n.transition),k=b,sa(d),k}function ad(e){let t;for(let n=0;n<e.length;n++){const r=e[n];if(hr(r)){if(r.type!==Qe||r.children==="v-if"){if(t)return;t=r}}else return}return t}const sd=e=>{let t;for(const n in e)(n==="class"||n==="style"||wr(n))&&((t||(t={}))[n]=e[n]);return t},id=(e,t)=>{const n={};for(const r in e)(!ei(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function od(e,t,n){const{props:r,children:a,component:s}=e,{props:i,children:o,patchFlag:c}=t,l=s.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?Qi(r,i,l):!!i;if(c&8){const u=t.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(i[h]!==r[h]&&!Aa(l,h))return!0}}}else return(a||o)&&(!o||!o.$stable)?!0:r===i?!1:r?i?Qi(r,i,l):!0:!!i;return!1}function Qi(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let a=0;a<r.length;a++){const s=r[a];if(t[s]!==e[s]&&!Aa(n,s))return!0}return!1}function hi({vnode:e,parent:t},n){for(;t&&t.subTree===e;)(e=t.vnode).el=n,t=t.parent}const sl=e=>e.__isSuspense,cd={name:"Suspense",__isSuspense:!0,process(e,t,n,r,a,s,i,o,c,l){e==null?ld(t,n,r,a,s,i,o,c,l):ud(e,t,n,r,a,i,o,c,l)},hydrate:fd,create:mi,normalize:dd},il=cd;function pr(e,t){const n=e.props&&e.props[t];Z(n)&&n()}function ld(e,t,n,r,a,s,i,o,c){const{p:l,o:{createElement:u}}=c,f=u("div"),h=e.suspense=mi(e,a,r,t,f,n,s,i,o,c);l(null,h.pendingBranch=e.ssContent,f,null,r,h,s,i),h.deps>0?(pr(e,"onPending"),pr(e,"onFallback"),l(null,e.ssFallback,t,n,r,null,s,i),An(h,e.ssFallback)):h.resolve()}function ud(e,t,n,r,a,s,i,o,{p:c,um:l,o:{createElement:u}}){const f=t.suspense=e.suspense;f.vnode=t,t.el=e.el;const h=t.ssContent,y=t.ssFallback,{activeBranch:g,pendingBranch:_,isInFallback:k,isHydrating:m}=f;if(_)f.pendingBranch=h,at(h,_)?(c(_,h,f.hiddenContainer,null,a,f,s,i,o),f.deps<=0?f.resolve():k&&(c(g,y,n,r,a,null,s,i,o),An(f,y))):(f.pendingId++,m?(f.isHydrating=!1,f.activeBranch=_):l(_,a,f),f.deps=0,f.effects.length=0,f.hiddenContainer=u("div"),k?(c(null,h,f.hiddenContainer,null,a,f,s,i,o),f.deps<=0?f.resolve():(c(g,y,n,r,a,null,s,i,o),An(f,y))):g&&at(h,g)?(c(g,h,n,r,a,f,s,i,o),f.resolve(!0)):(c(null,h,f.hiddenContainer,null,a,f,s,i,o),f.deps<=0&&f.resolve()));else if(g&&at(h,g))c(g,h,n,r,a,f,s,i,o),An(f,h);else if(pr(t,"onPending"),f.pendingBranch=h,f.pendingId++,c(null,h,f.hiddenContainer,null,a,f,s,i,o),f.deps<=0)f.resolve();else{const{timeout:d,pendingId:b}=f;d>0?setTimeout(()=>{f.pendingId===b&&f.fallback(y)},d):d===0&&f.fallback(y)}}function mi(e,t,n,r,a,s,i,o,c,l,u=!1){const{p:f,m:h,um:y,n:g,o:{parentNode:_,remove:k}}=l,m=e.props?Mc(e.props.timeout):void 0,d={vnode:e,parent:t,parentComponent:n,isSVG:i,container:r,hiddenContainer:a,anchor:s,deps:0,pendingId:0,timeout:typeof m=="number"?m:-1,activeBranch:null,pendingBranch:null,isInFallback:!0,isHydrating:u,isUnmounted:!1,effects:[],resolve(b=!1){const{vnode:w,activeBranch:A,pendingBranch:I,pendingId:T,effects:x,parentComponent:L,container:U}=d;if(d.isHydrating)d.isHydrating=!1;else if(!b){const X=A&&I.transition&&I.transition.mode==="out-in";X&&(A.transition.afterLeave=()=>{T===d.pendingId&&h(I,U,$,0)});let{anchor:$}=d;A&&($=g(A),y(A,L,d,!0)),X||h(I,U,$,0)}An(d,I),d.pendingBranch=null,d.isInFallback=!1;let V=d.parent,H=!1;for(;V;){if(V.pendingBranch){V.effects.push(...x),H=!0;break}V=V.parent}H||nl(x),d.effects=[],pr(w,"onResolve")},fallback(b){if(!d.pendingBranch)return;const{vnode:w,activeBranch:A,parentComponent:I,container:T,isSVG:x}=d;pr(w,"onFallback");const L=g(A),U=()=>{d.isInFallback&&(f(null,b,T,L,I,null,x,o,c),An(d,b))},V=b.transition&&b.transition.mode==="out-in";V&&(A.transition.afterLeave=U),d.isInFallback=!0,y(A,I,null,!0),V||U()},move(b,w,A){d.activeBranch&&h(d.activeBranch,b,w,A),d.container=b},next(){return d.activeBranch&&g(d.activeBranch)},registerDep(b,w){const A=!!d.pendingBranch;A&&d.deps++;const I=b.vnode.el;b.asyncDep.catch(T=>{Fn(T,b,0)}).then(T=>{if(b.isUnmounted||d.isUnmounted||d.pendingId!==b.suspenseId)return;b.asyncResolved=!0;const{vnode:x}=b;ws(b,T,!1),I&&(x.el=I);const L=!I&&b.subTree.el;w(b,x,_(I||b.subTree.el),I?null:g(b.subTree),d,i,c),L&&k(L),hi(b,x.el),A&&--d.deps===0&&d.resolve()})},unmount(b,w){d.isUnmounted=!0,d.activeBranch&&y(d.activeBranch,n,b,w),d.pendingBranch&&y(d.pendingBranch,n,b,w)}};return d}function fd(e,t,n,r,a,s,i,o,c){const l=t.suspense=mi(t,r,n,e.parentNode,document.createElement("div"),null,a,s,i,o,!0),u=c(e,l.pendingBranch=t.ssContent,n,l,s,i);return l.deps===0&&l.resolve(),u}function dd(e){const{shapeFlag:t,children:n}=e,r=t&32;e.ssContent=Zi(r?n.default:n),e.ssFallback=r?Zi(n.fallback):ne(Qe)}function Zi(e){let t;if(Z(e)){const n=In&&e._c;n&&(e._d=!1,Ee()),e=e(),n&&(e._d=!0,t=Ge,Pl())}return G(e)&&(e=ad(e)),e=qe(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter(n=>n!==e)),e}function ol(e,t){t&&t.pendingBranch?G(e)?t.effects.push(...e):t.effects.push(e):nl(e)}function An(e,t){e.activeBranch=t;const{vnode:n,parentComponent:r}=e,a=n.el=t.el;r&&r.subTree===n&&(r.vnode.el=a,hi(r,a))}function Cn(e,t){if(xe){let n=xe.provides;const r=xe.parent&&xe.parent.provides;r===n&&(n=xe.provides=Object.create(r)),n[e]=t}}function Ve(e,t,n=!1){const r=xe||Ke;if(r){const a=r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides;if(a&&e in a)return a[e];if(arguments.length>1)return n&&Z(t)?t.call(r.proxy):t}}function pd(e,t){return gi(e,null,t)}const Lr={};function Ft(e,t,n){return gi(e,t,n)}function gi(e,t,{immediate:n,deep:r,flush:a,onTrack:s,onTrigger:i}=me){const o=jc()===(xe==null?void 0:xe.scope)?xe:null;let c,l=!1,u=!1;if(Se(e)?(c=()=>e.value,l=ra(e)):Dt(e)?(c=()=>e,r=!0):G(e)?(u=!0,l=e.some(b=>Dt(b)||ra(b)),c=()=>e.map(b=>{if(Se(b))return b.value;if(Dt(b))return en(b);if(Z(b))return $t(b,o,2)})):Z(e)?t?c=()=>$t(e,o,2):c=()=>{if(!(o&&o.isUnmounted))return f&&f(),Xe(e,o,3,[h])}:c=it,t&&r){const b=c;c=()=>en(b())}let f,h=b=>{f=m.onStop=()=>{$t(b,o,4)}},y;if(Mn)if(h=it,t?n&&Xe(t,o,3,[c(),u?[]:void 0,h]):c(),a==="sync"){const b=ap();y=b.__watcherHandles||(b.__watcherHandles=[])}else return it;let g=u?new Array(e.length).fill(Lr):Lr;const _=()=>{if(m.active)if(t){const b=m.run();(r||l||(u?b.some((w,A)=>lr(w,g[A])):lr(b,g)))&&(f&&f(),Xe(t,o,3,[b,g===Lr?void 0:u&&g[0]===Lr?[]:g,h]),g=b)}else m.run()};_.allowRecurse=!!t;let k;a==="sync"?k=_:a==="post"?k=()=>Ie(_,o&&o.suspense):(_.pre=!0,o&&(_.id=o.uid),k=()=>ka(_));const m=new si(c,k);t?n?_():g=m.run():a==="post"?Ie(m.run.bind(m),o&&o.suspense):m.run();const d=()=>{m.stop(),o&&o.scope&&ti(o.scope.effects,m)};return y&&y.push(d),d}function hd(e,t,n){const r=this.proxy,a=ke(e)?e.includes(".")?cl(r,e):()=>r[e]:e.bind(r,r);let s;Z(t)?s=t:(s=t.handler,n=t);const i=xe;Rn(this);const o=gi(a,s.bind(r),n);return i?Rn(i):an(),o}function cl(e,t){const n=t.split(".");return()=>{let r=e;for(let a=0;a<n.length&&r;a++)r=r[n[a]];return r}}function en(e,t){if(!ye(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),Se(e))en(e.value,t);else if(G(e))for(let n=0;n<e.length;n++)en(e[n],t);else if(Oc(e)||Sn(e))e.forEach(n=>{en(n,t)});else if(Rc(e))for(const n in e)en(e[n],t);return e}function md(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return un(()=>{e.isMounted=!0}),Ta(()=>{e.isUnmounting=!0}),e}const Ye=[Function,Array],gd={name:"BaseTransition",props:{mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Ye,onEnter:Ye,onAfterEnter:Ye,onEnterCancelled:Ye,onBeforeLeave:Ye,onLeave:Ye,onAfterLeave:Ye,onLeaveCancelled:Ye,onBeforeAppear:Ye,onAppear:Ye,onAfterAppear:Ye,onAppearCancelled:Ye},setup(e,{slots:t}){const n=fn(),r=md();let a;return()=>{const s=t.default&&fl(t.default(),!0);if(!s||!s.length)return;let i=s[0];if(s.length>1){for(const _ of s)if(_.type!==Qe){i=_;break}}const o=re(e),{mode:c}=o;if(r.isLeaving)return Ba(i);const l=eo(i);if(!l)return Ba(i);const u=gs(l,o,r,n);ia(l,u);const f=n.subTree,h=f&&eo(f);let y=!1;const{getTransitionKey:g}=l.type;if(g){const _=g();a===void 0?a=_:_!==a&&(a=_,y=!0)}if(h&&h.type!==Qe&&(!at(l,h)||y)){const _=gs(h,o,r,n);if(ia(h,_),c==="out-in")return r.isLeaving=!0,_.afterLeave=()=>{r.isLeaving=!1,n.update.active!==!1&&n.update()},Ba(i);c==="in-out"&&l.type!==Qe&&(_.delayLeave=(k,m,d)=>{const b=ul(r,h);b[String(h.key)]=h,k._leaveCb=()=>{m(),k._leaveCb=void 0,delete u.delayedLeave},u.delayedLeave=d})}return i}}},ll=gd;function ul(e,t){const{leavingVNodes:n}=e;let r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function gs(e,t,n,r){const{appear:a,mode:s,persisted:i=!1,onBeforeEnter:o,onEnter:c,onAfterEnter:l,onEnterCancelled:u,onBeforeLeave:f,onLeave:h,onAfterLeave:y,onLeaveCancelled:g,onBeforeAppear:_,onAppear:k,onAfterAppear:m,onAppearCancelled:d}=t,b=String(e.key),w=ul(n,e),A=(x,L)=>{x&&Xe(x,r,9,L)},I=(x,L)=>{const U=L[1];A(x,L),G(x)?x.every(V=>V.length<=1)&&U():x.length<=1&&U()},T={mode:s,persisted:i,beforeEnter(x){let L=o;if(!n.isMounted)if(a)L=_||o;else return;x._leaveCb&&x._leaveCb(!0);const U=w[b];U&&at(e,U)&&U.el._leaveCb&&U.el._leaveCb(),A(L,[x])},enter(x){let L=c,U=l,V=u;if(!n.isMounted)if(a)L=k||c,U=m||l,V=d||u;else return;let H=!1;const X=x._enterCb=$=>{H||(H=!0,$?A(V,[x]):A(U,[x]),T.delayedLeave&&T.delayedLeave(),x._enterCb=void 0)};L?I(L,[x,X]):X()},leave(x,L){const U=String(e.key);if(x._enterCb&&x._enterCb(!0),n.isUnmounting)return L();A(f,[x]);let V=!1;const H=x._leaveCb=X=>{V||(V=!0,L(),X?A(g,[x]):A(y,[x]),x._leaveCb=void 0,w[U]===e&&delete w[U])};w[U]=e,h?I(h,[x,H]):H()},clone(x){return gs(x,t,n,r)}};return T}function Ba(e){if(Sr(e))return e=wt(e),e.children=null,e}function eo(e){return Sr(e)?e.children?e.children[0]:void 0:e}function ia(e,t){e.shapeFlag&6&&e.component?ia(e.component.subTree,t):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function fl(e,t=!1,n){let r=[],a=0;for(let s=0;s<e.length;s++){let i=e[s];const o=n==null?i.key:String(n)+String(i.key!=null?i.key:s);i.type===Fe?(i.patchFlag&128&&a++,r=r.concat(fl(i.children,t,o))):(t||i.type!==Qe)&&r.push(o!=null?wt(i,{key:o}):i)}if(a>1)for(let s=0;s<r.length;s++)r[s].patchFlag=-2;return r}function Pe(e){return Z(e)?{setup:e,name:e.name}:e}const En=e=>!!e.type.__asyncLoader;function vd(e){Z(e)&&(e={loader:e});const{loader:t,loadingComponent:n,errorComponent:r,delay:a=200,timeout:s,suspensible:i=!0,onError:o}=e;let c=null,l,u=0;const f=()=>(u++,c=null,h()),h=()=>{let y;return c||(y=c=t().catch(g=>{if(g=g instanceof Error?g:new Error(String(g)),o)return new Promise((_,k)=>{o(g,()=>_(f()),()=>k(g),u+1)});throw g}).then(g=>y!==c&&c?c:(g&&(g.__esModule||g[Symbol.toStringTag]==="Module")&&(g=g.default),l=g,g)))};return Pe({name:"AsyncComponentWrapper",__asyncLoader:h,get __asyncResolved(){return l},setup(){const y=xe;if(l)return()=>za(l,y);const g=d=>{c=null,Fn(d,y,13,!r)};if(i&&y.suspense||Mn)return h().then(d=>()=>za(d,y)).catch(d=>(g(d),()=>r?ne(r,{error:d}):null));const _=ot(!1),k=ot(),m=ot(!!a);return a&&setTimeout(()=>{m.value=!1},a),s!=null&&setTimeout(()=>{if(!_.value&&!k.value){const d=new Error(`Async component timed out after ${s}ms.`);g(d),k.value=d}},s),h().then(()=>{_.value=!0,y.parent&&Sr(y.parent.vnode)&&ka(y.parent.update)}).catch(d=>{g(d),k.value=d}),()=>{if(_.value&&l)return za(l,y);if(k.value&&r)return ne(r,{error:k.value});if(n&&!m.value)return ne(n)}}})}function za(e,t){const{ref:n,props:r,children:a,ce:s}=t.vnode,i=ne(e,r,a);return i.ref=n,i.ce=s,delete t.vnode.ce,i}const Sr=e=>e.type.__isKeepAlive,yd={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){const n=fn(),r=n.ctx;if(!r.renderer)return()=>{const d=t.default&&t.default();return d&&d.length===1?d[0]:d};const a=new Map,s=new Set;let i=null;const o=n.suspense,{renderer:{p:c,m:l,um:u,o:{createElement:f}}}=r,h=f("div");r.activate=(d,b,w,A,I)=>{const T=d.component;l(d,b,w,0,o),c(T.vnode,d,b,w,T,o,A,d.slotScopeIds,I),Ie(()=>{T.isDeactivated=!1,T.a&&Qn(T.a);const x=d.props&&d.props.onVnodeMounted;x&&De(x,T.parent,d)},o)},r.deactivate=d=>{const b=d.component;l(d,h,null,1,o),Ie(()=>{b.da&&Qn(b.da);const w=d.props&&d.props.onVnodeUnmounted;w&&De(w,b.parent,d),b.isDeactivated=!0},o)};function y(d){Ua(d),u(d,n,o,!0)}function g(d){a.forEach((b,w)=>{const A=xs(b.type);A&&(!d||!d(A))&&_(w)})}function _(d){const b=a.get(d);!i||!at(b,i)?y(b):i&&Ua(i),a.delete(d),s.delete(d)}Ft(()=>[e.include,e.exclude],([d,b])=>{d&&g(w=>Yn(d,w)),b&&g(w=>!Yn(b,w))},{flush:"post",deep:!0});let k=null;const m=()=>{k!=null&&a.set(k,Wa(n.subTree))};return un(m),gl(m),Ta(()=>{a.forEach(d=>{const{subTree:b,suspense:w}=n,A=Wa(b);if(d.type===A.type&&d.key===A.key){Ua(A);const I=A.component.da;I&&Ie(I,w);return}y(d)})}),()=>{if(k=null,!t.default)return null;const d=t.default(),b=d[0];if(d.length>1)return i=null,d;if(!hr(b)||!(b.shapeFlag&4)&&!(b.shapeFlag&128))return i=null,b;let w=Wa(b);const A=w.type,I=xs(En(w)?w.type.__asyncResolved||{}:A),{include:T,exclude:x,max:L}=e;if(T&&(!I||!Yn(T,I))||x&&I&&Yn(x,I))return i=w,b;const U=w.key==null?A:w.key,V=a.get(U);return w.el&&(w=wt(w),b.shapeFlag&128&&(b.ssContent=w)),k=U,V?(w.el=V.el,w.component=V.component,w.transition&&ia(w,w.transition),w.shapeFlag|=512,s.delete(U),s.add(U)):(s.add(U),L&&s.size>parseInt(L,10)&&_(s.values().next().value)),w.shapeFlag|=256,i=w,sl(b.type)?b:w}}},bd=yd;function Yn(e,t){return G(e)?e.some(n=>Yn(n,t)):ke(e)?e.split(",").includes(t):ff(e)?e.test(t):!1}function dl(e,t){hl(e,"a",t)}function pl(e,t){hl(e,"da",t)}function hl(e,t,n=xe){const r=e.__wdc||(e.__wdc=()=>{let a=n;for(;a;){if(a.isDeactivated)return;a=a.parent}return e()});if(Ea(t,r,n),n){let a=n.parent;for(;a&&a.parent;)Sr(a.parent.vnode)&&_d(r,t,n,a),a=a.parent}}function _d(e,t,n,r){const a=Ea(t,e,r,!0);vl(()=>{ti(r[t],a)},n)}function Ua(e){e.shapeFlag&=-257,e.shapeFlag&=-513}function Wa(e){return e.shapeFlag&128?e.ssContent:e}function Ea(e,t,n=xe,r=!1){if(n){const a=n[e]||(n[e]=[]),s=t.__weh||(t.__weh=(...i)=>{if(n.isUnmounted)return;Dn(),Rn(n);const o=Xe(t,n,e,i);return an(),$n(),o});return r?a.unshift(s):a.push(s),s}}const At=e=>(t,n=xe)=>(!Mn||e==="sp")&&Ea(e,(...r)=>t(...r),n),ml=At("bm"),un=At("m"),wd=At("bu"),gl=At("u"),Ta=At("bum"),vl=At("um"),xd=At("sp"),Sd=At("rtg"),kd=At("rtc");function yl(e,t=xe){Ea("ec",e,t)}function r_(e,t){const n=Ke;if(n===null)return e;const r=Pa(n)||n.proxy,a=e.dirs||(e.dirs=[]);for(let s=0;s<t.length;s++){let[i,o,c,l=me]=t[s];i&&(Z(i)&&(i={mounted:i,updated:i}),i.deep&&en(o),a.push({dir:i,instance:r,value:o,oldValue:void 0,arg:c,modifiers:l}))}return e}function ft(e,t,n,r){const a=e.dirs,s=t&&t.dirs;for(let i=0;i<a.length;i++){const o=a[i];s&&(o.oldValue=s[i].value);let c=o.dir[r];c&&(Dn(),Xe(c,n,8,[e.el,o,e,t]),$n())}}const bl="components";function vi(e,t){return Cd(bl,e,!0,t)||e}const Ad=Symbol();function Cd(e,t,n=!0,r=!1){const a=Ke||xe;if(a){const s=a.type;if(e===bl){const o=xs(s,!1);if(o&&(o===t||o===ht(t)||o===xa(ht(t))))return s}const i=to(a[e]||s[e],t)||to(a.appContext[e],t);return!i&&r?s:i}}function to(e,t){return e&&(e[t]||e[ht(t)]||e[xa(ht(t))])}function _l(e,t,n,r){let a;const s=n&&n[r];if(G(e)||ke(e)){a=new Array(e.length);for(let i=0,o=e.length;i<o;i++)a[i]=t(e[i],i,void 0,s&&s[i])}else if(typeof e=="number"){a=new Array(e);for(let i=0;i<e;i++)a[i]=t(i+1,i,void 0,s&&s[i])}else if(ye(e))if(e[Symbol.iterator])a=Array.from(e,(i,o)=>t(i,o,void 0,s&&s[o]));else{const i=Object.keys(e);a=new Array(i.length);for(let o=0,c=i.length;o<c;o++){const l=i[o];a[o]=t(e[l],l,o,s&&s[o])}}else a=[];return n&&(n[r]=a),a}const vs=e=>e?Ml(e)?Pa(e)||e.proxy:vs(e.parent):null,Zn=Re(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>vs(e.parent),$root:e=>vs(e.root),$emit:e=>e.emit,$options:e=>yi(e),$forceUpdate:e=>e.f||(e.f=()=>ka(e.update)),$nextTick:e=>e.n||(e.n=ln.bind(e.proxy)),$watch:e=>hd.bind(e)}),Ka=(e,t)=>e!==me&&!e.__isScriptSetup&&ie(e,t),Ed={get({_:e},t){const{ctx:n,setupState:r,data:a,props:s,accessCache:i,type:o,appContext:c}=e;let l;if(t[0]!=="$"){const y=i[t];if(y!==void 0)switch(y){case 1:return r[t];case 2:return a[t];case 4:return n[t];case 3:return s[t]}else{if(Ka(r,t))return i[t]=1,r[t];if(a!==me&&ie(a,t))return i[t]=2,a[t];if((l=e.propsOptions[0])&&ie(l,t))return i[t]=3,s[t];if(n!==me&&ie(n,t))return i[t]=4,n[t];ys&&(i[t]=0)}}const u=Zn[t];let f,h;if(u)return t==="$attrs"&&ze(e,"get",t),u(e);if((f=o.__cssModules)&&(f=f[t]))return f;if(n!==me&&ie(n,t))return i[t]=4,n[t];if(h=c.config.globalProperties,ie(h,t))return h[t]},set({_:e},t,n){const{data:r,setupState:a,ctx:s}=e;return Ka(a,t)?(a[t]=n,!0):r!==me&&ie(r,t)?(r[t]=n,!0):ie(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(s[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:a,propsOptions:s}},i){let o;return!!n[i]||e!==me&&ie(e,i)||Ka(t,i)||(o=s[0])&&ie(o,i)||ie(r,i)||ie(Zn,i)||ie(a.config.globalProperties,i)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:ie(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};let ys=!0;function Td(e){const t=yi(e),n=e.proxy,r=e.ctx;ys=!1,t.beforeCreate&&no(t.beforeCreate,e,"bc");const{data:a,computed:s,methods:i,watch:o,provide:c,inject:l,created:u,beforeMount:f,mounted:h,beforeUpdate:y,updated:g,activated:_,deactivated:k,beforeDestroy:m,beforeUnmount:d,destroyed:b,unmounted:w,render:A,renderTracked:I,renderTriggered:T,errorCaptured:x,serverPrefetch:L,expose:U,inheritAttrs:V,components:H,directives:X,filters:$}=t;if(l&&Od(l,r,null,e.appContext.config.unwrapInjectedRef),i)for(const pe in i){const ue=i[pe];Z(ue)&&(r[pe]=ue.bind(n))}if(a){const pe=a.call(n,n);ye(pe)&&(e.data=be(pe))}if(ys=!0,s)for(const pe in s){const ue=s[pe],Ze=Z(ue)?ue.bind(n,n):Z(ue.get)?ue.get.bind(n,n):it,Vt=!Z(ue)&&Z(ue.set)?ue.set.bind(n):it,et=Ae({get:Ze,set:Vt});Object.defineProperty(r,pe,{enumerable:!0,configurable:!0,get:()=>et.value,set:je=>et.value=je})}if(o)for(const pe in o)wl(o[pe],r,n,pe);if(c){const pe=Z(c)?c.call(n):c;Reflect.ownKeys(pe).forEach(ue=>{Cn(ue,pe[ue])})}u&&no(u,e,"c");function ae(pe,ue){G(ue)?ue.forEach(Ze=>pe(Ze.bind(n))):ue&&pe(ue.bind(n))}if(ae(ml,f),ae(un,h),ae(wd,y),ae(gl,g),ae(dl,_),ae(pl,k),ae(yl,x),ae(kd,I),ae(Sd,T),ae(Ta,d),ae(vl,w),ae(xd,L),G(U))if(U.length){const pe=e.exposed||(e.exposed={});U.forEach(ue=>{Object.defineProperty(pe,ue,{get:()=>n[ue],set:Ze=>n[ue]=Ze})})}else e.exposed||(e.exposed={});A&&e.render===it&&(e.render=A),V!=null&&(e.inheritAttrs=V),H&&(e.components=H),X&&(e.directives=X)}function Od(e,t,n=it,r=!1){G(e)&&(e=bs(e));for(const a in e){const s=e[a];let i;ye(s)?"default"in s?i=Ve(s.from||a,s.default,!0):i=Ve(s.from||a):i=Ve(s),Se(i)&&r?Object.defineProperty(t,a,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):t[a]=i}}function no(e,t,n){Xe(G(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function wl(e,t,n,r){const a=r.includes(".")?cl(n,r):()=>n[r];if(ke(e)){const s=t[e];Z(s)&&Ft(a,s)}else if(Z(e))Ft(a,e.bind(n));else if(ye(e))if(G(e))e.forEach(s=>wl(s,t,n,r));else{const s=Z(e.handler)?e.handler.bind(n):t[e.handler];Z(s)&&Ft(a,s,e)}}function yi(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:a,optionsCache:s,config:{optionMergeStrategies:i}}=e.appContext,o=s.get(t);let c;return o?c=o:!a.length&&!n&&!r?c=t:(c={},a.length&&a.forEach(l=>oa(c,l,i,!0)),oa(c,t,i)),ye(t)&&s.set(t,c),c}function oa(e,t,n,r=!1){const{mixins:a,extends:s}=t;s&&oa(e,s,n,!0),a&&a.forEach(i=>oa(e,i,n,!0));for(const i in t)if(!(r&&i==="expose")){const o=Pd[i]||n&&n[i];e[i]=o?o(e[i],t[i]):t[i]}return e}const Pd={data:ro,props:Gt,emits:Gt,methods:Gt,computed:Gt,beforeCreate:Le,created:Le,beforeMount:Le,mounted:Le,beforeUpdate:Le,updated:Le,beforeDestroy:Le,beforeUnmount:Le,destroyed:Le,unmounted:Le,activated:Le,deactivated:Le,errorCaptured:Le,serverPrefetch:Le,components:Gt,directives:Gt,watch:Rd,provide:ro,inject:Id};function ro(e,t){return t?e?function(){return Re(Z(e)?e.call(this,this):e,Z(t)?t.call(this,this):t)}:t:e}function Id(e,t){return Gt(bs(e),bs(t))}function bs(e){if(G(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function Le(e,t){return e?[...new Set([].concat(e,t))]:t}function Gt(e,t){return e?Re(Re(Object.create(null),e),t):t}function Rd(e,t){if(!e)return t;if(!t)return e;const n=Re(Object.create(null),e);for(const r in t)n[r]=Le(e[r],t[r]);return n}function Md(e,t,n,r=!1){const a={},s={};ta(s,Oa,1),e.propsDefaults=Object.create(null),xl(e,t,a,s);for(const i in e.propsOptions[0])i in a||(a[i]=void 0);n?e.props=r?a:Vf(a):e.type.props?e.props=a:e.props=s,e.attrs=s}function Ld(e,t,n,r){const{props:a,attrs:s,vnode:{patchFlag:i}}=e,o=re(a),[c]=e.propsOptions;let l=!1;if((r||i>0)&&!(i&16)){if(i&8){const u=e.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(Aa(e.emitsOptions,h))continue;const y=t[h];if(c)if(ie(s,h))y!==s[h]&&(s[h]=y,l=!0);else{const g=ht(h);a[g]=_s(c,o,g,y,e,!1)}else y!==s[h]&&(s[h]=y,l=!0)}}}else{xl(e,t,a,s)&&(l=!0);let u;for(const f in o)(!t||!ie(t,f)&&((u=Hn(f))===f||!ie(t,u)))&&(c?n&&(n[f]!==void 0||n[u]!==void 0)&&(a[f]=_s(c,o,f,void 0,e,!0)):delete a[f]);if(s!==o)for(const f in s)(!t||!ie(t,f))&&(delete s[f],l=!0)}l&&_t(e,"set","$attrs")}function xl(e,t,n,r){const[a,s]=e.propsOptions;let i=!1,o;if(t)for(let c in t){if(Xn(c))continue;const l=t[c];let u;a&&ie(a,u=ht(c))?!s||!s.includes(u)?n[u]=l:(o||(o={}))[u]=l:Aa(e.emitsOptions,c)||(!(c in r)||l!==r[c])&&(r[c]=l,i=!0)}if(s){const c=re(n),l=o||me;for(let u=0;u<s.length;u++){const f=s[u];n[f]=_s(a,c,f,l[f],e,!ie(l,f))}}return i}function _s(e,t,n,r,a,s){const i=e[n];if(i!=null){const o=ie(i,"default");if(o&&r===void 0){const c=i.default;if(i.type!==Function&&Z(c)){const{propsDefaults:l}=a;n in l?r=l[n]:(Rn(a),r=l[n]=c.call(null,t),an())}else r=c}i[0]&&(s&&!o?r=!1:i[1]&&(r===""||r===Hn(n))&&(r=!0))}return r}function Sl(e,t,n=!1){const r=t.propsCache,a=r.get(e);if(a)return a;const s=e.props,i={},o=[];let c=!1;if(!Z(e)){const u=f=>{c=!0;const[h,y]=Sl(f,t,!0);Re(i,h),y&&o.push(...y)};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}if(!s&&!c)return ye(e)&&r.set(e,xn),xn;if(G(s))for(let u=0;u<s.length;u++){const f=ht(s[u]);ao(f)&&(i[f]=me)}else if(s)for(const u in s){const f=ht(u);if(ao(f)){const h=s[u],y=i[f]=G(h)||Z(h)?{type:h}:Object.assign({},h);if(y){const g=oo(Boolean,y.type),_=oo(String,y.type);y[0]=g>-1,y[1]=_<0||g<_,(g>-1||ie(y,"default"))&&o.push(f)}}}const l=[i,o];return ye(e)&&r.set(e,l),l}function ao(e){return e[0]!=="$"}function so(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:e===null?"null":""}function io(e,t){return so(e)===so(t)}function oo(e,t){return G(t)?t.findIndex(n=>io(n,e)):Z(t)&&io(t,e)?0:-1}const kl=e=>e[0]==="_"||e==="$stable",bi=e=>G(e)?e.map(qe):[qe(e)],Nd=(e,t,n)=>{if(t._n)return t;const r=pi((...a)=>bi(t(...a)),n);return r._c=!1,r},Al=(e,t,n)=>{const r=e._ctx;for(const a in e){if(kl(a))continue;const s=e[a];if(Z(s))t[a]=Nd(a,s,r);else if(s!=null){const i=bi(s);t[a]=()=>i}}},Cl=(e,t)=>{const n=bi(t);e.slots.default=()=>n},jd=(e,t)=>{if(e.vnode.shapeFlag&32){const n=t._;n?(e.slots=re(t),ta(t,"_",n)):Al(t,e.slots={})}else e.slots={},t&&Cl(e,t);ta(e.slots,Oa,1)},Hd=(e,t,n)=>{const{vnode:r,slots:a}=e;let s=!0,i=me;if(r.shapeFlag&32){const o=t._;o?n&&o===1?s=!1:(Re(a,t),!n&&o===1&&delete a._):(s=!t.$stable,Al(t,a)),i=t}else t&&(Cl(e,t),i={default:1});if(s)for(const o in a)!kl(o)&&!(o in i)&&delete a[o]};function El(){return{app:null,config:{isNativeTag:cf,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Dd=0;function $d(e,t){return function(r,a=null){Z(r)||(r=Object.assign({},r)),a!=null&&!ye(a)&&(a=null);const s=El(),i=new Set;let o=!1;const c=s.app={_uid:Dd++,_component:r,_props:a,_container:null,_context:s,_instance:null,version:Nl,get config(){return s.config},set config(l){},use(l,...u){return i.has(l)||(l&&Z(l.install)?(i.add(l),l.install(c,...u)):Z(l)&&(i.add(l),l(c,...u))),c},mixin(l){return s.mixins.includes(l)||s.mixins.push(l),c},component(l,u){return u?(s.components[l]=u,c):s.components[l]},directive(l,u){return u?(s.directives[l]=u,c):s.directives[l]},mount(l,u,f){if(!o){const h=ne(r,a);return h.appContext=s,u&&t?t(h,l):e(h,l,f),o=!0,c._container=l,l.__vue_app__=c,Pa(h.component)||h.component.proxy}},unmount(){o&&(e(null,c._container),delete c._container.__vue_app__)},provide(l,u){return s.provides[l]=u,c}};return c}}function ca(e,t,n,r,a=!1){if(G(e)){e.forEach((h,y)=>ca(h,t&&(G(t)?t[y]:t),n,r,a));return}if(En(r)&&!a)return;const s=r.shapeFlag&4?Pa(r.component)||r.component.proxy:r.el,i=a?null:s,{i:o,r:c}=e,l=t&&t.r,u=o.refs===me?o.refs={}:o.refs,f=o.setupState;if(l!=null&&l!==c&&(ke(l)?(u[l]=null,ie(f,l)&&(f[l]=null)):Se(l)&&(l.value=null)),Z(c))$t(c,o,12,[i,u]);else{const h=ke(c),y=Se(c);if(h||y){const g=()=>{if(e.f){const _=h?ie(f,c)?f[c]:u[c]:c.value;a?G(_)&&ti(_,s):G(_)?_.includes(s)||_.push(s):h?(u[c]=[s],ie(f,c)&&(f[c]=u[c])):(c.value=[s],e.k&&(u[e.k]=c.value))}else h?(u[c]=i,ie(f,c)&&(f[c]=i)):y&&(c.value=i,e.k&&(u[e.k]=i))};i?(g.id=-1,Ie(g,n)):g()}}}let Tt=!1;const Nr=e=>/svg/.test(e.namespaceURI)&&e.tagName!=="foreignObject",jr=e=>e.nodeType===8;function Fd(e){const{mt:t,p:n,o:{patchProp:r,createText:a,nextSibling:s,parentNode:i,remove:o,insert:c,createComment:l}}=e,u=(m,d)=>{if(!d.hasChildNodes()){n(null,m,d),aa(),d._vnode=m;return}Tt=!1,f(d.firstChild,m,null,null,null),aa(),d._vnode=m,Tt&&console.error("Hydration completed but contains mismatches.")},f=(m,d,b,w,A,I=!1)=>{const T=jr(m)&&m.data==="[",x=()=>_(m,d,b,w,A,T),{type:L,ref:U,shapeFlag:V,patchFlag:H}=d;let X=m.nodeType;d.el=m,H===-2&&(I=!1,d.dynamicChildren=null);let $=null;switch(L){case Pn:X!==3?d.children===""?(c(d.el=a(""),i(m),m),$=m):$=x():(m.data!==d.children&&(Tt=!0,m.data=d.children),$=s(m));break;case Qe:X!==8||T?$=x():$=s(m);break;case er:if(T&&(m=s(m),X=m.nodeType),X===1||X===3){$=m;const oe=!d.children.length;for(let ae=0;ae<d.staticCount;ae++)oe&&(d.children+=$.nodeType===1?$.outerHTML:$.data),ae===d.staticCount-1&&(d.anchor=$),$=s($);return T?s($):$}else x();break;case Fe:T?$=g(m,d,b,w,A,I):$=x();break;default:if(V&1)X!==1||d.type.toLowerCase()!==m.tagName.toLowerCase()?$=x():$=h(m,d,b,w,A,I);else if(V&6){d.slotScopeIds=A;const oe=i(m);if(t(d,oe,null,b,w,Nr(oe),I),$=T?k(m):s(m),$&&jr($)&&$.data==="teleport end"&&($=s($)),En(d)){let ae;T?(ae=ne(Fe),ae.anchor=$?$.previousSibling:oe.lastChild):ae=m.nodeType===3?la(""):ne("div"),ae.el=m,d.component.subTree=ae}}else V&64?X!==8?$=x():$=d.type.hydrate(m,d,b,w,A,I,e,y):V&128&&($=d.type.hydrate(m,d,b,w,Nr(i(m)),A,I,e,f))}return U!=null&&ca(U,null,w,d),$},h=(m,d,b,w,A,I)=>{I=I||!!d.dynamicChildren;const{type:T,props:x,patchFlag:L,shapeFlag:U,dirs:V}=d,H=T==="input"&&V||T==="option";if(H||L!==-1){if(V&&ft(d,null,b,"created"),x)if(H||!I||L&48)for(const $ in x)(H&&$.endsWith("value")||wr($)&&!Xn($))&&r(m,$,null,x[$],!1,void 0,b);else x.onClick&&r(m,"onClick",null,x.onClick,!1,void 0,b);let X;if((X=x&&x.onVnodeBeforeMount)&&De(X,b,d),V&&ft(d,null,b,"beforeMount"),((X=x&&x.onVnodeMounted)||V)&&ol(()=>{X&&De(X,b,d),V&&ft(d,null,b,"mounted")},w),U&16&&!(x&&(x.innerHTML||x.textContent))){let $=y(m.firstChild,d,m,b,w,A,I);for(;$;){Tt=!0;const oe=$;$=$.nextSibling,o(oe)}}else U&8&&m.textContent!==d.children&&(Tt=!0,m.textContent=d.children)}return m.nextSibling},y=(m,d,b,w,A,I,T)=>{T=T||!!d.dynamicChildren;const x=d.children,L=x.length;for(let U=0;U<L;U++){const V=T?x[U]:x[U]=qe(x[U]);if(m)m=f(m,V,w,A,I,T);else{if(V.type===Pn&&!V.children)continue;Tt=!0,n(null,V,b,null,w,A,Nr(b),I)}}return m},g=(m,d,b,w,A,I)=>{const{slotScopeIds:T}=d;T&&(A=A?A.concat(T):T);const x=i(m),L=y(s(m),d,x,b,w,A,I);return L&&jr(L)&&L.data==="]"?s(d.anchor=L):(Tt=!0,c(d.anchor=l("]"),x,L),L)},_=(m,d,b,w,A,I)=>{if(Tt=!0,d.el=null,I){const L=k(m);for(;;){const U=s(m);if(U&&U!==L)o(U);else break}}const T=s(m),x=i(m);return o(m),n(null,d,x,T,b,w,Nr(x),A),T},k=m=>{let d=0;for(;m;)if(m=s(m),m&&jr(m)&&(m.data==="["&&d++,m.data==="]")){if(d===0)return s(m);d--}return m};return[u,f]}const Ie=ol;function Bd(e){return Tl(e)}function zd(e){return Tl(e,Fd)}function Tl(e,t){const n=gf();n.__VUE__=!0;const{insert:r,remove:a,patchProp:s,createElement:i,createText:o,createComment:c,setText:l,setElementText:u,parentNode:f,nextSibling:h,setScopeId:y=it,insertStaticContent:g}=e,_=(p,v,S,C=null,O=null,M=null,D=!1,R=null,N=!!v.dynamicChildren)=>{if(p===v)return;p&&!at(p,v)&&(C=j(p),je(p,O,M,!0),p=null),v.patchFlag===-2&&(N=!1,v.dynamicChildren=null);const{type:P,ref:Y,shapeFlag:W}=v;switch(P){case Pn:k(p,v,S,C);break;case Qe:m(p,v,S,C);break;case er:p==null&&d(v,S,C,D);break;case Fe:H(p,v,S,C,O,M,D,R,N);break;default:W&1?A(p,v,S,C,O,M,D,R,N):W&6?X(p,v,S,C,O,M,D,R,N):(W&64||W&128)&&P.process(p,v,S,C,O,M,D,R,N,se)}Y!=null&&O&&ca(Y,p&&p.ref,M,v||p,!v)},k=(p,v,S,C)=>{if(p==null)r(v.el=o(v.children),S,C);else{const O=v.el=p.el;v.children!==p.children&&l(O,v.children)}},m=(p,v,S,C)=>{p==null?r(v.el=c(v.children||""),S,C):v.el=p.el},d=(p,v,S,C)=>{[p.el,p.anchor]=g(p.children,v,S,C,p.el,p.anchor)},b=({el:p,anchor:v},S,C)=>{let O;for(;p&&p!==v;)O=h(p),r(p,S,C),p=O;r(v,S,C)},w=({el:p,anchor:v})=>{let S;for(;p&&p!==v;)S=h(p),a(p),p=S;a(v)},A=(p,v,S,C,O,M,D,R,N)=>{D=D||v.type==="svg",p==null?I(v,S,C,O,M,D,R,N):L(p,v,O,M,D,R,N)},I=(p,v,S,C,O,M,D,R)=>{let N,P;const{type:Y,props:W,shapeFlag:q,transition:Q,dirs:te}=p;if(N=p.el=i(p.type,M,W&&W.is,W),q&8?u(N,p.children):q&16&&x(p.children,N,null,C,O,M&&Y!=="foreignObject",D,R),te&&ft(p,null,C,"created"),T(N,p,p.scopeId,D,C),W){for(const fe in W)fe!=="value"&&!Xn(fe)&&s(N,fe,null,W[fe],M,p.children,C,O,B);"value"in W&&s(N,"value",null,W.value),(P=W.onVnodeBeforeMount)&&De(P,C,p)}te&&ft(p,null,C,"beforeMount");const he=(!O||O&&!O.pendingBranch)&&Q&&!Q.persisted;he&&Q.beforeEnter(N),r(N,v,S),((P=W&&W.onVnodeMounted)||he||te)&&Ie(()=>{P&&De(P,C,p),he&&Q.enter(N),te&&ft(p,null,C,"mounted")},O)},T=(p,v,S,C,O)=>{if(S&&y(p,S),C)for(let M=0;M<C.length;M++)y(p,C[M]);if(O){let M=O.subTree;if(v===M){const D=O.vnode;T(p,D,D.scopeId,D.slotScopeIds,O.parent)}}},x=(p,v,S,C,O,M,D,R,N=0)=>{for(let P=N;P<p.length;P++){const Y=p[P]=R?Lt(p[P]):qe(p[P]);_(null,Y,v,S,C,O,M,D,R)}},L=(p,v,S,C,O,M,D)=>{const R=v.el=p.el;let{patchFlag:N,dynamicChildren:P,dirs:Y}=v;N|=p.patchFlag&16;const W=p.props||me,q=v.props||me;let Q;S&&Jt(S,!1),(Q=q.onVnodeBeforeUpdate)&&De(Q,S,v,p),Y&&ft(v,p,S,"beforeUpdate"),S&&Jt(S,!0);const te=O&&v.type!=="foreignObject";if(P?U(p.dynamicChildren,P,R,S,C,te,M):D||ue(p,v,R,null,S,C,te,M,!1),N>0){if(N&16)V(R,v,W,q,S,C,O);else if(N&2&&W.class!==q.class&&s(R,"class",null,q.class,O),N&4&&s(R,"style",W.style,q.style,O),N&8){const he=v.dynamicProps;for(let fe=0;fe<he.length;fe++){const Ce=he[fe],tt=W[Ce],hn=q[Ce];(hn!==tt||Ce==="value")&&s(R,Ce,tt,hn,O,p.children,S,C,B)}}N&1&&p.children!==v.children&&u(R,v.children)}else!D&&P==null&&V(R,v,W,q,S,C,O);((Q=q.onVnodeUpdated)||Y)&&Ie(()=>{Q&&De(Q,S,v,p),Y&&ft(v,p,S,"updated")},C)},U=(p,v,S,C,O,M,D)=>{for(let R=0;R<v.length;R++){const N=p[R],P=v[R],Y=N.el&&(N.type===Fe||!at(N,P)||N.shapeFlag&70)?f(N.el):S;_(N,P,Y,null,C,O,M,D,!0)}},V=(p,v,S,C,O,M,D)=>{if(S!==C){if(S!==me)for(const R in S)!Xn(R)&&!(R in C)&&s(p,R,S[R],null,D,v.children,O,M,B);for(const R in C){if(Xn(R))continue;const N=C[R],P=S[R];N!==P&&R!=="value"&&s(p,R,P,N,D,v.children,O,M,B)}"value"in C&&s(p,"value",S.value,C.value)}},H=(p,v,S,C,O,M,D,R,N)=>{const P=v.el=p?p.el:o(""),Y=v.anchor=p?p.anchor:o("");let{patchFlag:W,dynamicChildren:q,slotScopeIds:Q}=v;Q&&(R=R?R.concat(Q):Q),p==null?(r(P,S,C),r(Y,S,C),x(v.children,S,Y,O,M,D,R,N)):W>0&&W&64&&q&&p.dynamicChildren?(U(p.dynamicChildren,q,S,O,M,D,R),(v.key!=null||O&&v===O.subTree)&&Ol(p,v,!0)):ue(p,v,S,Y,O,M,D,R,N)},X=(p,v,S,C,O,M,D,R,N)=>{v.slotScopeIds=R,p==null?v.shapeFlag&512?O.ctx.activate(v,S,C,D,N):$(v,S,C,O,M,D,N):oe(p,v,N)},$=(p,v,S,C,O,M,D)=>{const R=p.component=Xd(p,C,O);if(Sr(p)&&(R.ctx.renderer=se),Qd(R),R.asyncDep){if(O&&O.registerDep(R,ae),!p.el){const N=R.subTree=ne(Qe);m(null,N,v,S)}return}ae(R,p,v,S,O,M,D)},oe=(p,v,S)=>{const C=v.component=p.component;if(od(p,v,S))if(C.asyncDep&&!C.asyncResolved){pe(C,v,S);return}else C.next=v,td(C.update),C.update();else v.el=p.el,C.vnode=v},ae=(p,v,S,C,O,M,D)=>{const R=()=>{if(p.isMounted){let{next:Y,bu:W,u:q,parent:Q,vnode:te}=p,he=Y,fe;Jt(p,!1),Y?(Y.el=te.el,pe(p,Y,D)):Y=te,W&&Qn(W),(fe=Y.props&&Y.props.onVnodeBeforeUpdate)&&De(fe,Q,Y,te),Jt(p,!0);const Ce=Fa(p),tt=p.subTree;p.subTree=Ce,_(tt,Ce,f(tt.el),j(tt),p,O,M),Y.el=Ce.el,he===null&&hi(p,Ce.el),q&&Ie(q,O),(fe=Y.props&&Y.props.onVnodeUpdated)&&Ie(()=>De(fe,Q,Y,te),O)}else{let Y;const{el:W,props:q}=v,{bm:Q,m:te,parent:he}=p,fe=En(v);if(Jt(p,!1),Q&&Qn(Q),!fe&&(Y=q&&q.onVnodeBeforeMount)&&De(Y,he,v),Jt(p,!0),W&&ee){const Ce=()=>{p.subTree=Fa(p),ee(W,p.subTree,p,O,null)};fe?v.type.__asyncLoader().then(()=>!p.isUnmounted&&Ce()):Ce()}else{const Ce=p.subTree=Fa(p);_(null,Ce,S,C,p,O,M),v.el=Ce.el}if(te&&Ie(te,O),!fe&&(Y=q&&q.onVnodeMounted)){const Ce=v;Ie(()=>De(Y,he,Ce),O)}(v.shapeFlag&256||he&&En(he.vnode)&&he.vnode.shapeFlag&256)&&p.a&&Ie(p.a,O),p.isMounted=!0,v=S=C=null}},N=p.effect=new si(R,()=>ka(P),p.scope),P=p.update=()=>N.run();P.id=p.uid,Jt(p,!0),P()},pe=(p,v,S)=>{v.component=p;const C=p.vnode.props;p.vnode=v,p.next=null,Ld(p,v.props,C,S),Hd(p,v.children,S),Dn(),Xi(),$n()},ue=(p,v,S,C,O,M,D,R,N=!1)=>{const P=p&&p.children,Y=p?p.shapeFlag:0,W=v.children,{patchFlag:q,shapeFlag:Q}=v;if(q>0){if(q&128){Vt(P,W,S,C,O,M,D,R,N);return}else if(q&256){Ze(P,W,S,C,O,M,D,R,N);return}}Q&8?(Y&16&&B(P,O,M),W!==P&&u(S,W)):Y&16?Q&16?Vt(P,W,S,C,O,M,D,R,N):B(P,O,M,!0):(Y&8&&u(S,""),Q&16&&x(W,S,C,O,M,D,R,N))},Ze=(p,v,S,C,O,M,D,R,N)=>{p=p||xn,v=v||xn;const P=p.length,Y=v.length,W=Math.min(P,Y);let q;for(q=0;q<W;q++){const Q=v[q]=N?Lt(v[q]):qe(v[q]);_(p[q],Q,S,null,O,M,D,R,N)}P>Y?B(p,O,M,!0,!1,W):x(v,S,C,O,M,D,R,N,W)},Vt=(p,v,S,C,O,M,D,R,N)=>{let P=0;const Y=v.length;let W=p.length-1,q=Y-1;for(;P<=W&&P<=q;){const Q=p[P],te=v[P]=N?Lt(v[P]):qe(v[P]);if(at(Q,te))_(Q,te,S,null,O,M,D,R,N);else break;P++}for(;P<=W&&P<=q;){const Q=p[W],te=v[q]=N?Lt(v[q]):qe(v[q]);if(at(Q,te))_(Q,te,S,null,O,M,D,R,N);else break;W--,q--}if(P>W){if(P<=q){const Q=q+1,te=Q<Y?v[Q].el:C;for(;P<=q;)_(null,v[P]=N?Lt(v[P]):qe(v[P]),S,te,O,M,D,R,N),P++}}else if(P>q)for(;P<=W;)je(p[P],O,M,!0),P++;else{const Q=P,te=P,he=new Map;for(P=te;P<=q;P++){const Ue=v[P]=N?Lt(v[P]):qe(v[P]);Ue.key!=null&&he.set(Ue.key,P)}let fe,Ce=0;const tt=q-te+1;let hn=!1,Fi=0;const zn=new Array(tt);for(P=0;P<tt;P++)zn[P]=0;for(P=Q;P<=W;P++){const Ue=p[P];if(Ce>=tt){je(Ue,O,M,!0);continue}let ut;if(Ue.key!=null)ut=he.get(Ue.key);else for(fe=te;fe<=q;fe++)if(zn[fe-te]===0&&at(Ue,v[fe])){ut=fe;break}ut===void 0?je(Ue,O,M,!0):(zn[ut-te]=P+1,ut>=Fi?Fi=ut:hn=!0,_(Ue,v[ut],S,null,O,M,D,R,N),Ce++)}const Bi=hn?Ud(zn):xn;for(fe=Bi.length-1,P=tt-1;P>=0;P--){const Ue=te+P,ut=v[Ue],zi=Ue+1<Y?v[Ue+1].el:C;zn[P]===0?_(null,ut,S,zi,O,M,D,R,N):hn&&(fe<0||P!==Bi[fe]?et(ut,S,zi,2):fe--)}}},et=(p,v,S,C,O=null)=>{const{el:M,type:D,transition:R,children:N,shapeFlag:P}=p;if(P&6){et(p.component.subTree,v,S,C);return}if(P&128){p.suspense.move(v,S,C);return}if(P&64){D.move(p,v,S,se);return}if(D===Fe){r(M,v,S);for(let W=0;W<N.length;W++)et(N[W],v,S,C);r(p.anchor,v,S);return}if(D===er){b(p,v,S);return}if(C!==2&&P&1&&R)if(C===0)R.beforeEnter(M),r(M,v,S),Ie(()=>R.enter(M),O);else{const{leave:W,delayLeave:q,afterLeave:Q}=R,te=()=>r(M,v,S),he=()=>{W(M,()=>{te(),Q&&Q()})};q?q(M,te,he):he()}else r(M,v,S)},je=(p,v,S,C=!1,O=!1)=>{const{type:M,props:D,ref:R,children:N,dynamicChildren:P,shapeFlag:Y,patchFlag:W,dirs:q}=p;if(R!=null&&ca(R,null,S,p,!0),Y&256){v.ctx.deactivate(p);return}const Q=Y&1&&q,te=!En(p);let he;if(te&&(he=D&&D.onVnodeBeforeUnmount)&&De(he,v,p),Y&6)E(p.component,S,C);else{if(Y&128){p.suspense.unmount(S,C);return}Q&&ft(p,null,v,"beforeUnmount"),Y&64?p.type.remove(p,v,S,O,se,C):P&&(M!==Fe||W>0&&W&64)?B(P,v,S,!1,!0):(M===Fe&&W&384||!O&&Y&16)&&B(N,v,S),C&&pn(p)}(te&&(he=D&&D.onVnodeUnmounted)||Q)&&Ie(()=>{he&&De(he,v,p),Q&&ft(p,null,v,"unmounted")},S)},pn=p=>{const{type:v,el:S,anchor:C,transition:O}=p;if(v===Fe){Tr(S,C);return}if(v===er){w(p);return}const M=()=>{a(S),O&&!O.persisted&&O.afterLeave&&O.afterLeave()};if(p.shapeFlag&1&&O&&!O.persisted){const{leave:D,delayLeave:R}=O,N=()=>D(S,M);R?R(p.el,M,N):N()}else M()},Tr=(p,v)=>{let S;for(;p!==v;)S=h(p),a(p),p=S;a(v)},E=(p,v,S)=>{const{bum:C,scope:O,update:M,subTree:D,um:R}=p;C&&Qn(C),O.stop(),M&&(M.active=!1,je(D,p,v,S)),R&&Ie(R,v),Ie(()=>{p.isUnmounted=!0},v),v&&v.pendingBranch&&!v.isUnmounted&&p.asyncDep&&!p.asyncResolved&&p.suspenseId===v.pendingId&&(v.deps--,v.deps===0&&v.resolve())},B=(p,v,S,C=!1,O=!1,M=0)=>{for(let D=M;D<p.length;D++)je(p[D],v,S,C,O)},j=p=>p.shapeFlag&6?j(p.component.subTree):p.shapeFlag&128?p.suspense.next():h(p.anchor||p.el),J=(p,v,S)=>{p==null?v._vnode&&je(v._vnode,null,null,!0):_(v._vnode||null,p,v,null,null,null,S),Xi(),aa(),v._vnode=p},se={p:_,um:je,m:et,r:pn,mt:$,mc:x,pc:ue,pbc:U,n:j,o:e};let _e,ee;return t&&([_e,ee]=t(se)),{render:J,hydrate:_e,createApp:$d(J,_e)}}function Jt({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function Ol(e,t,n=!1){const r=e.children,a=t.children;if(G(r)&&G(a))for(let s=0;s<r.length;s++){const i=r[s];let o=a[s];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=a[s]=Lt(a[s]),o.el=i.el),n||Ol(i,o)),o.type===Pn&&(o.el=i.el)}}function Ud(e){const t=e.slice(),n=[0];let r,a,s,i,o;const c=e.length;for(r=0;r<c;r++){const l=e[r];if(l!==0){if(a=n[n.length-1],e[a]<l){t[r]=a,n.push(r);continue}for(s=0,i=n.length-1;s<i;)o=s+i>>1,e[n[o]]<l?s=o+1:i=o;l<e[n[s]]&&(s>0&&(t[r]=n[s-1]),n[s]=r)}}for(s=n.length,i=n[s-1];s-- >0;)n[s]=i,i=t[i];return n}const Wd=e=>e.__isTeleport,Fe=Symbol(void 0),Pn=Symbol(void 0),Qe=Symbol(void 0),er=Symbol(void 0),tr=[];let Ge=null;function Ee(e=!1){tr.push(Ge=e?null:[])}function Pl(){tr.pop(),Ge=tr[tr.length-1]||null}let In=1;function co(e){In+=e}function Il(e){return e.dynamicChildren=In>0?Ge||xn:null,Pl(),In>0&&Ge&&Ge.push(e),e}function Ne(e,t,n,r,a,s){return Il(F(e,t,n,r,a,s,!0))}function qn(e,t,n,r,a){return Il(ne(e,t,n,r,a,!0))}function hr(e){return e?e.__v_isVNode===!0:!1}function at(e,t){return e.type===t.type&&e.key===t.key}const Oa="__vInternal",Rl=({key:e})=>e??null,Gr=({ref:e,ref_key:t,ref_for:n})=>e!=null?ke(e)||Se(e)||Z(e)?{i:Ke,r:e,k:t,f:!!n}:e:null;function F(e,t=null,n=null,r=0,a=null,s=e===Fe?0:1,i=!1,o=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Rl(t),ref:t&&Gr(t),scopeId:Ca,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:r,dynamicProps:a,dynamicChildren:null,appContext:null,ctx:Ke};return o?(_i(c,n),s&128&&e.normalize(c)):n&&(c.shapeFlag|=ke(n)?8:16),In>0&&!i&&Ge&&(c.patchFlag>0||s&6)&&c.patchFlag!==32&&Ge.push(c),c}const ne=Kd;function Kd(e,t=null,n=null,r=0,a=null,s=!1){if((!e||e===Ad)&&(e=Qe),hr(e)){const o=wt(e,t,!0);return n&&_i(o,n),In>0&&!s&&Ge&&(o.shapeFlag&6?Ge[Ge.indexOf(e)]=o:Ge.push(o)),o.patchFlag|=-2,o}if(np(e)&&(e=e.__vccOpts),t){t=Vd(t);let{class:o,style:c}=t;o&&!ke(o)&&(t.class=Be(o)),ye(c)&&(Yc(c)&&!G(c)&&(c=Re({},c)),t.style=_a(c))}const i=ke(e)?1:sl(e)?128:Wd(e)?64:ye(e)?4:Z(e)?2:0;return F(e,t,n,r,a,i,s,!0)}function Vd(e){return e?Yc(e)||Oa in e?Re({},e):e:null}function wt(e,t,n=!1){const{props:r,ref:a,patchFlag:s,children:i}=e,o=t?Yd(r||{},t):r;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:o,key:o&&Rl(o),ref:t&&t.ref?n&&a?G(a)?a.concat(Gr(t)):[a,Gr(t)]:Gr(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:i,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Fe?s===-1?16:s|16:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&wt(e.ssContent),ssFallback:e.ssFallback&&wt(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function la(e=" ",t=0){return ne(Pn,null,e,t)}function Jd(e,t){const n=ne(er,null,e);return n.staticCount=t,n}function qe(e){return e==null||typeof e=="boolean"?ne(Qe):G(e)?ne(Fe,null,e.slice()):typeof e=="object"?Lt(e):ne(Pn,null,String(e))}function Lt(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:wt(e)}function _i(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(G(t))n=16;else if(typeof t=="object")if(r&65){const a=t.default;a&&(a._c&&(a._d=!1),_i(e,a()),a._c&&(a._d=!0));return}else{n=32;const a=t._;!a&&!(Oa in t)?t._ctx=Ke:a===3&&Ke&&(Ke.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else Z(t)?(t={default:t,_ctx:Ke},n=32):(t=String(t),r&64?(n=16,t=[la(t)]):n=8);e.children=t,e.shapeFlag|=n}function Yd(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const a in r)if(a==="class")t.class!==r.class&&(t.class=Be([t.class,r.class]));else if(a==="style")t.style=_a([t.style,r.style]);else if(wr(a)){const s=t[a],i=r[a];i&&s!==i&&!(G(s)&&s.includes(i))&&(t[a]=s?[].concat(s,i):i)}else a!==""&&(t[a]=r[a])}return t}function De(e,t,n,r=null){Xe(e,t,7,[n,r])}const qd=El();let Gd=0;function Xd(e,t,n){const r=e.type,a=(t?t.appContext:e.appContext)||qd,s={uid:Gd++,vnode:e,type:r,parent:t,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,scope:new Lc(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(a.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Sl(r,a),emitsOptions:al(r,a),emit:null,emitted:null,propsDefaults:me,inheritAttrs:r.inheritAttrs,ctx:me,data:me,props:me,attrs:me,slots:me,refs:me,setupState:me,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=t?t.root:s,s.emit=rd.bind(null,s),e.ce&&e.ce(s),s}let xe=null;const fn=()=>xe||Ke,Rn=e=>{xe=e,e.scope.on()},an=()=>{xe&&xe.scope.off(),xe=null};function Ml(e){return e.vnode.shapeFlag&4}let Mn=!1;function Qd(e,t=!1){Mn=t;const{props:n,children:r}=e.vnode,a=Ml(e);Md(e,n,a,t),jd(e,r);const s=a?Zd(e,t):void 0;return Mn=!1,s}function Zd(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=On(new Proxy(e.ctx,Ed));const{setup:r}=n;if(r){const a=e.setupContext=r.length>1?tp(e):null;Rn(e),Dn();const s=$t(r,e,0,[e.props,a]);if($n(),an(),Pc(s)){if(s.then(an,an),t)return s.then(i=>{ws(e,i,t)}).catch(i=>{Fn(i,e,0)});e.asyncDep=s}else ws(e,s,t)}else Ll(e,t)}function ws(e,t,n){Z(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:ye(t)&&(e.setupState=Qc(t)),Ll(e,n)}let lo;function Ll(e,t,n){const r=e.type;if(!e.render){if(!t&&lo&&!r.render){const a=r.template||yi(e).template;if(a){const{isCustomElement:s,compilerOptions:i}=e.appContext.config,{delimiters:o,compilerOptions:c}=r,l=Re(Re({isCustomElement:s,delimiters:o},i),c);r.render=lo(a,l)}}e.render=r.render||it}Rn(e),Dn(),Td(e),$n(),an()}function ep(e){return new Proxy(e.attrs,{get(t,n){return ze(e,"get","$attrs"),t[n]}})}function tp(e){const t=r=>{e.exposed=r||{}};let n;return{get attrs(){return n||(n=ep(e))},slots:e.slots,emit:e.emit,expose:t}}function Pa(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Qc(On(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in Zn)return Zn[n](e)},has(t,n){return n in t||n in Zn}}))}function xs(e,t=!0){return Z(e)?e.displayName||e.name:e.name||t&&e.__name}function np(e){return Z(e)&&"__vccOpts"in e}const Ae=(e,t)=>Qf(e,t,Mn);function ct(e,t,n){const r=arguments.length;return r===2?ye(t)&&!G(t)?hr(t)?ne(e,null,[t]):ne(e,t):ne(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&hr(n)&&(n=[n]),ne(e,t,n))}const rp=Symbol(""),ap=()=>Ve(rp),Nl="3.2.47",sp="http://www.w3.org/2000/svg",Qt=typeof document<"u"?document:null,uo=Qt&&Qt.createElement("template"),ip={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const a=t?Qt.createElementNS(sp,e):Qt.createElement(e,n?{is:n}:void 0);return e==="select"&&r&&r.multiple!=null&&a.setAttribute("multiple",r.multiple),a},createText:e=>Qt.createTextNode(e),createComment:e=>Qt.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Qt.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,a,s){const i=n?n.previousSibling:t.lastChild;if(a&&(a===s||a.nextSibling))for(;t.insertBefore(a.cloneNode(!0),n),!(a===s||!(a=a.nextSibling)););else{uo.innerHTML=r?`<svg>${e}</svg>`:e;const o=uo.content;if(r){const c=o.firstChild;for(;c.firstChild;)o.appendChild(c.firstChild);o.removeChild(c)}t.insertBefore(o,n)}return[i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}};function op(e,t,n){const r=e._vtc;r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}function cp(e,t,n){const r=e.style,a=ke(n);if(n&&!a){if(t&&!ke(t))for(const s in t)n[s]==null&&Ss(r,s,"");for(const s in n)Ss(r,s,n[s])}else{const s=r.display;a?t!==n&&(r.cssText=n):t&&e.removeAttribute("style"),"_vod"in e&&(r.display=s)}}const fo=/\s*!important$/;function Ss(e,t,n){if(G(n))n.forEach(r=>Ss(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=lp(e,t);fo.test(n)?e.setProperty(Hn(r),n.replace(fo,""),"important"):e[r]=n}}const po=["Webkit","Moz","ms"],Va={};function lp(e,t){const n=Va[t];if(n)return n;let r=ht(t);if(r!=="filter"&&r in e)return Va[t]=r;r=xa(r);for(let a=0;a<po.length;a++){const s=po[a]+r;if(s in e)return Va[t]=s}return t}const ho="http://www.w3.org/1999/xlink";function up(e,t,n,r,a){if(r&&t.startsWith("xlink:"))n==null?e.removeAttributeNS(ho,t.slice(6,t.length)):e.setAttributeNS(ho,t,n);else{const s=of(t);n==null||s&&!Ec(n)?e.removeAttribute(t):e.setAttribute(t,s?"":n)}}function fp(e,t,n,r,a,s,i){if(t==="innerHTML"||t==="textContent"){r&&i(r,a,s),e[t]=n??"";return}if(t==="value"&&e.tagName!=="PROGRESS"&&!e.tagName.includes("-")){e._value=n;const c=n??"";(e.value!==c||e.tagName==="OPTION")&&(e.value=c),n==null&&e.removeAttribute(t);return}let o=!1;if(n===""||n==null){const c=typeof e[t];c==="boolean"?n=Ec(n):n==null&&c==="string"?(n="",o=!0):c==="number"&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(t)}function dp(e,t,n,r){e.addEventListener(t,n,r)}function pp(e,t,n,r){e.removeEventListener(t,n,r)}function hp(e,t,n,r,a=null){const s=e._vei||(e._vei={}),i=s[t];if(r&&i)i.value=r;else{const[o,c]=mp(t);if(r){const l=s[t]=yp(r,a);dp(e,o,l,c)}else i&&(pp(e,o,i,c),s[t]=void 0)}}const mo=/(?:Once|Passive|Capture)$/;function mp(e){let t;if(mo.test(e)){t={};let r;for(;r=e.match(mo);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):Hn(e.slice(2)),t]}let Ja=0;const gp=Promise.resolve(),vp=()=>Ja||(gp.then(()=>Ja=0),Ja=Date.now());function yp(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;Xe(bp(r,n.value),t,5,[r])};return n.value=e,n.attached=vp(),n}function bp(e,t){if(G(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>a=>!a._stopped&&r&&r(a))}else return t}const go=/^on[a-z]/,_p=(e,t,n,r,a=!1,s,i,o,c)=>{t==="class"?op(e,r,a):t==="style"?cp(e,n,r):wr(t)?ei(t)||hp(e,t,n,r,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):wp(e,t,r,a))?fp(e,t,r,s,i,o,c):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),up(e,t,r,a))};function wp(e,t,n,r){return r?!!(t==="innerHTML"||t==="textContent"||t in e&&go.test(t)&&Z(n)):t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA"||go.test(t)&&ke(n)?!1:t in e}const Ot="transition",Un="animation",wi=(e,{slots:t})=>ct(ll,xp(e),t);wi.displayName="Transition";const jl={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String};wi.props=Re({},ll.props,jl);const Yt=(e,t=[])=>{G(e)?e.forEach(n=>n(...t)):e&&e(...t)},vo=e=>e?G(e)?e.some(t=>t.length>1):e.length>1:!1;function xp(e){const t={};for(const H in e)H in jl||(t[H]=e[H]);if(e.css===!1)return t;const{name:n="v",type:r,duration:a,enterFromClass:s=`${n}-enter-from`,enterActiveClass:i=`${n}-enter-active`,enterToClass:o=`${n}-enter-to`,appearFromClass:c=s,appearActiveClass:l=i,appearToClass:u=o,leaveFromClass:f=`${n}-leave-from`,leaveActiveClass:h=`${n}-leave-active`,leaveToClass:y=`${n}-leave-to`}=e,g=Sp(a),_=g&&g[0],k=g&&g[1],{onBeforeEnter:m,onEnter:d,onEnterCancelled:b,onLeave:w,onLeaveCancelled:A,onBeforeAppear:I=m,onAppear:T=d,onAppearCancelled:x=b}=t,L=(H,X,$)=>{qt(H,X?u:o),qt(H,X?l:i),$&&$()},U=(H,X)=>{H._isLeaving=!1,qt(H,f),qt(H,y),qt(H,h),X&&X()},V=H=>(X,$)=>{const oe=H?T:d,ae=()=>L(X,H,$);Yt(oe,[X,ae]),yo(()=>{qt(X,H?c:s),Pt(X,H?u:o),vo(oe)||bo(X,r,_,ae)})};return Re(t,{onBeforeEnter(H){Yt(m,[H]),Pt(H,s),Pt(H,i)},onBeforeAppear(H){Yt(I,[H]),Pt(H,c),Pt(H,l)},onEnter:V(!1),onAppear:V(!0),onLeave(H,X){H._isLeaving=!0;const $=()=>U(H,X);Pt(H,f),Cp(),Pt(H,h),yo(()=>{H._isLeaving&&(qt(H,f),Pt(H,y),vo(w)||bo(H,r,k,$))}),Yt(w,[H,$])},onEnterCancelled(H){L(H,!1),Yt(b,[H])},onAppearCancelled(H){L(H,!0),Yt(x,[H])},onLeaveCancelled(H){U(H),Yt(A,[H])}})}function Sp(e){if(e==null)return null;if(ye(e))return[Ya(e.enter),Ya(e.leave)];{const t=Ya(e);return[t,t]}}function Ya(e){return Mc(e)}function Pt(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e._vtc||(e._vtc=new Set)).add(t)}function qt(e,t){t.split(/\s+/).forEach(r=>r&&e.classList.remove(r));const{_vtc:n}=e;n&&(n.delete(t),n.size||(e._vtc=void 0))}function yo(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let kp=0;function bo(e,t,n,r){const a=e._endId=++kp,s=()=>{a===e._endId&&r()};if(n)return setTimeout(s,n);const{type:i,timeout:o,propCount:c}=Ap(e,t);if(!i)return r();const l=i+"end";let u=0;const f=()=>{e.removeEventListener(l,h),s()},h=y=>{y.target===e&&++u>=c&&f()};setTimeout(()=>{u<c&&f()},o+1),e.addEventListener(l,h)}function Ap(e,t){const n=window.getComputedStyle(e),r=g=>(n[g]||"").split(", "),a=r(`${Ot}Delay`),s=r(`${Ot}Duration`),i=_o(a,s),o=r(`${Un}Delay`),c=r(`${Un}Duration`),l=_o(o,c);let u=null,f=0,h=0;t===Ot?i>0&&(u=Ot,f=i,h=s.length):t===Un?l>0&&(u=Un,f=l,h=c.length):(f=Math.max(i,l),u=f>0?i>l?Ot:Un:null,h=u?u===Ot?s.length:c.length:0);const y=u===Ot&&/\b(transform|all)(,|$)/.test(r(`${Ot}Property`).toString());return{type:u,timeout:f,propCount:h,hasTransform:y}}function _o(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,r)=>wo(n)+wo(e[r])))}function wo(e){return Number(e.slice(0,-1).replace(",","."))*1e3}function Cp(){return document.body.offsetHeight}const a_={beforeMount(e,{value:t},{transition:n}){e._vod=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):Wn(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:r}){!t!=!n&&(r?t?(r.beforeEnter(e),Wn(e,!0),r.enter(e)):r.leave(e,()=>{Wn(e,!1)}):Wn(e,t))},beforeUnmount(e,{value:t}){Wn(e,t)}};function Wn(e,t){e.style.display=t?e._vod:"none"}const Hl=Re({patchProp:_p},ip);let nr,xo=!1;function Ep(){return nr||(nr=Bd(Hl))}function Tp(){return nr=xo?nr:zd(Hl),xo=!0,nr}const Op=(...e)=>{const t=Ep().createApp(...e),{mount:n}=t;return t.mount=r=>{const a=Dl(r);if(!a)return;const s=t._component;!Z(s)&&!s.render&&!s.template&&(s.template=a.innerHTML),a.innerHTML="";const i=n(a,!1,a instanceof SVGElement);return a instanceof Element&&(a.removeAttribute("v-cloak"),a.setAttribute("data-v-app","")),i},t},Pp=(...e)=>{const t=Tp().createApp(...e),{mount:n}=t;return t.mount=r=>{const a=Dl(r);if(a)return n(a,!0,a instanceof SVGElement)},t};function Dl(e){return ke(e)?document.querySelector(e):e}const Ip=/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,Rp=/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,Mp=/^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;function Lp(e,t){if(e!=="__proto__"&&!(e==="constructor"&&t&&typeof t=="object"&&"prototype"in t))return t}function Np(e,t={}){if(typeof e!="string")return e;const n=e.toLowerCase().trim();if(n==="true")return!0;if(n==="false")return!1;if(n==="null")return null;if(n==="nan")return Number.NaN;if(n==="infinity")return Number.POSITIVE_INFINITY;if(n!=="undefined"){if(!Mp.test(e)){if(t.strict)throw new SyntaxError("Invalid JSON");return e}try{return Ip.test(e)||Rp.test(e)?JSON.parse(e,Lp):JSON.parse(e)}catch(r){if(t.strict)throw r;return e}}}const jp=/#/g,Hp=/&/g,Dp=/=/g,$l=/\+/g,$p=/%5e/gi,Fp=/%60/gi,Bp=/%7c/gi,zp=/%20/gi;function Up(e){return encodeURI(""+e).replace(Bp,"|")}function ks(e){return Up(typeof e=="string"?e:JSON.stringify(e)).replace($l,"%2B").replace(zp,"+").replace(jp,"%23").replace(Hp,"%26").replace(Fp,"`").replace($p,"^")}function qa(e){return ks(e).replace(Dp,"%3D")}function Fl(e=""){try{return decodeURIComponent(""+e)}catch{return""+e}}function Wp(e){return Fl(e.replace($l," "))}function Kp(e=""){const t={};e[0]==="?"&&(e=e.slice(1));for(const n of e.split("&")){const r=n.match(/([^=]+)=?(.*)/)||[];if(r.length<2)continue;const a=Fl(r[1]);if(a==="__proto__"||a==="constructor")continue;const s=Wp(r[2]||"");typeof t[a]<"u"?Array.isArray(t[a])?t[a].push(s):t[a]=[t[a],s]:t[a]=s}return t}function Vp(e,t){return(typeof t=="number"||typeof t=="boolean")&&(t=String(t)),t?Array.isArray(t)?t.map(n=>`${qa(e)}=${ks(n)}`).join("&"):`${qa(e)}=${ks(t)}`:qa(e)}function Jp(e){return Object.keys(e).filter(t=>e[t]!==void 0).map(t=>Vp(t,e[t])).join("&")}const Yp=/^\w{2,}:([/\\]{1,2})/,qp=/^\w{2,}:([/\\]{2})?/,Gp=/^([/\\]\s*){2,}[^/\\]/;function Ia(e,t={}){return typeof t=="boolean"&&(t={acceptRelative:t}),t.strict?Yp.test(e):qp.test(e)||(t.acceptRelative?Gp.test(e):!1)}const Xp=/\/$|\/\?/;function As(e="",t=!1){return t?Xp.test(e):e.endsWith("/")}function Bl(e="",t=!1){if(!t)return(As(e)?e.slice(0,-1):e)||"/";if(!As(e,!0))return e||"/";const[n,...r]=e.split("?");return(n.slice(0,-1)||"/")+(r.length>0?`?${r.join("?")}`:"")}function Qp(e="",t=!1){if(!t)return e.endsWith("/")?e:e+"/";if(As(e,!0))return e||"/";const[n,...r]=e.split("?");return n+"/"+(r.length>0?`?${r.join("?")}`:"")}function Zp(e=""){return e.startsWith("/")}function eh(e=""){return(Zp(e)?e.slice(1):e)||"/"}function th(e,t){if(zl(t)||Ia(e))return e;const n=Bl(t);return e.startsWith(n)?e:Ra(n,e)}function So(e,t){if(zl(t))return e;const n=Bl(t);if(!e.startsWith(n))return e;const r=e.slice(n.length);return r[0]==="/"?r:"/"+r}function nh(e,t){const n=xi(e),r={...Kp(n.search),...t};return n.search=Jp(r),ah(n)}function zl(e){return!e||e==="/"}function rh(e){return e&&e!=="/"}function Ra(e,...t){let n=e||"";for(const r of t.filter(a=>rh(a)))n=n?Qp(n)+eh(r):r;return n}function xi(e="",t){if(!Ia(e,{acceptRelative:!0}))return t?xi(t+e):ko(e);const[n="",r,a=""]=(e.replace(/\\/g,"/").match(/([^/:]+:)?\/\/([^/@]+@)?(.*)/)||[]).splice(1),[s="",i=""]=(a.match(/([^#/?]*)(.*)?/)||[]).splice(1),{pathname:o,search:c,hash:l}=ko(i.replace(/\/(?=[A-Za-z]:)/,""));return{protocol:n,auth:r?r.slice(0,Math.max(0,r.length-1)):"",host:s,pathname:o,search:c,hash:l}}function ko(e=""){const[t="",n="",r=""]=(e.match(/([^#?]*)(\?[^#]*)?(#.*)?/)||[]).splice(1);return{pathname:t,search:n,hash:r}}function ah(e){const t=e.pathname+(e.search?(e.search.startsWith("?")?"":"?")+e.search:"")+e.hash;return e.protocol?e.protocol+"//"+(e.auth?e.auth+"@":"")+e.host+t:t}class sh extends Error{constructor(){super(...arguments),this.name="FetchError"}}function ih(e,t,n){let r="";t&&(r=t.message),e&&n?r=`${r} (${n.status} ${n.statusText} (${e.toString()}))`:e&&(r=`${r} (${e.toString()})`);const a=new sh(r);return Object.defineProperty(a,"request",{get(){return e}}),Object.defineProperty(a,"response",{get(){return n}}),Object.defineProperty(a,"data",{get(){return n&&n._data}}),Object.defineProperty(a,"status",{get(){return n&&n.status}}),Object.defineProperty(a,"statusText",{get(){return n&&n.statusText}}),Object.defineProperty(a,"statusCode",{get(){return n&&n.status}}),Object.defineProperty(a,"statusMessage",{get(){return n&&n.statusText}}),a}const oh=new Set(Object.freeze(["PATCH","POST","PUT","DELETE"]));function Ao(e="GET"){return oh.has(e.toUpperCase())}function ch(e){if(e===void 0)return!1;const t=typeof e;return t==="string"||t==="number"||t==="boolean"||t===null?!0:t!=="object"?!1:Array.isArray(e)?!0:e.constructor&&e.constructor.name==="Object"||typeof e.toJSON=="function"}const lh=new Set(["image/svg","application/xml","application/xhtml","application/html"]),uh=/^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;function fh(e=""){if(!e)return"json";const t=e.split(";").shift()||"";return uh.test(t)?"json":lh.has(t)||t.startsWith("text/")?"text":"blob"}const dh=new Set([408,409,425,429,500,502,503,504]);function Ul(e){const{fetch:t,Headers:n}=e;function r(i){const o=i.error&&i.error.name==="AbortError"||!1;if(i.options.retry!==!1&&!o){let l;typeof i.options.retry=="number"?l=i.options.retry:l=Ao(i.options.method)?0:1;const u=i.response&&i.response.status||500;if(l>0&&dh.has(u))return a(i.request,{...i.options,retry:l-1})}const c=ih(i.request,i.error,i.response);throw Error.captureStackTrace&&Error.captureStackTrace(c,a),c}const a=async function(o,c={}){const l={request:o,options:{...e.defaults,...c},response:void 0,error:void 0};l.options.onRequest&&await l.options.onRequest(l),typeof l.request=="string"&&(l.options.baseURL&&(l.request=th(l.request,l.options.baseURL)),(l.options.query||l.options.params)&&(l.request=nh(l.request,{...l.options.params,...l.options.query})),l.options.body&&Ao(l.options.method)&&ch(l.options.body)&&(l.options.body=typeof l.options.body=="string"?l.options.body:JSON.stringify(l.options.body),l.options.headers=new n(l.options.headers),l.options.headers.has("content-type")||l.options.headers.set("content-type","application/json"),l.options.headers.has("accept")||l.options.headers.set("accept","application/json"))),l.response=await t(l.request,l.options).catch(async f=>(l.error=f,l.options.onRequestError&&await l.options.onRequestError(l),r(l)));const u=(l.options.parseResponse?"json":l.options.responseType)||fh(l.response.headers.get("content-type")||"");if(u==="json"){const f=await l.response.text(),h=l.options.parseResponse||Np;l.response._data=h(f)}else u==="stream"?l.response._data=l.response.body:l.response._data=await l.response[u]();return l.options.onResponse&&await l.options.onResponse(l),l.response.status>=400&&l.response.status<600?(l.options.onResponseError&&await l.options.onResponseError(l),r(l)):l.response},s=function(o,c){return a(o,c).then(l=>l._data)};return s.raw=a,s.native=t,s.create=(i={})=>Ul({...e,defaults:{...e.defaults,...i}}),s}const Wl=function(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")}(),ph=Wl.fetch||(()=>Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),hh=Wl.Headers,mh=Ul({fetch:ph,Headers:hh}),gh=mh,vh=()=>{var e;return((e=window==null?void 0:window.__NUXT__)==null?void 0:e.config)||{}},ua=vh().app,yh=()=>ua.baseURL,bh=()=>ua.buildAssetsDir,_h=(...e)=>Ra(Kl(),bh(),...e),Kl=(...e)=>{const t=ua.cdnURL||ua.baseURL;return e.length?Ra(t,...e):t};globalThis.__buildAssetsURL=_h,globalThis.__publicAssetsURL=Kl;function Cs(e,t={},n){for(const r in e){const a=e[r],s=n?`${n}:${r}`:r;typeof a=="object"&&a!==null?Cs(a,t,s):typeof a=="function"&&(t[s]=a)}return t}const wh={run:e=>e()},xh=()=>wh,Vl=typeof console.createTask<"u"?console.createTask:xh;function Sh(e,t){const n=t.shift(),r=Vl(n);return e.reduce((a,s)=>a.then(()=>r.run(()=>s(...t))),Promise.resolve())}function kh(e,t){const n=t.shift(),r=Vl(n);return Promise.all(e.map(a=>r.run(()=>a(...t))))}function Ga(e,t){for(const n of[...e])n(t)}class Ah{constructor(){this._hooks={},this._before=void 0,this._after=void 0,this._deprecatedMessages=void 0,this._deprecatedHooks={},this.hook=this.hook.bind(this),this.callHook=this.callHook.bind(this),this.callHookWith=this.callHookWith.bind(this)}hook(t,n,r={}){if(!t||typeof n!="function")return()=>{};const a=t;let s;for(;this._deprecatedHooks[t];)s=this._deprecatedHooks[t],t=s.to;if(s&&!r.allowDeprecated){let i=s.message;i||(i=`${a} hook has been deprecated`+(s.to?`, please use ${s.to}`:"")),this._deprecatedMessages||(this._deprecatedMessages=new Set),this._deprecatedMessages.has(i)||(console.warn(i),this._deprecatedMessages.add(i))}if(!n.name)try{Object.defineProperty(n,"name",{get:()=>"_"+t.replace(/\W+/g,"_")+"_hook_cb",configurable:!0})}catch{}return this._hooks[t]=this._hooks[t]||[],this._hooks[t].push(n),()=>{n&&(this.removeHook(t,n),n=void 0)}}hookOnce(t,n){let r,a=(...s)=>(typeof r=="function"&&r(),r=void 0,a=void 0,n(...s));return r=this.hook(t,a),r}removeHook(t,n){if(this._hooks[t]){const r=this._hooks[t].indexOf(n);r!==-1&&this._hooks[t].splice(r,1),this._hooks[t].length===0&&delete this._hooks[t]}}deprecateHook(t,n){this._deprecatedHooks[t]=typeof n=="string"?{to:n}:n;const r=this._hooks[t]||[];delete this._hooks[t];for(const a of r)this.hook(t,a)}deprecateHooks(t){Object.assign(this._deprecatedHooks,t);for(const n in t)this.deprecateHook(n,t[n])}addHooks(t){const n=Cs(t),r=Object.keys(n).map(a=>this.hook(a,n[a]));return()=>{for(const a of r.splice(0,r.length))a()}}removeHooks(t){const n=Cs(t);for(const r in n)this.removeHook(r,n[r])}removeAllHooks(){for(const t in this._hooks)delete this._hooks[t]}callHook(t,...n){return n.unshift(t),this.callHookWith(Sh,t,...n)}callHookParallel(t,...n){return n.unshift(t),this.callHookWith(kh,t,...n)}callHookWith(t,n,...r){const a=this._before||this._after?{name:n,args:r,context:{}}:void 0;this._before&&Ga(this._before,a);const s=t(n in this._hooks?[...this._hooks[n]]:[],r);return s instanceof Promise?s.finally(()=>{this._after&&a&&Ga(this._after,a)}):(this._after&&a&&Ga(this._after,a),s)}beforeEach(t){return this._before=this._before||[],this._before.push(t),()=>{if(this._before!==void 0){const n=this._before.indexOf(t);n!==-1&&this._before.splice(n,1)}}}afterEach(t){return this._after=this._after||[],this._after.push(t),()=>{if(this._after!==void 0){const n=this._after.indexOf(t);n!==-1&&this._after.splice(n,1)}}}}function Jl(){return new Ah}function Ch(){let e,t=!1;const n=r=>{if(e&&e!==r)throw new Error("Context conflict")};return{use:()=>{if(e===void 0)throw new Error("Context is not available");return e},tryUse:()=>e,set:(r,a)=>{a||n(r),e=r,t=!0},unset:()=>{e=void 0,t=!1},call:(r,a)=>{n(r),e=r;try{return a()}finally{t||(e=void 0)}},async callAsync(r,a){e=r;const s=()=>{e=r},i=()=>e===r?s:void 0;Es.add(i);try{const o=a();return t||(e=void 0),await o}finally{Es.delete(i)}}}}function Eh(){const e={};return{get(t){return e[t]||(e[t]=Ch()),e[t],e[t]}}}const fa=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof global<"u"?global:typeof window<"u"?window:{},Co="__unctx__",Th=fa[Co]||(fa[Co]=Eh()),Oh=e=>Th.get(e),Eo="__unctx_async_handlers__",Es=fa[Eo]||(fa[Eo]=new Set);function Ts(e){const t=[];for(const a of Es){const s=a();s&&t.push(s)}const n=()=>{for(const a of t)a()};let r=e();return r&&typeof r=="object"&&"catch"in r&&(r=r.catch(a=>{throw n(),a})),[r,n]}const Yl=Oh("nuxt-app"),Ph="__nuxt_plugin";function Ih(e){let t=0;const n={provide:void 0,globalName:"nuxt",versions:{get nuxt(){return"3.3.3"},get vue(){return n.vueApp.version}},payload:be({data:{},state:{},_errors:{},...window.__NUXT__}),static:{data:{}},isHydrating:!0,deferHydration(){if(!n.isHydrating)return()=>{};t++;let s=!1;return()=>{if(!s&&(s=!0,t--,t===0))return n.isHydrating=!1,n.callHook("app:suspense:resolve")}},_asyncDataPromises:{},_asyncData:{},...e};n.hooks=Jl(),n.hook=n.hooks.hook,n.callHook=n.hooks.callHook,n.provide=(s,i)=>{const o="$"+s;Hr(n,o,i),Hr(n.vueApp.config.globalProperties,o,i)},Hr(n.vueApp,"$nuxt",n),Hr(n.vueApp.config.globalProperties,"$nuxt",n);{window.addEventListener("nuxt.preloadError",i=>{n.callHook("app:chunkError",{error:i.payload})});const s=n.hook("app:error",(...i)=>{console.error("[nuxt] error caught during app initialization",...i)});n.hook("app:mounted",s)}const r=be(n.payload.config),a=new Proxy(r,{get(s,i){return i==="public"?s.public:s[i]??s.public[i]},set(s,i,o){return i==="public"||i==="app"?!1:(s[i]=o,s.public[i]=o,!0)}});return n.provide("config",a),n}async function Rh(e,t){if(typeof t!="function")return;const{provide:n}=await yt(e,t,[e])||{};if(n&&typeof n=="object")for(const r in n)e.provide(r,n[r])}async function Mh(e,t){for(const n of t)await Rh(e,n)}function Lh(e){return e.map(n=>typeof n!="function"?null:n.length>1?r=>n(r,r.provide):n).filter(Boolean)}function Kt(e){return e[Ph]=!0,e}function yt(e,t,n){const r=()=>n?t(...n):t();return Yl.set(e),r()}function Te(){const e=Yl.tryUse();if(!e){const t=fn();if(!t)throw new Error("nuxt instance unavailable");return t.appContext.app.$nuxt}return e}function ql(){return Te().$config}function Hr(e,t,n){Object.defineProperty(e,t,{get:()=>n})}const Nh=!1;/*!
  * pinia v2.0.34
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */let Gl;const kr=e=>Gl=e,Xl=Symbol();function Os(e){return e&&typeof e=="object"&&Object.prototype.toString.call(e)==="[object Object]"&&typeof e.toJSON!="function"}var rr;(function(e){e.direct="direct",e.patchObject="patch object",e.patchFunction="patch function"})(rr||(rr={}));function jh(){const e=Nc(!0),t=e.run(()=>ot({}));let n=[],r=[];const a=On({install(s){kr(a),a._a=s,s.provide(Xl,a),s.config.globalProperties.$pinia=a,r.forEach(i=>n.push(i)),r=[]},use(s){return!this._a&&!Nh?r.push(s):n.push(s),this},_p:n,_a:null,_e:e,_s:new Map,state:t});return a}const Ql=()=>{};function To(e,t,n,r=Ql){e.push(t);const a=()=>{const s=e.indexOf(t);s>-1&&(e.splice(s,1),r())};return!n&&jc()&&yf(a),a}function mn(e,...t){e.slice().forEach(n=>{n(...t)})}function Ps(e,t){e instanceof Map&&t instanceof Map&&t.forEach((n,r)=>e.set(r,n)),e instanceof Set&&t instanceof Set&&t.forEach(e.add,e);for(const n in t){if(!t.hasOwnProperty(n))continue;const r=t[n],a=e[n];Os(a)&&Os(r)&&e.hasOwnProperty(n)&&!Se(r)&&!Dt(r)?e[n]=Ps(a,r):e[n]=r}return e}const Hh=Symbol();function Dh(e){return!Os(e)||!e.hasOwnProperty(Hh)}const{assign:Mt}=Object;function $h(e){return!!(Se(e)&&e.effect)}function Fh(e,t,n,r){const{state:a,actions:s,getters:i}=t,o=n.state.value[e];let c;function l(){o||(n.state.value[e]=a?a():{});const u=qf(n.state.value[e]);return Mt(u,s,Object.keys(i||{}).reduce((f,h)=>(f[h]=On(Ae(()=>{kr(n);const y=n._s.get(e);return i[h].call(y,y)})),f),{}))}return c=Zl(e,l,t,n,r,!0),c}function Zl(e,t,n={},r,a,s){let i;const o=Mt({actions:{}},n),c={deep:!0};let l,u,f=On([]),h=On([]),y;const g=r.state.value[e];!s&&!g&&(r.state.value[e]={}),ot({});let _;function k(T){let x;l=u=!1,typeof T=="function"?(T(r.state.value[e]),x={type:rr.patchFunction,storeId:e,events:y}):(Ps(r.state.value[e],T),x={type:rr.patchObject,payload:T,storeId:e,events:y});const L=_=Symbol();ln().then(()=>{_===L&&(l=!0)}),u=!0,mn(f,x,r.state.value[e])}const m=s?function(){const{state:x}=n,L=x?x():{};this.$patch(U=>{Mt(U,L)})}:Ql;function d(){i.stop(),f=[],h=[],r._s.delete(e)}function b(T,x){return function(){kr(r);const L=Array.from(arguments),U=[],V=[];function H(oe){U.push(oe)}function X(oe){V.push(oe)}mn(h,{args:L,name:T,store:A,after:H,onError:X});let $;try{$=x.apply(this&&this.$id===e?this:A,L)}catch(oe){throw mn(V,oe),oe}return $ instanceof Promise?$.then(oe=>(mn(U,oe),oe)).catch(oe=>(mn(V,oe),Promise.reject(oe))):(mn(U,$),$)}}const w={_p:r,$id:e,$onAction:To.bind(null,h),$patch:k,$reset:m,$subscribe(T,x={}){const L=To(f,T,x.detached,()=>U()),U=i.run(()=>Ft(()=>r.state.value[e],V=>{(x.flush==="sync"?u:l)&&T({storeId:e,type:rr.direct,events:y},V)},Mt({},c,x)));return L},$dispose:d},A=be(w);r._s.set(e,A);const I=r._e.run(()=>(i=Nc(),i.run(()=>t())));for(const T in I){const x=I[T];if(Se(x)&&!$h(x)||Dt(x))s||(g&&Dh(x)&&(Se(x)?x.value=g[T]:Ps(x,g[T])),r.state.value[e][T]=x);else if(typeof x=="function"){const L=b(T,x);I[T]=L,o.actions[T]=x}}return Mt(A,I),Mt(re(A),I),Object.defineProperty(A,"$state",{get:()=>r.state.value[e],set:T=>{k(x=>{Mt(x,T)})}}),r._p.forEach(T=>{Mt(A,i.run(()=>T({store:A,app:r._a,pinia:r,options:o})))}),g&&s&&n.hydrate&&n.hydrate(A.$state,g),l=!0,u=!0,A}function eu(e,t,n){let r,a;const s=typeof t=="function";typeof e=="string"?(r=e,a=s?n:t):(a=e,r=e.id);function i(o,c){const l=fn();return o=o||l&&Ve(Xl,null),o&&kr(o),o=Gl,o._s.has(r)||(s?Zl(r,t,a,o):Fh(r,a,o)),o._s.get(r)}return i.$id=r,i}function Bh(e){return Array.isArray(e)?e:[e]}const tu=["title","script","style","noscript"],zh=["base","meta","link","style","script","noscript"],Uh=["title","titleTemplate","templateParams","base","htmlAttrs","bodyAttrs","meta","link","style","script","noscript"],Wh=["base","title","titleTemplate","bodyAttrs","htmlAttrs","templateParams"],Kh=["tagPosition","tagPriority","tagDuplicateStrategy","innerHTML","textContent"];function nu(e){let t=9;for(let n=0;n<e.length;)t=Math.imul(t^e.charCodeAt(n++),9**9);return((t^t>>>9)+65536).toString(16).substring(1,8).toLowerCase()}function Is(e){return nu(`${e.tag}:${e.textContent||e.innerHTML||""}:${Object.entries(e.props).map(([t,n])=>`${t}:${String(n)}`).join(",")}`)}function Vh(e){let t=9;for(const n of e)for(let r=0;r<n.length;)t=Math.imul(t^n.charCodeAt(r++),9**9);return((t^t>>>9)+65536).toString(16).substring(1,8).toLowerCase()}function ru(e,t){const{props:n,tag:r}=e;if(Wh.includes(r))return r;if(r==="link"&&n.rel==="canonical")return"canonical";if(n.charset)return"charset";const a=["id"];r==="meta"&&a.push("name","property","http-equiv");for(const s of a)if(typeof n[s]<"u"){const i=String(n[s]);return t&&!t(i)?!1:`${r}:${s}:${i}`}return!1}const Oo=(e,t)=>e==null?t||null:typeof e=="function"?e(t):e,Dr=(e,t=!1,n)=>{const{tag:r,$el:a}=e;a&&(Object.entries(r.props).forEach(([s,i])=>{i=String(i);const o=`attr:${s}`;if(s==="class"){if(!i)return;for(const c of i.split(" ")){const l=`${o}:${c}`;n&&n(e,l,()=>a.classList.remove(c)),a.classList.contains(c)||a.classList.add(c)}return}n&&!s.startsWith("data-h-")&&n(e,o,()=>a.removeAttribute(s)),(t||a.getAttribute(s)!==i)&&a.setAttribute(s,i)}),tu.includes(r.tag)&&(r.textContent&&r.textContent!==a.textContent?a.textContent=r.textContent:r.innerHTML&&r.innerHTML!==a.innerHTML&&(a.innerHTML=r.innerHTML)))};let Kn=!1;async function Jh(e,t={}){var h,y;const n={shouldRender:!0};if(await e.hooks.callHook("dom:beforeRender",n),!n.shouldRender)return;const r=t.document||e.resolvedOptions.document||window.document,a=(await e.resolveTags()).map(o);if(e.resolvedOptions.experimentalHashHydration&&(Kn=Kn||e._hash||!1,Kn)){const g=Vh(a.map(_=>_.tag._h));if(Kn===g)return;Kn=g}const s=e._popSideEffectQueue();e.headEntries().map(g=>g._sde).forEach(g=>{Object.entries(g).forEach(([_,k])=>{s[_]=k})});const i=(g,_,k)=>{_=`${g.renderId}:${_}`,g.entry&&(g.entry._sde[_]=k),delete s[_]};function o(g){const _=e.headEntries().find(m=>m._i===g._e),k={renderId:!g.key&&g._d?g._d:Is(g),$el:null,shouldRender:!0,tag:g,entry:_,markSideEffect:(m,d)=>i(k,m,d)};return k}const c=[],l={body:[],head:[]},u=g=>{e._elMap[g.renderId]=g.$el,c.push(g),i(g,"el",()=>{var _;(_=g.$el)==null||_.remove(),delete e._elMap[g.renderId]})};for(const g of a){if(await e.hooks.callHook("dom:beforeRenderTag",g),!g.shouldRender)continue;const{tag:_}=g;if(_.tag==="title"){r.title=_.textContent||"",c.push(g);continue}if(_.tag==="htmlAttrs"||_.tag==="bodyAttrs"){g.$el=r[_.tag==="htmlAttrs"?"documentElement":"body"],Dr(g,!1,i),c.push(g);continue}if(g.$el=e._elMap[g.renderId],!g.$el&&_.key&&(g.$el=r.querySelector(`${(h=_.tagPosition)!=null&&h.startsWith("body")?"body":"head"} > ${_.tag}[data-h-${_._h}]`)),g.$el){g.tag._d&&Dr(g),u(g);continue}l[(y=_.tagPosition)!=null&&y.startsWith("body")?"body":"head"].push(g)}const f={bodyClose:void 0,bodyOpen:void 0,head:void 0};Object.entries(l).forEach(([g,_])=>{var m;if(!_.length)return;const k=(m=r==null?void 0:r[g])==null?void 0:m.children;if(k){for(const d of[...k].reverse()){const b=d.tagName.toLowerCase();if(!zh.includes(b))continue;const w=d.getAttributeNames().reduce((x,L)=>({...x,[L]:d.getAttribute(L)}),{}),A={tag:b,props:w};d.innerHTML&&(A.innerHTML=d.innerHTML);const I=Is(A);let T=_.findIndex(x=>(x==null?void 0:x.renderId)===I);if(T===-1){const x=ru(A);T=_.findIndex(L=>(L==null?void 0:L.tag._d)&&L.tag._d===x)}if(T!==-1){const x=_[T];x.$el=d,Dr(x),u(x),delete _[T]}}_.forEach(d=>{const b=d.tag.tagPosition||"head";f[b]=f[b]||r.createDocumentFragment(),d.$el||(d.$el=r.createElement(d.tag.tag),Dr(d,!0)),f[b].appendChild(d.$el),u(d)})}}),f.head&&r.head.appendChild(f.head),f.bodyOpen&&r.body.insertBefore(f.bodyOpen,r.body.firstChild),f.bodyClose&&r.body.appendChild(f.bodyClose);for(const g of c)await e.hooks.callHook("dom:renderTag",g);Object.values(s).forEach(g=>g())}let Xa=null;async function Yh(e,t={}){function n(){return Xa=null,Jh(e,t)}const r=t.delayFn||(a=>setTimeout(a,10));return Xa=Xa||new Promise(a=>r(()=>a(n())))}const qh=e=>({hooks:{"entries:updated":function(t){if(typeof(e==null?void 0:e.document)>"u"&&typeof window>"u")return;let n=e==null?void 0:e.delayFn;!n&&typeof requestAnimationFrame<"u"&&(n=requestAnimationFrame),Yh(t,{document:(e==null?void 0:e.document)||window.document,delayFn:n})}}});function Gh(e){var t;return((t=e==null?void 0:e.head.querySelector('meta[name="unhead:ssr"]'))==null?void 0:t.getAttribute("content"))||!1}const Po={critical:2,high:9,low:12,base:-1,title:1,meta:10};function Io(e){if(typeof e.tagPriority=="number")return e.tagPriority;if(e.tag==="meta"){if(e.props.charset)return-2;if(e.props["http-equiv"]==="content-security-policy")return 0}const t=e.tagPriority||e.tag;return t in Po?Po[t]:10}const Xh=[{prefix:"before:",offset:-1},{prefix:"after:",offset:1}];function Qh(){return{hooks:{"tags:resolve":e=>{const t=n=>{var r;return(r=e.tags.find(a=>a._d===n))==null?void 0:r._p};for(const{prefix:n,offset:r}of Xh)for(const a of e.tags.filter(s=>typeof s.tagPriority=="string"&&s.tagPriority.startsWith(n))){const s=t(a.tagPriority.replace(n,""));typeof s<"u"&&(a._p=s+r)}e.tags.sort((n,r)=>n._p-r._p).sort((n,r)=>Io(n)-Io(r))}}}}const Zh=()=>({hooks:{"tags:resolve":e=>{const{tags:t}=e;let n=t.findIndex(a=>a.tag==="titleTemplate");const r=t.findIndex(a=>a.tag==="title");if(r!==-1&&n!==-1){const a=Oo(t[n].textContent,t[r].textContent);a!==null?t[r].textContent=a||t[r].textContent:delete t[r]}else if(n!==-1){const a=Oo(t[n].textContent);a!==null&&(t[n].textContent=a,t[n].tag="title",n=-1)}n!==-1&&delete t[n],e.tags=t.filter(Boolean)}}}),em=()=>({hooks:{"tag:normalise":function({tag:e}){typeof e.props.body<"u"&&(e.tagPosition="bodyClose",delete e.props.body)}}}),tm=["link","style","script","noscript"],nm=()=>({hooks:{"tag:normalise":({tag:e,resolvedOptions:t})=>{t.experimentalHashHydration===!0&&(e._h=Is(e)),e.key&&tm.includes(e.tag)&&(e._h=nu(e.key),e.props[`data-h-${e._h}`]="")}}}),Ro=["script","link","bodyAttrs"],rm=()=>{const e=(t,n)=>{const r={},a={};Object.entries(n.props).forEach(([i,o])=>{i.startsWith("on")&&typeof o=="function"?a[i]=o:r[i]=o});let s;return t==="dom"&&n.tag==="script"&&typeof r.src=="string"&&typeof a.onload<"u"&&(s=r.src,delete r.src),{props:r,eventHandlers:a,delayedSrc:s}};return{hooks:{"ssr:render":function(t){t.tags=t.tags.map(n=>(!Ro.includes(n.tag)||!Object.entries(n.props).find(([r,a])=>r.startsWith("on")&&typeof a=="function")||(n.props=e("ssr",n).props),n))},"dom:beforeRenderTag":function(t){if(!Ro.includes(t.tag.tag)||!Object.entries(t.tag.props).find(([s,i])=>s.startsWith("on")&&typeof i=="function"))return;const{props:n,eventHandlers:r,delayedSrc:a}=e("dom",t.tag);Object.keys(r).length&&(t.tag.props=n,t.tag._eventHandlers=r,t.tag._delayedSrc=a)},"dom:renderTag":function(t){const n=t.$el;if(!t.tag._eventHandlers||!n)return;const r=t.tag.tag==="bodyAttrs"&&typeof window<"u"?window:n;Object.entries(t.tag._eventHandlers).forEach(([a,s])=>{const i=`${t.tag._d||t.tag._p}:${a}`,o=a.slice(2).toLowerCase(),c=`data-h-${o}`;if(t.markSideEffect(i,()=>{}),n.hasAttribute(c))return;const l=s;n.setAttribute(c,""),r.addEventListener(o,l),t.entry&&(t.entry._sde[i]=()=>{r.removeEventListener(o,l),n.removeAttribute(c)})}),t.tag._delayedSrc&&n.setAttribute("src",t.tag._delayedSrc)}}}},am=["templateParams","htmlAttrs","bodyAttrs"],sm=()=>({hooks:{"tag:normalise":function({tag:e}){["hid","vmid","key"].forEach(n=>{e.props[n]&&(e.key=e.props[n],delete e.props[n])});const t=e.key?`${e.tag}:${e.key}`:ru(e);t&&(e._d=t)},"tags:resolve":function(e){const t={};e.tags.forEach(r=>{const a=r._d||r._p,s=t[a];if(s){let i=r==null?void 0:r.tagDuplicateStrategy;if(!i&&am.includes(r.tag)&&(i="merge"),i==="merge"){const c=s.props;["class","style"].forEach(l=>{r.props[l]&&c[l]&&(l==="style"&&!c[l].endsWith(";")&&(c[l]+=";"),r.props[l]=`${c[l]} ${r.props[l]}`)}),t[a].props={...c,...r.props};return}else if(r._e===s._e){s._duped=s._duped||[],r._d=`${s._d}:${s._duped.length+1}`,s._duped.push(r);return}const o=Object.keys(r.props).length;if((o===0||o===1&&typeof r.props["data-h-key"]<"u")&&!r.innerHTML&&!r.textContent){delete t[a];return}}t[a]=r});const n=[];Object.values(t).forEach(r=>{const a=r._duped;delete r._duped,n.push(r),a&&n.push(...a)}),e.tags=n}}});function $r(e,t){function n(s){if(["s","pageTitle"].includes(s))return t.pageTitle;let i;return s.includes(".")?i=s.split(".").reduce((o,c)=>o&&o[c]||void 0,t):i=t[s],typeof i<"u"?i||"":!1}let r=e;try{r=decodeURI(e)}catch{}return(r.match(/%(\w+\.+\w+)|%(\w+)/g)||[]).sort().reverse().forEach(s=>{const i=n(s.slice(1));typeof i=="string"&&(e=e.replaceAll(new RegExp(`\\${s}(\\W|$)`,"g"),`${i}$1`).trim())}),t.separator&&(e.endsWith(t.separator)&&(e=e.slice(0,-t.separator.length).trim()),e.startsWith(t.separator)&&(e=e.slice(t.separator.length).trim()),e=e.replace(new RegExp(`\\${t.separator}\\s*\\${t.separator}`,"g"),t.separator)),e}function im(){return{hooks:{"tags:resolve":e=>{var s;const{tags:t}=e,n=(s=t.find(i=>i.tag==="title"))==null?void 0:s.textContent,r=t.findIndex(i=>i.tag==="templateParams"),a=r!==-1?t[r].props:{};a.pageTitle=a.pageTitle||n||"";for(const i of t)if(["titleTemplate","title"].includes(i.tag)&&typeof i.textContent=="string")i.textContent=$r(i.textContent,a);else if(i.tag==="meta"&&typeof i.props.content=="string")i.props.content=$r(i.props.content,a);else if(i.tag==="link"&&typeof i.props.href=="string")i.props.href=$r(i.props.href,a);else if(i.tag==="script"&&["application/json","application/ld+json"].includes(i.props.type)&&typeof i.innerHTML=="string")try{i.innerHTML=JSON.stringify(JSON.parse(i.innerHTML),(o,c)=>typeof c=="string"?$r(c,a):c)}catch{}e.tags=t.filter(i=>i.tag!=="templateParams")}}}}const om=typeof window<"u";let au;const cm=e=>au=e,lm=()=>au;async function um(e,t){const n={tag:e,props:{}};return e==="templateParams"?(n.props=t,n):["title","titleTemplate"].includes(e)?(n.textContent=t instanceof Promise?await t:t,n):typeof t=="string"?["script","noscript","style"].includes(e)?(e==="script"&&(/^(https?:)?\/\//.test(t)||t.startsWith("/"))?n.props.src=t:n.innerHTML=t,n):!1:(n.props=await dm(e,{...t}),n.props.children&&(n.props.innerHTML=n.props.children),delete n.props.children,Object.keys(n.props).filter(r=>Kh.includes(r)).forEach(r=>{(!["innerHTML","textContent"].includes(r)||tu.includes(n.tag))&&(n[r]=n.props[r]),delete n.props[r]}),["innerHTML","textContent"].forEach(r=>{if(n.tag==="script"&&typeof n[r]=="string"&&["application/ld+json","application/json"].includes(n.props.type))try{n[r]=JSON.parse(n[r])}catch{n[r]=""}typeof n[r]=="object"&&(n[r]=JSON.stringify(n[r]))}),n.props.class&&(n.props.class=fm(n.props.class)),n.props.content&&Array.isArray(n.props.content)?n.props.content.map(r=>({...n,props:{...n.props,content:r}})):n)}function fm(e){return typeof e=="object"&&!Array.isArray(e)&&(e=Object.keys(e).filter(t=>e[t])),(Array.isArray(e)?e.join(" "):e).split(" ").filter(t=>t.trim()).filter(Boolean).join(" ")}async function dm(e,t){for(const n of Object.keys(t)){const r=n.startsWith("data-");t[n]instanceof Promise&&(t[n]=await t[n]),String(t[n])==="true"?t[n]=r?"true":"":String(t[n])==="false"&&(r?t[n]="false":delete t[n])}return t}const pm=10;async function hm(e){const t=[];return Object.entries(e.resolvedInput).filter(([n,r])=>typeof r<"u"&&Uh.includes(n)).forEach(([n,r])=>{const a=Bh(r);t.push(...a.map(s=>um(n,s)).flat())}),(await Promise.all(t)).flat().filter(Boolean).map((n,r)=>(n._e=e._i,n._p=(e._i<<pm)+r,n))}const mm=()=>[sm(),Qh(),im(),Zh(),nm(),rm(),em()],gm=(e={})=>[qh({document:e==null?void 0:e.document,delayFn:e==null?void 0:e.domDelayFn})];function vm(e={}){const t=ym({...e,plugins:[...gm(e),...(e==null?void 0:e.plugins)||[]]});return e.experimentalHashHydration&&t.resolvedOptions.document&&(t._hash=Gh(t.resolvedOptions.document)),cm(t),t}function ym(e={}){let t=[],n={},r=0;const a=Jl();e!=null&&e.hooks&&a.addHooks(e.hooks),e.plugins=[...mm(),...(e==null?void 0:e.plugins)||[]],e.plugins.forEach(o=>o.hooks&&a.addHooks(o.hooks)),e.document=e.document||(om?document:void 0);const s=()=>a.callHook("entries:updated",i),i={resolvedOptions:e,headEntries(){return t},get hooks(){return a},use(o){o.hooks&&a.addHooks(o.hooks)},push(o,c){const l={_i:r++,input:o,_sde:{}};return c!=null&&c.mode&&(l._m=c==null?void 0:c.mode),c!=null&&c.transform&&(l._t=c==null?void 0:c.transform),t.push(l),s(),{dispose(){t=t.filter(u=>u._i!==l._i?!0:(n={...n,...u._sde||{}},u._sde={},s(),!1))},patch(u){t=t.map(f=>(f._i===l._i&&(l.input=f.input=u,s()),f))}}},async resolveTags(){const o={tags:[],entries:[...t]};await a.callHook("entries:resolve",o);for(const c of o.entries){const l=c._t||(u=>u);if(c.resolvedInput=l(c.resolvedInput||c.input),c.resolvedInput)for(const u of await hm(c)){const f={tag:u,entry:c,resolvedOptions:i.resolvedOptions};await a.callHook("tag:normalise",f),o.tags.push(f.tag)}}return await a.callHook("tags:resolve",o),o.tags},_popSideEffectQueue(){const o={...n};return n={},o},_elMap:{}};return i.hooks.callHook("init",i),i}function bm(e){return typeof e=="function"?e():le(e)}function da(e,t=""){if(e instanceof Promise)return e;const n=bm(e);return!e||!n?n:Array.isArray(n)?n.map(r=>da(r,t)):typeof n=="object"?Object.fromEntries(Object.entries(n).map(([r,a])=>r==="titleTemplate"||r.startsWith("on")?[r,le(a)]:[r,da(a,r)])):n}const _m=Nl.startsWith("3"),wm=typeof window<"u",su="usehead";function Si(){return fn()&&Ve(su)||lm()}function xm(e){return{install(n){_m&&(n.config.globalProperties.$unhead=e,n.config.globalProperties.$head=e,n.provide(su,e))}}.install}function Sm(e={}){const t=vm({...e,domDelayFn:n=>setTimeout(()=>ln(()=>n()),10),plugins:[km(),...(e==null?void 0:e.plugins)||[]]});return t.install=xm(t),t}const km=()=>({hooks:{"entries:resolve":function(e){for(const t of e.entries)t.resolvedInput=da(t.input)}}});function Am(e,t={}){const n=Si(),r=ot(!1),a=ot({});pd(()=>{a.value=r.value?{}:da(e)});const s=n.push(a.value,t);return Ft(a,o=>{s.patch(o)}),fn()&&(Ta(()=>{s.dispose()}),pl(()=>{r.value=!0}),dl(()=>{r.value=!1})),s}function Cm(e,t={}){return Si().push(e,t)}function iu(e,t={}){var r;const n=Si();if(n){const a=wm||!!((r=n.resolvedOptions)!=null&&r.document);return t.mode==="server"&&a||t.mode==="client"&&!a?void 0:a?Am(e,t):Cm(e,t)}}function Qa(e){return e!==null&&typeof e=="object"}function Rs(e,t,n=".",r){if(!Qa(t))return Rs(e,{},n,r);const a=Object.assign({},t);for(const s in e){if(s==="__proto__"||s==="constructor")continue;const i=e[s];i!=null&&(r&&r(a,s,i,n)||(Array.isArray(i)&&Array.isArray(a[s])?a[s]=[...i,...a[s]]:Qa(i)&&Qa(a[s])?a[s]=Rs(i,a[s],(n?`${n}.`:"")+s.toString(),r):a[s]=i))}return a}function Em(e){return(...t)=>t.reduce((n,r)=>Rs(n,r,"",e),{})}const Tm=Em();class Ms extends Error{constructor(){super(...arguments),this.statusCode=500,this.fatal=!1,this.unhandled=!1,this.statusMessage=void 0}toJSON(){const t={message:this.message,statusCode:Ns(this.statusCode,500)};return this.statusMessage&&(t.statusMessage=ou(this.statusMessage)),this.data!==void 0&&(t.data=this.data),t}}Ms.__h3_error__=!0;function Ls(e){if(typeof e=="string")return new Ms(e);if(Om(e))return e;const t=new Ms(e.message??e.statusMessage,e.cause?{cause:e.cause}:void 0);if("stack"in e)try{Object.defineProperty(t,"stack",{get(){return e.stack}})}catch{try{t.stack=e.stack}catch{}}if(e.data&&(t.data=e.data),e.statusCode?t.statusCode=Ns(e.statusCode,t.statusCode):e.status&&(t.statusCode=Ns(e.status,t.statusCode)),e.statusMessage?t.statusMessage=e.statusMessage:e.statusText&&(t.statusMessage=e.statusText),t.statusMessage){const n=t.statusMessage;ou(t.statusMessage)!==n&&console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future `statusMessage` will be sanitized by default.")}return e.fatal!==void 0&&(t.fatal=e.fatal),e.unhandled!==void 0&&(t.unhandled=e.unhandled),t}function Om(e){var t;return((t=e==null?void 0:e.constructor)==null?void 0:t.__h3_error__)===!0}const Pm=/[^\u0009\u0020-\u007E]/g;function ou(e=""){return e.replace(Pm,"")}function Ns(e,t=200){return!e||(typeof e=="string"&&(e=Number.parseInt(e,10)),e<100||e>999)?t:e}function Im(...e){const t=typeof e[e.length-1]=="string"?e.pop():void 0;typeof e[0]!="string"&&e.unshift(t);const[n,r]=e;if(!n||typeof n!="string")throw new TypeError("[nuxt] [useState] key must be a string: "+n);if(r!==void 0&&typeof r!="function")throw new Error("[nuxt] [useState] init must be a function: "+r);const a="$s"+n,s=Te(),i=fi(s.payload.state,a);if(i.value===void 0&&r){const o=r();if(Se(o))return s.payload.state[a]=o,o;i.value=o}return i}const dn=()=>{var e;return(e=Te())==null?void 0:e.$router},cu=()=>fn()?Ve("_route",Te()._route):Te()._route,Rm=e=>e,Mm=()=>{try{if(Te()._processingMiddleware)return!0}catch{return!0}return!1},s_=(e,t)=>{e||(e="/");const n=typeof e=="string"?e:e.path||"/",r=(t==null?void 0:t.external)||Ia(n,{acceptRelative:!0});if(r&&!(t!=null&&t.external))throw new Error("Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`.");if(r&&xi(n).protocol==="script:")throw new Error("Cannot navigate to an URL with script protocol.");if(!r&&Mm())return e;const a=dn();return r?(t!=null&&t.replace?location.replace(n):location.href=n,Promise.resolve()):t!=null&&t.replace?a.replace(e):a.push(e)},Ma=()=>fi(Te().payload,"error"),yn=e=>{const t=lu(e);try{Te().callHook("app:error",t);const r=Ma();r.value=r.value||t}catch{throw t}return t},Lm=async(e={})=>{const t=Te(),n=Ma();t.callHook("app:error:cleared",e),e.redirect&&await dn().replace(e.redirect),n.value=null},Nm=e=>!!(e&&typeof e=="object"&&"__nuxt_error"in e),lu=e=>{const t=Ls(e);return t.__nuxt_error=!0,t},jm="modulepreload",Hm=function(e,t){return e.startsWith(".")?new URL(e,t).href:e},Mo={},Dm=function(t,n,r){if(!n||n.length===0)return t();const a=document.getElementsByTagName("link");return Promise.all(n.map(s=>{if(s=Hm(s,r),s in Mo)return;Mo[s]=!0;const i=s.endsWith(".css"),o=i?'[rel="stylesheet"]':"";if(!!r)for(let u=a.length-1;u>=0;u--){const f=a[u];if(f.href===s&&(!i||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${o}`))return;const l=document.createElement("link");if(l.rel=i?"stylesheet":jm,i||(l.as="script",l.crossOrigin=""),l.href=s,document.head.appendChild(l),i)return new Promise((u,f)=>{l.addEventListener("load",u),l.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>t())},jt=(...e)=>Dm(...e).catch(t=>{const n=new Event("nuxt.preloadError");throw n.payload=t,window.dispatchEvent(n),t});function $m(e={}){const t=e.path||window.location.pathname;let n={};try{n=JSON.parse(sessionStorage.getItem("nuxt:reload")||"{}")}catch{}if(e.force||(n==null?void 0:n.path)!==t||(n==null?void 0:n.expires)<Date.now()){try{sessionStorage.setItem("nuxt:reload",JSON.stringify({path:t,expires:Date.now()+(e.ttl??1e4)}))}catch{}if(e.persistState)try{sessionStorage.setItem("nuxt:reload:state",JSON.stringify({state:Te().payload.state}))}catch{}window.location.pathname!==t?window.location.href=t:window.location.reload()}}const Fm=Kt(e=>{const t=jh();return e.vueApp.use(t),kr(t),e.payload&&e.payload.pinia&&(t.state.value=e.payload.pinia),{provide:{pinia:t}}}),Za={},Bm=Kt(e=>{for(const t in Za)e.vueApp.component(t,Za[t]),e.vueApp.component("Lazy"+t,Za[t])}),zm={meta:[{name:"viewport",content:"width=device-width, initial-scale=1"},{charset:"utf-8"}],link:[],style:[],script:[],noscript:[]},js=!1,Um=!1,Wm="__nuxt",Km=Kt(e=>{const n=Sm();n.push(zm),e.vueApp.use(n);{let r=!0;const a=()=>{r=!1,n.hooks.callHook("entries:updated",n)};n.hooks.hook("dom:beforeRender",s=>{s.shouldRender=!r}),e.hooks.hook("page:start",()=>{r=!0}),e.hooks.hook("page:finish",a),e.hooks.hook("app:suspense:resolve",a)}});function Vm(e){const t=e;return t.headTags=e.resolveTags,t.addEntry=e.push,t.addHeadObjs=e.push,t.addReactiveEntry=(n,r)=>{const a=iu(n,r);return typeof a<"u"?a.dispose:()=>{}},t.removeHeadObjs=()=>{},t.updateDOM=()=>{e.hooks.callHook("entries:updated",e)},t.unhead=e,t}const Jm=Kt(e=>{Vm(e.vueApp._context.provides.usehead)});/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */const vn=typeof window<"u";function Ym(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const ce=Object.assign;function es(e,t){const n={};for(const r in t){const a=t[r];n[r]=lt(a)?a.map(e):e(a)}return n}const ar=()=>{},lt=Array.isArray,qm=/\/$/,Gm=e=>e.replace(qm,"");function ts(e,t,n="/"){let r,a={},s="",i="";const o=t.indexOf("#");let c=t.indexOf("?");return o<c&&o>=0&&(c=-1),c>-1&&(r=t.slice(0,c),s=t.slice(c+1,o>-1?o:t.length),a=e(s)),o>-1&&(r=r||t.slice(0,o),i=t.slice(o,t.length)),r=eg(r??t,n),{fullPath:r+(s&&"?")+s+i,path:r,query:a,hash:i}}function Xm(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function Lo(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function Qm(e,t,n){const r=t.matched.length-1,a=n.matched.length-1;return r>-1&&r===a&&Ln(t.matched[r],n.matched[a])&&uu(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function Ln(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function uu(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!Zm(e[n],t[n]))return!1;return!0}function Zm(e,t){return lt(e)?No(e,t):lt(t)?No(t,e):e===t}function No(e,t){return lt(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function eg(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/");let a=n.length-1,s,i;for(s=0;s<r.length;s++)if(i=r[s],i!==".")if(i==="..")a>1&&a--;else break;return n.slice(0,a).join("/")+"/"+r.slice(s-(s===r.length?1:0)).join("/")}var mr;(function(e){e.pop="pop",e.push="push"})(mr||(mr={}));var sr;(function(e){e.back="back",e.forward="forward",e.unknown=""})(sr||(sr={}));function tg(e){if(!e)if(vn){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),Gm(e)}const ng=/^[^#]+#/;function rg(e,t){return e.replace(ng,"#")+t}function ag(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const La=()=>({left:window.pageXOffset,top:window.pageYOffset});function sg(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),a=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!a)return;t=ag(a,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function jo(e,t){return(history.state?history.state.position-t:-1)+e}const Hs=new Map;function ig(e,t){Hs.set(e,t)}function og(e){const t=Hs.get(e);return Hs.delete(e),t}let cg=()=>location.protocol+"//"+location.host;function fu(e,t){const{pathname:n,search:r,hash:a}=t,s=e.indexOf("#");if(s>-1){let o=a.includes(e.slice(s))?e.slice(s).length:1,c=a.slice(o);return c[0]!=="/"&&(c="/"+c),Lo(c,"")}return Lo(n,e)+r+a}function lg(e,t,n,r){let a=[],s=[],i=null;const o=({state:h})=>{const y=fu(e,location),g=n.value,_=t.value;let k=0;if(h){if(n.value=y,t.value=h,i&&i===g){i=null;return}k=_?h.position-_.position:0}else r(y);a.forEach(m=>{m(n.value,g,{delta:k,type:mr.pop,direction:k?k>0?sr.forward:sr.back:sr.unknown})})};function c(){i=n.value}function l(h){a.push(h);const y=()=>{const g=a.indexOf(h);g>-1&&a.splice(g,1)};return s.push(y),y}function u(){const{history:h}=window;h.state&&h.replaceState(ce({},h.state,{scroll:La()}),"")}function f(){for(const h of s)h();s=[],window.removeEventListener("popstate",o),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",o),window.addEventListener("beforeunload",u),{pauseListeners:c,listen:l,destroy:f}}function Ho(e,t,n,r=!1,a=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:a?La():null}}function ug(e){const{history:t,location:n}=window,r={value:fu(e,n)},a={value:t.state};a.value||s(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function s(c,l,u){const f=e.indexOf("#"),h=f>-1?(n.host&&document.querySelector("base")?e:e.slice(f))+c:cg()+e+c;try{t[u?"replaceState":"pushState"](l,"",h),a.value=l}catch(y){console.error(y),n[u?"replace":"assign"](h)}}function i(c,l){const u=ce({},t.state,Ho(a.value.back,c,a.value.forward,!0),l,{position:a.value.position});s(c,u,!0),r.value=c}function o(c,l){const u=ce({},a.value,t.state,{forward:c,scroll:La()});s(u.current,u,!0);const f=ce({},Ho(r.value,c,null),{position:u.position+1},l);s(c,f,!1),r.value=c}return{location:r,state:a,push:o,replace:i}}function du(e){e=tg(e);const t=ug(e),n=lg(e,t.state,t.location,t.replace);function r(s,i=!0){i||n.pauseListeners(),history.go(s)}const a=ce({location:"",base:e,go:r,createHref:rg.bind(null,e)},t,n);return Object.defineProperty(a,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(a,"state",{enumerable:!0,get:()=>t.state.value}),a}function fg(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),du(e)}function dg(e){return typeof e=="string"||e&&typeof e=="object"}function pu(e){return typeof e=="string"||typeof e=="symbol"}const It={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},hu=Symbol("");var Do;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(Do||(Do={}));function Nn(e,t){return ce(new Error,{type:e,[hu]:!0},t)}function mt(e,t){return e instanceof Error&&hu in e&&(t==null||!!(e.type&t))}const $o="[^/]+?",pg={sensitive:!1,strict:!1,start:!0,end:!0},hg=/[.+*?^${}()[\]/\\]/g;function mg(e,t){const n=ce({},pg,t),r=[];let a=n.start?"^":"";const s=[];for(const l of e){const u=l.length?[]:[90];n.strict&&!l.length&&(a+="/");for(let f=0;f<l.length;f++){const h=l[f];let y=40+(n.sensitive?.25:0);if(h.type===0)f||(a+="/"),a+=h.value.replace(hg,"\\$&"),y+=40;else if(h.type===1){const{value:g,repeatable:_,optional:k,regexp:m}=h;s.push({name:g,repeatable:_,optional:k});const d=m||$o;if(d!==$o){y+=10;try{new RegExp(`(${d})`)}catch(w){throw new Error(`Invalid custom RegExp for param "${g}" (${d}): `+w.message)}}let b=_?`((?:${d})(?:/(?:${d}))*)`:`(${d})`;f||(b=k&&l.length<2?`(?:/${b})`:"/"+b),k&&(b+="?"),a+=b,y+=20,k&&(y+=-8),_&&(y+=-20),d===".*"&&(y+=-50)}u.push(y)}r.push(u)}if(n.strict&&n.end){const l=r.length-1;r[l][r[l].length-1]+=.7000000000000001}n.strict||(a+="/?"),n.end?a+="$":n.strict&&(a+="(?:/|$)");const i=new RegExp(a,n.sensitive?"":"i");function o(l){const u=l.match(i),f={};if(!u)return null;for(let h=1;h<u.length;h++){const y=u[h]||"",g=s[h-1];f[g.name]=y&&g.repeatable?y.split("/"):y}return f}function c(l){let u="",f=!1;for(const h of e){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const y of h)if(y.type===0)u+=y.value;else if(y.type===1){const{value:g,repeatable:_,optional:k}=y,m=g in l?l[g]:"";if(lt(m)&&!_)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const d=lt(m)?m.join("/"):m;if(!d)if(k)h.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${g}"`);u+=d}}return u||"/"}return{re:i,score:r,keys:s,parse:o,stringify:c}}function gg(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===40+40?-1:1:e.length>t.length?t.length===1&&t[0]===40+40?1:-1:0}function vg(e,t){let n=0;const r=e.score,a=t.score;for(;n<r.length&&n<a.length;){const s=gg(r[n],a[n]);if(s)return s;n++}if(Math.abs(a.length-r.length)===1){if(Fo(r))return 1;if(Fo(a))return-1}return a.length-r.length}function Fo(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const yg={type:0,value:""},bg=/[a-zA-Z0-9_]/;function _g(e){if(!e)return[[]];if(e==="/")return[[yg]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(y){throw new Error(`ERR (${n})/"${l}": ${y}`)}let n=0,r=n;const a=[];let s;function i(){s&&a.push(s),s=[]}let o=0,c,l="",u="";function f(){l&&(n===0?s.push({type:0,value:l}):n===1||n===2||n===3?(s.length>1&&(c==="*"||c==="+")&&t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),s.push({type:1,value:l,regexp:u,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):t("Invalid state to consume buffer"),l="")}function h(){l+=c}for(;o<e.length;){if(c=e[o++],c==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:c==="/"?(l&&f(),i()):c===":"?(f(),n=1):h();break;case 4:h(),n=r;break;case 1:c==="("?n=2:bg.test(c)?h():(f(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&o--);break;case 2:c===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+c:n=3:u+=c;break;case 3:f(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&o--,u="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${l}"`),f(),i(),a}function wg(e,t,n){const r=mg(_g(e.path),n),a=ce(r,{record:e,parent:t,children:[],alias:[]});return t&&!a.record.aliasOf==!t.record.aliasOf&&t.children.push(a),a}function xg(e,t){const n=[],r=new Map;t=Uo({strict:!1,end:!0,sensitive:!1},t);function a(u){return r.get(u)}function s(u,f,h){const y=!h,g=Sg(u);g.aliasOf=h&&h.record;const _=Uo(t,u),k=[g];if("alias"in u){const b=typeof u.alias=="string"?[u.alias]:u.alias;for(const w of b)k.push(ce({},g,{components:h?h.record.components:g.components,path:w,aliasOf:h?h.record:g}))}let m,d;for(const b of k){const{path:w}=b;if(f&&w[0]!=="/"){const A=f.record.path,I=A[A.length-1]==="/"?"":"/";b.path=f.record.path+(w&&I+w)}if(m=wg(b,f,_),h?h.alias.push(m):(d=d||m,d!==m&&d.alias.push(m),y&&u.name&&!zo(m)&&i(u.name)),g.children){const A=g.children;for(let I=0;I<A.length;I++)s(A[I],m,h&&h.children[I])}h=h||m,(m.record.components&&Object.keys(m.record.components).length||m.record.name||m.record.redirect)&&c(m)}return d?()=>{i(d)}:ar}function i(u){if(pu(u)){const f=r.get(u);f&&(r.delete(u),n.splice(n.indexOf(f),1),f.children.forEach(i),f.alias.forEach(i))}else{const f=n.indexOf(u);f>-1&&(n.splice(f,1),u.record.name&&r.delete(u.record.name),u.children.forEach(i),u.alias.forEach(i))}}function o(){return n}function c(u){let f=0;for(;f<n.length&&vg(u,n[f])>=0&&(u.record.path!==n[f].record.path||!mu(u,n[f]));)f++;n.splice(f,0,u),u.record.name&&!zo(u)&&r.set(u.record.name,u)}function l(u,f){let h,y={},g,_;if("name"in u&&u.name){if(h=r.get(u.name),!h)throw Nn(1,{location:u});_=h.record.name,y=ce(Bo(f.params,h.keys.filter(d=>!d.optional).map(d=>d.name)),u.params&&Bo(u.params,h.keys.map(d=>d.name))),g=h.stringify(y)}else if("path"in u)g=u.path,h=n.find(d=>d.re.test(g)),h&&(y=h.parse(g),_=h.record.name);else{if(h=f.name?r.get(f.name):n.find(d=>d.re.test(f.path)),!h)throw Nn(1,{location:u,currentLocation:f});_=h.record.name,y=ce({},f.params,u.params),g=h.stringify(y)}const k=[];let m=h;for(;m;)k.unshift(m.record),m=m.parent;return{name:_,path:g,params:y,matched:k,meta:Ag(k)}}return e.forEach(u=>s(u)),{addRoute:s,resolve:l,removeRoute:i,getRoutes:o,getRecordMatcher:a}}function Bo(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function Sg(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:kg(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function kg(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="boolean"?n:n[r];return t}function zo(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function Ag(e){return e.reduce((t,n)=>ce(t,n.meta),{})}function Uo(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function mu(e,t){return t.children.some(n=>n===e||mu(e,n))}const gu=/#/g,Cg=/&/g,Eg=/\//g,Tg=/=/g,Og=/\?/g,vu=/\+/g,Pg=/%5B/g,Ig=/%5D/g,yu=/%5E/g,Rg=/%60/g,bu=/%7B/g,Mg=/%7C/g,_u=/%7D/g,Lg=/%20/g;function ki(e){return encodeURI(""+e).replace(Mg,"|").replace(Pg,"[").replace(Ig,"]")}function Ng(e){return ki(e).replace(bu,"{").replace(_u,"}").replace(yu,"^")}function Ds(e){return ki(e).replace(vu,"%2B").replace(Lg,"+").replace(gu,"%23").replace(Cg,"%26").replace(Rg,"`").replace(bu,"{").replace(_u,"}").replace(yu,"^")}function jg(e){return Ds(e).replace(Tg,"%3D")}function Hg(e){return ki(e).replace(gu,"%23").replace(Og,"%3F")}function Dg(e){return e==null?"":Hg(e).replace(Eg,"%2F")}function pa(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function $g(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let a=0;a<r.length;++a){const s=r[a].replace(vu," "),i=s.indexOf("="),o=pa(i<0?s:s.slice(0,i)),c=i<0?null:pa(s.slice(i+1));if(o in t){let l=t[o];lt(l)||(l=t[o]=[l]),l.push(c)}else t[o]=c}return t}function Wo(e){let t="";for(let n in e){const r=e[n];if(n=jg(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(lt(r)?r.map(s=>s&&Ds(s)):[r&&Ds(r)]).forEach(s=>{s!==void 0&&(t+=(t.length?"&":"")+n,s!=null&&(t+="="+s))})}return t}function Fg(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=lt(r)?r.map(a=>a==null?null:""+a):r==null?r:""+r)}return t}const Bg=Symbol(""),Ko=Symbol(""),Ai=Symbol(""),Ci=Symbol(""),$s=Symbol("");function Vn(){let e=[];function t(r){return e.push(r),()=>{const a=e.indexOf(r);a>-1&&e.splice(a,1)}}function n(){e=[]}return{add:t,list:()=>e,reset:n}}function Nt(e,t,n,r,a){const s=r&&(r.enterCallbacks[a]=r.enterCallbacks[a]||[]);return()=>new Promise((i,o)=>{const c=f=>{f===!1?o(Nn(4,{from:n,to:t})):f instanceof Error?o(f):dg(f)?o(Nn(2,{from:t,to:f})):(s&&r.enterCallbacks[a]===s&&typeof f=="function"&&s.push(f),i())},l=e.call(r&&r.instances[a],t,n,c);let u=Promise.resolve(l);e.length<3&&(u=u.then(c)),u.catch(f=>o(f))})}function ns(e,t,n,r){const a=[];for(const s of e)for(const i in s.components){let o=s.components[i];if(!(t!=="beforeRouteEnter"&&!s.instances[i]))if(zg(o)){const l=(o.__vccOpts||o)[t];l&&a.push(Nt(l,n,r,s,i))}else{let c=o();a.push(()=>c.then(l=>{if(!l)return Promise.reject(new Error(`Couldn't resolve component "${i}" at "${s.path}"`));const u=Ym(l)?l.default:l;s.components[i]=u;const h=(u.__vccOpts||u)[t];return h&&Nt(h,n,r,s,i)()}))}}return a}function zg(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function Vo(e){const t=Ve(Ai),n=Ve(Ci),r=Ae(()=>t.resolve(le(e.to))),a=Ae(()=>{const{matched:c}=r.value,{length:l}=c,u=c[l-1],f=n.matched;if(!u||!f.length)return-1;const h=f.findIndex(Ln.bind(null,u));if(h>-1)return h;const y=Jo(c[l-2]);return l>1&&Jo(u)===y&&f[f.length-1].path!==y?f.findIndex(Ln.bind(null,c[l-2])):h}),s=Ae(()=>a.value>-1&&Vg(n.params,r.value.params)),i=Ae(()=>a.value>-1&&a.value===n.matched.length-1&&uu(n.params,r.value.params));function o(c={}){return Kg(c)?t[le(e.replace)?"replace":"push"](le(e.to)).catch(ar):Promise.resolve()}return{route:r,href:Ae(()=>r.value.href),isActive:s,isExactActive:i,navigate:o}}const Ug=Pe({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Vo,setup(e,{slots:t}){const n=be(Vo(e)),{options:r}=Ve(Ai),a=Ae(()=>({[Yo(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[Yo(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const s=t.default&&t.default(n);return e.custom?s:ct("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:a.value},s)}}}),Wg=Ug;function Kg(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function Vg(e,t){for(const n in t){const r=t[n],a=e[n];if(typeof r=="string"){if(r!==a)return!1}else if(!lt(a)||a.length!==r.length||r.some((s,i)=>s!==a[i]))return!1}return!0}function Jo(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Yo=(e,t,n)=>e??t??n,Jg=Pe({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=Ve($s),a=Ae(()=>e.route||r.value),s=Ve(Ko,0),i=Ae(()=>{let l=le(s);const{matched:u}=a.value;let f;for(;(f=u[l])&&!f.components;)l++;return l}),o=Ae(()=>a.value.matched[i.value]);Cn(Ko,Ae(()=>i.value+1)),Cn(Bg,o),Cn($s,a);const c=ot();return Ft(()=>[c.value,o.value,e.name],([l,u,f],[h,y,g])=>{u&&(u.instances[f]=l,y&&y!==u&&l&&l===h&&(u.leaveGuards.size||(u.leaveGuards=y.leaveGuards),u.updateGuards.size||(u.updateGuards=y.updateGuards))),l&&u&&(!y||!Ln(u,y)||!h)&&(u.enterCallbacks[f]||[]).forEach(_=>_(l))},{flush:"post"}),()=>{const l=a.value,u=e.name,f=o.value,h=f&&f.components[u];if(!h)return qo(n.default,{Component:h,route:l});const y=f.props[u],g=y?y===!0?l.params:typeof y=="function"?y(l):y:null,k=ct(h,ce({},g,t,{onVnodeUnmounted:m=>{m.component.isUnmounted&&(f.instances[u]=null)},ref:c}));return qo(n.default,{Component:k,route:l})||k}}});function qo(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const wu=Jg;function Yg(e){const t=xg(e.routes,e),n=e.parseQuery||$g,r=e.stringifyQuery||Wo,a=e.history,s=Vn(),i=Vn(),o=Vn(),c=hs(It);let l=It;vn&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=es.bind(null,E=>""+E),f=es.bind(null,Dg),h=es.bind(null,pa);function y(E,B){let j,J;return pu(E)?(j=t.getRecordMatcher(E),J=B):J=E,t.addRoute(J,j)}function g(E){const B=t.getRecordMatcher(E);B&&t.removeRoute(B)}function _(){return t.getRoutes().map(E=>E.record)}function k(E){return!!t.getRecordMatcher(E)}function m(E,B){if(B=ce({},B||c.value),typeof E=="string"){const p=ts(n,E,B.path),v=t.resolve({path:p.path},B),S=a.createHref(p.fullPath);return ce(p,v,{params:h(v.params),hash:pa(p.hash),redirectedFrom:void 0,href:S})}let j;if("path"in E)j=ce({},E,{path:ts(n,E.path,B.path).path});else{const p=ce({},E.params);for(const v in p)p[v]==null&&delete p[v];j=ce({},E,{params:f(E.params)}),B.params=f(B.params)}const J=t.resolve(j,B),se=E.hash||"";J.params=u(h(J.params));const _e=Xm(r,ce({},E,{hash:Ng(se),path:J.path})),ee=a.createHref(_e);return ce({fullPath:_e,hash:se,query:r===Wo?Fg(E.query):E.query||{}},J,{redirectedFrom:void 0,href:ee})}function d(E){return typeof E=="string"?ts(n,E,c.value.path):ce({},E)}function b(E,B){if(l!==E)return Nn(8,{from:B,to:E})}function w(E){return T(E)}function A(E){return w(ce(d(E),{replace:!0}))}function I(E){const B=E.matched[E.matched.length-1];if(B&&B.redirect){const{redirect:j}=B;let J=typeof j=="function"?j(E):j;return typeof J=="string"&&(J=J.includes("?")||J.includes("#")?J=d(J):{path:J},J.params={}),ce({query:E.query,hash:E.hash,params:"path"in J?{}:E.params},J)}}function T(E,B){const j=l=m(E),J=c.value,se=E.state,_e=E.force,ee=E.replace===!0,p=I(j);if(p)return T(ce(d(p),{state:typeof p=="object"?ce({},se,p.state):se,force:_e,replace:ee}),B||j);const v=j;v.redirectedFrom=B;let S;return!_e&&Qm(r,J,j)&&(S=Nn(16,{to:v,from:J}),Vt(J,J,!0,!1)),(S?Promise.resolve(S):L(v,J)).catch(C=>mt(C)?mt(C,2)?C:Ze(C):pe(C,v,J)).then(C=>{if(C){if(mt(C,2))return T(ce({replace:ee},d(C.to),{state:typeof C.to=="object"?ce({},se,C.to.state):se,force:_e}),B||v)}else C=V(v,J,!0,ee,se);return U(v,J,C),C})}function x(E,B){const j=b(E,B);return j?Promise.reject(j):Promise.resolve()}function L(E,B){let j;const[J,se,_e]=qg(E,B);j=ns(J.reverse(),"beforeRouteLeave",E,B);for(const p of J)p.leaveGuards.forEach(v=>{j.push(Nt(v,E,B))});const ee=x.bind(null,E,B);return j.push(ee),gn(j).then(()=>{j=[];for(const p of s.list())j.push(Nt(p,E,B));return j.push(ee),gn(j)}).then(()=>{j=ns(se,"beforeRouteUpdate",E,B);for(const p of se)p.updateGuards.forEach(v=>{j.push(Nt(v,E,B))});return j.push(ee),gn(j)}).then(()=>{j=[];for(const p of E.matched)if(p.beforeEnter&&!B.matched.includes(p))if(lt(p.beforeEnter))for(const v of p.beforeEnter)j.push(Nt(v,E,B));else j.push(Nt(p.beforeEnter,E,B));return j.push(ee),gn(j)}).then(()=>(E.matched.forEach(p=>p.enterCallbacks={}),j=ns(_e,"beforeRouteEnter",E,B),j.push(ee),gn(j))).then(()=>{j=[];for(const p of i.list())j.push(Nt(p,E,B));return j.push(ee),gn(j)}).catch(p=>mt(p,8)?p:Promise.reject(p))}function U(E,B,j){for(const J of o.list())J(E,B,j)}function V(E,B,j,J,se){const _e=b(E,B);if(_e)return _e;const ee=B===It,p=vn?history.state:{};j&&(J||ee?a.replace(E.fullPath,ce({scroll:ee&&p&&p.scroll},se)):a.push(E.fullPath,se)),c.value=E,Vt(E,B,j,ee),Ze()}let H;function X(){H||(H=a.listen((E,B,j)=>{if(!Tr.listening)return;const J=m(E),se=I(J);if(se){T(ce(se,{replace:!0}),J).catch(ar);return}l=J;const _e=c.value;vn&&ig(jo(_e.fullPath,j.delta),La()),L(J,_e).catch(ee=>mt(ee,12)?ee:mt(ee,2)?(T(ee.to,J).then(p=>{mt(p,20)&&!j.delta&&j.type===mr.pop&&a.go(-1,!1)}).catch(ar),Promise.reject()):(j.delta&&a.go(-j.delta,!1),pe(ee,J,_e))).then(ee=>{ee=ee||V(J,_e,!1),ee&&(j.delta&&!mt(ee,8)?a.go(-j.delta,!1):j.type===mr.pop&&mt(ee,20)&&a.go(-1,!1)),U(J,_e,ee)}).catch(ar)}))}let $=Vn(),oe=Vn(),ae;function pe(E,B,j){Ze(E);const J=oe.list();return J.length?J.forEach(se=>se(E,B,j)):console.error(E),Promise.reject(E)}function ue(){return ae&&c.value!==It?Promise.resolve():new Promise((E,B)=>{$.add([E,B])})}function Ze(E){return ae||(ae=!E,X(),$.list().forEach(([B,j])=>E?j(E):B()),$.reset()),E}function Vt(E,B,j,J){const{scrollBehavior:se}=e;if(!vn||!se)return Promise.resolve();const _e=!j&&og(jo(E.fullPath,0))||(J||!j)&&history.state&&history.state.scroll||null;return ln().then(()=>se(E,B,_e)).then(ee=>ee&&sg(ee)).catch(ee=>pe(ee,E,B))}const et=E=>a.go(E);let je;const pn=new Set,Tr={currentRoute:c,listening:!0,addRoute:y,removeRoute:g,hasRoute:k,getRoutes:_,resolve:m,options:e,push:w,replace:A,go:et,back:()=>et(-1),forward:()=>et(1),beforeEach:s.add,beforeResolve:i.add,afterEach:o.add,onError:oe.add,isReady:ue,install(E){const B=this;E.component("RouterLink",Wg),E.component("RouterView",wu),E.config.globalProperties.$router=B,Object.defineProperty(E.config.globalProperties,"$route",{enumerable:!0,get:()=>le(c)}),vn&&!je&&c.value===It&&(je=!0,w(a.location).catch(se=>{}));const j={};for(const se in It)j[se]=Ae(()=>c.value[se]);E.provide(Ai,B),E.provide(Ci,be(j)),E.provide($s,c);const J=E.unmount;pn.add(E),E.unmount=function(){pn.delete(E),pn.size<1&&(l=It,H&&H(),H=null,c.value=It,je=!1,ae=!1),J()}}};return Tr}function gn(e){return e.reduce((t,n)=>t.then(()=>n()),Promise.resolve())}function qg(e,t){const n=[],r=[],a=[],s=Math.max(t.matched.length,e.matched.length);for(let i=0;i<s;i++){const o=t.matched[i];o&&(e.matched.find(l=>Ln(l,o))?r.push(o):n.push(o));const c=e.matched[i];c&&(t.matched.find(l=>Ln(l,c))||a.push(c))}return[n,r,a]}function i_(){return Ve(Ci)}const Go=[{name:"docs-PostView",path:"/docs/PostView",meta:{},alias:[],redirect:void 0,component:()=>jt(()=>import("./PostView.8f7f8a67.js"),["./PostView.8f7f8a67.js","./TagArea.vue.919f3e85.js","./nuxt-link.7407c329.js","./TagArea.1152ed90.css","./PostView.d906c4e7.css"],import.meta.url).then(e=>e.default||e)},{name:"index",path:"/",meta:{},alias:[],redirect:void 0,component:()=>jt(()=>import("./index.c9321206.js"),["./index.c9321206.js","./nuxt-link.7407c329.js","./TagArea.vue.919f3e85.js","./TagArea.1152ed90.css","./index.561b9b1f.css"],import.meta.url).then(e=>e.default||e)},{name:"tags-TagList",path:"/tags/TagList",meta:{},alias:[],redirect:void 0,component:()=>jt(()=>import("./TagList.a56b0eea.js"),["./TagList.a56b0eea.js","./nuxt-link.7407c329.js","./TagArea.vue.919f3e85.js","./TagArea.1152ed90.css","./TagList.287ef4cf.css"],import.meta.url).then(e=>e.default||e)}],Gg={routes:e=>[{name:"home",path:"/",component:()=>jt(()=>import("./index.c9321206.js"),["./index.c9321206.js","./nuxt-link.7407c329.js","./TagArea.vue.919f3e85.js","./TagArea.1152ed90.css","./index.561b9b1f.css"],import.meta.url)},{name:"post",path:"/docs/:pathMatch(.*)*",component:()=>jt(()=>import("./PostView.8f7f8a67.js"),["./PostView.8f7f8a67.js","./TagArea.vue.919f3e85.js","./nuxt-link.7407c329.js","./TagArea.1152ed90.css","./PostView.d906c4e7.css"],import.meta.url)},{name:"tag",path:"/tags/:tag/:page(\\d+)",component:()=>jt(()=>import("./TagList.a56b0eea.js"),["./TagList.a56b0eea.js","./nuxt-link.7407c329.js","./TagArea.vue.919f3e85.js","./TagArea.1152ed90.css","./TagList.287ef4cf.css"],import.meta.url)},{name:"tags",path:"/tags",component:()=>jt(()=>import("./TagList.a56b0eea.js"),["./TagList.a56b0eea.js","./nuxt-link.7407c329.js","./TagArea.vue.919f3e85.js","./TagArea.1152ed90.css","./TagList.287ef4cf.css"],import.meta.url)}],scrollBehavior:()=>{const e=document.getElementById("main-content-wrapper");return e&&e.scrollTo({behavior:"smooth",top:0,left:0}),{}}},Xg={scrollBehavior(e,t,n){const r=Te();let a=n||void 0;if(!a&&t&&e&&e.meta.scrollToTop!==!1&&Qg(t,e)&&(a={left:0,top:0}),e.path===t.path){if(t.hash&&!e.hash)return{left:0,top:0};if(e.hash)return{el:e.hash,top:Xo(e.hash)}}const s=o=>!!(o.meta.pageTransition??js),i=s(t)&&s(e)?"page:transition:finish":"page:finish";return new Promise(o=>{r.hooks.hookOnce(i,async()=>{await ln(),e.hash&&(a={el:e.hash,top:Xo(e.hash)}),o(a)})})}};function Xo(e){try{const t=document.querySelector(e);if(t)return parseFloat(getComputedStyle(t).scrollMarginTop)}catch{}return 0}function Qg(e,t){const n=e.matched[0]===t.matched[0];return!!(!n||n&&JSON.stringify(e.params)!==JSON.stringify(t.params))}const Zg={},gt={...Zg,...Xg,...Gg},ev=Rm(async e=>{var c;let t,n;if(!((c=e.meta)!=null&&c.validate))return;const r=Te(),a=dn();if(([t,n]=Ts(()=>Promise.resolve(e.meta.validate(e))),t=await t,n(),t)===!0)return;const i=lu({statusCode:404,statusMessage:`Page Not Found: ${e.fullPath}`}),o=a.beforeResolve(l=>{if(o(),l===e){const u=a.afterEach(async()=>{u(),await yt(r,yn,[i]),window.history.pushState({},"",e.fullPath)});return!1}})}),tv=[ev],ir={};function nv(e,t){const{pathname:n,search:r,hash:a}=t,s=e.indexOf("#");if(s>-1){const o=a.includes(e.slice(s))?e.slice(s).length:1;let c=a.slice(o);return c[0]!=="/"&&(c="/"+c),So(c,"")}return So(n,e)+r+a}const rv=Kt(async e=>{var g,_;let t,n,r=ql().app.baseURL;gt.hashMode&&!r.includes("#")&&(r+="#");const a=((g=gt.history)==null?void 0:g.call(gt,r))??(gt.hashMode?fg(r):du(r)),s=((_=gt.routes)==null?void 0:_.call(gt,Go))??Go,i=nv(r,window.location),o=Yg({...gt,history:a,routes:s});e.vueApp.use(o);const c=hs(o.currentRoute.value);o.afterEach((k,m)=>{c.value=m}),Object.defineProperty(e.vueApp.config.globalProperties,"previousRoute",{get:()=>c.value});const l=hs(o.resolve(i)),u=()=>{l.value=o.currentRoute.value};e.hook("page:finish",u),o.afterEach((k,m)=>{var d,b,w,A;((b=(d=k.matched[0])==null?void 0:d.components)==null?void 0:b.default)===((A=(w=m.matched[0])==null?void 0:w.components)==null?void 0:A.default)&&u()});const f={};for(const k in l.value)f[k]=Ae(()=>l.value[k]);e._route=be(f),e._middleware=e._middleware||{global:[],named:{}};const h=Ma();try{[t,n]=Ts(()=>o.isReady()),await t,n()}catch(k){[t,n]=Ts(()=>yt(e,yn,[k])),await t,n()}const y=Im("_layout");return o.beforeEach(async(k,m)=>{var b;k.meta=be(k.meta),e.isHydrating&&y.value&&!sn(k.meta.layout)&&(k.meta.layout=y.value),e._processingMiddleware=!0;const d=new Set([...tv,...e._middleware.global]);for(const w of k.matched){const A=w.meta.middleware;if(A)if(Array.isArray(A))for(const I of A)d.add(I);else d.add(A)}for(const w of d){const A=typeof w=="string"?e._middleware.named[w]||await((b=ir[w])==null?void 0:b.call(ir).then(T=>T.default||T)):w;if(!A)throw new Error(`Unknown route middleware: '${w}'.`);const I=await yt(e,A,[k,m]);if(!e.payload.serverRendered&&e.isHydrating&&(I===!1||I instanceof Error)){const T=I||Ls({statusCode:404,statusMessage:`Page Not Found: ${i}`});return await yt(e,yn,[T]),!1}if(I||I===!1)return I}}),o.afterEach(async k=>{delete e._processingMiddleware,!e.isHydrating&&h.value&&await yt(e,Lm),k.matched.length===0&&await yt(e,yn,[Ls({statusCode:404,fatal:!1,statusMessage:`Page not found: ${k.fullPath}`})])}),e.hooks.hookOnce("app:created",async()=>{try{await o.replace({...o.resolve(i),name:void 0,force:!0})}catch(k){await yt(e,yn,[k])}}),{provide:{router:o}}}),Fr={},av=Kt(()=>{const e=Te(),t=dn();e.hooks.hook("app:mounted",()=>{t.beforeEach(async n=>{var a;const r=(a=n==null?void 0:n.meta)==null?void 0:a.layout;r&&typeof Fr[r]=="function"&&await Fr[r]()})}),e.hooks.hook("link:prefetch",n=>{var i,o,c,l;if(Ia(n))return;const r=t.resolve(n);if(!r)return;const a=(i=r==null?void 0:r.meta)==null?void 0:i.layout;let s=Array.isArray((o=r==null?void 0:r.meta)==null?void 0:o.middleware)?(c=r==null?void 0:r.meta)==null?void 0:c.middleware:[(l=r==null?void 0:r.meta)==null?void 0:l.middleware];s=s.filter(u=>typeof u=="string");for(const u of s)typeof ir[u]=="function"&&ir[u]();a&&typeof Fr[a]=="function"&&Fr[a]()})}),sv=Kt(e=>{const t=dn(),n=ql(),r=new Set;t.beforeEach(()=>{r.clear()}),e.hook("app:chunkError",({error:a})=>{r.add(a)}),t.onError((a,s)=>{if(r.has(a)){const o="href"in s&&s.href.startsWith("#")?n.app.baseURL+s.href:Ra(n.app.baseURL,s.fullPath);$m({path:o,persistState:!0})}})});function Qo(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,r)}return n}function z(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Qo(Object(n),!0).forEach(function(r){Oe(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Qo(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function ha(e){return ha=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ha(e)}function iv(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Zo(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ov(e,t,n){return t&&Zo(e.prototype,t),n&&Zo(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function Oe(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ei(e,t){return lv(e)||fv(e,t)||xu(e,t)||pv()}function Ar(e){return cv(e)||uv(e)||xu(e)||dv()}function cv(e){if(Array.isArray(e))return Fs(e)}function lv(e){if(Array.isArray(e))return e}function uv(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function fv(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r=[],a=!0,s=!1,i,o;try{for(n=n.call(e);!(a=(i=n.next()).done)&&(r.push(i.value),!(t&&r.length===t));a=!0);}catch(c){s=!0,o=c}finally{try{!a&&n.return!=null&&n.return()}finally{if(s)throw o}}return r}}function xu(e,t){if(e){if(typeof e=="string")return Fs(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Fs(e,t)}}function Fs(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function dv(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function pv(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var ec=function(){},Ti={},Su={},ku=null,Au={mark:ec,measure:ec};try{typeof window<"u"&&(Ti=window),typeof document<"u"&&(Su=document),typeof MutationObserver<"u"&&(ku=MutationObserver),typeof performance<"u"&&(Au=performance)}catch{}var hv=Ti.navigator||{},tc=hv.userAgent,nc=tc===void 0?"":tc,zt=Ti,ve=Su,rc=ku,Br=Au;zt.document;var Ct=!!ve.documentElement&&!!ve.head&&typeof ve.addEventListener=="function"&&typeof ve.createElement=="function",Cu=~nc.indexOf("MSIE")||~nc.indexOf("Trident/"),zr,Ur,Wr,Kr,Vr,xt="___FONT_AWESOME___",Bs=16,Eu="fa",Tu="svg-inline--fa",on="data-fa-i2svg",zs="data-fa-pseudo-element",mv="data-fa-pseudo-element-pending",Oi="data-prefix",Pi="data-icon",ac="fontawesome-i2svg",gv="async",vv=["HTML","HEAD","STYLE","SCRIPT"],Ou=function(){try{return!0}catch{return!1}}(),ge="classic",we="sharp",Ii=[ge,we];function Cr(e){return new Proxy(e,{get:function(n,r){return r in n?n[r]:n[ge]}})}var gr=Cr((zr={},Oe(zr,ge,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit","fa-kit":"kit"}),Oe(zr,we,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light"}),zr)),vr=Cr((Ur={},Oe(Ur,ge,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),Oe(Ur,we,{solid:"fass",regular:"fasr",light:"fasl"}),Ur)),yr=Cr((Wr={},Oe(Wr,ge,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),Oe(Wr,we,{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light"}),Wr)),yv=Cr((Kr={},Oe(Kr,ge,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),Oe(Kr,we,{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl"}),Kr)),bv=/fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/,Pu="fa-layers-text",_v=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,wv=Cr((Vr={},Oe(Vr,ge,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),Oe(Vr,we,{900:"fass",400:"fasr",300:"fasl"}),Vr)),Iu=[1,2,3,4,5,6,7,8,9,10],xv=Iu.concat([11,12,13,14,15,16,17,18,19,20]),Sv=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],tn={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},br=new Set;Object.keys(vr[ge]).map(br.add.bind(br));Object.keys(vr[we]).map(br.add.bind(br));var kv=[].concat(Ii,Ar(br),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",tn.GROUP,tn.SWAP_OPACITY,tn.PRIMARY,tn.SECONDARY]).concat(Iu.map(function(e){return"".concat(e,"x")})).concat(xv.map(function(e){return"w-".concat(e)})),or=zt.FontAwesomeConfig||{};function Av(e){var t=ve.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function Cv(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(ve&&typeof ve.querySelector=="function"){var Ev=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];Ev.forEach(function(e){var t=Ei(e,2),n=t[0],r=t[1],a=Cv(Av(n));a!=null&&(or[r]=a)})}var Ru={styleDefault:"solid",familyDefault:"classic",cssPrefix:Eu,replacementClass:Tu,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};or.familyPrefix&&(or.cssPrefix=or.familyPrefix);var jn=z(z({},Ru),or);jn.autoReplaceSvg||(jn.observeMutations=!1);var K={};Object.keys(Ru).forEach(function(e){Object.defineProperty(K,e,{enumerable:!0,set:function(n){jn[e]=n,cr.forEach(function(r){return r(K)})},get:function(){return jn[e]}})});Object.defineProperty(K,"familyPrefix",{enumerable:!0,set:function(t){jn.cssPrefix=t,cr.forEach(function(n){return n(K)})},get:function(){return jn.cssPrefix}});zt.FontAwesomeConfig=K;var cr=[];function Tv(e){return cr.push(e),function(){cr.splice(cr.indexOf(e),1)}}var Rt=Bs,pt={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Ov(e){if(!(!e||!Ct)){var t=ve.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var n=ve.head.childNodes,r=null,a=n.length-1;a>-1;a--){var s=n[a],i=(s.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(i)>-1&&(r=s)}return ve.head.insertBefore(t,r),e}}var Pv="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function _r(){for(var e=12,t="";e-- >0;)t+=Pv[Math.random()*62|0];return t}function Bn(e){for(var t=[],n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function Ri(e){return e.classList?Bn(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function Mu(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Iv(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,'="').concat(Mu(e[n]),'" ')},"").trim()}function Na(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,": ").concat(e[n].trim(),";")},"")}function Mi(e){return e.size!==pt.size||e.x!==pt.x||e.y!==pt.y||e.rotate!==pt.rotate||e.flipX||e.flipY}function Rv(e){var t=e.transform,n=e.containerWidth,r=e.iconWidth,a={transform:"translate(".concat(n/2," 256)")},s="translate(".concat(t.x*32,", ").concat(t.y*32,") "),i="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),o="rotate(".concat(t.rotate," 0 0)"),c={transform:"".concat(s," ").concat(i," ").concat(o)},l={transform:"translate(".concat(r/2*-1," -256)")};return{outer:a,inner:c,path:l}}function Mv(e){var t=e.transform,n=e.width,r=n===void 0?Bs:n,a=e.height,s=a===void 0?Bs:a,i=e.startCentered,o=i===void 0?!1:i,c="";return o&&Cu?c+="translate(".concat(t.x/Rt-r/2,"em, ").concat(t.y/Rt-s/2,"em) "):o?c+="translate(calc(-50% + ".concat(t.x/Rt,"em), calc(-50% + ").concat(t.y/Rt,"em)) "):c+="translate(".concat(t.x/Rt,"em, ").concat(t.y/Rt,"em) "),c+="scale(".concat(t.size/Rt*(t.flipX?-1:1),", ").concat(t.size/Rt*(t.flipY?-1:1),") "),c+="rotate(".concat(t.rotate,"deg) "),c}var Lv=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function Lu(){var e=Eu,t=Tu,n=K.cssPrefix,r=K.replacementClass,a=Lv;if(n!==e||r!==t){var s=new RegExp("\\.".concat(e,"\\-"),"g"),i=new RegExp("\\--".concat(e,"\\-"),"g"),o=new RegExp("\\.".concat(t),"g");a=a.replace(s,".".concat(n,"-")).replace(i,"--".concat(n,"-")).replace(o,".".concat(r))}return a}var sc=!1;function rs(){K.autoAddCss&&!sc&&(Ov(Lu()),sc=!0)}var Nv={mixout:function(){return{dom:{css:Lu,insertCss:rs}}},hooks:function(){return{beforeDOMElementCreation:function(){rs()},beforeI2svg:function(){rs()}}}},St=zt||{};St[xt]||(St[xt]={});St[xt].styles||(St[xt].styles={});St[xt].hooks||(St[xt].hooks={});St[xt].shims||(St[xt].shims=[]);var st=St[xt],Nu=[],jv=function e(){ve.removeEventListener("DOMContentLoaded",e),ma=1,Nu.map(function(t){return t()})},ma=!1;Ct&&(ma=(ve.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(ve.readyState),ma||ve.addEventListener("DOMContentLoaded",jv));function Hv(e){Ct&&(ma?setTimeout(e,0):Nu.push(e))}function Er(e){var t=e.tag,n=e.attributes,r=n===void 0?{}:n,a=e.children,s=a===void 0?[]:a;return typeof e=="string"?Mu(e):"<".concat(t," ").concat(Iv(r),">").concat(s.map(Er).join(""),"</").concat(t,">")}function ic(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}var Dv=function(t,n){return function(r,a,s,i){return t.call(n,r,a,s,i)}},as=function(t,n,r,a){var s=Object.keys(t),i=s.length,o=a!==void 0?Dv(n,a):n,c,l,u;for(r===void 0?(c=1,u=t[s[0]]):(c=0,u=r);c<i;c++)l=s[c],u=o(u,t[l],l,t);return u};function $v(e){for(var t=[],n=0,r=e.length;n<r;){var a=e.charCodeAt(n++);if(a>=55296&&a<=56319&&n<r){var s=e.charCodeAt(n++);(s&64512)==56320?t.push(((a&1023)<<10)+(s&1023)+65536):(t.push(a),n--)}else t.push(a)}return t}function Us(e){var t=$v(e);return t.length===1?t[0].toString(16):null}function Fv(e,t){var n=e.length,r=e.charCodeAt(t),a;return r>=55296&&r<=56319&&n>t+1&&(a=e.charCodeAt(t+1),a>=56320&&a<=57343)?(r-55296)*1024+a-56320+65536:r}function oc(e){return Object.keys(e).reduce(function(t,n){var r=e[n],a=!!r.icon;return a?t[r.iconName]=r.icon:t[n]=r,t},{})}function Ws(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=n.skipHooks,a=r===void 0?!1:r,s=oc(t);typeof st.hooks.addPack=="function"&&!a?st.hooks.addPack(e,oc(t)):st.styles[e]=z(z({},st.styles[e]||{}),s),e==="fas"&&Ws("fa",t)}var Jr,Yr,qr,bn=st.styles,Bv=st.shims,zv=(Jr={},Oe(Jr,ge,Object.values(yr[ge])),Oe(Jr,we,Object.values(yr[we])),Jr),Li=null,ju={},Hu={},Du={},$u={},Fu={},Uv=(Yr={},Oe(Yr,ge,Object.keys(gr[ge])),Oe(Yr,we,Object.keys(gr[we])),Yr);function Wv(e){return~kv.indexOf(e)}function Kv(e,t){var n=t.split("-"),r=n[0],a=n.slice(1).join("-");return r===e&&a!==""&&!Wv(a)?a:null}var Bu=function(){var t=function(s){return as(bn,function(i,o,c){return i[c]=as(o,s,{}),i},{})};ju=t(function(a,s,i){if(s[3]&&(a[s[3]]=i),s[2]){var o=s[2].filter(function(c){return typeof c=="number"});o.forEach(function(c){a[c.toString(16)]=i})}return a}),Hu=t(function(a,s,i){if(a[i]=i,s[2]){var o=s[2].filter(function(c){return typeof c=="string"});o.forEach(function(c){a[c]=i})}return a}),Fu=t(function(a,s,i){var o=s[2];return a[i]=i,o.forEach(function(c){a[c]=i}),a});var n="far"in bn||K.autoFetchSvg,r=as(Bv,function(a,s){var i=s[0],o=s[1],c=s[2];return o==="far"&&!n&&(o="fas"),typeof i=="string"&&(a.names[i]={prefix:o,iconName:c}),typeof i=="number"&&(a.unicodes[i.toString(16)]={prefix:o,iconName:c}),a},{names:{},unicodes:{}});Du=r.names,$u=r.unicodes,Li=ja(K.styleDefault,{family:K.familyDefault})};Tv(function(e){Li=ja(e.styleDefault,{family:K.familyDefault})});Bu();function Ni(e,t){return(ju[e]||{})[t]}function Vv(e,t){return(Hu[e]||{})[t]}function nn(e,t){return(Fu[e]||{})[t]}function zu(e){return Du[e]||{prefix:null,iconName:null}}function Jv(e){var t=$u[e],n=Ni("fas",e);return t||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function Ut(){return Li}var ji=function(){return{prefix:null,iconName:null,rest:[]}};function ja(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.family,r=n===void 0?ge:n,a=gr[r][e],s=vr[r][e]||vr[r][a],i=e in st.styles?e:null;return s||i||null}var cc=(qr={},Oe(qr,ge,Object.keys(yr[ge])),Oe(qr,we,Object.keys(yr[we])),qr);function Ha(e){var t,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.skipLookups,a=r===void 0?!1:r,s=(t={},Oe(t,ge,"".concat(K.cssPrefix,"-").concat(ge)),Oe(t,we,"".concat(K.cssPrefix,"-").concat(we)),t),i=null,o=ge;(e.includes(s[ge])||e.some(function(l){return cc[ge].includes(l)}))&&(o=ge),(e.includes(s[we])||e.some(function(l){return cc[we].includes(l)}))&&(o=we);var c=e.reduce(function(l,u){var f=Kv(K.cssPrefix,u);if(bn[u]?(u=zv[o].includes(u)?yv[o][u]:u,i=u,l.prefix=u):Uv[o].indexOf(u)>-1?(i=u,l.prefix=ja(u,{family:o})):f?l.iconName=f:u!==K.replacementClass&&u!==s[ge]&&u!==s[we]&&l.rest.push(u),!a&&l.prefix&&l.iconName){var h=i==="fa"?zu(l.iconName):{},y=nn(l.prefix,l.iconName);h.prefix&&(i=null),l.iconName=h.iconName||y||l.iconName,l.prefix=h.prefix||l.prefix,l.prefix==="far"&&!bn.far&&bn.fas&&!K.autoFetchSvg&&(l.prefix="fas")}return l},ji());return(e.includes("fa-brands")||e.includes("fab"))&&(c.prefix="fab"),(e.includes("fa-duotone")||e.includes("fad"))&&(c.prefix="fad"),!c.prefix&&o===we&&(bn.fass||K.autoFetchSvg)&&(c.prefix="fass",c.iconName=nn(c.prefix,c.iconName)||c.iconName),(c.prefix==="fa"||i==="fa")&&(c.prefix=Ut()||"fas"),c}var Yv=function(){function e(){iv(this,e),this.definitions={}}return ov(e,[{key:"add",value:function(){for(var n=this,r=arguments.length,a=new Array(r),s=0;s<r;s++)a[s]=arguments[s];var i=a.reduce(this._pullDefinitions,{});Object.keys(i).forEach(function(o){n.definitions[o]=z(z({},n.definitions[o]||{}),i[o]),Ws(o,i[o]);var c=yr[ge][o];c&&Ws(c,i[o]),Bu()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,r){var a=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(a).map(function(s){var i=a[s],o=i.prefix,c=i.iconName,l=i.icon,u=l[2];n[o]||(n[o]={}),u.length>0&&u.forEach(function(f){typeof f=="string"&&(n[o][f]=l)}),n[o][c]=l}),n}}]),e}(),lc=[],_n={},Tn={},qv=Object.keys(Tn);function Gv(e,t){var n=t.mixoutsTo;return lc=e,_n={},Object.keys(Tn).forEach(function(r){qv.indexOf(r)===-1&&delete Tn[r]}),lc.forEach(function(r){var a=r.mixout?r.mixout():{};if(Object.keys(a).forEach(function(i){typeof a[i]=="function"&&(n[i]=a[i]),ha(a[i])==="object"&&Object.keys(a[i]).forEach(function(o){n[i]||(n[i]={}),n[i][o]=a[i][o]})}),r.hooks){var s=r.hooks();Object.keys(s).forEach(function(i){_n[i]||(_n[i]=[]),_n[i].push(s[i])})}r.provides&&r.provides(Tn)}),n}function Ks(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];var s=_n[e]||[];return s.forEach(function(i){t=i.apply(null,[t].concat(r))}),t}function cn(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var a=_n[e]||[];a.forEach(function(s){s.apply(null,n)})}function kt(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return Tn[e]?Tn[e].apply(null,t):void 0}function Vs(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,n=e.prefix||Ut();if(t)return t=nn(n,t)||t,ic(Uu.definitions,n,t)||ic(st.styles,n,t)}var Uu=new Yv,Xv=function(){K.autoReplaceSvg=!1,K.observeMutations=!1,cn("noAuto")},Qv={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Ct?(cn("beforeI2svg",t),kt("pseudoElements2svg",t),kt("i2svg",t)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot;K.autoReplaceSvg===!1&&(K.autoReplaceSvg=!0),K.observeMutations=!0,Hv(function(){ey({autoReplaceSvgRoot:n}),cn("watch",t)})}},Zv={icon:function(t){if(t===null)return null;if(ha(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:nn(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var n=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],r=ja(t[0]);return{prefix:r,iconName:nn(r,n)||n}}if(typeof t=="string"&&(t.indexOf("".concat(K.cssPrefix,"-"))>-1||t.match(bv))){var a=Ha(t.split(" "),{skipLookups:!0});return{prefix:a.prefix||Ut(),iconName:nn(a.prefix,a.iconName)||a.iconName}}if(typeof t=="string"){var s=Ut();return{prefix:s,iconName:nn(s,t)||t}}}},Je={noAuto:Xv,config:K,dom:Qv,parse:Zv,library:Uu,findIconDefinition:Vs,toHtml:Er},ey=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot,r=n===void 0?ve:n;(Object.keys(st.styles).length>0||K.autoFetchSvg)&&Ct&&K.autoReplaceSvg&&Je.dom.i2svg({node:r})};function Da(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(r){return Er(r)})}}),Object.defineProperty(e,"node",{get:function(){if(Ct){var r=ve.createElement("div");return r.innerHTML=e.html,r.children}}}),e}function ty(e){var t=e.children,n=e.main,r=e.mask,a=e.attributes,s=e.styles,i=e.transform;if(Mi(i)&&n.found&&!r.found){var o=n.width,c=n.height,l={x:o/c/2,y:.5};a.style=Na(z(z({},s),{},{"transform-origin":"".concat(l.x+i.x/16,"em ").concat(l.y+i.y/16,"em")}))}return[{tag:"svg",attributes:a,children:t}]}function ny(e){var t=e.prefix,n=e.iconName,r=e.children,a=e.attributes,s=e.symbol,i=s===!0?"".concat(t,"-").concat(K.cssPrefix,"-").concat(n):s;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:z(z({},a),{},{id:i}),children:r}]}]}function Hi(e){var t=e.icons,n=t.main,r=t.mask,a=e.prefix,s=e.iconName,i=e.transform,o=e.symbol,c=e.title,l=e.maskId,u=e.titleId,f=e.extra,h=e.watchable,y=h===void 0?!1:h,g=r.found?r:n,_=g.width,k=g.height,m=a==="fak",d=[K.replacementClass,s?"".concat(K.cssPrefix,"-").concat(s):""].filter(function(L){return f.classes.indexOf(L)===-1}).filter(function(L){return L!==""||!!L}).concat(f.classes).join(" "),b={children:[],attributes:z(z({},f.attributes),{},{"data-prefix":a,"data-icon":s,class:d,role:f.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(_," ").concat(k)})},w=m&&!~f.classes.indexOf("fa-fw")?{width:"".concat(_/k*16*.0625,"em")}:{};y&&(b.attributes[on]=""),c&&(b.children.push({tag:"title",attributes:{id:b.attributes["aria-labelledby"]||"title-".concat(u||_r())},children:[c]}),delete b.attributes.title);var A=z(z({},b),{},{prefix:a,iconName:s,main:n,mask:r,maskId:l,transform:i,symbol:o,styles:z(z({},w),f.styles)}),I=r.found&&n.found?kt("generateAbstractMask",A)||{children:[],attributes:{}}:kt("generateAbstractIcon",A)||{children:[],attributes:{}},T=I.children,x=I.attributes;return A.children=T,A.attributes=x,o?ny(A):ty(A)}function uc(e){var t=e.content,n=e.width,r=e.height,a=e.transform,s=e.title,i=e.extra,o=e.watchable,c=o===void 0?!1:o,l=z(z(z({},i.attributes),s?{title:s}:{}),{},{class:i.classes.join(" ")});c&&(l[on]="");var u=z({},i.styles);Mi(a)&&(u.transform=Mv({transform:a,startCentered:!0,width:n,height:r}),u["-webkit-transform"]=u.transform);var f=Na(u);f.length>0&&(l.style=f);var h=[];return h.push({tag:"span",attributes:l,children:[t]}),s&&h.push({tag:"span",attributes:{class:"sr-only"},children:[s]}),h}function ry(e){var t=e.content,n=e.title,r=e.extra,a=z(z(z({},r.attributes),n?{title:n}:{}),{},{class:r.classes.join(" ")}),s=Na(r.styles);s.length>0&&(a.style=s);var i=[];return i.push({tag:"span",attributes:a,children:[t]}),n&&i.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),i}var ss=st.styles;function Js(e){var t=e[0],n=e[1],r=e.slice(4),a=Ei(r,1),s=a[0],i=null;return Array.isArray(s)?i={tag:"g",attributes:{class:"".concat(K.cssPrefix,"-").concat(tn.GROUP)},children:[{tag:"path",attributes:{class:"".concat(K.cssPrefix,"-").concat(tn.SECONDARY),fill:"currentColor",d:s[0]}},{tag:"path",attributes:{class:"".concat(K.cssPrefix,"-").concat(tn.PRIMARY),fill:"currentColor",d:s[1]}}]}:i={tag:"path",attributes:{fill:"currentColor",d:s}},{found:!0,width:t,height:n,icon:i}}var ay={found:!1,width:512,height:512};function sy(e,t){!Ou&&!K.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function Ys(e,t){var n=t;return t==="fa"&&K.styleDefault!==null&&(t=Ut()),new Promise(function(r,a){if(kt("missingIconAbstract"),n==="fa"){var s=zu(e)||{};e=s.iconName||e,t=s.prefix||t}if(e&&t&&ss[t]&&ss[t][e]){var i=ss[t][e];return r(Js(i))}sy(e,t),r(z(z({},ay),{},{icon:K.showMissingIcons&&e?kt("missingIconAbstract")||{}:{}}))})}var fc=function(){},qs=K.measurePerformance&&Br&&Br.mark&&Br.measure?Br:{mark:fc,measure:fc},Gn='FA "6.4.0"',iy=function(t){return qs.mark("".concat(Gn," ").concat(t," begins")),function(){return Wu(t)}},Wu=function(t){qs.mark("".concat(Gn," ").concat(t," ends")),qs.measure("".concat(Gn," ").concat(t),"".concat(Gn," ").concat(t," begins"),"".concat(Gn," ").concat(t," ends"))},Di={begin:iy,end:Wu},Xr=function(){};function dc(e){var t=e.getAttribute?e.getAttribute(on):null;return typeof t=="string"}function oy(e){var t=e.getAttribute?e.getAttribute(Oi):null,n=e.getAttribute?e.getAttribute(Pi):null;return t&&n}function cy(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(K.replacementClass)}function ly(){if(K.autoReplaceSvg===!0)return Qr.replace;var e=Qr[K.autoReplaceSvg];return e||Qr.replace}function uy(e){return ve.createElementNS("http://www.w3.org/2000/svg",e)}function fy(e){return ve.createElement(e)}function Ku(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.ceFn,r=n===void 0?e.tag==="svg"?uy:fy:n;if(typeof e=="string")return ve.createTextNode(e);var a=r(e.tag);Object.keys(e.attributes||[]).forEach(function(i){a.setAttribute(i,e.attributes[i])});var s=e.children||[];return s.forEach(function(i){a.appendChild(Ku(i,{ceFn:r}))}),a}function dy(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var Qr={replace:function(t){var n=t[0];if(n.parentNode)if(t[1].forEach(function(a){n.parentNode.insertBefore(Ku(a),n)}),n.getAttribute(on)===null&&K.keepOriginalSource){var r=ve.createComment(dy(n));n.parentNode.replaceChild(r,n)}else n.remove()},nest:function(t){var n=t[0],r=t[1];if(~Ri(n).indexOf(K.replacementClass))return Qr.replace(t);var a=new RegExp("".concat(K.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var s=r[0].attributes.class.split(" ").reduce(function(o,c){return c===K.replacementClass||c.match(a)?o.toSvg.push(c):o.toNode.push(c),o},{toNode:[],toSvg:[]});r[0].attributes.class=s.toSvg.join(" "),s.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",s.toNode.join(" "))}var i=r.map(function(o){return Er(o)}).join(`
`);n.setAttribute(on,""),n.innerHTML=i}};function pc(e){e()}function Vu(e,t){var n=typeof t=="function"?t:Xr;if(e.length===0)n();else{var r=pc;K.mutateApproach===gv&&(r=zt.requestAnimationFrame||pc),r(function(){var a=ly(),s=Di.begin("mutate");e.map(a),s(),n()})}}var $i=!1;function Ju(){$i=!0}function Gs(){$i=!1}var ga=null;function hc(e){if(rc&&K.observeMutations){var t=e.treeCallback,n=t===void 0?Xr:t,r=e.nodeCallback,a=r===void 0?Xr:r,s=e.pseudoElementsCallback,i=s===void 0?Xr:s,o=e.observeMutationsRoot,c=o===void 0?ve:o;ga=new rc(function(l){if(!$i){var u=Ut();Bn(l).forEach(function(f){if(f.type==="childList"&&f.addedNodes.length>0&&!dc(f.addedNodes[0])&&(K.searchPseudoElements&&i(f.target),n(f.target)),f.type==="attributes"&&f.target.parentNode&&K.searchPseudoElements&&i(f.target.parentNode),f.type==="attributes"&&dc(f.target)&&~Sv.indexOf(f.attributeName))if(f.attributeName==="class"&&oy(f.target)){var h=Ha(Ri(f.target)),y=h.prefix,g=h.iconName;f.target.setAttribute(Oi,y||u),g&&f.target.setAttribute(Pi,g)}else cy(f.target)&&a(f.target)})}}),Ct&&ga.observe(c,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function py(){ga&&ga.disconnect()}function hy(e){var t=e.getAttribute("style"),n=[];return t&&(n=t.split(";").reduce(function(r,a){var s=a.split(":"),i=s[0],o=s.slice(1);return i&&o.length>0&&(r[i]=o.join(":").trim()),r},{})),n}function my(e){var t=e.getAttribute("data-prefix"),n=e.getAttribute("data-icon"),r=e.innerText!==void 0?e.innerText.trim():"",a=Ha(Ri(e));return a.prefix||(a.prefix=Ut()),t&&n&&(a.prefix=t,a.iconName=n),a.iconName&&a.prefix||(a.prefix&&r.length>0&&(a.iconName=Vv(a.prefix,e.innerText)||Ni(a.prefix,Us(e.innerText))),!a.iconName&&K.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(a.iconName=e.firstChild.data)),a}function gy(e){var t=Bn(e.attributes).reduce(function(a,s){return a.name!=="class"&&a.name!=="style"&&(a[s.name]=s.value),a},{}),n=e.getAttribute("title"),r=e.getAttribute("data-fa-title-id");return K.autoA11y&&(n?t["aria-labelledby"]="".concat(K.replacementClass,"-title-").concat(r||_r()):(t["aria-hidden"]="true",t.focusable="false")),t}function vy(){return{iconName:null,title:null,titleId:null,prefix:null,transform:pt,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function mc(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=my(e),r=n.iconName,a=n.prefix,s=n.rest,i=gy(e),o=Ks("parseNodeAttributes",{},e),c=t.styleParser?hy(e):[];return z({iconName:r,title:e.getAttribute("title"),titleId:e.getAttribute("data-fa-title-id"),prefix:a,transform:pt,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:s,styles:c,attributes:i}},o)}var yy=st.styles;function Yu(e){var t=K.autoReplaceSvg==="nest"?mc(e,{styleParser:!1}):mc(e);return~t.extra.classes.indexOf(Pu)?kt("generateLayersText",e,t):kt("generateSvgReplacementMutation",e,t)}var Wt=new Set;Ii.map(function(e){Wt.add("fa-".concat(e))});Object.keys(gr[ge]).map(Wt.add.bind(Wt));Object.keys(gr[we]).map(Wt.add.bind(Wt));Wt=Ar(Wt);function gc(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!Ct)return Promise.resolve();var n=ve.documentElement.classList,r=function(f){return n.add("".concat(ac,"-").concat(f))},a=function(f){return n.remove("".concat(ac,"-").concat(f))},s=K.autoFetchSvg?Wt:Ii.map(function(u){return"fa-".concat(u)}).concat(Object.keys(yy));s.includes("fa")||s.push("fa");var i=[".".concat(Pu,":not([").concat(on,"])")].concat(s.map(function(u){return".".concat(u,":not([").concat(on,"])")})).join(", ");if(i.length===0)return Promise.resolve();var o=[];try{o=Bn(e.querySelectorAll(i))}catch{}if(o.length>0)r("pending"),a("complete");else return Promise.resolve();var c=Di.begin("onTree"),l=o.reduce(function(u,f){try{var h=Yu(f);h&&u.push(h)}catch(y){Ou||y.name==="MissingIcon"&&console.error(y)}return u},[]);return new Promise(function(u,f){Promise.all(l).then(function(h){Vu(h,function(){r("active"),r("complete"),a("pending"),typeof t=="function"&&t(),c(),u()})}).catch(function(h){c(),f(h)})})}function by(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Yu(e).then(function(n){n&&Vu([n],t)})}function _y(e){return function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:Vs(t||{}),a=n.mask;return a&&(a=(a||{}).icon?a:Vs(a||{})),e(r,z(z({},n),{},{mask:a}))}}var wy=function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.transform,a=r===void 0?pt:r,s=n.symbol,i=s===void 0?!1:s,o=n.mask,c=o===void 0?null:o,l=n.maskId,u=l===void 0?null:l,f=n.title,h=f===void 0?null:f,y=n.titleId,g=y===void 0?null:y,_=n.classes,k=_===void 0?[]:_,m=n.attributes,d=m===void 0?{}:m,b=n.styles,w=b===void 0?{}:b;if(t){var A=t.prefix,I=t.iconName,T=t.icon;return Da(z({type:"icon"},t),function(){return cn("beforeDOMElementCreation",{iconDefinition:t,params:n}),K.autoA11y&&(h?d["aria-labelledby"]="".concat(K.replacementClass,"-title-").concat(g||_r()):(d["aria-hidden"]="true",d.focusable="false")),Hi({icons:{main:Js(T),mask:c?Js(c.icon):{found:!1,width:null,height:null,icon:{}}},prefix:A,iconName:I,transform:z(z({},pt),a),symbol:i,title:h,maskId:u,titleId:g,extra:{attributes:d,styles:w,classes:k}})})}},xy={mixout:function(){return{icon:_y(wy)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=gc,n.nodeCallback=by,n}}},provides:function(t){t.i2svg=function(n){var r=n.node,a=r===void 0?ve:r,s=n.callback,i=s===void 0?function(){}:s;return gc(a,i)},t.generateSvgReplacementMutation=function(n,r){var a=r.iconName,s=r.title,i=r.titleId,o=r.prefix,c=r.transform,l=r.symbol,u=r.mask,f=r.maskId,h=r.extra;return new Promise(function(y,g){Promise.all([Ys(a,o),u.iconName?Ys(u.iconName,u.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(_){var k=Ei(_,2),m=k[0],d=k[1];y([n,Hi({icons:{main:m,mask:d},prefix:o,iconName:a,transform:c,symbol:l,maskId:f,title:s,titleId:i,extra:h,watchable:!0})])}).catch(g)})},t.generateAbstractIcon=function(n){var r=n.children,a=n.attributes,s=n.main,i=n.transform,o=n.styles,c=Na(o);c.length>0&&(a.style=c);var l;return Mi(i)&&(l=kt("generateAbstractTransformGrouping",{main:s,transform:i,containerWidth:s.width,iconWidth:s.width})),r.push(l||s.icon),{children:r,attributes:a}}}},Sy={mixout:function(){return{layer:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.classes,s=a===void 0?[]:a;return Da({type:"layer"},function(){cn("beforeDOMElementCreation",{assembler:n,params:r});var i=[];return n(function(o){Array.isArray(o)?o.map(function(c){i=i.concat(c.abstract)}):i=i.concat(o.abstract)}),[{tag:"span",attributes:{class:["".concat(K.cssPrefix,"-layers")].concat(Ar(s)).join(" ")},children:i}]})}}}},ky={mixout:function(){return{counter:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.title,s=a===void 0?null:a,i=r.classes,o=i===void 0?[]:i,c=r.attributes,l=c===void 0?{}:c,u=r.styles,f=u===void 0?{}:u;return Da({type:"counter",content:n},function(){return cn("beforeDOMElementCreation",{content:n,params:r}),ry({content:n.toString(),title:s,extra:{attributes:l,styles:f,classes:["".concat(K.cssPrefix,"-layers-counter")].concat(Ar(o))}})})}}}},Ay={mixout:function(){return{text:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.transform,s=a===void 0?pt:a,i=r.title,o=i===void 0?null:i,c=r.classes,l=c===void 0?[]:c,u=r.attributes,f=u===void 0?{}:u,h=r.styles,y=h===void 0?{}:h;return Da({type:"text",content:n},function(){return cn("beforeDOMElementCreation",{content:n,params:r}),uc({content:n,transform:z(z({},pt),s),title:o,extra:{attributes:f,styles:y,classes:["".concat(K.cssPrefix,"-layers-text")].concat(Ar(l))}})})}}},provides:function(t){t.generateLayersText=function(n,r){var a=r.title,s=r.transform,i=r.extra,o=null,c=null;if(Cu){var l=parseInt(getComputedStyle(n).fontSize,10),u=n.getBoundingClientRect();o=u.width/l,c=u.height/l}return K.autoA11y&&!a&&(i.attributes["aria-hidden"]="true"),Promise.resolve([n,uc({content:n.innerHTML,width:o,height:c,transform:s,title:a,extra:i,watchable:!0})])}}},Cy=new RegExp('"',"ug"),vc=[1105920,1112319];function Ey(e){var t=e.replace(Cy,""),n=Fv(t,0),r=n>=vc[0]&&n<=vc[1],a=t.length===2?t[0]===t[1]:!1;return{value:Us(a?t[0]:t),isSecondary:r||a}}function yc(e,t){var n="".concat(mv).concat(t.replace(":","-"));return new Promise(function(r,a){if(e.getAttribute(n)!==null)return r();var s=Bn(e.children),i=s.filter(function(T){return T.getAttribute(zs)===t})[0],o=zt.getComputedStyle(e,t),c=o.getPropertyValue("font-family").match(_v),l=o.getPropertyValue("font-weight"),u=o.getPropertyValue("content");if(i&&!c)return e.removeChild(i),r();if(c&&u!=="none"&&u!==""){var f=o.getPropertyValue("content"),h=~["Sharp"].indexOf(c[2])?we:ge,y=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(c[2])?vr[h][c[2].toLowerCase()]:wv[h][l],g=Ey(f),_=g.value,k=g.isSecondary,m=c[0].startsWith("FontAwesome"),d=Ni(y,_),b=d;if(m){var w=Jv(_);w.iconName&&w.prefix&&(d=w.iconName,y=w.prefix)}if(d&&!k&&(!i||i.getAttribute(Oi)!==y||i.getAttribute(Pi)!==b)){e.setAttribute(n,b),i&&e.removeChild(i);var A=vy(),I=A.extra;I.attributes[zs]=t,Ys(d,y).then(function(T){var x=Hi(z(z({},A),{},{icons:{main:T,mask:ji()},prefix:y,iconName:b,extra:I,watchable:!0})),L=ve.createElement("svg");t==="::before"?e.insertBefore(L,e.firstChild):e.appendChild(L),L.outerHTML=x.map(function(U){return Er(U)}).join(`
`),e.removeAttribute(n),r()}).catch(a)}else r()}else r()})}function Ty(e){return Promise.all([yc(e,"::before"),yc(e,"::after")])}function Oy(e){return e.parentNode!==document.head&&!~vv.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(zs)&&(!e.parentNode||e.parentNode.tagName!=="svg")}function bc(e){if(Ct)return new Promise(function(t,n){var r=Bn(e.querySelectorAll("*")).filter(Oy).map(Ty),a=Di.begin("searchPseudoElements");Ju(),Promise.all(r).then(function(){a(),Gs(),t()}).catch(function(){a(),Gs(),n()})})}var Py={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=bc,n}}},provides:function(t){t.pseudoElements2svg=function(n){var r=n.node,a=r===void 0?ve:r;K.searchPseudoElements&&bc(a)}}},_c=!1,Iy={mixout:function(){return{dom:{unwatch:function(){Ju(),_c=!0}}}},hooks:function(){return{bootstrap:function(){hc(Ks("mutationObserverCallbacks",{}))},noAuto:function(){py()},watch:function(n){var r=n.observeMutationsRoot;_c?Gs():hc(Ks("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},wc=function(t){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(r,a){var s=a.toLowerCase().split("-"),i=s[0],o=s.slice(1).join("-");if(i&&o==="h")return r.flipX=!0,r;if(i&&o==="v")return r.flipY=!0,r;if(o=parseFloat(o),isNaN(o))return r;switch(i){case"grow":r.size=r.size+o;break;case"shrink":r.size=r.size-o;break;case"left":r.x=r.x-o;break;case"right":r.x=r.x+o;break;case"up":r.y=r.y-o;break;case"down":r.y=r.y+o;break;case"rotate":r.rotate=r.rotate+o;break}return r},n)},Ry={mixout:function(){return{parse:{transform:function(n){return wc(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-transform");return a&&(n.transform=wc(a)),n}}},provides:function(t){t.generateAbstractTransformGrouping=function(n){var r=n.main,a=n.transform,s=n.containerWidth,i=n.iconWidth,o={transform:"translate(".concat(s/2," 256)")},c="translate(".concat(a.x*32,", ").concat(a.y*32,") "),l="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),u="rotate(".concat(a.rotate," 0 0)"),f={transform:"".concat(c," ").concat(l," ").concat(u)},h={transform:"translate(".concat(i/2*-1," -256)")},y={outer:o,inner:f,path:h};return{tag:"g",attributes:z({},y.outer),children:[{tag:"g",attributes:z({},y.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:z(z({},r.icon.attributes),y.path)}]}]}}}},is={x:0,y:0,width:"100%",height:"100%"};function xc(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function My(e){return e.tag==="g"?e.children:[e]}var Ly={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-mask"),s=a?Ha(a.split(" ").map(function(i){return i.trim()})):ji();return s.prefix||(s.prefix=Ut()),n.mask=s,n.maskId=r.getAttribute("data-fa-mask-id"),n}}},provides:function(t){t.generateAbstractMask=function(n){var r=n.children,a=n.attributes,s=n.main,i=n.mask,o=n.maskId,c=n.transform,l=s.width,u=s.icon,f=i.width,h=i.icon,y=Rv({transform:c,containerWidth:f,iconWidth:l}),g={tag:"rect",attributes:z(z({},is),{},{fill:"white"})},_=u.children?{children:u.children.map(xc)}:{},k={tag:"g",attributes:z({},y.inner),children:[xc(z({tag:u.tag,attributes:z(z({},u.attributes),y.path)},_))]},m={tag:"g",attributes:z({},y.outer),children:[k]},d="mask-".concat(o||_r()),b="clip-".concat(o||_r()),w={tag:"mask",attributes:z(z({},is),{},{id:d,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[g,m]},A={tag:"defs",children:[{tag:"clipPath",attributes:{id:b},children:My(h)},w]};return r.push(A,{tag:"rect",attributes:z({fill:"currentColor","clip-path":"url(#".concat(b,")"),mask:"url(#".concat(d,")")},is)}),{children:r,attributes:a}}}},Ny={provides:function(t){var n=!1;zt.matchMedia&&(n=zt.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var r=[],a={fill:"currentColor"},s={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:z(z({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var i=z(z({},s),{},{attributeName:"opacity"}),o={tag:"circle",attributes:z(z({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||o.children.push({tag:"animate",attributes:z(z({},s),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:z(z({},i),{},{values:"1;0;1;1;0;1;"})}),r.push(o),r.push({tag:"path",attributes:z(z({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:z(z({},i),{},{values:"1;0;0;0;0;1;"})}]}),n||r.push({tag:"path",attributes:z(z({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:z(z({},i),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},jy={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-symbol"),s=a===null?!1:a===""?!0:a;return n.symbol=s,n}}}},Hy=[Nv,xy,Sy,ky,Ay,Py,Iy,Ry,Ly,Ny,jy];Gv(Hy,{mixoutsTo:Je});Je.noAuto;var Dy=Je.config,$y=Je.library;Je.dom;var Xs=Je.parse;Je.findIconDefinition;Je.toHtml;var Fy=Je.icon;Je.layer;Je.text;Je.counter;var By={prefix:"fas",iconName:"message",icon:[512,512,["comment-alt"],"f27a","M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z"]},zy={prefix:"fas",iconName:"bars",icon:[448,512,["navicon"],"f0c9","M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"]},Uy={prefix:"fas",iconName:"globe",icon:[512,512,[127760],"f0ac","M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"]},Wy={prefix:"fas",iconName:"helmet-safety",icon:[576,512,["hard-hat","hat-hard"],"f807","M256 32c-17.7 0-32 14.3-32 32v2.3 99.6c0 5.6-4.5 10.1-10.1 10.1c-3.6 0-7-1.9-8.8-5.1L157.1 87C83 123.5 32 199.8 32 288v64H544l0-66.4c-.9-87.2-51.7-162.4-125.1-198.6l-48 83.9c-1.8 3.2-5.2 5.1-8.8 5.1c-5.6 0-10.1-4.5-10.1-10.1V66.3 64c0-17.7-14.3-32-32-32H256zM16.6 384C7.4 384 0 391.4 0 400.6c0 4.7 2 9.2 5.8 11.9C27.5 428.4 111.8 480 288 480s260.5-51.6 282.2-67.5c3.8-2.8 5.8-7.2 5.8-11.9c0-9.2-7.4-16.6-16.6-16.6H16.6z"]},Ky={prefix:"fas",iconName:"heart",icon:[512,512,[128153,128154,128155,128156,128420,129293,129294,129505,9829,10084,61578],"f004","M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"]},Vy={prefix:"fas",iconName:"tags",icon:[512,512,[],"f02c","M345 39.1L472.8 168.4c52.4 53 52.4 138.2 0 191.2L360.8 472.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L438.6 325.9c33.9-34.3 33.9-89.4 0-123.7L310.9 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM0 229.5V80C0 53.5 21.5 32 48 32H197.5c17 0 33.3 6.7 45.3 18.7l168 168c25 25 25 65.5 0 90.5L277.3 442.7c-25 25-65.5 25-90.5 0l-168-168C6.7 262.7 0 246.5 0 229.5zM144 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"]},Jy={prefix:"fas",iconName:"user-secret",icon:[448,512,[128373],"f21b","M224 16c-6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 14.3 25 27.1 64.6 35.9c-.4 4-.6 8-.6 12.1c0 17 3.3 33.2 9.3 48H45.4C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4H342.7c6-14.8 9.3-31 9.3-48c0-4.1-.2-8.1-.6-12.1C391 155.1 416 142.3 416 128c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.8 3.3-8.8 6.1-15.5 6.1zm56 208H267.6c-16.5 0-31.1-10.6-36.3-26.2c-2.3-7-12.2-7-14.5 0c-5.2 15.6-19.9 26.2-36.3 26.2H168c-22.1 0-40-17.9-40-40V169.6c28.2 4.1 61 6.4 96 6.4s67.8-2.3 96-6.4V184c0 22.1-17.9 40-40 40zm-88 96l16 32L176 480 128 288l64 32zm128-32L272 480 240 352l16-32 64-32z"]},Yy={prefix:"fas",iconName:"clock",icon:[512,512,[128339,"clock-four"],"f017","M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"]},qy={prefix:"fas",iconName:"plus",icon:[448,512,[10133,61543,"add"],"2b","M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"]},Gy={prefix:"fas",iconName:"chevron-right",icon:[320,512,[9002],"f054","M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"]},Xy={prefix:"fas",iconName:"moon",icon:[384,512,[127769,9214],"f186","M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"]},Qy={prefix:"far",iconName:"file-lines",icon:[384,512,[128441,128462,61686,"file-alt","file-text"],"f15c","M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z"]},Zy={prefix:"far",iconName:"folder",icon:[512,512,[128193,128447,61716,"folder-blank"],"f07b","M0 96C0 60.7 28.7 32 64 32H196.1c19.1 0 37.4 7.6 50.9 21.1L289.9 96H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16H286.6c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7H64z"]};function Sc(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,r)}return n}function bt(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Sc(Object(n),!0).forEach(function(r){He(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Sc(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function va(e){return va=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},va(e)}function He(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function eb(e,t){if(e==null)return{};var n={},r=Object.keys(e),a,s;for(s=0;s<r.length;s++)a=r[s],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}function tb(e,t){if(e==null)return{};var n=eb(e,t),r,a;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)r=s[a],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var nb=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},qu={exports:{}};(function(e){(function(t){var n=function(m,d,b){if(!l(d)||f(d)||h(d)||y(d)||c(d))return d;var w,A=0,I=0;if(u(d))for(w=[],I=d.length;A<I;A++)w.push(n(m,d[A],b));else{w={};for(var T in d)Object.prototype.hasOwnProperty.call(d,T)&&(w[m(T,b)]=n(m,d[T],b))}return w},r=function(m,d){d=d||{};var b=d.separator||"_",w=d.split||/(?=[A-Z])/;return m.split(w).join(b)},a=function(m){return g(m)?m:(m=m.replace(/[\-_\s]+(.)?/g,function(d,b){return b?b.toUpperCase():""}),m.substr(0,1).toLowerCase()+m.substr(1))},s=function(m){var d=a(m);return d.substr(0,1).toUpperCase()+d.substr(1)},i=function(m,d){return r(m,d).toLowerCase()},o=Object.prototype.toString,c=function(m){return typeof m=="function"},l=function(m){return m===Object(m)},u=function(m){return o.call(m)=="[object Array]"},f=function(m){return o.call(m)=="[object Date]"},h=function(m){return o.call(m)=="[object RegExp]"},y=function(m){return o.call(m)=="[object Boolean]"},g=function(m){return m=m-0,m===m},_=function(m,d){var b=d&&"process"in d?d.process:d;return typeof b!="function"?m:function(w,A){return b(w,m,A)}},k={camelize:a,decamelize:i,pascalize:s,depascalize:i,camelizeKeys:function(m,d){return n(_(a,d),m)},decamelizeKeys:function(m,d){return n(_(i,d),m,d)},pascalizeKeys:function(m,d){return n(_(s,d),m)},depascalizeKeys:function(){return this.decamelizeKeys.apply(this,arguments)}};e.exports?e.exports=k:t.humps=k})(nb)})(qu);var rb=qu.exports,ab=["class","style"];function sb(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,n){var r=n.indexOf(":"),a=rb.camelize(n.slice(0,r)),s=n.slice(r+1).trim();return t[a]=s,t},{})}function ib(e){return e.split(/\s+/).reduce(function(t,n){return t[n]=!0,t},{})}function Gu(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var r=(e.children||[]).map(function(c){return Gu(c)}),a=Object.keys(e.attributes||{}).reduce(function(c,l){var u=e.attributes[l];switch(l){case"class":c.class=ib(u);break;case"style":c.style=sb(u);break;default:c.attrs[l]=u}return c},{attrs:{},class:{},style:{}});n.class;var s=n.style,i=s===void 0?{}:s,o=tb(n,ab);return ct(e.tag,bt(bt(bt({},t),{},{class:a.class,style:bt(bt({},a.style),i)},a.attrs),o),r)}var Xu=!1;try{Xu=!0}catch{}function ob(){if(!Xu&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function os(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?He({},e,t):{}}function cb(e){var t,n=(t={"fa-spin":e.spin,"fa-pulse":e.pulse,"fa-fw":e.fixedWidth,"fa-border":e.border,"fa-li":e.listItem,"fa-inverse":e.inverse,"fa-flip":e.flip===!0,"fa-flip-horizontal":e.flip==="horizontal"||e.flip==="both","fa-flip-vertical":e.flip==="vertical"||e.flip==="both"},He(t,"fa-".concat(e.size),e.size!==null),He(t,"fa-rotate-".concat(e.rotation),e.rotation!==null),He(t,"fa-pull-".concat(e.pull),e.pull!==null),He(t,"fa-swap-opacity",e.swapOpacity),He(t,"fa-bounce",e.bounce),He(t,"fa-shake",e.shake),He(t,"fa-beat",e.beat),He(t,"fa-fade",e.fade),He(t,"fa-beat-fade",e.beatFade),He(t,"fa-flash",e.flash),He(t,"fa-spin-pulse",e.spinPulse),He(t,"fa-spin-reverse",e.spinReverse),t);return Object.keys(n).map(function(r){return n[r]?r:null}).filter(function(r){return r})}function kc(e){if(e&&va(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(Xs.icon)return Xs.icon(e);if(e===null)return null;if(va(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}var lb=Pe({name:"FontAwesomeIcon",props:{border:{type:Boolean,default:!1},fixedWidth:{type:Boolean,default:!1},flip:{type:[Boolean,String],default:!1,validator:function(t){return[!0,!1,"horizontal","vertical","both"].indexOf(t)>-1}},icon:{type:[Object,Array,String],required:!0},mask:{type:[Object,Array,String],default:null},listItem:{type:Boolean,default:!1},pull:{type:String,default:null,validator:function(t){return["right","left"].indexOf(t)>-1}},pulse:{type:Boolean,default:!1},rotation:{type:[String,Number],default:null,validator:function(t){return[90,180,270].indexOf(Number.parseInt(t,10))>-1}},swapOpacity:{type:Boolean,default:!1},size:{type:String,default:null,validator:function(t){return["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"].indexOf(t)>-1}},spin:{type:Boolean,default:!1},transform:{type:[String,Object],default:null},symbol:{type:[Boolean,String],default:!1},title:{type:String,default:null},inverse:{type:Boolean,default:!1},bounce:{type:Boolean,default:!1},shake:{type:Boolean,default:!1},beat:{type:Boolean,default:!1},fade:{type:Boolean,default:!1},beatFade:{type:Boolean,default:!1},flash:{type:Boolean,default:!1},spinPulse:{type:Boolean,default:!1},spinReverse:{type:Boolean,default:!1}},setup:function(t,n){var r=n.attrs,a=Ae(function(){return kc(t.icon)}),s=Ae(function(){return os("classes",cb(t))}),i=Ae(function(){return os("transform",typeof t.transform=="string"?Xs.transform(t.transform):t.transform)}),o=Ae(function(){return os("mask",kc(t.mask))}),c=Ae(function(){return Fy(a.value,bt(bt(bt(bt({},s.value),i.value),o.value),{},{symbol:t.symbol,title:t.title}))});Ft(c,function(u){if(!u)return ob("Could not find one or more icon(s)",a.value,o.value)},{immediate:!0});var l=Ae(function(){return c.value?Gu(c.value.abstract[0],{},r):null});return function(){return l.value}}});function ub(e){return{all:e=e||new Map,on:function(t,n){var r=e.get(t);r?r.push(n):e.set(t,[n])},off:function(t,n){var r=e.get(t);r&&(n?r.splice(r.indexOf(n)>>>0,1):e.set(t,[]))},emit:function(t,n){var r=e.get(t);r&&r.slice().map(function(a){a(n)}),(r=e.get("*"))&&r.slice().map(function(a){a(t,n)})}}}$y.add(Jy,zy,Ky,By,Uy,Wy,Vy,Yy,Xy,Gy,qy,Zy,Qy);Dy.autoAddCss=!1;const fb=Kt(e=>{e.vueApp.component("FontAwesomeIcon",lb);const t=ub();e.provide("emitter",t)}),db=[Fm,Bm,Km,Jm,rv,av,sv,fb],pb=be({name:"taechnique",blog:"https://taech.io",company:"Herit Corporation",position:"Backend Server Developer",profile_image:"https://avatars.githubusercontent.com/u/65699391?v=4"}),o_=be({file_list:[]}),c_=be({latest_index:0,postDataList:[]}),l_=be({is_calling:!0}),hb=be({input_text:"",result_list:[]}),nt=be({isActive:!1}),Zr=be({isActive:!1}),cs=be({isNotClickable:!1}),Zt=be({isActive:!1}),mb=be({map:new Map}),gb=e=>{const t=Date.parse(e),r=(+new Date-t)/1e3;if(r<60)return"방금 전";const a=r/60;if(a<60)return`${Math.floor(a)}분 전`;const s=a/60;if(s<24)return`${Math.floor(s)}시간 전`;const i=s/24;if(i<7)return`${Math.floor(i)}일 전`;const o=i/7;if(o<5)return`${Math.floor(o)}주 전`;const c=i/30;if(c<12)return`${Math.floor(c)}개월 전`;const l=i/365;return`${Math.round(l)}년 전`},u_=e=>{const t="taechnique 기술 블로그";document.title=e?`${e} | ${t}`:t},vb={class:"header-wrapper"},yb={class:"control-panel"},bb=F("span",{class:"progress-bar"},null,-1),_b=[bb],wb=Pe({__name:"MainHeader",setup(e){const{$emitter:t}=Te();nt.isActive,un(()=>{const r=document.getElementById("main-content-wrapper");t.on("initScroll",()=>{r.scrollTop&&(r.scrollTop=0)}),r.addEventListener("scroll",()=>{const a=r.scrollTop,s=r.clientHeight,i=r.scrollHeight,o=(100*a/(i-s)).toFixed(4)+"%",c=document.querySelector(".app-container .progress-area .progress-bar");c.style.width=o})});const n={openAppropriateMenu(){const a=document.getElementById("__nuxt").clientWidth;768<=a&&a<=1023?Zr.isActive=!Zr.isActive:a<768&&(nt.isActive=!nt.isActive)}};return(r,a)=>{const s=vi("font-awesome-icon");return Ee(),Ne("div",vb,[F("div",{class:Be(["mobile-controller",[{active:le(nt).isActive},{close:le(nt).isActive||le(Zr).isActive}]])},[F("div",yb,[F("span",{class:"control-button",onClick:a[0]||(a[0]=i=>n.openAppropriateMenu())},[ne(s,{class:"button-text",icon:["fas","plus"]})])])],2),F("div",{class:Be(["progress-area",{hide:le(nt).isActive}])},_b,2)])}}});const xb=eu("spinnerSwitch",()=>{const e=ot(!1);function t(){e.value=!0}function n(){e.value=!1}return{isOn:e,on:t,off:n}}),Sb=F("div",{class:"spinner-background"},[F("div",{class:"spinner-area"})],-1),kb=[Sb],Ab=Pe({__name:"LoadingBar",setup(e){const n={isOn:xb().isOn};return(r,a)=>(Ee(),Ne("div",{class:Be(["global-spinner-wrapper",{on:n.isOn}])},kb,2))}});const Cb=Pe({name:"ClientOnly",inheritAttrs:!1,props:["fallback","placeholder","placeholderTag","fallbackTag"],setup(e,{slots:t,attrs:n}){const r=ot(!1);return un(()=>{r.value=!0}),a=>{var c;if(r.value)return(c=t.default)==null?void 0:c.call(t);const s=t.fallback||t.placeholder;if(s)return s();const i=a.fallback||a.placeholder||"",o=a.fallbackTag||a.placeholderTag||"span";return Ne(o,n,i)}}}),Eb=""+globalThis.__publicAssetsURL("assets/blogging/profile/default.jpeg");class Qs{constructor(t,n){de(this,"name");de(this,"nodes",[]);this.name=t,this.nodes=n}}const Tb=be([]),$e=be([]),f_=be([]),ls=be({store:new Map}),Ob=["id"],Pb={class:"explored-directory-element"},Ib={class:"element-box"},Rb=["onClick"],Mb={class:"element-icon-wrapper"},Lb={class:"element-icon"},Nb=["src"],jb={class:"element-content"},Hb={class:"element-title-area"},Db={class:"title-text"},$b=F("div",{class:"feature-trailer"},[F("span",{class:"trailer-arrow"},[F("svg",{class:"svg-inline--fa fa-chevron-right","aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"chevron-right",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 320 512"},[F("path",{class:"",fill:"currentColor",d:"M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"})])])],-1),Fb=F("div",{class:"curtain"},null,-1),Bb=Pe({__name:"PackageExplorer",props:{index:Number,parent:Qs},setup(e){const t=e,{$emitter:n}=Te(),r=dn();ml(()=>{n.on("release_selected",()=>{var s;if($e.length<=3){const i=(s=a.getStack($e.length-2))==null?void 0:s.children;for(let o of i)o.classList.remove("selected")}})});const a={getFileType:s=>(console.log("child: ",s),s._type=="DIRECTORY"?"folder":"file-lines"),selectFile(s,i,o){var c,l;if(n.emit("explore",!0),s.isDirectory()){((c=this.getStack(i))==null?void 0:c.children.item(o)).classList.add("selected");let f=(l=s.files)==null?void 0:l.sort((y,g)=>`${y._type}`.localeCompare(`${g._type}`));$e.push(new Qs(s._summary,f));const h=document.getElementById("explored-panel");if(h){let y=g=>document.getElementById(`explored-stack-${g}`);setTimeout(()=>{var k;const g=h.children.length-1,_=y(g);_&&(_.classList.add("navigator-force-style"),(k=y(g-1))==null||k.classList.add("meet-up"))},100)}n.emit("moveIn",i+1)}else r.push(s.path),nt.isActive=!1;n.emit("explore",!1)},getStack(s){return document.querySelector(`#explored-stack-${s} .element-box`)},getFileIcon(s){let i;return s.hasIcon()?i=s._name:s.isDirectory()?i="folder_default":i="post_default",i}};return(s,i)=>(Ee(),Ne("div",{id:`explored-stack-${t.index}`,class:"package-explorer-wrapper"},[F("div",Pb,[F("ul",Ib,[(Ee(!0),Ne(Fe,null,_l(t.parent.nodes,(o,c)=>(Ee(),Ne("li",{key:c,class:"directory-element",onClick:l=>a.selectFile(o,t.index,c)},[F("div",Mb,[F("span",Lb,[F("img",{class:"custom-icon",src:`/assets/icon/${a.getFileIcon(o)}.png`,alt:"file icon image"},null,8,Nb)])]),F("div",jb,[F("div",Hb,[F("span",Db,us(o._summary),1)]),$b])],8,Rb))),128))])]),Fb],8,Ob))}});const zb={class:"navigator-title",id:"navigator-title-ele"},Ub=F("span",{class:"arrow"},null,-1),Wb={class:"source"},Kb=Pe({__name:"NavigateMarker",setup(e){var s;const{$emitter:t}=Te(),r={isCallable:!0,navigator:{dist:(s=$e[0])==null?void 0:s.name,source:""},titleId:"navigator-title-ele",explorerHeaderStore:Zt};un(()=>{var i;(i=document.querySelector(`#${r.titleId} .dist`))==null||i.addEventListener("click",a.moveBack),t.on("moveIn",o=>{var f;const c=document.getElementById(r.titleId),l=document.querySelector(`#${r.titleId} .dist`),u=document.querySelector(`#${r.titleId} .source`);c&&!c.classList.contains("back")&&(c.classList.add("back"),(f=a.getSource())==null||f.classList.add("active")),o>1?new Promise(y=>{var _;const g=document.createElement("span");g.innerText=$e[o].name,g.classList.add("source"),(_=document.getElementById(r.titleId))==null||_.append(g),y()}).then(()=>{if(l&&l.classList&&u&&u.classList){const y=l.classList;y.add("after-passed"),y.remove("dist");const g=u.classList;g.add("dist"),g.remove("source"),g.remove("active"),u==null||u.addEventListener("click",a.moveBack),setTimeout(()=>{var _;(_=a.getSource())==null||_.classList.add("active")},10)}}).then(()=>{setTimeout(()=>{var y;(y=a.getPassed())==null||y.remove()},600)}):a.getSource().innerText=$e[o].name})});const a={moveBack(){t.emit("explore",!0);const i=document.getElementById("explored-panel"),o=a.getDist(),c=a.getSource();if(i){let l=f=>document.getElementById(`explored-stack-${f}`);new Promise(f=>{var g,_,k;const h=i.children.length-1,y=l(h);if(y){if(y.classList.remove("navigator-force-style"),(g=l(h-1))==null||g.classList.remove("meet-up"),$e.length==2&&((_=document.getElementById("navigator-title-ele"))==null||_.classList.remove("back"),a.getSource().classList.remove("active")),$e.length>2){c.classList.remove("active"),o.classList.add("source","active"),o.classList.remove("dist");const m=document.createElement("span");m.innerText=$e[$e.length-3].name,m.classList.add("after-passed"),m.addEventListener("click",a.moveBack),(k=document.getElementById(r.titleId))==null||k.insertBefore(m,document.querySelector(`#${r.titleId} .source`)),setTimeout(()=>{m.classList.remove("after-passed"),m.classList.add("dist")},100),setTimeout(()=>{c.remove()},600)}f()}}).then(()=>{setTimeout(()=>{$e.length>1&&$e.pop()},600)}).catch(f=>{console.log("Error occurred with: ",f)}),t.emit("release_selected"),t.emit("explore",!1)}},getDist(){return document.querySelector("#navigator-title-ele .dist")},getSource(){return document.querySelector("#navigator-title-ele .source")},getPassed(){return document.querySelector("#navigator-title-ele .after-passed")}};return(i,o)=>(Ee(),Ne("div",zb,[Ub,F("span",{class:Be(["dist",{disappear:le(Zt).isActive}])},us(r.navigator.dist),3),F("span",Wb,us(r.navigator.source),1)]))}});const Vb=F("span",{class:"switch-ball"},null,-1),Jb=[Vb],Yb=Pe({__name:"SwitchButton",props:{switch:Function,default:Boolean},setup(e){const t=e,n={isTurnOn:t.default},r={reflect(){const a=t.switch&&t.switch();n.isTurnOn=a}};return(a,s)=>(Ee(),Ne("div",{class:Be(["classic-switch",{active:n.isTurnOn}]),onMouseup:s[0]||(s[0]=i=>r.reflect())},Jb,34))}});const Qu=eu("darkModeSwitch",()=>{const e=ot(!1);function t(){e.value=!e}function n(r){e.value=r}return{isDarkMode:e,collapse:t,force:n}}),qb={class:"default-list-panel"},Gb={class:"spread-element-list"},Xb=F("div",{class:"setting-icon-area"},[F("div",{class:"element-icon-wrapper"},[F("span",{class:"element-icon"})])],-1),Qb={class:"element-content"},Zb=F("div",{class:"element-title-area"},[F("span",{class:"title-text"},"포스팅")],-1),e1={class:"feature-trailer"},t1={class:"trailer-arrow"},n1=F("div",{class:"setting-icon-area"},[F("div",{class:"element-icon-wrapper"},[F("span",{class:"element-icon"})])],-1),r1={class:"element-content"},a1=F("div",{class:"element-title-area"},[F("span",{class:"title-text"},"태그 목록")],-1),s1={class:"feature-trailer"},i1={class:"trailer-arrow"},o1={class:"setting-element"},c1={class:"setting-icon-area active"},l1={class:"element-icon-wrapper"},u1={class:"element-icon"},f1=["src"],d1={class:"element-content"},p1=F("div",{class:"element-title-area"},[F("span",{class:"title-text"},"다크모드")],-1),h1={class:"feature-trailer"},m1=Pe({__name:"DefaultSettings",setup(e){const{$emitter:t}=Te(),n=dn(),r=Qu(),a=()=>{const o=!r.isDarkMode,c=document.querySelector('meta[name="theme-color"]');return o?(c.setAttribute("content","#010409"),s.darkModeIcon="moon"):(c.setAttribute("content","#ededed"),s.darkModeIcon="sun"),r.force(o),o},s={darkModeIcon:"sun"},i={moveInto(o){n.push(o),nt.isActive=!1,t.emit("initScroll")}};return(o,c)=>{const l=vi("font-awesome-icon");return Ee(),Ne("div",qb,[F("ul",Gb,[F("li",{class:"setting-element clickable",onClick:c[0]||(c[0]=u=>i.moveInto("/"))},[Xb,F("div",Qb,[Zb,F("div",e1,[F("span",t1,[ne(l,{icon:["fas","chevron-right"]})])])])]),F("li",{class:"setting-element clickable",onClick:c[1]||(c[1]=u=>i.moveInto("/tags"))},[n1,F("div",r1,[a1,F("div",s1,[F("span",i1,[ne(l,{icon:["fas","chevron-right"]})])])])]),F("li",o1,[F("div",c1,[F("div",l1,[F("span",u1,[F("img",{class:"custom-icon",src:`/assets/icon/${s.darkModeIcon}.png`,alt:"dark mode icon image"},null,8,f1)])])]),F("div",d1,[p1,F("div",h1,[ne(Yb,{default:le(r).isDarkMode,switch:a},null,8,["default"])])])])])])}}});const g1={class:"explored-control-panel",id:"explored-panel"},v1={class:"system-setting-wrapper"},y1={class:"profile-element-wrapper"},b1=Jd('<div class="profile-image-area"><div class="round-image-frame"><img src="'+Eb+'" alt="프로필 이미지"></div></div><div class="profile-info-area"><div class="author-text-area"><div class="profile-author-name"><span>taechnique</span></div><span class="intro">누군지 궁금하세요?</span></div></div>',2),_1={class:"feature-trailer"},w1={class:"trailer-arrow"},x1=F("div",{class:"tooltip-bubble"},[F("div",{class:"tooltip-content"},[F("span",null,"준비중 입니다.")]),F("div",{class:"arrow"})],-1),S1=Pe({__name:"ResourceNavigator",setup(e){const{$emitter:t}=Te();return un(()=>{t.on("explore",a=>{a?cs.isNotClickable=a:setTimeout(()=>{cs.isNotClickable=a},700);const s=document.getElementById("element-wrapper");s==null||s.scrollTo({behavior:"smooth",top:0,left:0})});const n=document.getElementById("navigator-title-ele"),r=document.getElementById("element-wrapper");r==null||r.addEventListener("scroll",()=>{var s;let a=r.scrollTop;!Zt.isActive&&a>=45?(Zt.isActive=!0,setTimeout(()=>{var i;n==null||n.classList.add("appear"),(i=n==null?void 0:n.children.item(1))==null||i.classList.remove("disappear")},600)):Zt.isActive&&a<45&&((s=n==null?void 0:n.children.item(1))==null||s.classList.add("disappear"),setTimeout(()=>{n==null||n.classList.remove("appear"),Zt.isActive=!1},600))})}),(n,r)=>{const a=Cb,s=vi("font-awesome-icon");return Ee(),Ne("div",{class:Be(["post-resource-navigator",[{active:le(nt).isActive},{hide:le(Zr).isActive}]])},[F("div",{id:"element-wrapper",class:Be(["navigate-element-wrapper",{fixed:le(Zt).isActive}])},[ne(Kb),ne(a,null,{default:pi(()=>[F("div",g1,[(Ee(!0),Ne(Fe,null,_l(le($e),(i,o)=>(Ee(),qn(Bb,{key:o,index:o,parent:i},null,8,["index","parent"]))),128))])]),_:1})],2),F("div",v1,[F("div",y1,[b1,F("div",_1,[F("span",w1,[ne(s,{icon:["fas","chevron-right"]})])]),x1]),ne(m1)]),F("div",{class:Be(["non-clickable-area",{active:le(cs).isNotClickable}])},null,2)],2)}}});const k1=(e,t)=>t.path.replace(/(:\w+)\([^)]+\)/g,"$1").replace(/(:\w+)[?+*]/g,"$1").replace(/:\w+/g,n=>{var r;return((r=e.params[n.slice(1)])==null?void 0:r.toString())||""}),A1=(e,t)=>{const n=e.route.matched.find(a=>{var s;return((s=a.components)==null?void 0:s.default)===e.Component.type}),r=t??(n==null?void 0:n.meta.key)??(n&&k1(e.route,n));return typeof r=="function"?r(e.route):r},C1=(e,t)=>({default:()=>e?ct(bd,e===!0?{}:e,t):t}),E1=Pe({name:"FragmentWrapper",setup(e,{slots:t}){return()=>{var n;return(n=t.default)==null?void 0:n.call(t)}}}),T1=(e,t,n)=>({default:()=>t?ct(e,t===!0?{}:t,n):ct(E1,{},n)}),O1=Pe({name:"NuxtPage",inheritAttrs:!1,props:{name:{type:String},transition:{type:[Boolean,Object],default:void 0},keepalive:{type:[Boolean,Object],default:void 0},route:{type:Object},pageKey:{type:[Function,String],default:null}},setup(e,{attrs:t}){const n=Te();return()=>ct(wu,{name:e.name,route:e.route,...t},{default:r=>{if(!r.Component)return;const a=A1(r,e.pageKey),s=n.deferHydration(),i=!!(e.transition??r.route.meta.pageTransition??js),o=i&&I1([e.transition,r.route.meta.pageTransition,js,{onAfterLeave:()=>{n.callHook("page:transition:finish",r.Component)}}].filter(Boolean));return T1(wi,i&&o,C1(e.keepalive??r.route.meta.keepalive??Um,ct(il,{onPending:()=>n.callHook("page:start",r.Component),onResolve:()=>{ln(()=>n.callHook("page:finish",r.Component).finally(s))}},{default:()=>ct(R1,{key:a,routeProps:r,pageKey:a,hasTransition:i})}))).default()}})}});function P1(e){return Array.isArray(e)?e:e?[e]:[]}function I1(e){const t=e.map(n=>({...n,onAfterLeave:P1(n.onAfterLeave)}));return Tm(...t)}const R1=Pe({name:"RouteProvider",props:["routeProps","pageKey","hasTransition"],setup(e){const t=e.pageKey,n=e.routeProps.route,r={};for(const a in e.routeProps.route)r[a]=Ae(()=>t===e.pageKey?e.routeProps.route[a]:n[a]);return Cn("_route",be(r)),()=>ct(e.routeProps.Component)}});const M1=(e,t)=>{const n=e.__vccOpts||e;for(const[r,a]of t)n[r]=a;return n},L1={data(){return{}}},N1={class:"main-footer"},j1=F("div",{class:"footer-text"},[F("span",null,[la("© 2022 "),F("a",{href:"https://github.com/taechnique"},"taechnique."),la(" All rights reserved.")])],-1),H1=[j1];function D1(e,t,n,r,a,s){return Ee(),Ne("div",N1,H1)}const $1=M1(L1,[["render",D1]]),F1={class:"main-content-view",id:"main-content-wrapper"},B1=Pe({__name:"MainContent",setup(e){const t=cu(),n={mobileNaviStore:nt,route:t};return(r,a)=>{const s=O1;return Ee(),Ne("div",F1,[ne(s,{class:"current-content","page-key":le(t).fullPath},null,8,["page-key"]),ne($1),F("div",{class:Be(["background",{active:n.mobileNaviStore.isActive}]),onClick:a[0]||(a[0]=i=>n.mobileNaviStore.isActive=!1)},null,2)])}}});const z1={class:"global-router-wrapper"},U1=Pe({__name:"RouteWrapper",setup(e){return(t,n)=>(Ee(),Ne("div",z1,[ne(S1,{class:"global-navigator"}),ne(B1)]))}});const W1={DIR:"DIRECTORY",POST:"POST"};class ya{constructor(t){de(this,"_path");de(this,"_name");de(this,"_type");de(this,"_summary");de(this,"_ext");de(this,"_hasIcon");de(this,"_files");this._path=t._path,this._name=t._name,this._type=t._type,this._summary=t._summary,this._ext=t._ext,this._hasIcon=t._hasIcon,this._files=t._files!==void 0?ya.toFileTrees(t._files):void 0}get type(){return this._type}get path(){return this._path}get files(){return this._files}get summary(){return this._summary}isDirectory(){return this._type==W1.DIR}hasIcon(){return this._hasIcon}static toFileTrees(t){return t.map(n=>new ya(n))}}class K1{constructor(t){de(this,"layout");de(this,"title");de(this,"categories");de(this,"tags");de(this,"date");de(this,"thumbnail");de(this,"current_company");de(this,"current_position");de(this,"profile_image");de(this,"summary");de(this,"excerpt_separator");de(this,"hide");this.layout=t.layout,this.title=t.title,this.categories=t.categories,this.tags=t.tags,this.date=new Date(t.date),this.thumbnail=this.getOrDefaultThumbnail(t.thumbnail),this.current_company=t.current_company,this.current_position=t.current_position,this.profile_image=t.profile_image,this.summary=t.summary,this.excerpt_separator=t.excerpt_separator,this.hide=t.hide}getOrDefaultThumbnail(t){const n=["default1.JPG","default2.jpeg","default3.jpeg"],r=Math.floor(Math.random()*n.length);return t||`/assets/blogging/default/${n[r]}`}}class ba{constructor(t){de(this,"_path");de(this,"_header");de(this,"_description");de(this,"_content");this._path=t._path,this._header=new K1(t._header),this._description=t._description,this._content=t._content}get path(){return this._path}get content(){return this._content}get description(){return this._description}get header(){return this._header}static toPostContent(t){return new ba(t)}static toPosts(t){return t.map(n=>ba.toPostContent(n))}}const V1=[{_path:"/docs/algorithm",_name:"algorithm",_ext:"",_summary:"알고리즘",_type:"DIRECTORY",_files:[{_path:"/docs/algorithm/heap_sort",_name:"md",_ext:"Heap_Sort",_summary:"힙과 힙정렬",_type:"POST",_files:[],_hasIcon:!1},{_path:"/docs/algorithm/insertion_sort",_name:"md",_ext:"rt",_summary:"삽입 정렬",_type:"POST",_files:[],_hasIcon:!1},{_path:"/docs/algorithm/mathematical_induction",_name:"md",_ext:"ction",_summary:"수학적 귀납법",_type:"POST",_files:[],_hasIcon:!1},{_path:"/docs/algorithm/selection_sort",_summary:"선택 정렬",_type:"POST",_files:[],_hasIcon:!1}],_hasIcon:!0},{_path:"/docs/java",_name:"java",_ext:"",_summary:"자바",_type:"DIRECTORY",_files:[{_path:"/docs/java/initialization_order_in_java",_name:"md",_ext:"Initialization_Order_In_Java",_summary:"블록의 실행 순서",_type:"POST",_files:[],_hasIcon:!1},{_path:"/docs/java/java_jvm01",_summary:"자바 가상머신 1",_type:"POST",_files:[],_hasIcon:!1},{_path:"/docs/java/java_jvm02",_name:"md",_ext:"Java_JVM02",_summary:"자바 가상머신 2",_type:"POST",_files:[],_hasIcon:!1}],_hasIcon:!0},{_path:"/docs/javascript",_name:"javascript",_ext:"",_summary:"자바스크립트",_type:"DIRECTORY",_files:[],_hasIcon:!0},{_path:"/docs/spring",_name:"spring",_ext:"",_summary:"스프링",_type:"DIRECTORY",_files:[{_path:"/docs/spring/abstractplatformtransactionmanager",_name:"md",_ext:"ormTransactionManager",_summary:"트랜잭션 매니저",_type:"POST",_files:[],_hasIcon:!1},{_path:"/docs/spring/spring_autowired",_summary:"@Autowired",_type:"POST",_files:[],_hasIcon:!1},{_path:"/docs/spring/spring_run",_name:"md",_ext:"Spring_run",_summary:"Application.run()",_type:"POST",_files:[],_hasIcon:!1}],_hasIcon:!0},{_path:"/docs/swift",_name:"swift",_ext:"",_summary:"스위프트",_type:"DIRECTORY",_files:[{_path:"/docs/swift/swift_basic_1",_ext:"md",_summary:"조건문과 반복문",_type:"POST",_files:[],_hasIcon:!1}],_hasIcon:!0},{_path:"/docs/tools",_name:"tools",_ext:"",_summary:"도구",_type:"DIRECTORY",_files:[{_path:"/docs/tools/intellij_config",_ext:"md",_summary:"단축키와 기본설정",_type:"POST",_files:[],_hasIcon:!1}],_hasIcon:!0},{_path:"/docs/typescript",_name:"typescript",_ext:"",_summary:"타입스크립트",_type:"DIRECTORY",_files:[{_path:"/docs/typescript/typescript_getting_start",_name:"md",_ext:"_start",_summary:"타입스크립트 소개",_type:"POST",_files:[],_hasIcon:!1}],_hasIcon:!0}],J1=[{_path:"/docs/typescript/typescript_getting_start",_header:{layout:"post",title:"타입스크립트 시작하기 1 (소개)",categories:["Development","Typescript"],tags:["Typescript","Javascript","Type"],date:168155286e4,current_company:"NEOWIZ",current_position:"Software Engineer",profile_image:"/assets/blogging/profile/profile1.JPG",thumbnail:"/assets/blogging/typescript/typescript_getting_start.png",summary:"타입스크립트 소개",excerpt_separator:"<!--more-->",hide:!0},_description:`타입스크립트 시작하기.
도대체 왜 사용하는거고, 뭐가 좋은걸까?
`,_content:`

## 우리가 아는 자바스크립트

사실 나도 타입스크립트를 처음 배우는 거고, 잘 알지 못한다. 하지만, 자바스크립트와 같이 **동적타입**의 언어는 결국 많은 문제를 유발 할수있다.
일반 자바스크립트에는 타입이 없기 때문에 코드대로 그냥 변수로 받아야한다. 따라서 아래와 같은 일반 자바스크립트에서는 해괴한 연산도 가능하다.

\`\`\`javascript{3,7}
//일반 자바스크립트 함수의 선언
function getNow() {
    return new Date()
}

var now = getNow();
var plus1Day = now + '1Day';
console.log('plusDay:', plus1Day) 
//출력결과 -> plusDay: Sat Apr 15 2023 19:12:32 GMT+0900 (한국 표준시)1Day
\`\`\`

3번라인에서 보면 \`getNow()\` 함수는 \`Date\` 타입의 현재시간 값을 리턴한다. 근데, 7번라인에서 다시보면 \`Date\` 타입과 \`string\` 연산을 한다.
하지만, 어떠한 에러도 발생되지 않는다. 결과적으로 연산된 \`plus1Day\` 변수의 타입은 \`string\`이다.
\`Date\` 함수와 \`string\`의 덧셈에 결과타입이 \`string\`인 내용은, 타입스크립트를 알아보는 과정에서 별로 중요하지 않기에 넘어간다.

이 처럼 타입이 존재는 하지만, 변수가 타입에 연연하지않은 언어를 \`동적타입 언어\`라고 한다. 
우리가 일반적으로 알고있는 객체지향 언어는 모두 정적타입 언어 이다. 각 변수의 타입이 정해져있고, 정해진대로 연산을 하기 때문이다.
게다가 \`javascript\`는 ECMA Script(ES)라는 표준 스크립트 버전이 있는데, 현재 우리가 사용중인 브라우저는 ES5 버전만 해석할 수 있다.

\`ES5\`버전은 2009년에 공개된 버전이며, 현재까지 브라우저는 해당 버전이상의 자바스크립트는 해석할 수 없다.
이 이상의 버전을 사용하려면, Babel(Javascript Compiler)같은 특정도구를 이용해 브라우저가 해석할 수 있는 자바스크립트의 버전으로 컴파일 해줘야 한다.
이 외에도 \`ES5\`이상에서 지원되는 javascript 버전에는 여러가지 기능 및 문법들을 사용할수 있었다.

\`\`\`javascript
//ES6 문법 const
const sum = (a, b) => {
    return a + b
}
\`\`\`
위의 설명대로 브라우저는 \`const\`를 알 수 없다. 하지만 브라우저 내부에있는 js 엔진이 해석할 수 있기에 우리는 \`ES\`버전은 딱히 몰라도 상관없다.
타입스크립트를 배우기위해선, 위의 내용들을 알고있어야한다. \`ES5\`의 문법은 당연히 \`ESNext(6, 7..)\`에서 포함하고 있고, 이또한 \`Typescript\`에서 포함하고있다.
\`타입스크립트\`또한, \`ESNext\`와 동일하게 ES5로 \`Transpile\`을 해줘야 하는건 예외 없다. 

그럼 우리가 아는 자바스크립트를 그냥 사용해도 되는데, 왜 굳이 타입스크립트를 사용하는 걸까?

## 타입스크립트는 무엇인가?

간단하게 설명하면, 동적타입의 언어와 같이 모든 객체는 타입을 가지며, \`Null-Sefe\`한 연산을 할 수 있는 등 여러 장점이 있다.
예를 들어 다음과 같은 \`Javascript\` 코드에서 문제가 발생 했을 때, 쉽게 문제를 알수 없다.

\`\`\`javascript
function makePerson(name, age) {
    return {
        name: name,
        age: age
    }
}

const person = makePerson(30, 'Kim')
\`\`\`

하지만, 위와 같은 코드에 각 변수에대한 타입이 생긴다면, 작성할 때부터 문제를 알 수 있다.
만약 위에 코드에서 타입이 추가된다면 어떻게 달라질까?

\`\`\`typescript
class Person {
    name: string
    age: number

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}

function makePerson(name: string, age: number): Person {
    return new Person(name, age)
}

const person: Person = makePerson('Kim', 4)
\`\`\`

좀 더 많은 코드가 작성되었다. 하지만, 각 변수는 타입을 가지며, 좀 더 견고한 어플리케이션을 만들수 있는 타입이 생겼다.
클래스 생성을 통해, 의도한 값을 가지는 타입의 객체가 생성되었다. 이는 정말 중요한 내용이다.
기존에 자바스크립트에서 할 수 없었던, 그리고 걱정하지 않아도 되었던, 코드를 작성할 수 있게된다.

## 타입스크립트의 주요 문법

앞서 말한것처럼 \`Typescript\`는 \`ESNext\`, \`ES5\`모두 포괄하고 있는 상위 집합이기에, 두가지 문법을 모두 사용할 수 있다.
`},{_path:"/docs/swift/swift_basic_1",_header:{layout:"post",title:"-Swift- 1.조건문과 반복문",categories:["Development","Swift"],tags:["Swift"],date:166238892e4,current_company:"NEOWIZ",current_position:"Software Engineer",summary:"조건문과 반복문",excerpt_separator:"<!--more-->",hide:!1},_description:`Swift의 조건문과 반복문입니다.
아주 간단한 예제로 알아봅니다. 🧐
`,_content:`


## 조건문

### if Clause

\`\`\`swift
let someInteger = 100

if someInteger < 100 {
    print("100 미만")
} else if someInteger > 100 {
    print("100 초과")
} else {
    print("100")
}
\`\`\`

조건문에는 괄호를 사용하지 않는다.

### switch Clause
\`\`\`swift{4,9}
switch someInteger {
case 0:
    print("zero")
case 1..<100:
    print("1 ~ 99")
case 100:
    print("100")
    print("say yes~")
case 101...Int.max:
    print("over 100")
default:
    print("unknown")
\`\`\`

> 4, 9번 조건을 보면, 범위에 대해 확인 할 수있다.
> a ..< b는 a와 같거나 보다 크고, b보다 작음을 의미한다.
> a ... b는 a와 같거나 보다 크고, b와 같거나 보다 작음을 의미한다.

## 반복문

### For Clause
*normal for*
\`\`\`swift
for i in 0 ..< 4 {
    print("\\(i)")
}
\`\`\`{
0
1
2
3
}



**결과**
\`\`\`
0
1
2
3
\`\`\`
*dictionary for*
\`\`\`swift
for(k, v) in ["A": 1, "B": 2] {
    print("\\"\\(k)\\": \\(v)")
}
\`\`\`

**결과**
\`\`\`
"B": 2
"A": 1
\`\`\`

### repeat and while Clause

*normal while*

\`\`\`swift
var secs: Array<Int> = [1, 2, 3, 4]

while(!secs.isEmpty) {
    print("secs next element: \\(secs.removeFirst())")
}
\`\`\`

**결과**
\`\`\`
secs next element: 1
secs next element: 2
secs next element: 3
secs next element: 4
\`\`\`

*repeat while*
\`\`\`swift
var integers = [1, 2, 3]

repeat {
    print("repeat \\(integers.removeFirst())")
} while integers.count > 5
\`\`\`

**결과**
\`\`\`
repeat 1
\`\`\`

* repeat while은 타언어의 \`do while\`과 비슷하다, 조건이 맞지 않아도 최조 한번은 수행한다.
`},{_path:"/docs/algorithm/heap_sort",_header:{layout:"post",title:"-Algorithm- Heap sort (힙 정렬) feat.java",categories:["Development","Algorithm"],tags:["Java","Algorithm","Sort","Heap Sort","Heap"],date:165183798e4,profile_image:"/assets/blogging/profile/profile4.jpeg",thumbnail:"/assets/blogging/algorithm/heap/heap_sort_intro.png",current_company:"Herit Corporation",current_position:"Backend Server Developer",summary:"힙과 힙정렬",excerpt_separator:"<!--more-->",hide:!1},_description:`열라 간단한 우선순위 큐의 자료구조인 Heap에 대해 공부합니다.
힙의 속성?! 힙이 최소 또는 최대값을 유지하는 방법?!

힙을통해 정렬하는 방법까지 공부합니다. 😁
`,_content:`


# 힙 정렬 (Heap Sort)

## 배울수 있는 내용

* Heap의 속성
* Heap을 만드는 방법
* Heap이 우선 값을 유지하는 방법
* Heap을 이용해 정렬을 하는 방법

🌸 힙(Heap)은 요소의 우선순위를 이용하여 정렬된 상태를 유지할 수 있는 매우 편한 자료구조입니다.
먼저, 힙 정렬을 알기전에 힙이 어떤 속성을 갖고 있는지 알아보아요.

---

## 설명

간단하게 말하여, 힙은 우선순위 큐 입니다. \`JAVA\`에서는 \`PriorityQueue\`라는 구현체를 통해 Heap 자료구조를 사용할 수 있어요.
힙은 두 종류가 있는데 \`최대 힙\`과 \`최소 힙\`이 있어요. 
최대 Heap(최소 Heap)은 단어와 같이 최대 값(최소 값)을 우선순위로 판단하여, 어떠한 값이 들어와도, 항상 같은 순서의
트리를 유지하며, 언제든지 최고 우선순위의 값을 적은 비용으로 쉽게 얻을수 있는 자료구조 입니다.

### Heap의 속성 (특징)

* 최대 힙(**또는 최소 힙**)은 \`잎(leaf)\`의 계층을 제외한 모든 노드는 자식의 노드 보다 큰(**또는 작은**) 값을 가지고 있어야합니다.
* 왼쪽부터 차례대로 채워져있는 \`완전 이진 트리(Complete binary tree)\`이어야 합니다.
* 같은 계층의 노드들과는 정렬하지 않습니다.
* 루트(뿌리)노드로 부터 내려오는 위치의 노드들 오름차순(**또는 내림차순**)입니다

![어떤것이 힙일까요?](/assets/blogging/algorithm/heap/tree_images.svg)

트리 A: 잎을 제외한 노드는 모두 정렬되었지만, 왼쪽부터 채워지지않아 Heap이 아닙니다.
트리 B: 왼쪽부터 채워졌지만, 2번노드의 값은 그 자식에값보다 작습니다. 따라서 Heap이 아닙니다.
트리 C: 잎을 제외한 모든 노드가 자식 또는 부모와 정렬 되어있고, 왼쪽부터 채워져있으므로 \`Heap\`입니다.

이를 정리하면 아래와 같습니다.

> 1. 𝑛개의 노드를 가진 힙은 정확히 하나만 있고 그 힙(트리)의 높이(height)는 ⎣log₂𝑛⎦이다
> * 트리의 전체 노드의 개수가 8일경우 트리(힙)의 높이는 3이다. 즉 힢의 높이는 힙의 성질(속성)에 부합되는 노드들만 인정이 된다는 의미이다.

> 2. 힙의 루트 노드는 항상 최댓값(**또는 최솟값**)을 저장한다.
> * 최대 힙(**또는 최소 힙**)은 쵀댓값(**또는 최솟값**)을 효율적으로 관리하기 위한 자료구조이며, 루트에는 항상 가장 큰(**또는 작은**)값을 유지한다.

> 3. 힙의 한 노드와 그 노드의 자손 노드들로 이루어진 부분 트리(subtree)도 힙이다.
> * 힙은 힙으로 이루어져있으며 자식노드도 힙이 될수있지만, 노드의 자식이없다면 힙이될 수없다. 따라서 위 C 트리의 4, 5, 6번 노드는 힙이 아니다.


### Heap을 만드는 방법

힙을 구성 하기 위해서는 다음의 순서대로 진행됩니다.

1. 순회를 시작할 힙이되는 마지막 노드\`⎣𝑛/₂⎦\`를 찾는다.
2. 마지막 노드 i를 이용해 자식노드가 있는지, 또한 있다면 그 중 자신 보다 큰값을 자신과 찾는다.
3. 찾은 값과 자신을 바꾸고 바꾼 자신의 위치는 그값의 자식이 되며, 자신보다 큰값이 나오지 않을때까지 반복한다.
4. 다음 노드(i -1)에서 다시 \`3.\`을 반복한다.

- 자식 노드의 위치를 찾을때는 왼쪽\`arr[2i]\`값과 오른쪽\`arr[2i + 1]\`로 구할 수 있습니다.

위 의 내용을 정리하면 아래와 같습니다.


![힙 만들기 1단계](/assets/blogging/algorithm/heap/first_iteration.svg)

> 위의 트리는 *완전 이진트리* 입니다. 힙은 완전이진트리에서 만들수 있으므로, 일반 이진트리는 Compact하게 완전이진트리로 바꿔야
> 힙을 만들수 있습니다.
> 
> 왼쪽 트리의 마지막 힙의 값은 15 이며, 이는 자식(6, 4) 어느것 보다도 큰값입니다. 따라서 다음 순회로 넘어갑니다.
> 순회는 내부 노드의 마지막 힙의 위치에서 부터 1까지 이어집니다. 따라서 다음 인덱스인 3번 노드(9)로 넘어갑니다.
> 3번노드는 자신의 자식들 중 6번째, 7번째 (7, 12)와 비교하여 더 큰값을 가지는 12와 바꿉니다.

![힙 만들기 중간 단계](/assets/blogging/algorithm/heap/other_iteration.svg)

> 이후 과정은 위와 같이 반복됩니다. 내부노드를 순회하며 자신의 자식노드가 있는지 확인하고 있다면, 자신과 비교하여 더큰 값으로
> 바꿉니다. 이는 바꾼이후에도 \`3.\`이 반복되게 됩니다.
> 
> 순회되는 노드가 최상위노드가 되고 모든 내부노드가 힙이 될때, 전체 트리는 힙이 됩니다. 
> 마지막까지 바꾼 최종트리는 아래와 같습니다. 


![힙 만들기 마지막 단계](/assets/blogging/algorithm/heap/last_iteration.svg)

* 최상위 노드(루트)가 가장 큰값이 되며, 위는 최대힙을 만드는 단계였습니다.
* 부모노드와 자식노드끼리는 순서의 값을 가지며, 항상 최대의 값을 가집니다.  

### Heap이 우선 값을 유지하는 방법

위에서는 완전이진트리로 힙을 어떻게 만드는지에 대해 알아봤습니다.
하지만, 힙은 언제나 새로운값이 들어와도 항상 우선 순위로 값을 관리합니다. 만약 저기서 더큰값이 추가된다면,
저 힙트리는 어떻게 바뀔까요? 새로운 값들을 추가해서 힙이 다시 어떻게 유지되는지 배워봅니다.

#### 값추가

힙트리에서 값을 추가 할때는 마지막 노드로 붙여주고 위에서 했던것과 동일하게 힙을 만들어 줍니다.
만약 새로운 값 17이 힙에 들어온다면 순서는 아래와 같이 바뀝니다.

![힙 유지하기 1단계](/assets/blogging/algorithm/heap/add_new_17.svg)
![힙 유지하기 2단계](/assets/blogging/algorithm/heap/add_new_17_2.svg)


> A: 새로 들어온 값 17은 트리의 맨뒤인 10번노드로 들어갑니다.   
> 또한 마지막 내부노드이자 자신의 부모인 5번 노드(4)부터 다시 순회를 시작하며, 
> 자신보다 큰 값은 가진 자식 10번 노드(17)과 값을 바꿉니다.
> 
> B: 값이 바뀐 10번 노드(4)는 자식을 가지고있지 않으므로 다음 순회로 넘어갑니다.
> 
> C: 다음 순회인 4번 노드(6)은 자식들보다 큰값이므로 다음 3번 노드(12)로 이동합니다. 하지만 이또한 자식들보다 값이 크므로,
> 2번 노드(8)로 이동합니다. 자신보다 큰값을 가지는 5번 자식노드(17)과 바꿉니다.
> 
> D: 값이 바뀐 5번 노드(8)은 자식들 보다 값이 커, 바꿀 필요가 없으므로 다음 순회인 1번 노드(15)로 이동합니다.
> 
> E: 현재 순회인 1번 노드(15)는 자신의 2번 노드(17)보다 값이 작으므로 바꿉니다.
> 
> F: 최종적으로 힙이 완성되었습니다. 



### Heap을 이용해 정렬을 하는 방법

힙 정렬을 위해서는 사전에 완전 이진 트리를 힙으로 만들고, 정렬을 수행할 수 있습니다.
위에서 만든 힙을 통해 정렬을 하는 방법을 구현합니다.  
힙 정렬은 간단하게, 아래의 정렬하는 순서를 가지고있습니다.

1. 최상위 노드 \`A\`와 가장 끝의 노드 \`B\`를 바꾼다.
2. 바꿔진 A는 맨뒤로 가며,힙에서 제외한다. 
3. 바꾼 값 \`B\`는, 자신의 자식이 있다면, 두개를 비교하여 가장 큰 값과 맞 바꾼다.
4. \`3.\`의 내용을 힙이될때까지 반복한다.

위의 순서를 반복하며, 만든 힙 정렬은 아래와 같습니다.

![힙 정렬 1](/assets/blogging/algorithm/heap/heap_sort_1_1.svg)
![힙 정렬 2](/assets/blogging/algorithm/heap/heap_sort_1_2.svg)
![힙 정렬 3](/assets/blogging/algorithm/heap/heap_sort_1_3.svg)
![힙 정렬 4](/assets/blogging/algorithm/heap/heap_sort_1_4.svg)
![힙 정렬 5](/assets/blogging/algorithm/heap/heap_sort_1_5.svg)
![힙 정렬 6](/assets/blogging/algorithm/heap/heap_sort_1_6.svg)
![힙 정렬 7](/assets/blogging/algorithm/heap/heap_sort_1_7.svg)
![힙 정렬 8](/assets/blogging/algorithm/heap/heap_sort_1_8.svg)

## 구현 코드 (Java)

\`\`\`java
import java.util.Arrays;

public class Heap {
    
    //== 힙(Heap) 을 만드는 메소드 ==//
    public static void makeHeap(int arr[]) {
        // last heap
        int lh = arr.length / 2;
        System.out.println("Normal Array = " + Arrays.toString(arr));
        int eh = arr.length;
        while (lh-- > 0) {

            System.out.println("i: " + lh);
            pushDown(arr, lh, eh);
        }

        System.out.println("Array as Max Heap = " + Arrays.toString(arr));
    }
    
    
    //== 노드와 그 자식중에서 더큰(또는 작은) 위치를 찾는 메소드 ==//
    public static int findLargest(int arr[], int node, int eh) {
        // first child
        int fc = (2 * (node + 1)) - 1;

        if (fc + 1 < eh) {
            if (arr[fc] <= arr[fc + 1]) {
                return arr[fc + 1] <= arr[node] ? node : fc + 1;
            } else {
                return arr[fc] <= arr[node] ? node : fc;
            }
        }
        if (fc < eh && arr[node] < arr[fc]) {
            return fc;
        } else {
            return node;
        }
    }
    //== 값을 아래로 내리는 메소드 ==//

    /**
     * 간단하게 보면 트리에서 마지막 힙의 위치를 구하고,
     * 루트 노드까지 역순으로 힙을 만들어갑니다.
     * 
     * 최대 힙(또는 최소 힙)의 조건에 따라 더큰(또는 더 작은)값을 기준으로,
     * 해당 노드를 위로올리고 변경된 대상은 아래로 내려가며 계속 바꿉니다.
     */
    public static void pushDown(int arr[], int node, int eh) {
        do {
            System.out.println("j: " + node);
            int temp = arr[node];
            int large = findLargest(arr, node, eh);
            System.out.println(drawBinaryTree(arr));

            if (large == node)
                break;

            arr[node] = arr[large];
            arr[large] = temp;

            node = large;
        } while (node <= eh);
    }

    public static void sort(int arr[]) {
        int last = arr.length;
        makeHeap(arr);

        while (--last >= 0) {

            int temp = arr[0];
            arr[0] = arr[last];
            arr[last] = temp;

            System.out.println("last: " + last);
            pushDown(arr, 0, last);
        }
        ;
    }

    //== 출력 메소드 ==//
    public static String drawBinaryTree(int arr[]) {
        StringBuilder builder = new StringBuilder();

        int nol = (int) (Math.log(arr.length) / Math.log(2)) + 1;
        int max = (int) Math.pow(2, nol - 1);

        int printed = 0;
        for (int i = 0; i < nol; i++) {
            int perFloor = (int) Math.pow(2, i);
            int tab = (max - perFloor) / 2 + (max - perFloor) % 2;
            int last = printed + perFloor;

            for (int j = 0; j < tab; j++) {
                builder.append("  ");
            }
            for (int j = printed; (j < arr.length && j < last); j++) {
                builder.append(String.format("(%d)", arr[j]));
            }
            builder.append("\\n");
            printed += perFloor;
        }

        return builder.toString();
    }
    
    public static void main(String args []) throws Exception {
        //== 힙 으로 만들기==//
        int arrForMake [] = {1, 5, 8, 2, 74, 9, 12, 104, 87, 43};
        Heap.makeHeap();
        
        //== 힙 + 정렬 ==//
        int arrForSort [] = {1, 8, 9, 15, 4, 7, 12, 6, 4, 17};
        Heap.sort(arr);
        
    }
}
\`\`\`



`},{_path:"/docs/algorithm/insertion_sort",_header:{layout:"post",title:"-Algorithm- Insertion Sort (삽입정렬 알고리즘) feat.java",categories:["Development","Algorithm"],tags:["Java","Algorithm","Sort","Insertion Sort"],date:16505511e5,thumbnail:"/assets/blogging/algorithm/insertion_sort_intro.png",current_company:"Herit Corporation",current_position:"Backend Server Developer",summary:"삽입 정렬",excerpt_separator:"<!--more-->",hide:!1},_description:`이번 포스팅 순서는, 
기본 정렬 알고리즘중 하나인 삽입 정렬(Insertion Sort)입니다.

이전 포스팅의 선택정렬하고는 또 다른 맛이있네용 ㅋㅋ

지적 및 조언 댓글 환영입니다. ㅎㅎ
`,_content:`


## 삽입정렬 (Insertion Sort)


🌸 삽입정렬은 배열을 순회하며, 삽입할 위치를 찾고 요소들을 **한단계씩 밀어** 해당 위치에 삽입하며 정렬하는 알고리즘 입니다.
삽입정렬 또한 선택정렬과 마찬가지로 정렬된 부분과 정렬되지 않은 부분으로 나뉩니다.

> **한단계씩 밀어** 라는 말은 [ 1 ][ 3 ][ 2 ] 에서 2라는 요소를 임시로 빼고 1 과 3사이에 들어갈공간을 만들기 위해 뺀 2의 자리로 3을 한 단계밀어,
> [ 1 ][   ][ 3 ] 처럼 빈 공간을 만든 다는 의미입니다.


---

### 설명

순회 인덱스 i: 3 (0, 1, 2는 요소가 1, 4, 7이므로 정렬이되어 있으므로, 넘어갑니다.)

<div class="array">
    <span class="over">1</span>
    <span class="over">4</span>
    <span class="target">7</span>
    <span class="current">3</span>
    <span>2</span>
    <span>5</span>
</div>

> 삽입정렬은 선택정렬과 다르게 지나온 요소들과 비교하여 밀면서 정렬해 나갑니다. 위 배열에서 1, 4, 7 요소는 정렬 되있기때문에,
> j는(j = i - 1, 현재 3) 0이 될때까지 계속 순회하며 이전값과 비교하여 정렬 대상인지 아닌지를 판단합니다. 3은 7과 정렬 대상이기 때문에 정렬을 위해 밀고 삽입합니다.


순회 인덱스 i: 3 

<div class="array">
    <span class="over">1</span>
    <span class="over">4</span>
    <span class="target">7</span>
    <span class="current">7</span>
    <span>2</span>
    <span>5</span>
</div>

> 3의 값을 복사해두고 3의 자리로 7을 밀게됩니다. 그럼 위와 같은 상황이되고 삽입할 위치에 3을 삽입하여, 아래처럼 만들수있습니다.


순회 인덱스 i: 3

<div class="array">
    <span class="over">1</span>
    <span class="over">4</span>
    <span class="target">3</span>
    <span class="current">7</span>
    <span>2</span>
    <span>5</span>
</div>

> 한번의 정렬이 끝났으니 j를 감소시켜 또다시 이전 요소 (3과 4)를 비교하여 정렬대상이 되었습니다. 
> i는 현재 3이지만 i이전의 인덱스를 가진 요소들은 정렬되지 않았기 때문에 j를 감소시켜가며 끝까지 정렬합니다.


* 순회 인덱스 i: 3
* 내부 순회 인덱스 j: 2

<div class="array">
    <span class="over">1</span>
    <span class="target">4</span>
    <span class="current">4</span>
    <span class="over">7</span>
    <span>2</span>
    <span>5</span>
</div>

* 내부 순회 인덱스 j: 1

<div class="array">
    <span class="target">1</span>
    <span class="current">3</span>
    <span class="over">4</span>
    <span class="over">7</span>
    <span>2</span>
    <span>5</span>
</div>

> 내부 순회 인덱스를 줄여가며 정렬을 하였고 현재 내부 순회 인덱스(j)인 1에대한 요소(3)가 비교할 인덱스 0에대한 요소(1)과 정렬되어있다고 판단 하기에,
> j는 더이상 감소시키지 않습니다. 따라서 i를 다시 증가시키며 이과정을 반복하여 정렬합니다.
> 이후의 과정은 아래와 같습니다.

* 순회 인덱스 i: 4
* 내부 순회 인덱스 j: 3 (i - 1)

<div class="array">
    <span class="over">1</span>
    <span class="over">3</span>
    <span class="over">4</span>
    <span class="target">7</span>
    <span class="current">2</span>
    <span>5</span>
</div>

<div class="array">
    <span class="over">1</span>
    <span class="over">3</span>
    <span class="over">4</span>
    <span class="current">2</span>
    <span class="target">7</span>
    <span>5</span>
</div>

* 순회 인덱스 i: 4
* 내부 순회 인덱스 j: 2 (j--)

<div class="array">
    <span class="over">1</span>
    <span class="over">3</span>
    <span class="target">4</span>
    <span class="current">2</span>
    <span>7</span>
    <span>5</span>
</div>

<div class="array">
    <span class="over">1</span>
    <span class="over">3</span>
    <span class="current">2</span>
    <span class="target">4</span>
    <span class="over">7</span>
    <span>5</span>
</div>

* 순회 인덱스 i: 4
* 내부 순회 인덱스 j: 1 (j--)

<div class="array">
    <span class="over">1</span>
    <span class="target">3</span>
    <span class="current">2</span>
    <span class="over">4</span>
    <span class="over">7</span>
    <span>5</span>
</div>

<div class="array">
    <span class="over">1</span>
    <span class="current">2</span>
    <span class="target">3</span>
    <span class="over">4</span>
    <span class="over">7</span>
    <span>5</span>
</div>

* 순회 인덱스 i: 5
* 내부 순회 인덱스 j: 4 (j - 1)

<div class="array">
    <span class="over">1</span>
    <span class="over">3</span>
    <span class="over">2</span>
    <span class="over">4</span>
    <span class="target">7</span>
    <span class="current">5</span>
</div>

<div class="array">
    <span class="over">1</span>
    <span class="over">2</span>
    <span class="over">3</span>
    <span class="over">4</span>
    <span class="target">5</span>
    <span class="current">7</span>
</div>

* 정렬 결과

<div class="array">
    <span class="over">1</span>
    <span class="over">2</span>
    <span class="over">3</span>
    <span class="over">4</span>
    <span class="target">5</span>
    <span class="current">7</span>
</div>

> 모든 정렬을 수행했으므로 정렬이 완료되었습니다.


### 예제코드

* 예제코드는 생각 보다 단순합니다. 아래와 같이 배열을 순회하는 i가 있고, \`array[1..i]\`에서 정렬을 하는 방식입니다.


\`\`\`java
public class InsertionSort {
    
    public static void sort(int [] array) {

        for (int i = 1; i < array.length; i++) {
            int current = array[i];
            int j = i - 1;

            while(array[j + 1] < array[j]) {
                array[j + 1] = array[j];
                array[j--] = current;
            }
        }
    }
}
\`\`\`

> 잘못된 설명이 있거나, 조언은 아래 댓글로 부탁드립니다. 😄`},{_path:"/docs/algorithm/mathematical_induction",_header:{layout:"post",title:"-Algorithm- Mathematical Induction (수학적 귀납법) feat.java",categories:["Development","Algorithm"],tags:["Java","Algorithm","Mathematical Induction"],date:164968164e4,thumbnail:"/assets/blogging/algorithm/Mathematical_Induction.png",current_company:"Herit Corporation",current_position:"Backend Server Developer",summary:"수학적 귀납법",excerpt_separator:"<!--more-->",hide:!1},_description:`
이진탐색 주제의 전형적인 예로,
배열에서 특정값을 찾을수 있는 알고리즘을 기준으로,
수학적 귀납법을 조금이나마 쉽게 이해할 수 있어요.

`,_content:`


## 수학적 귀납법(Mathematical Induction)

🌸 정의: 수학적 귀납법은 모든 자연수가 어떤 주어진 성질을 만족시킨다는 명제를 증명하는 방법의 하나.  
  
위의 정의 처럼 배열내 최대값을 구하는(주어진 성질) 알고리즘이 어떤 명제에 의해 증명되는지 간단하게 정리 할 거에요.

## 가정 및 순서

* 가정
> 𝑵(>= 1) : 탐색범위에 있는 정렬된 정수들의 수 (배열의 길이)  
> 𝓍 : 찾는 정수

* 단계

1. 기본단계  
𝑵 = 1일 때 𝓍를 목록에 있는 하나뿐인 정수와 한 번만 비교하면 𝓍가 목록에 있는지 여부를 알 수 있으므로 이진탐색은 맞다.  
> 설명: 배열에 길이(𝑵)가 1이더라도 해당 요소와 "한 번" 비교하여 목록에 있는지 알 수 있기 때문에 이진탐색 이라는 의미.

2. 귀납적 가설  
𝑵 <= 𝓴(양의 정수)일 때 이진 탐색은 𝓍가 목록에 있는지 여부를 알려 준다고 가정하자.
> 설명: 배열의 길이(𝑵)가 무조건 양수(정수)인 경우에 그값이 한 개라도 있다면 비교가 가능하기에 있는지에 대한 여부를 확인할수 있다.

3. 귀납적 단계  
𝑵 = 𝓴 + 1일 때 이진 탐색은 𝓍가 목록에 있는지 여부를 알려 준다는 것을 증명하자. 이진탐색은 먼저 𝓍를 𝑵개의 정수들의 중간 요소와 비교한다. 비교 결과는 다음과 같이 세 가지 경우가 있다.
> 설명:  𝑵 = 𝓴 + 1라는 가정(배열내 요소가 존재)에서 이진탐색을 통해 𝓍가 목록에 있는지에 대한 여부를 알아 낼 수있다. 이진 탐색은 기본적으로 중간값 피벗을 정해두고 이를 기준으로 오른쪽(큰수) 또는 왼쪽(작은수)의 배열을 사용할 지를 구분할 수 있다.  
> 물론 이 기준은 현재의 상황에서 오름차순(또는 내림차순)으로 정렬되어있는 경우에 이진 탐색을 시도할 수 있다.  
> 만약 \`[12, 22, 37, 39 ,50]\`이라는 배열이 있고 찾는 값인 𝓍가 가운데 값인 \`37\`과 비교해서 어떤 배열(또는 37)에서 찾을 수 있는 지를 의미한다.  
> 찾는값이 37이상 이라면 아래처럼 왼쪽의 값들은 비교조차 안하며 초록색의 값들에서만 찾는다.


<div class="array">
    <span class="over">12</span>
    <span class="over">22</span>
    <span class="current">37</span>
    <span class="target">39</span>
    <span class="target">50</span>
</div>


<table class="case-table">
    <tbody>
        <tr>
            <th><span class="case-head">경우 1</span></th>
            <td><span class="case-body">𝓍가 중간요소와 같다.<br/>이 경우는 𝓍를 찾았으므로 이진 탐색은 맞다.</span></td>
        </tr>
        <tr>
            <th><span class="case-head">경우 2</span></th>
            <td><span class="case-body">𝓍가 중간 요소보다 작다.<br>이 경우는 𝓍를 목록의 왼쪽 반에서 찾아야한다. 목록의 왼쪽 반의 크기 𝑵'은 ⎣𝑵/2⎦이다. 𝑵' <= 𝓴이므로 귀납적 가설에 의해 이진탐색은 𝓍가 목록에 있는지 여부를 알려 준다.<br/>따라서 이진탐색은 맞다.</span></td>
        </tr>
        <tr>
            <th><span class="case-head">경우 3</span></th>
            <td><span class="case-body">𝓍가 중간요소보다 크다.<br/>이 경우는 경우 2와 비슷한 논리로 맞다.</span></td>
        </tr>
    </tbody>
</table>

따라서 이진탐색은 𝑵 = 𝓴 + 1일 때 맞다.

> 잘못 설명된 내용이 있거나, 부적절한 예시가 있다면, 아래 댓글로 조언 부탁드립니다.  
> 감사합니다.  😄`},{_path:"/docs/algorithm/selection_sort",_header:{layout:"post",title:"-Algorithm- Selection Sort (선택정렬 알고리즘) feat.java",categories:["Development","Algorithm"],tags:["Java","Algorithm","Sort","Selection Sort"],date:164908284e4,thumbnail:"/assets/blogging/algorithm/selection_sort_intro.png",current_company:"Herit Corporation",current_position:"Backend Server Developer",summary:"선택 정렬",excerpt_separator:"<!--more-->",hide:!1},_description:`기본 정렬 알고리즘중 하나인 선택 정렬(Selection Sort)입니다.
간단한 그림과 함께 쉽게 이해할 수 있도록 정리했어요.
`,_content:`


## 선택정렬 (Selection Sort)


🌸 선택 정렬은 정렬할 배열을 순회하며, 어떤 원소로 대치할지 선택하여 정렬하는 알고리즘 입니다.
설명을 보기에 앞서, 통상적으로 정렬은 오름 또는 내림으로 배열의 수열을 맞추어 순서를 만드는 행위로 의미합니다.

---
  
  
  

<div class="array">
    <span>1</span>
    <span>4</span>
    <span>7</span>
    <span>3</span>
    <span>2</span>
    <span>5</span>
</div>


> 정렬을 하기위해 배열을 준비합니다. 또한, 해당 배열을 순회하면서 *나머지들의 값들중 가장작은 값으로 변경합니다.

순회 인덱스 i: 0

<div class="array">
    <span class="current">1</span>
    <span>4</span>
    <span>7</span>
    <span>3</span>
    <span>2</span>
    <span>5</span>
</div>

> 첫번째 순회요소는 나머지의 값들중 가장작은 값인 1 입니다. 따라서, 변경하지않습니다.

순회 인덱스 i: 1

<div class="array">
    <span class="over">1</span>
    <span class="current">4</span>
    <span>7</span>
    <span>3</span>
    <span class="target">2</span>
    <span>5</span>
</div>

> 두번째는 4입니다. 나머지의 요소들중 가장작은값이 2가 존재합니다. 4와 2를 변경합니다. 다음 부터는 정렬 순서가 동일합니다. 배열의 끝까지 순회하며 나머지 값들로 선택후 변경으로 정렬합니다.

순회 인덱스 i: 2

<div class="array">
    <span class="over">1</span>
    <span class="over">2</span>
    <span class="current">7</span>
    <span class="target">3</span>
    <span>4</span>
    <span>5</span>
</div>

순회 인덱스 i: 3

<div class="array">
    <span class="over">1</span>
    <span class="over">2</span>
    <span class="over">3</span>
    <span class="current">7</span>
    <span class="target">4</span>
    <span>5</span>
</div>

순회 인덱스 i: 4

<div class="array">
    <span class="over">1</span>
    <span class="over">2</span>
    <span class="over">3</span>
    <span class="over">4</span>
    <span class="current">7</span>
    <span class="target">5</span>
</div>

순회 인덱스 i: 5

<div class="array">
    <span class="over">1</span>
    <span class="over">2</span>
    <span class="over">3</span>
    <span class="over">4</span>
    <span class="over">5</span>
    <span class="over">7</span>
</div>

## 과정 코드

* 요소 교환
\`\`\`java
    /**
     * i 와 j 값 변경
     * 각 인덱스로 접근하므로 시간복잡도는 상수시간을 갖는다. O(1)
     * @param array
     * @param i
     * @param j
     */
public static void swapElements(int [] array, int i, int j) {
    int temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
\`\`\`

* 최소값 찾기
\`\`\`java
/**
 * start 인덱스 부터 시작해서 끝까지 순회중 가장 작은 값을 리턴한다.
 * @param array
 * @param start
 * @return
 */
public static int indexLowest(int [] array, int start) {
    int lowIndex = start;

    for(int i = start;i < array.length;i++) {
        if(array[i] < array[lowIndex]) {
            lowIndex = i;
        }
    }
    return lowIndex;
}
\`\`\`

* 최소값을 찾고, 변경
\`\`\`java
/**
 * indexLowest 메서드를 통해 얻어온 가장작은값의 인덱스를 현재 인덱스와 변경한다.
 * @param array
 */
public static void selectionSort(int [] array) {
    System.out.printf("before selection sort : %s\\n", Arrays.toString(array));
    for(int i = 0;i < array.length;i++) {
        int j = indexLowest(array, i);
        swapElements(array, i, j);

        System.out.printf("(i = %d) array : %s\\n",i , Arrays.toString(array));
    }

}
\`\`\`

### 호출

\`\`\`java
import sort.selection_sort.SelectionSort;

public class Main {

    public static void main(String[] args) throws Exception {
    
        int [] needSort = {1, 4, 7, 3, 2, 5};
        
        SelectionSort.selectionSort(needSort);
    }
}
\`\`\`

### 콘솔
\`\`\`
before selection sort : [1, 4, 7, 3, 2, 5]
(i = 0) array : [1, 4, 7, 3, 2, 5]
(i = 1) array : [1, 2, 7, 3, 4, 5]
(i = 2) array : [1, 2, 3, 7, 4, 5]
(i = 3) array : [1, 2, 3, 4, 7, 5]
(i = 4) array : [1, 2, 3, 4, 5, 7]
(i = 5) array : [1, 2, 3, 4, 5, 7]
after selection sort : [1, 2, 3, 4, 5, 7]
\`\`\`

> 풀이 또는 잘못된 설명은 아래 댓글로 말씀 부탁드립니다.

`},{_path:"/docs/spring/abstractplatformtransactionmanager",_header:{layout:"post",title:"-Spring- TransactionManager (트랜잭션 관리자)",categories:["Development","Spring"],tags:["Spring","Spring Boot","Transaction","Transaction Manager"],date:163576068e4,thumbnail:"/assets/blogging/spring/Transaction_Manager.png",current_company:"Herit Corporation",current_position:"Backend Server Developer",summary:"트랜잭션 매니저",excerpt_separator:"<!--more-->",hide:!1},_description:`Spring 내부에서 이루어지는 Database Transaction ! 
혹시 이해하고 계신가요? 

Spring Transaction Manager가 하는 일을 공식문서를 통해 알아 보아요!

`,_content:`

## AbstractPlatformTransactionManager



Spring은 Transaction Manager를 추상화하여 간단하게 사용할수 있어요. \`DataSourceTransactionManager\` 이던 \`HibernateSessionMannager\` 던 등등 다른 Transaction Manager를 하나로 추상화 되어있는 \`AbstractPlatformTransactionManager\`를 상황에 맞는 구성을 Spring이 구성해주기때문에 별다른 설정없이 사용하면 됩니다.



### 설명

Abstract base class that implements Spring's standard transaction workflow, serving as basis for concrete platform transaction managers like org.springframework.transaction.jta.JtaTransactionManager.
This base class provides the following workflow handling:
s
* determines if there is an existing transaction;

* applies the appropriate propagation behavior;

* suspends and resumes transactions if necessary;

* checks the rollback-only flag on commit;

* applies the appropriate modification on rollback (actual rollback or setting rollback-only);

* triggers registered synchronization callbacks (if transaction synchronization is active).



Subclasses have to implement specific template methods for specific states of a transaction, e.g.: begin, suspend, resume, commit, rollback. The most important of them are abstract and must be provided by a concrete implementation; for the rest, defaults are provided, so overriding is optional.

Transaction synchronization is a generic mechanism for registering callbacks that get invoked at transaction completion time. This is mainly used internally by the data access support classes for JDBC, Hibernate, JPA, etc when running within a JTA transaction: They register resources that are opened within the transaction for closing at transaction completion time, allowing e.g. for reuse of the same Hibernate Session within the transaction. The same mechanism can also be leveraged for custom synchronization needs in an application.



The state of this class is serializable, to allow for serializing the transaction strategy along with proxies that carry a transaction interceptor. It is up to subclasses if they wish to make their state to be serializable too. They should implement the java.io.Serializable marker interface in that case, and potentially a private readObject() method (according to Java serialization rules) if they need to restore any transient state.



\`org.springframework.transaction.jta.JtaTransactionManager\` 같이 실제 플랫폼 트랜잭션매니저의 기반으로 사용되는 Spring의 표준 트랜잭션 작업흐름 구현체, 추상 기본  클래스입니다.

이 기본 클래스는 다음의  작업흐름을 처리를 제공합니다.

* 트랜잭션이 있는지 판단합니다.
* 적절한 전파 동작을 적용합니다.
* 필요하다면 트랜잭션을 중단하고 재개합니다.
* 커밋 시 rollback-only 표시를 확인합니다.
* 롤백 시 적절한 수정 사항을 적용합니다. (실제 롤백 또는  rollback-only를 설정해서)
* 등록된 동기화 콜백을 트리거합니다. (트랜잭션 동기화가 활성화 된 경우)



하위클래스는 트랜잭션의 특정 상태에대한 특정 템플릿 메서드를 구현해야합니다 (예:  중단, 재개, 커밋, 롤백전). 가장중요한 건 추상화와 실제 구현체로 제공되어야만 하는것이고, 그외에는 기본값이 제공되므로 \`overriding\` 선택사항 입니다.



트랜잭션 동기화는 트랜잭션 완료시간에 호출되는 콜백을 등록하기위한 일반적인 메커니즘입니다. 이것은 JTA 트랜잭션 내에서 동작할때 JDBC, 하이버네이트, JPA 등등에 대한 데이터 접근클래스로부터 내부적으로 사용됩니다. (트랜잭션 완료 시간에 닫히기 위해 트랜잭션 내에서 개방된 리소스를 등록합니다. 예 : 트랜잭션 내 동일한 하이버네이트 세션의 재사용을 위해 )  



이 클래스의 상태는 직렬화 가능하여  트랜잭션 인터셉터를 전달하는 프록시와 마찬가지로 트랜잭션 전략를 직렬화할 수 있습니다. 이것은 하위클래스에 달려있는데, 상태를 직렬화 되게 만들고 싶다면 그렇게하세요. 이 경우에 하위클래스는 마커 인터페이스인 \`java.io.Seializable\` 를 구현해야하며 일시적인 상태를 복원해야하는경우 잠재적으로 \`private\` readObject()  메소드 (자바 직렬화 규칙에따라 )를 구현해야합니다.



### 필드

* SYNCHRONIZATION_ALWAYS = 0;

  * 트랜잭션 동기화를 항상 활성화며 기존 백엔드 트랜잭션이 없는 PROPAGATION_SUPPORTS인 "비어있는" 트랜잭션 까지도 적용됩니다.



* SYNCHRONIZATION_ON_ACTUAL_TRANSACTION = 1;

  * 실제 트랜잭션을 위해서만 트랜잭션 동기화를 활성화 하며, 기존 백엔드 트랜잭션이 없는  PROPAGATION_SUPPORTS 인 비어있는 트랜잭션에는 적용되지 않습니다.



* SYNCHRONIZATION_NEVER = 2;

  * 실제 트랜잭션까지도 트랜잭션동기화를 활성화하지 않습니다.

## 설정기능

AbstactPlatformTransactionManager는 트랜잭션 동기화를 등록하고 관리할 수 있습니다.



#### final setTransactionSynchronizationName(String constantName)

* 이 클래스의 해당 상수명으로 트랜잭션 동기화를 설정합니다.



#### final setTransactionSynchronization( int transactionSynchronization)

* 이 트랜잭션 매니저가 Thread-bound 트랜잭션 동기화 지원을 활성화 해야만 할때 설정합니다. 기본값은 \`SYNCHRONIZATION_ALWAYS\` 입니다.
* 참고로 트랜잭션 동기화는 다른 트랜잭션 매니저에 의해 다중 동시 트랜잭션을 지원하지 않습니다. 한개의 트랜잭션 매니저만이 이것을 언제든지 허용할 수 있습니다.



#### final setDefaultTimeout(int defaultTimeout)

* 트랜잭션 레벨에 초단위로 명시된 타임아웃이 없는경우 이 트랜잭션 매니저가 적용해야만하는 기본 타임아웃을 명시합니다.
* 기본값은 근본적인 트랜잭션 인프라 기본 타임아웃(예: 일반적으로, JTA Provider 의 경우 30초)이며, TransactionDefinition.TIMEOUT_DEFAULT 값으로 나타납니다.



#### final setNestedTransactionAllowed(boolean nestedTransactionAllowed)

* 기본값은 "false"이며, 중복 트랜잭을 허용할지 설정합니다.
* 일반적으로 구체적인 트랜잭션 매니저 하위클래스에 의해 적절한 기본값으로 초기화 됩니다.



#### final setValidateExistingTransaction(boolean validateExistingTransaction)

* 기존 트랜잭션에 참여하기 전에 검증돼야하는지 설정합니다.
* 기존 트랜잭션(예: PROPAGATION_REQUIRED 또는 PROPAGATION_SUPPORT가 기존 트랜잭션을 만나는 경우)에 참여할때, 이 외부 트랜잭션의 형질은 내부 트랜잭션영역에 까지도 적용됩니다.
* 유효성 검사는 내부 트랜잭션 정의에서 호환되지 않는 고립레벨 및 읽기전용 설정을 감지하고 해당 예외를 throw하여 이에따라 참여를 거부합니다.
* 기본값은 "false"이며, 내부 트랜잭션 설정을 느슨하게 무시하여, 외부 트랜잭션의 형질로 간단히 재정의 합니다.
* "true" 플래그로 변경은 엄격한 유효성검사를 강제하도록 명령합니다.



#### final setGlobalRollbackOnParticipationFailure(boolean gloabalRollbackOnParticipationFailure)

* 참여하는 트랜잭션이 실패한후에 기존 트랜잭션을 \`rollback-only\`로 전역적으로 표시할지 설정합니다.
* 기본값은 "true"이며, 참여하는 트랜잭션(예: PROPAGATION_REQUIRED 또는 PROPAGATION_SUPPORT가 기존 트랜잭션을 만나는 경우)이 실패한다면, 트랜잭션은 \`rollback-only\`로 전역적으로 표시됩니다.  그런 트랜잭션에 오직 가능한 결과는 롤백입니다.*
* “false”로 변경시: 트랜잭션 발신자가 롤백 결정을 내립니다. 만약 참여하는 트랜잭션이 예외로 실패한다면, 호출자는 트랜잭션 내 다른경로로 계속하기로 결정할 수 있습니다. 하지만, 이는 모든 참여 자원이 데이터 액세스 실패 후에도 트랜잭션 커밋을 향해 계속할 수 있는 경우에만 작동합니다. (일반적으로 Hibernate 세션은 해당되지 않는 경우입니다. 예: JDBC insert/update/delete 동작들의 sequence)
* **참고: ** 이 플래그는 일반적으로 데이터 접근 작업(TransactionInterceptor가 롤백룰에 따라 PlatformTransactionManager.rollback() 호출을 트리거하는 경우)으로 인해 throw 된 예외가 발생한 하위 트랜잭션에 대한 명시적 롤백시도에만 적용됩니다. 플래그가 비활성화라면 호출자는 하위 트랜잭션의 롤백룰과 관계없이 예외를 처리하고 롤백을 결정할 수 있습니다. 그러나 이 플래그는 하위트랜잭션에 명시적 \`setRollbackOnly\` 호출을 적용하지 않으므로,이는  항상 최종적인 글로벌 롤백(\`rollback-only\` 호출후 예외가 발생하지 않을 수 있기 때문에 )을 유발합니다.
* 하위트랜잭션의 실패처리에 대한 추천드리는 방법은 글로벌 트랜잭션이 하위트랜잭션의 시작시 가져온 세이브포인트로 롤백될 수 있도록 하는 “중복 트랜잭션” 입니다. \`PROPAGATION_NESTED\`는 정확히 이러한 의미를 제공합니다. 그러나, 중복 트랜잭션 지원이 가능할 때만 동작합니다. \`DataSource TransactionManager\` 경우지만, \`JtaTransactionManager\`의 경우는 아닙니다.


#### final setFailEarlyOnGlobalRollbackOnly(boolean failEarlyOnGlobalRollbackOnly)
* 트랜잭션이 \`rollback-only\`로 전역적으로 표시된 경우에 조기 실패할 것 인지 설정합니다.
* 기본값은 “false” 이며, 가장 바깥쪽의 트랜잭션 바운더리에서만 \`UnexpectedRollbackExcetpion\`을 발생시킵니다. 내부 트랜잭션 바운더리 내에서  까지 전역 rollback-only 표시자가 처음 감지하여 즉시 \`UnexpectedRollbackException\`을 발생시키려면 이 값을 변경하세요.
* 참고로 스프링 2.0부터 전역  rollback-only 표시자에 대한 조기실패 동작이 통합 되었습니다. (모든 트랜잭션 매니져는 기본적으로 가장 바깥쪽의 트랜잭션 바운더리에서만 \`UnexpectedRollbackException\`을 발생시킵니다.) 이 허용 예를들어 동작이 실패하고 트랜잭션이 완료되지 않은 후에도 유닛 테스트를 계속할 수 있습니다. 모든 트랜잭션 매니저는 이 플래그가 명시적으로 "true"로 설정됐을 때만 조기실패 시킵니다.

#### final setRollbackOnCommitFailure(boolean rollbackOnCommitFailure)
*  \`doCommit\`메소드 호출의 실패에 \`doRollback\`이 수행 해야만하는지 설정합니다. 일반적으로 필요하지 않고 후속 롤백 예외로 커밋 예외를 무시할 가능성이 있으며, 따라서 피해야합니다.

## PlatformTransactionManager 구현체


### final getTransaction(TransactionDefinition definition)

\`\`\`java
@Override
public final TransactionStatus getTransaction(@Nullable TransactionDefinition definition)
        throws TransactionException {

    // Use defaults if no transaction definition given.
    TransactionDefinition def = (definition != null ? definition : TransactionDefinition.withDefaults());

    Object transaction = doGetTransaction();
    boolean debugEnabled = logger.isDebugEnabled();

    if (isExistingTransaction(transaction)) {
        // Existing transaction found -> check propagation behavior to find out how to behave.
        return handleExistingTransaction(def, transaction, debugEnabled);
    }

    // Check definition settings for new transaction.
    if (def.getTimeout() < TransactionDefinition.TIMEOUT_DEFAULT) {
        throw new InvalidTimeoutException("Invalid transaction timeout", def.getTimeout());
    }

    // No existing transaction found -> check propagation behavior to find out how to proceed.
    if (def.getPropagationBehavior() == TransactionDefinition.PROPAGATION_MANDATORY) {
        throw new IllegalTransactionStateException(
                "No existing transaction found for transaction marked with propagation 'mandatory'");
    }
    else if (def.getPropagationBehavior() == TransactionDefinition.PROPAGATION_REQUIRED ||
            def.getPropagationBehavior() == TransactionDefinition.PROPAGATION_REQUIRES_NEW ||
            def.getPropagationBehavior() == TransactionDefinition.PROPAGATION_NESTED) {
        SuspendedResourcesHolder suspendedResources = suspend(null);
        if (debugEnabled) {
            logger.debug("Creating new transaction with name [" + def.getName() + "]: " + def);
        }
        try {
            return startTransaction(def, transaction, debugEnabled, suspendedResources);
        }
        catch (RuntimeException | Error ex) {
            resume(null, suspendedResources);
            throw ex;
        }
    }
    else {
        // Create "empty" transaction: no actual transaction, but potentially synchronization.
        if (def.getIsolationLevel() != TransactionDefinition.ISOLATION_DEFAULT && logger.isWarnEnabled()) {
            logger.warn("Custom isolation level specified but no actual transaction initiated; " +
                    "isolation level will effectively be ignored: " + def);
        }
        boolean newSynchronization = (getTransactionSynchronization() == SYNCHRONIZATION_ALWAYS);
        return prepareTransactionStatus(def, null, true, newSynchronization, debugEnabled, null);
    }
}
\`\`\`

이 구현체는 전파동작을 처리합니다. doGetTransaction, isExistingTransaction 및 doBegin 메서드를 위임합니다.
설정된 값을 먼저확인하고 없다면 기본값으로 세팅하  트랜잭션을 가져옵니다. 제일먼저 \`TransactionDefinition\` 기본값 세팅 후 \`doGetTransaction\`으로 트랜잭션을 불러옵니다.
이 메서드에서는 먼저 살펴봐야할 메서드가 3가지정도로 나눌수 있어요. \`doGetTransaction\`, \`handleExistingTransaction\`, \`doBegin\`을 보며 유추합니다.


#### doGetTransaction

* 현재 트랜잭션 상태에대한 트랜잭션 객체를 리턴하는 메서드에요.
* 반환된 객체는 일반적으로 변경할수 있는 방식에 해당하는 트랜잭션을 전달하여 구체적인 트랜잭션 매니저 구현체에 명시됩니다.


이 메서드는 추상화되어있고 각 구현체인 Transaction Manager들에 의하여 구현되있어요. 일반적으로 \`JDBC\`를 사용하는 \`DataSourceTransactionManager\`를 예로 볼거에요.

\`\`\`java
@Override
protected Object doGetTransaction() {
  DataSourceTransactionObject txObject = new DataSourceTransactionObject();
  txObject.setSavepointAllowed(isNestedTransactionAllowed());
  ConnectionHolder conHolder =
      (ConnectionHolder) TransactionSynchronizationManager.getResource(obtainDataSource());
  txObject.setConnectionHolder(conHolder, false);
  return txObject;
}
\`\`\`
\`line 4\`에서 세이브포인트를 이 트랜잭션내에서 허용될 것인지를 정하고 매개변수로 중첩트랜잭션의 허용 여부을 보냅니다. \`line 5\`에 \`ConnnectionHolder\`가 컨넥션 및 세이브 포인트를 생성합니다. 아래 코드를 보시면 세이브포인트의 네이밍을 확인할 수 있죠.

\`\`\`java
public Savepoint createSavepoint() throws SQLException {
		this.savepointCounter++;
		return getConnection().setSavepoint(SAVEPOINT_NAME_PREFIX + this.savepointCounter);
	}
\`\`\`
트랜잭션 내에서 \`SAVEPOINT_0\`, \`SAVEPOINT_1\` .. 이런식으로 생성되면서 갯수를 체크하죠. \`ConnectionHolder\`는 현재 설정된 DataSource로 \`Connnection\`을 생성하여 할당 합니다. 결과적으로 세이브포인트 사용 여부와 컨넥션을 가지고 트랜잭션 객체를 반환해요.

#### handleExistingTransaction
트랜잭션이 존재하는지 확인하고 존재한다면 \`handleExistingTransaction\`으로 보내버립니다.

\`\`\`java
private TransactionStatus handleExistingTransaction(
		TransactionDefinition definition, 
        Object transaction, 
        boolean debugEnabled)	
        	
        throws TransactionException {

    if (definition.getPropagationBehavior() == TransactionDefinition.PROPAGATION_NEVER) {
        throw new IllegalTransactionStateException(
                "Existing transaction found for transaction marked with propagation 'never'");
    }

    if (definition.getPropagationBehavior() == TransactionDefinition.PROPAGATION_NOT_SUPPORTED) {
        if (debugEnabled) {
            logger.debug("Suspending current transaction");
        }
        Object suspendedResources = suspend(transaction);
        boolean newSynchronization = (getTransactionSynchronization() == SYNCHRONIZATION_ALWAYS);
        return prepareTransactionStatus(
                definition, null, false, newSynchronization, debugEnabled, suspendedResources);
    }

    if (definition.getPropagationBehavior() == TransactionDefinition.PROPAGATION_REQUIRES_NEW) {
        if (debugEnabled) {
            logger.debug("Suspending current transaction, creating new transaction with name [" +
                    definition.getName() + "]");
        }
        SuspendedResourcesHolder suspendedResources = suspend(transaction);
        try {
            return startTransaction(definition, transaction, debugEnabled, suspendedResources);
        }
        catch (RuntimeException | Error beginEx) {
            resumeAfterBeginException(transaction, suspendedResources, beginEx);
            throw beginEx;
        }
    }

    if (definition.getPropagationBehavior() == TransactionDefinition.PROPAGATION_NESTED) {
        if (!isNestedTransactionAllowed()) {
            throw new NestedTransactionNotSupportedException(
                    "Transaction manager does not allow nested transactions by default - " +
                    "specify 'nestedTransactionAllowed' property with value 'true'");
        }
        if (debugEnabled) {
            logger.debug("Creating nested transaction with name [" + definition.getName() + "]");
        }
        if (useSavepointForNestedTransaction()) {
            // Create savepoint within existing Spring-managed transaction,
            // through the SavepointManager API implemented by TransactionStatus.
            // Usually uses JDBC 3.0 savepoints. Never activates Spring synchronization.
            DefaultTransactionStatus status =
                    prepareTransactionStatus(definition, transaction, false, false, debugEnabled, null);
            status.createAndHoldSavepoint();
            return status;
        }
        else {
            // Nested transaction through nested begin and commit/rollback calls.
            // Usually only for JTA: Spring synchronization might get activated here
            // in case of a pre-existing JTA transaction.
            return startTransaction(definition, transaction, debugEnabled, null);
        }
    }

    // Assumably PROPAGATION_SUPPORTS or PROPAGATION_REQUIRED.
    if (debugEnabled) {
        logger.debug("Participating in existing transaction");
    }
    if (isValidateExistingTransaction()) {
        if (definition.getIsolationLevel() != TransactionDefinition.ISOLATION_DEFAULT) {
            Integer currentIsolationLevel = TransactionSynchronizationManager.getCurrentTransactionIsolationLevel();
            if (currentIsolationLevel == null || currentIsolationLevel != definition.getIsolationLevel()) {
                Constants isoConstants = DefaultTransactionDefinition.constants;
                throw new IllegalTransactionStateException("Participating transaction with definition [" +
                        definition + "] specifies isolation level which is incompatible with existing transaction: " +
                        (currentIsolationLevel != null ?
                                isoConstants.toCode(currentIsolationLevel, DefaultTransactionDefinition.PREFIX_ISOLATION) :
                                "(unknown)"));
            }
        }
        if (!definition.isReadOnly()) {
            if (TransactionSynchronizationManager.isCurrentTransactionReadOnly()) {
                throw new IllegalTransactionStateException("Participating transaction with definition [" +
                        definition + "] is not marked as read-only but existing transaction is");
            }
        }
    }
    boolean newSynchronization = (getTransactionSynchronization() != SYNCHRONIZATION_NEVER);
    return prepareTransactionStatus(definition, transaction, false, newSynchronization, debugEnabled, null);
}
\`\`\`
\`PROPAGATION_NEVER\`은 현재 트랜잭션이 존재한다면 바로 예외를 throwing 하고,  \`PROPAGATION_NOT_SUPPORTED\`는 현재 트랜잭션을 중지합니다.
\`PROPAGATION_REQUIRES_NEW\`는 현재 진행중인 트랜잭션을 중단하고 새로운 커넥션으로 트랜잭션을 시작하기 때문에 \`startTransaction()\`로 보냅니다.
이처럼 다는 설명하지 못하지만 각 전파옵션과 현재 진행중인 트랜잭션의 유무를 판단하여 트랜잭션(상태)를 리턴합니다.

#### doBegin

\`\`\`java
@Override
protected void doBegin(Object transaction, TransactionDefinition definition) {
  DataSourceTransactionObject txObject = (DataSourceTransactionObject) transaction;
  Connection con = null;

  try {
    if (!txObject.hasConnectionHolder() ||
        txObject.getConnectionHolder().isSynchronizedWithTransaction()) {
      Connection newCon = obtainDataSource().getConnection();
      if (logger.isDebugEnabled()) {
        logger.debug("Acquired Connection [" + newCon + "] for JDBC transaction");
      }
      txObject.setConnectionHolder(new ConnectionHolder(newCon), true);
    }

    txObject.getConnectionHolder().setSynchronizedWithTransaction(true);
    con = txObject.getConnectionHolder().getConnection();

    Integer previousIsolationLevel = DataSourceUtils.prepareConnectionForTransaction(con, definition);
    txObject.setPreviousIsolationLevel(previousIsolationLevel);
    txObject.setReadOnly(definition.isReadOnly());

    // Switch to manual commit if necessary. This is very expensive in some JDBC drivers,
    // so we don't want to do it unnecessarily (for example if we've explicitly
    // configured the connection pool to set it already).
    if (con.getAutoCommit()) {
      txObject.setMustRestoreAutoCommit(true);
      if (logger.isDebugEnabled()) {
        logger.debug("Switching JDBC Connection [" + con + "] to manual commit");
      }
      con.setAutoCommit(false);
    }

    prepareTransactionalConnection(con, definition);
    txObject.getConnectionHolder().setTransactionActive(true);

    int timeout = determineTimeout(definition);
    if (timeout != TransactionDefinition.TIMEOUT_DEFAULT) {
      txObject.getConnectionHolder().setTimeoutInSeconds(timeout);
    }

    // Bind the connection holder to the thread.
    if (txObject.isNewConnectionHolder()) {
      TransactionSynchronizationManager.bindResource(obtainDataSource(), txObject.getConnectionHolder());
    }
  }

  catch (Throwable ex) {
    if (txObject.isNewConnectionHolder()) {
      DataSourceUtils.releaseConnection(con, obtainDataSource());
      txObject.setConnectionHolder(null, false);
    }
    throw new CannotCreateTransactionException("Could not open JDBC Connection for transaction", ex);
  }
}
\`\`\`

이 메서드는 주어진 트랜잭션 정의에따라 의미하  새로운 트랜잭션을 시작합니다. 이 추상 트랜잭션 매니저에의해 이미 처리된기 때문  전파동작을 적용하는것에 대해 걱정할 필요없습니다. 이 메소드는 트랜잭션 매니저가 실제로 새로운 트랜잭션을 시작하기로 결정할때 호출합니다. 이전 트랜잭션이 없거나, 이전트랜잭션이 중단됐거나 둘중 하나입니다.

특별한 경우는 세이브 포인트 없이 중첩된 트랜잭션 입니다. \`useSavepointForNestedTransaction()\`이 "false"를 리턴 한다면, 이 메소드는 필요할때 중첩된 트랜잭션을 시작을 호출합니다. 그런 흐름에, 활성트랜잭션이 있습니다. (이 메소드의 구현체는 이를 감지하고 적절한 중첩 트랜잭션을 시작해야합니다).

#### final commit(TransactionStatus status)
이 커밋 구현은 기존 트랜잭션 및 프로그래밍 방식 롤백 요청에 참여하는 것을 처리합니다. \`isRollbackOnly\`및 \`doCommit\`그리고 \`rollback\`에 위임합니다.

\`\`\`java
@Override
public final void commit(TransactionStatus status) throws TransactionException {
    if (status.isCompleted()) {
        throw new IllegalTransactionStateException(
                "Transaction is already completed - do not call commit or rollback more than once per transaction");
    }

    DefaultTransactionStatus defStatus = (DefaultTransactionStatus) status;
    if (defStatus.isLocalRollbackOnly()) {
        if (defStatus.isDebug()) {
            logger.debug("Transactional code has requested rollback");
        }
        processRollback(defStatus, false);
        return;
    }

    if (!shouldCommitOnGlobalRollbackOnly() && defStatus.isGlobalRollbackOnly()) {
        if (defStatus.isDebug()) {
            logger.debug("Global transaction is marked as rollback-only but transactional code requested commit");
        }
        processRollback(defStatus, true);
        return;
    }

    processCommit(defStatus);
}
\`\`\`
`},{_path:"/docs/java/initialization_order_in_java",_header:{layout:"post",title:"-Java- Initialization Order (자바의 초기화 블럭)",categories:["Development","Java"],tags:["Spring","Java","Block Order"],date:16352439e5,thumbnail:"/assets/blogging/java/java2.png",current_company:"Herit Corporation",current_position:"Backend Server Developer",excerpt_separator:"<!--more-->",summary:"블록의 실행 순서",hide:!1},_description:`프로그래밍을 하다보면 특정 객체의 라이프사이클을 이해하고 사용해야 할 때가 있지요.
block단위의 Java의 실행순서를 알아보도록 해볼게요.

잠깐의 스프링 내용도 나와요. ㅎㅎ
`,_content:`

## Initialization Order in Java



### The Reason for writen to this article

I wondered to Initialization order, when I had use a Spring's @ConfigurationProperties annotation. Using static block, instance block, constructor, setter (Injection field).

as consequence, I realized Which order, following definition below .

| order | applicable block | Initialization time                                   |
| :---: | :--------------: | :---------------------------------------------------- |
|   1   |   static block   | before instance creation                              |
|   2   |  instance block  | between allocate to memory and before create instance |
|   3   |   constructor    | allocate to memory on heap                            |
|   4   |  setter method   | inject for field after instance creation in Spring    |

### Static Block

\`static block\` perform applicable codes that, writen to block before Class be allocated to method area (JVM). which so that available initializing filed without set to value. therefore, static block is meaning that status for no memory address. because, static block is perfomed before instance creation. so that can print static variable like following example.



\`\`\`java
public class Kimchi {

    public static String name = "Korean Kimchi";

    static {
        System.out.println("Kimchi is traditional korean food. so always " + name);
        Systme.out.println("this : " + this) // compile error.
    }
}
\`\`\`



The statis block can't print "this" because, current statuses that, instance doesn't allocated in jvm memory. because  exactly, allocated only  "name" variable in Method Area (Class Area) and literal in Constant Pool. So you can understand to JVM flow as following list.

1. Compile (\`.java\` -> \`.class\`)
2. Class Load (Class Loader loades byte code to method area)
3. Excute byte code. (As Execution Engine)

A static block can only be executed once, only the first time before create instance (allocate in memory).



### Instance Block

\`instance block\` perform applicable codes that, between create instance and excute constructor. so you can print "this" (instance) like following example.



\`\`\`java
public class Main {
    public static void main(String [] args) throws Exception {
        Kimchi kimchi = new Kimchi();
    }
}

class Kimchi {

    public Kimchi(){
        System.out.println("I like traditional Korean's kimchi");
    }

    static {
        System.out.println("Kimchi is not chinese food.");
    }

    {
        System.out.println("I'm Kimchi Developer.");
    }

}
\`\`\`



#### Instance Block Result

\`\`\`
Kimchi is not chinese food.   
I'm Kimchi Developer.    
I like traditional Korean's kimchi
\`\`\`



### Constructor & setter method



\`constructor\` perform applicable codes that, allocated memory in \`HEAP\`. So you can initialize feild at constructor like following example.



\`\`\`java
public class Kimchi{

    private Source source;

    //must be
    public Kimchi(Source source){
        this.source = source;
    }

    //option
    public void setSource(Source source){
        this.source = source;
    }
}
\`\`\`

There is a simple example with \`constructor\` and \`setter\`. **actually**, this example may only possible  in Spring. Spring works that, which inject fields with proxy patterns. Spring's Beans are managed by \`IoC Container\`. So Spring creating proxy object and  injecting fileds after figure out methods that start with set and first UpperCase method like codes decribed earlier.



## What We learned by reading this article



1. Kimchi is traditional korean's food. (very important)
2. Java's Initialization Order.
`},{_path:"/docs/spring/spring_autowired",_header:{layout:"post",title:"Autowired Annotation을 통한 의존성 주입 (Javadoc)",categories:["Development","Spring"],tags:["Spring","Spring Boot","@Autowired","Dependency","Injection","의존성 주입","Annotation","DI","AOP"],date:162808824e4,profile_image:"/assets/blogging/profile/profile1.JPG",current_company:"Herit Corporation",current_position:"Backend Server Developer",thumbnail:"/assets/blogging/spring/spring_autowired.png",summary:"@Autowired",excerpt_separator:"<!--more-->",hide:!1},_description:`
Spring Framework 5.3.9 @Autowired

`,_content:`

# @Autowired
\`Spring framework\`을 사용하면, 당연스레 쓸수 밖에 없는게 \`@Autowired\` Annotation 이에요.  이번에는 \`docs.spring.io\`에 정의 되어있는 글을 번역하여, 어떠한 내용이 제공되는지 확인 해볼 예정이에요.

[원문 Spring Framework 5.3.9 @Autowired](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/annotation/Autowired.html)

\`\`\`java{2-3}
@Target(value = {CONSTRUCTOR,METHOD,PARAMETER,FIELD,ANNOTATION_TYPE})
@Retention(value = RUNTIME)
@Documented
public @interface Autowired {
\`\`\`

*Spring의 의존성 자동주입 기능에 의해  자동연결되도록 생성자, 필드, 세터 메소드 설정 메소드를 표시합니다. 이 Annotation은 JSR-330 [@Inject](https://docs.oracle.com/javaee/7/api/javax/inject/Inject.html?is-external=true) Annotation을 대안으로, 필요 대 선택의 의미를 더합니다.*


## 생성자 자동연결

주어진 bean class 중 단 한개의 생성자만이 required() true로 이 annotation을 선언할 수 있고, 이는 Spring bean으로 사용될때 자동연결할 생성자를 나타냅니다. 게다가, required 속성이 \`true(default)\`로 설정 된다면, 단일 생성자 만이 \`@Autowired\`로 Annotation을 달 수 있어요.

만약 필요하지 않은 여러 생성자가 Annotation을 선언한다면, 자동 연결할 후보로 간주됩니다. Spring Container 안에서 bean을 일치시켜  만족할 수 있는 의존성이 가장 많은 생성자가 선택 됩니다. 만약 후보중 어느것도 만족되는 생성자가 없다면, 주요 또는 기본 생성자가(있는 경우) 사용됩니다.
마찬가지로, 클래스가 여러 생성자를 선언 했지만, \`@Autowired\`가 달린 것이 어느것도 없다면, 주요 또는 기본 생성자가(있는 경우) 사용 됩니다. 클래스가 시작할 단일 생성자만 선언 한다면,  이는 Annotation이 없어도 항상 사용됩니다. Annotation이 선언된 생성자는 publc일 필요 없습니다.


## 필드 자동연결

필드는 bean이 생성된 직후 바로 주입되며, 모든 설정 메소드가 호출되기 전입니다. 설정 필드는 publc일 필요 없습니다.


## 메소드 자동연결
임의의 이름과 많은 매개변수를 가진 메소드를 설정합니다. 각 매개변수는 Spring Contgainer 안에서 빈을 일치시켜 자동연결 됩니다. 설정 메소드는 public일 필요 없습니다. Bean 구성의 Setter 메소드는 일반 설정 메소드 중애서 특별한 케이스일 뿐이에요.


## 매개변수 자동연결
Spring Framework 5.0 부터 @Autowired는 기술적으로, 별개의 메소드나 생성자의 파라미터에 선언될 수 있지만, framework의 대부분은 이런 선언들을 무시합니다. 사실상 매개변수 자동연결은 Spring Framework 코어중 하나만 지원하는데 spring-test안에 있는 JUnit Jupiter 입니다. [TestContext framework 참조 문서를 보세요.](https://docs.spring.io/spring-framework/docs/current/reference/html/testing.html#testcontext-junit-jupiter-di)


## 여러 인자와 ‘	required’ 의미
여러개의 인자를 가진 생성자의 경우. [required()](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/annotation/Autowired.html#required--) 속성이 모든 인자에 적용됩니다. 개별 파라미터는 Spring framework 5.0 부터 java-8 스타일 [Optional](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html?is-external=true)로나, 코틀린의 not-null 파라미터타입 또는 @Nullable로도 기본 'required’ 의미적으로 overriding하여 선언될 수 있어요.


## 배열, 컬렉션 및 맵 자동연결
배열,[컬렉션](https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html?is-external=true) 또는 [맵](https://docs.oracle.com/javase/8/docs/api/java/util/Map.html?is-external=true) 의존성 타입의 경우, 컨테이너는 선언된 값 타입을 일치시켜 모든 Bean을 자동연결 합니다. 이런 목적을 위해 맵 키는 해당 Bean의 이름으로 해석될 String 타입으로 선언되야합니다. 이런 컨테이너 제공 Callection은 대상 구성요소 중에서 [Ordered](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/Ordered.html)와 [@Order](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/annotation/Order.html) 값을 고려하여 정렬하고, 아니면 컨테이너안에서 등록된 순서에 따라 정렬됩니다. 그렇지않으면, 일치하는 단일대상 Bean은 이러한 것으로 주입되어, 일반적으로 지정된 타입 Collection이나 Map 자체가 되기도 합니다.


## BeanPostProcessor 또는 BeanFactoryPostProcessor 내 미지원

실제 주입은 [BeanPostProcessor](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/config/BeanPostProcessor.html) 를 통해 수행되므로 이는 결국 @Autowired를 사용하여 [BeanPostProcessor](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/config/BeanPostProcessor.html) 또는 [BeanFactoryPostProcessor](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/config/BeanFactoryPostProcessor.html) 타입에 참조를 주입할 수 없음을 의미합니다. [AutowiredAnnotationBeanPostProcessor](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/annotation/AutowiredAnnotationBeanPostProcessor.html) 클래스에 대한 자바독스를 참조하세요. (기본적으로 이 어노테이션이 있는지 확인 합니다.)


## 요약
filed에서 @Autowired를 사용하지 않는다면, Bean은 주입되지 않는다. 위의 내용을 따르면 \`@AutowiredAnnotationBeanPostProcessor\`가 @Autowired 어노테이션이 있는지 확인을 하고 \`BeanPostProcessor\`가 주입을 한다는 이야기이다.
`},{_path:"/docs/spring/spring_run",_header:{layout:"post",title:"-Spring- run (Execute Spring Boot App Method)",categories:["Development","Spring"],tags:["Spring","Spring Boot","Run","Application Context"],date:162610122e4,profile_image:"/assets/blogging/profile/profile1.JPG",current_company:"Herit Corporation",current_position:"Backend Server Developer",thumbnail:"/assets/blogging/spring/spring_run.png",summary:"Application.run()",excerpt_separator:"<!--more-->",hide:!0},_description:`Spring Boot run method

`,_content:`

# SpringApplication.run()
#SpringBoot/run

스프링부트는 스프링개발자가 빠르고 쉽게 어플리케이션을 확장할 수 있도록 도와주는 프레임워크 입니다.. 스프링부트는 \`run\`으로 부터 시작하여  다음과 같이 구성되는데 \`run\`부터 스프링부트가 어떻게 실행되는지 알아볼 것이에요. (제일궁금한 Bean을 추가 하는 과정)


스프링부트앱을 생성한다면 항상 앱 실행 파일이 존재해요.

### Application.java

\`\`\`java
public class KimnchiApplication {
		public static void main(Sgtring[] args) {
			SpringApplication.run(TestApplication.class, args);
		}
}
\`\`\`

일반 \`Java Application\`처럼 \`main\`메소드로 실행하며 매개변수를 받아요.
쭉 들어가다보면 \`return new SpringApplication(prinmarySources).run(args));\`
1. 생성자를 통한 초기화를 진행합니다.
2. 초기화 된 객체의 \`.run()\` 을 실행합니다.


\`run()\` 메소드는 한가지가 아닙니다. \`SpringBootApplication\`을 실행할 수 있는 메소드가 여러 개 \`overloading\`되어 있어요.

공통점은  스프링 부트에서는 기본설정을 사용하는 지정된소스로부터 \`SpringBootApplication\` 을 실행 한다는거죠 쉽게말해서 이미 만들어진걸로 돌린다는 의미입니다.

### .run() Method

| 순서  | 메소드명 | static ? | 리턴타입                           | 매개변수                                     |
|-----|------|----------|--------------------------------|------------------------------------------|
| 1   | run  | none     | ConfigurableApplicationContext | String… args                             |
| 2   | ^    | static   | ConfigurableApplicationContext | Class<?> primarySource, String… args     |
| 3   | ^    | static   | ConfigurableApplicationContext | Class<?>[] primarySources, String[] args |


**2**,**3** 의 경우 static이기 때문에 외부에서 기본설정으로 실행하는 방법으로 쓰일수도 있습니다. 하지만 내부적으로 보면, 순서가 **2** -> **3** -> **1** 의 순서를 가지고 있기때문에 **2** 에서 시작하든 **3** 에서 시작하던 넘겨주는 시점에 \`Parameter\`만 다른것이지 결국 **1** 로 이어 집니다.

위에서 언급했지만 결국 세가지 의 공통점은 실행중인\`ApplicationContext\`를 리턴 한다는 점입니다. 파라미터의 primarySource 는 어플리케이션을 실행할때 기본적으로 사용할 소스입니다. 이 포스트 기준으로는 \`KimnchiApplication.class\` 즉 클래스 정보예요.


\`run()\`메소드의 테이블 **3** 은 다음의 구성으로 작성되어있습니다.

\`\`\`java

public static ConfigurableApplicationContext run(Class<?>[] primarySources, String[] args) {
	return new SpringApplication(primarySources).run(args);
}

\`\`\`

여기에 선언된 \`.run()\` 메소드가 마지막 순서 **1** 입니다. 이걸보기전에 생성자로 무엇을 초기화 시켜주는지 볼까요? 아래에 다음의 코드가 나옵니다.

\`\`\`java
public SpringApplication(Class<?>... primarySources) {
	this(null, primarySources);
}
\`\`\`

\`overloading\` 된 생성자의 첫번째 인자로 null을 보내내요. 들어온 가변인자는 그대로 보내주고요.

\`\`\`java
@SuppressWarnings({ "unchecked", "rawtypes" })
public SpringApplication(ResourceLoader resourceLoader, Class<?>... primarySources) {
		this.resourceLoader = resourceLoader;
		Assert.notNull(primarySources, "PrimarySources must not be null");
		this.primarySources = new LinkedHashSet<>(Arrays.asList(primarySources));
		this.webApplicationType = WebApplicationType.deduceFromClasspath();
		thi	s.bootstrappers = new ArrayList<>(getSpringFactoriesInstances(Bootstrapper.class));
		setInitializers((Collection) getSpringFactoriesInstances(ApplicationContextInitializer.class));
		setListeners((Collection) getSpringFactoriesInstances(ApplicationListener.class));
		this.mainApplicationClass = deduceMainApplicationClass();
}
\`\`\`


\`resourceLoader\`는 사용할 리소스 로더입니다. \`primaraySource\`는 주요\`Bean\` 소스들 입니다.
새로운\`SpringApplication\` 인스턴스를 생성 합니다. \`ApplicationContext\`는 지정된 주요소스로 부터 \`Bean\`들을 로드 합니다. 인스턴스는 **1** 이 호출되기 전에 변경될 수 있습니다. 들어온 \`primarySource\`를 \`LinkedHashSet\`로 생성합니다.
순서는있지만 중복되지않도록 생성한다.. 뭔가 상상은 가지만 아직은 모르기때문에 넘어갑니다. \`webApplicationType\`은 \`REACTIVE\`인지 \`NONE\`인지 \`SERVLET\`인지를 정합니다.

\`\`\`java
/* SpringApplicagtion.java */
private <T> Collection<T> getSpringFactoriesInstances(Class<T> type, Class<?>[] parameterTypes, Object... args) {
	ClassLoader classLoader = getClassLoader();
	// Use names and ensure unique to protect against duplicates
	Set<String> names = new LinkedHashSet<>(SpringFactoriesLoader.loadFactoryNames(type, classLoader));
	List<T> instances = createSpringFactoriesInstances(type, parameterTypes, classLoader, args, names);
	AnnotationAwareOrderComparator.sort(instances);
	return instances;
}



/* SpringFactoriesLoader.java */
public static List<String> loadFactoryNames(Class<?> factoryType, @Nullable ClassLoader classLoader) {
	ClassLoader classLoaderToUse = classLoader;
	if (classLoaderToUse == null) {
		classLoaderToUse = SpringFactoriesLoader.class.getClassLoader();
	}
	String factoryTypeName = factoryType.getName();
	return loadSpringFactories(classLoaderToUse).getOrDefault(factoryTypeName, Collections.emptyList());
}

private static Map<String, List<String>> loadSpringFactories(ClassLoader classLoader) {
	Map<String, List<String>> result = cache.get(classLoader);
	if (result != null) {
		return result;
	}

	result = new HashMap<>();
	try {
		Enumeration<URL> urls = classLoader.getResources(FACTORIES_RESOURCE_LOCATION);
		while (urls.hasMoreElements()) {
			URL url = urls.nextElement();
			UrlResource resource = new UrlResource(url);
			Properties properties = PropertiesLoaderUtils.loadProperties(resource);
			for (Map.Entry<?, ?> entry : properties.entrySet()) {
				String factoryTypeName = ((String) entry.getKey()).trim();
				String[] factoryImplementationNames =
						StringUtils.commaDelimitedListToStringArray((String) entry.getValue());
				for (String factoryImplementationName : factoryImplementationNames) {
					result.computeIfAbsent(factoryTypeName, key -> new ArrayList<>())
							.add(factoryImplementationName.trim());
				}
			}
		}

		// Replace all lists with unmodifiable lists containing unique elements
		result.replaceAll((factoryType, implementations) -> implementations.stream().distinct()
				.collect(Collectors.collectingAndThen(Collectors.toList(), Collections::unmodifiableList)));
		cache.put(classLoader, result);
	}
	catch (IOException ex) {
		throw new IllegalArgumentException("Unable to load factories from location [" +
				FACTORIES_RESOURCE_LOCATION + "]", ex);
	}
	return result;
}
\`\`\`

이름에서부터 알수 있겠지만 SpringFactory 생성하는 메소드 입니다. 첫번째 메소드에서 names라는 \`Set\`객체에 담아주는 이유는 중복을 방지하고 고유한 이름이 보장되게 사용하기 위함입니다. \`loadFactoryNames\` 메소드는 주어진 클래스로더를 사용하여 \`META-INF/spring.factories\` 로부터 주어진 유형의 팩토리 구현체의 모든 조건에 부합되는 클래스명을 로드합니다. \`Spring framework 5.3\`부터 특정구현체 이름이 주어진 팩토리 타입에대해 두번이상 발견된다면 중복은 무시됩니다. 클래스로더로부터 로드하여 캐싱된 \`Bean\`들이 존재하지 않는다면 새로 생성합니다.

아래 이미지를 보면 알겠지만 각 \`spring.factories\`라는 파일에서 Bean 으로 띄울 구현체들이 작성되어있습니다. \`getSpringFactoriesInstances\` 메소드를 안을 보시면 \`SpringFactoryLoader.loadSpringFactories\` 가 작성 되어있습니다. classLoader 는 \`spring.factories\` 파일에서 리소스 정보를 읽어들여 순서대로 factory 이름에 있는 Bean들을 인스턴스화하여 Application Context에 추가합니다.

\`\`\`java
@SuppressWarnings({ "unchecked", "rawtypes" })
public SpringApplication(ResourceLoader resourceLoader, Class<?>... primarySources) {
	this.resourceLoader = resourceLoader;
	Assert.notNull(primarySources, "PrimarySources must not be null");
	this.primarySources = new LinkedHashSet<>(Arrays.asList(primarySources));
	this.webApplicationType = WebApplicationType.deduceFromClasspath();
	this.bootstrappers = new ArrayList<>(getSpringFactoriesInstances(Bootstrapper.class));
	setInitializers((Collection) getSpringFactoriesInstances(ApplicationContextInitializer.class));
	setListeners((Collection) getSpringFactoriesInstances(ApplicationListener.class));
	this.mainApplicationClass = deduceMainApplicationClass();
}
\`\`\`

\`getSpringFactoriesInstance(Class<T> type)\` 메소드 안을 보시면 \`createSpringFactoriesInstances()\` 메소드를 볼수있습니다. 여기서 각 \`BootStrapper\`, \`ApplicationContextInitailizer\`, \`ApplicationListener\` 클래스 들의 FactoryName 들을가지고 인스턴스를 생성하여 할당합니다. ClassLoader는 \`resourceLoader\` 가 Null 이 아니라면, 설정된 클래스로더를 사용하고 만약 없다면 Spring ClassUtils class의 기본 classLoader를 사용하게 됩니다.

정리하자면, Spring이 Bean을 추가하는과정은 META-INF/spring.factories의 파일들을 읽어 Bean들의 이름을 가진 LinkedHashSet을 가지고, classLoader를 이용해 instanceClass를 생성한 뒤 BeanUtils 의 instantiateClass 메소드를 이용하여 각 Bean을 추가해요.

그렇다면 \`BootStrapper\`, \`ApplicationContextInitailizer\`, \`ApplicationListener\` 는 각각 무슨역할을 하는 걸까요?

### Bootstrapper.class
Spring Boot 2.4.0 부터 생겨났으며 \`BootstrapRegistry\` 가 사용되기 전에 초기화 될 수 있는 \`Callback Interface\`이에요.
그렇다면 \`BootstrapRegistry\` 는 뭘까요. 공식 문서에보면 다음과 같이 나와 있어요. \`ApplicationContext\` 가 준비된 시점까지 시작 이후 그리고, 일련의 처리과정을 거친 후에 사용가능한 간단한 객체 레지스트리 입니다.
생성하는데 많은 비용이 들어 갈 수 있거나, \`ApplicationContext\` 가 이용가능한 상태가 되기전에 공유될 필요로 레지스트리 인스턴스 등록에 사용될 수있습니다. **(ApplicationContext 준비되기 전 \`Bean\`을 사용할 수 없을때 \`BootsrapRegistry\`로 Bean 을 등록하는데 사용할 수있다는 얘기입니다.)**
레지스트리는 클래스를 key로 사용합니다. 즉, 주어진 유형의 단일 인스턴스만 저장될 수 있습니다. \`addCloseListener(ApplicationListener)\` 메소드는 \`ApplicationContext\`가 완전히 준비되고 \`BootstrapContext\`닫혔을때 액션을 수행할 수 있는 리스너 추가에 사용될 수 있습니다. 한 가지 예로, 인스턴스는 어플리케이션이 사용할 수 있도록 \`Spring Bean\` 그 자체로 등록하도록 선택 할 수도 있습니다.

### ApplicationContextInitailizer.class

스프링 \`ConfigurableApplicationContext\` 가 리프레쉬 되기 전에 초기화하는 Callback 인터 페이스 입니다.
일반적으로 프로그래밍적인 \`Application Context\`의 초기화를 필요로하는 웹 어플리케이션 안에서 사용됩니다. 예를 들어, 속성 소스를 등록하거나 context 의 환경에 반대되는 profiles 를 활성화 합니다. contextInitializerClasses 의 context-param 과 init-param선언에 대한 \`ContextLoader\` 와 \`FrameworkServlet\`의 지원을 각각 참조하세요. \`ApplicationContextInitializer\` 의 프로세서들은  Spring의 Ordered 인터페이스가 구현되었는지 또는 @Order 어노테이션이 있는지 감지하고 호출전에 인스턴스를 적절하게 정렬하도록  권장합니다.

### ApplicationListener.class

어플리케이션 이벤트 리스너로부터 구현된 인터페이스 입니다.
표준 \`java.util.EnventListener\` 로 기반된 옵저버 디자인패턴을 위한 인터페이스 입니다. 스프링 3.0 부터 ApplicationListener는 일반적으로 관심있는 이벤트 타입을 선언할 수 있습니다. Spring ApplicationContext에 등록될때 이벤트가 그에따라 필터링 되고 리스너는 일치하는 객체만 호출 합니다.

이제 SpringApplication 객체를 초기화했으니 run 메서드입니다. 위의 표에서는 1. 의 run(..) 입니다.

\`\`\`java
public ConfigurableApplicationContext run(String... args) {
	StopWatch stopWatch = new StopWatch();
	stopWatch.start();
	DefaultBootstrapContext bootstrapContext = createBootstrapContext();
	ConfigurableApplicationContext context = null;
	configureHeadlessProperty();
	SpringApplicationRunListeners listeners = getRunListeners(args);
	listeners.starting(bootstrapContext, this.mainApplicationClass);
	try {
		ApplicationArguments applicationArguments = new DefaultApplicationArguments(args);
		ConfigurableEnvironment environment = prepareEnvironment(listeners, bootstrapContext, applicationArguments);
		configureIgnoreBeanInfo(environment);
		Banner printedBanner = printBanner(environment);
		context = createApplicationContext();
		context.setApplicationStartup(this.applicationStartup);
		prepareContext(bootstrapContext, context, environment, listeners, applicationArguments, printedBanner);
		refreshContext(context);
		afterRefresh(context, applicationArguments);
		stopWatch.stop();
		if (this.logStartupInfo) {
			new StartupInfoLogger(this.mainApplicationClass).logStarted(getApplicationLog(), stopWatch);
		}
		listeners.started(context);
		callRunners(context, applicationArguments);
	}
	catch (Throwable ex) {
		handleRunFailure(context, ex, listeners);
		throw new IllegalStateException(ex);
	}

	try {
		listeners.running(context);
	}
	catch (Throwable ex) {
		handleRunFailure(context, ex, null);
		throw new IllegalStateException(ex);
	}
	return context;
}
\`\`\`

## 참고 하세요

스프링 어플리케이션을 실행하고 새로운 ApplicaitonContext를 생성하고, 리프레슁 합니다. 파라미터는 어플리케이션 파라미터(보통 자바 메인 메서드 에서 받음) 이며 리턴되는 ConfigurableApplicationContgext는 실행중인 ApplicationContext를 리턴합니다.

## 기능
순서대로 보면 createBootStrapContext()로 위에서 띄워준 위에서 추가한 BootStrapper들을 BootStrapContext로 초기화합니다. \`configureHeadlessProperty()\`는 \`java.awt.headless\`를 설정합니다. 기본값은 true이고, headless는 인터페이스 없이 Spring을 실행하는 옵션입니다. 여기서 설정되는 headless값은 System 프로퍼티애 추가합니다. System는 HashTable로 구현된 Proterties 클래스를 사용합니다.

getRunListeners()는 SpringApplicationRunListener 타입의 이름을가진 빈들을 인스턴스화하고, 그 인스턴스들은 SpringApplicationRunListeners 의 리스너들로 등록하여 초기화된 객체를 리턴합니다.
\`listeners.stating(bootstrapContext, this.mainApplcationClass);\` : 리스너를 시작합니다. 이부분은 좀 중요한데 starting()메서드와 그안에서 시작해주는 doWithListners()메서드를 볼 수 있습니다.

\`\`\`java
void starting(ConfigurableBootstrapContext bootstrapContext, Class<?> mainApplicationClass) {
	doWithListeners("spring.boot.application.starting", (listener) -> listener.starting(bootstrapContext),
			(step) -> {
				if (mainApplicationClass != null) {
					step.tag("mainApplicationClass", mainApplicationClass.getName());
				}
			});
}
\`\`\`


\`\`\`java
private void doWithListeners(String stepName, Consumer<SpringApplicationRunListener> listenerAction,
		Consumer<StartupStep> stepAction) {
	StartupStep step = this.applicationStartup.start(stepName);
	this.listeners.forEach(listenerAction);
	if (stepAction != null) {
		stepAction.accept(step);
	}
	step.end();
}
\`\`\`

doWithListener 메서드는 파라미터를 세 개를 받습니다. 첫번째는 \`spring.boot.application.starting\`이라는 String을 받아 ApplicationStartup의 start메소드로 보내집니다. **ApplicationStartup** 은 StartupStep을 사용하여 어플리케이션 시작 단계를 쌓습니다. 코어 컨테이너와 해당 인프라 구성요소는 **ApplicationStartup을 사용하여 어플리케이션이 시작하는동안에 단계를 표시하고 처리 시간이나 실행 컨텍스트에대한 데이터를 수집할 수 있습니다.

start 메서드는 새로운 단계를 생성하고 시작을 표시합니다. 단계의 이름은 현재의 액션이나 단계를 표현합니다. 이 기술적인 이름은 어플리케이션이 시작하는 동안에 동일한 단게의 다른 인스턴스를 표현하여 재사용 될 수 있고 “.”로 네임스페이스 되어야 합니다. 파라미터는 단계이름입니다.
`},{_path:"/docs/java/java_jvm02",_header:{layout:"post",title:"-Java- JVM 02 (Heap area)",categories:["Development","Java"],tags:["Java","JVM","Runtime Data Area","Heap"],date:161483748e4,profile_image:"/assets/blogging/profile/profile2.JPG",current_company:"Cubic Inc",current_position:"Web Backend Developer",excerpt_separator:"<!--more-->",summary:"자바 가상머신 2",hide:!1,thumbnail:"/assets/blogging/java/jvm_heap.png"},_description:`Runtime Data Area의 Heap area(힙 영역) 에대해 알아보자.
`,_content:'\n## Heap area\n\n힙영역은 동적으로 생성된 객체들이 적재되는 영역이며, Garbage Collector의 메모리 해제 대상이되는 영역입니다. [`Method area`](https://kimchi-dev.github.io/posts/Java_JVM01/#1-method-area)로 이동된 바이트코드들은 `Execution Engine`에 의해 각명령 단위로 실행되는데, 이때 생성된 인스턴스들은 `Heap`영역으로 메모리를 할당받게 됩니다.\n\n\n![JVM Heap]({{ "/assets/img/bloging/java/jvm_heap.png" | relative_url }})\n\n## Heap Area Structure\n\n힙 영역은 다음의 영역들로 구성됩니다.\n1. Young Generation\n- Eden,Suvivor(0,1)\n    - 최초의 객체는  `Eden`영역에 생성된다. `Eden`영역에 객체가 가득차게되면 첫번째 GC가 일어난다. 가득찬 `Eden`에 있는 Object의 *참조여부를 확인하여 `survivor 0`영역으로 복제시킨다.\n    - `survior 0`영역이 가득찬다면 참조여부를 한번 더 확인하여 참조를 받고있는 Object 에한하여 `survivor 1`영역으로 복제한다.이때 `survior 0`영역은 비워지게된다. `survivor`영역은 `Eden`에서 온 Object와 각 `suvivor`에서 온 참조Object 들이 복제되고 `Minor GC`에 의해 해제된다.참고해야할 점은 suvivor 영역은 각 값을 복제하면서 한개의 survivor영역은 항상 비워져있다.  여기서 일정 참조횟수(Ages)에 도달한 Object들은 Old Generation으로 복제된다.\n\n2. Old Generation\n- Tenured\n    - Young Generation에서 일정 참조횟수(Ages)에 도달했으며, 앞으로 사용될 여지가 있는 Object는 `Tenured`로 메모리할당 된다. Old Generation의 메모리가 충분하지 않으면 Major GC에의해 해제된다.\n\n5. Permanent (JDK1.7 까지 적용)\n   이영역은 1.8부터 사라졌으며 이 영역에서 일어나던 행위들은 **`mata space`** 로변경 되었으며,\n   `Runtiem Data Area`의 `Native Stack`영역으로 포함되었습니다.\n\n5. *Metaspace\n\n`Metaspace`영역은 Class,Method 등등의 metadata 정보를 저장하는 영역입니다.\n'},{_path:"/docs/java/java_jvm01",_header:{layout:"post",title:"-Java- JVM 01 (Runtime Data Area)",categories:["Development","Java"],tags:["Java","JVM","Runtime Data Area","Method Area"],date:161466468e4,profile_image:"/assets/blogging/profile/profile2.JPG",current_company:"Cubic Inc",current_position:"Web Backend Developer",excerpt_separator:"<!--more-->",summary:"자바 가상머신 1",hide:!1,thumbnail:"/assets/blogging/java/jvm01.png"},_description:`Java JVM내에 Runtime Data Area에 대해 알아보자.
`,_content:`

## Runtime Data Area

자바의 런타임 메모리 구조는 크게 5가지 요소로 구성 되어있다.

![JVM]({{ "/assets/img/bloging/java/jvm01.png" | relative_url }})

### 1. Method area
[**이전 화면**](javascript:history.back())
- \`클래스 객체 변수명,자료형,접근제어자 ...\`

  \`\`\`java
  Kimchi kimchi = new Kimchi();

  public class Kimchi{
    String name = "Kimchi-dev";
  }
  \`\`\`  

- \`메소드명, 리턴타입, 파라미터, 접근제어자 ...\`

  \`\`\`java

  private Kimchi getKimchi(Source gochugaru,Baechu baechu){
    return new Kimchi(gochugaru,baechu);
  }

  \`\`\`  

- \`Type Information(Interface And Class)\`
    - package + Class 이름
    - 직계 하위 클레스 전체 이름
    - Class / Interface 여부
    - Modifier (\`public\`,\`abstract\`,\`final\`)
    - 연관된 Interface 이름

- \`Constant Pool\`
    - Type, Field,Method의 모든 Symbolic Reference 정보를 포함
    - Constant Pool의 Entries는 인덱스를 통해 접근
    - Object 접근 및 모든 참조를 위한 핵심 요소

- \`Field Information\`
    - Field type
    - Field Access modifier (public, private, protected, static, final, **volatile**,**transient**)

- \`Method Information\`
    - Method name
    - Method Return Type
    - Method Parameters's Type And Size
    - Method Access Modifier
    - Method Byte Code
    - Method StackFrame's Operand Stack And Local Variable Section Size
    - Exception Table

- \`Class Variable\`
    - static ketword가 붙은 접근지정자 범위내의 변수
    - 이 변수는 객체소유가 아닌 Class 소유
    - Class 사용하기 이전에 이미 메모리 할당
    - final 변수 의 값을 상수로 치환되어 Constant Pool에 값을 복사한다.

> static 변수는 Methtod Area의 Class Variable에 저장되며, 기본형이 아닌 static 클래스형 변수는 레퍼런스 변수만 저장되고 실제 인스턴스는 Heap에 저장된다. 그 후 인스턴스의 변수를 저장하기 위해 Heap에 메모리 확보가 되고 Heap의 인스턴스가 Method Area의 어느 클래스와 연결되는지 설정한다.

### [Heap area](https://kimchi-dev.github.io/posts/Java_JVM02/#heap-area)
[**이전 화면**](javascript:history.back())
객체가 동적으로 생성될 때 Heap영역으로 메모리를 할당 받는다. new 키워드로 생성된 객체 또는 배열이 할당된다. Method 영역에 로드된 클래스만 생성이 가능하고 Garbage Collector가 unreachable 객체를 제거하여 메모리를 관리하는 영역이다.

### Stack
[**이전 화면**](javascript:history.back())
명령을 수행할 Thread 제어를 위해 사용되는 메모리 영역이다. Thread가 생성될 때 마다 하나씩 생성되며 단일 Thread 당 Method가 호출될 때 메모리를 차지하게 된다. Method가 호출되면 Mehtod정보는 Stack에 쌓이며 호출이 종료되면 Stack에서 제거된다. 저장되는 정보는 매개변수,지역변수,임시변수 Method를 호출한 주소 등을 저장 한다.
- Multi Thread 프로그램의 경우 각 Thread가 자신의 Stack을 가지지만 Heap 영역은 공유하기 때문에, 프로그래밍시에 Thread-safe 하지 않는 이슈에 주의하며 프로그래밍을 해야 한다. 결론적으로 Heap 영역 자체가 Thread-safe 하지 않는 상태이다. Thread-safe 하게 객체를 생성하기 위해서는 Immutable한 객체를 설계하는 것이 좋다.

### PC Register
Thread(쓰레드)가 생성될 때마다 생성되는 영역으로 Program Counter 즉, 현재 쓰레드가 실행되는 부분의 주소와 명령을 저장하고 있는 영역이다. (*CPU의 레지스터와 다름)
이것을 이용해서 쓰레드를 돌아가면서 수행할 수 있게 한다

### Native Method Stacks
[**이전 화면**](javascript:history.back())   
C 또는 C++로 작성된 native 코드를 JNI를 통해 만들어진 Method를 저장하는 영역이다.  
`},{_path:"/docs/tools/intellij_config",_header:{layout:"post",title:"-Intellij- General Configuration (인텔리제이 설정)",categories:["Development","Tools"],tags:["Intellij","Shortcut","인텔리제이","단축키","기본설정"],date:161408508e4,profile_image:"/assets/blogging/profile/profile3.jpeg",current_company:"Cubic Inc",current_position:"Web Backend Developer",summary:"단축키와 기본설정",excerpt_separator:"<!--more-->",hide:!1},_description:`Intellij 단축키 및 설정 사용법 for Mac
`,_content:`

##  Live Template
Setting > Live Template 검색  
custom 으로 등록  
![Live Template 설정](/assets/blogging/intellij/intellij1.png)

## Build 환경 설정
Setting > Gradle 검색  
![Gradle 빌드 설정](/assets/blogging/intellij/intellij2.png)

위 \`build\` 설정은 testCase를 만들시 gradle에서 빌드하던것을 intellij 로 빌드 하도록 바꿔준 것이다.

testCase 빌드 안될시 체크.

## Annotation Error
![AnnotationError](/assets/blogging/intellij/tableAnnotationError.png)

## Intellij ShortCuts

- ⌘ : command
- ⇧ : Shift
- ⌃ : control
- ↩ : return
- ⌥ : option

### 테스트 인스턴스를 Method로 생성(Extract Method)

\`\`\`java

//Before

Member member =  new Member();
member.setName("회원1");
member.setAddress(new Address("서울","강가","123-123"));
em.persist(member);

//After as Drag and ShortCuts
⌥ + ⌘ + M

private Member createMember() {
        Member member = new Member();
        member.setName("회원1");
        member.setAddress(new Address("서울", "강가", "123-123"));
        em.persist(member);
        return member;
    }
\`\`\`  

### 메소드내 파라미터 생성 (Extract Parmeter)

\`\`\`java

private Member createMember() {
        Member member = new Member();
        member.setName(Here);
        member.setAddress(new Address("서울", "강가", "123-123"));
        em.persist(member);
        return member;
    }
// Here의 위치에 변수명을 입력하고 아래 단축키입력시 자동 파라미터 등록
⌥ + ⌘ + P

\`\`\`
### 이전 또는 이후 커서의 위치로 이동

\`⌥\` + \`⌘\` + ( \`Left\` or \`Right\` )

### 라인 북마크 등록 및 이동

- 등록  : \`⌃\` + \`⇧\` + \`원하는 번호\`
- 이동  : \`⇧\` + \`등록한 번호\`

### 자료형 및 변수명 자동생성

\`\`\`java
public class Kimchi{

  ...

  public void kimchi(Source source){
    kimchiService.make(source);                 // 커서를 왼쪽끝에두고
    Kimchi kimchi = kimchiService.make(source); //사용후
  }

}
\`\`\`  
\`⌥\` + \`⌘\` + 'V'

### 프로젝트 익스플로러로 이동

\`⌘\` + '1'
### 멀티라인 셀렉트

\`⌥\` + \`⌥\` 누른상태에서 \`Down\`
`}],Y1=V1,q1=J1,wn=class{static getInstance(){return wn.instance||(wn.instance=new wn),wn.instance}settingFileNodes(){const t=ya.toFileTrees(Y1);$e.push(new Qs("탐색",t))}settingPostMap(){ba.toPosts(q1).sort((t,n)=>n.header.date.getTime()-t.header.date.getTime()).forEach(t=>{mb.map.set(t._path,t),Tb.push(t),t.header&&this.setTags(t.header,t._path)})}init(){this.settingFileNodes(),this.settingPostMap()}setTags(t,n){t.tags.forEach(r=>{const a=ls.store.get(r);a?a.includes(n)||(a.push(n),ls.store.set(r,a)):ls.store.set(r,[n])})}};let ea=wn;de(ea,"instance");const G1=ea.getInstance(),X1=Pe({__name:"app",setup(e){G1.init();const t=Qu();return iu({meta:[{name:"theme-color",content:t.isDarkMode?"#010409":"#fcfcfc"},{property:"og:type",content:"website"},{property:"og:url",content:"https://taech.io"},{property:"og:title",content:"taechnique의 기술 블로그"},{property:"og:description",content:"별내용은 없어요 ~"},{property:"og:image",content:"https://avatars.githubusercontent.com/u/65699391?v=4"}]}),(n,r)=>(Ee(),Ne("div",{class:Be(["app-container",{dark:le(t).isDarkMode}])},[ne(wb),ne(U1),ne(Ab)],2))}});const Ac={__name:"nuxt-root",setup(e){const t=vd(()=>jt(()=>import("./error-component.4fd92005.js"),[],import.meta.url).then(o=>o.default||o)),n=()=>null,r=Te(),a=r.deferHydration();Cn("_route",cu()),r.hooks.callHookWith(o=>o.map(c=>c()),"vue:setup");const s=Ma();yl((o,c,l)=>{if(r.hooks.callHook("vue:error",o,c,l).catch(u=>console.error("[nuxt] Error in `vue:error` hook",u)),Nm(o)&&(o.fatal||o.unhandled))return yt(r,yn,[o]),!1});const{islandContext:i}=!1;return(o,c)=>(Ee(),qn(il,{onResolve:le(a)},{default:pi(()=>[le(s)?(Ee(),qn(le(t),{key:0,error:le(s)},null,8,["error"])):le(i)?(Ee(),qn(le(n),{key:1,context:le(i)},null,8,["context"])):(Ee(),qn(le(X1),{key:2}))]),_:1},8,["onResolve"]))}};globalThis.$fetch||(globalThis.$fetch=gh.create({baseURL:yh()}));let Cc;const Q1=Lh(db);Cc=async function(){var a;const n=!!((a=window.__NUXT__)!=null&&a.serverRendered)?Pp(Ac):Op(Ac),r=Ih({vueApp:n});try{await Mh(r,Q1)}catch(s){await r.callHook("app:error",s),r.payload.error=r.payload.error||s}try{await r.hooks.callHook("app:created",n),await r.hooks.callHook("app:beforeMount",n),n.mount("#"+Wm),await r.hooks.callHook("app:mounted",n),await ln()}catch(s){await r.callHook("app:error",s),r.payload.error=r.payload.error||s}},Cc().catch(e=>{console.error("Error while mounting app:",e)});export{la as A,pi as B,nt as C,c_ as D,un as E,Fe as F,_l as G,K1 as H,Cb as I,cu as J,ls as K,iu as L,t_ as M,n_ as N,Te as O,ba as P,dn as Q,Ae as R,Ia as S,Ta as T,ct as U,xi as V,Kp as W,Qp as X,Bl as Y,s_ as Z,jt as _,M1 as a,Ne as b,qn as c,vd as d,F as e,gb as f,Vd as g,Pe as h,ne as i,Be as j,i_ as k,o_ as l,vi as m,e_ as n,Ee as o,mb as p,Tb as q,ot as r,u_ as s,us as t,le as u,a_ as v,r_ as w,f_ as x,l_ as y,pb as z};
