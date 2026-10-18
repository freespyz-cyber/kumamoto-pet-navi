/* Render saved facility-specific information, not generic medical claims. */
(() => {
  const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  window.kumamotoPopupHTML = p => {
    let tags = typeof verifiedTags === 'function' ? verifiedTags(p) : [];
    let summary = tags.length ? '登録済みの案内：' + tags.join('・') + '。対応条件・最新の診療内容は施設へご確認ください。' : '詳細な対応条件は、下記のホームページ・SNSでご確認ください。';
    if (p[1] === '大津どうぶつ医療センター') {
      tags = ['CT検査','MRI検査','整形外科','脳神経外科','腫瘍外科','腹腔鏡手術','眼科','予防医療'];
      summary = '一般外来・予防医療に加え、CT・MRIによる画像診断や各種外科手術を案内しています。予約外来もあり、急患が優先されます。';
    }
    const features=tags.filter(t=>/CT|MRI|内視鏡|エコー|レーザー|外科|眼科|循環器|入院|酸素|専門/.test(t));
    return '<strong>'+esc(p[1])+'</strong><p>'+esc(p[2])+'</p><div>分類：'+esc(p[0])+'</div>'+FacilityLinks.html('kumamoto',p[1],p.slice(5))+
      '<div class="verified-facility-tags">'+tags.map(t=>'<span class="map-tag">'+esc(t)+'</span>').join(' ')+'</div>'+
      (features.length?'<p class="map-feature"><b>特徴・設備</b> '+features.map(esc).join('・')+'</p>':'')+
      '<p class="map-detail">'+esc(summary)+'</p>';
  };
  const oldRender=render;
  render=type=>{
    oldRender(type);
    const rows=visiblePlaces();
    markers.forEach((marker,i)=>marker.setPopupContent(window.kumamotoPopupHTML(rows[i])));
    list.innerHTML=rows.map(p=>'<article class="map-list-detail">'+window.kumamotoPopupHTML(p)+'</article>').join('')||'該当する施設がありません。';
  };
  render(activeType);
})();
