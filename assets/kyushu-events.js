/* 掲載基準と確認元: EVENT-SOURCES.md。公式開催告知を確認したものだけ追加する。 */
(() => {
  const events = [
    {name:'ASO OVAL DOG FES 2026 AUTUMN',area:'熊本県阿蘇市',venue:'阿蘇ふれあい水辺公園（阿蘇市小里）',start:'2026-10-10',end:'2026-10-11',time:'時間・参加条件は公式案内をご確認ください。',url:'https://asodc.or.jp/archives/event/aso_dogfes_261010'},
    {name:'わんだふるあさくら2026',area:'福岡県朝倉市',venue:'原鶴温泉分水路グラウンド',start:'2026-10-10',end:'2026-10-12',time:'10:00～16:00。料金・参加条件は公式案内をご確認ください。',url:'https://www.wonderful-dogfes.com/asakura'},
    {name:'＆ My Dog ドッグマルシェ門司港 2026 秋',area:'福岡県北九州市',venue:'門司港レトロ親水広場',start:'2026-10-24',end:'2026-10-25',time:'10:30～16:00／入場無料。来場ルールは公式案内をご確認ください。',url:'https://my-dog.me/'},
    {name:'わんこフェス！くまもと2026',area:'熊本県菊池市',venue:'菊池市ふるさと創生市民広場',start:'2026-10-31',end:'2026-11-01',time:'開催時間・参加条件は主催者の公式Instagramをご確認ください。',url:'https://www.instagram.com/wanko_fes/'},
    {name:'どうぶつ愛護フェスティバル in ふくおか',area:'福岡県福岡市中央区',venue:'須崎公園',start:'2026-11-01',end:'2026-11-01',time:'10:30～15:30。ペット同伴条件は公式案内をご確認ください。',url:'https://www.city.fukuoka.lg.jp/hofuku/seikatsueisei/shisei/doubutsuaigo_festival_2026.html'},
    {name:'2026動物愛護フェスティバルふくおか',area:'福岡県福岡市中央区',venue:'県営天神中央公園 西中洲エリア',start:'2026-11-07',end:'2026-11-07',time:'10:45～15:00。ペット同伴条件は公式案内をご確認ください。',url:'https://www.pref.fukuoka.lg.jp/contents/hoeiseipetr9.html'},
    {name:'第6回 OITA DOGGO LAND',area:'大分県大分市',venue:'平和市民公園 催し広場',start:'2026-11-21',end:'2026-11-22',time:'入場無料。開催時間・参加条件は公式案内をご確認ください。',url:'https://oitabuhiland.com/'}
  ];
  window.kyushuEvents = events;
  const escape = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const formatDate = (value) => {
    const [year, month, day] = value.split('-').map(Number);
    return `${year}年${month}月${day}日`;
  };
  const render = () => {
    const main=document.querySelector('main.wrap');
    const section=document.getElementById('kyushu-upcoming-events');
    if(!main || !section) return;
    const today=new Date().toLocaleDateString('sv-SE',{timeZone:'Asia/Tokyo'});
    if(section.dataset.today===today) return;
    section.dataset.today=today;
    const current=events.filter(e=>e.end>=today && /^https:\/\//.test(e.url));
    if(!current.length){section.hidden=true;section.innerHTML='';return;}
    section.hidden=false;
    section.innerHTML='<h2>熊本・福岡・大分の開催予定イベント</h2><p>開催元・自治体・観光協会の公式情報で、開催日と会場を確認したイベントです。ペット同伴条件や変更・中止のお知らせは、来場前に公式リンクでご確認ください。</p>'+current.map(e=>`<article class="card"><div class="meta">${escape(e.area)}｜開催元：公式情報</div><h2>${escape(e.name)}</h2><p>開催日：${formatDate(e.start)}${e.start!==e.end?`～${formatDate(e.end)}`:''}<br>開催会場：${escape(e.venue)}<br>${escape(e.time)}</p><p><a href="${escape(e.url)}" target="_blank" rel="noopener noreferrer">主催者・自治体の公式情報 ↗</a></p></article>`).join('');
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
  window.setInterval(render,60*1000);
})();
