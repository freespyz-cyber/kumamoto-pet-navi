setTimeout(() => {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;
  const tools = document.createElement('div');
  tools.className = 'common-map-tools';
  tools.innerHTML = '<input id="map-search" placeholder="店名・地域・症状・設備で検索"><button id="map-search-clear">検索をクリア</button>';
  mapEl.parentNode.insertBefore(tools, mapEl);
  const style = document.createElement('style');
  style.textContent = '.common-map-tools{display:flex;gap:10px;margin:14px 0}.common-map-tools input{flex:1;border:1px solid #d8e0da;border-radius:12px;padding:12px 14px;font-size:16px;background:#fffdf9}.common-map-tools button{border:1px solid #234d43;border-radius:12px;background:#fffdf9;color:#234d43;font-weight:800;padding:10px 14px}.map-tag{display:inline-block;background:#e8f2ed;color:#376052;border-radius:999px;padding:3px 9px;margin:4px 3px 0 0;font-size:12px}';
  document.head.appendChild(style);
  const input = tools.querySelector('#map-search');
  const layers = () => Object.values(map._layers || {}).filter(x => x.getPopup && x.getPopup());
  input.addEventListener('input', () => { const q=input.value.trim().toLowerCase(); layers().forEach(l=>{const show=!q||String(l.getPopup().getContent()).toLowerCase().includes(q); if(show&&!map.hasLayer(l))l.addTo(map); if(!show&&map.hasLayer(l))map.removeLayer(l);}); });
  tools.querySelector('#map-search-clear').onclick=()=>{input.value='';input.dispatchEvent(new Event('input'));};
}, 1200);
