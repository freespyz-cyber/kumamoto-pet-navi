/* 福岡病院：詳細ページの内容を先読みし、ピンを押した瞬間から固有情報を表示する。 */
(() => {
  const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));

  const rules = [
    ['犬・猫対応', /犬・猫|犬猫|犬と猫/],
    ['予防接種', /予防接種|ワクチン|フィラリア/],
    ['駐車場あり', /駐車場[^。\n]{0,24}|駐車場完備/],
    ['トリミング', /トリミング/],
    ['ペットホテル', /ペットホテル|ホテル室/],
    ['健康診断', /健康診断|ペットドック|定期健診/],
    ['歯科', /歯科|デンタル/],
    ['夜間相談', /夜間/],
    ['エキゾチック対応', /うさぎ|ハムスター|フェレット|鳥類|小動物/]
  ];

  const tagsFrom = (text) => rules
    .filter(([, pattern]) => pattern.test(text))
    .map(([label]) => label);

  const enrichMarker = async (marker, href) => {
    const popup = marker.getPopup?.();
    if (!popup || popup.__fukuokaHospitalEnriched) return;
    popup.__fukuokaHospitalEnriched = true;
    try {
      const response = await fetch(href, { credentials: 'same-origin' });
      if (!response.ok) throw new Error(String(response.status));
      const source = await response.text();
      const documentHtml = new DOMParser().parseFromString(source, 'text/html');
      const text = documentHtml.body.textContent || '';
      const summary = documentHtml.querySelector('main.wrap > p')?.textContent?.trim() || '';
      const tags = [...new Set(tagsFrom(text))];
      const tagHtml = tags
        .map((tag) => `<span class="map-tag">${escapeHtml(tag)}</span>`)
        .join('');
      const original = String(popup.getContent?.() || '');
      const buttonMarker = '<br><button class="map-add-plan">';
      const cleaned = original
        .replace(/<span class="map-tag">診療情報あり<\/span>\s*/g, '')
        .replace(/<span class="map-tag">来院前確認<\/span>\s*/g, '')
        .replace(/<br><a class="map-detail-link"[^>]*>.*?<\/a>/g, '');
      const detail = `<br><span class="map-detail">${escapeHtml(summary)}</span><br>${tagHtml}<br><a class="map-detail-link" href="${escapeHtml(href)}">病院の詳細・公式情報を見る →</a>`;
      popup.setContent(cleaned.replace(buttonMarker, `${detail}${buttonMarker}`));
    } catch (_) {
      popup.__fukuokaHospitalEnriched = false;
    }
  };

  const preload = () => {
    if (typeof map === 'undefined' || typeof hospitals === 'undefined') return;
    const markers = [...(window.fukuokaMarkerLayers || [])];
    hospitals.forEach((hospital) => {
      const marker = markers.find((item) => {
        const html = String(item.getPopup?.()?.getContent?.() || '');
        return html.includes(`<strong>${hospital[0]}</strong>`) && html.includes('分類：病院');
      });
      if (marker) enrichMarker(marker, hospital[4]);
    });
  };

  preload();
  setTimeout(preload, 1600);
})();
