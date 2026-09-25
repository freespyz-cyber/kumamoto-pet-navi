(() => {
  const run = () => {
    if (typeof map === 'undefined' || typeof places === 'undefined' || typeof L === 'undefined') return;
    Object.values(map._layers || {}).forEach(layer => {
      if (layer instanceof L.CircleMarker || (layer.getPopup && layer.getPopup())) map.removeLayer(layer);
    });
    const esc = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const add = (p, category, href) => {
      const kind = category || '宿泊';
      const food = kind.includes('食事'), place = kind.includes('ドッグラン') || kind.includes('公園'), hospital = kind.includes('病院');
      const color = food ? '#e85d75' : place ? '#159a9c' : hospital ? '#e5484d' : '#7357d9';
      const tags = food ? ['犬同伴可','テラス席など','来店前確認'] : place ? ['犬OK','ドッグラン','要確認'] : hospital ? ['診療対応','要確認','来院前確認'] : ['犬・猫対応','ペット同伴可','公式情報確認'];
      const links = href ? `<br><a href="${esc(href)}" target="_blank" rel="noopener">公式サイトを見る →</a>` : '';
      const html = `<strong>${esc(p[0])}</strong><br>${esc(p[1])}<br>分類：${esc(kind)}<br>${tags.map(t => `<span class="map-tag">${t}</span>`).join(' ')}${links}<br><button class="map-add-plan">この場所を予定に追加</button>`;
      const marker = L.circleMarker([p[2], p[3]], {radius:9, color:'#fff', weight:2, fillColor:color, fillOpacity:.95}).addTo(map);
      marker.bindPopup(html);
      marker.on('popupopen', event => { const button = event.popup.getElement()?.querySelector('.map-add-plan'); if (button) button.onclick = () => { button.textContent = '追加済み'; }; });
    };
    const seen = new Set();
    const addOnce = (p, category, href) => {
      const key = `${p[0]}|${p[2]}|${p[3]}`;
      if (seen.has(key)) return;
      seen.add(key);
      add(p, category, href);
    };
    places.forEach(p => addOnce(p, p[4], p[5]));
    (typeof hospitals !== 'undefined' ? hospitals : []).forEach(p => addOnce(p, '病院', p[4]));
  };
  setTimeout(run, 1200);
})();
