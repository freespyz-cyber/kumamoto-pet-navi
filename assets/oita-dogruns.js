// Supplied screenshots are evidence of candidates, not confirmation of current operation.
const dogrunRows = [
 ['別府市ドッグラン','beppu',['run'],'https://www.city.beppu.oita.jp/sisetu/kouen_tyuusyajyou/03kouen_03-07dogrun.html','別府市小倉町979番1。公式確認：登録制、大型犬・小型犬・フリーエリア。'],
 ['リバーパーク犬飼','bungo',['run'],'https://rinukai.com/about/','公式確認：愛犬同伴専用のドッグランサイトはキャンプ利用区画。一般向け単独ドッグランとしては案内せず、宿泊・サイト利用条件を公式で確認。'],
 ['森のドッグラン 枝瑠風（エルフ）','yufu',['run'],'https://www.instagram.com/dogrun_elf/','掲載除外：2026年10月の営業日と営業時間は公式Instagramで確認できたが、住所・料金・利用条件・正確な位置が不明のため施設一覧から非表示。',true,true],
 ['森カフェ ワン・LOVE','oita',['run','food'],'https://www.instagram.com/moricafewan.love/','画像記載：大分市大字葛木1069。ドッグラン・ドッグカフェ。最新条件は要確認。'],
 ['CAFE HAL（カフェハル）','hiji',['run','food'],'https://www.oita-kosodate.jp/shops/detail/1d208cb6-f065-4cf9-ae8e-5f41a1bb1df3','日出町藤原2304-1。大分県公式ポータル掲載：営業時間10:00〜17:00、木曜・第1/3/5水曜休、店内犬同伴可・ドッグラン併設。最新営業は来店前に公式SNS等で確認。'],
 ['rionu（リオーヌ）','hiji',['run','food'],'https://www.instagram.com/rionu.2025/','画像記載：日出町豊岡473番地1。小型犬専用ドッグラン・カフェ・ケアサロン。最新営業日は要確認。'],
 ['アニコム ウェルネス ドッグラン','oita',['run'],'https://oita-aigo.com/dogrun/','大分市大字廻栖野3231番地47。公式確認：登録制、大型犬／中小型犬／貸切ゾーン。鑑札・狂犬病予防注射済票の装着が必要。'],
 ['湯布院ドッグラン グリーンフィールド','yufu',['run','food'],'https://yufuin-dogrun.com/','公式確認：天然芝ドッグラン・カフェ併設。不定休のため公式カレンダーを確認。'],
 ['ドッグラン＆カフェ blue mountain','saiki',['run','food'],'https://www.blue-mountain2022.com/','公式確認：住所は佐伯市大字青山5402番地。営業は土・日・月を中心とした不定期で、月ごとの日程は公式Instagramで告知。利用料は1頭600円。初回は1年以内の狂犬病・混合ワクチン証明と利用同意書が必要。2回目以降はノースタッフデー利用可（名簿記入・料金支払い）。公式位置座標は未確認のため地域表示。'],
 ['別府湾サービスエリア','beppu',['run'],'https://www.w-holdings.co.jp/sapa/26060/facility/','別府市内竈3677-43-1。NEXCO西日本公式下り施設案内でドッグランを確認。利用時間は日の出〜日没、照明なし。上下線・一般道からのアクセス条件は利用前に公式案内で確認。'],
 ['おおがファーム','hiji',['food'],'https://www.ogafarm.com/','公式案内：園内は犬同伴可、カフェはテラス席利用可。ドッグランは公式アクセス案内で「しばらくお休み」とされているため、再開確認までドッグラン施設としては案内しません。リード着用・排泄物処理などのマナーを遵守。'],
 ['SORAcafe','usa',['run','food','boarding'],'https://www.facebook.com/dogcafesora/','画像記載：宇佐市大字別府561-1。ドッグカフェ・ドッグラン・トリミング。預かり条件は要確認。'],
 ['ドッグカフェ KURU・SAN','beppu',['food'],'https://www.instagram.com/dogcafe_kuru.san/','画像記載：別府市火売6組3。別府市営ドッグラン近くのカフェ。ドッグラン併設とは扱いません。'],
 ['春夏秋冬','saiki',['run','boarding'],'https://dogrun-harunatsuakihuyu0811.jimdosite.com/','公式確認：佐伯市宇目大平1944番地1。ドッグラン・老犬介護・ペットホテル。予約・利用条件は要確認。'],
 ['わんわん花みち園','unknown',['run'],'https://wanwanhanamichien.studio.site/','掲載除外記録：ユーザー提供のInstagram画面で「閉園」と表示されているため、ドッグラン・施設一覧に表示しない。',true,true],
 ['くじゅう花公園','taketa',['run'],'https://kuju-flower-park.com/faq/','公式FAQでペット同伴入園可を確認。リード必須、排泄物持ち帰り・尿は水で流す、園内ショップ入店不可。ドッグラン併設とは案内せず、園内ルールと季節営業を公式サイトで確認。']
];
const dogruns=dogrunRows.map(([name,region,categories,url,note,hold=false,excluded=false],i)=>({id:100+i,name,region,categories,url,note,hold,excluded}));
window.oitaDogruns=dogruns;
