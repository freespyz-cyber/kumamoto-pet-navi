const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync('fukuoka-pet-stay-map.html', 'utf8');
assert.equal(fs.readFileSync('dist/fukuoka-pet-stay-map.html', 'utf8'), html,
  'distribution map must match source');
assert.match(html, /<title>福岡ペット施設MAP/);
assert.match(html, /宿泊・飲食・動物病院・ドッグラン/);
assert.doesNotMatch(html, /福岡のペット宿泊施設を<br>地図から探す/);
const sourceLinks = fs.readFileSync('assets/map-source-links.js', 'utf8');
assert.equal(fs.readFileSync('dist/assets/map-source-links.js', 'utf8'), sourceLinks,
  'distribution source registry must match source');
const foodDetails = fs.readFileSync('fukuoka-food-details.js', 'utf8');
assert.equal(fs.readFileSync('dist/fukuoka-food-details.js', 'utf8'), foodDetails,
  'distribution food details must match source');
const bebeFix = fs.readFileSync('fukuoka-bebe-map-fix.js', 'utf8');
assert.equal(fs.readFileSync('dist/fukuoka-bebe-map-fix.js', 'utf8'), bebeFix,
  'distribution BeBe map fix must match source');

const placesSource = html.match(/const places=(\[[\s\S]*?\]);/)?.[1];
assert.ok(placesSource, 'base Fukuoka places data exists');
const places = vm.runInNewContext(placesSource);
const baseNames = new Set(places.map(place => place[0]));
const bebePlace = places.find(place => place[0] === 'Dog Cafe BeBe（ドッグカフェ ベベ）');
assert.ok(bebePlace, 'existing Dogcafe BeBe place remains a single base entry');
let bebePopupContent = '<strong>Dog Cafe BeBe（ドッグカフェ ベベ）</strong><br>遠賀郡遠賀町・松の本<br>分類：食事・ドッグラン';
let bebeMarkerLatLng = null;
const bebePopup = {getContent: () => bebePopupContent, setContent: value => {bebePopupContent = value;}};
const bebeMarker = {getPopup: () => bebePopup, setLatLng: value => {bebeMarkerLatLng = value;}};
const bebeFixContext = {map: {_layers: {bebe: bebeMarker}}, places};
vm.createContext(bebeFixContext);
vm.runInContext(bebeFix, bebeFixContext);
assert.deepEqual(Array.from(bebePlace.slice(1, 4)), ['〒811-4305 福岡県遠賀郡遠賀町松の本1-4-15', 33.8542109, 130.6695511]);
assert.deepEqual(Array.from(bebeMarkerLatLng), [33.8542109, 130.6695511]);
assert.ok(bebePopupContent.includes('〒811-4305 福岡県遠賀郡遠賀町松の本1-4-15'));
const testContext = {
  window: {},
  document: { createElement: () => ({}), head: { appendChild() {} } },
};
vm.createContext(testContext);
for (const file of ['assets/map-source-links.js', 'assets/map-links.js']) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), testContext);
}
testContext.FacilityLinks = testContext.window.FacilityLinks;

const candidateScript = html.match(/<script>[\s\S]*?<\/script>/g)
  ?.map(block => block.replace(/^<script>|<\/script>$/g, ''))
  .find(block => block.includes('const additions = [') && block.includes('const placeNames = new Set('));
assert.ok(candidateScript, 'legacy food candidate script exists');
const markers = [];
const map = { _layers: {} };
const runContext = {
  map,
  places,
  FacilityLinks: testContext.FacilityLinks,
  L: {
    circleMarker(coords) {
      return {
        bindPopup(html) { this.popup = html; return this; },
        addTo() { markers.push({ coords, popup: this.popup }); return this; },
      };
    },
  },
};
vm.createContext(runContext);
vm.runInContext(candidateScript, runContext);

