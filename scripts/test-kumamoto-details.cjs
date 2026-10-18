const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('pet-facility-map.html','utf8');
const tags=html.match(/const verifiedTags=p=>\{[\s\S]*?return\[\]\};/)[0];
const place=['病院','大津どうぶつ医療センター','菊池郡大津町室317-1'];
let popup='';const c={window:{addEventListener(){}},document:{createElement:()=>({}),head:{appendChild(){}},addEventListener(){}},render(){},activeType:'病院',visiblePlaces:()=>[place],markers:[{setPopupContent(s){popup=s}}],list:{innerHTML:''}};
vm.createContext(c);
for(const file of ['assets/map-source-links.js','assets/map-links.js'])vm.runInContext(fs.readFileSync(file,'utf8'),c);
c.FacilityLinks=c.window.FacilityLinks;vm.runInContext(tags,c);
vm.runInContext(fs.readFileSync('assets/kumamoto-map-details.js','utf8'),c);
for(const expected of ['MRI','CT','特徴・設備','ozuanimal.com','instagram.com/ozuanimalclinic']){
 assert(popup.includes(expected),expected);assert(c.list.innerHTML.includes(expected),expected);
}
vm.runInContext("render('病院')",c);assert(popup.includes('MRI'));
console.log('Kumamoto popup and filtered list: details, website and Instagram preserved');
