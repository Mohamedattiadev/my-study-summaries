/* Slide Remote — Obsidian plugin. Auto-generated bundle. */
var en=Object.create;var G=Object.defineProperty;var nn=Object.getOwnPropertyDescriptor;var rn=Object.getOwnPropertyNames;var on=Object.getPrototypeOf,sn=Object.prototype.hasOwnProperty;var f=(r,t)=>()=>(t||r((t={exports:{}}).exports,t),t.exports),an=(r,t)=>{for(var e in t)G(r,e,{get:t[e],enumerable:!0})},Vt=(r,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of rn(t))!sn.call(r,o)&&o!==e&&G(r,o,{get:()=>t[o],enumerable:!(n=nn(t,o))||n.enumerable});return r};var j=(r,t,e)=>(e=r!=null?en(on(r)):{},Vt(t||!r||!r.__esModule?G(e,"default",{value:r,enumerable:!0}):e,r)),ln=r=>Vt(G({},"__esModule",{value:!0}),r);var $t=f((lr,Jt)=>{Jt.exports=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}});var T=f(P=>{var yt,un=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];P.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return t*4+17};P.getSymbolTotalCodewords=function(t){return un[t]};P.getBCHDigit=function(r){let t=0;for(;r!==0;)t++,r>>>=1;return t};P.setToSJISFunction=function(t){if(typeof t!="function")throw new Error('"toSJISFunc" is not a valid function.');yt=t};P.isKanjiModeEnabled=function(){return typeof yt<"u"};P.toSJIS=function(t){return yt(t)}});var X=f(w=>{w.L={bit:1};w.M={bit:0};w.Q={bit:3};w.H={bit:2};function dn(r){if(typeof r!="string")throw new Error("Param is not a string");switch(r.toLowerCase()){case"l":case"low":return w.L;case"m":case"medium":return w.M;case"q":case"quartile":return w.Q;case"h":case"high":return w.H;default:throw new Error("Unknown EC Level: "+r)}}w.isValid=function(t){return t&&typeof t.bit<"u"&&t.bit>=0&&t.bit<4};w.from=function(t,e){if(w.isValid(t))return t;try{return dn(t)}catch{return e}}});var Wt=f((dr,Gt)=>{function Yt(){this.buffer=[],this.length=0}Yt.prototype={get:function(r){let t=Math.floor(r/8);return(this.buffer[t]>>>7-r%8&1)===1},put:function(r,t){for(let e=0;e<t;e++)this.putBit((r>>>t-e-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(r){let t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),r&&(this.buffer[t]|=128>>>this.length%8),this.length++}};Gt.exports=Yt});var Zt=f((fr,Xt)=>{function H(r){if(!r||r<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=r,this.data=new Uint8Array(r*r),this.reservedBit=new Uint8Array(r*r)}H.prototype.set=function(r,t,e,n){let o=r*this.size+t;this.data[o]=e,n&&(this.reservedBit[o]=!0)};H.prototype.get=function(r,t){return this.data[r*this.size+t]};H.prototype.xor=function(r,t,e){this.data[r*this.size+t]^=e};H.prototype.isReserved=function(r,t){return this.reservedBit[r*this.size+t]};Xt.exports=H});var te=f(Z=>{var fn=T().getSymbolSize;Z.getRowColCoords=function(t){if(t===1)return[];let e=Math.floor(t/7)+2,n=fn(t),o=n===145?26:Math.ceil((n-13)/(2*e-2))*2,s=[n-7];for(let i=1;i<e-1;i++)s[i]=s[i-1]-o;return s.push(6),s.reverse()};Z.getPositions=function(t){let e=[],n=Z.getRowColCoords(t),o=n.length;for(let s=0;s<o;s++)for(let i=0;i<o;i++)s===0&&i===0||s===0&&i===o-1||s===o-1&&i===0||e.push([n[s],n[i]]);return e}});var re=f(ne=>{var hn=T().getSymbolSize,ee=7;ne.getPositions=function(t){let e=hn(t);return[[0,0],[e-ee,0],[0,e-ee]]}});var oe=f(g=>{g.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var L={N1:3,N2:3,N3:40,N4:10};g.isValid=function(t){return t!=null&&t!==""&&!isNaN(t)&&t>=0&&t<=7};g.from=function(t){return g.isValid(t)?parseInt(t,10):void 0};g.getPenaltyN1=function(t){let e=t.size,n=0,o=0,s=0,i=null,a=null;for(let l=0;l<e;l++){o=s=0,i=a=null;for(let c=0;c<e;c++){let u=t.get(l,c);u===i?o++:(o>=5&&(n+=L.N1+(o-5)),i=u,o=1),u=t.get(c,l),u===a?s++:(s>=5&&(n+=L.N1+(s-5)),a=u,s=1)}o>=5&&(n+=L.N1+(o-5)),s>=5&&(n+=L.N1+(s-5))}return n};g.getPenaltyN2=function(t){let e=t.size,n=0;for(let o=0;o<e-1;o++)for(let s=0;s<e-1;s++){let i=t.get(o,s)+t.get(o,s+1)+t.get(o+1,s)+t.get(o+1,s+1);(i===4||i===0)&&n++}return n*L.N2};g.getPenaltyN3=function(t){let e=t.size,n=0,o=0,s=0;for(let i=0;i<e;i++){o=s=0;for(let a=0;a<e;a++)o=o<<1&2047|t.get(i,a),a>=10&&(o===1488||o===93)&&n++,s=s<<1&2047|t.get(a,i),a>=10&&(s===1488||s===93)&&n++}return n*L.N3};g.getPenaltyN4=function(t){let e=0,n=t.data.length;for(let s=0;s<n;s++)e+=t.data[s];return Math.abs(Math.ceil(e*100/n/5)-10)*L.N4};function gn(r,t,e){switch(r){case g.Patterns.PATTERN000:return(t+e)%2===0;case g.Patterns.PATTERN001:return t%2===0;case g.Patterns.PATTERN010:return e%3===0;case g.Patterns.PATTERN011:return(t+e)%3===0;case g.Patterns.PATTERN100:return(Math.floor(t/2)+Math.floor(e/3))%2===0;case g.Patterns.PATTERN101:return t*e%2+t*e%3===0;case g.Patterns.PATTERN110:return(t*e%2+t*e%3)%2===0;case g.Patterns.PATTERN111:return(t*e%3+(t+e)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}g.applyMask=function(t,e){let n=e.size;for(let o=0;o<n;o++)for(let s=0;s<n;s++)e.isReserved(s,o)||e.xor(s,o,gn(t,s,o))};g.getBestMask=function(t,e){let n=Object.keys(g.Patterns).length,o=0,s=1/0;for(let i=0;i<n;i++){e(i),g.applyMask(i,t);let a=g.getPenaltyN1(t)+g.getPenaltyN2(t)+g.getPenaltyN3(t)+g.getPenaltyN4(t);g.applyMask(i,t),a<s&&(s=a,o=i)}return o}});var bt=f(vt=>{var R=X(),tt=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],et=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];vt.getBlocksCount=function(t,e){switch(e){case R.L:return tt[(t-1)*4+0];case R.M:return tt[(t-1)*4+1];case R.Q:return tt[(t-1)*4+2];case R.H:return tt[(t-1)*4+3];default:return}};vt.getTotalCodewordsCount=function(t,e){switch(e){case R.L:return et[(t-1)*4+0];case R.M:return et[(t-1)*4+1];case R.Q:return et[(t-1)*4+2];case R.H:return et[(t-1)*4+3];default:return}}});var se=f(rt=>{var K=new Uint8Array(512),nt=new Uint8Array(256);(function(){let t=1;for(let e=0;e<255;e++)K[e]=t,nt[t]=e,t<<=1,t&256&&(t^=285);for(let e=255;e<512;e++)K[e]=K[e-255]})();rt.log=function(t){if(t<1)throw new Error("log("+t+")");return nt[t]};rt.exp=function(t){return K[t]};rt.mul=function(t,e){return t===0||e===0?0:K[nt[t]+nt[e]]}});var ie=f(O=>{var Ct=se();O.mul=function(t,e){let n=new Uint8Array(t.length+e.length-1);for(let o=0;o<t.length;o++)for(let s=0;s<e.length;s++)n[o+s]^=Ct.mul(t[o],e[s]);return n};O.mod=function(t,e){let n=new Uint8Array(t);for(;n.length-e.length>=0;){let o=n[0];for(let i=0;i<e.length;i++)n[i]^=Ct.mul(e[i],o);let s=0;for(;s<n.length&&n[s]===0;)s++;n=n.slice(s)}return n};O.generateECPolynomial=function(t){let e=new Uint8Array([1]);for(let n=0;n<t;n++)e=O.mul(e,new Uint8Array([1,Ct.exp(n)]));return e}});var ce=f((vr,le)=>{var ae=ie();function kt(r){this.genPoly=void 0,this.degree=r,this.degree&&this.initialize(this.degree)}kt.prototype.initialize=function(t){this.degree=t,this.genPoly=ae.generateECPolynomial(this.degree)};kt.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");let e=new Uint8Array(t.length+this.degree);e.set(t);let n=ae.mod(e,this.genPoly),o=this.degree-n.length;if(o>0){let s=new Uint8Array(this.degree);return s.set(n,o),s}return n};le.exports=kt});var St=f(ue=>{ue.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}});var Et=f(S=>{var de="[0-9]+",pn="[A-Z $%*+\\-./:]+",Q="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";Q=Q.replace(/u/g,"\\u");var mn="(?:(?![A-Z0-9 $%*+\\-./:]|"+Q+`)(?:.|[\r
]))+`;S.KANJI=new RegExp(Q,"g");S.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");S.BYTE=new RegExp(mn,"g");S.NUMERIC=new RegExp(de,"g");S.ALPHANUMERIC=new RegExp(pn,"g");var wn=new RegExp("^"+Q+"$"),yn=new RegExp("^"+de+"$"),vn=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");S.testKanji=function(t){return wn.test(t)};S.testNumeric=function(t){return yn.test(t)};S.testAlphanumeric=function(t){return vn.test(t)}});var A=f(p=>{var bn=St(),xt=Et();p.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]};p.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]};p.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]};p.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]};p.MIXED={bit:-1};p.getCharCountIndicator=function(t,e){if(!t.ccBits)throw new Error("Invalid mode: "+t);if(!bn.isValid(e))throw new Error("Invalid version: "+e);return e>=1&&e<10?t.ccBits[0]:e<27?t.ccBits[1]:t.ccBits[2]};p.getBestModeForData=function(t){return xt.testNumeric(t)?p.NUMERIC:xt.testAlphanumeric(t)?p.ALPHANUMERIC:xt.testKanji(t)?p.KANJI:p.BYTE};p.toString=function(t){if(t&&t.id)return t.id;throw new Error("Invalid mode")};p.isValid=function(t){return t&&t.bit&&t.ccBits};function Cn(r){if(typeof r!="string")throw new Error("Param is not a string");switch(r.toLowerCase()){case"numeric":return p.NUMERIC;case"alphanumeric":return p.ALPHANUMERIC;case"kanji":return p.KANJI;case"byte":return p.BYTE;default:throw new Error("Unknown mode: "+r)}}p.from=function(t,e){if(p.isValid(t))return t;try{return Cn(t)}catch{return e}}});var me=f(M=>{var ot=T(),kn=bt(),fe=X(),I=A(),Bt=St(),ge=7973,he=ot.getBCHDigit(ge);function Sn(r,t,e){for(let n=1;n<=40;n++)if(t<=M.getCapacity(n,e,r))return n}function pe(r,t){return I.getCharCountIndicator(r,t)+4}function En(r,t){let e=0;return r.forEach(function(n){let o=pe(n.mode,t);e+=o+n.getBitsLength()}),e}function xn(r,t){for(let e=1;e<=40;e++)if(En(r,e)<=M.getCapacity(e,t,I.MIXED))return e}M.from=function(t,e){return Bt.isValid(t)?parseInt(t,10):e};M.getCapacity=function(t,e,n){if(!Bt.isValid(t))throw new Error("Invalid QR Code version");typeof n>"u"&&(n=I.BYTE);let o=ot.getSymbolTotalCodewords(t),s=kn.getTotalCodewordsCount(t,e),i=(o-s)*8;if(n===I.MIXED)return i;let a=i-pe(n,t);switch(n){case I.NUMERIC:return Math.floor(a/10*3);case I.ALPHANUMERIC:return Math.floor(a/11*2);case I.KANJI:return Math.floor(a/13);case I.BYTE:default:return Math.floor(a/8)}};M.getBestVersionForData=function(t,e){let n,o=fe.from(e,fe.M);if(Array.isArray(t)){if(t.length>1)return xn(t,o);if(t.length===0)return 1;n=t[0]}else n=t;return Sn(n.mode,n.getLength(),o)};M.getEncodedBits=function(t){if(!Bt.isValid(t)||t<7)throw new Error("Invalid QR Code version");let e=t<<12;for(;ot.getBCHDigit(e)-he>=0;)e^=ge<<ot.getBCHDigit(e)-he;return t<<12|e}});var be=f(ve=>{var Tt=T(),ye=1335,Bn=21522,we=Tt.getBCHDigit(ye);ve.getEncodedBits=function(t,e){let n=t.bit<<3|e,o=n<<10;for(;Tt.getBCHDigit(o)-we>=0;)o^=ye<<Tt.getBCHDigit(o)-we;return(n<<10|o)^Bn}});var ke=f((xr,Ce)=>{var Tn=A();function D(r){this.mode=Tn.NUMERIC,this.data=r.toString()}D.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)};D.prototype.getLength=function(){return this.data.length};D.prototype.getBitsLength=function(){return D.getBitsLength(this.data.length)};D.prototype.write=function(t){let e,n,o;for(e=0;e+3<=this.data.length;e+=3)n=this.data.substr(e,3),o=parseInt(n,10),t.put(o,10);let s=this.data.length-e;s>0&&(n=this.data.substr(e),o=parseInt(n,10),t.put(o,s*3+1))};Ce.exports=D});var Ee=f((Br,Se)=>{var Rn=A(),Rt=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function _(r){this.mode=Rn.ALPHANUMERIC,this.data=r}_.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)};_.prototype.getLength=function(){return this.data.length};_.prototype.getBitsLength=function(){return _.getBitsLength(this.data.length)};_.prototype.write=function(t){let e;for(e=0;e+2<=this.data.length;e+=2){let n=Rt.indexOf(this.data[e])*45;n+=Rt.indexOf(this.data[e+1]),t.put(n,11)}this.data.length%2&&t.put(Rt.indexOf(this.data[e]),6)};Se.exports=_});var Be=f((Tr,xe)=>{var An=A();function F(r){this.mode=An.BYTE,typeof r=="string"?this.data=new TextEncoder().encode(r):this.data=new Uint8Array(r)}F.getBitsLength=function(t){return t*8};F.prototype.getLength=function(){return this.data.length};F.prototype.getBitsLength=function(){return F.getBitsLength(this.data.length)};F.prototype.write=function(r){for(let t=0,e=this.data.length;t<e;t++)r.put(this.data[t],8)};xe.exports=F});var Re=f((Rr,Te)=>{var In=A(),Pn=T();function z(r){this.mode=In.KANJI,this.data=r}z.getBitsLength=function(t){return t*13};z.prototype.getLength=function(){return this.data.length};z.prototype.getBitsLength=function(){return z.getBitsLength(this.data.length)};z.prototype.write=function(r){let t;for(t=0;t<this.data.length;t++){let e=Pn.toSJIS(this.data[t]);if(e>=33088&&e<=40956)e-=33088;else if(e>=57408&&e<=60351)e-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);e=(e>>>8&255)*192+(e&255),r.put(e,13)}};Te.exports=z});var Ae=f((Ar,At)=>{"use strict";var V={single_source_shortest_paths:function(r,t,e){var n={},o={};o[t]=0;var s=V.PriorityQueue.make();s.push(t,0);for(var i,a,l,c,u,m,h,b,x;!s.empty();){i=s.pop(),a=i.value,c=i.cost,u=r[a]||{};for(l in u)u.hasOwnProperty(l)&&(m=u[l],h=c+m,b=o[l],x=typeof o[l]>"u",(x||b>h)&&(o[l]=h,s.push(l,h),n[l]=a))}if(typeof e<"u"&&typeof o[e]>"u"){var B=["Could not find a path from ",t," to ",e,"."].join("");throw new Error(B)}return n},extract_shortest_path_from_predecessor_list:function(r,t){for(var e=[],n=t,o;n;)e.push(n),o=r[n],n=r[n];return e.reverse(),e},find_path:function(r,t,e){var n=V.single_source_shortest_paths(r,t,e);return V.extract_shortest_path_from_predecessor_list(n,e)},PriorityQueue:{make:function(r){var t=V.PriorityQueue,e={},n;r=r||{};for(n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e.queue=[],e.sorter=r.sorter||t.default_sorter,e},default_sorter:function(r,t){return r.cost-t.cost},push:function(r,t){var e={value:r,cost:t};this.queue.push(e),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};typeof At<"u"&&(At.exports=V)});var _e=f(q=>{var d=A(),Le=ke(),Me=Ee(),Ne=Be(),Ue=Re(),J=Et(),st=T(),Ln=Ae();function Ie(r){return unescape(encodeURIComponent(r)).length}function $(r,t,e){let n=[],o;for(;(o=r.exec(e))!==null;)n.push({data:o[0],index:o.index,mode:t,length:o[0].length});return n}function De(r){let t=$(J.NUMERIC,d.NUMERIC,r),e=$(J.ALPHANUMERIC,d.ALPHANUMERIC,r),n,o;return st.isKanjiModeEnabled()?(n=$(J.BYTE,d.BYTE,r),o=$(J.KANJI,d.KANJI,r)):(n=$(J.BYTE_KANJI,d.BYTE,r),o=[]),t.concat(e,n,o).sort(function(i,a){return i.index-a.index}).map(function(i){return{data:i.data,mode:i.mode,length:i.length}})}function It(r,t){switch(t){case d.NUMERIC:return Le.getBitsLength(r);case d.ALPHANUMERIC:return Me.getBitsLength(r);case d.KANJI:return Ue.getBitsLength(r);case d.BYTE:return Ne.getBitsLength(r)}}function Mn(r){return r.reduce(function(t,e){let n=t.length-1>=0?t[t.length-1]:null;return n&&n.mode===e.mode?(t[t.length-1].data+=e.data,t):(t.push(e),t)},[])}function Nn(r){let t=[];for(let e=0;e<r.length;e++){let n=r[e];switch(n.mode){case d.NUMERIC:t.push([n,{data:n.data,mode:d.ALPHANUMERIC,length:n.length},{data:n.data,mode:d.BYTE,length:n.length}]);break;case d.ALPHANUMERIC:t.push([n,{data:n.data,mode:d.BYTE,length:n.length}]);break;case d.KANJI:t.push([n,{data:n.data,mode:d.BYTE,length:Ie(n.data)}]);break;case d.BYTE:t.push([{data:n.data,mode:d.BYTE,length:Ie(n.data)}])}}return t}function Un(r,t){let e={},n={start:{}},o=["start"];for(let s=0;s<r.length;s++){let i=r[s],a=[];for(let l=0;l<i.length;l++){let c=i[l],u=""+s+l;a.push(u),e[u]={node:c,lastCount:0},n[u]={};for(let m=0;m<o.length;m++){let h=o[m];e[h]&&e[h].node.mode===c.mode?(n[h][u]=It(e[h].lastCount+c.length,c.mode)-It(e[h].lastCount,c.mode),e[h].lastCount+=c.length):(e[h]&&(e[h].lastCount=c.length),n[h][u]=It(c.length,c.mode)+4+d.getCharCountIndicator(c.mode,t))}}o=a}for(let s=0;s<o.length;s++)n[o[s]].end=0;return{map:n,table:e}}function Pe(r,t){let e,n=d.getBestModeForData(r);if(e=d.from(t,n),e!==d.BYTE&&e.bit<n.bit)throw new Error('"'+r+'" cannot be encoded with mode '+d.toString(e)+`.
 Suggested mode is: `+d.toString(n));switch(e===d.KANJI&&!st.isKanjiModeEnabled()&&(e=d.BYTE),e){case d.NUMERIC:return new Le(r);case d.ALPHANUMERIC:return new Me(r);case d.KANJI:return new Ue(r);case d.BYTE:return new Ne(r)}}q.fromArray=function(t){return t.reduce(function(e,n){return typeof n=="string"?e.push(Pe(n,null)):n.data&&e.push(Pe(n.data,n.mode)),e},[])};q.fromString=function(t,e){let n=De(t,st.isKanjiModeEnabled()),o=Nn(n),s=Un(o,e),i=Ln.find_path(s.map,"start","end"),a=[];for(let l=1;l<i.length-1;l++)a.push(s.table[i[l]].node);return q.fromArray(Mn(a))};q.rawSplit=function(t){return q.fromArray(De(t,st.isKanjiModeEnabled()))}});var ze=f(Fe=>{var at=T(),Pt=X(),Dn=Wt(),_n=Zt(),Fn=te(),zn=re(),Nt=oe(),Ut=bt(),qn=ce(),it=me(),jn=be(),Hn=A(),Lt=_e();function Kn(r,t){let e=r.size,n=zn.getPositions(t);for(let o=0;o<n.length;o++){let s=n[o][0],i=n[o][1];for(let a=-1;a<=7;a++)if(!(s+a<=-1||e<=s+a))for(let l=-1;l<=7;l++)i+l<=-1||e<=i+l||(a>=0&&a<=6&&(l===0||l===6)||l>=0&&l<=6&&(a===0||a===6)||a>=2&&a<=4&&l>=2&&l<=4?r.set(s+a,i+l,!0,!0):r.set(s+a,i+l,!1,!0))}}function On(r){let t=r.size;for(let e=8;e<t-8;e++){let n=e%2===0;r.set(e,6,n,!0),r.set(6,e,n,!0)}}function Qn(r,t){let e=Fn.getPositions(t);for(let n=0;n<e.length;n++){let o=e[n][0],s=e[n][1];for(let i=-2;i<=2;i++)for(let a=-2;a<=2;a++)i===-2||i===2||a===-2||a===2||i===0&&a===0?r.set(o+i,s+a,!0,!0):r.set(o+i,s+a,!1,!0)}}function Vn(r,t){let e=r.size,n=it.getEncodedBits(t),o,s,i;for(let a=0;a<18;a++)o=Math.floor(a/3),s=a%3+e-8-3,i=(n>>a&1)===1,r.set(o,s,i,!0),r.set(s,o,i,!0)}function Mt(r,t,e){let n=r.size,o=jn.getEncodedBits(t,e),s,i;for(s=0;s<15;s++)i=(o>>s&1)===1,s<6?r.set(s,8,i,!0):s<8?r.set(s+1,8,i,!0):r.set(n-15+s,8,i,!0),s<8?r.set(8,n-s-1,i,!0):s<9?r.set(8,15-s-1+1,i,!0):r.set(8,15-s-1,i,!0);r.set(n-8,8,1,!0)}function Jn(r,t){let e=r.size,n=-1,o=e-1,s=7,i=0;for(let a=e-1;a>0;a-=2)for(a===6&&a--;;){for(let l=0;l<2;l++)if(!r.isReserved(o,a-l)){let c=!1;i<t.length&&(c=(t[i]>>>s&1)===1),r.set(o,a-l,c),s--,s===-1&&(i++,s=7)}if(o+=n,o<0||e<=o){o-=n,n=-n;break}}}function $n(r,t,e){let n=new Dn;e.forEach(function(l){n.put(l.mode.bit,4),n.put(l.getLength(),Hn.getCharCountIndicator(l.mode,r)),l.write(n)});let o=at.getSymbolTotalCodewords(r),s=Ut.getTotalCodewordsCount(r,t),i=(o-s)*8;for(n.getLengthInBits()+4<=i&&n.put(0,4);n.getLengthInBits()%8!==0;)n.putBit(0);let a=(i-n.getLengthInBits())/8;for(let l=0;l<a;l++)n.put(l%2?17:236,8);return Yn(n,r,t)}function Yn(r,t,e){let n=at.getSymbolTotalCodewords(t),o=Ut.getTotalCodewordsCount(t,e),s=n-o,i=Ut.getBlocksCount(t,e),a=n%i,l=i-a,c=Math.floor(n/i),u=Math.floor(s/i),m=u+1,h=c-u,b=new qn(h),x=0,B=new Array(i),Ot=new Array(i),gt=0,tn=new Uint8Array(r.buffer);for(let U=0;U<i;U++){let mt=U<l?u:m;B[U]=tn.slice(x,x+mt),Ot[U]=b.encode(B[U]),x+=mt,gt=Math.max(gt,mt)}let pt=new Uint8Array(n),Qt=0,C,k;for(C=0;C<gt;C++)for(k=0;k<i;k++)C<B[k].length&&(pt[Qt++]=B[k][C]);for(C=0;C<h;C++)for(k=0;k<i;k++)pt[Qt++]=Ot[k][C];return pt}function Gn(r,t,e,n){let o;if(Array.isArray(r))o=Lt.fromArray(r);else if(typeof r=="string"){let c=t;if(!c){let u=Lt.rawSplit(r);c=it.getBestVersionForData(u,e)}o=Lt.fromString(r,c||40)}else throw new Error("Invalid data");let s=it.getBestVersionForData(o,e);if(!s)throw new Error("The amount of data is too big to be stored in a QR Code");if(!t)t=s;else if(t<s)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+s+`.
`);let i=$n(t,e,o),a=at.getSymbolSize(t),l=new _n(a);return Kn(l,t),On(l),Qn(l,t),Mt(l,e,0),t>=7&&Vn(l,t),Jn(l,i),isNaN(n)&&(n=Nt.getBestMask(l,Mt.bind(null,l,e))),Nt.applyMask(n,l),Mt(l,e,n),{modules:l,version:t,errorCorrectionLevel:e,maskPattern:n,segments:o}}Fe.create=function(t,e){if(typeof t>"u"||t==="")throw new Error("No input text");let n=Pt.M,o,s;return typeof e<"u"&&(n=Pt.from(e.errorCorrectionLevel,Pt.M),o=it.from(e.version),s=Nt.from(e.maskPattern),e.toSJISFunc&&at.setToSJISFunction(e.toSJISFunc)),Gn(t,o,n,s)}});var Dt=f(N=>{function qe(r){if(typeof r=="number"&&(r=r.toString()),typeof r!="string")throw new Error("Color should be defined as hex string");let t=r.slice().replace("#","").split("");if(t.length<3||t.length===5||t.length>8)throw new Error("Invalid hex color: "+r);(t.length===3||t.length===4)&&(t=Array.prototype.concat.apply([],t.map(function(n){return[n,n]}))),t.length===6&&t.push("F","F");let e=parseInt(t.join(""),16);return{r:e>>24&255,g:e>>16&255,b:e>>8&255,a:e&255,hex:"#"+t.slice(0,6).join("")}}N.getOptions=function(t){t||(t={}),t.color||(t.color={});let e=typeof t.margin>"u"||t.margin===null||t.margin<0?4:t.margin,n=t.width&&t.width>=21?t.width:void 0,o=t.scale||4;return{width:n,scale:n?4:o,margin:e,color:{dark:qe(t.color.dark||"#000000ff"),light:qe(t.color.light||"#ffffffff")},type:t.type,rendererOpts:t.rendererOpts||{}}};N.getScale=function(t,e){return e.width&&e.width>=t+e.margin*2?e.width/(t+e.margin*2):e.scale};N.getImageWidth=function(t,e){let n=N.getScale(t,e);return Math.floor((t+e.margin*2)*n)};N.qrToImageData=function(t,e,n){let o=e.modules.size,s=e.modules.data,i=N.getScale(o,n),a=Math.floor((o+n.margin*2)*i),l=n.margin*i,c=[n.color.light,n.color.dark];for(let u=0;u<a;u++)for(let m=0;m<a;m++){let h=(u*a+m)*4,b=n.color.light;if(u>=l&&m>=l&&u<a-l&&m<a-l){let x=Math.floor((u-l)/i),B=Math.floor((m-l)/i);b=c[s[x*o+B]?1:0]}t[h++]=b.r,t[h++]=b.g,t[h++]=b.b,t[h]=b.a}}});var je=f(lt=>{var _t=Dt();function Wn(r,t,e){r.clearRect(0,0,t.width,t.height),t.style||(t.style={}),t.height=e,t.width=e,t.style.height=e+"px",t.style.width=e+"px"}function Xn(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}lt.render=function(t,e,n){let o=n,s=e;typeof o>"u"&&(!e||!e.getContext)&&(o=e,e=void 0),e||(s=Xn()),o=_t.getOptions(o);let i=_t.getImageWidth(t.modules.size,o),a=s.getContext("2d"),l=a.createImageData(i,i);return _t.qrToImageData(l.data,t,o),Wn(a,s,i),a.putImageData(l,0,0),s};lt.renderToDataURL=function(t,e,n){let o=n;typeof o>"u"&&(!e||!e.getContext)&&(o=e,e=void 0),o||(o={});let s=lt.render(t,e,o),i=o.type||"image/png",a=o.rendererOpts||{};return s.toDataURL(i,a.quality)}});var Oe=f(Ke=>{var Zn=Dt();function He(r,t){let e=r.a/255,n=t+'="'+r.hex+'"';return e<1?n+" "+t+'-opacity="'+e.toFixed(2).slice(1)+'"':n}function Ft(r,t,e){let n=r+t;return typeof e<"u"&&(n+=" "+e),n}function tr(r,t,e){let n="",o=0,s=!1,i=0;for(let a=0;a<r.length;a++){let l=Math.floor(a%t),c=Math.floor(a/t);!l&&!s&&(s=!0),r[a]?(i++,a>0&&l>0&&r[a-1]||(n+=s?Ft("M",l+e,.5+c+e):Ft("m",o,0),o=0,s=!1),l+1<t&&r[a+1]||(n+=Ft("h",i),i=0)):o++}return n}Ke.render=function(t,e,n){let o=Zn.getOptions(e),s=t.modules.size,i=t.modules.data,a=s+o.margin*2,l=o.color.light.a?"<path "+He(o.color.light,"fill")+' d="M0 0h'+a+"v"+a+'H0z"/>':"",c="<path "+He(o.color.dark,"stroke")+' d="'+tr(i,s,o.margin)+'"/>',u='viewBox="0 0 '+a+" "+a+'"',h='<svg xmlns="http://www.w3.org/2000/svg" '+(o.width?'width="'+o.width+'" height="'+o.width+'" ':"")+u+' shape-rendering="crispEdges">'+l+c+`</svg>
`;return typeof n=="function"&&n(null,h),h}});var jt=f(Y=>{var er=$t(),zt=ze(),Qe=je(),nr=Oe();function qt(r,t,e,n,o){let s=[].slice.call(arguments,1),i=s.length,a=typeof s[i-1]=="function";if(!a&&!er())throw new Error("Callback required as last argument");if(a){if(i<2)throw new Error("Too few arguments provided");i===2?(o=e,e=t,t=n=void 0):i===3&&(t.getContext&&typeof o>"u"?(o=n,n=void 0):(o=n,n=e,e=t,t=void 0))}else{if(i<1)throw new Error("Too few arguments provided");return i===1?(e=t,t=n=void 0):i===2&&!t.getContext&&(n=e,e=t,t=void 0),new Promise(function(l,c){try{let u=zt.create(e,n);l(r(u,t,n))}catch(u){c(u)}})}try{let l=zt.create(e,n);o(null,r(l,t,n))}catch(l){o(l)}}Y.create=zt.create;Y.toCanvas=qt.bind(null,Qe.render);Y.toDataURL=qt.bind(null,Qe.renderToDataURL);Y.toString=qt.bind(null,function(r,t,e){return nr.render(r,e)})});var or={};an(or,{default:()=>ht});module.exports=ln(or);var v=require("obsidian");var wt={autoStart:!0,portMin:28e3,portMax:28099,permanentSecret:"",lastKnownIP:""};var cn={next:{key:"ArrowRight"},prev:{key:"ArrowLeft"},first:{key:"PageUp"},last:{key:"PageDown"},notes:{key:"n"},sticky:{key:"m"},thumbs:{key:"t"},pen:{key:"a"},"clear-ink":{key:"c"},help:{key:"?"},spotlight:{key:"s"},timer:{key:"T",shift:!0},fullscreen:{key:"f"}},W=class{constructor(t){this.app=t;this.blackEl=null}handle(t){if(t==="black"){this.showBlack();return}if(t==="unblack"){this.hideBlack();return}if(t==="close-session")return;let e=!1;try{let o=new CustomEvent("slideshow:cmd",{detail:{action:t},cancelable:!0});window.dispatchEvent(o),e=o.defaultPrevented}catch{}if(e)return;let n=cn[t];n&&this.dispatchKey(n)}isBlack(){return this.blackEl!==null}cleanup(){this.hideBlack()}dispatchKey(t){let e=window,n=[e.document.activeElement,this.app.workspace.activeLeaf?.view?.contentEl,e.document.body,e],o={key:t.key,code:this.codeFor(t.key),bubbles:!0,cancelable:!0,shiftKey:!!t.shift};for(let s of n)if(s)try{s.dispatchEvent(new KeyboardEvent("keydown",o)),s.dispatchEvent(new KeyboardEvent("keyup",o));return}catch{}}codeFor(t){if(t==="ArrowRight")return"ArrowRight";if(t==="ArrowLeft")return"ArrowLeft";if(t==="Home")return"Home";if(t==="End")return"End";if(t==="PageUp")return"PageUp";if(t==="PageDown")return"PageDown";if(t.length===1){let e=t.toUpperCase();if(e>="A"&&e<="Z")return"Key"+e;if(e>="0"&&e<="9")return"Digit"+e}return t}showBlack(){if(this.blackEl)return;let t=document.createElement("div");t.id="slide-remote-black-screen",t.setAttribute("style",["position: fixed","inset: 0","background: #000","z-index: 2147483646","cursor: none","user-select: none"].join(";")),document.body.appendChild(t),this.blackEl=t}hideBlack(){this.blackEl&&(this.blackEl.remove(),this.blackEl=null)}};var Ge=j(require("http")),We=require("crypto"),Xe=j(jt());var Ve=j(require("os")),Je=j(require("net"));function ct(){let r=Ve.networkInterfaces(),t=[];for(let n of Object.keys(r)){let o=r[n];if(o)for(let s of o){if(s.family!=="IPv4"||s.internal)continue;let i=s.address;i.startsWith("169.254.")||t.push(i)}}if(t.length===0)return"127.0.0.1";let e=n=>n.startsWith("192.168.")?0:n.startsWith("10.")?1:/^172\.(1[6-9]|2\d|3[0-1])\./.test(n)?2:3;return t.sort((n,o)=>e(n)-e(o)),t[0]}function Ht(r){return new Promise(t=>{let e=Je.createServer();e.unref(),e.once("error",()=>t(!1)),e.once("listening",()=>{e.close(()=>t(!0))});try{e.listen(r,"0.0.0.0")}catch{t(!1)}})}async function $e(r,t){for(let e=r;e<=t;e++)if(await Ht(e))return e;return 0}function Ye(r){return`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#ffffff">
  <title>Slide Remote</title>
  <style>
    :root {
      color-scheme: light dark;
      --bg: #f4f4f6;
      --panel: #ffffff;
      --panel-2: #f0f0f3;
      --border: #d6d8df;
      --fg: #1b1b1f;
      --muted: #7a7c87;
      --accent: #6965db;
      --accent-hover: #5b57c7;
      --on-accent: #ffffff;
      --danger: #d83a3a;
      --warn: #d8a228;
      --ok: #27ae60;
      --shadow-island: 0 2px 8px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06);
      --gap: 12px;
      --radius: 12px;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #0f1117;
        --panel: #1b1f29;
        --panel-2: #242a37;
        --border: #2c3344;
        --fg: #e9ecf3;
        --muted: #8a91a3;
        --shadow-island: 0 8px 20px rgba(0,0,0,0.45);
      }
    }
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    html, body { margin: 0; padding: 0; background: var(--bg); color: var(--fg);
                 font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                              system-ui, "Helvetica Neue", sans-serif;
                 min-height: 100dvh; overscroll-behavior: none; }
    body {
      display: flex; flex-direction: column;
      padding: env(safe-area-inset-top) env(safe-area-inset-right)
               env(safe-area-inset-bottom) env(safe-area-inset-left);
      gap: var(--gap);
    }
    header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 16px;
      background: var(--panel);
      border-bottom: 1px solid var(--border);
      box-shadow: var(--shadow-island);
    }
    h1 {
      margin: 0;
      font-size: 15px; font-weight: 700; letter-spacing: 0.3px;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .brand {
      width: 18px; height: 18px;
      color: var(--accent);
    }
    .status {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 12px; font-weight: 600; color: var(--muted);
    }
    .dot { width: 10px; height: 10px; border-radius: 50%; background: var(--warn); transition: background 200ms ease; }
    .status.ok  .dot { background: var(--ok); }
    .status.ok  span:last-child { color: var(--ok); }
    .status.err .dot { background: var(--danger); }
    .status.err span:last-child { color: var(--danger); }

    main { padding: 0 var(--gap) var(--gap); display: flex; flex-direction: column; gap: var(--gap); flex: 1; }

    .island {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow-island);
      padding: var(--gap);
    }
    .island-title {
      font-size: 11px; font-weight: 700; color: var(--muted);
      letter-spacing: 0.8px; text-transform: uppercase;
      margin: 0 0 var(--gap) 0;
    }
    .row { display: grid; gap: var(--gap); }
    .row.cols-2 { grid-template-columns: 1fr 1fr; }
    .row.cols-3 { grid-template-columns: 1fr 1fr 1fr; }

    button {
      font: inherit; color: inherit;
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 12px 8px;
      cursor: pointer;
      transition: background 80ms ease, transform 80ms ease, border-color 80ms ease;
      touch-action: manipulation;
      min-height: 60px;
      display: inline-flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 6px;
      font-size: 12px; font-weight: 600;
    }
    button .ico { width: 22px; height: 22px; stroke-width: 1.75; }
    button:active { transform: scale(0.97); background: var(--panel); }
    button[disabled] { opacity: 0.45; cursor: not-allowed; }
    button.primary {
      background: var(--accent); color: var(--on-accent); border-color: var(--accent);
    }
    button.primary:active { background: var(--accent-hover); }
    button.big   { min-height: 96px; font-size: 14px; }
    button.big .ico { width: 28px; height: 28px; stroke-width: 2; }
    button.flash { animation: tap-flash 180ms ease-out; }
    @keyframes tap-flash {
      0%   { box-shadow: 0 0 0 0 var(--accent); }
      100% { box-shadow: 0 0 0 12px rgba(105,101,219,0); }
    }
    button.danger {
      background: #fceeee; color: var(--danger); border-color: #f3c8c8;
    }
    @media (prefers-color-scheme: dark) {
      button.danger { background: #2a1f24; border-color: #5c2c2c; color: #f8d7d7; }
    }

    .footnote {
      text-align: center;
      padding: 8px 16px 16px;
      font-size: 11px;
      color: var(--muted);
    }

    /* Confirm overlay */
    .overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.55);
      display: none;
      align-items: center; justify-content: center;
      z-index: 50;
      padding: 24px;
    }
    .overlay.show { display: flex; }
    .overlay .card {
      background: var(--panel);
      border-radius: var(--radius);
      padding: 22px;
      max-width: 340px;
      width: 100%;
      box-shadow: var(--shadow-island);
      text-align: center;
    }
    .overlay h3 { margin: 0 0 8px 0; font-size: 16px; font-weight: 700; }
    .overlay p  { margin: 0 0 16px 0; font-size: 13px; color: var(--muted); line-height: 1.5; }
    .overlay .actions { display: flex; gap: 8px; }
    .overlay .actions button { flex: 1; min-height: 48px; flex-direction: row; }
  </style>
