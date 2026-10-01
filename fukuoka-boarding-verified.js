/* Fukuoka boarding/sitter facilities added only when the named Google Maps
   listing matched the facility and an official site/SNS was available.
   Popup addresses use the full official address after matching the Google Maps
   place by facility name and locality. */
(() => {
  if (typeof map === 'undefined' || typeof places === 'undefined' || typeof L === 'undefined') return;

  const facilities = [
    {
      name: 'ペットホテルこころ',
      lat: 33.6210069,
      lng: 130.4398182,
      address: '〒812-0063 福岡県福岡市東区原田4丁目34-21',
      query: 'ペットホテルこころ 福岡市東区 原田',
      site: 'https://www.petlifesupport-cocoro.com/'
    },
    {
      name: 'Petland VIS A VIS（ペットランド ビザビ）',
      lat: 33.6950515,
      lng: 130.4348232,
      address: '〒811-0213 福岡県福岡市東区和白丘3丁目3-26 VIS・A・VISLand 1F',
      query: 'Petland VIS A VIS 福岡市東区 和白丘',
      site: 'http://vsav.jp/'
    },
    {
      name: 'ペットホテル＆トリミングサロン ワンルーク 福岡東区店',
      lat: 33.6430226,
      lng: 130.4452199,
      address: '〒813-0036 福岡県福岡市東区若宮5丁目1-6 エクセレント若宮101',
      query: 'ペットホテル＆トリミングサロン ワンルーク 福岡東区店 福岡市東区 若宮',
      site: 'https://oneluke.net/fukuokahigashi/'
    },
    {
      name: 'ワンパーク警固店',
      lat: 33.5834454,
      lng: 130.3915633,
      address: '〒810-0023 福岡県福岡市中央区警固2丁目3-27',
      query: 'ワンパーク警固店 福岡市中央区 警固',
      site: 'https://www.wanpark.co.jp/sp/info/nisinakasu/'
    },
    {
      name: 'Dog Salon GRACE（グラース）',
      lat: 33.6568497,
      lng: 130.4420354,
      address: '〒813-0044 福岡県福岡市東区千早5丁目13-26 ラウレアガーデン千早1F',
      query: 'Dog Salon GRACE グラース 福岡市東区 千早',
      site: 'https://dogsalongrace.jp/'
    },
    {
      name: 'わんにゃんシッター＆ホテルmomo',
      lat: 33.517444,
      lng: 130.3156624,
      address: '〒819-0030 福岡県福岡市西区室見が丘3丁目27-11',
      query: 'わんにゃんシッター＆ホテルmomo 福岡市西区 室見が丘',
      site: 'https://www.instagram.com/momo_hotel/',
      linkLabel: 'Instagram ↗'
    },
    {
      name: 'promenons DOG HOTEL + GROOMING',
      lat: 33.5931386,
      lng: 130.3816468,
      address: '〒810-0075 福岡県福岡市中央区港2丁目4-2 小宮ビル2F',
      query: 'promenons DOG HOTEL + GROOMING 福岡市中央区 港',
      site: 'https://www.promenons.com/',
      note: '公式サイトでは現在、新規受付を休止中と案内されています。'
    },
    {
      name: '福岡ペットホテル＆サロン Nicori（ニコリ）',
      lat: 33.5715546,
      lng: 130.4169084,
      address: '〒815-0082 福岡県福岡市南区大楠1丁目28-23 レジデンス秋山103',
      query: '福岡ペットホテル＆サロン Nicori 福岡市南区 大楠',
      site: 'https://nicoripet.com/'
    },
    {
      name: 'ペット訪問サービスNao',
      lat: 33.5824405,
      lng: 130.4036698,
      address: '〒810-0004 福岡県福岡市中央区渡辺通2丁目3-27 待鳥ビル402',
      query: 'ペット訪問サービスNao 福岡市中央区 渡辺通',
      site: 'https://psnao.jp/'
    },
    {
      name: 'Pet Hotel Bd',
      lat: 33.5940384,
      lng: 130.4217556,
      address: '〒812-0013 福岡県福岡市博多区博多駅東1丁目5-6',
      query: 'Pet Hotel Bd 福岡市博多区 博多駅東',
      site: 'https://pethotel-bd.com/'
    },
    {
      name: 'Family Dog Lupinus（ファミリードッグルピナス）',
      lat: 33.5988487,
      lng: 130.4103102,
      address: '〒812-0035 福岡県福岡市博多区中呉服町4-1 2F',
      query: 'Family Dog Lupinus 福岡市博多区 中呉服町',
      site: 'https://www.lupinusdog.com/'
    }
  ];

  const esc = value => String(value || '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));

  // Remove an earlier copy of these curated pins before drawing them again.
  map.eachLayer(layer => {
    const html = String(layer.getPopup?.()?.getContent?.() || '');
    if (html.includes('分類：預ける') && facilities.some(item => html.includes(esc(item.name)))) {
      map.removeLayer(layer);
    }
  });

  facilities.forEach(record => {
    const row = [record.name, record.address, record.lat, record.lng, '預ける', record.site || '', '', record.query];
    const existing = places.findIndex(place => place[0] === record.name);
    if (existing >= 0) places.splice(existing, 1, row);
    else places.push(row);

    const search = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(record.query)}`;
    const marker = L.circleMarker([record.lat, record.lng], {
      radius: 9, color: '#fff', weight: 2, fillColor: '#c052b8', fillOpacity: .95
    }).addTo(map);
    marker.bindPopup(
      `<strong>${esc(record.name)}</strong><br>${esc(record.address)}<br>分類：預ける` +
      `<br><a href="${esc(record.site)}" target="_blank" rel="noopener">${esc(record.linkLabel || 'ホームページ ↗')}</a>` +
      (record.note ? `<br>${esc(record.note)}` : '') +
      `<br><a href="${search}" target="_blank" rel="noopener">Googleマップで照合 →</a>` +
      `<br><button class="fukuoka-boarding-add">この場所をルートに追加</button>`
    );
    marker.on('popupopen', event => {
      const button = event.popup.getElement()?.querySelector('.fukuoka-boarding-add');
      if (!button) return;
      button.onclick = () => {
        if (typeof selected !== 'undefined' && !selected.some(place => place[0] === record.name)) selected.push(row);
        if (typeof renderTrip === 'function') renderTrip();
        button.textContent = '追加済み';
      };
    });
  });
})();
