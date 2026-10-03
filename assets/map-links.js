/* Shared by all prefecture maps. Prefer one canonical website and retain social links. */
(() => {
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const get = (prefecture, name, saved = []) => {
    const seen = new Set();
    return [...(window.mapSourceLinks?.[prefecture]?.[name] || []), ...saved].map(link => {
      if (typeof link !== 'string') return link;
      const label = /instagram\.com\//i.test(link) ? 'Instagram' : /(?:facebook\.com|fb\.com)\//i.test(link) ? 'Facebook' : /(?:x\.com|twitter\.com)\//i.test(link) ? 'X' : 'ホームページ';
      return {url: link, label};
    }).filter(link => {
      if (!link || link.official === false || !/^https?:\/\//i.test(link.url || '') || seen.has(link.url)) return false;
      seen.add(link.url); return true;
    }).filter((link, _, links) => {
      if (link.label !== 'ホームページ') return true;
      return links.find(candidate => candidate.label === 'ホームページ') === link;
    });
  };
  window.FacilityLinks = {
    get,
    has: (prefecture, name, saved = []) => get(prefecture, name, saved).length > 0,
    html: (prefecture, name, saved = []) => '<div class="facility-source-links">' + get(prefecture, name, saved).map(link => '<a href="' + esc(link.url) + '" target="_blank" rel="noopener noreferrer">' + esc(link.label) + ' ↗</a>').join('') + '</div>'
  };
  const style = document.createElement('style');
  style.textContent = '.facility-source-links{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}.facility-source-links a{display:inline-block;padding:7px 10px;border:1px solid #cbd8d1;border-radius:7px;background:#fff;color:#234d43;font-size:13px;line-height:1.4;text-decoration:underline;overflow-wrap:anywhere}';
  document.head.appendChild(style);
})();
