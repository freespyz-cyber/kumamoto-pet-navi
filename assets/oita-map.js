const foodRows=[['食事処 春日','九重町',33.23,131.18],['Cafe BoiBoi','竹田市',33.06,131.27],['檪の丘','由布市・湯布院',33.2632675,131.3299407],['カフェ flap fly','大分市',33.24,131.61],['Pizza Buono','豊後大野市',32.97,131.58],['ゆふいんバーガーハウス','由布市・湯布院',33.26,131.36],['榎屋茶房','由布市・湯布院',33.26,131.36],['MOG me','別府市',33.28,131.50],['おおがファーム','日出町',33.37,131.53],['長崎鼻ビーチリゾート','豊後高田市',33.60,131.55],['カフェカプリセス','竹田市',32.97,131.40],['J-tapas','由布院',33.26,131.36],['久住ワイナリー 石窯工房','竹田市',33.07,131.25],['和洋居酒屋MIYA','大分市',33.24,131.61],['とまり木','日田市',33.32,130.94],['B&Bレストラン ムジカ','宇佐市安心院町',33.44,131.35],['茶房ありす','別府市・鉄輪',33.31,131.47],['森藩別邸','別府市',33.3119193,131.4562768],['Open caffe 桜','津久見市',33.07,131.86],['アルテジオダイニング','別府湾SA',33.31,131.54],['LA LUCE 80℃','大分市・明野',33.22,131.65],['ワンLOVE','大分市',33.22,131.66],['レストラン キジョウカク','臼杵市',33.13,131.80],['B-speak cafe','別府湾SA',33.31,131.54],['地熱観光ラボ縁間','別府市・鉄輪',33.31,131.47],['SORAカフェ','宇佐市・別府',33.44,131.35],['Gypsy’s Smile','竹田市',33.08,131.34],['茶房 長屋門','臼杵市',33.12,131.80],['森のレストランRyuo','佐伯市',32.80,131.62],['ばんぢろ','大分市',33.24,131.61],['九丁目の八ちょう目','別府市',33.28,131.50],['cafe TAKEYA','別府市',33.28,131.50],['碧の時間','別府市',33.28,131.47],['CAFE&KITCHEN 結','杵築市',33.42,131.62],['coffee 5','佐伯市',32.96,131.90],['I’m home bar Laff＋','大分市',33.24,131.61],['キャラバンコーヒー由布院館','由布市・湯布院',33.26,131.36],['CREOLE CAFE','別府市',33.28,131.50],['あまべの郷 関あじ関さば館','大分市',33.24,131.88],['nando H.W.L','大分市',33.24,131.61],['茶房 風曜日','由布市・湯布院',33.27,131.35],['ドッグラン＆カフェ Green Field','由布市・湯布院',33.25,131.32],['ドッグカフェ KURU・SAN','別府市',33.33,131.48],['Cherie Storage Cafe','別府市',33.29,131.50]];
foodRows.push(['CAFE LA RUCHE','由布市・湯布院町川上']);
foodRows.push(['エルティカフェ 大分中津店','中津市・牛神']);
foodRows.push(['レストハウス うさぎ亭','佐伯市・蒲江']);
foodRows.push(['かぎのしっぽ SAKURAZAKA Café','大分市・希望が丘']);
foodRows.push(["Charlie's Lanai",'別府市・明礬']);
foodRows.push(['湯布院 千家','由布市・湯布院町川上']);
foodRows.push(['Trattoria diana（トラットリア ディアナ）','由布市・湯布院町川上']);
foodRows.push(['rionu（リオーヌ）','日出町・豊岡']);
foodRows.push(['ドッグラン＆カフェ blue mountain','佐伯市・青山']);
foodRows.push(['Komichi-cafe（コミチカフェ）','由布市・湯布院町川上']);
foodRows.push(['森のカフェテリア 11区','由布市・湯布院町川西']);
foodRows.push(['おむすびCafé TABIMUSUBI（たびむすび）','由布市・湯布院町川北']);
foodRows.push(['玉香園茶舗','臼杵市・本町']);
const aliases={'ワンLOVE':'森カフェ ワン・LOVE','SORAカフェ':'SORAcafe','ドッグラン＆カフェ Green Field':'湯布院ドッグラン グリーンフィールド'};
const excludedFoodRows=new Set(['とまり木','茶房ありす','cafe SHU','レストラン キジョウカク','茶房 長屋門','ばんぢろ','九丁目の八ちょう目','cafe TAKEYA','碧の時間']);
const areaKeys={'九重':'kokonoe','竹田':'taketa','由布':'yufu','大分':'oita','豊後大野':'bungo','別府':'beppu','日出':'hiji','豊後高田':'takada','日田':'hita','宇佐':'usa','津久見':'tsukumi','臼杵':'usuki','佐伯':'saiki','杵築':'kitsuki'};
const mapRegions=window.oitaRegions, mapStays=window.oitaStays, mapDogruns=window.oitaDogruns;
const regions=mapRegions;
mapRegions.nakatsu={name:'中津',lat:33.60,lng:131.19};
const locationOverlay=window.oitaLocations||{};
const facilities=[...mapStays,...mapDogruns,...window.oitaHospitals].map(p=>({...p,...(locationOverlay[p.id]||{})}));
foodRows.forEach(([original,area],i)=>{if(excludedFoodRows.has(original))return;const name=aliases[original]||original;const existing=facilities.find(p=>p.name===name);if(existing){if(!existing.categories.includes('food'))existing.categories.push('food');existing.foodDisplayArea=area;return;}const location=locationOverlay[200+i]||{};facilities.push({...location,id:200+i,name,region:Object.entries(areaKeys).find(([key])=>area.includes(key))?.[1]||'unknown',foodDisplayArea:area,categories:['food'],url:'oita-pet-food.html',note:location.locationStatus==='google-maps-verified'?'Googleマップで店名と市町村を照合済み。住所表示は町名までです。ペット同伴条件・営業状況は公式情報をご確認ください。':'食事スポット候補。個別位置を確認できた施設のみ地図にピンを表示します。ペット同伴条件・営業状況は公式情報をご確認ください。',hold:false});});
facilities.splice(0, facilities.length, ...facilities.filter(p=>!p.excluded&&FacilityLinks.has('oita',p.name,p.url?[p.url]:[])));
const categoryNames={food:'ペットと食事',stay:'ペットと泊まる',run:'ペットと行ける場所',boarding:'ペットを預ける',hospital:'動物病院'};
const categoryColors={food:'#e85d75',stay:'#7357d9',run:'#159a9c',boarding:'#c052b8',hospital:'#e5484d'};
const defaultCategory=new URLSearchParams(location.search).get('category')==='hospital'?'hospital':'all';
let category=defaultCategory;

