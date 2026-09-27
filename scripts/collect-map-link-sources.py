"""Read saved HTML only; emit facility-scoped official/SNS links for map auditing."""
from html.parser import HTMLParser
from pathlib import Path
import json
import re

class Node:
    def __init__(self, tag='', attrs=(), parent=None):
        self.tag, self.attrs, self.parent = tag, dict(attrs), parent
        self.children = []
    def text(self):
        return ''.join(c if isinstance(c, str) else c.text() for c in self.children)
    def nodes(self, tags):
        for c in self.children:
            if isinstance(c, Node):
                if c.tag in tags:
                    yield c
                yield from c.nodes(tags)

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.root = self.current = Node()
    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs, self.current)
        self.current.children.append(n)
        if tag not in {'meta','link','img','br','hr','input','source','wbr','area','base','embed','param'}:
            self.current = n
    def handle_endtag(self, tag):
        n = self.current
        while n.parent:
            if n.tag == tag:
                self.current = n.parent
                break
            n = n.parent
    def handle_data(self, text):
        self.current.children.append(text)

def links(node):
    result = []
    for a in node.nodes({'a'}):
        href = a.attrs.get('href', '')
        label = a.text().strip()
        if not re.match(r'^https?://', href):
            continue
        if re.search(r'google\.|goo.gl|maps.app|youtube.com|youtu.be', href):
            continue
        if re.search(r'公式|Instagram|Facebook|LINE|ホームページ|公式X|公式サイト|SNS', label, re.I):
            result.append({'url': href, 'label': label})
    return result

sources = []
for path in sorted(Path('.').glob('*.html')):
    if 'map' in path.name or path.name == 'index.html':
        continue
    p = Parser()
    p.feed(path.read_text())
    for h in p.root.nodes({'h2','h3'}):
        n = h.parent
        while n.parent and len(list(n.nodes({'h2','h3'}))) == 1:
            found = links(n)
            if found:
                sources.append({'name': h.text().strip(), 'file': str(path), 'links': found})
                break
            n = n.parent
    titles = list(p.root.nodes({'h1'}))
    if len(titles) == 1:
        found = links(p.root)
        if found:
            sources.append({'name': titles[0].text().strip(), 'file': str(path), 'links': found})
print(json.dumps(sources, ensure_ascii=False))