</head>
<body>
  <header>
    <h1>
      <!-- brand icon -->
      <svg class="brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <path d="M14 14h7v7"/>
        <path d="M14 17h4"/>
      </svg>
      Slide Remote
    </h1>
    <span class="status" id="status"><span class="dot"></span><span id="statusText">Connecting\u2026</span></span>
  </header>

  <main>
    <div class="island">
      <div class="island-title">Navigate</div>
      <div class="row cols-2">
        <button class="big" data-act="prev" aria-label="Previous">
          <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Prev
        </button>
        <button class="big primary" data-act="next" aria-label="Next">
          <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          Next
        </button>
      </div>
      <div class="row cols-3" style="margin-top: var(--gap)">
        <button data-act="first" aria-label="First slide">
          <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="5" x2="5" y2="19"/></svg>
          First
        </button>
        <button data-act="black"   id="btnBlack"   aria-label="Black screen">
          <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/></svg>
          Black
        </button>
        <button data-act="unblack" id="btnUnblack" class="danger" style="display:none" aria-label="Exit black">
          <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"/></svg>
          Exit
        </button>
        <button data-act="last" aria-label="Last slide">
          <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
          Last
        </button>
      </div>
    </div>

    <div class="island">
      <div class="island-title">Tools</div>
      <div class="row cols-3">
        <button data-act="notes"  aria-label="Speaker notes">
          <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>
          Notes
        </button>
        <button data-act="sticky" aria-label="Sticky note">
          <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z"/><polyline points="16 3 16 8 21 8"/></svg>
          Sticky
        </button>
        <button data-act="timer"  aria-label="Timer">
          <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><line x1="10" y1="1" x2="14" y2="1"/></svg>
          Timer
        </button>
      </div>
    </div>

    <button id="btnClose" class="danger" aria-label="Close session">
      <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      Close session
    </button>
  </main>

  <p class="footnote">Slide Remote \xB7 session locked to this URL</p>

  <div class="overlay" id="confirmEl">
    <div class="card">
      <h3 id="confirmTitle">Close session?</h3>
      <p id="confirmBody">Stops the LAN server on the desktop. You'll need a fresh QR to control again.</p>
      <div class="actions">
        <button id="confirmCancel">Cancel</button>
        <button id="confirmOk" class="danger">Close</button>
      </div>
    </div>
  </div>

  <script>
  (function() {
    var TOKEN = ${JSON.stringify(r)};
    var statusEl = document.getElementById("status");
    var statusText = document.getElementById("statusText");
    var btnBlack   = document.getElementById("btnBlack");
    var btnUnblack = document.getElementById("btnUnblack");

    function setStatus(kind, msg) {
      statusEl.classList.remove("ok", "err");
      if (kind === "ok")  statusEl.classList.add("ok");
      if (kind === "err") statusEl.classList.add("err");
      statusText.textContent = msg;
    }
    function flash(btn) {
      btn.classList.remove("flash");
      void btn.offsetWidth;
      btn.classList.add("flash");
    }
    async function send(action, btn) {
      try {
        if (btn) flash(btn);
        var r = await fetch("/api/cmd", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: TOKEN, action: action })
        });
        if (!r.ok) throw new Error("HTTP " + r.status);
        setStatus("ok", "Connected");
      } catch (e) {
        setStatus("err", "Send failed");
      }
    }
    document.querySelectorAll("button[data-act]").forEach(function(btn) {
      btn.addEventListener("click", function() { send(btn.getAttribute("data-act"), btn); });
    });

    var confirmEl   = document.getElementById("confirmEl");
    var confirmOk   = document.getElementById("confirmOk");
    var confirmCxl  = document.getElementById("confirmCancel");
    var btnClose    = document.getElementById("btnClose");
    var pendingAction = null;
    function openConfirm(title, body, action) {
      document.getElementById("confirmTitle").textContent = title;
      document.getElementById("confirmBody").textContent  = body;
      pendingAction = action;
      confirmEl.classList.add("show");
    }
    function closeConfirm() {
      confirmEl.classList.remove("show");
      pendingAction = null;
    }
    btnClose.addEventListener("click", function() {
      openConfirm(
        "Close session?",
        "Stops the LAN server on the desktop. You will need a fresh QR to control again.",
        "close-session"
      );
    });
    confirmCxl.addEventListener("click", closeConfirm);
    confirmOk.addEventListener("click", function() {
      if (pendingAction) send(pendingAction);
      closeConfirm();
    });

    var backoff = 500;
    function openStream() {
      try {
        var es = new EventSource("/api/events?token=" + encodeURIComponent(TOKEN));
        es.onopen  = function() { setStatus("ok", "Connected"); backoff = 500; };
        es.onerror = function() {
          setStatus("err", "Reconnecting\u2026");
          es.close();
          setTimeout(openStream, backoff);
          backoff = Math.min(backoff * 2, 5000);
        };
        es.addEventListener("hello", function() { setStatus("ok", "Connected"); });
        es.addEventListener("black", function(ev) {
          var on = (ev.data === "1");
          btnBlack.style.display   = on ? "none" : "";
          btnUnblack.style.display = on ? "" : "none";
        });
        es.addEventListener("clients", function(ev) {
          var n = parseInt(ev.data, 10);
          if (!isFinite(n)) return;
          statusText.textContent = "Connected \xB7 " + n + " device" + (n === 1 ? "" : "s");
        });
        es.addEventListener("closing", function() {
          setStatus("err", "Session closed by host");
          document.querySelectorAll("button[data-act]").forEach(function(b){ b.disabled = true; });
          btnClose.disabled = true;
        });
      } catch (e) {
        setTimeout(openStream, backoff);
      }
    }
    openStream();

    if ("wakeLock" in navigator) {
      var wl;
      var req = async function() {
        try { wl = await navigator.wakeLock.request("screen"); } catch {}
      };
      req();
      document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === "visible") req();
      });
    }
  })();
  <\/script>
