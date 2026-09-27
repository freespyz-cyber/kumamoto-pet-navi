/* Shared by all prefecture maps. Keep every researched source, not just one URL. */
(() => {
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const get = (prefecture, name) => (window.mapSourceLinks?.[prefecture]?.[name] || []).filter(link => /^https?:\/\//i.test(link.url));
  window.FacilityLinks = {
    get,
    has: (prefecture, name) => get(prefecture, name).some(link => link.official),
    html: (prefecture, name) => '<div class="facility-source-links">' + get(prefecture, name).map(link => '<a href="' + esc(link.url) + '" target="_blank" rel="noopener noreferrer">' + esc(link.label) + ' ↗</a>').join('') + '</div>'
  };
  const style = document.createElement('style');
  style.textContent = '.facility-source-links{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}.facility-source-links a{display:inline-block;padding:7px 10px;border:1px solid #cbd8d1;border-radius:7px;background:#fff;color:#234d43;font-size:13px;line-height:1.4;text-decoration:underline;overflow-wrap:anywhere}';
  document.head.appendChild(style);
})();
