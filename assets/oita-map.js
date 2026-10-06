const foodRows=[['食事処 春日','九重町',33.23,131.18],['Cafe BoiBoi','竹田市',33.06,131.27],['檪の丘','由布市・湯布院',33.25,131.32],['カフェ flap fly','大分市',33.24,131.61],['Pizza Buono','豊後大野市',32.97,131.58],['ゆふいんバーガーハウス','由布市・湯布院',33.26,131.36],['榎屋茶房','由布市・湯布院',33.26,131.36],['MOG me','別府市',33.28,131.50],['おおがファーム','日出町',33.37,131.53],['長崎鼻ビーチリゾート','豊後高田市',33.60,131.55],['カフェカプリセス','竹田市',32.97,131.40],['J-tapas','由布院',33.26,131.36],['久住ワイナリー 石窯工房','竹田市',33.07,131.25],['和洋居酒屋MIYA','大分市',33.24,131.61],['とまり木','日田市',33.32,130.94],['B&Bレストラン ムジカ','宇佐市安心院町',33.44,131.35],['茶房ありす','別府市・鉄輪',33.31,131.47],['森藩別邸','別府市',33.28,131.50],['Open caffe 桜','津久見市',33.07,131.86],['アルテジオダイニング','別府湾SA',33.31,131.54],['LA LUCE 80℃','大分市',33.22,131.65],['ワンLOVE','大分市',33.22,131.66],['レストラン キジョウカク','臼杵市',33.13,131.80],['B-speak cafe','別府湾SA',33.31,131.54],['地熱観光ラボ縁間','別府市・鉄輪',33.31,131.47],['SORAカフェ','宇佐市安心院',33.44,131.35],['Gypsy’s Smile','竹田市',33.08,131.34],['茶房 長屋門','臼杵市',33.12,131.80],['森のレストランRyuo','佐伯市',32.80,131.62],['ばんぢろ','大分市',33.24,131.61],['九丁目の八ちょう目','別府市',33.28,131.50],['cafe TAKEYA','別府市',33.28,131.50],['碧の時間','別府市',33.28,131.47],['CAFE&KITCHEN 結','杵築市',33.42,131.62],['coffee 5','佐伯市',32.96,131.90],['I’m home bar Laff＋','大分市',33.24,131.61],['キャラバンコーヒー由布院館','由布市・湯布院',33.26,131.36],['CREOLE CAFE','別府市',33.28,131.50],['あまべの郷 関あじ関さば館','大分市',33.24,131.88],['nando H.W.L','大分市',33.24,131.61],['茶房 風曜日','由布市・湯布院',33.27,131.35],['ドッグラン＆カフェ Green Field','由布市・湯布院',33.25,131.32],['ドッグカフェ KURU・SAN','別府市',33.33,131.48],['Cherie Storage Cafe','別府市',33.29,131.50]];
const aliases={'ワンLOVE':'森カフェ ワン・LOVE','SORAカフェ':'SORAcafe','檪の丘':'Pizzeria 櫟の丘','ドッグラン＆カフェ Green Field':'湯布院ドッグラン グリーンフィールド'};
const areaKeys={'九重':'kokonoe','玖珠':'kusu','中津':'nakatsu','竹田':'taketa','由布':'yufu','大分':'oita','豊後大野':'bungo','別府':'beppu','日出':'hiji','豊後高田':'takada','日田':'hita','宇佐':'usa','津久見':'tsukumi','臼杵':'usuki','佐伯':'saiki','杵築':'kitsuki'};
const mapRegions=window.oitaRegions, mapStays=window.oitaStays, mapDogruns=window.oitaDogruns;
const regions=mapRegions;
mapRegions.kusu={name:'玖珠町'};
mapRegions.nakatsu={name:'中津市'};
const locationOverlay=window.oitaLocations||{};
const hospitals=(window.oitaHospitals||[]).map((p,i)=>Array.isArray(p)?{id:400+i,name:p[0],region:p[1],url:p[2],address:p[3],categories:['hospital'],note:'動物病院の公式情報をご確認ください。',hold:false}:p);
const facilities=[...mapStays,...mapDogruns,...hospitals].map(p=>({...p,...(locationOverlay[p.id]||{})}));
const verifiedFoodRows=[
 ['Hounds Cafe Leon','玖珠町','houndscafe-leon',33.2832673,131.1551544],
 ['ベリージュファーム','九重町','berryjyu-farm',33.1718185,131.1693784],
 ['農家レストラン べべんこ','九重町','bebenko',33.1692786,131.249273],
 ['Cafe ナイト＆パパ','玖珠町','night-and-papa',33.3355929,131.2127795],
 ['レストハウス うさぎ亭','佐伯市','usagitei',32.807218,131.9618123],
 ['エルティカフェ 大分中津店','中津市','ltcaffe-nakatsu',33.5959592,131.2036566],
 ['森のカフェテリア 11区','由布市湯布院','mori-cafeteria-11ku',33.2254595,131.3003218],
 ['CAFE LA RUCHE','由布市湯布院','cafe-la-ruche',33.2673733,131.3688473],
 ['コミチカフェ','由布市湯布院','komichi-cafe',33.266004,131.36232]
];
const verifiedFoodIds=Object.fromEntries(verifiedFoodRows.map(([name,,slug],i)=>[name,600+i]));
for(const [original,area,slug,lat,lng] of verifiedFoodRows){
 const name=aliases[original]||original;
 const existing=facilities.find(p=>p.name===name);
 if(existing){if(!existing.categories.includes('food'))existing.categories.push('food');existing.foodDisplayArea=existing.address||area;continue;}
 const id=verifiedFoodIds[original], location=locationOverlay[id]||{};
 facilities.push({...location,id,name,region:Object.entries(areaKeys).find(([key])=>area.includes(key))?.[1]||'unknown',lat:location.lat??lat,lng:location.lng??lng,address:location.address||area,locationStatus:location.locationStatus||'google-maps-verified',locationSource:location.locationSource,foodDisplayArea:location.address||area,categories:['food'],url:FacilityLinks.get('oita',name)[0]?.url,note:location.locationNote||'公式情報で飲食営業・犬同伴条件を確認。詳細条件は来店前に公式案内をご確認ください。',hold:false});
}
facilities.splice(0, facilities.length, ...facilities.filter(p=>FacilityLinks.has('oita',p.name,p.url?[p.url]:[])));
const categoryNames={food:'ペットと食事',stay:'ペットと泊まる',run:'ペットと行ける場所',boarding:'ペットを預ける',hospital:'動物病院'};
const requestedCategory=new URLSearchParams(location.search).get('category');
let category=['food','run','stay','boarding','hospital'].includes(requestedCategory)?requestedCategory:'all';