</body>
</html>`}var rr=["next","prev","first","last","black","unblack","notes","sticky","thumbs","pen","clear-ink","help","spotlight","timer","fullscreen","close-session"],Kt=class{constructor(t=20,e=1e3){this.limit=t;this.windowMs=e;this.buckets=new Map}allow(t){let e=Date.now(),n=this.buckets.get(t);return(!n||n.reset<e)&&(n={count:0,reset:e+this.windowMs},this.buckets.set(t,n)),n.count++,n.count<=this.limit}reset(){this.buckets.clear()}},ut=class{constructor(t,e,n,o=()=>{},s=()=>{},i=()=>{}){this.settings=t;this.controller=e;this.onLog=n;this.onCloseRequested=o;this.onClientConnect=s;this.onClientDisconnect=i;this.server=null;this.sseClients=new Set;this.session=null;this.rateLimit=new Kt;this.heartbeats=new Set}getSession(){return this.session?Object.freeze({...this.session}):null}getRemoteURL(){if(!this.session)return null;let{ip:t,port:e,token:n}=this.session;return`http://${t}:${e}/?token=${encodeURIComponent(n)}`}isRunning(){return this.server!==null}async start(){if(this.session)return this.session;let t=ct(),e=Math.max(1024,Math.min(65535,this.settings.portMin|0)),n=Math.max(e,Math.min(65535,this.settings.portMax|0)),o=await $e(e,n);o===0&&(o=0);let s=this.settings.permanentSecret&&this.settings.permanentSecret.length>=8?this.settings.permanentSecret:(0,We.randomBytes)(16).toString("hex"),i=Ge.createServer((l,c)=>{this.route(l,c).catch(u=>{this.onLog("route error: "+(u?.message||u)),this.json(c,500,{error:"internal"})})});i.on("error",l=>{this.onLog("server error: "+(l?.message||l))}),await new Promise((l,c)=>{let u=h=>{i.off("listening",m),c(h)},m=()=>{i.off("error",u),l()};i.once("error",u),i.once("listening",m),i.listen(o,"0.0.0.0")});let a=i.address().port;return this.server=i,this.session={token:s,port:a,ip:t,startedAt:Date.now()},this.onLog(`listening on http://${t}:${a}`),this.session}async stop(){if(!this.server)return;let t=this.session?.port??0;for(let e of this.heartbeats)try{clearInterval(e)}catch{}this.heartbeats.clear();for(let e of this.sseClients)try{e.end()}catch{}if(this.sseClients.clear(),this.rateLimit.reset(),await new Promise(e=>{this.server.close(()=>e()),setTimeout(()=>{try{this.server.closeAllConnections?.()}catch{}},250)}),this.server=null,this.session=null,t>0){let e=await Ht(t);this.onLog(e?`stopped (port ${t} released)`:`stopped (port ${t} still busy \u2014 likely TIME_WAIT, will recover shortly)`)}else this.onLog("stopped")}broadcastBlack(t){for(let e of this.sseClients)try{e.write(`event: black
data: ${t?"1":"0"}

