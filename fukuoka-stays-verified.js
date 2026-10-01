/* Fukuoka pet stays verified against the named Google Maps result and locality.
   Popup addresses intentionally stop at the town/neighborhood level. */
(() => {
  if (typeof map === 'undefined' || typeof places === 'undefined' || typeof L === 'undefined') return;

  const stays = [
    { name: 'Stay Hakata', lat: 33.5854359, lng: 130.4107649, address: '福岡県福岡市博多区住吉', query: 'Stay Hakata 福岡市博多区 住吉', site: 'https://stay-f.jp/hakata/' },
    { name: 'ALFACIO RESORT STAY ITOSHIMA', lat: 33.4852449, lng: 130.0467708, address: '福岡県糸島市二丈鹿家', query: 'ALFACIO RESORT STAY ITOSHIMA 糸島市 二丈鹿家', site: 'https://www.chillnn.com/ja/1835ef3e83c370/plan/' },
    { name: '風の 八女福島', lat: 33.208914, lng: 130.555358, address: '福岡県八女市本町', query: '風の 八女福島 八女市 本町', site: 'https://www.kazenoheritage.jp/hotels/yame-fukushima/' },
    { name: '割烹旅館 まさご屋', lat: 33.6870129, lng: 130.2945374, address: '福岡県福岡市東区勝馬', query: '割烹旅館 まさご屋 福岡市東区 志賀島', site: 'https://www.fukuoka-masagoya.com/stay/' },
    { name: 'イヌヤド', lat: 33.5771138, lng: 130.4208657, address: '福岡県福岡市博多区美野島', query: 'イヌヤド 福岡市博多区 美野島', site: 'https://inuyado.amebaownd.com/' },
    { name: 'ritomaru rooms hakata hakozaki', lat: 33.6177971, lng: 130.4264622, address: '福岡県福岡市東区箱崎', query: 'ritomaru rooms hakata hakozaki 福岡市東区 箱崎', site: 'https://ritomaru.co.jp/hakozaki/' },
    { name: '御宿はなわらび', lat: 33.8523, lng: 130.5139, address: '福岡県宗像市江口', query: '御宿はなわらび 宗像市 江口', site: 'https://hanawarabi.net/' },
    { name: '九州シーサイドグランピング グランドーム福岡ふくつ', lat: 33.7883147, lng: 130.460579, address: '福岡県福津市津屋崎', query: 'グランドーム福岡ふくつ 福津市 津屋崎', site: 'https://www.fukuoka-glamping.com/' },
    { name: 'ふくせんか', lat: 33.3584478, lng: 130.8068426, address: '福岡県うきは市浮羽町古川', query: 'ふくせんか うきは市 浮羽町古川', site: 'https://www.fukusenka.com/' },
    { name: 'ほどあいの宿 六峰舘', lat: 33.3508806, lng: 130.7808694, address: '福岡県朝倉市杷木久喜宮', query: 'ほどあいの宿 六峰舘 朝倉市 原鶴温泉', site: 'https://www.roppo.jp/page.php?PAGE_NO=354' },
    { name: '東横INN北九州空港', lat: 33.8350005, lng: 131.0305144, address: '福岡県北九州市小倉南区空港北町', query: '東横INN北九州空港 北九州市小倉南区', site: 'https://www.toyoko-inn.com/search/detail/00179/' },
    { name: 'そらすな', lat: 33.7227282, lng: 131.0225034, address: '福岡県行橋市長井', query: 'そらすな 行橋市 長井浜', site: 'https://nagaihama-resort.com/solasuna/room/' },
    { name: 'seven x seven 糸島', lat: 33.6424131, lng: 130.2022162, address: '福岡県福岡市西区西浦', query: 'seven x seven 糸島市 志摩', site: 'https://sevenxseven.com/itoshima/' },
    { name: 'のこのしまアイランドパーク Villa防人', lat: 33.6361612, lng: 130.303444, address: '福岡県福岡市西区能古', query: 'のこのしまアイランドパーク Villa防人 福岡市西区 能古島' },
    { name: 'くつろぎの森 グリーンピア八女', lat: 33.1840981, lng: 130.6801638, address: '福岡県八女市黒木町木屋', query: 'くつろぎの森 グリーンピア八女 八女市 黒木町', site: 'https://greenpia-yame.com/faq?category=308' },
    { name: '1co・ITOSHIMA（ワンコイトシマ）', lat: 33.5039043, lng: 130.0809169, address: '福岡県糸島市福吉', query: '1co ITOSHIMA 糸島市 二丈', site: 'https://www.1co.co.jp/' }
  ];

  const esc = value => String(value || '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  map.eachLayer(layer => {
    const html = String(layer.getPopup?.()?.getContent?.() || '');
    if (html.includes('分類：宿泊')) map.removeLayer(layer);
  });

  stays.forEach(record => {
    const row = [record.name, record.address, record.lat, record.lng, '宿泊', record.site || '', '', record.query];
    const existing = places.findIndex(place => place[0] === record.name || (place[4] && String(place[4]).startsWith('#stay-')));
    if (existing >= 0 && places[existing][0] === record.name) places.splice(existing, 1, row);
    else places.push(row);
    const search = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(record.query)}`;
    const site = record.site ? `<br><a href="${esc(record.site)}" target="_blank" rel="noopener">公式情報を見る →</a>` : '';
    const marker = L.circleMarker([record.lat, record.lng], { radius: 9, color: '#fff', weight: 2, fillColor: '#7357d9', fillOpacity: .95 }).addTo(map);
    marker.bindPopup(`<strong>${esc(record.name)}</strong><br>${esc(record.address)}<br>分類：宿泊${site}<br><a href="${search}" target="_blank" rel="noopener">Googleマップで照合 →</a><br><button class="fukuoka-stay-add">この場所をルートに追加</button>`);
    marker.on('popupopen', event => {
      const button = event.popup.getElement()?.querySelector('.fukuoka-stay-add');
      if (!button) return;
      button.onclick = () => {
        if (typeof selected !== 'undefined' && !selected.some(place => place[0] === record.name)) selected.push(row);
        if (typeof renderTrip === 'function') renderTrip();
        button.textContent = '追加済み';
      };
    });
  });

  const note = document.querySelector('.note');
  if (note) note.textContent = '福岡の宿泊施設は、Googleマップで施設名＋地域を照合し、施設地点を確認できた16施設を掲載しています。住所は町名までです。候補のうち未照合またはペット同伴可の確認が取れない施設は、誤案内防止のため掲載していません。ペット同伴条件は各施設の公式情報でご確認ください。';
})();
