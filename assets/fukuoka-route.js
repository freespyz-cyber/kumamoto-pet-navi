/* Use the same selection updated by the map popup; no approximate pin coordinates. */
(() => {
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