`)}catch{}}async route(t,e){e.setHeader("X-Content-Type-Options","nosniff"),e.setHeader("Cache-Control","no-store");let n=new URL(t.url||"/","http://localhost"),o=n.pathname;if(t.method==="GET"&&o==="/")return this.servePage(t,e,n);if(t.method==="GET"&&o==="/api/state")return this.checkToken(t,n)?this.json(e,200,{ok:!0,black:this.controller.isBlack(),startedAt:this.session?.startedAt??0}):this.json(e,401,{error:"unauthorized"});if(t.method==="POST"&&o==="/api/cmd"){let s=t.socket.remoteAddress||"?";return this.rateLimit.allow(s)?this.handleCmd(t,e):this.json(e,429,{error:"rate_limited"})}if(t.method==="GET"&&o==="/api/events")return this.checkToken(t,n)?this.openStream(t,e):this.json(e,401,{error:"unauthorized"});if(t.method==="GET"&&o==="/api/qr")return this.serveQR(e);if(t.method==="GET"&&o==="/healthz")return this.json(e,200,{ok:!0});this.json(e,404,{error:"not_found"})}servePage(t,e,n){let o=n.searchParams.get("token")||"";if(!this.session||o!==this.session.token){e.statusCode=401,e.setHeader("Content-Type","text/html; charset=utf-8"),e.end("<!doctype html><meta charset=utf-8><title>Unauthorized</title><style>body{font:14px system-ui;padding:24px;color:#333}</style><h1>Unauthorized</h1><p>Bad or missing session token. Reopen the QR code on the desktop and rescan.</p>");return}e.statusCode=200,e.setHeader("Content-Type","text/html; charset=utf-8"),e.end(Ye(o))}async handleCmd(t,e){let n="",o=!1;if(await new Promise(l=>{t.on("data",c=>{if(!o){if(n.length+c.length>4096){o=!0;return}n+=c}}),t.on("end",()=>l()),t.on("error",()=>l())}),o)return this.json(e,413,{error:"payload_too_large"});let s;try{s=JSON.parse(n||"{}")}catch{return this.json(e,400,{error:"bad_json"})}if(!this.checkToken(t,null,s.token))return this.json(e,401,{error:"unauthorized"});let i=s.action;if(!i||!rr.includes(i))return this.json(e,400,{error:"bad_action"});let a=i;if(a==="close-session"){this.json(e,200,{ok:!0,closing:!0}),this.broadcastClosing(),setTimeout(()=>{try{this.onCloseRequested()}catch(l){this.onLog("onCloseRequested failed: "+l)}},50);return}this.controller.handle(a),(a==="black"||a==="unblack")&&this.broadcastBlack(a==="black"),this.json(e,200,{ok:!0})}broadcastClosing(){for(let t of this.sseClients)try{t.write(`event: closing
data: 1

