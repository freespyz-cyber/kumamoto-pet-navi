/* Correct the existing Dogcafe BeBe marker from the official access map. */
(() => {
  if (typeof map === 'undefined' || typeof places === 'undefined') return;
  const name = 'Dog Cafe BeBe（ドッグカフェ ベベ）';
  const address = '〒811-4305 福岡県遠賀郡遠賀町松の本1-4-15';
  const lat = 33.8542109;
  const lng = 130.6695511;
  const place = places.find((item) => item[0] === name);
  if (!place) return;
  place[1] = address;
  place[2] = lat;
  place[3] = lng;

  Object.values(map._layers || {}).forEach((layer) => {
    const popup = layer.getPopup?.();
    const html = String(popup?.getContent?.() || '');
    const markerName = (html.match(/<strong>(.*?)<\/strong>/) || [, ''])[1].trim();
    if (markerName !== name) return;
    layer.setLatLng?.([lat, lng]);
    popup.setContent(html.replace(/(<\/strong><br>)[^<]*/, `$1${address}`));
  });
})();
