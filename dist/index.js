(()=>{var e={307:(e,t,r)=>{e=r.nmd(e);var n="__lodash_hash_undefined__",o=9007199254740991,i="[object Arguments]",u="[object Array]",a="[object Boolean]",c="[object Date]",s="[object Error]",f="[object Function]",l="[object Map]",d="[object Number]",v="[object Object]",_="[object Promise]",p="[object RegExp]",h="[object Set]",b="[object String]",y="[object WeakMap]",j="[object ArrayBuffer]",g="[object DataView]",O=/^\[object .+?Constructor\]$/,m=/^(?:0|[1-9]\d*)$/,P={};P["[object Float32Array]"]=P["[object Float64Array]"]=P["[object Int8Array]"]=P["[object Int16Array]"]=P["[object Int32Array]"]=P["[object Uint8Array]"]=P["[object Uint8ClampedArray]"]=P["[object Uint16Array]"]=P["[object Uint32Array]"]=!0,P[i]=P[u]=P[j]=P[a]=P[g]=P[c]=P[s]=P[f]=P[l]=P[d]=P[v]=P[p]=P[h]=P[b]=P[y]=!1;var w="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g,F="object"==typeof self&&self&&self.Object===Object&&self,x=w||F||Function("return this")(),C=t&&!t.nodeType&&t,M=C&&e&&!e.nodeType&&e,S=M&&M.exports===C,z=S&&w.process,A=function(){try{return z&&z.binding&&z.binding("util")}catch(e){}}(),k=A&&A.isTypedArray;function E(e,t){for(var r=-1,n=null==e?0:e.length;++r<n;)if(t(e[r],r,e))return!0;return!1}function B(e){var t=-1,r=Array(e.size);return e.forEach((function(e,n){r[++t]=[n,e]})),r}function R(e){var t=-1,r=Array(e.size);return e.forEach((function(e){r[++t]=e})),r}var D,T,$,U=Array.prototype,V=Function.prototype,I=Object.prototype,L=x["__core-js_shared__"],q=V.toString,N=I.hasOwnProperty,W=(D=/[^.]+$/.exec(L&&L.keys&&L.keys.IE_PROTO||""))?"Symbol(src)_1."+D:"",G=I.toString,H=RegExp("^"+q.call(N).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),J=S?x.Buffer:void 0,K=x.Symbol,Q=x.Uint8Array,X=I.propertyIsEnumerable,Y=U.splice,Z=K?K.toStringTag:void 0,ee=Object.getOwnPropertySymbols,te=J?J.isBuffer:void 0,re=(T=Object.keys,$=Object,function(e){return T($(e))}),ne=Me(x,"DataView"),oe=Me(x,"Map"),ie=Me(x,"Promise"),ue=Me(x,"Set"),ae=Me(x,"WeakMap"),ce=Me(Object,"create"),se=ke(ne),fe=ke(oe),le=ke(ie),de=ke(ue),ve=ke(ae),_e=K?K.prototype:void 0,pe=_e?_e.valueOf:void 0;function he(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}function be(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}function ye(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}function je(e){var t=-1,r=null==e?0:e.length;for(this.__data__=new ye;++t<r;)this.add(e[t])}function ge(e){var t=this.__data__=new be(e);this.size=t.size}function Oe(e,t){for(var r=e.length;r--;)if(Ee(e[r][0],t))return r;return-1}function me(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":Z&&Z in Object(e)?function(e){var t=N.call(e,Z),r=e[Z];try{e[Z]=void 0;var n=!0}catch(e){}var o=G.call(e);return n&&(t?e[Z]=r:delete e[Z]),o}(e):function(e){return G.call(e)}(e)}function Pe(e){return Ve(e)&&me(e)==i}function we(e,t,r,n,o){return e===t||(null==e||null==t||!Ve(e)&&!Ve(t)?e!=e&&t!=t:function(e,t,r,n,o,f){var _=Re(e),y=Re(t),O=_?u:ze(e),m=y?u:ze(t),P=(O=O==i?v:O)==v,w=(m=m==i?v:m)==v,F=O==m;if(F&&De(e)){if(!De(t))return!1;_=!0,P=!1}if(F&&!P)return f||(f=new ge),_||Ie(e)?Fe(e,t,r,n,o,f):function(e,t,r,n,o,i,u){switch(r){case g:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case j:return!(e.byteLength!=t.byteLength||!i(new Q(e),new Q(t)));case a:case c:case d:return Ee(+e,+t);case s:return e.name==t.name&&e.message==t.message;case p:case b:return e==t+"";case l:var f=B;case h:var v=1&n;if(f||(f=R),e.size!=t.size&&!v)return!1;var _=u.get(e);if(_)return _==t;n|=2,u.set(e,t);var y=Fe(f(e),f(t),n,o,i,u);return u.delete(e),y;case"[object Symbol]":if(pe)return pe.call(e)==pe.call(t)}return!1}(e,t,O,r,n,o,f);if(!(1&r)){var x=P&&N.call(e,"__wrapped__"),C=w&&N.call(t,"__wrapped__");if(x||C){var M=x?e.value():e,S=C?t.value():t;return f||(f=new ge),o(M,S,r,n,f)}}return!!F&&(f||(f=new ge),function(e,t,r,n,o,i){var u=1&r,a=xe(e),c=a.length;if(c!=xe(t).length&&!u)return!1;for(var s=c;s--;){var f=a[s];if(!(u?f in t:N.call(t,f)))return!1}var l=i.get(e);if(l&&i.get(t))return l==t;var d=!0;i.set(e,t),i.set(t,e);for(var v=u;++s<c;){var _=e[f=a[s]],p=t[f];if(n)var h=u?n(p,_,f,t,e,i):n(_,p,f,e,t,i);if(!(void 0===h?_===p||o(_,p,r,n,i):h)){d=!1;break}v||(v="constructor"==f)}if(d&&!v){var b=e.constructor,y=t.constructor;b==y||!("constructor"in e)||!("constructor"in t)||"function"==typeof b&&b instanceof b&&"function"==typeof y&&y instanceof y||(d=!1)}return i.delete(e),i.delete(t),d}(e,t,r,n,o,f))}(e,t,r,n,we,o))}function Fe(e,t,r,n,o,i){var u=1&r,a=e.length,c=t.length;if(a!=c&&!(u&&c>a))return!1;var s=i.get(e);if(s&&i.get(t))return s==t;var f=-1,l=!0,d=2&r?new je:void 0;for(i.set(e,t),i.set(t,e);++f<a;){var v=e[f],_=t[f];if(n)var p=u?n(_,v,f,t,e,i):n(v,_,f,e,t,i);if(void 0!==p){if(p)continue;l=!1;break}if(d){if(!E(t,(function(e,t){if(u=t,!d.has(u)&&(v===e||o(v,e,r,n,i)))return d.push(t);var u}))){l=!1;break}}else if(v!==_&&!o(v,_,r,n,i)){l=!1;break}}return i.delete(e),i.delete(t),l}function xe(e){return function(e,t,r){var n=t(e);return Re(e)?n:function(e,t){for(var r=-1,n=t.length,o=e.length;++r<n;)e[o+r]=t[r];return e}(n,r(e))}(e,Le,Se)}function Ce(e,t){var r,n,o=e.__data__;return("string"==(n=typeof(r=t))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?o["string"==typeof t?"string":"hash"]:o.map}function Me(e,t){var r=function(e,t){return null==e?void 0:e[t]}(e,t);return function(e){return!(!Ue(e)||function(e){return!!W&&W in e}(e))&&(Te(e)?H:O).test(ke(e))}(r)?r:void 0}he.prototype.clear=function(){this.__data__=ce?ce(null):{},this.size=0},he.prototype.delete=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t},he.prototype.get=function(e){var t=this.__data__;if(ce){var r=t[e];return r===n?void 0:r}return N.call(t,e)?t[e]:void 0},he.prototype.has=function(e){var t=this.__data__;return ce?void 0!==t[e]:N.call(t,e)},he.prototype.set=function(e,t){var r=this.__data__;return this.size+=this.has(e)?0:1,r[e]=ce&&void 0===t?n:t,this},be.prototype.clear=function(){this.__data__=[],this.size=0},be.prototype.delete=function(e){var t=this.__data__,r=Oe(t,e);return!(r<0||(r==t.length-1?t.pop():Y.call(t,r,1),--this.size,0))},be.prototype.get=function(e){var t=this.__data__,r=Oe(t,e);return r<0?void 0:t[r][1]},be.prototype.has=function(e){return Oe(this.__data__,e)>-1},be.prototype.set=function(e,t){var r=this.__data__,n=Oe(r,e);return n<0?(++this.size,r.push([e,t])):r[n][1]=t,this},ye.prototype.clear=function(){this.size=0,this.__data__={hash:new he,map:new(oe||be),string:new he}},ye.prototype.delete=function(e){var t=Ce(this,e).delete(e);return this.size-=t?1:0,t},ye.prototype.get=function(e){return Ce(this,e).get(e)},ye.prototype.has=function(e){return Ce(this,e).has(e)},ye.prototype.set=function(e,t){var r=Ce(this,e),n=r.size;return r.set(e,t),this.size+=r.size==n?0:1,this},je.prototype.add=je.prototype.push=function(e){return this.__data__.set(e,n),this},je.prototype.has=function(e){return this.__data__.has(e)},ge.prototype.clear=function(){this.__data__=new be,this.size=0},ge.prototype.delete=function(e){var t=this.__data__,r=t.delete(e);return this.size=t.size,r},ge.prototype.get=function(e){return this.__data__.get(e)},ge.prototype.has=function(e){return this.__data__.has(e)},ge.prototype.set=function(e,t){var r=this.__data__;if(r instanceof be){var n=r.__data__;if(!oe||n.length<199)return n.push([e,t]),this.size=++r.size,this;r=this.__data__=new ye(n)}return r.set(e,t),this.size=r.size,this};var Se=ee?function(e){return null==e?[]:(e=Object(e),function(t,r){for(var n=-1,o=null==t?0:t.length,i=0,u=[];++n<o;){var a=t[n];c=a,X.call(e,c)&&(u[i++]=a)}var c;return u}(ee(e)))}:function(){return[]},ze=me;function Ae(e,t){return!!(t=null==t?o:t)&&("number"==typeof e||m.test(e))&&e>-1&&e%1==0&&e<t}function ke(e){if(null!=e){try{return q.call(e)}catch(e){}try{return e+""}catch(e){}}return""}function Ee(e,t){return e===t||e!=e&&t!=t}(ne&&ze(new ne(new ArrayBuffer(1)))!=g||oe&&ze(new oe)!=l||ie&&ze(ie.resolve())!=_||ue&&ze(new ue)!=h||ae&&ze(new ae)!=y)&&(ze=function(e){var t=me(e),r=t==v?e.constructor:void 0,n=r?ke(r):"";if(n)switch(n){case se:return g;case fe:return l;case le:return _;case de:return h;case ve:return y}return t});var Be=Pe(function(){return arguments}())?Pe:function(e){return Ve(e)&&N.call(e,"callee")&&!X.call(e,"callee")},Re=Array.isArray,De=te||function(){return!1};function Te(e){if(!Ue(e))return!1;var t=me(e);return t==f||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t}function $e(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=o}function Ue(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}function Ve(e){return null!=e&&"object"==typeof e}var Ie=k?function(e){return function(t){return e(t)}}(k):function(e){return Ve(e)&&$e(e.length)&&!!P[me(e)]};function Le(e){return null!=(t=e)&&$e(t.length)&&!Te(t)?function(e,t){var r=Re(e),n=!r&&Be(e),o=!r&&!n&&De(e),i=!r&&!n&&!o&&Ie(e),u=r||n||o||i,a=u?function(e,t){for(var r=-1,n=Array(e);++r<e;)n[r]=t(r);return n}(e.length,String):[],c=a.length;for(var s in e)!t&&!N.call(e,s)||u&&("length"==s||o&&("offset"==s||"parent"==s)||i&&("buffer"==s||"byteLength"==s||"byteOffset"==s)||Ae(s,c))||a.push(s);return a}(e):function(e){if(r=(t=e)&&t.constructor,t!==("function"==typeof r&&r.prototype||I))return re(e);var t,r,n=[];for(var o in Object(e))N.call(e,o)&&"constructor"!=o&&n.push(o);return n}(e);var t}e.exports=function(e,t){return we(e,t)}},647:function(e,t,r){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),u=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.Field=void 0;var a=u(r(297)),c=r(40);t.Field=function(e){var t=e.name,r=e.input,o=e.label,i=e.error,u=e.required,s=e.inputProps,f=e.validator,l=a.useContext(c.FormContext),d=l.value,v=l.errors,_=l.onChange,p=l.fieldRenderer,h=l.registeredFields,b=r,y=v||{};if(a.useEffect((function(){return h.current&&(h.current[t]||(h.current[t]={validator:f})),function(){h.current&&delete h.current[t]}}),[t,f]),-1===Object.keys(d).indexOf(String(t)))throw new Error('Field name "'+String(t)+"\" doesn't present in form value object.");if(!b)throw new Error('Cannot instantiate form input component for field "'+String(t)+'"');var j=a.useCallback((function(e,r){var o,i,u=(f?f(e,d):void 0)||r||"",a=n(n({},y),((o={})[t]=u,o));u||delete a[t],_(n(n({},d),((i={})[t]=e,i)),a)}),[f,d,t]);return a.default.createElement(p,{error:i||v[t],required:u,label:o,name:String(t)},a.default.createElement(b,n({},s,{value:d[t],error:y[t],onChange:j})))}},385:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0})},210:function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(647),t),o(r(385),t)},305:function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.Form=void 0;var u=i(r(297)),a=r(40);t.Form=function(e){var t=e.config,r=t.value,n=t.errors,o=t.registeredFields,i=t.onChange,c=e.fieldRenderer,s=e.children,f=u.useContext(a.FormConfigContext).fieldRenderer;if(!c&&"fieldStub"===f.name)throw new Error("you should pass fieldRenderer prop to your Form or wrap your Form in FormProvider component");return u.default.createElement(a.FormContext.Provider,{value:{value:r,errors:n,onChange:i,fieldRenderer:c||f,registeredFields:o}},s)}},632:function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(305),t)},525:function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.FormProvider=void 0;var u=i(r(297)),a=r(40);t.FormProvider=u.memo((function(e){var t=e.children,r=e.fieldRenderer;return u.default.createElement(a.FormConfigContext.Provider,{value:{fieldRenderer:r}},t)}))},751:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0})},287:function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(525),t),o(r(751),t)},740:function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(632),t),o(r(287),t),o(r(210),t)},715:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FormConfigContext=void 0;var n=r(297);t.FormConfigContext=n.createContext({fieldRenderer:function(){return null}})},427:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FormContext=void 0;var n=r(297);t.FormContext=n.createContext({value:{},errors:{},fieldRenderer:function(){return null},onChange:function(){},registeredFields:n.createRef()})},40:function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(715),t),o(r(427),t)},554:function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(585),t)},517:function(e,t,r){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),u=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.useFieldComponent=void 0;var a=u(r(297)),c=r(740);t.useFieldComponent=function(){return{Field:a.useCallback((function(e){return a.default.createElement(c.Field,n({},e))}),[])}}},585:function(e,t,r){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.useFormData=void 0;var i=r(297),u=o(r(307)),a=r(791),c=r(517);t.useFormData=function(e,t){var r=c.useFieldComponent().Field,o=i.useState(e),s=o[0],f=o[1],l=i.useState(t||Object.keys(s).reduce((function(e,t){var r;return n(n({},s),((r={})[t]=void 0,r))}),s)),d=l[0],v=l[1],_=i.useState(!1),p=_[0],h=_[1],b=i.useRef(Object.keys(s).reduce((function(e,t){var r;return n(n({},s),((r={})[t]={},r))}),s)),y=a.useValidate(b,s,d,v).validate,j=i.useCallback((function(t,r){f(t),v(r),h(!u.default(e,t))}),[f,v,h,e]);return{isDirty:p,isValid:!Object.keys(y()).length,validate:y,Field:r,config:{value:s,errors:d,onChange:j,registeredFields:b}}}},791:function(e,t,r){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.useValidate=void 0;var o=r(297);t.useValidate=function(e,t,r,i){return{validate:o.useCallback((function(o){var u=Object.keys(t).reduce((function(e,t){var r;return n(n({},e),((r={})[t]="",r))}),t);return e.current&&Object.keys(e.current).forEach((function(n){var o=e.current?e.current[n]:null,i=t[n],a=((null==o?void 0:o.validator)?o.validator(i,t):void 0)||r[n];a?u[n]=a:delete u[n]})),o&&i(n(n({},r),u)),u}),[e,t,i,r])}}},607:function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(740),t),o(r(554),t),o(r(40),t)},297:e=>{"use strict";e.exports=require("react")}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e);var n=r(607),o=exports;for(var i in n)o[i]=n[i];n.__esModule&&Object.defineProperty(o,"__esModule",{value:!0})})();
//# sourceMappingURL=index.js.map