`)}catch{}}openStream(t,e){e.statusCode=200,e.setHeader("Content-Type","text/event-stream"),e.setHeader("Cache-Control","no-cache, no-transform"),e.setHeader("Connection","keep-alive"),e.setHeader("X-Accel-Buffering","no"),e.write(`event: hello
data: 1

`),e.write(`event: black
data: ${this.controller.isBlack()?"1":"0"}

`),this.sseClients.add(e);let n=this.labelFor(t);this.broadcastClients();try{this.onClientConnect(n,this.sseClients.size)}catch{}let o=setInterval(()=>{try{e.write(`: ping

`)}catch{}},15e3);this.heartbeats.add(o),t.on("close",()=>{clearInterval(o),this.heartbeats.delete(o),this.sseClients.delete(e),this.broadcastClients();try{this.onClientDisconnect(n,this.sseClients.size)}catch{}})}labelFor(t){let e=(t.socket.remoteAddress||"?").replace(/^::ffff:/,""),o=(t.headers["user-agent"]||"").toString().match(/\(([^)]+)\)/);return`${o?o[1].split(";")[0].trim():"device"} (${e})`}broadcastClients(){let t=this.sseClients.size;for(let e of this.sseClients)try{e.write(`event: clients
data: ${t}

`)}catch{}}checkToken(t,e,n){if(!this.session)return!1;let o=this.session.token,s=e?e.searchParams.get("token"):null,i=(t.headers.authorization||"").trim(),a=i.toLowerCase().startsWith("bearer ")?i.slice(7):null,l=n||s||a||"";if(!l||l.length!==o.length)return!1;let c=0;for(let u=0;u<o.length;u++)c|=l.charCodeAt(u)^o.charCodeAt(u);return c===0}json(t,e,n){t.statusCode=e,t.setHeader("Content-Type","application/json"),t.end(JSON.stringify(n))}async serveQR(t){let e=this.getRemoteURL();if(!e){this.json(t,503,{error:"no_session"});return}try{let n=await Xe.toBuffer(e,{type:"png",width:360,margin:1,errorCorrectionLevel:"M",color:{dark:"#000000",light:"#ffffff"}});t.statusCode=200,t.setHeader("Content-Type","image/png"),t.setHeader("Content-Length",String(n.length)),t.end(n)}catch(n){this.onLog("qr render failed: "+n?.message),this.json(t,500,{error:"qr_failed"})}}};var y=require("obsidian");var dt=class extends y.PluginSettingTab{constructor(e,n){super(e,n);this.plugin=n}display(){let{containerEl:e}=this;e.empty(),e.createEl("h2",{text:"Slide Remote"}),new y.Setting(e).setName("Auto-start server").setDesc("Start the LAN server when you open the QR for the first time.").addToggle(i=>i.setValue(this.plugin.settings.autoStart).onChange(async a=>{this.plugin.settings.autoStart=a,await this.plugin.saveSettings()})),new y.Setting(e).setName("Preferred port range").setDesc("First free port in this range is used. Out of range = OS-assigned port.").addText(i=>i.setPlaceholder("28000").setValue(String(this.plugin.settings.portMin)).onChange(async a=>{let l=parseInt(a,10);Number.isFinite(l)&&l>0&&(this.plugin.settings.portMin=l,await this.plugin.saveSettings())})).addText(i=>i.setPlaceholder("28099").setValue(String(this.plugin.settings.portMax)).onChange(async a=>{let l=parseInt(a,10);Number.isFinite(l)&&l>0&&(this.plugin.settings.portMax=l,await this.plugin.saveSettings())})),new y.Setting(e).setName("Permanent secret (optional)").setDesc("If set (>= 8 chars), used as the token in place of a random one. Means the same QR URL keeps working across sessions \u2014 convenient, less secure.").addText(i=>i.setPlaceholder("(generate per session)").setValue(this.plugin.settings.permanentSecret).onChange(async a=>{this.plugin.settings.permanentSecret=a,await this.plugin.saveSettings()})),e.createEl("h3",{text:"Status"});let n=this.plugin.server.getSession(),o=this.plugin.server.getRemoteURL(),s=n?.ip||ct();this.plugin.settings.lastKnownIP=s,this.plugin.saveSettings(),new y.Setting(e).setName("LAN IP").setDesc(s),n&&o?(new y.Setting(e).setName("Active session").setDesc(`Port ${n.port} \xB7 started ${new Date(n.startedAt).toLocaleTimeString()}`),new y.Setting(e).setName("Remote URL").setDesc(o).addButton(i=>i.setButtonText("Open QR").setCta().onClick(()=>this.plugin.openQR())).addButton(i=>i.setButtonText("Test page").onClick(()=>{let a=window.open;a(o,"_blank")})).addButton(i=>{let a=!1;return i.setButtonText("Stop server").setWarning().onClick(async()=>{if(a){await this.plugin.stopServer(),this.display(),new y.Notice("Slide Remote: server stopped");return}a=!0,i.setButtonText("Click again to confirm"),setTimeout(()=>{if(a){a=!1;try{i.setButtonText("Stop server")}catch{}}},2e3)}),i})):new y.Setting(e).setName("Server").setDesc("Not running").addButton(i=>i.setButtonText("Start server").setCta().onClick(async()=>{await this.plugin.startServer(),this.display()}))}};var E=require("obsidian"),Ze=j(jt()),ft=class extends E.Modal{constructor(e,n,o){super(e);this.url=n;this.onCloseServer=o;this.confirmArmed=!1;this.canvas=document.createElement("canvas")}onOpen(){this.titleEl.setText("Slide Remote \u2014 scan from your phone");let e=this.contentEl.createDiv({cls:"slide-remote-qr-wrap"});e.appendChild(this.canvas),Ze.toCanvas(this.canvas,this.url,{width:320,margin:1,errorCorrectionLevel:"M",color:{dark:"#000000",light:"#ffffff"}}).catch(s=>{new E.Notice("QR render failed: "+s.message)}),e.createDiv({cls:"slide-remote-qr-url"}).setText(this.url),new E.Setting(e).addButton(s=>s.setButtonText("Copy URL").setCta().onClick(async()=>{try{await navigator.clipboard.writeText(this.url),new E.Notice("URL copied")}catch{new E.Notice("Clipboard unavailable")}})).addButton(s=>(s.setButtonText("Close server").setWarning().onClick(async()=>{if(this.confirmArmed){new E.Notice("Slide Remote: server stopping\u2026"),await this.onCloseServer(),this.close();return}this.confirmArmed=!0,s.setButtonText("Click again to confirm"),setTimeout(()=>{if(this.confirmArmed){this.confirmArmed=!1;try{s.setButtonText("Close server")}catch{}}},2e3)}),s)).addButton(s=>s.setButtonText("Done").onClick(()=>this.close())),e.createDiv({cls:"slide-remote-qr-help"}).setText("Phone and laptop must be on the same Wi-Fi. Open the URL on your phone (or scan), then use the on-screen buttons. Close the server from here or from the phone when you're done.")}onClose(){this.contentEl.empty()}};var ht=class extends v.Plugin{constructor(){super(...arguments);this.settings={...wt};this.statusBarEl=null}async onload(){await this.loadSettings(),this.controller=new W(this.app),this.server=new ut(this.settings,this.controller,e=>console.log("[slide-remote]",e),()=>{this.stopServer().then(()=>{new v.Notice("Slide Remote: session closed from phone")})},(e,n)=>{new v.Notice(`Slide Remote: ${e} connected (${n} device${n===1?"":"s"})`,3e3),this.refreshStatusBar()},(e,n)=>{new v.Notice(`Slide Remote: ${e} disconnected (${n} device${n===1?"":"s"} left)`,3e3),this.refreshStatusBar()}),this.addSettingTab(new dt(this.app,this)),this.addCommand({id:"open-qr",name:"Open QR code for remote",callback:()=>this.openQR()}),this.addCommand({id:"start-server",name:"Start remote server",callback:async()=>{await this.startServer(),new v.Notice("Slide Remote: server started")}}),this.addCommand({id:"stop-server",name:"Stop remote server",callback:async()=>{await this.stopServer(),new v.Notice("Slide Remote: server stopped")}}),this.addCommand({id:"toggle-black",name:"Toggle black screen",callback:()=>{let e=this.controller.isBlack();this.controller.handle(e?"unblack":"black"),this.server.broadcastBlack(!e)}}),this.addRibbonIcon("qr-code","Slide Remote \u2014 open QR",()=>this.openQR()),this.statusBarEl=this.addStatusBarItem(),this.refreshStatusBar(),this.registerInterval(window.setInterval(()=>this.refreshStatusBar(),4e3))}async onunload(){try{this.controller?.cleanup()}catch{}try{await this.server?.stop()}catch(e){console.warn("[slide-remote] stop failed",e)}}async loadSettings(){let e=await this.loadData()||{};this.settings={...wt,...e}}async saveSettings(){await this.saveData(this.settings)}async startServer(){if(!this.server.isRunning())try{await this.server.start(),this.refreshStatusBar()}catch(e){let n=e?.message||String(e);new v.Notice("Slide Remote: failed to start server \u2014 "+n,6e3),console.error("[slide-remote] start failed",e)}}async stopServer(){try{await this.server.stop()}finally{this.refreshStatusBar()}}async openQR(){if(!this.server.isRunning()){if(!this.settings.autoStart){new v.Notice("Slide Remote: server is off. Run 'Start remote server' first.");return}if(await this.startServer(),!this.server.isRunning())return}let e=this.server.getRemoteURL();if(!e){new v.Notice("Slide Remote: no active session");return}new ft(this.app,e,async()=>{await this.stopServer()}).open()}refreshStatusBar(){if(!this.statusBarEl)return;let e=this.server.getSession();e?(this.statusBarEl.setText(`\u{1F4F1} Remote ${e.ip}:${e.port}`),this.statusBarEl.setAttr("title","Slide Remote running \u2014 click to open QR"),this.statusBarEl.onclick=()=>this.openQR(),this.statusBarEl.style.cursor="pointer"):(this.statusBarEl.setText("\u{1F4F1} Remote off"),this.statusBarEl.setAttr("title","Slide Remote \u2014 click to start + open QR"),this.statusBarEl.onclick=()=>this.openQR(),this.statusBarEl.style.cursor="pointer")}};
