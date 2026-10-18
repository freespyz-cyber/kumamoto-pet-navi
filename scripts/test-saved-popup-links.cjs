const fs = require('fs'), vm = require('vm'), assert = require('assert');
const c = {window: {addEventListener() {}}, document: {createElement: () => ({}), head: {appendChild() {}}, addEventListener() {}, getElementById: () => null}};
vm.createContext(c);
for (const file of ['assets/map-source-links.js', 'assets/map-links.js']) vm.runInContext(fs.readFileSync(file, 'utf8'), c);
c.FacilityLinks = c.window.FacilityLinks;
vm.runInContext(fs.readFileSync('assets/facility-popup-common.js', 'utf8'), c);
const saved = ['https://example.com/', 'https://www.instagram.com/example/', 'javascript:alert(1)', undefined];
const fallback = c.FacilityLinks.html('kumamoto', 'registry missing', saved);
assert(fallback.includes('ホームページ'));
assert(fallback.includes('Instagram'));
assert(!fallback.includes('javascript:'));
const existing = c.FacilityLinks.get('kumamoto', 'Manly 熊本店');
assert.equal(c.FacilityLinks.get('kumamoto', 'Manly 熊本店', existing.map(l => l.url)).length, existing.length);
const parse = (file, name) => vm.runInNewContext(fs.readFileSync(file, 'utf8').match(new RegExp('const '+name+'=(\\[[\\s\\S]*?\\]);'))[1]);
const kuma = parse('pet-facility-map.html', 'places');
c.render = () => {}; c.activeType = 'all'; c.visiblePlaces = () => kuma; c.list = {};
const kumaPopups = [];
c.markers = kuma.map((p, i) => ({setPopupContent(s) { kumaPopups[i] = s; }}));
vm.runInContext(fs.readFileSync('assets/kumamoto-map-details.js', 'utf8'), c);
const check = (html, prefecture, name, saved) => {
  for (const link of c.FacilityLinks.get(prefecture, name, saved)) {
    assert(html.includes(link.url.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#39;')), name + ': ' + link.url);
  }
};
kuma.forEach((p, i) => check(kumaPopups[i], 'kumamoto', p[1], p.slice(5)));
const places = parse('fukuoka-pet-stay-map.html', 'places');
const verifiedFukuokaStays = [
  ['風の 八女福島', '〒834-0031 八女市本町西京町204', 33.2089137, 130.5553577],
  ['ritomaru rooms hakata hakozaki', '〒812-0053 福岡市東区箱崎1-6-7', 33.6177971, 130.4264622],
  ['イヌヤド', '〒812-0017 福岡市博多区美野島3-4-14', 33.5771138, 130.4208657],
  ['割烹旅館 まさご屋', '〒811-0325 福岡市東区勝馬257-50', 33.6870129, 130.2945374],
  ['DOGSALON & CAFE ARALE', '〒807-0122 遠賀郡芦屋町高浜9-3', 33.890352, 130.670502],
  ['ドッグカフェTARO＆HANA（たろはな）', '直方市上頓野4596-4', 33.77309, 130.768716],
  ['ふらってぃーのドッグカフェ', '〒820-0065 飯塚市中353', 33.6659423, 130.6859521],
  ['西部運動公園', '〒819-0037 福岡市西区飯盛385（ドッグラン）', 33.5443302, 130.3170059],
  ['海の中道海浜公園・ドッグラン', '〒811-0321 福岡市東区西戸崎18-25（園内ドッグラン）', 33.6687599, 130.373091],
  ['うえらんから糸島', '〒819-1323 糸島市志摩小金丸1946-6', 33.590448, 130.1522408],
  ['ファームリゾート糸島', '〒819-1323 糸島市志摩小金丸1738', 33.5887903, 130.1472009],
  ['アニマルスターフィールド', '〒811-3307 福津市渡462-7', 33.8076655, 130.4719008],
  ['DOG LIFE こたびより', '〒811-3311 福津市宮司浜4-5-2', 33.7797474, 130.4697592],
  ['グリーンハート筑紫野', '〒818-0054 筑紫野市杉塚5-13-6', 33.5043646, 130.5022849],
  ['HUWAN（ヒューワン）', '〒803-0861 北九州市小倉北区篠崎5-26-7', 33.8602373, 130.8596928],
  ['P2 PET WORLD トリアス久山店', '〒811-2502 糟屋郡久山町大字山田1004-1', 33.6529944, 130.4933741],
  ['Petemo（ペテモ）小倉南店', '〒800-0221 北九州市小倉南区下曽根新町10-1 サニーサイドモール小倉2階', 33.8320578, 130.9335332],
  ['筑後広域公園ドッグラン', '〒833-0015 筑後市津島831-1（公園内）', 33.1789417, 130.4990635],
  ['THE PARTY 今泉', '〒810-0021 福岡市中央区今泉1-18-28 アペゼ今泉3F', 33.5855598, 130.3977404],
  ['HIBARI HILLS', '〒810-0011 福岡市中央区高砂1-18-5', 33.5800896, 130.4064519],
  ['Manly（マンリー）', '〒810-0021 福岡市中央区今泉1-18-55 天神南ロイヤルハイツ1F', 33.5848065, 130.3989908],
  ['Beach cafe SUNSET', '〒819-0202 福岡市西区西浦284', 33.6419868, 130.2016479],
  ['THE BEACH（ザ ビーチ）', '〒814-0001 福岡市早良区百道浜2-902-1 マリゾン内', 33.5948333, 130.3510928],
  ['王様のたまご 門司港本店', '〒801-0852 北九州市門司区港町9-4 バルク館1F', 33.946227, 130.961793],
  ['made in HACHI（CAFE BAR 8移転後）', '〒802-0822 北九州市小倉南区横代東町2-1-13-1', 33.8370747, 130.9043272],
  ['ドッグラン カフェ レオちんのあんよ', '〒820-0046 飯塚市大日寺675-3', 33.6390169, 130.6449485],
  ['Dog Cafe BeBe（ドッグカフェ ベベ）', '〒811-4305 遠賀郡遠賀町松の本1-4-15', 33.8542109, 130.6695511],
  ['おおとう桜街道ドッグラン', '〒824-0511 田川郡大任町大字今任原1339（道の駅構内）', 33.627249, 130.8463696],
  ['リバーサイドパークドッグラン', '久留米市東櫛原町字こくう蔵2840-1地先（新宝満川地区）', 33.3381547, 130.5317496],
  ['ワンライフ直方（Wan Life 直方）', '〒822-0002 直方市頓野343-5（ナビ入力343-8）', 33.7508887, 130.7619176],
  ['御宿 はなわらび', '〒811-3502 宗像市江口518-1', 33.8523, 130.5139],
  ['グランドーム福岡ふくつ', '〒811-3304 福津市津屋崎4-45-1', 33.7883147, 130.460579],
  ['ふくせんか', '〒839-1405 うきは市浮羽町古川1099-8', 33.3584478, 130.8068426],
  ['グランピング五感', '〒811-1235 那珂川市成竹1051-1', 33.4688327, 130.414203],
  ['ほどあいの宿 六峰舘', '〒838-1514 朝倉市杷木久喜宮1840', 33.3508806, 130.7808694],
  ['ホテルリブマックス小倉駅前', '〒802-0002 北九州市小倉北区京町2-3-2', 33.8867268, 130.8809282],
  ['ホテルリブマックス博多中洲', '〒810-0801 福岡市博多区中洲5-4-21', 33.5941442, 130.4035064],
  ['ホテルリブマックス博多駅前', '〒812-0011 福岡市博多区博多駅前2-7-9', 33.590259, 130.4144724],
  ['ホテルリブマックス福岡天神', '〒810-0005 福岡市中央区清川1-12-17', 33.5816371, 130.408505],
  ['ホテルリブマックス福岡天神WEST', '〒810-0041 福岡市中央区大名2-11-23', 33.5901334, 130.3911432],
  ['ホテルリブマックス博多駅南', '〒812-0016 福岡市博多区博多駅南3-7-32', 33.5824951, 130.4246238],
  ['Stay Hakata', '〒812-0018 福岡市博多区住吉3-9-22', 33.5854359, 130.4107649],
  ['ALFACIO RESORT STAY ITOSHIMA', '〒819-1642 糸島市二丈鹿家1792-1', 33.4852449, 130.0467708],
  ['そらすな', '〒824-0014 行橋市長井136-1', 33.7227282, 131.0225034],
  ['1co・ITOSHIMA（ワンコイトシマ）', '〒819-1643 糸島市福吉2丁目13-6', 33.5039043, 130.0809169],
  ['seven x seven 糸島', '〒819-0202 福岡市西区西浦266番地', 33.6424131, 130.2022162],
  ['LONG VACATION RESORT', '〒811-0321 福岡市東区西戸崎5丁目24-1', 33.6492779, 130.3462014],
  ['のこのしまアイランドパーク Villa防人', '〒819-0012 福岡市西区能古1624-85（Googleマップの施設ピン）', 33.6361612, 130.303444],
  ['東横INN北九州空港', '〒800-0306 北九州市小倉南区空港北町2-4', 33.8350005, 131.0305144],
  ['THE TRAILERHOUSE VILLAGE 大牟田 SPA', '〒836-0895 大牟田市新勝立町6丁目37', 33.0134608, 130.4687081],
  ['くつろぎの森 グリーンピア八女', '〒834-1204 八女市黒木町木屋10905', 33.1840981, 130.6801638]
];
for (const [name, address, lat, lng] of verifiedFukuokaStays) {
  const place = places.find(p => p[0] === name);
  assert(place, `${name}: verified Fukuoka map pin exists`);
  assert.strictEqual(JSON.stringify(place.slice(1, 4)), JSON.stringify([address, lat, lng]), `${name}: map pin has verified street address and coordinates`);
  assert(c.window.mapSourceLinks.fukuoka[name].some(link => link.url.includes('/maps/place/') && link.url.includes(`@${lat},${lng},`)),
    `${name}: source registry retains the matching Google Maps facility listing`);
}
const agriculturalCenterDogRun = places.find(p => p[0] === '北九州市立総合農事センター ドッグラン');
assert(agriculturalCenterDogRun[1].includes('〒802-0822 北九州市小倉南区横代東町1-6-1'), 'agricultural-center dog-run uses the official park address');
assert(agriculturalCenterDogRun[1].includes('本館・利用手続き'), 'agricultural-center dog-run route target directs visitors to the main building for registration');
assert(agriculturalCenterDogRun[1].includes('ドッグランは駐車場横'), 'agricultural-center dog-run popup notes its location beside the parking lot');
assert.strictEqual(JSON.stringify(agriculturalCenterDogRun.slice(2, 4)), JSON.stringify([33.8348292, 130.8995563]), 'agricultural-center dog-run map pin uses the verified park listing coordinate');
assert(c.window.mapSourceLinks.fukuoka[agriculturalCenterDogRun[0]].some(link => link.url.endsWith('/nouji-center-park-map.pdf')), 'agricultural-center dog-run retains the official park map source');
assert(c.window.mapSourceLinks.fukuoka[agriculturalCenterDogRun[0]].some(link => link.url.includes('/@33.8348292,130.8995563,') && link.label.includes('来園・ルート案内用')), 'agricultural-center dog-run retains the park-arrival pin source and caveat');
const hospitals = parse('fukuoka-pet-stay-map.html', 'hospitals');
const fukuokaMapSource = fs.readFileSync('fukuoka-pet-stay-map.html', 'utf8');
assert(fukuokaMapSource.includes('ドッグラン一時閉鎖予定：2026年10月17日（土）16:00～10月18日（日）13:00'), 'Seibu Sports Park popup warns about the scheduled dog-run closure');
for (const [name, address] of hospitals) {
  assert.match(address, /\d/, `${name}: hospital map popup and route target include its street address`);
}
const addedHospitalsMatch = fukuokaMapSource.match(/\/\* Fukuoka clinics newly checked[\s\S]*?const additions = (\[[\s\S]*?\n  \]);/);
assert(addedHospitalsMatch, 'additional Fukuoka hospital records remain testable');
const addedHospitals = vm.runInNewContext(addedHospitalsMatch[1]);
for (const [name, address] of addedHospitals) {
  assert.match(address, /\d/, `${name}: additional hospital map popup and route target include a street-level address`);
}
const plain = (value) => String(value || '').replace(/<[^>]+>/g, '').replace(/｜.*|\|.*/g, '').replace(/（.*|\(.*$/g, '').replace(/[\s　]/g, '');
for (const [name, , , , page] of [...hospitals, ...addedHospitals]) {
  assert(fs.existsSync(page), `${name}: detail page exists`);
  const html = fs.readFileSync(page, 'utf8');
  const title = plain((html.match(/<title>(.*?)<\/title>/) || [])[1]);
  const heading = plain((html.match(/<h1[^>]*>(.*?)<\/h1>/) || [])[1]);
  const bodyText = html.replace(/<style[\s\S]*?<\/style>/g, '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, '').replace(/[\s　]/g, '');
  const clinic = plain(name === '動物医療センター春日' ? '福岡動物医療センター' : name);
  assert(title.includes(clinic) || clinic.includes(title) || heading.includes(clinic) || clinic.includes(heading) || bodyText.includes(clinic), `${name}: detail page is for the mapped clinic`);
  if (name === '動物医療センター春日') assert(bodyText.includes('春日病院'), 'Kasuga marker must link to the Kasuga hospital section');
  const distribution = fs.readFileSync(`dist/${page}`, 'utf8');
  const canonicalHtml = (value) => value.replace(/>\s+</g, '><').trim();
  assert.equal(canonicalHtml(distribution), canonicalHtml(html), `${name}: distribution detail content matches source`);
}
assert.equal(fs.readFileSync('dist/fukuoka-pet-stay-map.html', 'utf8'), fukuokaMapSource, 'Fukuoka map distribution matches source');
assert.match(fukuokaMapSource, /\['動物医療センター春日','〒816-0804 春日市原町1-92',33\.5257995,130\.4674517,'fukuoka-vets-animal-medical-kasuga\.html'\]/, 'Kasuga marker links to its detail page at the Google Maps facility coordinates');
assert(fs.readFileSync('fukuoka-vets-animal-medical-kasuga.html', 'utf8').includes('〒816-0804 福岡県春日市原町1-92'), 'Kasuga detail page has the verified Kasuga address');
assert(c.window.mapSourceLinks.fukuoka['動物医療センター春日'].some(link => link.url === 'https://animal-hospital.jaha.or.jp/2022/12/20/1501/'), 'Kasuga source registry retains the JAHA listing');
assert(c.window.mapSourceLinks.fukuoka['動物医療センター春日'].some(link => link.url.includes('/@33.5257995,130.4674517,17z/') && link.official === false), 'Kasuga Google Maps coordinate source remains in the registry');
assert.match(fukuokaMapSource, /\['まつばらペットクリニック','〒815-0075 福岡市南区長丘5-26-11',33\.5559813,130\.3876408,'fukuoka-vets-matsubara\.html'\]/, 'Matsubara marker matches its Google Maps facility coordinates');
assert(c.window.mapSourceLinks.fukuoka['まつばらペットクリニック'].some(link => link.url.includes('/@33.5559813,130.3876408,17z/') && link.official === false), 'Matsubara Google Maps coordinate source remains in the registry');
assert.match(fukuokaMapSource, /\['吉塚ペットクリニック','〒812-0041 福岡市博多区吉塚5丁目2-3',33\.605062,130\.427838,'fukuoka-vets-yoshizuka\.html'\]/, 'Yoshizuka marker matches the Google Maps facility coordinates');
assert(c.window.mapSourceLinks.fukuoka['吉塚ペットクリニック'].some(link => link.url.includes('/@33.605062,130.427838,17z/') && link.official === false), 'Yoshizuka Google Maps coordinate source remains in the registry');
assert.match(fukuokaMapSource, /\['福岡中央動物病院','〒810-0035 福岡市中央区梅光園2丁目15-14',33\.571124,130\.377502,'fukuoka-vets-fukuoka-chuo\.html'\]/, 'Fukuoka Chuo marker remains at the confirmed facility location');
assert(c.window.mapSourceLinks.fukuoka['福岡中央動物病院'].some(link => link.url.includes('/@33.5711264,130.3775213,17z/') && link.official === false), 'Fukuoka Chuo Google Maps coordinate source remains in the registry');
assert.match(fukuokaMapSource, /\['稲員犬猫香椎病院','〒813-0003 福岡市東区香住ケ丘2-4-4',33\.667794,130\.442301,'fukuoka-vets-inakazu\.html'\]/, 'Inakazu marker matches the Google Maps facility coordinates');
assert(c.window.mapSourceLinks.fukuoka['稲員犬猫香椎病院'].some(link => link.url.includes('/@33.667794,130.442301,17z/') && link.official === false), 'Inakazu Google Maps coordinate source remains in the registry');
assert.match(fukuokaMapSource, /\['とみながペットクリニック','〒813-0041 福岡市東区水谷2丁目2-29',33\.6471832,130\.4417298,'fukuoka-vets-tominaga\.html'\]/, 'Tominaga marker matches the Google Maps facility coordinates');
assert(c.window.mapSourceLinks.fukuoka['とみながペットクリニック'].some(link => link.url.includes('/@33.6471832,130.4417298,17z/') && link.official === false), 'Tominaga Google Maps coordinate source remains in the registry');
assert.match(fukuokaMapSource, /\['博多住吉動物病院','〒812-0018 福岡市博多区住吉2丁目4-7 レジデンス博多',33\.587896,130\.412666,'fukuoka-vets-hakata-sumiyoshi\.html'\]/, 'Hakata Sumiyoshi marker matches its Google Maps facility coordinates');
assert(c.window.mapSourceLinks.fukuoka['博多住吉動物病院'].some(link => link.url.includes('/@33.587896,130.412666,17z/') && link.official === false), 'Hakata Sumiyoshi Google Maps coordinate source remains in the registry');
assert.match(fukuokaMapSource, /\['加藤獣医科医院','〒813-0033 福岡市東区多々良1丁目45-21',33\.6299037,130\.4572772,'fukuoka-vets-kato\.html'\]/, 'Kato Veterinary Clinic marker matches its Google Maps facility coordinates');
assert(c.window.mapSourceLinks.fukuoka['加藤獣医科医院'].some(link => link.url.includes('/@33.6299037,130.4572772,17z/') && link.official === false), 'Kato Google Maps coordinate source remains in the registry');
assert.match(fukuokaMapSource, /\['筥松ミルキーどうぶつ病院','〒812-0053 福岡市東区箱崎1丁目41-13 桔梗館1F',33\.6166226,130\.4215059,'fukuoka-vets-hakomatsu-milky\.html'\]/, 'Hakomatsu Milky marker matches Google Maps facility coordinates');
assert(c.window.mapSourceLinks.fukuoka['筥松ミルキーどうぶつ病院'].some(link => link.url.includes('/@33.6166226,130.4215059,17z/') && link.official === false), 'Hakomatsu Milky Google Maps coordinate source remains in the registry');
assert.match(fukuokaMapSource, /\['警固ペットクリニック','〒810-0023 福岡市中央区警固2丁目2-15 秋本ビル1F',33\.5834546,130\.3919816,'fukuoka-vets-kego\.html'\]/, 'Kego marker matches Google Maps facility coordinates');
assert(c.window.mapSourceLinks.fukuoka['警固ペットクリニック'].some(link => link.url.includes('/@33.5834546,130.3919816,17z/') && link.official === false), 'Kego Google Maps coordinate source remains in the registry');
assert.match(fukuokaMapSource, /\['パーク動物医療センター','〒810-0064 福岡市中央区地行4-18-9',33\.591338,130\.364075,'fukuoka-vets-park\.html'\]/, 'Park Animal Medical Center marker matches the facility location');
assert(c.window.mapSourceLinks.fukuoka['パーク動物医療センター'].some(link => link.url.includes('/@33.5913161,130.3640627,17z/') && link.official === false), 'Park Animal Medical Center Google Maps coordinate source remains in the registry');
assert.match(fukuokaMapSource, /\['バーツ動物病院','〒812-0894 福岡市博多区諸岡4-3-1',33\.5588894,130\.4496018,'fukuoka-vets-verts\.html'\]/, 'Verts marker matches Google Maps facility coordinates');
assert(c.window.mapSourceLinks.fukuoka['バーツ動物病院'].some(link => link.url.includes('/@33.5588894,130.4496018,17z/') && link.official === false), 'Verts Google Maps coordinate source remains in the registry');
assert.match(fukuokaMapSource, /\['ノアアニマルクリニック','〒814-0171 福岡市早良区野芥3-27-27',33\.5401176,130\.3429084,'fukuoka-vets-noa\.html'\]/, 'Noa marker matches the official embedded map coordinates');
assert(c.window.mapSourceLinks.fukuoka['ノアアニマルクリニック'].some(link => link.url === 'https://www.noa-animal.com/' && link.official === true), 'Noa source registry retains the official page with the embedded map');
assert.match(fukuokaMapSource, /\['児玉どうぶつ病院','〒811-1346 福岡市南区老司1-5-2',33\.5363627,130\.4282434,'fukuoka-vets-kodama\.html'\]/, 'Kodama marker matches the facility coordinates linked from Anicom');
assert(c.window.mapSourceLinks.fukuoka['児玉どうぶつ病院'].some(link => link.url === 'https://maps.google.com/maps?q=33.5363627%2C130.4282434' && link.official === false), 'Kodama Google Maps coordinate source remains in the registry');
assert.match(fukuokaMapSource, /\['博多犬猫医療センター','〒812-0044 福岡市博多区千代1-16-14',33\.601905,130\.4147868,'fukuoka-vets-hakata-dcm\.html'\]/, 'Hakata Dog and Cat Medical Center marker matches Google Maps facility coordinates');
assert(c.window.mapSourceLinks.fukuoka['博多犬猫医療センター'].some(link => link.url.includes('/@33.601905,130.4147868,17z/') && link.official === false), 'Hakata Dog and Cat Medical Center Google Maps coordinate source remains in the registry');
assert.match(fukuokaMapSource, /\['オークどうぶつ病院 けやき','〒810-0042 福岡市中央区赤坂3-4-31',33\.5828596,130\.3838915,'fukuoka-vets-oak-keyaki\.html'\]/, 'Oak Keyaki marker matches Google Maps facility coordinates');
assert(c.window.mapSourceLinks.fukuoka['オークどうぶつ病院 けやき'].some(link => link.url.includes('/@33.5828596,130.3838915,17z/') && link.official === false), 'Oak Keyaki Google Maps coordinate source remains in the registry');
assert.match(fukuokaMapSource, /\['海動物病院福岡東医院','〒812-0055 福岡市東区東浜1-3-1',33\.6150835,130\.4145051,'fukuoka-vets-kai-fukuoka-higashi\.html'\]/, 'Kai Fukuoka East marker matches Google Maps facility coordinates');
assert(c.window.mapSourceLinks.fukuoka['海動物病院福岡東医院'].some(link => link.url.includes('/@33.6150835,130.4145051,17z/') && link.official === false), 'Kai Fukuoka East Google Maps coordinate source remains in the registry');
assert.match(fukuokaMapSource, /\['白金アニマルクリニック','〒810-0012 福岡市中央区白金2丁目15-14 BERG白金1F',33\.5768785,130\.4066176,'fukuoka-vets-shirogane\.html'\]/, 'Shirogane marker matches Google Maps facility coordinates');
assert(c.window.mapSourceLinks.fukuoka['白金アニマルクリニック'].some(link => link.url.includes('/@33.5768785,130.4066176,17z/') && link.official === false), 'Shirogane Google Maps coordinate source remains in the registry');
assert.match(fukuokaMapSource, /\['たなかペットクリニック','〒803-0836 北九州市小倉北区中井1丁目27-5',33\.893544,130\.849729,'fukuoka-vets-tanaka\.html'\]/,
  'Tanaka Pet Clinic marker matches the official address and embedded map coordinates');
assert(fs.readFileSync('fukuoka-vets-tanaka.html', 'utf8').includes('〒803-0836 福岡県北九州市小倉北区中井1丁目27-5'), 'Tanaka detail page keeps the verified Kokura-Kita address');
assert(c.window.mapSourceLinks.fukuoka['たなかペットクリニック'].some(link => link.url === 'https://tanaka-pet-clinic.jp/access.php' && link.official === true), 'Tanaka source registry links to the official access and map page');
for (const page of ['fukuoka-vets.html', 'fukuoka-vets-halleluya.html']) {
  const text = fs.readFileSync(page, 'utf8');
  assert(text.includes('福岡県糟屋郡粕屋町大字仲原2544-1'), `${page}: Kasuya clinic address uses the current official spelling`);
  assert(!text.includes('福岡県粕屋郡粕屋町'), `${page}: obsolete Kasuya spelling is absent`);
  assert.equal(fs.readFileSync(`dist/${page}`, 'utf8'), text, `${page}: distribution matches source`);
}
assert.match(fukuokaMapSource, /病院ピン69件は施設位置を照合済みです/, 'Fukuoka hospital section reflects that all 69 facility pins were checked');
assert.match(fukuokaMapSource, /一部は周辺の目安位置のため/, 'Fukuoka map identifies that only some pins are approximate');
assert.match(fukuokaMapSource, /ルート検索は施設名と番地住所でGoogleマップに渡し/, 'Fukuoka map explains that routes use facility names and street addresses');
assert.match(fukuokaMapSource, /\['福岡動物医療センター','〒812-0895 福岡市博多区竹下2-9-22',33\.57237101,130\.42906611,'fukuoka-vets-fukuoka-animal-medical\.html'\]/,
  'Fukuoka Animal Medical Center uses its address-matched facility pin and detail page');
assert(fs.readFileSync('fukuoka-vets-fukuoka-animal-medical.html', 'utf8').includes('福岡県福岡市博多区竹下2-9-22'), 'Fukuoka Animal Medical Center detail page has the verified address');
assert(c.window.mapSourceLinks.fukuoka['福岡動物医療センター'].some(link => link.url === 'https://f-dic.com/' && link.official === true), 'Fukuoka Animal Medical Center links to its own official site');
assert.match(fukuokaMapSource, /\['ところ動物病院','〒839-1406 うきは市浮羽町高見1436-1',33\.3472466,130\.8096134,'fukuoka-vets-tokoro\.html'\]/,
  'Tokoro marker matches the facility coordinates in its map listing');
assert(fs.readFileSync('fukuoka-vets-tokoro.html', 'utf8').includes('〒839-1406 福岡県うきは市浮羽町高見1436-1'), 'Tokoro detail page preserves the confirmed address');
assert.equal(fs.readFileSync('dist/fukuoka-vets-tokoro.html', 'utf8'), fs.readFileSync('fukuoka-vets-tokoro.html', 'utf8'), 'Tokoro detail distribution matches source');
assert(c.window.mapSourceLinks.fukuoka['ところ動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=6316' && link.official === false),
  'Tokoro facility pin verification source remains in the registry');
assert.match(fukuokaMapSource, /\['森どうぶつ病院','〒807-0874 北九州市八幡西区大浦1丁目13番2号',33\.87382320354293,130\.71284997975698,'fukuoka-vets-mori\.html'\]/,
  'Mori marker matches the JAHA facility map coordinates');
assert(c.window.mapSourceLinks.fukuoka['森どうぶつ病院'].some(link => link.url === 'https://animal-hospital.jaha.or.jp/2022/12/20/1425/' && link.official === false),
  'Mori location source remains in the registry');
assert.match(fukuokaMapSource, /\['医生ケ丘動物病院','〒808-0131 北九州市若松区塩屋3丁目34-10',33\.893769813437366,130\.70780375733153,'fukuoka-vets-iseigaoka\.html'\]/,
  'Iseigaoka marker matches the official location map coordinates');
assert(c.window.mapSourceLinks.fukuoka['医生ケ丘動物病院'].some(link => link.url === 'https://isei-ah.com/clinic/' && link.official === true),
  'Iseigaoka official location map source remains in the registry');
assert.match(fukuokaMapSource, /\['たかお動物病院','〒839-1306 うきは市吉井町新治358-7',33\.3486596,130\.7520097,'fukuoka-vets-takao\.html'\]/,
  'Takao Animal Hospital marker matches its address-verified map coordinates');
assert(c.window.mapSourceLinks.fukuoka['たかお動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=2973' && link.official === false),
  'Takao location verification source remains in the registry');
assert.match(fukuokaMapSource, /\['土師獣医科病院','〒820-0083 飯塚市秋松313-1',33\.6188182,130\.6794195,'fukuoka-vets-haji\.html'\]/,
  'Haji Veterinary Hospital marker matches the official map pin');
assert(c.window.mapSourceLinks.fukuoka['土師獣医科病院'].some(link => link.url === 'https://www.hajivet.com/' && link.label.includes('地図リンク')),
  'Haji official map verification source remains in the registry');
assert.match(fukuokaMapSource, /\['アン動物病院','〒814-0033 福岡市早良区有田5丁目7-18',33\.557799,130\.334827,'fukuoka-vets-ann\.html'\]/,
  'Ann Animal Hospital marker matches its map-linked coordinates');
assert.match(fukuokaMapSource, /\['山本動物病院','福岡市早良区飯倉5-21-27',33\.5605022,130\.3532695,'fukuoka-vets-yamamoto\.html'\]/,
  'Yamamoto Animal Hospital marker matches its map-linked coordinates');
assert.match(fukuokaMapSource, /\['宇賀ペットクリニック','〒819-0378 福岡市西区徳永北8-1 プランドール102',33\.5760982,130\.2579634,'fukuoka-vets-uga\.html'\]/,
  'Uga Pet Clinic marker matches its map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['アン動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=4644' && link.official === false),
  'Ann location verification source remains in the registry');
assert(c.window.mapSourceLinks.fukuoka['山本動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=742' && link.official === false),
  'Yamamoto location verification source remains in the registry');
assert(c.window.mapSourceLinks.fukuoka['宇賀ペットクリニック'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=3734' && link.official === false),
  'Uga location verification source remains in the registry');
assert.match(fukuokaMapSource, /\['うりゅう動物病院','〒819-0379 福岡市西区北原1-6-18',33\.578375,130\.2581246,'fukuoka-vets-uryu\.html'\]/,
  'Uryu Animal Hospital marker matches its map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['うりゅう動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=3228' && link.official === false),
  'Uryu location verification source remains in the registry');
assert.match(fukuokaMapSource, /\['飯塚パル動物病院','〒820-0068 飯塚市片島2丁目13-22',33\.6513797,130\.6828258,'fukuoka-vets-iizuka-pal\.html'\]/,
  'Iizuka PAL marker matches its map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['飯塚パル動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=7291' && link.official === false),
  'Iizuka PAL location verification source remains in the registry');
assert.match(fukuokaMapSource, /\['もりまつ動物病院','〒820-0081 飯塚市枝国256-2',33\.6337482,130\.6758638,'fukuoka-vets-morimatsu\.html'\]/,
  'Morimatsu Animal Hospital marker matches its map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['もりまつ動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=4741' && link.official === false),
  'Morimatsu location verification source remains in the registry');
assert.match(fukuokaMapSource, /\['陽だまり動物病院','〒820-0602 嘉穂郡桂川町大字九郎丸689-6',33\.5852413,130\.6680317,'fukuoka-vets-hidamari\.html'\]/,
  'Hidamari Animal Hospital marker matches its map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['陽だまり動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=7807' && link.official === false),
  'Hidamari location verification source remains in the registry');
assert.match(fukuokaMapSource, /\['かほまち愛犬病院','〒820-0303 嘉麻市中益756-1',33\.5414467,130\.7453943,'fukuoka-vets-kahomachi\.html'\]/,
  'Kahomachi Aiken Hospital marker matches its map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['かほまち愛犬病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=1148' && link.official === false),
  'Kahomachi Aiken location verification source remains in the registry');
assert.match(fukuokaMapSource, /\['アイリス動物病院','〒813-0035 福岡市東区松崎4丁目1-36',33\.6414185,130\.4408351,'fukuoka-vets-iris\.html'\]/,
  'Iris Animal Hospital marker matches its map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['アイリス動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=1751' && link.official === false),
  'Iris location verification source remains in the registry');
assert.match(fukuokaMapSource, /\['香椎ペットクリニック','〒813-0011 福岡市東区香椎4丁目15-30',33\.6513101,130\.4515348,'fukuoka-vets-kashii\.html'\]/,
  'Kashii Pet Clinic marker matches its map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['香椎ペットクリニック'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=1337' && link.official === false),
  'Kashii Pet Clinic location verification source remains in the registry');
assert.match(fukuokaMapSource, /\['治どうぶつ病院','〒813-0016 福岡市東区香椎浜3丁目12-1（イオン香椎浜SC内）',33\.6570988,130\.4298255,'fukuoka-vets-osamu\.html'\]/,
  'Osamu Animal Hospital marker matches its map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['治どうぶつ病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=1288' && link.official === false),
  'Osamu Animal Hospital location verification source remains in the registry');
assert.match(fukuokaMapSource, /\['福岡東動物病院','〒813-0013 福岡市東区香椎駅前3丁目4-25',33\.6620905,130\.4421973,'fukuoka-vets-fukuokahigashi\.html'\]/,
  'Fukuoka Higashi Animal Hospital marker matches its map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['福岡東動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=5230' && link.official === false),
  'Fukuoka Higashi location verification source remains in the registry');
assert.match(fukuokaMapSource, /\['かわかみ動物病院','〒813-0001 福岡市東区唐原3丁目17-21',33\.679383,130\.4365215,'fukuoka-vets-kawakami\.html'\]/,
  'Kawakami Animal Hospital marker matches its map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['かわかみ動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=6654' && link.official === false),
  'Kawakami location verification source remains in the registry');
assert.match(fukuokaMapSource, /\['青葉動物病院','〒813-0025 福岡市東区青葉1丁目1-20',33\.6376068,130\.4614092,'fukuoka-vets-aoba\.html'\]/,
  'Aoba Animal Hospital marker matches its map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['青葉動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=2750' && link.official === false),
  'Aoba location verification source remains in the registry');
assert.match(fukuokaMapSource, /\['みどりが丘動物病院','〒813-0021 福岡市東区名子3丁目7-20',33\.6426241,130\.4746729,'fukuoka-vets-midorigaoka\.html'\]/,
  'Midorigaoka Animal Hospital marker matches its map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['みどりが丘動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=6373' && link.official === false),
  'Midorigaoka location verification source remains in the registry');
assert.match(fukuokaMapSource, /\['ととろ動物病院','〒813-0032 福岡市東区土井1丁目21-11',33\.6361146,130\.4634287,'fukuoka-vets-totoro\.html'\]/,
  'Totoro Animal Hospital marker matches its map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['ととろ動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=6499' && link.official === false),
  'Totoro location verification source remains in the registry');
assert.match(fukuokaMapSource, /\['照葉ペットクリニック','〒813-0017 福岡市東区香椎照葉6丁目6-6 アイランドアイ内',33\.6676504,130\.415417,'fukuoka-vets-teriha\.html'\]/,
  'Teriha Pet Clinic marker matches its map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['照葉ペットクリニック'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=6599' && link.official === false),
  'Teriha location verification source remains in the registry');
assert.match(fukuokaMapSource, /\['のぞえ動物病院','〒812-0063 福岡市東区原田1-27-3',33\.617977380726416,130\.43587531584492,'fukuoka-vets-nozoe\.html'\]/,
  'Nozoe marker matches its official address and access map coordinates');
assert(c.window.mapSourceLinks.fukuoka['のぞえ動物病院'].some(link => link.url === 'https://nozoe-animal.com/guide/' && link.official === true),
  'Nozoe official access and map source remains in the registry');
assert.match(fukuokaMapSource, /\['しみず動物クリニック','〒815-0032 福岡市南区塩原3丁目1-7',33\.56551210000001,130\.4281768,'fukuoka-vets-shimizu\.html'\]/,
  'Shimizu Animal Clinic marker matches the current official post-relocation map');
assert(c.window.mapSourceLinks.fukuoka['しみず動物クリニック'].some(link => link.url === 'https://shimizu-animal.com/access/' && link.official === true),
  'Shimizu post-relocation official access map source remains in the registry');
assert.match(fukuokaMapSource, /\['たかみや通り動物クリニック','〒815-0083 福岡市南区高宮2丁目1-33 ロマネスク高宮102',33\.5700297,130\.4104854,'fukuoka-vets-takamiya\.html'\]/,
  'Takamiya-dori marker matches its Google Maps-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['たかみや通り動物クリニック'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=3730' && link.official === false),
  'Takamiya-dori map position source remains in the registry');
assert.match(fukuokaMapSource, /\['わかみや動物医療センター','〒813-0036 福岡市東区若宮4丁目2-39',33\.642465046659574,130\.44174333313435,'fukuoka-vets-wakamiya\.html'\]/,
  'Wakamiya marker matches the official access page embedded map coordinates');
assert(c.window.mapSourceLinks.fukuoka['わかみや動物医療センター'].some(link => link.url === 'https://wakamiya-amc.com/clinic/' && link.official === true),
  'Wakamiya official access and map source remains in the registry');
assert.match(fukuokaMapSource, /\['かなどう動物病院','〒815-0004 福岡市南区高木2丁目2-2',33\.56010361328552,130\.43767887979254,'fukuoka-vets-kanadou\.html'\]/,
  'Kanadou marker matches the map coordinates in the veterinary association listing');
assert(c.window.mapSourceLinks.fukuoka['かなどう動物病院'].some(link => link.url === 'https://j-pcm.com/memberlist/hospital/255/' && link.official === false),
  'Kanadou location source remains in the registry');
assert.match(fukuokaMapSource, /\['ひよどり動物病院','〒810-0029 福岡市中央区平尾浄水町7-7 ガーデンヒルズ浄水201',33\.5731636,130\.3914187,'fukuoka-vets-hiyodori\.html'\]/,
  'Hiyodori marker matches its Google Maps-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['ひよどり動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=5223' && link.official === false),
  'Hiyodori map position source remains in the registry');
assert.match(fukuokaMapSource, /\['ちはやペットクリニック','〒813-0043 福岡市東区名島3-2-3',33\.64337004661371,130\.42963981493625,'fukuoka-vets-chihaya\.html'\]/,
  'Chihaya marker matches the official access page embedded map coordinates');
assert(c.window.mapSourceLinks.fukuoka['ちはやペットクリニック'].some(link => link.url === 'https://chihaya-petclinic.com/overview/' && link.official === true),
  'Chihaya official access and map source remains in the registry');
assert.match(fukuokaMapSource, /\['みなとおおほり動物病院','〒810-0074 福岡市中央区大手門2丁目9-29 エクセラン大手門101',33\.591032,130\.386506,'fukuoka-vets-minato-ohori\.html'\]/,
  'Minato Ohori marker matches its address and Google Maps-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['みなとおおほり動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=4113' && link.official === false),
  'Minato Ohori map position source remains in the registry');
assert.match(fukuokaMapSource, /\['博多北ハート動物病院','福岡市博多区中呉服町1-26 博多インテリジェントビル1階',33\.5982848,130\.4097022,'fukuoka-vets-hakata-kita-heart\.html'\]/,
  'Hakata Kita Heart marker matches the map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['博多北ハート動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=4654' && link.official === false),
  'Hakata Kita Heart map position source remains in the registry');
assert.match(fukuokaMapSource, /\['めとき動物病院','〒812-0014 福岡市博多区比恵町7-20-1F',33\.5861309,130\.4300532,'fukuoka-vets-metoki\.html'\]/,
  'Metoki marker matches the map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['めとき動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=7279' && link.official === false),
  'Metoki map position source remains in the registry');
assert.match(fukuokaMapSource, /\['オアシス動物病院','〒812-0888 福岡市博多区板付7丁目10-37',33\.5556568,130\.4537376,'fukuoka-vets-oasis\.html'\]/,
  'Oasis Animal Hospital marker matches the user-provided Google Maps pin and independent coordinates');
assert(c.window.mapSourceLinks.fukuoka['オアシス動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=5021' && link.official === false),
  'Oasis Google Maps position source remains in the registry');
assert(c.window.mapSourceLinks.fukuoka['オアシス動物病院'].some(link => link.url === 'https://www.navitime.co.jp/poi?spot=00011-080926282' && link.official === false),
  'Oasis independent coordinate source remains in the registry');
assert.match(fukuokaMapSource, /\['つかさ動物病院','〒830-0070 久留米市大善寺南1丁目1-6',33\.2710866,130\.4751985,'fukuoka-vets-tsukasa\.html'\]/,
  'Tsukasa Animal Hospital marker matches the map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['つかさ動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=2572' && link.official === false),
  'Tsukasa map position source remains in the registry');
assert.match(fukuokaMapSource, /\['池田動物診療所','〒838-0824 朝倉郡筑前町原地蔵1897-1',33\.413354,130\.618318,'fukuoka-vets-ikeda\.html'\]/,
  'Ikeda Animal Clinic marker matches the map-linked coordinates');
assert(c.window.mapSourceLinks.fukuoka['池田動物診療所'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=6893' && link.official === false),
  'Ikeda map position source remains in the registry');
assert.match(fukuokaMapSource, /\['松本動物病院','飯塚市柏の森99-8',33\.638349,130\.707288,'fukuoka-vets-matsumoto\.html'\]/,
  'Matsumoto Animal Hospital marker matches NAVITIME facility coordinates');
assert(c.window.mapSourceLinks.fukuoka['松本動物病院'].some(link => link.url === 'https://www.navitime.co.jp/poi?spot=00011-080162122' && link.official === false),
  'Matsumoto facility coordinate source remains in the registry');
assert.match(fukuokaMapSource, /const imabayashiHospital=hospitals\.find\(p=>p\[0\]==='今林動物ケアクリニック'\);if\(imabayashiHospital\)\{imabayashiHospital\[2\]=33\.90343;imabayashiHospital\[3\]=130\.80513\}/,
  'Imabayashi marker uses the independently published facility coordinates');
assert(c.window.mapSourceLinks.fukuoka['今林動物ケアクリニック'].some(link => link.url === 'https://wannyanko.carrots.jp/fukuokaken/kitakyuushuushiwakamatsuku/kitakyuushuushiwakamatsuku_pet_8.html' && link.official === false),
  'Imabayashi independent coordinate source remains in the registry');
assert.match(fukuokaMapSource, /const imabayashiHospital=hospitals\.find\(p=>p\[0\]==='今林動物ケアクリニック'\);if\(imabayashiHospital\)\{imabayashiHospital\[2\]=33\.90343;imabayashiHospital\[3\]=130\.80513\}const kanmonHospital=hospitals\.find\(p=>p\[0\]==='かんもん動物病院'\);if\(kanmonHospital\)\{kanmonHospital\[2\]=33\.923571;kanmonHospital\[3\]=130\.979229\}/,
  'Kanmon Animal Hospital marker uses its hospital-search Google Maps coordinates');
assert(c.window.mapSourceLinks.fukuoka['かんもん動物病院'].some(link => link.url === 'https://www.anicom-ah.com/vh/anicom?id=2297' && link.official === false),
  'Kanmon facility coordinate source remains in the registry');
for (const [name, lat, lng, mapPath] of [
  ['飯塚犬猫病院', 33.6454635, 130.6774204, 'iizuka-inuneko'],
  ['田辺愛犬病院', 33.6285319, 130.6948911, 'tanabe'],
  ['ハロー動物病院', 33.6326251, 130.7059307, 'hello'],
  ['やひろ犬猫病院', 33.6140535, 130.6799107, 'yahiro'],
]) {
  const hospital = addedHospitals.find(p => p[0] === name);
  assert(hospital, `${name}: additional map record exists`);
  assert.equal(hospital[2], lat, `${name}: latitude matches Google Maps facility details`);
  assert.equal(hospital[3], lng, `${name}: longitude matches Google Maps facility details`);
  assert(c.window.mapSourceLinks.fukuoka[name].some(link => link.url.includes(`/@${lat},${lng},17z/`) && link.official === false),
    `${name}: Google Maps location source remains in the registry`);
}
for (const [name, lat, lng] of [
  ['コジマ動物病院', 33.405887, 130.6491408],
  ['かやの森動物病院', 33.6441274, 130.7071709],
  ['アニマルクリニック夜須', 33.4495972, 130.6132989],
]) {
  const hospital = addedHospitals.find(p => p[0] === name);
  assert(hospital, `${name}: additional map record exists`);
  assert.equal(hospital[2], lat, `${name}: latitude matches Google Maps facility details`);
  assert.equal(hospital[3], lng, `${name}: longitude matches Google Maps facility details`);
  assert(c.window.mapSourceLinks.fukuoka[name].some(link => link.url.includes(`/@${lat},${lng},17z/`) && link.official === false),
    `${name}: Google Maps location source remains in the registry`);
}
for (const [name, lat, lng, page, address] of [
  ['浜野動物病院', 33.6411967, 130.6620734, 'fukuoka-vets-hamano.html', '〒820-0045 福岡県飯塚市花瀬14'],
  ['おやま動物病院', 33.6651365, 130.6828951, 'fukuoka-vets-oyama.html', '〒820-0065 福岡県飯塚市中444-1'],
  ['坂田犬猫病院（犬猫医療センター）', 33.4256988, 130.6515271, 'fukuoka-vets-sakata.html', '〒838-0068 福岡県朝倉市甘木2002-1'],
]) {
  const hospital = hospitals.find(p => p[0] === name);
  assert(hospital, name + ': map record exists');
  assert.equal(hospital[2], lat, name + ': latitude matches the provided map screenshot');
  assert.equal(hospital[3], lng, name + ': longitude matches the provided map screenshot');
  assert(fs.readFileSync(page, 'utf8').includes(address), name + ': detail page address matches');
  assert.equal(fs.readFileSync('dist/' + page, 'utf8'), fs.readFileSync(page, 'utf8'), name + ': distribution detail page matches source');
}
const popups = [];
const fc = {...c, FacilityPopupCommon: c.window.FacilityPopupCommon, places, hospitals, map: {_layers: {}, removeLayer() {}}, L: {CircleMarker: function() {}, circleMarker: () => ({addTo() {return this;}, bindPopup(s) {popups.push(s);}, on() {}})}, setTimeout: fn => fn(), document: {...c.document, querySelector: () => null}};
vm.createContext(fc);
vm.runInContext(fs.readFileSync('fukuoka-popup-template.js', 'utf8'), fc);
for (const p of [...places, ...hospitals]) {
  const escaped = p[0].replaceAll('&', '&amp;').replaceAll("'", '&#39;');
  const savedLinks = [hospitals.includes(p) ? p[4] : p[5], ...p.slice(5)];
  assert(c.FacilityLinks.get('fukuoka', p[0], savedLinks).length > 0, p[0] + ': map entry should expose a confirmed source link');
  const popup = popups.find(s => s.includes('<strong>' + escaped + '</strong>'));
  assert(popup, p[0]);
  check(popup, 'fukuoka', p[0], savedLinks);
}
console.log(`Saved links preserved in actual popup data: Kumamoto ${kuma.length}, Fukuoka ${popups.length}; ${hospitals.length + addedHospitals.length} Fukuoka clinic detail targets verified`);
