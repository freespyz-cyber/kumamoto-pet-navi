/* Fukuoka pet-friendly places: Google Maps searched by facility name + town.
   Pin coordinates and popup addresses were matched to the named Maps result;
   street numbers are displayed only after the result was unambiguous. */
(() => {
  if (typeof map === 'undefined' || typeof places === 'undefined' || typeof L === 'undefined') return;

  const verified = [
    { names: ['西部運動公園'], name: '西部運動公園ドッグラン', lat: 33.5443302, lng: 130.3170059, address: '〒819-0037 福岡県福岡市西区飯盛', query: '西部運動公園ドッグラン 福岡市西区', site: 'https://seibu-sports-park.com/facility/dogrun/' },
    { names: ['海の中道海浜公園・ドッグラン'], name: 'ドッグラン（海の中道海浜公園）', lat: 33.6687599, lng: 130.373091, address: '〒811-0321 福岡県福岡市東区大字西戸崎18-25', query: 'ドッグラン 海の中道海浜公園 福岡市東区', site: 'https://uminaka-park.jp/facility/dogrun/' },
    { names: ['P2 PET WORLD トリアス久山店', 'P2 DOG&CAT ペットワールド トリアス久山店'], name: 'P2 ペットワールド トリアス久山店', lat: 33.6529944, lng: 130.4933741, address: '〒811-2502 福岡県糟屋郡久山町山田1004-1', query: 'P2 ペットワールド トリアス久山店 糟屋郡久山町', site: 'https://p2-pet.com/' },
    { names: ['アニマルスターフィールド'], name: 'アニマルスターフィールド', lat: 33.8076655, lng: 130.4719008, address: '福岡県福津市渡462-7', query: 'アニマルスターフィールド 福津市渡', site: 'https://www.yurinomori-m.com/animal_star_field' },
    { names: ['DOG LIFE こたびより', 'DOGLIFE こたびより'], name: 'DOG LIFE こたびより', lat: 33.7797667, lng: 130.4698472, address: '〒811-3311 福岡県福津市宮司浜4丁目5-2', query: 'DOGLIFE こたびより 福津市宮司浜', site: 'https://www.cotabiyori.com/' },
    { names: ['グリーンハート筑紫野'], name: 'グリーンハート筑紫野', lat: 33.5043646, lng: 130.5022849, address: '〒818-0054 福岡県筑紫野市杉塚5丁目13-6', query: 'グリーンハート筑紫野 筑紫野市杉塚', site: 'https://greenheart.jp/' },
    { names: ['HUWAN（ヒューワン）', 'HUWAN', 'ヒューワン'], name: 'HUWAN（ヒューワン）', lat: 33.8602373, lng: 130.8596928, address: '〒803-0861 福岡県北九州市小倉北区篠崎5丁目26-7', query: 'HUWAN 北九州市小倉北区篠崎', site: 'https://huwan.jp/' },
    { names: ['北九州市立総合農事センター ドッグラン', '花農丘公園・北九州市立総合農事センター'], name: '花農丘公園・北九州市立総合農事センター ドッグラン', lat: 33.8348292, lng: 130.8995563, address: '〒802-0822 福岡県北九州市小倉南区横代東町1丁目6-1', query: '北九州市立総合農事センター ドッグラン 小倉南区横代東町', site: 'https://k-nouji.com/play' },
    { names: ['Petemo（ペテモ）小倉南店', 'ペテモ小倉南店'], name: 'ペテモ小倉南店', lat: 33.8320578, lng: 130.9335332, address: '〒800-0221 福岡県北九州市小倉南区下曽根新町10-1 サニーサイドモール小倉2階', query: 'ペテモ小倉南店 北九州市小倉南区', site: 'https://www.aeonpet.com/shop/kokuraminami/' },
    { names: ['Dog Cafe BeBe（ドッグカフェ ベベ）', 'ドッグカフェBeBe'], name: 'ドッグカフェBeBe', lat: 33.8542109, lng: 130.6695511, address: '〒811-4305 福岡県遠賀郡遠賀町松の本1丁目4-15', query: 'ドッグカフェBeBe 遠賀郡遠賀町松の本', site: 'https://dogcafe-bebe.net/' },
    { names: ['おおとう桜街道ドッグラン', 'ペットショップ おおとう桜街道 ドッグラン'], name: 'おおとう桜街道ドッグラン', lat: 33.627249, lng: 130.8463696, address: '〒824-0511 福岡県田川郡大任町今任原1328', query: 'おおとう桜街道ドッグラン 田川郡大任町', site: 'https://www.qsr.mlit.go.jp/n-michi/michi_no_eki/kobetu/ootousakurakaidou/ootousakurakaidou.html' },
    { names: ['ワンライフ直方（Wan Life 直方）', 'ワンライフ直方'], name: 'ワンライフ直方', lat: 33.7508887, lng: 130.7619176, address: '〒822-0002 福岡県直方市頓野343-8', query: 'ワンライフ直方 直方市頓野', site: 'https://wanlife-nogata.com/' },
    { names: ['筑後広域公園ドッグラン', '筑後広域公園 ドッグラン'], name: '筑後広域公園ドッグラン', lat: 33.1789417, lng: 130.4990635, address: '〒833-0015 福岡県筑後市津島1554', query: '筑後広域公園ドッグラン 筑後市津島', site: 'https://www.ajpark.jp/facilities/dogrun' },
    { names: ['リバーサイドパークドッグラン'], name: 'リバーサイドパークドッグラン', lat: 33.3381547, lng: 130.5317496, address: '〒839-0801 福岡県久留米市宮ノ陣2丁目2', query: 'リバーサイドパークドッグラン 久留米市', site: 'https://kurumekoen.org/river/river_riyo/' },
    { names: ['うえらんから糸島'], name: 'ドッグフレンドリーパーク うえらんから糸島', lat: 33.590448, lng: 130.1522408, address: '〒819-1323 福岡県糸島市志摩小金丸1946-6', query: 'ドッグフレンドリーパーク うえらんから糸島 糸島市', site: 'https://ueramkarap-itoshima.com/' },
    { names: ['ファームリゾート糸島'], name: 'ファームリゾート糸島', lat: 33.5887903, lng: 130.1472009, address: '〒819-1323 福岡県糸島市志摩小金丸1738', query: 'ファームリゾート糸島 糸島市志摩小金丸', site: 'https://www.farmresort-itoshima.com/' }
  ];

  const byName = new Map(verified.flatMap(item => item.names.map(name => [name, item])));
  const retained = [];
  const matched = new Set();
  places.forEach(place => {
    if (!String(place[4] || '').includes('ドッグラン')) { retained.push(place); return; }
    const record = byName.get(place[0]);
    if (!record || matched.has(record.name)) return;
    matched.add(record.name);
    retained.push(place);
  });
  verified.forEach(record => {
    let place = retained.find(row => row[0] === record.name || record.names.includes(row[0]));
    if (!place) { place = [record.name, record.address, record.lat, record.lng, '公園・ドッグラン']; retained.push(place); }
    place[0] = record.name;
    place[1] = record.address;
    place[2] = record.lat;
    place[3] = record.lng;
    place[4] = '公園・ドッグラン';
    place[5] = record.site || '';
    place[6] = '';
    place[7] = record.query;
  });
  places.splice(0, places.length, ...retained);

  map.eachLayer(layer => {
    const html = String(layer.getPopup?.()?.getContent?.() || '');
    if (html.includes('ドッグラン')) map.removeLayer(layer);
  });
  const esc = value => String(value || '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  verified.forEach(record => {
    const place = places.find(row => row[0] === record.name);
    const search = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(record.query)}`;
    const marker = L.circleMarker([record.lat, record.lng], { radius: 9, color: '#fff', weight: 2, fillColor: '#159a9c', fillOpacity: .95 }).addTo(map);
    marker.bindPopup(`<strong>${esc(record.name)}</strong><br>${esc(record.address)}<br>分類：公園・ドッグラン<br><a href="${esc(record.site)}" target="_blank" rel="noopener">公式情報を見る →</a><br><a href="${search}" target="_blank" rel="noopener">Googleマップで照合 →</a><br><button class="fukuoka-place-add">この場所をルートに追加</button>`);
    marker.on('popupopen', event => {
      const button = event.popup.getElement()?.querySelector('.fukuoka-place-add');
      if (!button) return;
      button.onclick = () => {
        if (typeof selected !== 'undefined' && !selected.includes(place)) selected.push(place);
        if (typeof renderTrip === 'function') renderTrip();
        button.textContent = '追加済み';
      };
    });
  });

  const note = document.querySelector('.note');
  if (note) note.textContent = '福岡の「ペットと行ける場所」は、施設名＋市町名でGoogleマップを照合した16施設を掲載しています。ピン位置と表示住所はGoogleマップの該当施設に合わせています。利用範囲・条件は各施設の公式情報をご確認ください。';
})();
