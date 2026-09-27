const fs=require('fs'),vm=require('vm'),assert=require('assert');
const elements={};let popups=[];
const element=()=>({value:'all',innerHTML:'',textContent:'',add(){},addEventListener(){},classList:{toggle(){}},setAttribute(){}});
const chain=()=>({addTo(){return this},on(){return this},bindTooltip(){return this},bindPopup(s){popups.push(s);return this},setView(){return this},clearLayers(){popups=[]}});
const c={window:{},document:{createElement:element,head:{appendChild(){}},getElementById:id=>elements[id]??=element(),querySelectorAll:()=>[]},Option:function(){},URLSearchParams,console};c.L={map:chain,tileLayer:chain,layerGroup:chain,circleMarker:chain};c.window.L=c.L;
vm.createContext(c);
for(const f of ['assets/map-source-links.js','assets/map-links.js','assets/oita-stays.js','assets/oita-dogruns.js','assets/oita-hospitals.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
c.FacilityLinks=c.window.FacilityLinks;elements.search={...element(),value:''};
vm.runInContext(fs.readFileSync('assets/oita-map.js','utf8'),c);
const rows=vm.runInContext('facilities',c);
for(const p of rows)for(const link of c.FacilityLinks.get('oita',p.name)){
const url=link.url.replaceAll('&','&amp;');assert(elements.cards.innerHTML.includes(url),p.name);
if(p.region!=='unknown')assert(popups.some(s=>s.includes(url)),p.name);
}
console.log('Oita cards and regional popups:',rows.length,'passed (unknown location stays in list)');
const registry=c.window.mapSourceLinks.fukuoka;
const fc={window:c.window,FacilityLinks:c.FacilityLinks,places:Object.keys(registry).map(n=>[n,'福岡',33,130,'食事']),hospitals:[],map:{_layers:{},removeLayer(){}},L:{CircleMarker:function(){},circleMarker:chain},setTimeout:fn=>fn(),document:{querySelector:()=>null}};
popups=[];vm.createContext(fc);vm.runInContext(fs.readFileSync('fukuoka-popup-template.js','utf8'),fc);
assert.equal(popups.length,Object.keys(registry).filter(n=>fc.FacilityLinks.has('fukuoka',n)).length);
for(const n of Object.keys(registry).filter(n=>fc.FacilityLinks.has('fukuoka',n)))for(const u of registry[n])assert(popups.some(p=>p.includes(u.url.replaceAll('&','&amp;'))),n);
console.log('Fukuoka rebuilt popups:',popups.length,'passed');
for(const file of ['pet-facility-map.html','fukuoka-pet-stay-map.html','oita-pet-map.html','oita-pet-food-map.html']){
const s=fs.readFileSync(file,'utf8');for(const m of s.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(m[1],{filename:file});
assert(s.includes('assets/map-links.js'));console.log('syntax:',file);
}

