/* 福岡病院：詳細ページの内容を先読みし、ピンを押した瞬間から固有情報を表示する。 */
(() => {
  const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));

  const rules = [
    ['犬・猫対応', /犬・猫|犬猫|犬と猫/],
    ['予防接種', /予防接種|ワクチン|フィラリア/],
    ['駐車場あり', /駐車場[^。\n]{0,24}|駐車場完備/],
    ['トリミング', /トリミング/],
    ['ペットホテル', /ペットホテル|ホテル室/],
    ['健康診断', /健康診断|ペットドック|定期健診/],
    ['歯科', /歯科|デンタル/],
    ['夜間相談', /夜間/],
    ['エキゾチック対応', /うさぎ|ハムスター|フェレット|鳥類|小動物/]
  ];

  const featureRules = [
    ['4D CT', /4D\s*CT/i],
    ['CT検査', /CT室|CT検査|CTを含む/i],
    ['レーザー治療', /レーザー治療/],
    ['救急医療', /救急医療|夜間救急/],
    ['専門外来', /専門外来|専門医療|専門医/],
    ['リハビリ', /リハビリテーション|リハビリセンター/],
    ['漢方治療', /漢方医学|漢方治療/],
    ['ドッグラン併設', /ドッグラン/],
    ['猫にやさしい診療', /猫にやさしい|猫専用待合/],
    ['歯科診療', /歯科診療|デンタルケア/],
    ['往診', /往診/],
    ['日曜・祝日診療', /日曜・祝日[^。\n]{0,18}診療|日祝診療/],
    ['WEB予約', /WEB予約|Web予約|オンライン予約/]
  ];

  // file:// で直接開いた場合も同じ情報を出せるよう、地図表示用の確認済み要約を同梱する。
  const fallbackDetails = {
    '吉塚ペットクリニック': ['犬・猫に加えて小鳥・うさぎ・フェレットなどを診療する総合的なペットクリニックです。', ['Web順番予約', '手術対応'], ['犬・猫対応', '予防接種', '駐車場あり', 'エキゾチック対応']],
    '動物医療センター春日': ['竹下病院と連携し、検査・手術・入院から予約制リハビリまで案内しています。', ['リハビリセンター', '特殊検査'], ['犬・猫対応', '歯科']],
    'ちひろ動物病院': ['通常診療・予防接種・ペットドックを通して、成長と日々の健康管理を支えます。', ['ペットドック'], ['犬・猫対応', '予防接種', '健康診断', 'エキゾチック対応']],
    '福岡動物医療センター': ['犬・猫専門。一般診療・予防・検査に加え、福岡夜間救急動物病院との連携があります。', ['夜間救急連携'], ['犬・猫対応', '駐車場あり', '夜間相談']],
    'ひより動物病院': ['福岡市動植物園正門前。生涯のかかりつけ病院として、やさしく丁寧な診療を掲げています。', ['医療・設備案内'], ['犬・猫対応']],
    'みなとおおほり動物病院': ['猫にやさしい診療とチーム医療を掲げ、臨床検査や手術・麻酔前検査にも対応します。', ['猫にやさしい診療', '手術・麻酔前検査'], ['犬・猫対応']],
    '金堂動物病院': ['治療方法や費用を相談しながら進める地域の病院。ホテル・トリミングも案内しています。', ['往診'], ['犬・猫対応', '駐車場あり', 'トリミング', 'ペットホテル', 'エキゾチック対応']],
    '松原動物病院': ['長丘・小笹・長尾エリアのホームドクターとして、予防と健康診断を案内しています。', ['地域のホームドクター'], ['犬・猫対応', '予防接種', '健康診断']],
    '清水動物病院': ['医療面だけでなく、飼い主さんとペットのより良い関係づくりを支える病院です。', ['生活・健康相談'], ['犬・猫対応', '駐車場あり']],
    'たかみや動物病院': ['皮膚科・腎臓病治療・健康診断を案内。高宮駅・平尾駅から徒歩8分です。', ['皮膚科', '腎臓病治療', 'WEB予約'], ['犬・猫対応', '駐車場あり', '健康診断']],
    '野添動物病院': ['犬・猫の目線に近い診療を心がけ、病院併設のホテルとトリミングも案内しています。', ['病院併設ケア'], ['犬・猫対応', '駐車場あり', 'トリミング', 'ペットホテル']],
    '若宮動物病院': ['予防から救急まで幅広く、犬猫のほかウサギ・フェレットの相談にも対応します。', ['救急医療', '歯科診療'], ['犬・猫対応', '予防接種', 'トリミング', 'ペットホテル', '健康診断', 'エキゾチック対応']],
    '有田動物病院': ['犬・猫の生涯を通じた健康を支え、治療・予防・歯科・ホテルを案内しています。', ['往診', '歯科診療'], ['犬・猫対応', '予防接種', 'ペットホテル', '健康診断']],
    '山本動物病院': ['犬・猫の診療に加え、予約制のペット美容とペットホテルを案内しています。', ['ペット美容'], ['犬・猫対応', '予防接種', 'ペットホテル']],
    '宇賀ペットクリニック': ['犬・猫の日常診療と予防、健康管理、トリミングを案内しています。', ['時間外相談'], ['犬・猫対応', '予防接種', 'トリミング']],
    'うりゅう動物病院': ['予防・健康診断・外科手術・シニアサポートまで幅広く案内しています。', ['外科手術', 'シニアサポート'], ['予防接種', 'トリミング', 'ペットホテル', '健康診断']],
    '今林動物ケアクリニック': ['幅広い小動物に対応し、難治性疾患では専門医療機関との連携も案内しています。', ['4D CT', '専門医療連携'], ['犬・猫対応', '予防接種', '駐車場あり', 'トリミング', 'ペットホテル', '健康診断', 'エキゾチック対応']],
    '医 生ヶ丘動物病院': ['西洋医学に加えて漢方治療を取り入れ、ホテル・トリミング・ドッグランも併設しています。', ['漢方治療', 'ドッグラン併設'], ['予防接種', '駐車場あり', 'トリミング', 'ペットホテル']],
    '森どうぶつ病院': ['一般診療から歯科、予防、手術、レーザー治療まで案内しています。', ['レーザー治療', '歯科診療'], ['犬・猫対応', '駐車場あり', 'トリミング', 'ペットホテル', '健康診断']],
    'たなかペットクリニック': ['犬・猫・うさぎ・げっ歯類に対応し、日常診療・予防・管理預かりを案内しています。', ['うさぎ・げっ歯類対応'], ['犬・猫対応', '予防接種', 'エキゾチック対応']],
    'かんもん動物病院': ['予防・手術・歯科・往診から、ホテルとシャンプー・トリミングまで案内しています。', ['往診', '歯科診療'], ['犬・猫対応', '予防接種', 'トリミング', 'ペットホテル', '健康診断', 'エキゾチック対応']]
  };

  const tagsFrom = (text) => rules
    .filter(([, pattern]) => pattern.test(text))
    .map(([label]) => label);

  const featuresFrom = (text) => {
    const features = featureRules
      .filter(([, pattern]) => pattern.test(text))
      .map(([label]) => label);
    return features.includes('4D CT') ? features.filter((label) => label !== 'CT検査') : features;
  };

  const setPopupDetails = (popup, href, summary, features, tags) => {
    const featureHtml = features.length
      ? `<span class="map-feature"><b>特徴・設備</b>　${features.map(escapeHtml).join('・')}</span>`
      : '';
    const tagHtml = tags
      .map((tag) => `<span class="map-tag">${escapeHtml(tag)}</span>`)
      .join('');
    const original = String(popup.getContent?.() || '');
    const buttonMarker = '<br><button class="map-add-plan">';
    const cleaned = original
      .replace(/<span class="map-tag">診療情報あり<\/span>\s*/g, '')
      .replace(/<span class="map-tag">来院前確認<\/span>\s*/g, '')
      .replace(/<br><span class="map-feature">.*?<\/span>/g, '')
      .replace(/<span class="map-detail">.*?<\/span><br>/g, '')
      .replace(/<br><a class="map-detail-link"[^>]*>.*?<\/a>/g, '');
    const detail = `<br>${featureHtml}<span class="map-detail">${escapeHtml(summary)}</span><br>${tagHtml}<br><a class="map-detail-link" href="${escapeHtml(href)}">病院の詳細・公式情報を見る →</a>`;
    popup.setContent(cleaned.replace(buttonMarker, `${detail}${buttonMarker}`));
  };

  const enrichMarker = async (marker, name, href) => {
    const popup = marker.getPopup?.();
    if (!popup || popup.__fukuokaHospitalEnriched) return;
    popup.__fukuokaHospitalEnriched = true;
    const fallback = fallbackDetails[name];
    if (fallback) setPopupDetails(popup, href, fallback[0], fallback[1], fallback[2]);
    try {
      const response = await fetch(href, { credentials: 'same-origin' });
      if (!response.ok) throw new Error(String(response.status));
      const source = await response.text();
      const documentHtml = new DOMParser().parseFromString(source, 'text/html');
      const text = documentHtml.body.textContent || '';
      const summary = documentHtml.querySelector('main.wrap > p')?.textContent?.trim() || '';
      const features = [...new Set(featuresFrom(text))];
      const tags = [...new Set(tagsFrom(text))];
      setPopupDetails(popup, href, summary, features.length ? features : fallback?.[1] || [], tags.length ? tags : fallback?.[2] || []);
    } catch (_) {
      // file:// や通信失敗時は、先に設定した同梱データをそのまま使う。
    }
  };

  const preload = () => {
    if (typeof map === 'undefined' || typeof hospitals === 'undefined') return;
    const markers = [...(window.fukuokaMarkerLayers || [])];
    hospitals.forEach((hospital) => {
      const marker = markers.find((item) => {
        const html = String(item.getPopup?.()?.getContent?.() || '');
        return html.includes(`<strong>${hospital[0]}</strong>`) && html.includes('分類：病院');
      });
      if (marker) enrichMarker(marker, hospital[0], hospital[4]);
    });
    const yoshizuka = markers.find((item) => {
      const html = String(item.getPopup?.()?.getContent?.() || '');
      return html.includes('<strong>吉塚ペットクリニック</strong>') && html.includes('分類：病院');
    });
    if (yoshizuka) enrichMarker(yoshizuka, '吉塚ペットクリニック', 'https://yoshizuka-petclinic.com/');
  };

  preload();
  setTimeout(preload, 1600);
})();
