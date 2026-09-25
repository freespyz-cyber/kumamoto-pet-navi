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
  const plan=document.createElement('div'); plan.className='map-plan'; plan.textContent='自分の予定を作る：まだ場所が選ばれていません。'; tools.parentNode.insertBefore(plan,mapEl);
  const selected=[]; const pstyle=document.createElement('style'); pstyle.textContent='.map-plan{background:#fffdf9;border:1px solid #dddcd5;border-radius:12px;padding:12px 14px;margin:10px 0;font-weight:800}.map-tag{display:inline-block;background:#e8f2ed;color:#376052;border-radius:999px;padding:3px 9px;margin:4px 3px 0 0;font-size:12px}'; document.head.appendChild(pstyle);
  setTimeout(()=>layers().forEach(layer=>{const popup=layer.getPopup();const html=String(popup.getContent());if(html.includes('map-add-plan'))return;const cat=html.match(/分類：([^<]+)/)?.[1]||'';const tags=cat==='病院'?'<span class="map-tag">診療対応</span><span class="map-tag">要確認</span><span class="map-tag">来院前確認</span>':cat.includes('食事')?'<span class="map-tag">ペット同伴</span><span class="map-tag">条件確認</span>':'<span class="map-tag">公式情報確認</span>';popup.setContent(html+'<br>'+tags+'<br><button class="map-add-plan">この場所を予定に追加</button>');layer.on('popupopen',()=>{const b=document.querySelector('.map-add-plan');if(b)b.onclick=()=>{const n=(html.match(/<strong>(.*?)<\/strong>/)||[,'この場所'])[1];if(!selected.includes(n))selected.push(n);plan.textContent='自分の予定を作る：'+selected.join('　・　');b.textContent='追加済み'}})}),700);
}, 1200);
