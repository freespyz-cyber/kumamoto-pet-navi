const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync('fukuoka-city-vets.html', 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script, 'directory script exists');

class NodeMock {
  constructor() {
    this.children = [];
    this.listeners = {};
    this.value = '';
    this.textContent = '';
  }
  add(option) { this.children.push(option); }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.children = nodes; }
  addEventListener(type, listener) { this.listeners[type] = listener; }
}

const nodes = Object.fromEntries(['#ward', '#q', '#results', '#count'].map((id) => [id, new NodeMock()]));
const document = {
  querySelector(selector) { return nodes[selector]; },
  createElement() { return new NodeMock(); },
};
const context = {
  document,
  Option: class Option { constructor(text, value) { this.text = text; this.value = value; } },
};
vm.runInNewContext(`${script}\nglobalThis.__test = { clinics, wards };`, context);

const { clinics, wards } = context.__test;
const cardCount = () => nodes['#results'].children
  .reduce((sum, section) => sum + section.children[1].children.length, 0);
const search = (value) => {
  nodes['#q'].value = value;
  nodes['#q'].listeners.input();
};
const filterWard = (value) => {
  nodes['#ward'].value = value;
  nodes['#ward'].listeners.change();
};

assert.equal(clinics.length, 109);
assert.equal(wards.length, 7);
assert.equal(cardCount(), 109, 'initial render shows all hospitals');
assert.match(nodes['#count'].textContent, /^109院を表示/);

search('くるみ');
assert.equal(cardCount(), 1, 'name search finds Kurumi Animal Hospital');
assert.equal(nodes['#results'].children[0].children[1].children[0].children[0].textContent, 'くるみ動物病院');

search('092-406-5631');
assert.equal(cardCount(), 1, 'normalized phone search works');

search('荒戸3-2-2');
assert.equal(cardCount(), 1, 'current address search works');
const kurumiCard = nodes['#results'].children[0].children[1].children[0];
assert.ok(kurumiCard.children[3].children.some((link) => link.href === 'fukuoka-vets-kurumi.html'));

search('確実に存在しない検索語');
assert.equal(cardCount(), 0);
assert.equal(nodes['#count'].textContent, '0院を表示（福岡市公式名簿掲載 109院）');

search('');
filterWard('中央区');
assert.equal(cardCount(), 15, 'ward filter shows only Chuo ward');
assert.match(nodes['#count'].textContent, /^15院を表示/);

filterWard('');
assert.equal(cardCount(), 109, 'clearing ward filter restores all hospitals');
console.log('Fukuoka city directory tests passed (109 records, search, ward filter, zero-results state, Kurumi relocation link).');
