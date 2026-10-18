/* Shared by all prefecture maps. Prefer one canonical website and retain social links. */
(() => {
  // If Leaflet's CDN is unavailable, keep map pages usable enough to explain
  // the failure instead of leaving a blank map with a console-only error.
  window.addEventListener('error', event => {
    if (!/(?:\bL is not defined\b|Can't find variable:\s*L)/i.test(event.message || '')) return;
    const map = document.getElementById('map');
    if (!map || map.dataset.leafletFallbackShown) return;
    map.dataset.leafletFallbackShown = 'true';
    map.replaceChildren();
    const notice = document.createElement('p');
    notice.textContent = '地図を読み込めませんでした。通信環境を確認して再読み込みしてください。施設情報は九州ペットナビのトップから各県のページでご確認ください。';
    notice.style.cssText = 'margin:0 0 12px;padding:24px;background:#fff9e8;color:#594a2c;border:1px solid #e5d6aa;border-radius:12px;line-height:1.7';
    map.appendChild(notice);
    const home = document.createElement('a');
    home.href = 'index.html';
    home.textContent = '九州ペットナビのトップへ戻る →';
    home.style.cssText = 'display:inline-block;margin:0 0 16px;color:#234d43;font-weight:800';
    map.appendChild(home);
    map.style.height = 'auto';
    map.style.minHeight = '0';
    event.preventDefault();
  });
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const get = (prefecture, name, saved = []) => {
    const seen = new Set();
    return [...(window.mapSourceLinks?.[prefecture]?.[name] || []), ...saved].map(link => {
      if (typeof link !== 'string') return link;
      const label = /instagram\.com\//i.test(link) ? 'Instagram' : /(?:facebook\.com|fb\.com)\//i.test(link) ? 'Facebook' : /(?:x\.com|twitter\.com)\//i.test(link) ? 'X' : 'ホームページ';
      return {url: link, label};
    }).filter(link => {
      if (!link || link.official === false || !/^https?:\/\//i.test(link.url || '') || seen.has(link.url)) return false;
      seen.add(link.url); return true;
    }).filter((link, _, links) => {
      if (link.label !== 'ホームページ') return true;
      return links.find(candidate => candidate.label === 'ホームページ') === link;
    });
  };
  window.FacilityLinks = {
    get,
    has: (prefecture, name, saved = []) => get(prefecture, name, saved).length > 0,
    html: (prefecture, name, saved = []) => '<div class="facility-source-links">' + get(prefecture, name, saved).map(link => '<a href="' + esc(link.url) + '" target="_blank" rel="noopener noreferrer">' + esc(link.label) + ' ↗</a>').join('') + '</div>'
  };
  const style = document.createElement('style');
  style.textContent = '.facility-source-links{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}.facility-source-links a{display:inline-block;padding:7px 10px;border:1px solid #cbd8d1;border-radius:7px;background:#fff;color:#234d43;font-size:13px;line-height:1.4;text-decoration:underline;overflow-wrap:anywhere}';
  document.head.appendChild(style);
  // Keep the current-location button state and recovery behavior consistent
  // across the standalone Kumamoto and Fukuoka maps.
  document.addEventListener('DOMContentLoaded', () => {
    const isKumamoto = location.pathname.endsWith('/pet-facility-map.html');
    const isFukuoka = location.pathname.endsWith('/fukuoka-pet-stay-map.html');
    if (isKumamoto && typeof map !== 'undefined') {
      const matchKumamotoEventMarker = layer => {
        const content = layer?.getPopup?.()?.getContent?.();
        if (typeof content === 'string' && /イベント詳細を見る|ASO OVAL DOG FES/.test(content)) layer.setRadius?.(9);
      };
      map.eachLayer(matchKumamotoEventMarker);
      map.on('layeradd', event => matchKumamotoEventMarker(event.layer));
    }
    if (!isKumamoto && !isFukuoka) return;
    const button = document.getElementById('use-location');
    const clear = document.getElementById('clear-trip');
    if (!button) return;
    const footer = isFukuoka ? document.querySelector('main.wrap > p:last-of-type') : null;
    if (footer && !footer.querySelector('a[href="pet-map-hub.html"]')) {
      const hubLink = document.createElement('a');
      hubLink.href = 'pet-map-hub.html';
      hubLink.textContent = '県を選び直す →';
      footer.append('　', hubLink);
    }
    const initialLabel = '現在地を出発地にする';
    button.onclick = () => {
      if (!navigator.geolocation) {
        window.alert('この端末またはブラウザでは現在地を取得できません。');
        return;
      }
      button.disabled = true;
      button.textContent = '現在地を取得中…';
      navigator.geolocation.getCurrentPosition(position => {
        origin = [position.coords.latitude, position.coords.longitude];
        button.disabled = false;
        button.textContent = '現在地を出発地に設定済み';
        if (typeof renderTrip === 'function') renderTrip();
      }, error => {
        button.disabled = false;
        button.textContent = initialLabel;
        const message = error?.code === 1
          ? '位置情報が許可されていません。ブラウザのサイト設定で位置情報を許可してください。'
          : '現在地を取得できませんでした。位置情報の設定や通信環境をご確認ください。';
        window.alert(message);
      }, {enableHighAccuracy: true, timeout: 10000});
    };
    clear?.addEventListener('click', () => {
      button.disabled = false;
      button.textContent = initialLabel;
    });
  });
  const page = typeof location === 'undefined' || !location.pathname ? '' : location.pathname.split('/').pop();
  if (['pet-facility-map.html', 'fukuoka-pet-stay-map.html', 'oita-pet-map.html', 'okinawa-pet-map.html'].includes(page)) {
    const layout = document.createElement('script');
    layout.src = 'assets/prefecture-map-ui.js';
    document.head.appendChild(layout);
  }
})();
