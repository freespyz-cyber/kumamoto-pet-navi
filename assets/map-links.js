/* Shared by all prefecture maps. Keep every researched source, not just one URL. */
(() => {
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  // Keep URLs saved directly on a facility as well as the research registry.
  // Never drop a saved link merely because the registry has no matching name.
  const get = (prefecture, name, saved = []) => {
    const seen = new Set();
    return [...(window.mapSourceLinks?.[prefecture]?.[name] || []), ...saved].map(link => {
      if (typeof link !== 'string') return link;
      const label = /https?:\/\/(?:www\.)?instagram\.com\//i.test(link) ? 'Instagram'
        : /https?:\/\/(?:www\.)?(?:facebook\.com|fb\.com)\//i.test(link) ? 'Facebook'
        : /https?:\/\/(?:www\.)?(?:x\.com|twitter\.com)\//i.test(link) ? 'X'
        : /https?:\/\/(?:page\.line\.me|lin\.ee)\//i.test(link) ? 'LINE' : 'ホームページ';
      return {url: link, label};
    }).filter(link => {
      if (!link || !/^https?:\/\//i.test(link.url || '') || seen.has(link.url)) return false;
      seen.add(link.url);
      return true;
    });
  };
  window.FacilityLinks = {
    get,
    has: (prefecture, name) => get(prefecture, name).some(link => link.official),
    html: (prefecture, name, saved = []) => '<div class="facility-source-links">' + get(prefecture, name, saved).map(link => '<a href="' + esc(link.url) + '" target="_blank" rel="noopener noreferrer">' + esc(link.label) + ' ↗</a>').join('') + '</div>'
  };
  const style = document.createElement('style');
  style.textContent = '.facility-source-links{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}.facility-source-links a{display:inline-block;padding:7px 10px;border:1px solid #cbd8d1;border-radius:7px;background:#fff;color:#234d43;font-size:13px;line-height:1.4;text-decoration:underline;overflow-wrap:anywhere}';
  document.head.appendChild(style);
})();
