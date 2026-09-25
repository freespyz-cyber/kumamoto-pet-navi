/* 福岡病院：既存の詳細ページから、病院ごとの情報をポップアップへ反映する。 */
(() => {
  if (typeof map === 'undefined' || typeof hospitals === 'undefined') return;

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

  const tagsFrom = (text) => rules.filter(([, pattern]) => pattern.test(text)).map(([label]) => label);
  const summaryFrom = (text) => {
    const sentence = text.replace(/\s+/g, ' ').match(/.{0,90}(診療|対応|案内|併設).{0,110}[。．]/);
    return sentence ? sentence[0].trim() : '';
  };

  const enrich = async (marker, hospital) => {
    const popup = marker.getPopup();
    if (!popup || popup.__fukuokaEnriched) return;
    popup.__fukuokaEnriched = true;
    try {
      const response = await fetch(hospital[4], { credentials: 'same-origin' });
      if (!response.ok) return;
      const html = await response.text();
      const text = new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
      const tags = [...new Set(tagsFrom(text))];
      const summary = summaryFrom(text);
      const tagHtml = tags.map((tag) => `<span class="map-tag">${escapeHtml(tag)}</span>`).join('');
      const current = String(popup.getContent());
      const extra = `${summary ? `<br><span class="map-detail">${escapeHtml(summary)}</span>` : ''}<br>${tagHtml}<br><a href="${escapeHtml(hospital[4])}">病院の詳細・公式情報を見る →</a><br><button class="map-add-plan">この場所を予定に追加</button>`;
      popup.setContent(current.replace(/<br><a href="[^"]+">病院の詳細を見る →<\/a>/, '') + extra);
    } catch (_) {
      // 詳細ページが取得できない場合は、元のポップアップを維持する。
    }
  };

  Object.values(map._layers || {}).forEach((marker) => {
    const content = String(marker.getPopup?.()?.getContent?.() || '');
    if (!content.includes('分類：病院')) return;
    const name = (content.match(/<strong>(.*?)<\/strong>/) || [, ''])[1];
    const hospital = hospitals.find((item) => item[0] === name);
    if (hospital) marker.on('popupopen', () => enrich(marker, hospital));
  });
})();
