/* Shared Kyushu rule: fixed-date events remain visible through their final day in Japan,
   then disappear from map/list data on the following day. Recurring events without an
   explicit end date are retained. */
(() => {
  const todayJST = () => {
    const parts = new Intl.DateTimeFormat('en', {
      timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(new Date());
    const date = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
    return `${date.year}-${date.month}-${date.day}`;
  };

  const isEvent = (item) => {
    if (Array.isArray(item)) return item[0] === 'イベント';
    const categories = item?.cats || item?.categories || [];
    return categories.includes('event') || categories.includes('イベント') ||
      item?.category === 'event' || item?.type === 'event';
  };

  const endDate = (item) => Array.isArray(item)
    ? item[6] || null
    : item?.endDate || item?.end || item?.end_date || null;
  const isExpired = (item) => {
    if (!isEvent(item)) return false;
    const end = endDate(item);
    return Boolean(end && /^\d{4}-\d{2}-\d{2}$/.test(end) && end < todayJST());
  };

  const keep = (items) => items.filter((item) => !isExpired(item));
  window.KyushuEventExpiry = Object.freeze({ todayJST, isEvent, endDate, isExpired, keep });
})();
