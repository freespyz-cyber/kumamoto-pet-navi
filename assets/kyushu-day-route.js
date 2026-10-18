/* Shared Google Maps day-route builder for every Kyushu prefecture map. */
(() => {
  const textFor = (place, prefecture) => {
    if (typeof place === "string") return place;
    const name = place.name || place.title || place[1] || place[0] || "";
    const address = place.address || place.area || place.city || place[2] || "";
    return [name, address, prefecture].filter(Boolean).join(" ");
  };

  const hasVerifiedLocation = (place) => {
    if (Array.isArray(place)) {
      if (place[3] == null || place[4] == null) return false;
      const lat = Number(place[3]);
      const lng = Number(place[4]);
      return Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
    }
    if (place?.lat == null || place?.lng == null) return false;
    if (["unverified", "pending", "unverified-location", "review", "no-public-pin"].includes(place.locationStatus)) return false;
    if (["pending", "unverified", "review"].includes(place.status)) return false;
    const lat = Number(place.lat);
    const lng = Number(place.lng);
    return Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  };

  const coordinatesFor = (place) => hasVerifiedLocation(place)
    ? Array.isArray(place) ? `${Number(place[3])},${Number(place[4])}` : `${Number(place.lat)},${Number(place.lng)}`
    : "";

  const destination = (place, prefecture) =>
    prefecture === "熊本県" ? textFor(place, prefecture) : coordinatesFor(place) || textFor(place, prefecture);

  const buildUrl = (places, options = {}) => {
    const prefecture = options.prefecture || "";
    const stops = places.filter(hasVerifiedLocation).slice(0, 9);
    if (!stops.length) return "";
    const origin = options.origin
      ? Array.isArray(options.origin) ? options.origin.join(",") : options.origin
      : "";
    if (stops.length === 1 && !origin) {
      return "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(textFor(stops[0], prefecture));
    }
    const start = origin || destination(stops[0], prefecture);
    const end = destination(stops.at(-1), prefecture);
    const params = new URLSearchParams({ api: "1", origin: start, destination: end, travelmode: "driving" });
    const waypoints = (origin ? stops.slice(0, -1) : stops.slice(1, -1))
      .map(place => destination(place, prefecture));
    if (waypoints.length) params.set("waypoints", waypoints.join("|"));
    return "https://www.google.com/maps/dir/?" + params.toString();
  };

  const open = (places, options = {}) => {
    const url = buildUrl(places, options);
    if (!url) return false;
    window.open(url, "_blank", "noopener,noreferrer");
    return true;
  };

  window.KyushuDayRoute = Object.freeze({ buildUrl, open, textFor, destination, hasVerifiedLocation, maxStops: 9 });
})();