const $=id=>document.getElementById(id);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const query=p=>`${p.name} ${p.categories.includes('food')?(p.foodDisplayArea||((mapRegions[p.region]||mapRegions.unknown).name)):((mapRegions[p.region]||mapRegions.unknown).name)} 大分県`;
const google=p=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(query(p));
let map,layer;const trip=[];
for(const [key,r] of Object.entries(mapRegions))$('region').add(new Option(r.name,key));
if(window.L){map=L.map('map').setView([33.36,131.35],9);L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',{attribution:'© Esri',maxZoom:19}).addTo(map).on('tileerror',()=>{$('map-status').textContent='背景地図を読み込めません。一覧とGoogleマップリンクをご利用ください。'});layer=L.layerGroup().addTo(map);}else $('map-status').textContent='地図ライブラリを読み込めません。一覧とGoogleマップリンクをご利用ください。';
document.querySelectorAll('[data-category]').forEach(b=>{const active=b.dataset.category===category;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
function render(){
 const term=$('search').value.trim().toLowerCase(),region=$('region').value,status=$('status').value;
 const filtered=facilities.filter(p=>(category==='all'||p.categories.includes(category))&&(region==='all'||p.region===region)&&(status==='all'||(status==='hold'?p.hold:!p.hold))&&`${p.name} ${p.note} ${(mapRegions[p.region]||mapRegions.unknown).name}`.toLowerCase().includes(term));
 $('count').textContent=`${filtered.length}件 / 全${facilities.length}件（確認待ち${facilities.filter(p=>p.hold).length}件を含む）`;
 $('cards').innerHTML=filtered.map(p=>`<article class="card"><span class="badge ${p.hold?'hold':''}">${p.hold?'掲載保留':p.categories.map(c=>categoryNames[c]).join('・')+'候補'}</span><h3>${escape(p.name)}</h3><span class="muted">${regions[p.region].name}</span><p>${escape(p.note)}</p><div class="actions">${FacilityLinks.html('oita',p.name,p.url?[p.url]:[])}<a href="${google(p)}" target="_blank" rel="noopener noreferrer">Googleマップ ↗</a></div><p><button data-add="${p.id}" ${p.hold||trip.includes(p.id)?'disabled':''}>${p.hold?'条件確認まで追加不可':trip.includes(p.id)?'予定に追加済み':'予定に追加 ＋'}</button></p></article>`).join('')||'<p>該当する候補がありません。検索条件を変更してください。</p>';
 layer?.clearLayers();
 const exact=p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng)&&['official-map','google-maps-verified'].includes(p.locationStatus);
 const colors={food:'#e85d75',run:'#159a9c',stay:'#7357d9',boarding:'#c052b8',hospital:'#e5484d'};
 for(const p of filtered.filter(exact)){if(!map)continue;const selected=category==='all'?p.categories.find(c=>colors[c]):category;const popup=`<strong>${escape(p.name)}</strong><p>${escape(p.foodDisplayArea||p.address||regions[p.region].name)}</p>${FacilityLinks.html('oita',p.name,p.url?[p.url]:[])}<a href="${google(p)}" target="_blank" rel="noopener noreferrer">Googleマップ ↗</a>`;L.circleMarker([p.lat,p.lng],{radius:9,color:'#fff',weight:2,fillColor:colors[selected]||'#e5484d',fillOpacity:.95}).bindPopup(popup,{maxWidth:340}).addTo(layer);}
 $('map-status').textContent=`位置確認済みの施設ピン ${filtered.filter(exact).length}件を表示中。未照合の候補は誤案内防止のためピンを表示していません。`;
}
function renderTrip(){ $('trip-list').innerHTML=trip.map(id=>{const p=facilities.find(p=>p.id===id);return `<li>${escape(p.name)}<button data-remove="${id}" aria-label="${escape(p.name)}を予定から外す">外す</button></li>`;}).join('')||'<li>まだ場所が選ばれていません。</li>';$('route').disabled=!trip.length;render(); }
$('cards').addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(!b)return;const id=Number(b.dataset.add);if(trip.includes(id)||facilities.find(p=>p.id===id)?.hold)return;if(trip.length>=9){$('trip-status').textContent='予定は9施設までです。不要な施設を外してください。';return;}trip.push(id);$('trip-status').textContent='予定に追加しました。';renderTrip();});
$('trip-list').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;const i=trip.indexOf(Number(b.dataset.remove));if(i>=0)trip.splice(i,1);renderTrip();});
$('clear-trip').onclick=()=>{trip.length=0;$('trip-status').textContent='予定をクリアしました。';renderTrip();};
$('route').onclick=()=>{const selected=trip.map(id=>facilities.find(p=>p.id===id));if(!selected.length)return;let url=google(selected[0]);if(selected.length>1){const params=new URLSearchParams({api:'1',origin:query(selected[0]),destination:query(selected.at(-1)),travelmode:'driving'});if(selected.length>2)params.set('waypoints',selected.slice(1,-1).map(query).join('|'));url='https://www.google.com/maps/dir/?'+params; }window.open(url,'_blank','noopener,noreferrer');};
for(const id of ['search','region','status'])$(id).addEventListener('input',render);
$('reset').onclick=()=>{category='all';document.querySelector('[data-category=all]').click();$('search').value='';$('region').value='all';$('status').value='all';map?.setView([33.36,131.35],9);render();};
renderTrip();

document.querySelectorAll('[data-category]').forEach(b=>b.onclick=()=>{category=b.dataset.category;document.querySelectorAll('[data-category]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});render();});
