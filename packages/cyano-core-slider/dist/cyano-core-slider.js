!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).cyanoCoreSlider=t.cyanoCoreSlider||{})}(this,function(t){"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function n(t,e){if(null==t)return{};var n,i,r=function(t,e){if(null==t)return{};var n,i,r={},o=Object.keys(t);for(i=0;i<o.length;i++)n=o[i],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(i=0;i<o.length;i++)n=o[i],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],i=!0,r=!1,o=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(n.push(s.value),!e||n.length!==e);i=!0);}catch(t){r=!0,o=t}finally{try{i||null==a.return||a.return()}finally{if(r)throw o}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var r={slider:"mithril-slider",content:"mithril-slider__content",before:"mithril-slider__before",after:"mithril-slider__after"};function o(t,n){if(1!=arguments.length){if(null==t)return arguments.length>2?o.call.apply(o,arguments):n;t=s(t);for(var i=1;i<arguments.length;n=arguments[++i])for(var r in n)n.hasOwnProperty(r)&&(n[r]==o?delete t[r]:t[r]=n[r]instanceof o?n[r].apply("object"==e(t[r])?s(t[r]):t[r]):n[r]);return t}if(!(this instanceof o))return new o(t);this.apply="function"==typeof t?t:function(e){return o(null!=e?e:{},t)}}function s(t){var e=new t.constructor;for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}!function(t,n,i,r){var o,s=["","webkit","Moz","MS","ms","o"],a=n.createElement("div"),u="function",c=Math.round,h=Math.abs,l=Date.now;function f(t,e,n){return setTimeout(T(t,n),e)}function p(t,e,n){return!!Array.isArray(t)&&(d(t,n[e],n),!0)}function d(t,e,n){var i;if(t)if(t.forEach)t.forEach(e,n);else if(t.length!==r)for(i=0;i<t.length;)e.call(n,t[i],i,t),i++;else for(i in t)t.hasOwnProperty(i)&&e.call(n,t[i],i,t)}function v(e,n,i){var r="DEPRECATED METHOD: "+n+"\n"+i+" AT \n";return function(){var n=new Error("get-stack-trace"),i=n&&n.stack?n.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",o=t.console&&(t.console.warn||t.console.log);return o&&o.call(t.console,r,i),e.apply(this,arguments)}}o="function"!=typeof Object.assign?function(t){if(t===r||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var i=arguments[n];if(i!==r&&null!==i)for(var o in i)i.hasOwnProperty(o)&&(e[o]=i[o])}return e}:Object.assign;var m=v(function(t,e,n){for(var i=Object.keys(e),o=0;o<i.length;)(!n||n&&t[i[o]]===r)&&(t[i[o]]=e[i[o]]),o++;return t},"extend","Use `assign`."),g=v(function(t,e){return m(t,e,!0)},"merge","Use `assign`.");function y(t,e,n){var i,r=e.prototype;(i=t.prototype=Object.create(r)).constructor=t,i._super=r,n&&o(i,n)}function T(t,e){return function(){return t.apply(e,arguments)}}function E(t,n){return e(t)==u?t.apply(n&&n[0]||r,n):t}function b(t,e){return t===r?e:t}function I(t,e,n){d(C(e),function(e){t.addEventListener(e,n,!1)})}function S(t,e,n){d(C(e),function(e){t.removeEventListener(e,n,!1)})}function x(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function _(t,e){return t.indexOf(e)>-1}function C(t){return t.trim().split(/\s+/g)}function P(t,e,n){if(t.indexOf&&!n)return t.indexOf(e);for(var i=0;i<t.length;){if(n&&t[i][n]==e||!n&&t[i]===e)return i;i++}return-1}function A(t){return Array.prototype.slice.call(t,0)}function w(t,e,n){for(var i=[],r=[],o=0;o<t.length;){var s=e?t[o][e]:t[o];P(r,s)<0&&i.push(t[o]),r[o]=s,o++}return n&&(i=e?i.sort(function(t,n){return t[e]>n[e]}):i.sort()),i}function O(t,e){for(var n,i,o=e[0].toUpperCase()+e.slice(1),a=0;a<s.length;){if((i=(n=s[a])?n+o:e)in t)return i;a++}return r}var D=1;function R(e){var n=e.ownerDocument||e;return n.defaultView||n.parentWindow||t}var N="ontouchstart"in t,z=O(t,"PointerEvent")!==r,M=N&&/mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),X=25,Y=1,F=2,L=4,H=8,W=1,j=2,k=4,q=8,B=16,V=j|k,U=q|B,G=V|U,Z=["x","y"],$=["clientX","clientY"];function J(t,e){var n=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){E(t.options.enable,[t])&&n.handler(e)},this.init()}function K(t,e,n){var i=n.pointers.length,o=n.changedPointers.length,s=e&Y&&i-o==0,a=e&(L|H)&&i-o==0;n.isFirst=!!s,n.isFinal=!!a,s&&(t.session={}),n.eventType=e,function(t,e){var n=t.session,i=e.pointers,o=i.length;n.firstInput||(n.firstInput=Q(e));o>1&&!n.firstMultiple?n.firstMultiple=Q(e):1===o&&(n.firstMultiple=!1);var s=n.firstInput,a=n.firstMultiple,u=a?a.center:s.center,c=e.center=tt(i);e.timeStamp=l(),e.deltaTime=e.timeStamp-s.timeStamp,e.angle=rt(u,c),e.distance=it(u,c),function(t,e){var n=e.center,i=t.offsetDelta||{},r=t.prevDelta||{},o=t.prevInput||{};e.eventType!==Y&&o.eventType!==L||(r=t.prevDelta={x:o.deltaX||0,y:o.deltaY||0},i=t.offsetDelta={x:n.x,y:n.y});e.deltaX=r.x+(n.x-i.x),e.deltaY=r.y+(n.y-i.y)}(n,e),e.offsetDirection=nt(e.deltaX,e.deltaY);var f=et(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=f.x,e.overallVelocityY=f.y,e.overallVelocity=h(f.x)>h(f.y)?f.x:f.y,e.scale=a?(p=a.pointers,d=i,it(d[0],d[1],$)/it(p[0],p[1],$)):1,e.rotation=a?function(t,e){return rt(e[1],e[0],$)+rt(t[1],t[0],$)}(a.pointers,i):0,e.maxPointers=n.prevInput?e.pointers.length>n.prevInput.maxPointers?e.pointers.length:n.prevInput.maxPointers:e.pointers.length,function(t,e){var n,i,o,s,a=t.lastInterval||e,u=e.timeStamp-a.timeStamp;if(e.eventType!=H&&(u>X||a.velocity===r)){var c=e.deltaX-a.deltaX,l=e.deltaY-a.deltaY,f=et(u,c,l);i=f.x,o=f.y,n=h(f.x)>h(f.y)?f.x:f.y,s=nt(c,l),t.lastInterval=e}else n=a.velocity,i=a.velocityX,o=a.velocityY,s=a.direction;e.velocity=n,e.velocityX=i,e.velocityY=o,e.direction=s}(n,e);var p,d;var v=t.element;x(e.srcEvent.target,v)&&(v=e.srcEvent.target);e.target=v}(t,n),t.emit("hammer.input",n),t.recognize(n),t.session.prevInput=n}function Q(t){for(var e=[],n=0;n<t.pointers.length;)e[n]={clientX:c(t.pointers[n].clientX),clientY:c(t.pointers[n].clientY)},n++;return{timeStamp:l(),pointers:e,center:tt(e),deltaX:t.deltaX,deltaY:t.deltaY}}function tt(t){var e=t.length;if(1===e)return{x:c(t[0].clientX),y:c(t[0].clientY)};for(var n=0,i=0,r=0;r<e;)n+=t[r].clientX,i+=t[r].clientY,r++;return{x:c(n/e),y:c(i/e)}}function et(t,e,n){return{x:e/t||0,y:n/t||0}}function nt(t,e){return t===e?W:h(t)>=h(e)?t<0?j:k:e<0?q:B}function it(t,e,n){n||(n=Z);var i=e[n[0]]-t[n[0]],r=e[n[1]]-t[n[1]];return Math.sqrt(i*i+r*r)}function rt(t,e,n){n||(n=Z);var i=e[n[0]]-t[n[0]],r=e[n[1]]-t[n[1]];return 180*Math.atan2(r,i)/Math.PI}J.prototype={handler:function(){},init:function(){this.evEl&&I(this.element,this.evEl,this.domHandler),this.evTarget&&I(this.target,this.evTarget,this.domHandler),this.evWin&&I(R(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&S(this.element,this.evEl,this.domHandler),this.evTarget&&S(this.target,this.evTarget,this.domHandler),this.evWin&&S(R(this.element),this.evWin,this.domHandler)}};var ot={mousedown:Y,mousemove:F,mouseup:L},st="mousedown",at="mousemove mouseup";function ut(){this.evEl=st,this.evWin=at,this.pressed=!1,J.apply(this,arguments)}y(ut,J,{handler:function(t){var e=ot[t.type];e&Y&&0===t.button&&(this.pressed=!0),e&F&&1!==t.which&&(e=L),this.pressed&&(e&L&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:"mouse",srcEvent:t}))}});var ct={pointerdown:Y,pointermove:F,pointerup:L,pointercancel:H,pointerout:H},ht={2:"touch",3:"pen",4:"mouse",5:"kinect"},lt="pointerdown",ft="pointermove pointerup pointercancel";function pt(){this.evEl=lt,this.evWin=ft,J.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}t.MSPointerEvent&&!t.PointerEvent&&(lt="MSPointerDown",ft="MSPointerMove MSPointerUp MSPointerCancel"),y(pt,J,{handler:function(t){var e=this.store,n=!1,i=t.type.toLowerCase().replace("ms",""),r=ct[i],o=ht[t.pointerType]||t.pointerType,s="touch"==o,a=P(e,t.pointerId,"pointerId");r&Y&&(0===t.button||s)?a<0&&(e.push(t),a=e.length-1):r&(L|H)&&(n=!0),a<0||(e[a]=t,this.callback(this.manager,r,{pointers:e,changedPointers:[t],pointerType:o,srcEvent:t}),n&&e.splice(a,1))}});var dt={touchstart:Y,touchmove:F,touchend:L,touchcancel:H},vt="touchstart",mt="touchstart touchmove touchend touchcancel";function gt(){this.evTarget=vt,this.evWin=mt,this.started=!1,J.apply(this,arguments)}y(gt,J,{handler:function(t){var e=dt[t.type];if(e===Y&&(this.started=!0),this.started){var n=function(t,e){var n=A(t.touches),i=A(t.changedTouches);e&(L|H)&&(n=w(n.concat(i),"identifier",!0));return[n,i]}.call(this,t,e);e&(L|H)&&n[0].length-n[1].length==0&&(this.started=!1),this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:"touch",srcEvent:t})}}});var yt={touchstart:Y,touchmove:F,touchend:L,touchcancel:H},Tt="touchstart touchmove touchend touchcancel";function Et(){this.evTarget=Tt,this.targetIds={},J.apply(this,arguments)}y(Et,J,{handler:function(t){var e=yt[t.type],n=function(t,e){var n=A(t.touches),i=this.targetIds;if(e&(Y|F)&&1===n.length)return i[n[0].identifier]=!0,[n,n];var r,o,s=A(t.changedTouches),a=[],u=this.target;if(o=n.filter(function(t){return x(t.target,u)}),e===Y)for(r=0;r<o.length;)i[o[r].identifier]=!0,r++;r=0;for(;r<s.length;)i[s[r].identifier]&&a.push(s[r]),e&(L|H)&&delete i[s[r].identifier],r++;if(!a.length)return;return[w(o.concat(a),"identifier",!0),a]}.call(this,t,e);n&&this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:"touch",srcEvent:t})}});var bt=2500,It=25;function St(){J.apply(this,arguments);var t=T(this.handler,this);this.touch=new Et(this.manager,t),this.mouse=new ut(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}function xt(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var n={x:e.clientX,y:e.clientY};this.lastTouches.push(n);var i=this.lastTouches;setTimeout(function(){var t=i.indexOf(n);t>-1&&i.splice(t,1)},bt)}}y(St,J,{handler:function(t,e,n){var i="touch"==n.pointerType,r="mouse"==n.pointerType;if(!(r&&n.sourceCapabilities&&n.sourceCapabilities.firesTouchEvents)){if(i)(function(t,e){t&Y?(this.primaryTouch=e.changedPointers[0].identifier,xt.call(this,e)):t&(L|H)&&xt.call(this,e)}).call(this,e,n);else if(r&&function(t){for(var e=t.srcEvent.clientX,n=t.srcEvent.clientY,i=0;i<this.lastTouches.length;i++){var r=this.lastTouches[i],o=Math.abs(e-r.x),s=Math.abs(n-r.y);if(o<=It&&s<=It)return!0}return!1}.call(this,n))return;this.callback(t,e,n)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var _t=O(a.style,"touchAction"),Ct=_t!==r,Pt="auto",At="manipulation",wt="none",Ot="pan-x",Dt="pan-y",Rt=function(){if(!Ct)return!1;var e={},n=t.CSS&&t.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(i){e[i]=!n||t.CSS.supports("touch-action",i)}),e}();function Nt(t,e){this.manager=t,this.set(e)}Nt.prototype={set:function(t){"compute"==t&&(t=this.compute()),Ct&&this.manager.element.style&&Rt[t]&&(this.manager.element.style[_t]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return d(this.manager.recognizers,function(e){E(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),function(t){if(_(t,wt))return wt;var e=_(t,Ot),n=_(t,Dt);if(e&&n)return wt;if(e||n)return e?Ot:Dt;if(_(t,At))return At;return Pt}(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,n=t.offsetDirection;if(this.manager.session.prevented)e.preventDefault();else{var i=this.actions,r=_(i,wt)&&!Rt[wt],o=_(i,Dt)&&!Rt[Dt],s=_(i,Ot)&&!Rt[Ot];if(r){var a=1===t.pointers.length,u=t.distance<2,c=t.deltaTime<250;if(a&&u&&c)return}if(!s||!o)return r||o&&n&V||s&&n&U?this.preventSrc(e):void 0}},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var zt=1,Mt=2,Xt=4,Yt=8,Ft=Yt,Lt=16;function Ht(t){this.options=o({},this.defaults,t||{}),this.id=D++,this.manager=null,this.options.enable=b(this.options.enable,!0),this.state=zt,this.simultaneous={},this.requireFail=[]}function Wt(t){return t&Lt?"cancel":t&Yt?"end":t&Xt?"move":t&Mt?"start":""}function jt(t){return t==B?"down":t==q?"up":t==j?"left":t==k?"right":""}function kt(t,e){var n=e.manager;return n?n.get(t):t}function qt(){Ht.apply(this,arguments)}function Bt(){qt.apply(this,arguments),this.pX=null,this.pY=null}function Vt(){qt.apply(this,arguments)}function Ut(){Ht.apply(this,arguments),this._timer=null,this._input=null}function Gt(){qt.apply(this,arguments)}function Zt(){qt.apply(this,arguments)}function $t(){Ht.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function Jt(t,e){return(e=e||{}).recognizers=b(e.recognizers,Jt.defaults.preset),new Kt(t,e)}Ht.prototype={defaults:{},set:function(t){return o(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(p(t,"recognizeWith",this))return this;var e=this.simultaneous;return e[(t=kt(t,this)).id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return p(t,"dropRecognizeWith",this)?this:(t=kt(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(p(t,"requireFailure",this))return this;var e=this.requireFail;return-1===P(e,t=kt(t,this))&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(p(t,"dropRequireFailure",this))return this;t=kt(t,this);var e=P(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){var e=this,n=this.state;function i(n){e.manager.emit(n,t)}n<Yt&&i(e.options.event+Wt(n)),i(e.options.event),t.additionalEvent&&i(t.additionalEvent),n>=Yt&&i(e.options.event+Wt(n))},tryEmit:function(t){if(this.canEmit())return this.emit(t);this.state=32},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(32|zt)))return!1;t++}return!0},recognize:function(t){var e=o({},t);if(!E(this.options.enable,[this,e]))return this.reset(),void(this.state=32);this.state&(Ft|Lt|32)&&(this.state=zt),this.state=this.process(e),this.state&(Mt|Xt|Yt|Lt)&&this.tryEmit(e)},process:function(t){},getTouchAction:function(){},reset:function(){}},y(qt,Ht,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,n=t.eventType,i=e&(Mt|Xt),r=this.attrTest(t);return i&&(n&H||!r)?e|Lt:i||r?n&L?e|Yt:e&Mt?e|Xt:Mt:32}}),y(Bt,qt,{defaults:{event:"pan",threshold:10,pointers:1,direction:G},getTouchAction:function(){var t=this.options.direction,e=[];return t&V&&e.push(Dt),t&U&&e.push(Ot),e},directionTest:function(t){var e=this.options,n=!0,i=t.distance,r=t.direction,o=t.deltaX,s=t.deltaY;return r&e.direction||(e.direction&V?(r=0===o?W:o<0?j:k,n=o!=this.pX,i=Math.abs(t.deltaX)):(r=0===s?W:s<0?q:B,n=s!=this.pY,i=Math.abs(t.deltaY))),t.direction=r,n&&i>e.threshold&&r&e.direction},attrTest:function(t){return qt.prototype.attrTest.call(this,t)&&(this.state&Mt||!(this.state&Mt)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=jt(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),y(Vt,qt,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[wt]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&Mt)},emit:function(t){if(1!==t.scale){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e}this._super.emit.call(this,t)}}),y(Ut,Ht,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[Pt]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,r=t.deltaTime>e.time;if(this._input=t,!i||!n||t.eventType&(L|H)&&!r)this.reset();else if(t.eventType&Y)this.reset(),this._timer=f(function(){this.state=Ft,this.tryEmit()},e.time,this);else if(t.eventType&L)return Ft;return 32},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===Ft&&(t&&t.eventType&L?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=l(),this.manager.emit(this.options.event,this._input)))}}),y(Gt,qt,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[wt]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&Mt)}}),y(Zt,qt,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:V|U,pointers:1},getTouchAction:function(){return Bt.prototype.getTouchAction.call(this)},attrTest:function(t){var e,n=this.options.direction;return n&(V|U)?e=t.overallVelocity:n&V?e=t.overallVelocityX:n&U&&(e=t.overallVelocityY),this._super.attrTest.call(this,t)&&n&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&h(e)>this.options.velocity&&t.eventType&L},emit:function(t){var e=jt(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),y($t,Ht,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[At]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,r=t.deltaTime<e.time;if(this.reset(),t.eventType&Y&&0===this.count)return this.failTimeout();if(i&&r&&n){if(t.eventType!=L)return this.failTimeout();var o=!this.pTime||t.timeStamp-this.pTime<e.interval,s=!this.pCenter||it(this.pCenter,t.center)<e.posThreshold;if(this.pTime=t.timeStamp,this.pCenter=t.center,s&&o?this.count+=1:this.count=1,this._input=t,0===this.count%e.taps)return this.hasRequireFailures()?(this._timer=f(function(){this.state=Ft,this.tryEmit()},e.interval,this),Mt):Ft}return 32},failTimeout:function(){return this._timer=f(function(){this.state=32},this.options.interval,this),32},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==Ft&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),Jt.VERSION="2.0.7",Jt.defaults={domEvents:!1,touchAction:"compute",enable:!0,inputTarget:null,inputClass:null,preset:[[Gt,{enable:!1}],[Vt,{enable:!1},["rotate"]],[Zt,{direction:V}],[Bt,{direction:V},["swipe"]],[$t],[$t,{event:"doubletap",taps:2},["tap"]],[Ut]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};function Kt(t,e){var n;this.options=o({},Jt.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=new((n=this).options.inputClass||(z?pt:M?Et:N?St:ut))(n,K),this.touchAction=new Nt(this,this.options.touchAction),Qt(this,!0),d(this.options.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function Qt(t,e){var n,i=t.element;i.style&&(d(t.options.cssProps,function(r,o){n=O(i.style,o),e?(t.oldCssProps[n]=i.style[n],i.style[n]=r):i.style[n]=t.oldCssProps[n]||""}),e||(t.oldCssProps={}))}Kt.prototype={set:function(t){return o(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?2:1},recognize:function(t){var e=this.session;if(!e.stopped){var n;this.touchAction.preventDefaults(t);var i=this.recognizers,r=e.curRecognizer;(!r||r&&r.state&Ft)&&(r=e.curRecognizer=null);for(var o=0;o<i.length;)n=i[o],2===e.stopped||r&&n!=r&&!n.canRecognizeWith(r)?n.reset():n.recognize(t),!r&&n.state&(Mt|Xt|Yt)&&(r=e.curRecognizer=n),o++}},get:function(t){if(t instanceof Ht)return t;for(var e=this.recognizers,n=0;n<e.length;n++)if(e[n].options.event==t)return e[n];return null},add:function(t){if(p(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(p(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,n=P(e,t);-1!==n&&(e.splice(n,1),this.touchAction.update())}return this},on:function(t,e){if(t!==r&&e!==r){var n=this.handlers;return d(C(t),function(t){n[t]=n[t]||[],n[t].push(e)}),this}},off:function(t,e){if(t!==r){var n=this.handlers;return d(C(t),function(t){e?n[t]&&n[t].splice(P(n[t],e),1):delete n[t]}),this}},emit:function(t,e){this.options.domEvents&&function(t,e){var i=n.createEvent("Event");i.initEvent(t,!0,!0),i.gesture=e,e.target.dispatchEvent(i)}(t,e);var i=this.handlers[t]&&this.handlers[t].slice();if(i&&i.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var r=0;r<i.length;)i[r](e),r++}},destroy:function(){this.element&&Qt(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},o(Jt,{INPUT_START:Y,INPUT_MOVE:F,INPUT_END:L,INPUT_CANCEL:H,STATE_POSSIBLE:zt,STATE_BEGAN:Mt,STATE_CHANGED:Xt,STATE_ENDED:Yt,STATE_RECOGNIZED:Ft,STATE_CANCELLED:Lt,STATE_FAILED:32,DIRECTION_NONE:W,DIRECTION_LEFT:j,DIRECTION_RIGHT:k,DIRECTION_UP:q,DIRECTION_DOWN:B,DIRECTION_HORIZONTAL:V,DIRECTION_VERTICAL:U,DIRECTION_ALL:G,Manager:Kt,Input:J,TouchAction:Nt,TouchInput:Et,MouseInput:ut,PointerEventInput:pt,TouchMouseInput:St,SingleTouchInput:gt,Recognizer:Ht,AttrRecognizer:qt,Tap:$t,Pan:Bt,Swipe:Zt,Pinch:Vt,Rotate:Gt,Press:Ut,on:I,off:S,each:d,merge:g,extend:m,assign:o,inherit:y,bindFn:T,prefixed:O}),(void 0!==t?t:"undefined"!=typeof self?self:{}).Hammer=Jt,"function"==typeof define&&define.amd?define(function(){return Jt}):"undefined"!=typeof module&&module.exports?module.exports=Jt:t.Hammer=Jt}(window,document);var a=function(t){var e=t.el,n=t.orientation,i=new Hammer.Manager(e,{});return i.add(new Hammer.Pan({direction:"vertical"===n?Hammer.DIRECTION_VERTICAL:"all"===n?Hammer.DIRECTION_ALL:Hammer.DIRECTION_HORIZONTAL,threshold:0})),i};t._Slider=function(t){var e=t.h,s=t.useReducer,u=t.useState,c=t.useEffect,h=t.useRef,l=t.getRef,f=n(t,["h","useReducer","useState","useEffect","useRef","getRef"]),p=i(s(o,{index:f.index||-1,list:[],groupBy:f.groupBy||1,pageSize:0}),2),d=p[0],v=h(function(t){return{setIndex:function(e){return t({index:e})},setList:function(e){return t({list:e})},setGroupBy:function(e){return t({groupBy:e})},setPageSize:function(e){return t({pageSize:e})}}}(p[1])).current;console.log("state",d);var m=i(u(),2),g=m[0],y=m[1],T=i(u(),2),E=T[0],b=T[1],I=h(),S=d.index,x=d.list,_=d.groupBy,C=d.pageSize,P=E?E.childNodes.length:0,A=parseInt(f.duration,10)||160,w=f.cancelDragFactor||.2,O="vertical"===f.orientation,D=f.rtl?-1:1,R=f.pageOffsetX||0,N=f.pageOffsetY||0,z=function(){return S>0},M=function(){return S+_<x.length},X=function(t,e){return t.childNodes[e]},Y=function(t,e){var n=t.style;n.transform=n["-webkit-transform"]=n["-moz-transform"]=n["-ms-transform"]=function(t){return"translate3d("+[O?"0":t+"px",O?t+"px":"0","0"].join(", ")+")"}(e)},F=function(t){E.style["-webkit-transition-duration"]=E.style["transition-duration"]=t+"ms"},L=function(t,e){t<0||t>x.length-1||(W(E),void 0!==e&&F(e),function(t){if(S!==t&&(v.setIndex(t),f.getState)){var e=X(E,S);f.getState({index:t,hasNext:M(),hasPrevious:z(),pageElement:e})}}(t),Y(E,-D*t*C))},H=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=S,n=_,i=x.length,r=e+t*n;return r+n>i?i-n:r<0?0:r},W=function(t){var e=O?"height":"width",n=t.childNodes[0];if(n&&n.getBoundingClientRect()[e]){var i=n.getBoundingClientRect()[e];i!==C&&v.setPageSize(i),t.style[e]=x.length*C+"px"}},j=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;F(t),L(H())},k=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A;return F(t),S<x.length?L(H(1)):L(H())},q=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A;return F(t),L(S>0?H(-1):H())},B=function(){return W(E),F(0)},V=function(t){t.preventDefault();var e=E,n=X(e,S);if(n){var i=O?t.deltaY+N:t.deltaX+R,r=O?n.offsetTop:-1===D?n.offsetLeft-n.parentNode.clientWidth+n.clientWidth:n.offsetLeft;Y(e,i-r)}},U=function(t){var e=G(t.velocity),n=O?t.deltaY:t.deltaX;Math.abs(n)>C*_*w?D*n<0?k(e):q(e):j(e)},G=function(t){var e=X(E,S);if(e){var n=e.clientWidth,i=1/(Math.abs(t)||1)*n;return i>A&&(i=A),i}};return c(function(){g&&(f.pageData&&f.pageData().then(function(t){return v.setList(t)}),b(g.querySelector(".".concat(r.content))))},[g]),c(function(){var t;0!=P&&(b(t=E),W(t),j(),W(E),I.current=new a({el:E,orientation:f.orientation}))},[P]),c(function(){if(I.current)return I.current.on("panstart",B),I.current.on("panmove",V),I.current.on("panend",U),f.sliderController&&f.sliderController({index:function(){return S},state:d,hasNext:M,hasPrevious:z,goTo:L,goCurrent:j,goNext:k,goPrevious:q}),function(){I.current.off("panstart",B),I.current.off("panmove",V),I.current.off("panend",U)}},[I.current,S,_]),c(function(){E&&(_!==f.groupBy?(v.setGroupBy(f.groupBy||1),W(E),j()):W(E))}),e("div",Object.assign({},l(function(t){return t&&!g&&(y(t),f.getRef&&f.getRef(t))}),f.testId&&{"data-test-id":f.testId},{className:[r.slider,f.className||f.class].join(" ")}),[f.before?e("."+r.before,f.before):null,e("div",{className:r.content},x.map(function(t,e){return f.page({data:t,listIndex:e,currentIndex:S})})),f.after?e("."+r.after,f.after):null])},t.css=[{".mithril-slider":{overflow:"hidden"," .mithril-slider__content":{transitionProperty:"transform",transitionTimingFunction:"ease-out",transform:"translate3d(0, 0, 0)"}}}],Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=cyano-core-slider.js.map
