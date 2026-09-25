/* 熊本ペットナビ 共通MAPテンプレート
 * 県別ページは施設データだけを差し替えて利用する。
 */
(function (global) {
  const COLORS = Object.freeze({
    food: '#e85d75',
    place: '#159a9c',
    stay: '#6f52d9',
    boarding: '#b84fc4',
    hospital: '#e5484d',
    event: '#d9a441'
  });

  const TAGS = Object.freeze({
    food: ['犬同伴可', 'テラス席など', '来店前確認'],
    place: ['犬OK', 'ペットと行ける場所', '要確認'],
    stay: ['犬・猫対応', '宿泊可', '公式情報確認'],
    boarding: ['預かり対応', '要確認', '公式情報確認'],
    hospital: ['診療対応', '要確認', '来院前確認'],
    event: ['イベント', '開催状況確認', '公式情報確認']
  });

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
  }

  function tags(category, extra) {
    const values = [...(TAGS[category] || TAGS.place), ...(extra || [])];
    return [...new Set(values)].map(tag => `<span class="map-tag">${escapeHtml(tag)}</span>`).join('');
  }

  function popup(place) {
    const name = escapeHtml(place.name);
    const area = escapeHtml(place.area);
    const category = escapeHtml(place.categoryLabel || place.category || '施設');
    const link = place.url
      ? `<br><a href="${escapeHtml(place.url)}" target="_blank" rel="noopener">公式情報を見る →</a>`
      : '';
    const detail = place.detail
      ? `<br><span class="map-detail">${escapeHtml(place.detail)}</span>`
      : '';
    return `<strong>${name}</strong><br>${area}<br>分類：${category}${detail}${link}<br>${tags(place.category, place.tags)}<br><button class="map-add-plan">この場所を予定に追加</button>`;
  }

  function installPlan(map, planElement) {
    const selected = [];
    map.on('popupopen', event => {
      const button = event.popup.getElement()?.querySelector('.map-add-plan');
      if (!button) return;
      button.onclick = () => {
        const name = event.popup.getElement()?.querySelector('strong')?.textContent || 'この場所';
        if (!selected.includes(name)) selected.push(name);
        planElement.textContent = selected.length
          ? `自分の予定を作る：${selected.join('　・　')}`
          : '自分の予定を作る：まだ場所が選ばれていません。';
        button.textContent = '追加済み';
      };
    });
    return selected;
  }

  global.PetMapTemplate = Object.freeze({ COLORS, TAGS, escapeHtml, tags, popup, installPlan });
})(window);
