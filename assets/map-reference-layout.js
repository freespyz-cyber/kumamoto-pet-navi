/* Match the Fukuoka reference without changing facility data or hero photos. */
(() => {
  const mapElement = document.getElementById('map');
  const filters = document.querySelector('.filters');
  const search = document.querySelector('.search-box');
  const tripBox = document.querySelector('.trip-box');
  if (!mapElement || !filters || !search || !tripBox) return;
  const parent = mapElement.parentNode;
  parent.insertBefore(tripBox, filters);
  parent.insertBefore(filters, mapElement);
  parent.insertBefore(search, mapElement);
  const summary = document.createElement('div');
  summary.className = 'map-plan';
  summary.setAttribute('aria-live', 'polite');
  parent.insertBefore(summary, mapElement);
  const list = document.getElementById('trip-list');
  const update = () => { summary.textContent = '自分の予定を作る：' + list.textContent.trim(); };
  new MutationObserver(update).observe(list, {childList:true,subtree:true,characterData:true});
  update();
  const input = search.querySelector('input');
  input.placeholder = '店名・地域・症状・設備で検索';
})();
