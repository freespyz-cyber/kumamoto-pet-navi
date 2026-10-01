/*
 * 福岡県のペット同伴飲食店をGoogleマップの店名＋市町検索で照合した結果。
 * 確認済みの施設だけをMapに残し、Google Mapsのplace座標と住所を反映する。
 * 番地はGoogle Mapsの検索語に使わず、ポップアップ表示住所として保持。
 */
(() => {
  if (typeof places === 'undefined') return;

  const verified = [
    { aliases: ['くるみcafe'], name: 'くるみcafe…', lat: 33.2174464, lng: 130.547226, address: '〒834-0062 福岡県八女市岩崎277-11', query: 'くるみcafe 八女市' },
    { aliases: ['DOGSALON & CAFE ARALE'], name: 'DOGSALON & CAFE ARALE', lat: 33.890352, lng: 130.670502, address: '〒807-0122 福岡県遠賀郡芦屋町高浜町9-3', query: 'DOGSALON & CAFE ARALE 芦屋町' },
    { aliases: ['ドッグカフェTARO＆HANA（たろはな）'], name: 'ドッグカフェたろはな', lat: 33.77309, lng: 130.768716, address: '〒822-0003 福岡県直方市上頓野4596-4', query: 'ドッグカフェたろはな 直方市' },
    { aliases: ['ふらってぃーのドッグカフェ'], name: 'ふらってぃールーム', lat: 33.6659423, lng: 130.6859521, address: '〒820-0065 福岡県飯塚市中353', query: 'ふらってぃールーム 飯塚市' },
    { aliases: ['Manly（マンリー）'], name: 'Manly（マンリー）', lat: 33.5848065, lng: 130.3989908, address: '〒810-0021 福岡県福岡市中央区今泉1丁目18-55 天神南ロイヤルハイツ1F', query: 'Manly 福岡市中央区' },
    { aliases: ['Beach cafe SUNSET'], name: 'Beach Cafe SUNSET（サンセット）', lat: 33.6419868, lng: 130.2016479, address: '〒819-0202 福岡県福岡市西区西浦284', query: 'Beach Cafe SUNSET 福岡市西区' },
    { aliases: ['THE BEACH（ザ ビーチ）'], name: 'THE BEACH', lat: 33.5948333, lng: 130.3510928, address: '〒814-0001 福岡県福岡市早良区百道浜2丁目902-1', query: 'THE BEACH 福岡市早良区' },
    { aliases: ['王様のたまご 門司港本店'], name: '王様のたまご門司港本店', lat: 33.946227, lng: 130.961793, address: '〒801-0852 福岡県北九州市門司区港町9-4', query: '王様のたまご 門司港本店 北九州市門司区' },
    { aliases: ['DogRun&Cafe Eual＊La', 'DogRun&Cafe EuAl*La'], name: 'DogRun&Cafe EuAl*La', lat: 33.5779344, lng: 131.1419311, address: '〒871-0907 福岡県築上郡上毛町緒方473', query: 'DogRun&Cafe EuAl*La 上毛町' },
    { aliases: ['キャバリアハウス'], name: 'キャバリアSハウス', lat: 33.1798159, lng: 130.4958967, address: '〒833-0015 福岡県筑後市津島1288', query: 'キャバリアSハウス 筑後市' },
    { aliases: ["PET’s THE WORLD"], name: "PET's THE WORLD", lat: 33.3207287, lng: 130.524471, address: '〒830-0003 福岡県久留米市東櫛原町1460-16', query: "PET's THE WORLD 久留米市" },
    { aliases: ['cafe Lanai（カフェ ラナイ）'], name: 'cafe Lanai（カフェ ラナイ）', lat: 33.7705168, lng: 130.4714505, address: '〒811-3219 福岡県福津市西福間4丁目11-20', query: 'cafe Lanai 福津市' },
    { aliases: ['Current（カレント）'], name: 'CURRENT（カレント）', lat: 33.608574, lng: 130.161862, address: '〒819-1303 福岡県糸島市志摩野北2290', query: 'CURRENT 糸島市志摩野北' },
    { aliases: ['カフェドボッコ（cafe de BoCCo）'], name: 'CAFE DE BOCCO（カフェドボッコ）', lat: 33.7699076, lng: 130.4715675, address: '〒811-3219 福岡県福津市西福間4丁目15-36', query: 'CAFE DE BOCCO 福津市' }
  ];

  const byAlias = new Map(verified.flatMap(record => record.aliases.map(alias => [alias, record])));
  const matched = new Set();
  const filteredPlaces = places.flatMap(place => {
    const category = String(place[4] || '');
    if (!category.includes('食事')) return [place];
    const record = byAlias.get(place[0]);
    if (!record || matched.has(record.name)) return [];
    matched.add(record.name);
    place[0] = record.name;
    place[1] = record.address;
    place[2] = record.lat;
    place[3] = record.lng;
    place[7] = record.query;
    return [place];
  });
  places.splice(0, places.length, ...filteredPlaces);

  // Expose coverage honestly: unverified/closed candidates are withheld until checked.
  const note = document.querySelector('.note');
  if (note) note.textContent = `福岡の飲食店は、Googleマップで店名と市町を照合し、住所・ピン位置を確認できた${matched.size}施設を掲載しています。閉業・業態変更・未確認の候補は誤案内防止のため一時掲載していません。`;
})();
