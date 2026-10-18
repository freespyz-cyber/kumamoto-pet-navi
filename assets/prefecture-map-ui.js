/* Shared Kumamoto-reference layout for the existing prefectural facility maps. */
(() => {
  const page = location.pathname.split('/').pop();
  const prefectures = {
    'pet-facility-map.html': '熊本',
    'fukuoka-pet-stay-map.html': '福岡',
    'oita-pet-map.html': '大分',
    'okinawa-pet-map.html': '沖縄'
  };
  const prefecture = prefectures[page];
  if (!prefecture) return;

  const init = () => {
    const main = document.querySelector('main.wrap, main');
    const map = document.getElementById('map');
    const categories = document.querySelector('.filters, .fukuoka-filters, nav[aria-label*="カテゴリ"]');
    if (!main || !map || !categories || main.dataset.prefectureMapUi) return;
    main.dataset.prefectureMapUi = 'ready';

    if (!document.getElementById('prefecture-map-ui-style')) {
      const style = document.createElement('style');
      style.id = 'prefecture-map-ui-style';
      style.textContent = `
        main.wrap h1 br{display:none}
        main.wrap h1{font-size:clamp(28px,4.8vw,48px)}
        .qta-guide{display:flex;align-items:center;gap:20px;min-height:170px;margin:20px 0 14px;padding:14px 22px;background:#fffdf9;border:1px solid #e2ddd4;border-radius:16px;box-shadow:0 5px 18px rgba(40,50,45,.04)}
        .qta-guide img{display:block;width:184px;height:auto;max-height:164px;object-fit:contain;flex:none}
        .qta-guide-copy{min-width:0;flex:1}
        .qta-guide-title{margin:0 0 12px;color:#234d43;font-size:clamp(17px,2vw,23px);font-weight:900;line-height:1.45}
        .qta-guide-name{display:inline-block;margin-right:6px;padding:2px 11px;border-radius:999px;background:#e87953;color:#fff;white-space:nowrap}
        .qta-guide-role{color:#718078;font-size:.9em}
        .qta-guide-steps{display:flex;align-items:center;flex-wrap:wrap;gap:8px 18px;margin:0;padding:0;list-style:none;color:#52655c;font-size:14px;font-weight:800}
        .qta-guide-steps li{display:flex;align-items:center;gap:7px}
        .qta-guide-steps b{display:inline-grid;place-items:center;width:24px;height:24px;border-radius:50%;background:#e4efe9;color:#234d43;font-size:13px;flex:none}
        .prefecture-category-frame{margin:14px 0 12px;padding:12px 14px 14px;background:#fffdf9;border:1px solid #e2ddd4;border-radius:16px;box-shadow:0 5px 18px rgba(40,50,45,.04)}
        .prefecture-category-frame h2{margin:0 0 8px;color:#234d43;font-size:18px;line-height:1.4}
        .prefecture-category-frame .search-box{margin:0 0 10px}
        .prefecture-category-frame .filters,.prefecture-category-frame nav{margin:0;padding:0;border:0;background:transparent;box-shadow:none}
        .prefecture-category-frame button{min-height:40px}
        .prefecture-status-filter{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:8px;color:#718078;font-size:14px;font-weight:700}
        .prefecture-status-filter select{min-width:180px}
        .prefecture-route-panel{margin:14px 0 18px;padding:0!important;background:transparent;border:0;border-radius:0;box-shadow:none}
        .prefecture-route-panel h2,.prefecture-route-panel>p:not(#trip-list):not([role="status"]){display:none}
        .prefecture-route-panel #trip-list,.prefecture-route-panel #plan-list{margin:10px 0 0;padding:12px 16px;background:#fffdf9;border-radius:12px;line-height:1.7}
        .prefecture-route-panel button{margin:0 8px 0 0}
        @media(max-width:700px){.qta-guide{gap:12px;min-height:132px;margin:16px 0 12px;padding:12px}.qta-guide img{width:112px;max-height:124px}.qta-guide-title{font-size:16px;margin-bottom:8px}.qta-guide-steps{display:grid;gap:5px;font-size:13px}.qta-guide-steps b{width:21px;height:21px}.prefecture-category-frame{padding:10px}.prefecture-route-panel button{margin:5px 5px 5px 0}.prefecture-route-panel #trip-list,.prefecture-route-panel #plan-list{padding:10px 12px}}
        @media(max-width:390px){.qta-guide img{width:88px}.qta-guide{gap:8px}.qta-guide-title{font-size:14px}}
      `;
      document.head.appendChild(style);
    }

    const guide = document.createElement('aside');
    guide.className = 'qta-guide';
    guide.setAttribute('aria-label', 'チワワのきゅう太が使い方を案内');
    guide.innerHTML = `<img src="assets/kumamoto-pet-navi-chihuahua-mascot.png" alt="チワワのきゅう太" width="384" height="285">
      <div class="qta-guide-copy"><p class="qta-guide-title"><span class="qta-guide-name">きゅう太</span><span class="qta-guide-role">チワワの案内役</span>が使い方を案内するよ！</p>
      <ol class="qta-guide-steps"><li><b>1</b>カテゴリーを選ぶ</li><li><b>2</b>地図のピンで施設情報を見る</li><li><b>3</b>「この場所を予定に追加」を押して、Googleマップでルートを確認しよう！</li></ol></div>`;

    const frame = document.createElement('section');
    frame.className = 'prefecture-category-frame';
    const heading = document.createElement('h2');
    heading.textContent = 'カテゴリーから探す';
    heading.id = 'prefecture-category-heading';
    frame.setAttribute('aria-labelledby', heading.id);
    frame.append(heading);
    const search = main.querySelector('.search-box');
    if (search) frame.append(search);
    categories.setAttribute('aria-label', 'カテゴリーから探す');
    categories.replaceWith(frame);
    frame.append(categories);
    frame.before(guide);

    const status = document.querySelector('#status, select[aria-label*="確認状況"]');
    if (status && !frame.contains(status)) {
      const label = document.createElement('label');
      label.className = 'prefecture-status-filter';
      label.append(document.createTextNode('掲載状況 '), status);
      frame.append(label);
    }

    const routePanel = document.querySelector('.trip-box, #trip, .plan');
    if (routePanel) {
      routePanel.classList.add('prefecture-route-panel');
      map.parentNode.insertBefore(routePanel, map);
    } else {
      const ids = ['use-location', 'clear-trip', 'open-route'];
      const controls = ids.map(id => document.getElementById(id));
      const list = document.getElementById('trip-list');
      if (list && controls.every(Boolean)) {
        const panel = document.createElement('section');
        panel.className = 'prefecture-route-panel';
        panel.setAttribute('aria-label', 'おでかけ予定');
        controls[0].parentNode && controls[0].parentNode !== main
          ? panel.append(controls[0].parentNode)
          : panel.append(...controls);
        if (!panel.contains(list)) panel.append(list);
        map.parentNode.insertBefore(panel, map);
      }
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
