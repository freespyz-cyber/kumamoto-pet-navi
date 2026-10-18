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
 ['くじゅう花公園','taketa',['run','food'],'https://kuju-flower-park.com/park-info/','公式施設案内で無料ドッグラン、公式FAQでペット同伴入園可を確認。リード必須、排泄物持ち帰り・尿は水で流す、園内ショップ入店不可。飲食店はテラス席で同伴できる場合あり。営業期間・利用条件は公式サイトで確認。'],
 ['花とカフェ goodblue','kokonoe',['run','food'],'https://good-blue.com/','九重町田野1672-18。施設公式サイトおよび隣接する「くじゅう野の花の郷」公式ページ、大分県観光公式で犬同伴カフェとドッグラン併設を確認。営業時間・営業日・利用条件は変更の可能性があるため訪問前に公式情報を確認。施設個別の地図位置は未照合のためピンなし。'],
 ['ペットホテル LUMA','oita',['boarding'],'https://luma-pet.com/','大分市東津留1丁目1-21。施設公式情報で犬・猫の預かり、獣医師・動物看護師による健康確認、専用室での滞在を確認。持病・投薬対応は事前相談。尾石動物病院併設で同一住所の施設位置を照合済み。'],
 ['ドックカールトン 森町店','oita',['boarding'],'https://www.dockcarlton.jp/','大分市大字森401-1。公式サイトでペットホテル、専用ドッグラン、散歩付きの預かりを確認。所在地は公式住所で確認済み、施設個別の地図地点は未照合のためピンなし。予約・受渡し時間は公式案内を確認。'],
 ['ドックカールトン 大分中央店','oita',['boarding'],'https://www.dockcarlton.jp/','大分市三芳623-5。公式サイトでペットホテルを案内。所在地は公式住所で確認済み、施設個別の地図地点は未照合のためピンなし。予約・受渡し時間は公式案内を確認。'],
 ['LOOP ONE（ペットホテル）','usa',['boarding'],'https://www.loopone.jp/grooming_hotel','宇佐市辛島49-2。公式サイトで犬のペットホテルと一時預かり、サイズ別料金、年中無休を確認。所在地は公式住所で確認済み、施設個別の地図地点は未照合のためピンなし。'],
 ['ブリックWAN（ペットホテル）','oita',['boarding'],'https://brickwan.com/hotel/','大分市野津原890-6。公式サイトで犬・猫のホテル、個室、冷暖房、散歩、サイズ別料金を確認。所在地は公式住所で確認済み、施設個別の地図地点は未照合のためピンなし。'],
 ['Pet Hotel 1（ペットホテルワン）','beppu',['boarding'],'https://ph-1.jp/hotel/','別府市小倉町62-8。公式発表による住所表記変更（令和7年1月11日）で、旧住所「鶴見1413-6（小倉5組1）」からの表記変更と確認。場所・建物・サービスに変更なし。施設名付き公式Googleマップの位置をピンに使用。'],
 ['ONE’S COOL（ワンズクール）','beppu',['boarding'],'https://www.onescool.com/doghotel','別府市石垣西5丁目1-35。公式サイトでドッグホテル・一時預かり、完全個室、予約条件を確認。保管業登録（大分県第310054号、有効期限令和13年3月21日）を掲載。施設個別の地図地点は未照合のためピンなし。'],
 ['ペットホテル ワンラブ ゆめタウン別府店','beppu',['boarding'],'https://www.pet-onelove.com/iphones/hotel/page231.php','別府市楠町382-7 ゆめタウン別府2階。運営会社公式ページで宿泊・買物中の一時預かり、営業時間10:00〜21:00、年中無休を確認。施設個別の地図位置は未照合のためピンなし。'],
 ['ペットと泊まれる宿 Ugo（宿泊者向け預かり）','beppu',['boarding'],'https://www.ugo.land/dog-hotel','別府市明礬5-2。施設公式案内で宿泊者向けの預かりサービスを確認。宿泊中は無料、チェックイン前後は有料・要事前予約。宿泊者以外の一般預かりとは案内しない。施設個別の地図位置は未照合のためピンなし。']
];
// Keep IDs stable when rows are reordered or new candidates are inserted; the
// location overlay is keyed by these IDs.
const dogrunIds={'別府市ドッグラン':100,'リバーパーク犬飼':101,'森のドッグラン 枝瑠風（エルフ）':102,'森カフェ ワン・LOVE':103,'CAFE HAL（カフェハル）':104,'rionu（リオーヌ）':105,'アニコム ウェルネス ドッグラン':106,'湯布院ドッグラン グリーンフィールド':107,'ドッグラン＆カフェ blue mountain':108,'別府湾サービスエリア':109,'おおがファーム':110,'SORAcafe':111,'ドッグカフェ KURU・SAN':112,'春夏秋冬':113,'わんわん花みち園':114,'くじゅう花公園':115,'花とカフェ goodblue':116,'ペットホテル LUMA':117,'ドックカールトン 森町店':118,'ドックカールトン 大分中央店':119,'LOOP ONE（ペットホテル）':120,'ブリックWAN（ペットホテル）':121,'Pet Hotel 1（ペットホテルワン）':122,'ONE’S COOL（ワンズクール）':123,'ペットホテル ワンラブ ゆめタウン別府店':124,'ペットと泊まれる宿 Ugo（宿泊者向け預かり）':125};
const dogruns=dogrunRows.map(([name,region,categories,url,note,hold=false,excluded=false],i)=>({id:dogrunIds[name]??1000+i,name,region,categories,url,note,hold,excluded}));
window.oitaDogruns=dogruns;
