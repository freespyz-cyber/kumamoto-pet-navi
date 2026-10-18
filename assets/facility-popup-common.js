/* Shared presentation contract for prefectural facility-map popups.
   Data can differ by facility; labels and order stay consistent. */
(() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const linksHtml = links => (links || []).filter(link => link?.href && link?.label)
    .map(link => `<a href="${esc(link.href)}" target="_blank" rel="noopener noreferrer">${esc(link.label)} ↗</a>`).join('<br>');
  const render = ({name, address, category, usage, status, links, linksMarkup, action}) =>
    `<section class="facility-popup-common"><strong>${esc(name || '施設情報')}</strong>` +
    `<p><b>住所：</b>${esc(address || '未確認')}</p>` +
    `<p>分類：${esc(category || '未確認')}</p>` +
    `<p><b>利用情報：</b>${esc(usage || '未確認。利用条件・営業状況は公式情報をご確認ください。')}</p>` +
    `<p><b>確認状況：</b>${esc(status || '未確認項目があります。公式情報で最新状況をご確認ください。')}</p>` +
    `<div class="facility-popup-links">${linksHtml(links)}${linksMarkup || ''}</div>${action || ''}</section>`;
  const kumamotoColors = {'#e85d75':'カフェ','#159a9c':'ドッグラン','#4b8a59':'キャンプ場','#7357d9':'宿泊','#c052b8':'預ける','#e5484d':'動物病院'};
  const normalizeContent = (layer, original, region) => {
      if (original.includes('facility-popup-common')) return null;
      const template = document.createElement('template');
      template.innerHTML = original;
      const body = template.content;
      const name = body.querySelector('strong')?.textContent?.trim();
      if (!name) return null;
      const plain = original.replace(/<br\s*\/?\s*>/gi, '\n').replace(/<\/p\s*>/gi, '\n');
      const text = document.createElement('div');
      text.innerHTML = plain;
      const lines = text.textContent.split(/\n+/).map(line => line.trim()).filter(Boolean);
      const categoryMatch = original.match(/分類：([^<\n]+)/);
      const category = categoryMatch?.[1]?.replace(/<[^>]*>/g, '').trim() || (region === 'kumamoto' ? kumamotoColors[String(layer.options?.fillColor || '').toLowerCase()] : '');
      if (!category) return null;
      const nameIndex = lines.findIndex(line => line.includes(name));
      const address = lines.slice(nameIndex + 1).find(line => !line.includes('分類：') && !line.includes('ペット同伴・利用メモ')) || '';
      const detail = body.querySelector('[data-pet-detail]')?.textContent?.replace('ペット同伴・利用メモ', '').trim();
      const feature = body.querySelector('.map-feature')?.textContent?.trim();
      const mapDetail = body.querySelector('.map-detail')?.textContent?.trim();
      const tags = [...body.querySelectorAll('.map-tag')].map(tag => tag.textContent.trim()).filter(Boolean);
      const note = detail || [feature, mapDetail, ...tags].filter(Boolean).join('・') || (lines.find(line => line.startsWith('※')) || '').replace(/^※/, '').trim();
      const links = [...body.querySelectorAll('a[href]')].map(anchor => ({href: anchor.getAttribute('href'), label: anchor.textContent.trim().replace(/\s*→\s*$/, '')}));
      const action = [...body.querySelectorAll('button')].map(button => button.outerHTML).join('');
      if (/地域の代表位置/.test(original)) return null;
      const status = region === 'kumamoto'
        ? '地図上の掲載位置です。住所・入口・営業状況・ペット同伴条件は訪問前に公式情報をご確認ください。'
        : '施設の掲載位置です。営業状況・ペット同伴条件は訪問前に公式情報をご確認ください。';
      return render({name, address, category, usage: note || '詳細条件は公式情報をご確認ください。', status, links, action});
  };
  const normalizeMap = (map, region) => {
    if (!map?.eachLayer) return;
    map.eachLayer(layer => {
      const popup = layer.getPopup?.();
      if (!popup) return;
      const html = normalizeContent(layer, String(popup.getContent?.() || ''), region);
      if (html) layer.setPopupContent(html);
    });
  };
  const colors = {event:'#D9A400',food:'#E45A48',places:'#3478B8',dogrun:'#159A9C',stay:'#7357D9',camp:'#4F8F57',boarding:'#A34894',hospital:'#C43D4D'};
  if (window.L?.CircleMarker && !window.L.CircleMarker.prototype.__facilityPopupCommon) {
    const originalBindPopup = window.L.CircleMarker.prototype.bindPopup;
    window.L.CircleMarker.prototype.bindPopup = function (content, options) {
      if (typeof content === 'string') content = normalizeContent(this, content, 'kumamoto') || content;
      return originalBindPopup.call(this, content, options);
    };
    window.L.CircleMarker.prototype.__facilityPopupCommon = true;
  }
  const aliases = {'食事':'food','カフェ':'food','ペットと食事':'food','ペットと行ける場所':'places','行く':'places','ドッグラン':'dogrun','ドッグラン（すべて）':'dogrun','ドッグラン食事可':'dogrun-food','食事もできるドッグラン':'dogrun-food','イベント':'event','キャンプ場':'camp','宿泊':'stay','ペットと泊まる':'stay','預ける':'boarding','ペットを預ける':'boarding','病院':'hospital','動物病院':'hospital','run':'dogrun'};
  const categoryKey = value => aliases[value] || value;
  const colorForFilter = (filter, categories = []) => {
    const selected = categoryKey(filter || 'all');
    if (selected !== 'all') return colors[selected === 'dogrun-food' ? 'dogrun' : selected] || colors.places;
    const keys = categories.map(categoryKey);
    const primary = ['event','camp','hospital','stay','boarding','dogrun','food','places'].find(key => keys.includes(key));
    return colors[primary || 'places'];
  };
  if (!document.getElementById('facility-popup-common-style')) {
    const style = document.createElement('style');
    style.id = 'facility-popup-common-style';
    style.textContent = '.facility-popup-common{min-width:230px;max-width:310px;line-height:1.55;color:#24312d}.facility-popup-common strong{display:block;font-size:16px;margin-bottom:8px}.facility-popup-common p{margin:7px 0}.facility-popup-links{display:flex;flex-wrap:wrap;gap:5px 12px;margin-top:9px}.facility-popup-common button{margin-top:9px}';
    document.head.appendChild(style);
  }
  window.FacilityPopupCommon = {render, normalizeMap, colorForFilter};
})();