const newlyAdded = places.filter(place => !baseNames.has(place[0]));
const boccoPlace = newlyAdded.find(place => place[0] === 'カフェドボッコ（cafe de BoCCo）');
assert.ok(boccoPlace, 'cafe de BoCCo remains listed');
assert.deepEqual(Array.from(boccoPlace.slice(1, 4)), ['〒811-3219 福津市西福間4-15-36', 33.7699076, 130.4715675]);
assert.deepEqual(Array.from(newlyAdded, place => place[0]).sort(),
  ['Current（カレント）', 'DogRun&Cafe EuAl*La（ユアーラ）', 'cafe Lanai（カフェ ラナイ）', 'カフェドボッコ（cafe de BoCCo）', 'くるみcafe', 'cafe Arrivederci（カフェ アリベデルチ）', 'ドッグカフェ＆サロン Lily Kitchen', 'cafe sofu-twins（そ〜ふ〜ついんず）', 'カフェダイニング オハナ（Cafe Dining Ohana）', 'Tràccia（トラッチャ）', 'Canary Cafe（キャナリーカフェ）', 'LeChienCafe（ルシアンカフェ）', 'Dining Kitchen Aoyama（ダイニングキッチン青山）', 'おにぎりカフェ＆BAR 一粒万倍', 'egg cafe（エッグカフェ）小倉南店', 'Farm Resort 糸島（ファームリゾート糸島）', 'Twenty Miles', 'YOCASTAND（Twenty Miles／福岡プリンスホテル ももち浜）', 'nico cafe（ニコカフェ）', 'SEASIDE BULLS CAFE（シーサイドブルズカフェ）', 'ドッグキャンパーレスト小笠木', 'GRANDMIRAGE WHOLE NOTE CAFE（グランドミラージュ ホールノートカフェ）', 'BeachHouseStyleCafe sunflower（ビーチハウススタイルカフェ サンフラワー）', 'Happy •Wan Land（森のレストラン・宿泊）', 'Dog Willer（ドッグウィラー）', 'ドッグカフェ CUTE PAWS／ドッグ❤ランド', 'ちりきら☆ROOM', 'PET’s THE WORLD', 'わんわんる～む シュシュ', 'The Party 今泉', 'with dog coffee'].sort(),
  'only candidates with a confirmed source may join the shared places array');
