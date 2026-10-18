/* 福岡イベント：開催期間中だけ地図へ表示し、終了日の翌日に自動で消す。 */
(() => {
  const events = [
    {
      name: 'わんだふるあさくら2026',
      area: '朝倉市・原鶴温泉分水路グラウンド',
      lat: 33.338, lng: 130.780,
      start: '2026-10-10', end: '2026-10-12',
      time: '10:00〜16:00',
      detail: '愛犬と楽しめるドッグフェスタ。ドッグマーケット、フード、キャンプ企画などを予定。',
      tags: ['愛犬同伴イベント', '3日間開催']
    },
    {
      name: '保護犬・保護猫合同譲渡会',
      area: '福岡市中央区・Dog community affetto',
      lat: 33.596, lng: 130.377,
      start: '2026-10-04', end: '2026-10-04',
      time: '12:00〜17:00',
      detail: '保護犬・保護猫が参加する合同譲渡会。当日譲渡はなく、来場者の犬同伴はできません。',
      tags: ['犬猫譲渡会', '室内開催', '犬同伴不可']
    },
    {
      name: '猫たちのための譲渡会',
      area: '福岡市中央区・六本松2丁目',
      lat: 33.577, lng: 130.377,
      start: '2026-10-25', end: '2026-10-25',
      time: '14:00〜17:00（予約不要）',
      detail: '六本松駅近くで開催される保護猫の譲渡会。予約せずに参加できます。',
      tags: ['保護猫譲渡会', '予約不要']
    },
    {
      name: '九州爬虫類フェス2026 Autumn',
      area: '福岡市博多区・マリンメッセ福岡B館',
      lat: 33.607, lng: 130.404,
      start: '2026-10-31', end: '2026-11-01',
      time: '10:00〜17:00（最終日は16:30まで）',
      detail: '爬虫類・両生類の展示・販売、ふれあい企画やトークショーなど。ペットを連れての入場はできません。',
      tags: ['爬虫類・両生類', '展示・販売', 'ペット同伴不可']
    },
    {
      name: '2026動物愛護フェスティバルふくおか',
      area: '福岡市中央区・県営天神中央公園 西中洲エリア',
      lat: 33.590, lng: 130.403,
      start: '2026-11-07', end: '2026-11-07',
      time: '10:45〜15:00',
      detail: '動物愛護トーク、動植物検疫探知犬のステージ、譲渡犬・猫のパネル展示、ペット健康相談、工作・体験コーナー。',
      tags: ['入場無料', '健康相談', '動物愛護'],
      officialUrl: 'https://www.pref.fukuoka.lg.jp/contents/hoeiseipetr9.html'
    },
    {
      name: 'わんにゃんよかイベント',
      area: '福岡市中央区・イオンスタイル笹丘1階 ペテモ横',
      lat: 33.557, lng: 130.381,
      start: '2026-11-08', end: '2026-11-08',
      time: '12:00〜16:00',
      detail: '犬猫のおもちゃ・迷子札づくり、ボランティア団体による犬猫の譲渡相談会など。',
      tags: ['体験イベント', '譲渡相談']
    }
  ];

  // 公式主催者が開催日・会場を公表し、公式アクセス地図で会場位置まで
  // 照合できたイベントのみ、開催期間中の地図ピンとして掲載する。
  events.push({
    name: '& My Dog ドッグマルシェ門司港 2026 秋',
    area: '北九州市門司区・門司港レトロ親水広場',
    lat: 33.9476966, lng: 130.9645484,
    start: '2026-10-24', end: '2026-10-25',
    time: '10:30〜16:00',
    detail: '愛犬と楽しむ入場無料のドッグマルシェ。公式案内の会場住所は門司区東港町1-12、会場内に来場者用駐車場はありません。',
    tags: ['愛犬同伴イベント', '入場無料'],
    officialUrl: 'https://my-dog.me/access/'
  });

  events.push({
    name: 'どうぶつ愛護フェスティバル in ふくおか 2026',
    area: '福岡市中央区・須崎公園',
    lat: 33.5969045, lng: 130.3992088,
    start: '2026-11-01', end: '2026-11-01',
    time: '10:30〜15:30',
    detail: '福岡市主催。適正飼育相談、パネル展示、保護犬・猫・うさぎの譲渡会、ペット無料撮影会など。',
    tags: ['動物愛護', '譲渡会', '相談・展示'],
    officialUrl: 'https://www.city.fukuoka.lg.jp/hofuku/seikatsueisei/shisei/doubutsuaigo_festival_2026.html'
  });

  events.push({
    name: 'Dog＆Rose Garden 2026',
    area: '北九州市若松区・響灘緑地グリーンパーク バラ園',
    lat: 33.9171801, lng: 130.7276353,
    start: '2026-11-10', end: '2026-11-10',
    time: '10:00〜16:00',
    detail: '通常は犬の入園ができないバラ園の犬同伴特別イベントです。入園料は大人500円・犬500円、南ゲート・南駐車場のみ利用可。事前申込制で、主催者が後日公開する申込フォームからの予約が必要です。犬種・行動等の参加条件を公式案内でご確認ください。',
    tags: ['犬同伴特別イベント', '事前申込制', 'バラ園'],
    officialUrl: 'https://hibikinadagp.org/events/event/dogrose1110/'
  });

  events.push({
    name: '犬のしつけ方教室 ＜子犬コース＞ 2026年11月',
    area: '古賀市・福岡県動物愛護センター大会議室',
    lat: 33.69714504380689, lng: 130.47518091505123,
    start: '2026-11-05', end: '2026-11-19',
    time: '1日目13:30〜16:00、2・3日目13:30〜15:30',
    detail: '福岡県動物愛護センター主催・無料・電話申込の全3回講座（11月5日・12日・19日）。1日目は犬の飼育有無を問わず参加可。2・3日目の実技は選考された生後4〜6か月の子犬と飼い主が対象で、定員等の条件があります。公式案内で最新の申込状況をご確認ください。',
    tags: ['犬のしつけ', '要申込', '参加無料'],
    officialUrl: 'https://www.zaidan-fukuoka-douai.or.jp/events/detail/bb7d7ba3-576e-4e40-8029-4d1062637b0f'
  });

  events.push({
    name: '犬のしつけ方教室 ＜一般コース＞ 2026年11月',
    area: '古賀市・福岡県動物愛護センター大会議室',
    lat: 33.69714504380689, lng: 130.47518091505123,
    start: '2026-11-15', end: '2026-11-15',
    time: '13:30〜16:00頃',
    detail: '犬のことを学びたい方が対象の無料講座。先着順・電話申込で、犬の同伴はできません。定員・受付状況は公式案内をご確認ください。',
    tags: ['犬のしつけ', '要申込', '犬同伴不可'],
    officialUrl: 'https://www.zaidan-fukuoka-douai.or.jp/events/detail/3b76bc1c-220c-411f-b83d-4ac8a655122d'
  });

  const esc = (value) => String(value || '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
  const localDate = () => {
    return new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' });
  };
  const formatDate = (start, end) => {
    const f = (value) => {
      const [, month, day] = value.split('-');
      return `${Number(month)}月${Number(day)}日`;
    };
    return start === end ? f(start) : `${f(start)}〜${f(end)}`;
  };

  const syncEvents = () => {
    if (typeof map === 'undefined' || typeof L === 'undefined') return;
    const today = localDate();
    const registry = window.fukuokaMarkerLayers || (window.fukuokaMarkerLayers = new Set());
    const markers = window.fukuokaEventMarkers || (window.fukuokaEventMarkers = new Map());
    const active = events.filter((event) => today <= event.end);
    const activeNames = new Set(active.map((event) => event.name));
    markers.forEach((marker, name) => {
      if (activeNames.has(name)) return;
      map.removeLayer(marker);
      registry.delete(marker);
      markers.delete(name);
    });
    active.forEach((event) => {
      if (markers.has(event.name)) return;
      const official = event.officialUrl ? `<br><a href="${esc(event.officialUrl)}" target="_blank" rel="noopener">主催者の公式案内を見る →</a>` : '';
      const html = `<strong>${esc(event.name)}</strong><br><span class="map-area">${esc(event.area)}</span><br><span class="map-category">分類：イベント</span><br><span class="map-feature"><b>開催日</b>　${formatDate(event.start, event.end)}　${esc(event.time)}</span><span class="map-detail">${esc(event.detail)}</span><br>${event.tags.map(tag => `<span class="map-tag">${esc(tag)}</span>`).join('')}${official}<br><button class="map-add-plan">このイベントを予定に追加</button>`;
      const marker = L.circleMarker([event.lat, event.lng], {
        radius: 9, color: '#fff', weight: 2, fillColor: '#d9a441', fillOpacity: .95
      }).addTo(map);
      marker.bindPopup(html);
      registry.add(marker);
      markers.set(event.name, marker);
    });
    if (!window.fukuokaEventFiltersInitialized) {
      document.querySelector('.fukuoka-filters button.active')?.click();
      window.fukuokaEventFiltersInitialized = true;
    }
  };

  const addVerifiedCategory = (name, address, lat, lng, category, officialUrl, detail) => {
    if (typeof map === 'undefined' || typeof L === 'undefined' || window.fukuokaVerifiedAdditions?.has(name)) return;
    const registry = window.fukuokaMarkerLayers || (window.fukuokaMarkerLayers = new Set());
    const additions = window.fukuokaVerifiedAdditions || (window.fukuokaVerifiedAdditions = new Set());
    const colors = { 'キャンプ場': '#4c8b58', '預ける': '#b84fc4', '宿泊': '#7357d9' };
    const html = `<strong>${esc(name)}</strong><br>${esc(address)}<br><span class="map-category">分類：${esc(category)}</span><span class="map-detail">${esc(detail)}</span><br><a href="${esc(officialUrl)}" target="_blank" rel="noopener">公式案内を見る →</a><br><button class="map-add-plan">この場所をルートに追加</button>`;
    const marker = L.circleMarker([lat, lng], { radius: 9, color: '#fff', weight: 2, fillColor: colors[category], fillOpacity: .95 }).addTo(map);
    marker.bindPopup(html);
    marker.on('popupopen', () => {
      const button = document.querySelector('.leaflet-popup .map-add-plan');
      if (!button) return;
      button.onclick = () => {
        const routeItem = [name, address, lat, lng, `分類：${category}`, officialUrl];
        if (typeof selected !== 'undefined' && !selected.some(item => item[0] === name)) selected.push(routeItem);
        if (typeof renderTrip === 'function') renderTrip();
        button.textContent = 'ルートに追加済み';
      };
    });
    registry.add(marker);
    additions.add(name);
  };

  const addCategoryButtonsAndMarkers = () => {
    const box = document.querySelector('.fukuoka-filters');
    if (!box) return;
    if (!box.querySelector('[data-cat="キャンプ場"]')) {
      const button = document.createElement('button');
      button.dataset.cat = 'キャンプ場';
      button.textContent = 'キャンプ場';
      box.append(button);
    }
    const applyFilter = (button) => {
      const key = button.dataset.cat;
      map.closePopup();
      box.querySelectorAll('button').forEach(item => item.classList.toggle('active', item === button));
      const registry = window.fukuokaMarkerLayers || new Set();
      Object.values(map._layers || {}).filter(layer => layer.getPopup?.()).forEach(layer => registry.add(layer));
      window.fukuokaMarkerLayers = registry;
      registry.forEach(layer => {
        const text = String(layer.getPopup?.()?.getContent?.() || '');
        const isFood = text.includes('分類：食事');
        const isHospital = text.includes('分類：病院');
        const isEvent = text.includes('分類：イベント');
        const isCamp = text.includes('分類：キャンプ場');
        const isBoarding = text.includes('分類：預ける');
        const isPlace = !isCamp && !isBoarding && !text.includes('分類：宿泊') && (text.includes('ドッグラン') || text.includes('分類：公園'));
        const isStay = text.includes('分類：宿泊') || (!isFood && !isHospital && !isEvent && !isCamp && !isBoarding && !isPlace);
        const show = key === 'all' || (key === '食事' && isFood) || (key === '病院' && isHospital) ||
          (key === '行く' && isPlace) || (key === '宿泊' && isStay) || (key === '預ける' && isBoarding) ||
          (key === 'イベント' && isEvent) || (key === 'キャンプ場' && isCamp);
        if (show && !map.hasLayer(layer)) layer.addTo(map);
        if (!show && map.hasLayer(layer)) map.removeLayer(layer);
      });
    };
    box.querySelectorAll('button').forEach(button => { button.onclick = () => applyFilter(button); });

    addVerifiedCategory('モンベル五ケ山ベースキャンプ', '〒811-1234 福岡県那珂川市五ケ山461-1', 33.4163537, 130.4257843, 'キャンプ場', 'https://booking.montbell.jp/lodging/facility.php?facility_id=1', '公式案内でドギーキャンプサイト（犬同伴可）を確認。ペット同伴は指定のドギーサイトのみで、他サイト・デイキャンプは不可。要予約・利用規則とワクチン条件を事前確認してください。');
    addVerifiedCategory('岩屋キャンプ場', '〒838-1701 福岡県朝倉郡東峰村宝珠山4171', 33.431898, 130.878097, 'キャンプ場', 'https://toho-iwayacamp.com/autocamp', '公式利用案内でペット同伴可・リード必須を確認。区画サイト等のキャンプ利用が対象です。ペット条件や営業状況は予約前に公式へご確認ください。');
    addVerifiedCategory('HIKOSAN GARDEN CAMP', '〒824-0721 福岡県田川郡添田町英彦山137', 33.48934587765095, 130.90806894177683, 'キャンプ場', 'https://hikosangardencamp.com/', '福岡県公式観光サイトでペット同伴可と住所を確認。公式サイトに記載の利用条件を予約時にご確認ください。');
    addVerifiedCategory('奥八女焚火の森キャンプフィールド', '〒834-1222 福岡県八女市黒木町笠原9512', 33.2246855, 130.7365108, 'キャンプ場', 'https://www.takibinomori.com/', '現行予約プランでペット可のコテージ・キャビン・サイトを確認。ペット可プラン／区画に限り、予約時に最新条件をご確認ください。');
    addVerifiedCategory('HIBIKINADA CAMP BASE（響灘キャンプベース）', '〒808-0121 福岡県北九州市若松区大字竹並1058-11（グリーンパーク内）', 33.9186693, 130.7247914, 'キャンプ場', 'https://hibikinada-camp.com/stay/doggy-site/', '公式ドギーサイトで愛犬同伴宿泊可を確認。犬は1区画2頭まで、基本10kg以内（超過は事前相談）、狂犬病・3種以上のワクチン証明が必要。ドギーサイト限定のため予約時に条件を確認してください。');
    addVerifiedCategory('スノーピーク油山福岡キャンプフィールド', '〒811-1353 福岡県福岡市南区柏原710-2', 33.508922, 130.377166, 'キャンプ場', 'https://www.snowpeak.co.jp/locations/aburayama/', '公式案内でドッグランサイト5区画とフォレストサイト3区画がペット可と確認。フリー・電源オート・ソロサイトはペット不可。狂犬病予防接種済みの犬に限られます。予約時に対象サイトと利用規約をご確認ください。');
    addVerifiedCategory('ラピュタファーム（果樹園のキャンプサイト）', '〒827-0001 福岡県田川郡川崎町大字安眞木4409-11', 33.5754155, 130.8334763, 'キャンプ場', 'https://www.laputa-f.com/camp.html', '公式キャンプ案内で丘の上プライベートサイト・フリーサイト・貸切Bサイトを確認し、施設全体でペット可と明記されていることを確認。公式ページの地図埋め込み位置を使用しています。サイトの空き・ペット利用条件は予約前に公式へご確認ください。');
    addVerifiedCategory('森のデイキャンプ plain', '福岡県北九州市小倉北区寿山町7-14（足立公園内）', 33.8688696, 130.9047386, 'キャンプ場', 'https://www.city.kitakyushu.lg.jp/contents/05900238_00001.html', '北九州市公式キャンプ場一覧と市の2026年紹介記事で現行営業・日帰り専用・犬同伴OKのドギーサイトを確認。ペット同伴は指定ドギーサイト利用が前提です。Yahoo!マップの施設専用ピンを使用。予約・頭数・利用条件は事業者公式情報でご確認ください。');
    addVerifiedCategory('グリーンパル日向神峡', '〒834-1201 福岡県八女市黒木町北大淵4410-2', 33.1753633, 130.7733451, 'キャンプ場', 'https://www.greenpalhyugamikyo.com/guide', '公式利用案内でキャンプサイト全区画（E・K・KM・KL）ペット同伴可・利用料無料を確認。ペット同伴ルールを守ってご利用ください。ペット可コテージは指定棟のみ別料金です。');
    addVerifiedCategory('筑後広域公園オートキャンプ場', '〒833-0015 福岡県筑後市津島2108-1', 33.1804864, 130.500671, 'キャンプ場', 'https://kouennoyado.jp/camp/', '公式案内で犬同伴用ドギーサイト（07〜09の3区画）を確認。通常サイト・グループサイトはペット同伴不可です。利用時は狂犬病予防注射済票、犬鑑札、期限内の混合ワクチン接種証等が必要です。');
    addVerifiedCategory('RVパーク平尾台テラス', '〒803-0180 福岡県北九州市小倉南区平尾台1-1-1', 33.7598621, 130.8904319, 'キャンプ場', 'https://www.hiraodai-terrace.com/', '公式案内で犬と利用できるRVパーク、ドッグラン、ノーリード可能サイトを確認。隣接するオートキャンプサイトはペット禁止のため、犬同伴ではRVパーク側の利用条件・区画を予約前に公式へ確認してください。');
    addVerifiedCategory('じゃぶち森のビレッジ', '〒824-0253 福岡県京都郡みやこ町犀川帆柱969-1', 33.5095233, 130.9560939, 'キャンプ場', 'https://www.town.miyako.lg.jp/sangyoushinkouka/silyou/jabuti/jabuchi_camp_1.html', '町公式案内でペット同伴宿泊可能なのはコテージ6（けやき）・7（やまもみじ）のみと確認。2026年4月1日以降は1泊2,500円追加。全棟・テントサイトで同伴可という意味ではありません。予約時に公式注意事項と利用条件をご確認ください。');
    addVerifiedCategory('７世代CAMP', '〒822-1103 福岡県田川郡福智町市場1908', 33.7137599, 130.7511557, 'キャンプ場', 'https://www.7sedai.com/faq', '公式FAQでペット同伴宿泊可（1匹1泊500円）、対象はキャンプサイトで、屋根裏グランピングはペット不可と確認。吠え・噛みつき等の受入制限があります。現行条件を予約前に公式へご確認ください。');
    addVerifiedCategory('CAMP NAGINOKI Onojo Base（キャンプなぎの木 大野城ベース）', '〒816-0902 福岡県大野城市乙金624-1', 33.5461367, 130.504457, 'キャンプ場', 'https://naginoki-camp.com/', '公式サイトでペット同伴可能（無料）とペット同伴規程を確認。リード等の規程を守ってご利用ください。営業・利用条件は予約前に公式へご確認ください。');
    addVerifiedCategory('Pet Hotel Bd', '〒812-0013 福岡県福岡市博多区博多駅東1丁目5-6', 33.594038373332985, 130.41918067569685, '預ける', 'https://pethotel-bd.com/', '公式案内で犬の宿泊・日帰り預かり、住所、営業時間を確認。夜間スタッフ常駐・予約条件や受入ルールは利用前に公式へご確認ください。');
    addVerifiedCategory('ペットホテルこころ', '〒812-0063 福岡県福岡市東区原田4-34-21', 33.62099349, 130.4399143, '預ける', 'https://www.petlifesupport-cocoro.com/pet-hotel/', '公式案内で犬猫の宿泊・一時預かり、所在地、営業時間を確認。受入条件・空き状況は予約前にご確認ください。');
    addVerifiedCategory('ペットホテル へそてん', '福岡県筑紫野市古賀507-7', 33.47724395, 130.51983092, '預ける', 'https://tanlamb20.sakura.ne.jp/hesoten_hp/', '公式サイト・予約ページで犬猫の宿泊と一時預かり、営業情報を確認。犬のサイズ別料金や受付時間を予約前に公式へご確認ください。');
    addVerifiedCategory('ドッグハウスS・K（ペットホテル）', '〒800-0227 北九州市小倉南区津田新町4-1-28', 33.8299991, 130.9255564, '預ける', 'https://doghouse-sk.com/store-pethotel/', '公式案内で犬猫の宿泊および短時間預かり、事前予約制を確認しました。');
    addVerifiedCategory('ワンルーク福岡東区店', '〒813-0036 福岡県福岡市東区若宮5-1-6 エクセレント若宮101', 33.64326, 130.44516, '預ける', 'https://oneluke.net/fukuokahigashi/hotel/', '公式案内で犬猫のペットホテル・一時預かり、営業時間、所在地、保管登録を確認。初回は狂犬病・混合ワクチン証明書等が必要です。料金・受入条件は予約時に公式へご確認ください。');
    addVerifiedCategory('ワンルーク福岡西区店', '〒819-0007 福岡県福岡市西区愛宕南1丁目3-20 谷本ビル', 33.57922, 130.33198, '預ける', 'https://oneluke.net/fukuokanishi/hotel/', '公式案内で犬猫のペットホテル・一時預かり、営業時間、所在地、現行の保管登録を確認。初回は狂犬病・混合ワクチン証明書等が必要です。料金・受入条件は予約時に公式へご確認ください。');
    addVerifiedCategory('五条ペット ミスターマックス橋本店', '〒819-0031 福岡県福岡市西区橋本1丁目10-72 ミスターマックス橋本店内', 33.559582511738654, 130.318236033929, '預ける', 'https://gojohpet.co.jp/shop/shop_11/', '公式店舗案内でペットホテル・一時預かり、所在地、2026年3月開店を確認。料金・対象動物・受入条件は利用前に店舗へご確認ください。');
    addVerifiedCategory('ワンラブ ホームワイドペット＆グリーン和白店', '〒811-0203 福岡県福岡市東区塩浜1-9-19 ホームワイド和白店内', 33.6915849, 130.421825, '預ける', 'https://www.pet-onelove.com/iphones/hotel/page283.php', '公式案内で犬猫の宿泊・一時預かり、店舗住所、営業時間、保管登録を確認。予約制で、犬猫それぞれワクチン接種証明などの提示が必要です。料金・受入条件は利用前に店舗へご確認ください。');
    addVerifiedCategory('ワンラブ 福岡総本店', '福岡県福岡市博多区西月隈1丁目13-54', 33.5732773, 130.4485075, '預ける', 'https://www.pet-onelove.com/hotel/page286.php', '公式ホテル案内で犬猫の宿泊・一時預かり、所在地、受付時間、予約制、ワクチン証明条件を確認。MapFanの店舗個別位置を公式所在地と照合しました。料金・受入条件は利用前に公式へご確認ください。');
    addVerifiedCategory('ピコワンワンショップ', '〒802-0971 福岡県北九州市小倉南区守恒本町2-14-10', 33.836034, 130.870607, '預ける', 'https://www.picowanwan.co.jp/shop', '公式店舗案内で犬専用ペットホテル、年中無休（10:00〜18:30）、所在地、保管登録の有効期限を確認。Yahoo!マップの施設専用ピンを公式住所と照合しました。料金・受入条件・空き状況は利用前に公式へご確認ください。');
    addVerifiedCategory('八幡警察犬訓練所（ペットホテル）', '〒808-0123 福岡県北九州市若松区大字有毛728-8', 33.91724343, 130.69231446, '預ける', 'https://www.hachidog.com/service/hotel/', '公式訓練所案内でペットホテル事業、所在地、保管業登録を確認。Yahoo!マップの施設専用ピンを公式住所と照合しました。犬専用です。利用条件・送迎・空き状況は予約前に公式へご確認ください。');
    addVerifiedCategory('ROMEO petsalon&hotel Romeo.Lue', '福岡県糟屋郡志免町御手洗2丁目11-15', 33.606844573273314, 130.4450419190491, '預ける', 'https://romeo-petsalon.com/hotel/', '公式ホテル案内で犬・猫の宿泊および一時預かり、糟屋店Romeo.Lueで大型犬等の対応を確認。初回は1年以内の狂犬病・混合ワクチン証明が必要です。Yahoo!マップ施設専用ピンを公式所在地と照合しました。最新料金・受入条件は予約前に公式へご確認ください。');
    addVerifiedCategory('TOMORROW COAST（ドッグラン付き客室）', '〒808-0124 福岡県北九州市若松区大字安屋2843', 33.93668300171049, 130.71582903823295, '宿泊', 'https://tomorrow-coast.com/', '公式案内でドッグラン付き客室のみ犬同伴可と確認。宿泊同意書の条件は1室10kgまで2頭、室内犬・基本的なしつけ・1年以内の狂犬病および混合ワクチン接種（証明書コピー提示）です。Yahoo!マップの施設専用ピンを公式住所と照合しました。予約時に最新条件をご確認ください。');
    addVerifiedCategory('大池公園ふれあいの里ログハウス', '〒871-0923 福岡県築上郡上毛町下唐原2335-1', 33.5581869, 131.1690959, '宿泊', 'https://fureainosato-loghouse.com/', '公式案内でペット宿泊可能な棟は「つばき」（6人棟）と「もみじ」（8人棟）の2棟のみ、大型犬可、ペット利用料1頭2,200円を確認。予約時に対象棟・頭数など最新条件をご確認ください。');
    addVerifiedCategory('ヒルトン福岡シーホーク（PAWSOME STAY）', '〒810-8650 福岡県福岡市中央区地行浜2-2-3', 33.59500936, 130.3595675, '宿泊', 'https://fukuokaseahawk.hiltonjapan.co.jp/rooms/lp/pet', '公式ドッグ宿泊プランで犬のみ、1室2頭まで（1頭15kg以内）、客室外はケージ・キャリー移動、狂犬病・5種混合以上の証明書提出を確認。専用プランの事前予約が必要です。');
    addVerifiedCategory('THE SHIKAKA（ザ・シカカ ホテル＆リゾート ぶどうの樹）', '〒819-1642 福岡県糸島市二丈鹿家844-8', 33.49530364, 130.05218294, '宿泊', 'https://reserve.489ban.net/client/itoshima-budounoki/0/detail/1293250', '公式予約案内でペット可のガーデンヴィラ3棟を確認。犬のみ・小型／超小型犬に限り1室2頭まで（2頭目は追加料金）。対象ヴィラ限定のため予約時に最新条件をご確認ください。');
    if (!document.getElementById('fukuoka-camp-filter-style')) {
      const style = document.createElement('style');
      style.id = 'fukuoka-camp-filter-style';
      style.textContent = '.fukuoka-filters button[data-cat="キャンプ場"]::before{content:"";display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:7px;background:#4c8b58}';
      document.head.appendChild(style);
    }
    const active = box.querySelector('button.active') || box.querySelector('[data-cat="all"]');
    if (active) applyFilter(active);
  };

  setTimeout(syncEvents, 1700);
  setTimeout(addCategoryButtonsAndMarkers, 1900);
  setInterval(syncEvents, 60 * 1000);
})();
