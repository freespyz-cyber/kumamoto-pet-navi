/* Fukuoka animal hospitals restored after Google Maps name + municipality checks.
   Popup addresses intentionally stop at the town/neighborhood level; coordinates
   are taken from the matching Google Maps place result, not an address geocoder. */
(() => {
  if (typeof map === 'undefined' || typeof L === 'undefined') return;

  const hospitals = [
    { name: '動物医療センター春日', lat: 33.5257995, lng: 130.4674517, address: '福岡県春日市原町', query: '動物医療センター春日 春日市' },
    { name: 'ちはやペットクリニック', lat: 33.6433656, lng: 130.4318285, address: '福岡県福岡市東区名島', query: 'ちはやペットクリニック 福岡市東区' },
    { name: '福岡動物医療センター', lat: 33.5724062, lng: 130.429057, address: '福岡県福岡市博多区竹下', query: '福岡動物医療センター 福岡市博多区 竹下' },
    { name: 'ひよどり動物病院', lat: 33.5731636, lng: 130.3914187, address: '福岡県福岡市中央区平尾浄水町', query: 'ひよどり動物病院 福岡市中央区 平尾浄水町' },
    { name: 'みなとおおほり動物病院', lat: 33.591032, lng: 130.386506, address: '福岡県福岡市中央区大手門', query: 'みなとおおほり動物病院 福岡市中央区' },
    { name: 'かなどう動物病院', lat: 33.560306, lng: 130.437516, address: '福岡県福岡市南区高木', query: 'かなどう動物病院 福岡市南区' },
    { name: 'まつばらペットクリニック', lat: 33.5559813, lng: 130.3876408, address: '福岡県福岡市南区長丘', query: 'まつばらペットクリニック 福岡市南区 長丘' },
    { name: 'しみず動物クリニック', lat: 33.5654768, lng: 130.4281189, address: '福岡県福岡市南区塩原', query: 'しみず動物クリニック 福岡市南区 塩原' },
    { name: 'たかみや通り動物クリニック', lat: 33.5699819, lng: 130.4104942, address: '福岡県福岡市南区高宮', query: 'たかみや通り動物クリニック 福岡市南区 高宮' },
    { name: 'のぞえ動物病院', lat: 33.6180115, lng: 130.4380372, address: '福岡県福岡市東区原田', query: 'のぞえ動物病院 福岡市東区 原田' },
    { name: 'わかみや動物医療センター', lat: 33.6424663, lng: 130.446162, address: '福岡県福岡市東区若宮', query: 'わかみや動物医療センター 福岡市東区 若宮' },
    { name: 'アン動物病院', lat: 33.557799, lng: 130.334827, address: '福岡県福岡市早良区有田', query: 'アン動物病院 福岡市早良区 有田' },
    { name: '山本動物病院', lat: 33.560502, lng: 130.3532968, address: '福岡県福岡市早良区飯倉', query: '山本動物病院 福岡市早良区' },
    { name: '宇賀ペットクリニック', lat: 33.5761139, lng: 130.2579154, address: '福岡県福岡市西区徳永北', query: '宇賀ペットクリニック 福岡市西区' },
    { name: 'うりゅう動物病院', lat: 33.578375, lng: 130.2581246, address: '福岡県福岡市西区北原', query: 'うりゅう動物病院 福岡市西区' },
    { name: '今林動物ケアクリニック', lat: 33.9030812, lng: 130.8056545, address: '福岡県北九州市若松区白山', query: '今林動物ケアクリニック 北九州市若松区 白山' },
    { name: '医生ケ丘動物病院', lat: 33.8951171, lng: 130.7145321, address: '福岡県北九州市若松区塩屋', query: '医生ケ丘動物病院 北九州市若松区 塩屋' },
    { name: '森どうぶつ病院', lat: 33.8738594, lng: 130.7129656, address: '福岡県北九州市八幡西区大浦', query: '森どうぶつ病院 北九州市八幡西区 大浦' },
    { name: 'たなかペットクリニック', lat: 33.8935462, lng: 130.8497222, address: '福岡県北九州市小倉北区中井', query: 'たなかペットクリニック 北九州市小倉北区 中井' },
    { name: 'かんもん動物病院', lat: 33.923571, lng: 130.979229, address: '福岡県北九州市門司区黒川西', query: 'かんもん動物病院 北九州市門司区 黒川西' }
  ];

  const esc = value => String(value || '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  map.eachLayer(layer => {
    const html = String(layer.getPopup?.()?.getContent?.() || '');
    if (html.includes('分類：病院')) map.removeLayer(layer);
  });

  hospitals.forEach(record => {
    const row = [record.name, record.address, record.lat, record.lng, '病院', '', '', record.query];
    if (typeof places !== 'undefined' && !places.some(place => place[0] === record.name)) places.push(row);
    const search = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(record.query)}`;
    const marker = L.circleMarker([record.lat, record.lng], {
      radius: 9, color: '#fff', weight: 2, fillColor: '#e5484d', fillOpacity: .95
    }).addTo(map);
    marker.bindPopup(`<strong>${esc(record.name)}</strong><br>${esc(record.address)}<br>分類：病院<br><a href="${search}" target="_blank" rel="noopener">Googleマップで照合 →</a><br><button class="fukuoka-hospital-add">この場所をルートに追加</button>`);
    marker.on('popupopen', event => {
      const button = event.popup.getElement()?.querySelector('.fukuoka-hospital-add');
      if (!button) return;
      button.onclick = () => {
        if (typeof selected !== 'undefined' && !selected.some(place => place[0] === record.name)) selected.push(row);
        if (typeof renderTrip === 'function') renderTrip();
        button.textContent = '追加済み';
      };
    });
  });

  const note = document.querySelector('.note');
  if (note) note.textContent = '福岡の動物病院20施設を、Googleマップで施設名＋市区町村を照合して表示しています。住所は番地を省き、確認できた町名までを掲載しています。診療時間・診療内容は各病院の公式情報をご確認ください。';
})();