assert.equal(markers.length, 31, 'all source-backed candidates are rendered');
for (const place of newlyAdded) {
  assert.ok(testContext.FacilityLinks.has('fukuoka', place[0]), place[0] + ' has a visible source');
}
for (const excluded of [
  'bills 福岡水上公園', 'Puka Puka Kitchen（プカプカキッチン）', '草の家',
]) {
  assert.ok(!places.some(place => place[0] === excluded), excluded + ' must stay off the map pending correction');
}
assert.ok(!foodDetails.includes("'草の家':"), 'do not assert pet admission at Grass House');
const eualla = newlyAdded.find(place => place[0] === 'DogRun&Cafe EuAl*La（ユアーラ）');
assert.equal(eualla[2], 33.5778566326, 'EuAl*La latitude comes from the official embedded map');
assert.equal(eualla[3], 131.141666866, 'EuAl*La longitude comes from the official embedded map');
const kurumi = newlyAdded.find(place => place[0] === 'くるみcafe');
assert.equal(kurumi[1], '八女市・岩崎277-11');
assert.equal(kurumi[2], 33.2174556808, 'Kurumi Cafe coordinates come from the official embedded map');
assert.equal(kurumi[3], 130.545034415, 'Kurumi Cafe coordinates come from the official embedded map');
assert.match(foodDetails, /'くるみcafe': \['店内犬同伴可（公式サイト確認）'/);
const kurumiLinks = testContext.FacilityLinks.get('fukuoka', 'くるみcafe');
assert.ok(kurumiLinks.some(link => link.url === 'https://kurumicafe.com/index.html' && link.official), 'Kurumi official site link is registered');
assert.ok(kurumiLinks.some(link => link.url === 'https://kurumicafe.com/access.html' && link.official), 'Kurumi official map/address link is registered');
const arrivederci = newlyAdded.find(place => place[0] === 'cafe Arrivederci（カフェ アリベデルチ）');
assert.equal(arrivederci[1], '〒810-0074 福岡市中央区大手門3-9-18');
assert.equal(arrivederci[2], 33.591213, 'Arrivederci latitude matches the current map embed');
assert.equal(arrivederci[3], 130.380188, 'Arrivederci longitude matches the current map embed');
assert.match(foodDetails, /'cafe Arrivederci（カフェ アリベデルチ）': \['犬同伴可・室内ドッグランあり（店舗公式サイト）'/);
const lily = newlyAdded.find(place => place[0] === 'ドッグカフェ＆サロン Lily Kitchen');
assert.equal(lily[2], 33.30893754098684, 'Lily Kitchen latitude comes from the official embedded map');
assert.equal(lily[3], 130.50498532119067, 'Lily Kitchen longitude comes from the official embedded map');
assert.match(foodDetails, /'ドッグカフェ＆サロン Lily Kitchen': \['店内犬同伴可・室内ドッグランあり（店舗公式サイト）'/);
const sofu = newlyAdded.find(place => place[0] === 'cafe sofu-twins（そ〜ふ〜ついんず）');
assert.equal(sofu[1], '〒819-0015 福岡市西区愛宕3-5-21');
assert.match(foodDetails, /'cafe sofu-twins（そ〜ふ〜ついんず）': \['犬・猫同伴可の個室・テラスあり（個室以外はペット不可）'/);
const ohana = newlyAdded.find(place => place[0] === 'カフェダイニング オハナ（Cafe Dining Ohana）');
assert.equal(ohana[1], '大牟田市・中島町1-2');
assert.equal(ohana[2], 33.03699646642271, 'Ohana latitude comes from its official embedded map');
assert.equal(ohana[3], 130.4447075897218, 'Ohana longitude comes from its official embedded map');
assert.match(foodDetails, /'カフェダイニング オハナ（Cafe Dining Ohana）': \['ペット同伴可（公式店舗情報）', '犬入店料250円／頭・予約時に頭数を連絡'/);
const traccia = newlyAdded.find(place => place[0] === 'Tràccia（トラッチャ）');
assert.equal(traccia[1], '糸島市志摩桜井5221');
assert.equal(traccia[4], 'ドッグラン・カフェ');
assert.equal(traccia[2], 33.6257757, 'Tràccia latitude matches the Google Maps place listing');
assert.equal(traccia[3], 130.1839291, 'Tràccia longitude matches the Google Maps place listing');
assert.ok(testContext.FacilityLinks.get('fukuoka', 'Tràccia（トラッチャ）').some(link => link.url === 'https://traccia-dogrun.com/' && link.official));
assert.ok(sourceLinks.includes('Googleマップ施設リスティング（住所一致・施設ピン）'),
  'Tràccia source registry records its matching Google Maps place listing');
assert.ok(candidateScript.includes('狂犬病・混合ワクチン証明の原本またはコピーが必要（写真不可）'), 'Tràccia vaccination-document rule appears in the popup');
const bocco = newlyAdded.find(place => place[0] === 'カフェドボッコ（cafe de BoCCo）');
assert.equal(bocco[2], 33.7699076, 'cafe de BoCCo latitude matches its Google Maps place listing');
assert.equal(bocco[3], 130.4715675, 'cafe de BoCCo longitude matches its Google Maps place listing');
const current = newlyAdded.find(place => place[0] === 'Current（カレント）');
assert.equal(current[1], '〒819-1303 糸島市志摩野北2290');
assert.equal(current[2], 33.608574, 'Current latitude matches its Google Maps place listing');
assert.equal(current[3], 130.161862, 'Current longitude matches its Google Maps place listing');
const canary = newlyAdded.find(place => place[0] === 'Canary Cafe（キャナリーカフェ）');
assert.equal(canary[1], '〒819-0015 福岡市西区愛宕2-15-25');
assert.equal(canary[2], 33.583802, 'Canary Cafe latitude matches Yahoo Maps pin');
assert.equal(canary[3], 130.333419, 'Canary Cafe longitude matches Yahoo Maps pin');
assert.equal(canary[4], '食事');
assert.match(foodDetails, /'Canary Cafe（キャナリーカフェ）': \['犬同伴可（店舗公式）'/);
assert.match(sourceLinks, /"Canary Cafe（キャナリーカフェ）": \[[\s\S]*?"url": "https:\/\/map\.yahoo\.co\.jp\/v3\/place\/oBxTd_YKF1U"/,
  'Canary Cafe Yahoo Maps pin source is retained in the source registry');
const lechien = newlyAdded.find(place => place[0] === 'LeChienCafe（ルシアンカフェ）');
assert.equal(lechien[1], '〒812-0017 福岡市博多区美野島3-14-19 しず花ビル');
assert.equal(lechien[2], 33.57731694265858, 'LeChienCafe latitude matches the official map embed');
assert.equal(lechien[3], 130.41644707561707, 'LeChienCafe longitude matches the official map embed');
assert.equal(lechien[4], '食事');
assert.match(foodDetails, /'LeChienCafe（ルシアンカフェ）': \['ペット同伴可（店舗公式）・11:00〜18:00（不定休）'/);
const sofuTwins = newlyAdded.find(place => place[0] === 'cafe sofu-twins（そ〜ふ〜ついんず）');
assert.equal(sofuTwins[1], '〒819-0015 福岡市西区愛宕3-5-21');
assert.equal(sofuTwins[2], 33.58364015, 'sofu-twins latitude matches the Yahoo Maps facility pin');
assert.equal(sofuTwins[3], 130.33846563, 'sofu-twins longitude matches the Yahoo Maps facility pin');
assert.match(sourceLinks, /"cafe sofu-twins（そ〜ふ〜ついんず）": \[[\s\S]*?"url": "https:\/\/map\.yahoo\.co\.jp\/v3\/place\/354bEaPmRy-"/,
  'sofu-twins Yahoo Maps facility pin source is retained');
const aoyama = newlyAdded.find(place => place[0] === 'Dining Kitchen Aoyama（ダイニングキッチン青山）');
assert.equal(aoyama[1], '福岡市南区・桧原2-35-18');
assert.equal(aoyama[2], 33.5395241, 'Aoyama coordinates come from its Google Maps place');
assert.equal(aoyama[3], 130.3951313, 'Aoyama coordinates come from its Google Maps place');
assert.match(foodDetails, /'Dining Kitchen Aoyama（ダイニングキッチン青山）': \['ペット同伴は事前予約制の個室（店舗公式）'/);
assert.ok(testContext.FacilityLinks.get('fukuoka', 'Dining Kitchen Aoyama（ダイニングキッチン青山）').some(link => link.url === 'https://www.dkaoyama.com/' && link.official));
const ichiryu = newlyAdded.find(place => place[0] === 'おにぎりカフェ＆BAR 一粒万倍');
assert.equal(ichiryu[1], '北九州市小倉北区・下到津4-10-9');
assert.equal(ichiryu[2], 33.8758521, 'Ichiryu coordinates come from its Google Maps place');
assert.equal(ichiryu[3], 130.855111, 'Ichiryu coordinates come from its Google Maps place');
assert.match(foodDetails, /'おにぎりカフェ＆BAR 一粒万倍': \['店内ペット同伴可（店舗公式）'/);
assert.ok(testContext.FacilityLinks.get('fukuoka', 'おにぎりカフェ＆BAR 一粒万倍').some(link => link.url === 'https://enisia.jp/ichiryu-manbai.php' && link.official));
const eggCafe = newlyAdded.find(place => place[0] === 'egg cafe（エッグカフェ）小倉南店');
assert.equal(eggCafe[1], '北九州市小倉南区・横代北町3-16-20');
assert.equal(eggCafe[2], 33.833036436699075, 'Egg Cafe coordinates come from the official embedded map');
assert.equal(eggCafe[3], 130.89553261434497, 'Egg Cafe coordinates come from the official embedded map');
assert.match(foodDetails, /'egg cafe（エッグカフェ）小倉南店': \['ペット同伴はテラス席のみ（公式店舗案内）'/);
assert.ok(testContext.FacilityLinks.get('fukuoka', 'egg cafe（エッグカフェ）小倉南店').some(link => link.url === 'https://eggcafe-kokura.com/distinations/about/' && link.official));
const farmResort = newlyAdded.find(place => place[0] === 'Farm Resort 糸島（ファームリゾート糸島）');
assert.equal(farmResort[1], '糸島市・志摩小金丸1738');
assert.equal(farmResort[2], 33.5887903, 'Farm Resort coordinates come from its Google Maps place');
assert.equal(farmResort[3], 130.1472009, 'Farm Resort coordinates come from its Google Maps place');
assert.equal(farmResort[4], 'ドッグラン・カフェ');
assert.ok(testContext.FacilityLinks.get('fukuoka', 'Farm Resort 糸島（ファームリゾート糸島）').some(link => link.url === 'https://www.farmresort-itoshima.com/dog-run' && link.official));
const twentyMiles = newlyAdded.find(place => place[0] === 'Twenty Miles');
assert.equal(twentyMiles[1], '福岡市中央区・大濠2-3-2');
assert.equal(twentyMiles[2], 33.5867594, 'Twenty Miles coordinates match the current Google Maps place');
assert.equal(twentyMiles[3], 130.3732814, 'Twenty Miles coordinates match the current Google Maps place');
assert.equal(twentyMiles[4], '食事');
assert.ok(testContext.FacilityLinks.get('fukuoka', 'Twenty Miles').some(link => link.url === 'https://chill-frenzy.com/brand/twenty-miles/' && link.official));
assert.match(foodDetails, /'Twenty Miles': \['犬同伴可（店舗公式）'/);
const yocastand = newlyAdded.find(place => place[0] === 'YOCASTAND（Twenty Miles／福岡プリンスホテル ももち浜）');
assert.equal(yocastand[1], '福岡市早良区・百道浜2-3-23');
assert.equal(yocastand[2], 33.5934361, 'YOCASTAND location matches the official hotel Google Maps pin');
assert.equal(yocastand[3], 130.3504407, 'YOCASTAND location matches the official hotel Google Maps pin');
assert.match(foodDetails, /'YOCASTAND（Twenty Miles／福岡プリンスホテル ももち浜）': \['愛犬同伴はテラス席のみ（ホテル公式）'/);
assert.ok(testContext.FacilityLinks.get('fukuoka', yocastand[0]).some(link => link.url === 'https://www.princehotels.co.jp/momochihama/facility/yoca/' && link.official));
const nicoCafe = newlyAdded.find(place => place[0] === 'nico cafe（ニコカフェ）');
assert.equal(nicoCafe[1], '福岡市南区・井尻3-13-16');
assert.equal(nicoCafe[2], 33.5512812, 'nico cafe coordinates match the current Google Maps place');
assert.equal(nicoCafe[3], 130.4461938, 'nico cafe coordinates match the current Google Maps place');
assert.match(foodDetails, /'nico cafe（ニコカフェ）': \['犬同伴はテラス席のみ（店舗公式）'/);
assert.ok(testContext.FacilityLinks.get('fukuoka', nicoCafe[0]).some(link => link.url === 'https://nico-cafe.jp/faq' && link.official));
const seasideBulls = newlyAdded.find(place => place[0] === 'SEASIDE BULLS CAFE（シーサイドブルズカフェ）');
assert.equal(seasideBulls[1], '福岡市西区・生の松原1-19-5');
assert.equal(seasideBulls[2], 33.5824666, 'Seaside Bulls coordinates match the current Google Maps place');
assert.equal(seasideBulls[3], 130.3044531, 'Seaside Bulls coordinates match the current Google Maps place');
assert.match(foodDetails, /'SEASIDE BULLS CAFE（シーサイドブルズカフェ）': \['愛犬同伴で来店可（店舗公式）'/);
assert.ok(testContext.FacilityLinks.get('fukuoka', seasideBulls[0]).some(link => link.url === 'https://daimyo-works.com/seasidebullscafe/' && link.official));
const camperOkasaki = newlyAdded.find(place => place[0] === 'ドッグキャンパーレスト小笠木');
assert.equal(camperOkasaki[1], '〒811-1112 福岡県福岡市早良区小笠木967-3');
assert.equal(camperOkasaki[2], 33.4915605, 'Okasaki latitude matches current Google Maps pin');
assert.equal(camperOkasaki[3], 130.3669645, 'Okasaki longitude matches current Google Maps pin');
assert.equal(camperOkasaki[4], '食事');
assert.match(foodDetails, /'ドッグキャンパーレスト小笠木': \['店内犬同伴可・ドッグラン併設（早良商工会掲載）'/);
assert.ok(testContext.FacilityLinks.get('fukuoka', camperOkasaki[0]).some(link => link.url === 'https://www.sawara-sci.com/restaurant' && link.official));
const dogWiller = newlyAdded.find(place => place[0] === 'Dog Willer（ドッグウィラー）');
assert.equal(dogWiller[1], '〒839-1213 久留米市田主丸町益生田610-7');
assert.equal(dogWiller[2], 33.32546120025332, 'Dog Willer latitude matches its official embedded map pin');
assert.equal(dogWiller[3], 130.6655245614103, 'Dog Willer longitude matches its official embedded map pin');
assert.equal(dogWiller[4], 'ドッグラン・カフェ');
assert.match(foodDetails, /name: 'Dog Willer（ドッグウィラー）',[\s\S]*?lat: 33\.32546120025332,[\s\S]*?lng: 130\.6655245614103,[\s\S]*?'店舗公式アクセス地図の施設ピン位置を使用'/);
assert.doesNotMatch(foodDetails, /Dog Willer[\s\S]{0,500}地域目安/);
assert.ok(testContext.FacilityLinks.get('fukuoka', dogWiller[0]).some(link => link.url === 'https://www.dogwiller.com/' && link.official));
assert.ok(candidateScript.includes('小型犬のみの利用は不可') && candidateScript.includes('指定犬種は貸切限定'),
  'Dog Willer popup preserves the official dog-size and breed restrictions');
const cutePaws = newlyAdded.find(place => place[0] === 'ドッグカフェ CUTE PAWS／ドッグ❤ランド');
assert.equal(cutePaws[1], '宗像市上八837-1');
assert.equal(cutePaws[2], 33.8762119, 'CUTE PAWS coordinates match its Google Maps place listing');
assert.equal(cutePaws[3], 130.53014, 'CUTE PAWS coordinates match its Google Maps place listing');
assert.ok(testContext.FacilityLinks.get('fukuoka', cutePaws[0]).some(link => link.url === 'https://dogcafe-cute-paws.github.io/' && link.official));
assert.ok(sourceLinks.includes('https://www.google.com/maps/search/?api=1&query=%E3%83%89%E3%83%83%E3%82%B0%E3%82%AB%E3%83%95%E3%82%A7+CUTE+PAWS+%E5%AE%97%E5%83%8F%E5%B8%82%E4%B8%8A%E5%85%AB837-1'),
  'CUTE PAWS has an address search link even though it is not an official source');
assert.ok(candidateScript.includes('ラン利用はカフェで無料登録') && !candidateScript.includes('ピンは地域目安'),
  'CUTE PAWS popup preserves registration requirements without the obsolete approximate-location notice');
const chirikira = newlyAdded.find(place => place[0] === 'ちりきら☆ROOM');
assert.equal(chirikira[1], '福岡市早良区高取2-3-23-112');
assert.equal(chirikira[2], 33.58112093, 'Chirikira ROOM latitude matches current Yahoo Maps pin');
assert.equal(chirikira[3], 130.35062285, 'Chirikira ROOM longitude matches current Yahoo Maps pin');
assert.ok(testContext.FacilityLinks.get('fukuoka', chirikira[0]).some(link => link.url === 'https://www.chirikira.com/' && link.official));
assert.match(foodDetails, /'ちりきら☆ROOM': \['犬・猫同伴可（店内同伴可、2026年7月確認）'/);
const petsWorld = newlyAdded.find(place => place[0] === 'PET’s THE WORLD');
assert.equal(petsWorld[1], '〒830-0003 福岡県久留米市東櫛原町1460-16 池尻ビル1F');
assert.equal(petsWorld[2], 33.320738036467, 'PETs THE WORLD latitude matches current Yahoo Maps pin');
assert.equal(petsWorld[3], 130.52448216586, 'PETs THE WORLD longitude matches current Yahoo Maps pin');
assert.ok(testContext.FacilityLinks.get('fukuoka', petsWorld[0]).some(link => link.url === 'https://pets-the-world.jp/' && link.official));
assert.ok(testContext.FacilityLinks.get('fukuoka', petsWorld[0]).some(link => link.url === 'https://petstheworld.blog.fc2.com/' && link.official));
assert.ok(sourceLinks.includes('https://map.yahoo.co.jp/v3/place/_KJmPKAdeYo'));
assert.match(foodDetails, /'PET’s THE WORLD': \['犬同伴カフェ（店舗運営ブログの2026年9月更新・Yahoo!マップの営業中表示を確認）'/);
const chouchou = newlyAdded.find(place => place[0] === 'わんわんる～む シュシュ');
assert.equal(chouchou[1], '〒809-0011 福岡県中間市岩瀬1-8-1 東海倶楽部201');
assert.equal(chouchou[2], 33.828061, 'Chouchou latitude matches Yahoo Maps place pin');
assert.equal(chouchou[3], 130.714064, 'Chouchou longitude matches Yahoo Maps place pin');
assert.ok(testContext.FacilityLinks.get('fukuoka', chouchou[0]).some(link => link.url === 'https://page.line.me/707cwben' && link.official));
assert.ok(sourceLinks.includes('https://map.yahoo.co.jp/v3/place/5FEdW2a_Ap2'),
  'Chouchou coordinate provenance is retained in the source registry');
assert.match(foodDetails, /'わんわんる～む シュシュ': \['愛犬同伴で食事できるドッグカフェ（公式LINE）'/);
const theParty = newlyAdded.find(place => place[0] === 'The Party 今泉');
assert.equal(theParty[1], '〒810-0021 福岡県福岡市中央区今泉1-18-28 アペゼ今泉3F');
assert.equal(theParty[2], 33.585569, 'The Party latitude matches Yahoo Maps place pin');
assert.equal(theParty[3], 130.397749, 'The Party longitude matches Yahoo Maps place pin');
assert.ok(testContext.FacilityLinks.get('fukuoka', theParty[0]).some(link => link.url === 'https://www.instagram.com/the_party_imaizumi/' && link.official));
assert.ok(sourceLinks.includes('https://www.hotpepper.jp/strJ000955068/appearance/'));
assert.ok(sourceLinks.includes('https://map.yahoo.co.jp/v3/place/M9V6VlN_qXE'));
const withDogCoffee = newlyAdded.find(place => place[0] === 'with dog coffee');
assert.equal(withDogCoffee[1], '〒819-1623 福岡県糸島市二丈石崎361');
assert.equal(withDogCoffee[2], 33.5204475, 'WITH DOG COFFEE latitude matches the Yahoo Maps facility pin');
assert.equal(withDogCoffee[3], 130.16091348, 'WITH DOG COFFEE longitude matches the Yahoo Maps facility pin');
assert.ok(testContext.FacilityLinks.get('fukuoka', withDogCoffee[0]).some(link => link.url === 'https://www.instagram.com/with_dog_coffee/' && link.official));
assert.ok(sourceLinks.includes('https://odekake-wanko-bu.com/spot/wizudogguko-hi/'));
assert.match(foodDetails, /'with dog coffee': \['犬同伴可・店内利用可、ドッグラン併設（2026年10月更新の施設案内・Yahoo!マップで確認）'/);
assert.match(foodDetails, /'The Party 今泉': \['ペット同伴はテラス席のみ（屋内不可）'/);
assert.match(foodDetails, /'THE BEACH（ザ ビーチ）': \['ペット同伴可。店内は小型犬のみ、テラスは犬種条件の記載なし（店舗公式FAQ）'/);
assert.ok(testContext.FacilityLinks.get('fukuoka', 'THE BEACH（ザ ビーチ）').some(link => link.url === 'https://thebeach-marizon.com/free/faq' && link.official));
assert.ok(sourceLinks.includes('https://map.yahoo.co.jp/v3/place/GoY1CsMjPio'), 'THE BEACH has its current Yahoo Maps record in the source registry');
const wholeNote = newlyAdded.find(place => place[0] === 'GRANDMIRAGE WHOLE NOTE CAFE（グランドミラージュ ホールノートカフェ）');
assert.equal(wholeNote[1], '〒810-0021 福岡市中央区今泉1-17-16-1 1階');
assert.equal(wholeNote[2], 33.5862404, 'Whole Note latitude matches current Google Maps pin');
assert.equal(wholeNote[3], 130.398739, 'Whole Note longitude matches current Google Maps pin');
assert.match(foodDetails, /'GRANDMIRAGE WHOLE NOTE CAFE（グランドミラージュ ホールノートカフェ）': \['ペット同伴可（店舗公式予約情報）'/);
assert.ok(testContext.FacilityLinks.get('fukuoka', wholeNote[0]).some(link => link.url === 'https://grandmirage-wnc.owst.jp/' && link.official));
const sunflower = newlyAdded.find(place => place[0] === 'BeachHouseStyleCafe sunflower（ビーチハウススタイルカフェ サンフラワー）');
assert.equal(sunflower[1], '〒819-0165 福岡市西区今津4420-1');
assert.equal(sunflower[2], 33.6187472, 'sunflower latitude matches current Google Maps pin');
assert.equal(sunflower[3], 130.2314361, 'sunflower longitude matches current Google Maps pin');
assert.match(foodDetails, /'BeachHouseStyleCafe sunflower（ビーチハウススタイルカフェ サンフラワー）': \['ペット同伴は屋根付きテラス席のみ（店舗ブログ・3卓）'/);
assert.ok(testContext.FacilityLinks.get('fukuoka', sunflower[0]).some(link => link.url === 'https://blog.livedoor.jp/sunflower44201/archives/2025-07.html' && link.official));
const happyWanLand = newlyAdded.find(place => place[0] === 'Happy •Wan Land（森のレストラン・宿泊）');
assert.equal(happyWanLand[1], '〒839-1213 福岡県久留米市田主丸町益生田2287-7');
assert.equal(happyWanLand[2], 33.3215698, 'Happy Wan Land latitude matches current Google Maps pin');
assert.equal(happyWanLand[3], 130.6882269, 'Happy Wan Land longitude matches current Google Maps pin');
assert.match(foodDetails, /'Happy •Wan Land（森のレストラン・宿泊）': \['愛犬と泊まれる貸別荘・コテージ、森のレストラン、ドッグランの複合施設（2026年開業）'/);
assert.ok(testContext.FacilityLinks.get('fukuoka', happyWanLand[0]).some(link => link.url === 'https://www.instagram.com/happy_wan_land_fukuoka/' && link.official));
const detailPopups = newlyAdded.map(place => {
  let content = `<strong>${place[0]}</strong><br>${place[1]}<br>分類：食事<br><span class="map-tag">ペット同伴条件を確認中</span><br><button class="map-add-plan">この場所を予定に追加</button>`;
  const popup = {getContent: () => content, setContent: value => {content = value;}};
  return {name: place[0], getPopup: () => popup, getContent: () => content};
});
detailPopups.push({name: 'Dog Cafe BeBe（ドッグカフェ ベベ）', ...(() => {
  let content = '<strong>Dog Cafe BeBe（ドッグカフェ ベベ）</strong><br>住所<br>分類：食事・ドッグラン<br><span class="map-tag">ペット同伴条件を確認中</span><br><button class="map-add-plan">この場所を予定に追加</button>';
  const popup = {getContent: () => content, setContent: value => {content = value;}};
  return {getPopup: () => popup, getContent: () => content};
})()});
const detailsContext = {map: {_layers: detailPopups}, setTimeout: fn => fn()};
vm.createContext(detailsContext);
vm.runInContext(foodDetails, detailsContext);
for (const [name, phrase] of [
  ['cafe Arrivederci（カフェ アリベデルチ）', '犬同伴可・室内ドッグランあり（店舗公式サイト）'],
  ['ドッグカフェ＆サロン Lily Kitchen', '店内犬同伴可・室内ドッグランあり（店舗公式サイト）'],
  ['cafe sofu-twins（そ〜ふ〜ついんず）', 'ペット同伴は要予約・予約時に頭数を連絡'],
  ['Twenty Miles', '犬同伴可（店舗公式）'],
  ['YOCASTAND（Twenty Miles／福岡プリンスホテル ももち浜）', '愛犬同伴はテラス席のみ（ホテル公式）'],
  ['nico cafe（ニコカフェ）', '犬同伴はテラス席のみ（店舗公式）'],
  ['SEASIDE BULLS CAFE（シーサイドブルズカフェ）', '愛犬同伴で来店可（店舗公式）'],
  ['わんわんる～む シュシュ', '営業時間11:00〜18:00（最終受付17:00）、火・水曜定休'],
  ['The Party 今泉', 'ペット同伴はテラス席のみ（屋内不可）'],
  ['Dog Cafe BeBe（ドッグカフェ ベベ）', '店内・テラス・ドッグランで大型犬まで利用可（店舗公式）'],
]) {
  assert.ok(detailPopups.find(popup => popup.name === name).getContent().includes(phrase), name + ' verified detail appears in popup');
}
console.log('Fukuoka legacy food candidate visibility tests passed (source guard, exclusions, and dist parity).');
