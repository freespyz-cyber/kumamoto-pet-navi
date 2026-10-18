// Oita-only location overlay. Facility records and their official links remain
// the source of truth; coordinates are keyed by stable facility IDs.
// Verified map locations are keyed by stable facility IDs; statuses identify the source of each facility-level point.
window.oitaLocations = {
  58: {
    lat: 33.424827,
    lng: 131.17807,
    address: '中津市本耶馬渓町西谷1448',
    locationStatus: 'official-map',
    locationSource: 'https://nishitanispa.com/アクセス/',
    locationNote: '施設公式アクセスページの施設名付きGoogleマップ地点を使用し、公式住所と照合。施設全体の位置で、犬同伴可サイトの区画そのものではありません。'
  },
  59: {
    lat: 33.0425770055726,
    lng: 131.3796534514777,
    address: '竹田市直入町長湯1790',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://panda-camp.com/nagayu-kirari/',
    locationNote: '施設名付きGoogleマップ地点を確認し、運営者公式ページ記載の住所と照合。施設全体の位置で、個別キャンプサイトの位置ではありません。'
  },
  60: {
    lat: 33.06664746901458,
    lng: 131.36894711317095,
    address: '竹田市直入町大字長湯3101',
    locationStatus: 'official-map',
    locationSource: 'https://grandpark-nagayu.jp/access',
    locationNote: '施設公式アクセスページの施設名付きGoogleマップ埋め込み地点を使用し、同ページ記載住所と照合。キャンプ場全体の位置です。'
  },
  57: {
    lat: 33.05022448884273,
    lng: 131.9357922260182,
    address: '佐伯市上浦大字津井',
    locationStatus: 'official-map',
    locationSource: 'https://cottage-kamiura.jp/pet/',
    locationNote: '施設公式のペット案内ページに埋め込まれた施設名付きGoogleマップ地点を使用。佐伯市観光公式の施設所在地と照合。施設全体の位置で、各コテージ・ペット可客室の位置ではありません。'
  },
  47: {
    lat: 33.28917286500215,
    lng: 131.05268971489156,
    address: '玖珠郡玖珠町戸畑9619-1',
    locationStatus: 'official-map',
    locationSource: 'https://paradiso8.jp/',
    locationNote: '施設公式アクセス欄のGoogleマップ埋め込みにある施設名付き地点と、公式住所「玖珠郡玖珠町戸畑9619-1」を照合。施設全体の位置で、ペット可のキャンプ区画位置を示すものではありません。'
  },
  48: {
    lat: 33.4933313376,
    lng: 131.580254316,
    address: '杵築市大田波多方4448-1',
    locationStatus: 'official-map',
    locationSource: 'https://o-sinkou.jimdofree.com/アクセス-駐車場/',
    locationNote: '横岳自然公園公式アクセスページのGoogleマップ埋め込み地点と管理事務所の公式住所を照合。施設全体の位置で、北側のペット可サイト区画そのものではありません。'
  },
  51: {
    lat: 33.1848699,
    lng: 130.9038622,
    address: '日田市前津江町大野64-1',
    locationStatus: 'official-map',
    locationSource: 'https://www.snowpeak.co.jp/locations/okuhita/index.html',
    locationNote: 'スノーピーク公式アクセスページの施設名付きGoogleマップ埋め込み地点と公式住所を照合。'
  },
  34: {
    lat: 32.80382529,
    lng: 131.61044824,
    address: '佐伯市宇目大字南田原2513-3',
    locationStatus: 'mapion-verified',
    locationSource: 'https://www.mapion.co.jp/phonebook/M04002/44205/ILSP0000119024_ipclm/',
    locationNote: 'Mapionの施設名付き地図位置（32.80382529, 131.61044824）を使用。施設名・所在地はうめキャンプ村公式および大分県観光公式の住所「佐伯市宇目大字南田原2513-3」と照合。施設全体の位置で、ペット可サイト区画そのものではありません。'
  },
  49: {
    lat: 33.2545787,
    lng: 131.1501563,
    address: '玖珠郡玖珠町大隈1794-2',
    locationStatus: 'yahoo-map-verified',
    locationSource: 'https://map.yahoo.co.jp/v3/place/C6d5qGO1dxY',
    locationNote: '施設名付きYahoo!マップの地点を確認し、施設公式の住所「玖珠郡玖珠町大隈1794-2」と照合。キャンプ場全体の位置で、犬同伴可能な柵付き区画の位置ではありません。'
  },
  52: {
    lat: 33.446363,
    lng: 131.3527367,
    address: '宇佐市安心院町下毛828-1',
    locationStatus: 'yahoo-map-verified',
    locationSource: 'https://map.yahoo.co.jp/v3/place/0ftT7BivqDY',
    locationNote: '施設名付きYahoo!マップの地点を確認し、施設公式と宇佐市公式の住所「宇佐市安心院町下毛828-1」と照合。施設全体の位置で、犬同伴可能な2棟や各棟の専用ドッグラン位置ではありません。'
  },
  54: {
    lat: 32.8103737,
    lng: 131.9675797,
    address: '佐伯市蒲江大字竹野浦河内2156-171',
    locationStatus: 'yahoo-map-verified',
    locationSource: 'https://map.yahoo.co.jp/v3/place/MOGBK74VndY',
    locationNote: '施設名付きYahoo!マップの地点を確認し、佐伯市観光ナビの公式住所「佐伯市蒲江大字竹野浦河内2156-171」と照合。施設全体の位置で、屋外のペット可区画そのものではありません。'
  },
  45: {
    lat: 33.13902108086417,
    lng: 131.2530159151913,
    address: '玖珠郡九重町田野1712-440',
    locationStatus: 'official-map',
    locationSource: 'https://9base.jp/access/',
    locationNote: '施設公式アクセスページに埋め込まれた施設名「9.BASE」のGoogleマップ位置を確認。公式住所（玖珠郡九重町田野1712-440）と照合。'
  },
  115: {
    lat: 33.048254,
    lng: 131.243794,
    address: '竹田市久住町大字久住4050',
    locationStatus: 'official-map',
    locationSource: 'https://kuju-flower-park.com/access/',
    locationNote: 'くじゅう花公園公式アクセスページの施設名付きGoogleマップリンクの表示地点と、公式所在地を照合。'
  },
  37: {
    lat: 33.0451513,
    lng: 131.2489238,
    address: '竹田市久住町大字久住4050-11',
    locationStatus: 'official-map',
    locationSource: 'https://boiboicamp.com/about/',
    locationNote: '施設公式ページの住所と、同ページから開く公式Googleマップの施設位置を照合。'
  },
  38: {
    lat: 33.2648538,
    lng: 131.4524991,
    address: '別府市東山4380-1',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://mapfan.com/spots/SCCCA%2CJ%2CI50',
    locationNote: '別府市公式の施設住所・キャンプ場案内と、MapFanのRECAMP別府志高湖（市営志高湖野営場）施設個別位置を照合。'
  },
  39: {
    lat: 33.3236372,
    lng: 131.1377209,
    address: '玖珠郡玖珠町大字太田4098-16',
    locationStatus: 'official-map',
    locationSource: 'https://kusunomori.com/',
    locationNote: '施設公式の所在地と、同公式サイトのGoogleマップ埋め込み（施設名付き）の中心位置を照合。'
  },
  40: {
    lat: 33.0472791,
    lng: 131.2051380,
    address: '竹田市久住町大字久住4050',
    locationStatus: 'official-map',
    locationSource: 'https://hanatohoshi.com/access/',
    locationNote: '施設公式の所在地と、同ページに埋め込まれた施設位置のGoogleマップを照合。'
  },
  41: {
    lat: 33.311187,
    lng: 131.461561,
    address: '別府市小倉町64-55',
    locationStatus: 'official-map',
    locationSource: 'https://www.granxia-beppu.com/',
    locationNote: '施設公式の住所と、公式ページに埋め込まれたGoogleマップの施設中心位置を照合。'
  },
  42: {
    lat: 33.2787893,
    lng: 131.3547348,
    address: '由布市湯布院町川上398',
    locationStatus: 'official-map',
    locationSource: 'https://hoshinoresorts.com/ja/hotels/kaiyufuin/',
    locationNote: '星野リゾート公式アクセス欄の施設名付きGoogleマップ位置と公式住所を照合。'
  },
  35: {
    lat: 33.0608497,
    lng: 131.6464695,
    address: '豊後大野市犬飼町田原714-33',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://mapfan.com/spots/SCC35%2CJ%2CEY',
    locationNote: '公式アクセスページの施設名・所在地「豊後大野市犬飼町田原714-33」と、MapFanのリバーパーク犬飼施設個別ページの位置を照合。公園・キャンプ施設敷地のピンで、個別ログハウス区画の位置ではありません。'
  },
  101: {
    lat: 33.0608497,
    lng: 131.6464695,
    address: '豊後大野市犬飼町田原714-33',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://mapfan.com/spots/SCC35%2CJ%2CEY',
    locationNote: '公式アクセスページの所在地と、MapFanの施設個別位置を照合。公園・キャンプ施設敷地のピンで、個別ログハウス区画ではありません。'
  },
  1: {
    lat: 33.29123196489454,
    lng: 131.45895641550646,
    address: '別府市堀田町11-69',
    locationStatus: 'official-map',
    locationSource: 'https://relohotels.com/list_of_hotels/beppu-dogresort/',
    locationNote: '運営会社公式の施設ページに埋め込まれたGoogleマップ位置。公式住所「別府市堀田町11-69」と照合。'
  },
  2: {
    lat: 33.32932576264792,
    lng: 131.48190116385152,
    address: '別府市野田114-1',
    locationStatus: 'official-map',
    locationSource: 'https://www.wanko-yururi.com/smart/detail.php?pg=access',
    locationNote: '施設公式アクセスページに埋め込まれたGoogleマップ位置。公式施設住所「別府市野田114-1」と照合。運営会社が2026年10月1日に変更されたため予約条件は最新案内を確認。'
  },
  254: {
    lat: 33.2625285,
    lng: 131.3554899,
    address: '由布市・湯布院町川北',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E3%81%8A%E3%82%80%E3%81%99%E3%81%B3Caf%C3%A9+TABIMUSUBI%EF%BC%9C%E3%81%9F%E3%81%B3%Eむすび%EF%BC%9E/@33.2625285,131.3554899,17z/',
    locationNote: 'Googleマップで「おむすびCafe TABIMUSUBI 湯布院」を検索。表示店舗の住所（湯布院町川北）と公式SNS・湯布院公式旅ガイドの町名が一致することを確認。検索語に番地は使用していません。'
  },
  253: {
    lat: 33.2670478,
    lng: 131.3623708,
    address: '由布市・湯布院町川上',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E3%83%88%E3%83%A9%E3%83%83%E3%83%88%E3%83%AA%E3%82%A2%E3%83%BB%E3%83%87%E3%82%A3%E3%82%A2%E3%83%8A/@33.2670478,131.3623708,17z/',
    locationNote: 'Googleマップで「Trattoria diana 湯布院」を検索。表示された「トラットリア・ディアナ」と店舗ページの所在地・町名が一致。番地は検索語に使用していません。'
  },
  252: {
    lat: 33.2609895,
    lng: 131.3611473,
    address: '由布市・湯布院町川上',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E7%94%B1%E5%B8%83%E5%B2%B3%E4%B8%80%E6%9C%9B%E3%81%AE%E3%82%AB%E3%83%95%E3%82%A7+%E6%B9%AF%E5%B8%83%E9%99%A2%E5%8D%83%E5%AE%B6/@33.2609895,131.3611473,17z/',
    locationNote: 'Googleマップで「湯布院 千家」を検索し、表示店舗名と公式サイトの湯布院町川上の案内が一致する位置を確認。番地は検索語に使用していません。'
  },
  251: {
    lat: 33.266004,
    lng: 131.36232,
    address: '由布市・湯布院町川上',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E3%82%B3%E3%83%9F%E3%83%81%E3%82%AB%E3%83%95%E3%82%A7/@33.266004,131.36232,17z/',
    locationNote: 'Googleマップで「Komichi-cafe 湯布院」を検索し、表示名「コミチカフェ」と公式プロフィールの店舗名・町名が一致する位置を確認。番地は検索語に使用していません。'
  },
  217: {
    lat: 33.3119193,
    lng: 131.4562768,
    address: '別府市・小倉',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E6%A3%AE%E8%97%A9%E5%88%A5%E9%82%B8/@33.3119193,131.4562768,17z/',
    locationNote: 'Googleマップで「森藩別邸 別府市」を検索し、店舗名と位置を確認。住所番号は検索語に使用していません。'
  },
  250: {
    lat: 33.3105797,
    lng: 131.4866968,
    address: '別府市・実相寺',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E5%88%A5%E5%BA%9C%E7%94%98%E5%91%B3%E8%8C%B6%E5%B1%8B/@33.3105797,131.4866968,17z/',
    locationNote: 'Googleマップで店名「甘味茶屋」と地域「別府市」を検索。Googleマップの「別府甘味茶屋」と公式サイトの別府店情報・町名が一致。検索語に番地は使用していません。'
  },
  232: {
    lat: 33.2888285,
    lng: 131.4645578,
    address: '別府市・南立石生目町',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E7%9F%B3%E7%AA%AF%E3%83%94%E3%83%83%E3%83%84%E3%82%A1%EF%BC%86%E3%82%A4%E3%82%BF%E3%83%AA%E3%82%A2%E3%83%B3+%E7%A2%A7%E3%81%AE%E6%99%82%E9%96%93/@33.2888285,131.4645578,17z/',
    locationNote: 'Googleマップで店名「碧の時間」と地域「別府市」を検索。表示された店舗名・Instagram・所在地の町名が一致。検索語に番地は使用していません。'
  },
  249: {
    lat: 33.2756582,
    lng: 131.5067083,
    address: '別府市・楠町（MURE Beppu）',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/cafe+SHU/@33.2756582,131.5067083,17z/',
    locationNote: 'Googleマップで店名「cafe SHU」と地域「別府市」を検索。表示された店舗位置と公式案内のMURE Beppu内カフェが一致。検索語に番地は使用していません。ペット同伴可否は別途未確認です。'
  },
  219: {
    lat: 33.3349183,
    lng: 131.46408,
    address: '別府市・内竈（別府湾SA）',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E3%82%A2%E3%83%AB%E3%83%86%E3%82%B8%E3%82%AA%E3%83%80%E3%82%A4%E3%83%8B%E3%83%B3%E3%82%B0/@33.3349183,131.46408,17z/',
    locationNote: 'Googleマップで店名「アルテジオダイニング」と地域「別府市」を検索。公式サイト掲載の別府湾SA内の店舗として照合。検索語に番地は使用していません。'
  },
  223: {
    lat: 33.3349183,
    lng: 131.46408,
    address: '別府市・内竈（別府湾SA）',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/search/B-speak+cafe+%E5%88%A5%E5%BA%9C%E5%B8%82/',
    locationNote: 'B-speak cafeのGoogleマップ個別ピンを確認できないため、営業休止中の店舗独立ピンは作らず、施設案内に従いメニュー提供先のアルテジオダイニングの位置を表示。検索語に番地は使用していません。'
  },
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
  110: {
    lat: 33.356096,
    lng: 131.5961178,
    address: '速見郡日出町大神6025-1',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E3%81%8A%E3%81%8A%E3%81%8C%E3%83%95%E3%82%A1%E3%83%BC%E3%83%A0+Ogafarm/@33.356096,131.5961178,17z/',
    locationNote: 'Googleマップで店名「おおがファーム」と地域「日出町」を検索。ピンの住所が公式サイトの所在地と一致。検索語に番地は使用していません。'
  },
  3: {
    lat: 33.278697,
    lng: 131.350083,
    address: '由布市湯布院町川上302-7',
    locationStatus: 'official-map',
    locationSource: 'https://www.ikkoten.com/access/',
    locationNote: '施設公式アクセスページが案内する地図コード（33.278697, 131.350083）を使用。住所は由布市湯布院町川上302-7。施設名検索では誤案内の可能性がある旨も公式ページに記載。'
  },
  33: {
    lat: 33.328998500000004,
    lng: 131.40118155,
    address: '由布市湯布院町塚原933-1',
    locationStatus: 'official-map',
    locationSource: 'https://www.tenhou.co.jp/天豊株式会社space-vessel基地/',
    locationNote: '運営会社公式ページに掲載された施設名付きGoogleマップ埋め込み座標。SPACE-VESSEL基地の公式アクセス住所「由布市湯布院町塚原933-1」と一致。'
  },
  28: {
    lat: 33.141853100000006,
    lng: 131.2388791,
    address: '玖珠郡九重町田野1685-3',
    locationStatus: 'official-map',
    locationSource: 'https://wenavillage-kuju.com/access/',
    locationNote: '施設公式アクセスページの施設名付きGoogleマップ埋め込み位置。公式記載住所「玖珠郡九重町田野1685-3」と照合。'
  },
  29: {
    lat: 33.5427355,
    lng: 131.74112350000001,
    address: '国東市国東町小原3204-1',
    locationStatus: 'official-map',
    locationSource: 'https://kunisaki-dogresort.com/',
    locationNote: '施設公式ページの施設名付きGoogleマップ埋め込み位置。公式記載住所「国東市国東町小原3204-1」と照合。'
  },
  25: {
    lat: 33.2870502,
    lng: 131.3420191,
    address: '由布市湯布院町川上186-1',
    locationStatus: 'official-map',
    locationSource: 'https://tennoniwa.jp/about',
    locationNote: '施設公式店舗情報ページのGoogleマップ指定座標。公式住所「由布市湯布院町川上186-1」と照合。'
  },
  103: {
    lat: 33.2323795,
    lng: 131.6711571,
    address: '大分市葛木',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/森のドッグラン+ワン・LOVE/@33.2323795,131.6711571',
    locationNote: 'Googleマップで施設名「森のドッグラン ワン・LOVE」と所在地「大分市葛木」を照合。'
  },
  106: {
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
  111: {
    lat: 33.5162236,
    lng: 131.3435751,
    address: '宇佐市別府',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/SORAcafe/@33.5162236,131.3435751',
    locationNote: 'Googleマップで店名「SORAcafe」と所在地「宇佐市別府」を照合。'
  },
  112: {
    lat: 33.3128425,
    lng: 131.4707066,
    address: '別府市火売',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/DOG+CAFE+KURUSAN/@33.3128425,131.4707066',
    locationNote: 'Googleマップで店名「DOG CAFE KURUSAN」と所在地「別府市火売」を照合。'
  },
  117: {
    lat: 33.2411452,
    lng: 131.6288368,
    address: '大分市東津留1丁目1-21',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://luma-pet.com/about/',
    locationNote: 'LUMA公式ABOUTで尾石動物病院併設と公式住所を確認。尾石動物病院の施設個別位置（Googleマップ確認済み）と住所が一致するため、同一敷地のピンを使用。'
  },
  201: {
    lat: 33.0462192,
    lng: 131.2472861,
    address: '竹田市久住町',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/Cafe+Boi+Boi/@33.0462192,131.2472861',
    locationNote: 'Googleマップで店名「Cafe Boi Boi」と所在地「竹田市久住町」を照合。公式Instagramも一致。'
  },
  202: {
    lat: 33.2632675,
    lng: 131.3299407,
    address: '由布市湯布院町',
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
    locationNote: 'Googleマップで店名「カフェ flap fly」と所在地「大分市政所」を照合。公式Instagramも一致。'
  },
  220: {
    lat: 33.2212909,
    lng: 131.6536937,
    address: '大分市明野東',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/Dining+%26+Cafe+LA+LUCE+80%E2%84%83/@33.2212909,131.6536937,17z/',
    locationNote: 'Googleマップで店名「Dining & Cafe LA LUCE 80℃」と地域「大分市・明野」を照合。住所番地は検索語に使用していません。'
  },
  244: {
    lat: 33.2673733,
    lng: 131.3688473,
    address: '由布市湯布院町川上',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/CAFE+LA+RUCHE/@33.2673733,131.3688473,17z/',
    locationNote: 'Googleマップで店名「CAFE LA RUCHE」と地域「由布市・湯布院町川上」を照合。住所番地は検索語に使用していません。'
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
    lat: 33.1995892,
    lng: 131.6084241,
    address: '大分市宮崎829-6',
    locationStatus: 'official-map',
    locationSource: 'https://kai-clinic.jp/clinic/oita-oita/',
    locationNote: '公式大分往診所ページ内Googleマップ埋め込み位置と、公式住所「大分市宮崎829-6」を照合。ユーザー提供のGoogleマップ画面でも「海動物病院 大分往診所」の名称付きピンを同住所で確認。医院タイプは公式表記どおり往診所として案内。'
  },
  245: {
    lat: 33.5959592,
    lng: 131.2036566,
    address: '中津市牛神',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/エルティカフェ+大分中津店/@33.5959592,131.2036566,17z/',
    locationNote: 'Googleマップで店名「エルティカフェ 大分中津店」と地域「中津市・牛神」を照合。番地は検索語に使用していません。'
  },
  246: {
    lat: 32.807218,
    lng: 131.9618123,
    address: '佐伯市蒲江',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E3%81%86%E3%81%95%E3%81%8E%E4%BA%AD/@32.807218,131.9618123,17z/',
    locationNote: 'Googleマップで店名「レストハウスうさぎ亭」と地域「佐伯市」を検索。住所が佐伯市観光ナビ掲載情報と一致。検索に番地は使用していません。'
  },
  247: {
    lat: 33.2349545,
    lng: 131.6394305,
    address: '大分市希望が丘1丁目1045-21',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/%E3%81%8B%E3%81%8E%E3%81%AE%E3%81%97%E3%81%A3%E3%81%BD+SAKURAZAKA+Caf%C3%A9/@33.2349545,131.6394305,17z/',
    locationNote: 'Googleマップで店名「かぎのしっぽ SAKURAZAKA Café」と地域「大分市」を検索。ピンの住所が公式サイトの所在地と一致。検索語に番地は使用していません。'
  },
  243: {
    lat: 33.2908632,
    lng: 131.4984851,
    address: '別府市石垣東2丁目2-13',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/CHERIE+STORAGE+CAFE+-シェリストレージカフェ-/@33.2908632,131.4984851,17z/',
    locationNote: 'Googleマップで店名「CHERIE STORAGE CAFE」と地域「別府市」を検索。表示住所が店舗情報と一致。検索語に番地は使用していません。'
  },
  248: {
    lat: 33.3167213,
    lng: 131.4550233,
    address: '別府市明礬4組',
    locationStatus: 'google-maps-verified',
    locationSource: 'https://www.google.com/maps/place/Charlie%27s+Lanai%EF%BC%88%E3%83%81%E3%83%A3%E3%83%BC%E3%83%AA%E3%83%BC%E3%82%BA+%E3%83%A9%E3%83%8A%E3%82%A4%EF%BC%89/@33.3167213,131.4550233,17z/',
    locationNote: 'Googleマップで店名「Charlies Lanai」と地域「別府市」を検索。表示住所が公式Instagramの所在地と一致。検索語に番地は使用していません。'
  },
  122: {
    lat: 33.31078950312905,
    lng: 131.45826514463673,
    address: '別府市小倉町62-8',
    locationStatus: 'official-map',
    locationSource: 'https://ph-1.jp/archive/1368.html',
    locationNote: 'Pet Hotel 1公式の住所表記変更告知に掲載された施設名付きGoogleマップ位置を使用。令和7年1月11日から新住所「別府市小倉町62-8」に変更し、場所・建物は変更なしと公式発表。旧住所は「鶴見1413-6（小倉5組1）」。'
  },
  53: {
    lat: 33.3514569089,
    lng: 131.282240391,
    address: '宇佐市院内町羽馬礼15',
    locationStatus: 'official-map',
    locationSource: 'https://yokalowparkcampsite.jimdofree.com/よかろうパークまでの道のり/',
    locationNote: '施設公式アクセスページに埋め込まれたGoogleマップの施設位置（地図リンク座標）と公式住所を照合。ペット同伴可のサイト範囲は別途公式案内で確認。'
  },
  55: {
    lat: 33.3541837,
    lng: 131.4117005,
    address: '宇佐市安心院町南畑2-1755-1',
    locationStatus: 'official-map',
    locationSource: 'https://africansafari.co.jp/access/',
    locationNote: '施設公式アクセスページに埋め込まれた施設名付きGoogleマップ位置と公式住所を照合。キャンプ場は動物公園内の区画で、動物公園全域と同一の利用範囲ではありません。'
  }
};
