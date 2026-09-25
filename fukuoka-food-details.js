/* 福岡の食事施設：確認済み情報だけを各ピンへ表示する。 */
(() => {
  if (typeof map === 'undefined') return;
  const details = {
    'cafe Lanai（カフェ ラナイ）': ['海を目の前にしたリゾートカフェ', 'テラス席で犬同伴OK', 'パンケーキが人気', '11:30〜20:00', '駐車場あり'],
    'カフェドボッコ（cafe de BoCCo）': ['海を目の前にしたカフェ', 'テラス席で犬同伴OK', 'パスタランチは夜も注文可能'],
    '草の家': ['自然に囲まれた落ち着いたカフェ', 'テラス席で犬同伴可', '太宰府エリア'],
    'café OFF COURSE（カフェオフコース）': ['自然に囲まれたカフェ', 'テラス席で犬同伴OK', 'ドッグラン・トリミングルーム併設', '11:00〜22:00', '駐車場あり'],
    'カフェ プリリネ': ['店内犬同伴OK', '小型犬向けドッグランあり', 'しつけ教室・小型犬向けサービス'],
    'アッカントエッフェ': ['糸島エリア', '自家栽培野菜を使った料理', 'イタリア料理・ワイン', 'テラス席で犬同伴可']
  };
  const esc = (value) => String(value).replace(/[&<>"']/g, (ch) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
  Object.values(map._layers || {}).forEach((marker) => {
    const popup = marker.getPopup?.();
    const html = String(popup?.getContent?.() || '');
    if (!popup || !html.includes('分類：食事')) return;
    const name = (html.match(/<strong>(.*?)<\/strong>/) || [, ''])[1];
    const items = details[name];
    if (!items || popup.__foodEnriched) return;
    popup.__foodEnriched = true;
    const tags = items.map((item) => `<span class="map-tag">${esc(item)}</span>`).join('');
    popup.setContent(html.replace('※ペット同伴条件は来店前に公式情報をご確認ください。', `${tags}<br>※営業状況・同伴条件は来店前に公式情報をご確認ください。`));
  });
})();
