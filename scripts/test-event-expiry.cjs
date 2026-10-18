const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const dateAt = (iso) => class extends Date {
  constructor(...args) { super(...(args.length ? args : [iso])); }
};

function testEventListExpiry() {
  let now = '2026-11-02T12:00:00+09:00';
  let tick;
  const section = { dataset: {}, hidden: false, innerHTML: '' };
  const context = {
    Date: dateAt(now),
    document: {
      readyState: 'complete',
      querySelector: () => ({}),
      getElementById: () => section
    },
    window: { setInterval: (callback) => { tick = callback; } }
  };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/kyushu-events.js'), 'utf8'), context);
  assert.equal((section.innerHTML.match(/<article class="card">/g) || []).length, 2);
  assert.match(section.innerHTML, /2026動物愛護フェスティバルふくおか/);
  assert.match(section.innerHTML, /第6回 OITA DOGGO LAND/);
  assert.match(section.innerHTML, /開催元：公式情報/);
  assert.doesNotMatch(section.innerHTML, /公式情報確認：2026年10月10日/);
  assert.doesNotMatch(section.innerHTML, /わんこフェス！くまもと2026/);

  now = '2026-11-22T12:00:00+09:00';
  context.Date = dateAt(now);
  tick();
  assert.equal((section.innerHTML.match(/<article class="card">/g) || []).length, 1);
  assert.match(section.innerHTML, /第6回 OITA DOGGO LAND/);

  now = '2026-11-23T00:01:00+09:00';
  context.Date = dateAt(now);
  tick();
  assert.equal(section.hidden, true);
  assert.equal(section.innerHTML, '');
}

function testFukuokaMapExpiry() {
  let now = '2026-11-07T12:00:00+09:00';
  const timeouts = new Map();
  let tick;
  const map = {
    layers: new Set(),
    removeLayer(marker) { this.layers.delete(marker); }
  };
  const context = {
    Date: dateAt(now),
    map,
    L: {
      circleMarker() {
        return {
          addTo(target) { target.layers.add(this); return this; },
          bindPopup(content) { this.content = content; return this; }
        };
      }
    },
    document: { querySelector: () => null },
    setTimeout: (callback, delay) => { timeouts.set(delay, callback); },
    setInterval: (callback) => { tick = callback; }
  };
  context.window = context;
  vm.runInNewContext(fs.readFileSync(path.join(root, 'fukuoka-events.js'), 'utf8'), context);
  timeouts.get(1700)();
  const expiredEvent = '2026動物愛護フェスティバルふくおか';
  const futureEvent = 'Dog＆Rose Garden 2026';
  assert.ok(map.layers.size > 0, 'active event markers should be created');
  assert.ok(context.fukuokaEventMarkers.has(expiredEvent), 'event on Nov 7 should appear on Nov 7');
  assert.ok(context.fukuokaEventMarkers.has(futureEvent), 'future event should remain registered');
  const beforeExpiry = map.layers.size;

  now = '2026-11-09T00:01:00+09:00';
  context.Date = dateAt(now);
  tick();
  assert.ok(map.layers.size < beforeExpiry, 'expired event markers should be removed');
  assert.ok(!context.fukuokaEventMarkers.has(expiredEvent), 'ended event should be removed from registry');
  assert.ok(context.fukuokaEventMarkers.has(futureEvent), 'future event should remain registered');
}

testEventListExpiry();
testFukuokaMapExpiry();
console.log('Event expiry checks passed.');