const $=id=>document.getElementById(id);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const query=p=>`${p.name} ${p.categories.includes('food')?(p.foodDisplayArea||((mapRegions[p.region]||mapRegions.unknown).name)):p.categories.includes('hospital')?(p.address||((mapRegions[p.region]||mapRegions.unknown).name)):(mapRegions[p.region]||mapRegions.unknown).name} 大分県`;
const google=p=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(query(p));
const hasExactLocation=p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng)&&['official-map','google-maps-verified'].includes(p.locationStatus);
let map,layer,origin=null;const trip=[],markerById=new Map();
for(const [key,r] of Object.entries(mapRegions))$('region').add(new Option(r.name,key));
if(window.L){map=L.map('map').setView([33.36,131.35],9);L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',{attribution:'© Esri',maxZoom:19}).addTo(map).on('tileerror',()=>{$('map-status').textContent='背景地図を読み込めません。一覧とGoogleマップリンクをご利用ください。'});layer=L.layerGroup().addTo(map);}else $('map-status').textContent='地図ライブラリを読み込めません。一覧とGoogleマップリンクをご利用ください。';
function render(){
 const term=$('search').value.trim().toLowerCase(),region=$('region').value,status=$('status').value;
 const filtered=facilities.filter(p=>(category==='all'||p.categories.includes(category))&&(region==='all'||p.region===region)&&(status==='all'||(status==='hold'?p.hold:!p.hold))&&`${p.name} ${p.note} ${(mapRegions[p.region]||mapRegions.unknown).name}`.toLowerCase().includes(term));
 $('count').textContent=`${filtered.length}件 / 全${facilities.length}件（確認待ち${facilities.filter(p=>p.hold).length}件を含む）`;
 $('cards').innerHTML=filtered.map(p=>`<article class="card"><span class="badge ${p.hold?'hold':''}">${p.hold?'掲載保留':p.categories.map(c=>categoryNames[c]).join('・')+'候補'}</span><h3>${escape(p.name)}</h3><span class="muted">${regions[p.region].name}</span><p>${escape(p.note)}</p><div class="actions">${FacilityLinks.html('oita',p.name,p.url?[p.url]:[])}<a href="${google(p)}" target="_blank" rel="noopener noreferrer">Googleマップ ↗</a></div><p><button type="button" data-focus="${p.id}" ${!map||!hasExactLocation(p)?'disabled':''}>${!map?'地図を表示できません':hasExactLocation(p)?'地図で見る':'位置未照合・ピンなし'}</button> <button data-add="${p.id}" ${p.hold||!hasExactLocation(p)||trip.includes(p.id)?'disabled':''}>${p.hold?'条件確認まで追加不可':!hasExactLocation(p)?'位置未照合のためルート対象外':trip.includes(p.id)?'予定に追加済み':'予定に追加 ＋'}</button></p></article>`).join('')||'<p>該当する候補がありません。検索条件を変更してください。</p>';
 layer?.clearLayers();markerById.clear();
 const addLabel=p=>p.hold?'条件確認まで追加不可':!hasExactLocation(p)?'位置未照合のためルート対象外':trip.includes(p.id)?'予定に追加済み':'この場所を予定に追加 ＋';
 const addButton=p=>`<p><button type="button" data-map-add="${p.id}" ${p.hold||!hasExactLocation(p)||trip.includes(p.id)?'disabled':''}>${addLabel(p)}</button></p>`;
 const isLocationVerified=p=>['official-map','google-maps-verified'].includes(p.locationStatus);
 const facilityPopup=p=>FacilityPopupCommon.render({name:p.name,address:p.foodDisplayArea||p.address||regions[p.region].name,category:p.categories.map(c=>categoryNames[c]).join('・'),usage:p.note,status:'施設単位の地図位置を確認済み。営業状況・ペット同伴条件は訪問前に公式情報をご確認ください。',links:[{href:p.locationSource,label:'位置確認元'},{href:google(p),label:'Googleマップ'}],linksMarkup:FacilityLinks.html('oita',p.name,p.url?[p.url]:[]),action:addButton(p)});
 for(const p of filtered.filter(hasExactLocation)){if(!map)continue;const color=p.categories.map(c=>categoryColors[c]).find(Boolean)||'#7357d9';const marker=L.circleMarker([p.lat,p.lng],{radius:9,color:'#fff',weight:2,fillColor:color,fillOpacity:.95}).bindPopup(facilityPopup(p),{maxWidth:340}).addTo(layer);markerById.set(p.id,marker);}
 const verifiedCount=filtered.filter(p=>hasExactLocation(p)&&isLocationVerified(p)).length;
 const regionalCount=filtered.filter(p=>!hasExactLocation(p)).length;
 $('map-status').textContent=`施設ピン ${verifiedCount}件を表示中。位置未照合の${regionalCount}件は一覧に掲載し、地図には代表位置を表示していません。`;
}
function renderTrip(){ $('trip-list').innerHTML=trip.map(id=>{const p=facilities.find(p=>p.id===id);return `<li>${escape(p.name)}<button data-remove="${id}" aria-label="${escape(p.name)}を予定から外す">外す</button></li>`;}).join('')||'<li>まだ場所が選ばれていません。</li>';$('route').disabled=!trip.length;render(); }
 $('cards').addEventListener('click',e=>{const focus=e.target.closest('[data-focus]');if(focus){const place=facilities.find(p=>p.id===Number(focus.dataset.focus)),marker=markerById.get(Number(focus.dataset.focus));if(!place||!hasExactLocation(place)||!marker)return;map.setView([place.lat,place.lng],Math.max(map.getZoom(),13));marker.openPopup();map.getContainer().scrollIntoView?.({behavior:'smooth',block:'center'});return;}const b=e.target.closest('[data-add]');if(!b)return;const id=Number(b.dataset.add),place=facilities.find(p=>p.id===id);if(!place||trip.includes(id)||place.hold||!hasExactLocation(place))return;if(trip.length>=9){$('trip-status').textContent='予定は9施設までです。不要な施設を外してください。';return;}trip.push(id);$('trip-status').textContent='予定に追加しました。';renderTrip();});
map?.getContainer().addEventListener('click',e=>{const b=e.target.closest('[data-map-add]');if(!b)return;const id=Number(b.dataset.mapAdd),place=facilities.find(p=>p.id===id);if(!place||trip.includes(id)||place.hold||!hasExactLocation(place))return;if(trip.length>=9){$('trip-status').textContent='予定は9施設までです。不要な施設を外してください。';return;}trip.push(id);$('trip-status').textContent='地図から予定に追加しました。Googleマップでルートを開けます。';renderTrip();},true);
$('trip-list').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;const i=trip.indexOf(Number(b.dataset.remove));if(i>=0)trip.splice(i,1);renderTrip();});
$('use-location').onclick=()=>{const button=$('use-location');if(!navigator.geolocation){$('trip-status').textContent='この端末またはブラウザでは現在地を取得できません。';return;}button.disabled=true;button.textContent='現在地を取得中…';navigator.geolocation.getCurrentPosition(position=>{origin=[position.coords.latitude,position.coords.longitude];button.disabled=false;button.textContent='現在地を出発地に設定済み';$('trip-status').textContent='現在地を出発地に設定しました。';},error=>{button.disabled=false;button.textContent='現在地を出発地にする';$('trip-status').textContent=error?.code===1?'位置情報が許可されていません。ブラウザのサイト設定で許可してください。':'現在地を取得できませんでした。設定や通信環境をご確認のうえ再試行してください。';},{enableHighAccuracy:true,timeout:10000});};
$('clear-trip').onclick=()=>{trip.length=0;origin=null;$('use-location').disabled=false;$('use-location').textContent='現在地を出発地にする';$('trip-status').textContent='予定をクリアしました。';renderTrip();};
$('route').onclick=()=>{const selected=trip.map(id=>facilities.find(p=>p.id===id));if(!selected.length)return;if(origin){const params=new URLSearchParams({api:'1',origin:origin.join(','),destination:query(selected.at(-1)),travelmode:'driving'});if(selected.length>1)params.set('waypoints',selected.slice(0,-1).map(query).join('|'));window.open('https://www.google.com/maps/dir/?'+params,'_blank','noopener,noreferrer');return;}let url=google(selected[0]);if(selected.length>1){const params=new URLSearchParams({api:'1',origin:query(selected[0]),destination:query(selected.at(-1)),travelmode:'driving'});if(selected.length>2)params.set('waypoints',selected.slice(1,-1).map(query).join('|'));url='https://www.google.com/maps/dir/?'+params; }window.open(url,'_blank','noopener,noreferrer');};
for(const id of ['search','region','status'])$(id).addEventListener('input',render);
 $('reset').onclick=()=>{category=defaultCategory;document.querySelector(`[data-category="${defaultCategory}"]`)?.click();$('search').value='';$('region').value='all';$('status').value='all';map?.setView([33.36,131.35],9);render();};
renderTrip();

document.querySelectorAll('[data-category]').forEach(b=>b.onclick=()=>{category=b.dataset.category;document.querySelectorAll('[data-category]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});render();});
if(category!=='all')document.querySelector(`[data-category="${category}"]`)?.click();
