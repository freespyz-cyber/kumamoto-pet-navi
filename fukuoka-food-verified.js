/* Verified Fukuoka pet-friendly food listings. Google search uses name + city/town,
   while the popup displays the full verified address including the street number. */
(() => {
  if (typeof map === 'undefined' || typeof places === 'undefined' || typeof L === 'undefined') return;
  const verified = [
    { names: ['くるみcafe', 'くるみcafe…'], name: 'くるみcafe', lat: 33.2174464, lng: 130.547226, address: '〒834-0062 福岡県八女市岩崎277-11', query: 'くるみcafe 八女市', site: 'https://kurumicafe.com/' },
    { names: ['DOGSALON & CAFE ARALE'], name: 'DOGSALON & CAFE ARALE', lat: 33.890352, lng: 130.670502, address: '〒807-0122 福岡県遠賀郡芦屋町高浜町9-3', query: 'DOGSALON & CAFE ARALE 芦屋町' },
    { names: ['ドッグカフェTARO＆HANA（たろはな）', 'ドッグカフェたろはな'], name: 'ドッグカフェたろはな', lat: 33.77309, lng: 130.768716, address: '〒822-0003 福岡県直方市上頓野4596-4', query: 'ドッグカフェたろはな 直方市' },
    { names: ['ふらってぃーのドッグカフェ', 'ふらってぃールーム'], name: 'ふらってぃールーム', lat: 33.6659423, lng: 130.6859521, address: '〒820-0065 福岡県飯塚市中353', query: 'ふらってぃールーム 飯塚市', site: 'https://www.flattyroom.com/sp/reserve.html' },
    { names: ['Manly（マンリー）', 'Manly'], name: 'Manly（マンリー）', lat: 33.5848065, lng: 130.3989908, address: '〒810-0021 福岡県福岡市中央区今泉1丁目18-55 天神南ロイヤルハイツ1F', query: 'Manly 福岡市中央区', site: 'https://manlyfukuoka.owst.jp/' },
    { names: ['Beach cafe SUNSET', 'Beach Cafe SUNSET（サンセット）'], name: 'Beach Cafe SUNSET（サンセット）', lat: 33.6419868, lng: 130.2016479, address: '〒819-0202 福岡県福岡市西区西浦284', query: 'Beach Cafe SUNSET 福岡市西区' },
    { names: ['THE BEACH（ザ ビーチ）', 'THE BEACH'], name: 'THE BEACH', lat: 33.5948333, lng: 130.3510928, address: '〒814-0001 福岡県福岡市早良区百道浜2丁目902-1', query: 'THE BEACH 福岡市早良区' },
    { names: ['王様のたまご 門司港本店', '王様のたまご門司港本店'], name: '王様のたまご 門司港本店', lat: 33.946227, lng: 130.961793, address: '〒801-0852 福岡県北九州市門司区港町9-4', query: '王様のたまご 門司港本店 北九州市門司区' },
    { names: ['DogRun&Cafe Eual＊La', 'DogRun&Cafe EuAl*La'], name: 'DogRun&Cafe EuAl*La', lat: 33.5779344, lng: 131.1419311, address: '〒871-0907 福岡県築上郡上毛町緒方473', query: 'DogRun&Cafe EuAl*La 上毛町', site: 'https://www.dogruncafe-eualla.com/' },
    { names: ['キャバリアハウス', 'キャバリアSハウス'], name: 'キャバリアSハウス', lat: 33.1798159, lng: 130.4958967, address: '〒833-0015 福岡県筑後市津島1288', query: 'キャバリアSハウス 筑後市' },
    { names: ["PET’s THE WORLD", "PET's THE WORLD"], name: "PET's THE WORLD", lat: 33.3207287, lng: 130.524471, address: '〒830-0003 福岡県久留米市東櫛原町1460-16', query: "PET's THE WORLD 久留米市" },
    { names: ['cafe Lanai（カフェ ラナイ）', 'cafe Lanai'], name: 'cafe Lanai（カフェ ラナイ）', lat: 33.7705168, lng: 130.4714505, address: '〒811-3219 福岡県福津市西福間4丁目11-20', query: 'cafe Lanai 福津市' },
    { names: ['Current（カレント）', 'CURRENT（カレント）', 'CURRENT'], name: 'CURRENT（カレント）', lat: 33.608574, lng: 130.161862, address: '〒819-1303 福岡県糸島市志摩野北2290', query: 'CURRENT 糸島市志摩野北', site: 'https://www.bakeryrestaurantcurrent-2007.com/' },
    { names: ['カフェドボッコ（cafe de BoCCo）', 'CAFE DE BOCCO（カフェドボッコ）', 'CAFE DE BOCCO'], name: 'CAFE DE BOCCO（カフェドボッコ）', lat: 33.7699076, lng: 130.4715675, address: '〒811-3219 福岡県福津市西福間4丁目15-36', query: 'CAFE DE BOCCO 福津市', site: 'https://cafedebocco.com/' },
         { names: ['パタゴニアの南'], name: 'パタゴニアの南', lat: 33.5536792, lng: 130.3963096, address: '〒815-0075 福岡県福岡市南区長丘3丁目', query: 'パタゴニアの南 福岡市南区 長丘', site: 'https://patagonianominami.com/' },
    { names: ['ドッグキャンパーレスト青柳'], name: 'ドッグキャンパーレスト青柳', lat: 33.7077835, lng: 130.4954672, address: '〒811-3133 福岡県古賀市青柳町', query: 'ドッグキャンパーレスト青柳 古賀市 青柳町', site: 'https://faj6107.gorp.jp/' },
    { names: ['ながかわ'], name: 'ながかわ', lat: 33.5827166, lng: 130.3996629, address: '〒810-0022 福岡県福岡市中央区薬院1丁目', query: 'ながかわ 福岡市中央区 薬院', site: 'https://f375900.gorp.jp/' },

  ];
  const byName = new Map(verified.flatMap(item => item.names.map(name => [name, item])));
  const retained = [];
  const matched = new Set();
  places.forEach(place => {
    if (!String(place[4] || '').includes('食事')) { retained.push(place); return; }
    const record = byName.get(place[0]);
    if (!record || matched.has(record.name)) return;
    matched.add(record.name);
    retained.push(place);
  });
  verified.forEach(record => {
    let place = retained.find(row => row[0] === record.name || record.names.includes(row[0]));
    if (!place) { place = [record.name, record.address, record.lat, record.lng, '食事']; retained.push(place); }
    place[0] = record.name;
    place[1] = record.address;
    place[2] = record.lat;
    place[3] = record.lng;
    place[4] = '食事';
    place[5] = record.site || '';
    place[7] = record.query;
  });
  places.splice(0, places.length, ...retained);

  map.eachLayer(layer => {
    const html = String(layer.getPopup?.()?.getContent?.() || '');
    if (html.includes('分類：食事')) map.removeLayer(layer);
  });
  const esc = value => String(value || '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  verified.forEach(record => {
    const place = places.find(row => row[0] === record.name);
    const site = record.site ? `<br><a href="${esc(record.site)}" target="_blank" rel="noopener">公式サイトを見る →</a>` : '';
    const search = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(record.query)}`;
    const marker = L.circleMarker([record.lat, record.lng], { radius: 9, color: '#fff', weight: 2, fillColor: '#e85d75', fillOpacity: .95 }).addTo(map);
    marker.bindPopup(`<strong>${esc(record.name)}</strong><br>${esc(record.address)}<br>分類：食事${site}<br><a href="${search}" target="_blank" rel="noopener">Googleマップで照合 →</a><br><button class="fukuoka-food-add">この場所をルートに追加</button>`);
    marker.on('popupopen', event => {
      const button = event.popup.getElement()?.querySelector('.fukuoka-food-add');
      if (!button) return;
      button.onclick = () => {
        if (typeof selected !== 'undefined' && !selected.includes(place)) selected.push(place);
        if (typeof renderTrip === 'function') renderTrip();
        button.textContent = '追加済み';
      };
    });
  });
  const note = document.querySelector('.note');
  if (note) note.textContent = '福岡の飲食店は、Googleマップで店名と市町を照合し、住所・ピン位置を確認できた14施設を掲載しています。閉業・業態変更・未確認の候補は誤案内防止のため一時掲載していません。宿泊施設等の確認状況はこの案内の対象外です。';
})();
