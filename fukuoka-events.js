/* 福岡イベント：開催期間中だけ地図へ表示し、終了日の翌日に自動で消す。 */
(() => {
  const events = [
    {
      name: 'わんだふるあさくら2026',
      area: '朝倉市・原鶴温泉分水路グラウンド',
      lat: 33.338, lng: 130.780,
      start: '2026-10-10', end: '2026-10-12',
      time: '10:00〜16:00',
      detail: '愛犬と楽しめるドッグフェスタ。ドッグマーケット、フード、キャンプ企画などを予定。',
      tags: ['愛犬同伴イベント', '3日間開催']
    },
    {
      name: '保護犬・保護猫合同譲渡会',
      area: '福岡市中央区・Dog community affetto',
      lat: 33.596, lng: 130.377,
      start: '2026-10-04', end: '2026-10-04',
      time: '12:00〜17:00',
      detail: '保護犬・保護猫が参加する合同譲渡会。当日譲渡はなく、来場者の犬同伴はできません。',
      tags: ['犬猫譲渡会', '室内開催', '犬同伴不可']
    },
    {
      name: '猫たちのための譲渡会',
      area: '福岡市中央区・六本松2丁目',
      lat: 33.577, lng: 130.377,
      start: '2026-10-25', end: '2026-10-25',
      time: '14:00〜17:00（予約不要）',
      detail: '六本松駅近くで開催される保護猫の譲渡会。予約せずに参加できます。',
      tags: ['保護猫譲渡会', '予約不要']
    },
    {
      name: '九州爬虫類フェス2026 Autumn',
      area: '福岡市博多区・マリンメッセ福岡B館',
      lat: 33.607, lng: 130.404,
      start: '2026-10-31', end: '2026-11-01',
      time: '10:00〜17:00（最終日は16:30まで）',
      detail: '爬虫類・両生類の展示・販売、ふれあい企画やトークショーなど。ペットを連れての入場はできません。',
      tags: ['爬虫類・両生類', '展示・販売', 'ペット同伴不可']
    },
    {
      name: '2026動物愛護フェスティバルふくおか',
      area: '福岡市中央区・県営天神中央公園 西中洲エリア',
      lat: 33.590, lng: 130.403,
      start: '2026-11-07', end: '2026-11-07',
      time: '10:45〜15:00',
      detail: '動物愛護トーク、動植物検疫探知犬のステージ、譲渡犬・猫のパネル展示、ペット健康相談、工作・体験コーナー。',
      tags: ['入場無料', '健康相談', '動物愛護']
    },
    {
      name: 'わんにゃんよかイベント',
      area: '福岡市中央区・イオンスタイル笹丘1階 ペテモ横',
      lat: 33.557, lng: 130.381,
      start: '2026-11-08', end: '2026-11-08',
      time: '12:00〜16:00',
      detail: '犬猫のおもちゃ・迷子札づくり、ボランティア団体による犬猫の譲渡相談会など。',
      tags: ['体験イベント', '譲渡相談']
    }
  ];

  const esc = (value) => String(value || '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
  const localDate = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };
  const formatDate = (start, end) => {
    const f = (value) => {
      const [, month, day] = value.split('-');
      return `${Number(month)}月${Number(day)}日`;
    };
    return start === end ? f(start) : `${f(start)}〜${f(end)}`;
  };

  const addEvents = () => {
    if (typeof map === 'undefined' || typeof L === 'undefined') return;
    const today = localDate();
    const registry = window.fukuokaMarkerLayers || (window.fukuokaMarkerLayers = new Set());
    events.filter((event) => today <= event.end).forEach((event) => {
      const html = `<strong>${esc(event.name)}</strong><br><span class="map-area">${esc(event.area)}</span><br><span class="map-category">分類：イベント</span><br><span class="map-feature"><b>開催日</b>　${formatDate(event.start, event.end)}　${esc(event.time)}</span><span class="map-detail">${esc(event.detail)}</span><br>${event.tags.map(tag => `<span class="map-tag">${esc(tag)}</span>`).join('')}<br><button class="map-add-plan">このイベントを予定に追加</button>`;
      const marker = L.circleMarker([event.lat, event.lng], {
        radius: 9, color: '#fff', weight: 2, fillColor: '#d9a441', fillOpacity: .95
      }).addTo(map);
      marker.bindPopup(html);
      registry.add(marker);
    });
    document.querySelector('.fukuoka-filters button.active')?.click();
  };

  setTimeout(addEvents, 1700);
})();
