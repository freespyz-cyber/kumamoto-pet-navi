// Oita-only location overlay. Facility records and their official links remain
// the source of truth; coordinates are keyed by stable facility IDs.
// 'review' locations are visible only as candidates and must be checked before release.
window.oitaLocations = {
  400: {
    lat: 33.2255095,
    lng: 131.5801759,
    address: '大分市三芳',
    locationStatus: 'google-maps-verified',
    locationSource: 'http://oita-amc.jp/',
    locationNote: 'Googleマップで施設名と所在地「大分市三芳1074-13」が一致する地点を確認。'
  },
  401: {
    lat: 33.373001,
    lng: 131.533481,
    address: '速見郡日出町',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://nagano-ah.com/',
    locationNote: 'Googleマップで施設名と所在地「日出町3880-7」が一致する地点を確認。'
  },
  3: {
    lat: 33.278697,
    lng: 131.350083,
    address: '由布市湯布院町川上302-7',
    locationStatus: 'review',
    locationSource: 'https://www.ikkoten.com/access/',
    locationNote: '施設公式アクセスの地図コード由来。公開前に位置をご確認ください。'
  },
  102: {
    lat: 33.2323795,
    lng: 131.6711571,
    address: '大分市葛木',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E6%A3%AE%E3%82%AB%E3%83%95%E3%82%A7+%E3%83%AF%E3%83%B3%E3%83%BBLOVE/@33.2323795,131.6711571',
    locationNote: 'Googleマップで施設名「森カフェ ワン・LOVE」と所在地「大分市葛木」を照合。'
  },
  105: {
    lat: 33.17044407112692,
    lng: 131.53863361570697,
    address: '大分市大字廻栖野3231番地47',
    locationStatus: 'review',
    locationSource: 'https://oita-aigo.com/dogrun/',
    locationNote: '公式地図の施設敷地位置です。ドッグラン区画そのものの位置は要確認です。'
  },
  423: {
    lat: 33.5652746,
    lng: 131.2239267,
    address: '中津市福島',
    locationStatus: 'official-map',
    locationSource: 'https://beco-vet.com/',
    locationNote: '施設公式サイト内のGoogleマップ埋め込みから取得した位置です。'
  },
  424: {
    lat: 32.9544341,
    lng: 131.890303,
    address: '佐伯市城南町',
    locationStatus: 'official-map',
    locationSource: 'https://cocoro-animal.com/access',
    locationNote: '施設公式アクセスページのGoogleマップリンクに指定された位置です。'
  },
  402: {
    lat: 33.23172,
    lng: 131.621168,
    address: '大分市錦町',
    locationStatus: 'official-map',
    locationSource: 'https://hospital.anicom-med.co.jp/watanabe/clinic/',
    locationNote: '施設公式サイト内のGoogleマップ埋め込みから取得した位置です。'
  },
  403: {
    lat: 33.273206973460184,
    lng: 131.5061197,
    address: '別府市松原町',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/すえつぐ動物病院/@33.273207,131.5061197',
    locationNote: 'Googleマップで施設名・公式住所「別府市松原町1-8」が一致する地点を確認。'
  },
  405: {
    lat: 33.2126332,
    lng: 131.5865001,
    address: '大分市荏隈',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/南大分どうぶつ病院/@33.2126332,131.5865001',
    locationNote: 'Googleマップで施設名と所在地「大分市荏隈319番地10」が一致する地点を確認。'
  },
  438: {
    lat: 33.32339493248372,
    lng: 130.94189787573927,
    address: '日田市上城内町',
    locationStatus: 'official-map',
    locationSource: 'https://iida-ah.com/about',
    locationNote: '施設公式サイト内のGoogleマップ埋め込みから取得した位置です。'
  },
  5: {
    lat: 33.2434302,
    lng: 131.3331935,
    address: '由布市湯布院町中川1120',
    locationStatus: 'official-map',
    locationSource: 'https://www.yufuin-gardenhotel.jp/access/',
    locationNote: '施設公式アクセスページのGoogleマップリンクから取得した位置です。'
  },
  4: {
    address: '由布市湯布院町川上3639-1',
    locationSource: 'https://www.yufuinlamp.com/',
    locationNote: '公式サイトで住所確認済み。個別座標は未取得です。'
  },
  6: {
    lat: 33.27558337345924,
    lng: 131.36211677568352,
    address: '由布市湯布院町川上460-6',
    locationStatus: 'review',
    locationSource: 'https://www.regina-resorts.com/yufuin/main/access/',
    locationNote: '公式アクセスページのGoogleマップ表示中心から取得。施設の入口位置との一致は要照合です。'
  },
  7: {
    address: '由布市湯布院町川上447-1',
    locationSource: 'https://www.regina-resorts.com/yufuin/main/access/',
    locationNote: '公式アクセスページで住所確認済み。圍-Kakoi-個別の座標は未取得です。'
  },
  9: {
    lat: 33.2807444,
    lng: 131.5069861,
    address: '別府市北浜3丁目13-21',
    locationStatus: 'review',
    locationSource: 'https://koraku.net/access/',
    locationNote: '公式アクセスページのGoogleマップ表示中心から取得。施設入口との一致は要照合です。'
  },
  11: {
    lat: 33.26719976783896,
    lng: 131.36099755485705,
    address: '由布市湯布院町川上1086-2',
    locationStatus: 'review',
    locationSource: 'https://www.yufuin-enokiya.jp/access/',
    locationNote: '公式アクセスページのGoogleマップ表示中心から取得。施設の入口位置との一致は要照合です。'
  },
  406: {
    lat: 33.517266453083195,
    lng: 131.33840195150026,
    address: '宇佐市別府',
    locationStatus: 'official-map',
    locationSource: 'https://heiwa-animal.com/aceess/',
    locationNote: '施設公式アクセスページのGoogleマップ埋め込みから取得した位置です。'
  },
  407: {
    address: '別府市中須賀東町',
    locationStatus: 'review',
    locationSource: 'https://mpanimal.com/',
    locationNote: '公式サイト記載の住所とGoogleマップの施設名・所在地が一致。ピン位置を公開前に最終照合してください。'
  },
  408: {
    lat: 33.242369,
    lng: 131.6613006,
    address: '大分市仲西町',
    locationStatus: 'review',
    locationSource: 'https://www.google.com/maps/place/COMS動物病院/@33.242369,131.6613006',
    locationNote: '公式サイトは仲西町1-3-11、市の委託病院一覧は1-3-16と記載。番地情報が一致しないため個別ピンを保留し、地域表示。'
  },
  409: {
    lat: 33.242439,
    lng: 131.630709,
    address: '大分市中津留',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/藤田犬猫病院/@33.242439,131.630709',
    locationNote: 'Googleマップで施設名と所在地「大分市中津留1-9-24」が一致する地点を確認。'
  },
  410: {
    lat: 33.282495,
    lng: 131.502432,
    address: '別府市南的ヶ浜町',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/えとう動物病院/@33.282495,131.502432',
    locationNote: 'Googleマップで施設名と所在地「別府市南的ケ浜町1-27」が一致する地点を確認。'
  },
  411: {
    lat: 33.3246578,
    lng: 130.9390056,
    address: '日田市中城町',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/末松どうぶつ病院/@33.3246578,130.9390056',
    locationNote: 'Googleマップで施設名と所在地「日田市中城町3-52」が一致する地点を確認。'
  },
  412: {
    lat: 33.2411452,
    lng: 131.6288368,
    address: '大分市東津留',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/尾石動物病院/@33.2411452,131.6288368',
    locationNote: 'Googleマップで施設名と所在地「大分市東津留1-1-21」が一致する地点を確認。'
  },
  413: {
    lat: 33.2425639,
    lng: 131.6034817,
    address: '大分市千代町',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/くまさきアニマルクリニック/@33.2425639,131.6034817',
    locationNote: 'Googleマップで施設名と所在地「大分市千代町4-1-5」が一致。ビル内の区画ではなく建物位置のピンです。'
  },
  417: {
    lat: 33.249342,
    lng: 131.7217003,
    address: '大分市横田',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/アイランド動物病院/@33.249342,131.7217003',
    locationNote: 'Googleマップで施設名と所在地「大分市横田2-18-43」が一致する地点を確認。'
  },
  425: {
    address: '臼杵市市浜',
    locationStatus: 'review',
    locationSource: 'https://www.google.com/maps/search/?api=1&query=アニマルケアセンターうすき動物病院+臼杵市',
    locationNote: '公式サイトで現住所「臼杵市市浜1198-2」と確認。病院名だけで検索すると移転前の臼杵市末広を案内する場合があるとの公式注意があるため、個別座標を確定せず保留。'
  },
  420: {
    address: '大分市田原',
    locationStatus: 'review',
    locationSource: 'https://www.google.com/maps/search/?api=1&query=ルシア動物病院+大分市',
    locationNote: '市公式委託病院一覧・施設紹介で所在地「大分市田原61-5」は確認。個別地点のGoogleマップ座標を直接特定できず、ピンは保留。'
  },
  422: {
    address: '大分市金池町',
    locationStatus: 'review',
    locationSource: 'https://www.google.com/maps/search/?api=1&query=大分小動物病院+大分市',
    locationNote: '公式HP・獣医師会情報で所在地「大分市金池町3-1-98」は一致。Googleマップの個別位置を直接照合できず、座標は保留。'
  },
  418: {
    lat: 33.2111215,
    lng: 131.5647243,
    address: '大分市賀来南',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/かく動物病院/@33.2111215,131.5647243',
    locationNote: 'Googleマップで施設名と所在地「大分市賀来南1丁目17-28」が一致する地点を確認。'
  },
  419: {
    lat: 33.57516,
    lng: 131.192459,
    address: '中津市相原',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/ハートフル動物病院/@33.57516,131.192459',
    locationNote: 'Googleマップで施設名と所在地「中津市相原3748-1」が公式サイト記載と一致する地点を確認。'
  },
  429: {
    address: '日田市元町',
    locationStatus: 'review',
    locationSource: 'https://dvm-higuchi.jimdofree.com/交通-アクセス/',
    locationNote: '公式アクセスで所在地「日田市元町20-3」を確認。Googleマップ個別ピンの座標は未確認のため、個別ピンは保留。'
  },
  414: {
    address: '宇佐市辛島',
    locationStatus: 'review',
    locationSource: 'https://kamikaze-ichibanki.com/2025/09/07/新店舗に移転いたしました。',
    locationNote: '2025年9月の公式移転告知で新住所「宇佐市辛島217-1」を確認。旧登録座標は移転前の可能性があるため削除し、新店舗のGoogleマップ位置が照合できるまで個別ピンは保留。'
  },
  416: {
    lat: 33.2085873,
    lng: 131.5898529,
    address: '大分市明磧町',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/あいのわペットクリニック/@33.2085873,131.5898529',
    locationNote: 'Googleマップ検索で施設名と所在地「大分市明磧町1-1-3」が一致する地点を確認。'
  },
  421: {
    lat: 33.2133236,
    lng: 131.5706372,
    address: '大分市賀来北',
    locationStatus: 'review',
    locationSource: 'https://www.maple-animal.com/clinic',
    locationNote: '公式HP記載住所と地図事業者の施設名・住所を照合。座標は地図事業者由来の候補で、公開前に要確認。'
  },
  427: {
    address: '大分市新春日町',
    locationStatus: 'review',
    locationSource: 'https://xn--hhrz38bwjikldm01b3cm.com/',
    locationNote: '有賀動物病院の公式HP住所とGoogleマップ掲載住所が一致。公開前にピン位置を最終照合してください。'
  },
  426: {
    address: '大分市猪野',
    locationStatus: 'review',
    locationSource: 'https://www.navitime.co.jp/poi?spot=00011-080835242',
    locationNote: 'NAVITIME掲載座標と公式HP記載住所が一致。公開前にピン位置を最終照合してください。'
  },
  440: {
    lat: 33.42384959999999,
    lng: 131.70319809999998,
    address: '杵築市狩宿',
    locationStatus: 'official-map',
    locationSource: 'https://nata-ss-ah.com/',
    locationNote: '公式HP記載住所と公式ページのGoogleマップ埋め込み位置です。'
  },
  435: {
    address: '大分市田尻',
    locationStatus: 'review',
    locationSource: 'https://mapfan.com/spots/S3QYQ%2CJ%2CT7T5R',
    locationNote: 'アティオ動物病院の地図事業者掲載座標。公式HP登録の施設住所と照合し、公開前にピン位置を要確認。'
  },
  436: {
    address: '大分市久原南',
    locationStatus: 'review',
    locationSource: 'https://www.navitime.co.jp/poi?spot=00011-080835237',
    locationNote: 'NAVITIME掲載の施設座標を公式HP記載住所と照合。公開前にピン位置を要確認。'
  },
  404: {
    lat: 33.21160398074897,
    lng: 131.659041,
    address: '大分市横尾',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/隼人どうぶつ病院/@33.211604,131.659041',
    locationNote: 'Googleマップで施設名・公式住所「大分市横尾4213-2」が一致する地点を確認。'
  },
  415: {
    address: '豊後高田市新町',
    locationStatus: 'review',
    locationSource: 'https://oita.vet/',
    locationNote: '公式HPで正式名称「おおいた動物病院 北部医療センター」と所在地「豊後高田市新町2017-1」を確認。施設の個別Googleマップ座標は未照合のため地域表示。'
  },
  428: {
    address: '大分市明野高尾',
    locationStatus: 'review',
    locationSource: 'https://oita-vma.jp/hospital_details/?code=44201',
    locationNote: '獣医師会案内で所在地「大分市明野高尾3-22-17」を確認。個別座標は未照合のため地域表示。'
  },
  430: {
    address: '大分市皆春',
    locationStatus: 'review',
    locationSource: 'https://minaharu-pc.com/',
    locationNote: '施設公式HPで所在地「大分市皆春307-8」を確認。個別Googleマップ座標は未照合のため地域表示。'
  },
  431: {
    address: '臼杵市祇園東',
    locationStatus: 'review',
    locationSource: 'https://oita-vma.jp/hospital_details/?code=44206',
    locationNote: '獣医師会案内で所在地「臼杵市祇園東4」を確認。個別座標は未照合のため地域表示。'
  },
  432: {
    address: '大分市西鶴崎',
    locationStatus: 'review',
    locationSource: 'https://ammicco-vet.com/access',
    locationNote: '施設案内で所在地「大分市西鶴崎2-2-1」を確認。個別座標は未照合のため地域表示。'
  },
  433: {
    address: '大分市横塚',
    locationStatus: 'review',
    locationSource: 'https://www.city.oita.oita.jp/o245/kurashi/pet/1470729348283.html',
    locationNote: '大分市・獣医師会案内で所在地「大分市横塚1-14-23」を確認。個別座標は未照合のため地域表示。'
  },
  434: {
    address: '日田市中央',
    locationStatus: 'review',
    locationSource: 'https://www.city.hita.oita.jp/soshiki/21/2609.html',
    locationNote: '日田市の動物病院案内で所在地「中央2丁目」を確認。個別座標は未照合のため地域表示。'
  },
  437: {
    address: '国東市国東町田深',
    locationStatus: 'review',
    locationSource: 'https://fujiwara-animal-clinic.amebaownd.com/',
    locationNote: '施設公式HPで所在地「国東市国東町田深910」を確認。個別Googleマップ座標は未照合のため地域表示。'
  },
  439: {
    address: '大分市宮崎',
    locationStatus: 'review',
    locationSource: 'https://kai-clinic.jp/clinic/oita-oita/',
    locationNote: '海動物病院公式HPの大分往診所で所在地「大分市宮崎829-6」を確認。往診所のため訪問診療エリアと施設地点を混同しないよう個別ピンは未設定。'
  },
  110: {
    lat: 33.5162236,
    lng: 131.3435751,
    address: '宇佐市別府',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/SORAcafe/@33.5162236,131.3435751',
    locationNote: 'Googleマップで店名「SORAcafe」と所在地「宇佐市別府」を照合。'
  },
  111: {
    lat: 33.3128425,
    lng: 131.4707066,
    address: '別府市火売',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/DOG+CAFE+KURUSAN/@33.3128425,131.4707066',
    locationNote: 'Googleマップで店名「DOG CAFE KURUSAN」と所在地「別府市火売」を照合。'
  },
  201: {
    lat: 33.0462192,
    lng: 131.2472861,
    address: '竹田市久住町',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/Cafe+Boi+Boi/@33.0462192,131.2472861',
    locationNote: 'Googleマップで店名「Cafe Boi Boi」と所在地「竹田市久住町」を照合。公式Instagramの施設情報とも一致。'
  },
  202: {
    lat: 33.2632675,
    lng: 131.3299407,
    address: '由布市湯布院町',
    officialUrl: 'https://kunuginooka.com/index.html',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/Pizzeria+%E6%AB%9F%E3%81%AE%E4%B8%98/@33.2632675,131.3299407',
    locationNote: 'Googleマップで店名「Pizzeria 櫟の丘」と所在地「由布市湯布院町」を照合。公式サイトの所在地とも一致。'
  },
  203: {
    lat: 33.2419284,
    lng: 131.72211,
    address: '大分市政所',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E3%82%AB%E3%83%95%E3%82%A7+flap+fly/@33.2419284,131.72211',
    locationNote: 'Googleマップで店名「カフェ flap fly」と所在地「大分市政所」を照合。公式Instagramの所在地とも一致。'
  },
  205: {
    lat: 33.2645627,
    lng: 131.3584444,
    address: '由布市湯布院町',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/ゆふいんバーガーハウス/@33.2645627,131.3584444',
    locationNote: 'Googleマップで店名「ゆふいんバーガーハウス」と所在地「由布市湯布院町」を照合。公式Instagramのリンク先も一致。住所表示は町名まで。'
  },
  206: {
    lat: 33.2661184,
    lng: 131.3629718,
    address: '由布市湯布院町',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/榎屋茶房/@33.2661184,131.3629718',
    locationNote: 'Googleマップで店名「榎屋茶房」と所在地「由布市湯布院町」を照合。公式サイトの茶房ページとも一致。住所表示は町名まで。'
  },
  208: {
    lat: 33.356096,
    lng: 131.5961178,
    address: '速見郡日出町',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/おおがファーム+Ogafarm/@33.356096,131.5961178',
    locationNote: 'Googleマップで店名「おおがファーム Ogafarm」と所在地「日出町」を照合。公式サイトと同一施設です。住所表示は町名まで。'
  },
  210: {
    lat: 32.9598704,
    lng: 131.3826256,
    address: '竹田市拝田原',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/カフェ+カプリセス/@32.9598704,131.3826256',
    locationNote: 'Googleマップで店名「カフェ カプリセス」と所在地「竹田市拝田原」を照合。公式ページ kuju-egg.jp と一致。住所表示は町名まで。'
  },
  211: {
    lat: 33.2624408,
    lng: 131.3564222,
    address: '由布市湯布院町',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/J-tapas/@33.2624408,131.3564222',
    locationNote: 'Googleマップで店名「J-tapas」と所在地「由布市湯布院町」を照合。公式Instagramのリンク先も一致。住所表示は町名まで。'
  },
  212: {
    lat: 33.0502326,
    lng: 131.2475718,
    address: '竹田市久住町',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/久住ワイナリーレストラン石窯工房/@33.0502326,131.2475718',
    locationNote: 'Googleマップで店名「久住ワイナリーレストラン石窯工房」と所在地「竹田市久住町」を照合。公式サイト kuju-winery.co.jp の施設と一致。住所表示は町名まで。'
  },
  218: {
    lat: 33.066549,
    lng: 131.954566,
    address: '津久見市',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/Ｏｐｅｎ+ｃａｆｆｅ+桜/@33.066549,131.954566',
    locationNote: 'Googleマップで店名「Open caffe 桜」と所在地「津久見市」を照合。公式Facebook・Instagramの店舗情報と一致。住所表示は市町名まで。'
  },
  219: {
    lat: 33.3349183,
    lng: 131.46408,
    address: '別府市内竈',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/アルテジオダイニング/@33.3349183,131.46408',
    locationNote: 'Googleマップで店名「アルテジオダイニング」と別府湾SAの施設位置を照合。西日本高速道路の公式案内でテラス席のペット同伴飲食を確認。住所表示は市町名まで。'
  },
  224: {
    lat: 33.3147301,
    lng: 131.4773158,
    address: '別府市鉄輪',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/地熱観光ラボ縁間/@33.3147301,131.4773158',
    locationNote: 'Googleマップで店名「地熱観光ラボ縁間」と所在地「別府市鉄輪」を照合。公式サイト enma-ch.com の施設と一致。住所表示は町名まで。'
  },
  226: {
    lat: 33.073741,
    lng: 131.3794689,
    address: '竹田市直入町長湯',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/ジプシースマイルカフェ/@33.073741,131.3794689',
    locationNote: 'Googleマップで店名「ジプシースマイルカフェ」と所在地「竹田市直入町長湯」を照合。公式サイト gypsys-mile.com の施設と一致し、Googleマップの利用者情報に犬連れ利用を確認。住所表示は町名まで。'
  },
  220: {
    lat: 33.2212909,
    lng: 131.6536937,
    address: '大分市明野東',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/Dining+%26+Cafe+LA+LUCE+80%E2%84%83/@33.2212909,131.6536937,17z',
    locationNote: 'Googleマップで店名「Dining & Cafe LA LUCE 80℃」と所在地「大分市明野東」を照合。公式サイト laluce80.com と一致。住所表示は町名まで。'
  },
  200: {
    lat: 33.2493697,
    lng: 131.1674473,
    address: '玖珠郡九重町粟野',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E6%98%A5%E6%97%A5%E3%81%86%E3%81%A9%E3%82%93/@33.2493697,131.1674473',
    locationNote: 'Googleマップで店名「春日うどん」を検索し、公式Instagramの食事処 春日（春日うどん）・九重町粟野1140-1と一致する店舗を確認。住所表示は町名まで。'
  },
  217: {
    lat: 33.3119193,
    lng: 131.4562768,
    address: '別府市小倉町',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E6%A3%AE%E8%97%A9%E5%88%A5%E9%82%B8/@33.3119193,131.4562768',
    locationNote: 'Googleマップで施設名「森藩別邸」を照合し、別府市小倉町68-70と確認。公式サイトでペット同伴席・ペットと食事できるスペースを確認。住所表示は町名まで。'
  },
  600: {
    lat: 33.2832673,
    lng: 131.1551544,
    address: '玖珠郡玖珠町帆足',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/Hounds+Cafe+Leon/@33.2832673,131.1551544',
    locationNote: 'Googleマップで店名「Hounds Cafe Leon」と玖珠町帆足の店舗を照合。公式サイトでカフェ営業・店内犬同伴を確認。住所表示は町名まで。'
  },
  601: {
    lat: 33.1718185,
    lng: 131.1693784,
    address: '玖珠郡九重町町田',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E3%83%99%E3%83%AA%E3%83%BC%E3%82%B8%E3%83%A5%E3%83%95%E3%82%A1%E3%83%BC%E3%83%A0/@33.1718185,131.1693784',
    locationNote: 'Googleマップで店名「ベリージュファーム」と九重町町田の住所を照合。飲食営業は公式情報、ペット同伴テラスは店舗紹介・利用者情報で確認。住所は町名まで表示。'
  },
  602: {
    lat: 33.1692786,
    lng: 131.249273,
    address: '玖珠郡九重町田野',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E8%BE%B2%E5%AE%B6%E3%83%AC%E3%82%B9%E3%83%88%E3%83%A9%E3%83%B3+%E3%81%B9%E3%81%B9%E3%82%93%E3%81%93/@33.1692786,131.249273',
    locationNote: 'Googleマップで店名「農家レストラン べべんこ」と九重町田野の住所を照合。公式サイトで飲食営業、店舗案内でペット入店は共生スペースのみと確認。住所は町名まで表示。'
  },
  603: {
    lat: 33.3355929,
    lng: 131.2127795,
    address: '玖珠郡玖珠町日出生',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/Cafe+%E3%83%8A%E3%82%A4%E3%83%88%EF%BC%86%E3%83%91%E3%83%91/@33.3355929,131.2127795',
    locationNote: 'Googleマップで店名「ナイト＆パパ」を検索し、公式店舗情報の玖珠町日出生3478と一致する店舗を確認。公式注意書きに従い住所からでなく店名検索で照合。住所表示は町名まで。犬同伴時は公式の接種証明・利用条件を要確認。'
  },
  103: {
    lat: 33.3818431,
    lng: 131.5426774,
    address: '速見郡日出町藤原',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E3%83%89%E3%83%83%E3%82%B0%E3%83%A9%E3%83%B3%E3%82%AB%E3%83%95%E3%82%A7+%E3%83%8F%E3%83%AB/@33.3818431,131.5426774',
    locationNote: 'Googleマップで「ドッグランカフェ ハル」・日出町藤原2304-3を照合。飲食・犬同伴カフェは確認済みだが、公式SNSの一時休業告知後の再開確認が未了のため掲載保留は維持。'
  },
  223: {
    lat: 33.3349682,
    lng: 131.4642178,
    address: '別府市内竈',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/B-speak+cafe/@33.3349682,131.4642178',
    locationNote: 'Googleマップで「B-speak cafe」・別府湾SA内の店舗位置を照合。公式サイトでテラス席のペット同伴利用可を確認。住所表示は市町名まで。'
  },
  604: {
    lat: 32.807218,
    lng: 131.9618123,
    address: '佐伯市蒲江大字竹野浦河内',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E3%81%86%E3%81%95%E3%81%8E%E4%BA%AD/@32.807218,131.9618123',
    locationNote: 'Googleマップで「うさぎ亭」・佐伯市蒲江大字竹野浦河内2186-2を照合。佐伯市観光ナビで飲食店とペット同伴可を確認。住所表示は町名まで。ペット利用可能な席・条件は来店前に店舗へ確認してください。'
  },
  605: {
    lat: 33.5959592,
    lng: 131.2036566,
    address: '中津市牛神',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E3%82%A8%E3%83%AB%E3%83%86%E3%82%A3%E3%82%AB%E3%83%95%E3%82%A7+%E5%A4%A7%E5%88%86%E4%B8%AD%E6%B4%A5%E5%BA%97/@33.5959592,131.2036566',
    locationNote: 'Googleマップで「エルティカフェ 大分中津店」・中津市牛神221-5を照合。公式サイトで飲食営業と犬同伴（店内・テラス）を確認。住所表示は町名まで。'
  },
  606: {
    lat: 33.2254595,
    lng: 131.3003218,
    address: '由布市湯布院町川西',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E6%A3%AE%E3%81%AE%E3%82%AB%E3%83%95%E3%82%A7%E3%83%86%E3%83%AA%E3%82%A2+11%E5%8C%BA/@33.2254595,131.3003218',
    locationNote: 'Googleマップで「森のカフェテリア11区」・由布市湯布院町川西1750-145を照合。公式サイトで飲食営業と屋外のペット連れ専用席を確認。公式案内に従い、来店時は住所ではなくGoogleマップで店名検索してください。'
  },
  607: {
    lat: 33.2673733,
    lng: 131.3688473,
    address: '由布市湯布院町川上',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/CAFE+LA+RUCHE/@33.2673733,131.3688473',
    locationNote: 'Googleマップで「CAFE LA RUCHE」・由布市湯布院町川上1592-1を照合。由布院オッポの食事案内で飲食とテラス席の犬同伴可を確認。住所表示は町名まで。'
  },
  608: {
    lat: 33.266004,
    lng: 131.36232,
    address: '由布市湯布院町川上',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/search/?api=1&query=%E3%82%B3%E3%83%9F%E3%83%81%E3%82%AB%E3%83%95%E3%82%A7+%E7%94%B1%E5%B8%83%E5%B8%82%E6%B9%AF%E5%B8%83%E9%99%A2%E7%94%BA%E5%B7%9D%E4%B8%8A3001-8',
    locationNote: '由布院公式旅ガイドの所在地「湯布院町川上3001-8」とGoogleマップ検索先を照合。公式旅ガイドで店内の犬同伴可、営業時間・定休日を確認。住所は町名まで表示。'
  }
};
