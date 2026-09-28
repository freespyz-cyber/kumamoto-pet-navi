/* Google Maps URLs: mobile browsers support at most three intermediate stops. */
window.MapRouteURL = function(stops, origin) {
  if (!stops.length) return null;
  if (stops.length > 4) throw new Error('スマートフォン対応のため、予定は4施設までです。');
  const params = new URLSearchParams({api:'1', destination:stops[stops.length-1], travelmode:'driving'});
  if (origin) params.set('origin', Array.isArray(origin) ? origin.join(',') : origin);
  else if (stops.length > 1) params.set('origin', stops[0]);
  const intermediate = stops.slice(origin ? 0 : 1, -1);
  if (intermediate.length) params.set('waypoints', intermediate.join('|'));
  return 'https://www.google.com/maps/dir/?' + params;
};
