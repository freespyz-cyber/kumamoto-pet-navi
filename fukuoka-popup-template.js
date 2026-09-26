(() => {
  const run = () => {
    if (typeof map === 'undefined' || typeof places === 'undefined' || typeof L === 'undefined') return;
    Object.values(map._layers || {}).forEach(layer => {
      if (layer instanceof L.CircleMarker || (layer.getPopup && layer.getPopup())) map.removeLayer(layer);
    });
    const esc = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const add = (p, category, href) => {
      const rawCategory = String(category || '');
      const kind = !rawCategory || rawCategory.startsWith('#') ? '宿泊' : rawCategory;
      const food = kind.includes('食事'), place = kind.includes('ドッグラン') || kind.includes('公園'), hospital = kind.includes('病院');
      const color = food ? '#e85d75' : place ? '#159a9c' : hospital ? '#e5484d' : '#7357d9';
      const tags = food ? ['ペット同伴条件を確認中'] : place ? ['犬OK','施設条件を要確認'] : hospital ? ['診療情報あり','来院前確認'] : ['ペット同伴宿','予約前確認'];
      const detailHref = href || (rawCategory.startsWith('#') ? `fukuoka-fukkou-pet-stay.html${rawCategory}` : '');
      const linkLabel = hospital ? '病院の詳細・公式情報を見る →' : food ? '詳細・公式情報を見る →' : '宿泊条件・詳細を見る →';
      const links = detailHref ? `<br><a class="map-detail-link" href="${esc(detailHref)}"${/^https?:/.test(detailHref) ? ' target="_blank" rel="noopener"' : ''}>${linkLabel}</a>` : '';
      const html = `<strong>${esc(p[0])}</strong><br><span class="map-area">${esc(p[1])}</span><br><span class="map-category">分類：${esc(kind)}</span><br>${tags.map(t => `<span class="map-tag">${t}</span>`).join(' ')}${links}<br><button class="map-add-plan">この場所を予定に追加</button>`;
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
    // The template rebuild replaces every marker. Reset the filter registry so
    // removed markers can never be restored alongside the new set.
    window.fukuokaMarkerLayers = new Set(
      Object.values(map._layers || {}).filter(layer => layer.getPopup?.())
    );
    setTimeout(() => {
      document.querySelector('.fukuoka-filters button.active')?.click();
    }, 0);
  };
  setTimeout(run, 1200);
})();
