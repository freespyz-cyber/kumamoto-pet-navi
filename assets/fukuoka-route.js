/* Use the same selection updated by the map popup; no approximate pin coordinates. */
(() => {
  // Handle every popup version, including buttons inserted by the shared map
  // enhancer. Its private selected[] must never diverge from the route state.
  document.addEventListener('click', event => {
    const button = event.target.closest?.('.map-add-plan, #add-trip');
    if (!button || !button.closest('#map')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const popup = button.closest('.leaflet-popup-content');
    const name = popup?.querySelector('strong')?.textContent.trim();
    const rows = [...places, ...(typeof hospitals === 'undefined' ? [] : hospitals)];
    const place = rows.find(row => row[0] === name);
    if (!place) { alert('この施設のルート情報を確認できません。'); return; }
    if (!selected.some(row => row[0] === place[0])) {
      if (selected.length >= 4) { alert('スマートフォン対応のため、予定は4施設までです。'); return; }
      selected.push(place);
    }
    renderTrip();
    const plan = document.querySelector('.map-plan');
    if (plan) plan.textContent = '自分の予定を作る：' + selected.map(row => row[0]).join(' → ');
    button.textContent = '追加済み';
  }, true);
  routeButton.onclick = () => {
    if (!selected.length) return;
    try {
      const url = MapRouteURL(selected.map(p => '福岡県 ' + p[1] + ' ' + p[0]), origin);
      // Same-tab navigation avoids mobile popup blockers. Back returns to the map.
      window.location.assign(url);
    } catch (error) { alert(error.message); }
  };
  document.getElementById('clear-trip').addEventListener('click', () => {
    const plan = document.querySelector('.map-plan');
    if (plan) plan.textContent = '自分の予定を作る：まだ場所が選ばれていません。';
  });
})();
