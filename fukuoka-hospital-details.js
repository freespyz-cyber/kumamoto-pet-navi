/* 福岡病院：既存の詳細ページから、病院ごとの情報をポップアップへ反映する。 */
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

  const tagsFrom = (text) => rules.filter(([, pattern]) => pattern.test(text)).map(([label]) => label);
  const summaryFrom = (text) => {
    const sentence = text.replace(/\s+/g, ' ').match(/.{0,90}(診療|対応|案内|併設).{0,110}[。．]/);
    return sentence ? sentence[0].trim() : '';
  };

  const enrich = async (popup) => {
    if (!popup || popup.dataset.fukuokaEnriched === '1') return;
    const name = popup.querySelector('strong')?.textContent?.trim() || '';
    const href = popup.querySelector('a[href*="fukuoka-vets-"]')?.getAttribute('href');
    if (!name || !href) return;
    popup.dataset.fukuokaEnriched = '1';
    try {
      const response = await fetch(href, { credentials: 'same-origin' });
      if (!response.ok) return;
      const html = await response.text();
      const documentHtml = new DOMParser().parseFromString(html, 'text/html');
      const text = documentHtml.body.textContent || '';
      const tags = [...new Set(tagsFrom(text))];
      const summary = documentHtml.querySelector('main.wrap > p')?.textContent?.trim() || summaryFrom(text);
      const tagHtml = tags.map((tag) => `<span class="map-tag">${escapeHtml(tag)}</span>`).join('');
      popup.querySelectorAll('a[href*="fukuoka-vets-"]').forEach((link) => link.remove());
      const extra = `${summary ? `<br><span class="map-detail">${escapeHtml(summary)}</span>` : ''}<br>${tagHtml}<br><a href="${escapeHtml(href)}">病院の詳細・公式情報を見る →</a>`;
      popup.insertAdjacentHTML('beforeend', extra);
    } catch (_) {
      // 詳細ページが取得できない場合は、元のポップアップを維持する。
    }
  };

  const scan = () => document.querySelectorAll('.leaflet-popup-content').forEach((popup) => {
    if (popup.textContent.includes('分類：病院')) enrich(popup);
  });
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
  scan();
})();
