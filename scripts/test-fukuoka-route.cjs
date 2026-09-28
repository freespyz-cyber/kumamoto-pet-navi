const fs=require('fs'),vm=require('vm'),assert=require('assert');
const selected=[],markers=[],alerts=[];
let opened=null, capture;
const plan={textContent:''},routeButton={disabled:true},clear={addEventListener(){}};
const c={selected,routeButton,origin:null,URLSearchParams,console,
  window:{location:{assign:url=>opened=url}},alert:msg=>alerts.push(msg),
  renderTrip(){routeButton.disabled=!selected.length},
  document:{addEventListener:(type,fn,phase)=>{assert.equal(phase,true);capture=fn},querySelector:s=>s==='.map-plan'?plan:null,getElementById:()=>clear},
  map:{_layers:{},removeLayer(){}},setTimeout:fn=>fn(),hospitals:[],
  FacilityLinks:{get:()=>[],html:(pref,name,saved)=>saved.filter(Boolean).join(' ')},
  places:Array.from({length:5},(_,i)=>['施設'+i,'福岡市',33,130,'食事','',i===0?'https://www.instagram.com/example/':'']),
  L:{CircleMarker:function(){},circleMarker(){const marker={addTo(){return this},bindPopup(html){this.html=html;return this},on(name,fn){this[name]=fn;return this}};markers.push(marker);return marker}}
};
vm.createContext(c);
vm.runInContext(fs.readFileSync('assets/map-route-url.js','utf8'),c);
c.MapRouteURL=c.window.MapRouteURL;
vm.runInContext(fs.readFileSync('assets/fukuoka-route.js','utf8'),c);
vm.runInContext(fs.readFileSync('fukuoka-popup-template.js','utf8'),c);
function add(i){const root={},button={textContent:''};markers[i].popupopen({popup:{getElement:()=>root}});root.onclick({target:{closest:()=>button}})}
routeButton.onclick();assert.equal(opened,null);
add(0);assert.equal(selected.length,1);assert.equal(routeButton.disabled,false);
assert(markers[0].html.includes('https://www.instagram.com/example/'));
add(0);assert.equal(selected.length,1,'duplicate registration');
routeButton.onclick();let url=new URL(opened);
assert.equal(url.searchParams.get('api'),'1');
assert.equal(url.searchParams.get('destination'),'福岡県 福岡市 施設0');
add(1);add(2);add(3);add(4);assert.equal(selected.length,4);assert.equal(alerts.length,1);
c.origin=[33.5,130.4];routeButton.onclick();url=new URL(opened);
assert.equal(url.searchParams.get('origin'),'33.5,130.4');
assert.equal(url.searchParams.get('waypoints'),'福岡県 福岡市 施設0|福岡県 福岡市 施設1|福岡県 福岡市 施設2');
assert.equal(url.searchParams.get('destination'),'福岡県 福岡市 施設3');
assert(plan.textContent.includes('施設3'));
selected.length=0;
for (const i of [0,1,2]) {
  const popup={querySelector:()=>({textContent:'施設'+i})};
  const button={closest:s=>s==='#map'?{}:popup,textContent:''};
  let prevented=false,stopped=false;
  capture({target:{closest:()=>button},preventDefault(){prevented=true},stopImmediatePropagation(){stopped=true}});
  assert(prevented&&stopped,'legacy popup handler must not create a separate selection');
}
assert.equal(selected.length,3);
routeButton.onclick();url=new URL(opened);
assert.equal(url.searchParams.get('destination'),'福岡県 福岡市 施設2');
assert.equal(url.searchParams.get('waypoints'),'福岡県 福岡市 施設0|福岡県 福岡市 施設1');
console.log('PASS: Fukuoka popup registration → plan → Google Maps URL; duplicate, limit, origin, SNS fallback');
