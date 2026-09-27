// User-supplied candidates. Regional coordinates below are NOT facility locations.
const oitaRegionData = {
  oita:{name:'大分市',lat:33.24,lng:131.61},hiji:{name:'日出',lat:33.37,lng:131.53},usa:{name:'宇佐',lat:33.53,lng:131.35},saiki:{name:'佐伯',lat:32.96,lng:131.90},taketa:{name:'竹田',lat:32.97,lng:131.40},bungo:{name:'豊後大野',lat:32.97,lng:131.58},tsukumi:{name:'津久見',lat:33.07,lng:131.86},usuki:{name:'臼杵',lat:33.12,lng:131.80},kitsuki:{name:'杵築',lat:33.42,lng:131.62},unknown:{name:'所在地確認中'},
  beppu: {name:'別府',lat:33.28,lng:131.49},
  yufu: {name:'由布・湯布院',lat:33.26,lng:131.35},
  kokonoe: {name:'九重・くじゅう',lat:33.12,lng:131.25},
  hita: {name:'日田・天ヶ瀬',lat:33.25,lng:130.94},
  kunisaki: {name:'国東',lat:33.56,lng:131.60},
  takada: {name:'豊後高田',lat:33.66,lng:131.53}
};
const rows = [
 ['別府 丘と海のドッグリゾート','beppu','', '公式URL・現行条件の確認待ち'],
 ['わんこの宿 ゆるり','beppu','https://wanko-yururi.com/','犬種・頭数・料金は要確認'],
 ['湯富里の宿 一壺天','yufu','https://ikkoten.com/','ペット対応客室・条件は要確認'],
 ['湯布院らんぷの宿','yufu','https://www.yufuinlamp.com/','ペット対応客室の予約条件を確認'],
 ['湯布院ガーデンホテル','yufu','https://yufuin-gardenhotel.jp/','犬種・頭数・宿泊料金を確認'],
 ['レジーナリゾート由布院 くぬぎの杜','yufu','https://www.regina-resorts.com/yufuin/','圍とは別施設として整理'],
 ['レジーナリゾート由布院 圍-Kakoi-','yufu','https://www.regina-resorts.com/yufuin/','くぬぎの杜とは別施設として整理'],
 ['グランヴェルデリゾート','beppu','https://www.grandverderesort.com/','グランピング・キャンプで条件が異なるため要確認'],
 ['べっぷ好楽','beppu','https://koraku.net/pet/','ペット対応客室を指定して確認'],
 ['癒しの宿 鷹勝','yufu','https://yado-takasho.jp/room/takamori/','ペット対応の離れを確認。本館と区別'],
 ['榎屋旅館','yufu','https://www.yufuin-enokiya.jp/pet/','ペット利用規約・客室条件を確認'],
 ['COMOREBI','yufu','https://comorebi-camp.jp/petgramping/','ペット対応エリア・客室を確認'],
 ['離れ水分村','kokonoe','https://www.mizuwake.jp/pet/','民宿水分（旧館）とは利用条件を分けて確認'],
 ['民宿水分（旧館）','kokonoe','https://www.mizuwake.jp/pet/','旧館は小型犬の条件を確認'],
 ['貸別荘 柊','hita','https://hiiragi.com/','ペット対応棟・宿泊プランを確認'],
 ['楓の小舎','yufu','https://www.yufuin-kaede.com/information/','対応客室・現行規約の再確認が必要'],
 ['天空の宿 ゆふそら','yufu','https://tenkunoyado-yufusora.amebaownd.com/','一棟貸し。頭数・追加料金・マナー用品を確認'],
 ['長崎鼻ビーチリゾート','takada','https://nagasakibana-beach.com/','ペット対応トレーラーと一般テントを区別'],
 ['御宿 一禅','yufu','https://www.oyado-ichizen.com/lp/pet/','ペット対応の別邸・プランを確認'],
 ['別府のお宿 加賀屋','beppu','https://www.beppu-kagaya.com/news/news-229/','小型犬の体重・頭数制限を予約前に確認'],
 ['グランステイ湯布院','yufu','https://www.granstay-yufuin.jp/information/','頭数・追加料金・同意書を確認'],
 ['TERRA湯布院','yufu','https://www.terra-yufuin.com/faq.html','ガーデン客室のペット条件を確認'],
 ['SAKURA別邸','kokonoe','https://sakurabettei.jp/','ペット対応ヴィラを指定して確認'],
 ['梅園の里','kunisaki','https://baien-no-sato.ks-rondo.net/index.html','ペット対応ロッジを確認'],
 ['由布院グランピング 天の庭','yufu','https://tennoniwa.jp/free/faq','ドッグラン付き客室・マナー用品を確認'],
 ['Rakuten STAY VILLA 由布院温泉','yufu','https://stay.rakuten.co.jp/villa/yufuin-onsen/','ペット対応棟を指定。一般棟と区別'],
 ['DOG & ONSEN HOTEL HONJIN','hita','https://hongin.jp/','宿泊規約・料金を確認'],
 ['ウェナヴィレッジくじゅう','kokonoe','https://www.oita-kuju-glamping.com/pet/','ペット対応コテージを指定して確認'],
 ['くにさき 森と海のドッグリゾート','kunisaki','https://kunisaki-dogresort.com/dogs/index.html','頭数制限・持参書類を確認'],
 ['シーサイド大沢','kunisaki','https://seaside-oosawa.com/pet.html','大型犬・小動物等は予約前の問い合わせを確認'],
 ['民宿ひろしげ','hita','https://minsyuku-hiroshige.com/pet.html','ペット対応客室・種類別料金を確認'],
 ['筋湯温泉 大黒屋','kokonoe','https://daikokuya-takumi.jp/','掲載保留：公式のペット宿泊条件が未確認'],
 ['SPACE-VESSEL基地','yufu','https://spacevessel.jp/space-vessel.html','ふたご座の小型犬対応条件を確認']
];
const stays=rows.map(([name,region,url,note],i)=>({id:i+1,name,region,url,note,categories:['stay'],hold:i===0||i===31}));
window.oitaRegions=oitaRegionData; window.oitaStays=stays;
