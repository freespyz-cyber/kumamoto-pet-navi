(() => {
  const hospitals = window.oitaHospitals || [];
  const locations = window.oitaLocations || {};
  const regionNames = {
    oita:'大分市',beppu:'別府市',hita:'日田市',usa:'宇佐市',saiki:'佐伯市',
    taketa:'竹田市',bungo:'豊後大野市',tsukumi:'津久見市',usuki:'臼杵市',
    kitsuki:'杵築市',hiji:'速見郡日出町',kunisaki:'国東市',takada:'豊後高田市',nakatsu:'中津市',
    yufu:'由布市',kokonoe:'玖珠郡九重町'
  };
  const centers = {
    oita: [33.24, 131.61], beppu: [33.28, 131.49], hita: [33.25, 130.94],
    nakatsu: [33.60, 131.19],
    usa: [33.53, 131.35], saiki: [32.96, 131.90], taketa: [32.97, 131.40],
    bungo: [32.97, 131.58], tsukumi: [33.07, 131.86], usuki: [33.12, 131.80],
    kitsuki: [33.42, 131.62], hiji: [33.37, 131.53], kunisaki: [33.56, 131.60],
    takada: [33.66, 131.53], yufu: [33.26, 131.35], kokonoe: [33.12, 131.25]
  };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const records = hospitals.map(p => ({...p, ...(locations[p.id] || {})}));
  const getRegionName = p => regionNames[p.region] || p.address?.split(/[0-9０-９]/)[0] || '大分県';
  const town = p => p.address || getRegionName(p);
  const google = p => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`${p.name} ${town(p)} 大分県`);
  const exact = p => Number.isFinite(p.lat) && Number.isFinite(p.lng) && ['official-map','google-maps-verified'].includes(p.locationStatus);
  const $ = id => document.getElementById(id);
  const regionSelect = $('region');
  const seen = new Set();
  records.forEach(p => {const label=getRegionName(p); if(!seen.has(label)){seen.add(label);regionSelect.add(new Option(label,label));}});
  const map = window.L ? L.map('map').setView([33.36,131.45],9) : null;
  if(map){L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',{attribution:'© Esri',maxZoom:19}).addTo(map);}
  const layer = map ? L.layerGroup().addTo(map) : null;
  function render(){
    const term=$('search').value.trim().toLowerCase(), selected=regionSelect.value;
    const rows=records.filter(p=>(!selected||getRegionName(p)===selected)&&`${p.name} ${town(p)} ${getRegionName(p)}`.toLowerCase().includes(term));
    $('count').textContent=`${rows.length}件 / 全${records.length}件`;
    $('list').innerHTML=rows.map(p=>`<article class="row"><h3>${esc(p.name)}</h3><div class="muted">${esc(town(p))}${exact(p)?' · 個別位置確認済み':' · 地域まとめ表示'}</div><div class="links"><a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">公式情報 ↗</a><a href="${esc(google(p))}" target="_blank" rel="noopener noreferrer">Googleマップ ↗</a></div></article>`).join('')||'<p>該当する病院がありません。</p>';
    layer?.clearLayers();
    if(!map)return;
    rows.filter(exact).forEach(p=>L.circleMarker([p.lat,p.lng],{radius:8,color:'#fff',weight:2,fillColor:'#e5484d',fillOpacity:.95}).bindPopup(`<strong>${esc(p.name)}</strong><p>${esc(town(p))}</p><p><a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">公式情報 ↗</a></p><p><a href="${esc(google(p))}" target="_blank" rel="noopener noreferrer">Googleマップ ↗</a></p>`).addTo(layer));
    const regional=rows.filter(p=>!exact(p));
    const groups={};regional.forEach(p=>(groups[p.region] ||= []).push(p));
    Object.entries(groups).forEach(([key,items])=>{const center=centers[key];if(!center)return;const label=regionNames[key]||items[0]?.address||'大分県';const body=items.map(p=>`<div style="border-top:1px solid #ddd;padding:7px 0"><strong>${esc(p.name)}</strong><br>${esc(town(p))}<br><a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">公式情報 ↗</a> · <a href="${esc(google(p))}" target="_blank" rel="noopener noreferrer">Googleマップ ↗</a></div>`).join('');L.circleMarker(center,{radius:15,color:'#fff',weight:2,fillColor:'#7357d9',fillOpacity:.92}).bindTooltip(`${esc(label)} ${items.length}件`,{permanent:true,direction:'top'}).bindPopup(`<strong>${esc(label)}：${items.length}件</strong><p>地域の代表位置です。病院の所在地を示すピンではありません。</p>${body}`,{maxWidth:340,maxHeight:400}).addTo(layer);});
  }
  $('search').addEventListener('input',render);regionSelect.addEventListener('change',render);
  $('reset').addEventListener('click',()=>{$('search').value='';regionSelect.value='';map?.setView([33.36,131.45],9);render();});
  render();
})();
