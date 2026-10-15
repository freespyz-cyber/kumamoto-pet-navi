const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const html = fs.readFileSync('fukuoka-pet-stay-map.html', 'utf8');
const dist = fs.readFileSync('dist/fukuoka-pet-stay-map.html', 'utf8');
assert.strictEqual(dist, html, 'deployed copy should match the source page');

const match = html.match(/routeButton\.onclick=(\(\)=>\{[\s\S]*?\});<\/script>/);
assert(match, 'route handler should exist in the map page');

function routeFor(selected, origin) {
  let opened = '';
  const handler = vm.runInNewContext(`(${match[1]})`, {
    selected,
    origin,
    URLSearchParams,
    window: {open: url => { opened = url; }}
  });
  handler();
  return new URL(opened);
}

const single = routeFor([['Stay Hakata', '福岡市博多区', 33.583, 130.407]], null);
assert.strictEqual(single.searchParams.get('destination'), 'Stay Hakata 福岡市博多区');
assert.strictEqual(single.searchParams.get('api'), '1');
assert.strictEqual(single.searchParams.get('travelmode'), 'driving');
assert(!single.searchParams.has('origin'));

const multi = routeFor([
  ['Stay Hakata', '福岡市博多区', 33.583, 130.407],
  ['御宿 はなわらび', '〒811-3502 宗像市江口518-1', 33.8523, 130.5139],
  ['風の 八女福島', '〒834-0031 八女市本町西京町204', 33.2089137, 130.5553577]
], null);
assert.strictEqual(multi.searchParams.get('origin'), 'Stay Hakata 福岡市博多区');
assert.strictEqual(multi.searchParams.get('waypoints'), '御宿 はなわらび 〒811-3502 宗像市江口518-1');
assert.strictEqual(multi.searchParams.get('destination'), '風の 八女福島 〒834-0031 八女市本町西京町204');

const fromCurrentLocation = routeFor([
  ['Stay Hakata', '福岡市博多区', 33.583, 130.407],
  ['御宿 はなわらび', '〒811-3502 宗像市江口518-1', 33.8523, 130.5139]
], [33.6, 130.4]);
assert.strictEqual(fromCurrentLocation.searchParams.get('origin'), '33.6,130.4');
assert.strictEqual(fromCurrentLocation.searchParams.get('waypoints'), 'Stay Hakata 福岡市博多区');
assert.strictEqual(fromCurrentLocation.searchParams.get('destination'), '御宿 はなわらび 〒811-3502 宗像市江口518-1');

assert(!html.includes('selected.map(p=>p[2]+","+p[3])'), 'approximate marker coordinates must not become route destinations');
console.log('Fukuoka route checks passed (single, ordered multi-stop, current-location origin).');
