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
  }
};
