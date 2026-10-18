const fs = require('fs');
const vm = require('vm');
const assert = require('assert/strict');

function setup(geolocation, pathname='/fukuoka-pet-stay-map.html', map) {
  const ready = [];
  const alerts = [];
  const button = {textContent:'現在地を出発地にする', disabled:false};
  const clear = {listeners:{}, addEventListener(type, fn){this.listeners[type]=fn;}};
  const footer = {links:[], querySelector(){return null;}, append(...nodes){this.links.push(...nodes);}};
  const document = {
    addEventListener(type, fn){if(type==='DOMContentLoaded')ready.push(fn);},
    createElement(){return {style:{},textContent:''};},
    head:{appendChild(){}},
    querySelector(){return footer;},
    getElementById(id){return id==='use-location'?button:id==='clear-trip'?clear:null;}
  };
  const context = {
    window:{addEventListener(){},alert(message){alerts.push(message);}},
    document,
    location:{pathname},
    navigator:geolocation===undefined?{}:{geolocation},
    URLSearchParams,
    origin:null,
    renderTrip(){}
  };
  if (map) context.map=map;
  vm.runInNewContext(fs.readFileSync('assets/map-links.js','utf8'),context);
  ready.forEach(fn=>fn());
  return {button,clear,alerts,context,footer};
}

let app=setup({getCurrentPosition(success){success({coords:{latitude:33.6,longitude:130.4}});}});
app.button.onclick();
assert.deepEqual(Array.from(app.context.origin),[33.6,130.4]);
assert.equal(app.button.textContent,'現在地を出発地に設定済み');
assert.equal(app.footer.links[1].href,'pet-map-hub.html');
assert.equal(app.footer.links[1].textContent,'県を選び直す →');
app.clear.listeners.click();
assert.equal(app.button.textContent,'現在地を出発地にする');

app=setup({getCurrentPosition(success,error){error({code:1});}});
app.button.onclick();
assert.equal(app.button.disabled,false);
assert.equal(app.button.textContent,'現在地を出発地にする');
assert.match(app.alerts[0],/許可されていません/);

app=setup(undefined);
app.button.onclick();
assert.match(app.alerts[0],/取得できません/);

app=setup({getCurrentPosition(success,error){error({code:1});}},'/pet-facility-map.html');
app.button.onclick();
assert.equal(app.button.disabled,false);
assert.equal(app.button.textContent,'現在地を出発地にする');
assert.match(app.alerts[0],/許可されていません/);

const eventMarker={radius:10,getPopup(){return {getContent(){return '<button>イベント詳細を見る</button>';}};},setRadius(value){this.radius=value;}};
const facilityMarker={radius:9,getPopup(){return {getContent(){return '<strong>施設名</strong>';}};},setRadius(value){this.radius=value;}};
let onLayerAdd;
app=setup(undefined,'/pet-facility-map.html',{eachLayer(fn){fn(eventMarker);fn(facilityMarker);},on(type,fn){if(type==='layeradd')onLayerAdd=fn;}});
assert.equal(eventMarker.radius,9);
assert.equal(facilityMarker.radius,9);
const lateEventMarker={...eventMarker,radius:10};
onLayerAdd({layer:lateEventMarker});
assert.equal(lateEventMarker.radius,9);
console.log('PASS: Fukuoka location success, permission denial, unsupported browser, and clear state');
