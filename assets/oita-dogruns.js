// Supplied screenshots are evidence of candidates, not confirmation of current operation.
const dogrunRows = [
 ['別府市ドッグラン','beppu',['run'],'https://www.city.beppu.oita.jp/sisetu/kouen_tyuusyajyou/03kouen_03-07dogrun.html','別府市小倉町979番1。公式確認：登録制、大型犬・小型犬・フリーエリア。'],
 ['森のドッグラン 枝瑠風（エルフ）','yufu',['run'],'https://www.instagram.com/dogrun_elf/','画像受付。営業日・持参書類・所在地の詳細は公式SNSで要確認。'],
 ['森カフェ ワン・LOVE','oita',['run','food'],'https://www.instagram.com/moricafewan.love/','画像記載：大分市大字葛木1069。ドッグラン・ドッグカフェ。最新条件は要確認。'],
 ['カフェハル CAFE HAL','hiji',['run','food'],'https://www.instagram.com/cafehal_dogrun.hiji/','画像に休業告知あり。営業再開・ドッグラン利用条件の確認待ち。',true],
 ['rionu（リオーヌ）','hiji',['run','food'],'https://www.instagram.com/rionu.2025/','画像記載：日出町豊岡473番地1。小型犬専用ドッグラン・カフェ・ケアサロン。最新営業日は要確認。'],
 ['アニコム ウェルネス ドッグラン','oita',['run'],'https://oita-aigo.com/dogrun/','大分市大字廻栖野3231番地47。公式確認：登録制、大型犬／中小型犬／貸切ゾーン。鑑札・狂犬病予防注射済票の装着が必要。'],
 ['湯布院ドッグラン グリーンフィールド','yufu',['run','food'],'https://yufuin-dogrun.com/','公式確認：天然芝ドッグラン・カフェ併設。不定休のため公式カレンダーを確認。'],
 ['ドッグラン＆カフェ blue mountain','saiki',['run','food'],'https://www.instagram.com/blue_mountain2022/','画像記載：佐伯市大字青山5402番地。カフェは日曜・不定期、季節休業あり。最新営業日は要確認。'],
 ['別府湾サービスエリア','beppu',['run'],'https://www.w-holdings.co.jp/sapa/26050/','ドッグラン候補。提供画像は上り案内。設置場所・上下線からの利用条件は確認待ち。',true],
 ['おおがファーム','hiji',['run','food'],'https://ogafarm.com/','犬同伴・ドッグラン候補。入園条件・ドッグランの利用条件は確認待ち。'],
 ['SORAcafe','usa',['run','food','boarding'],'https://www.facebook.com/dogcafesora/','画像記載：宇佐市大字別府561-1。ドッグカフェ・ドッグラン・トリミング。預かり条件は要確認。'],
 ['ドッグカフェ KURU・SAN','beppu',['food'],'https://www.instagram.com/dogcafe_kuru.san/','画像記載：別府市火売6組3。別府市営ドッグラン近くのカフェ。ドッグラン併設とは扱いません。'],
 ['春夏秋冬','saiki',['run','boarding'],'https://dogrun-harunatsuakihuyu0811.jimdosite.com/','公式確認：佐伯市宇目大平1944番地1。ドッグラン・老犬介護・ペットホテル。予約・利用条件は要確認。'],
 ['わんわん花みち園','unknown',['run'],'https://wanwanhanamichien.studio.site/','お出かけ候補。所在地、愛犬同伴・ドッグラン利用条件は確認待ち。',true]
];
const dogruns=dogrunRows.map(([name,region,categories,url,note,hold=false],i)=>({id:100+i,name,region,categories,url,note,hold}));
window.oitaDogruns=dogruns;
