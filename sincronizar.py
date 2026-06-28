#!/usr/bin/env python3
"""
sincronizar.py — Actualiza productos.js desde el Excel de Impotekno
Uso: python3 sincronizar.py archivo.xls
"""
import sys, json
from html.parser import HTMLParser

class ProductParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.products = []
        self.in_td = False
        self.td_count = 0
        self.td_data = []
        self.current_img = None

    def handle_starttag(self, tag, attrs):
        if tag == 'tr':
            self.td_count = 0
            self.td_data = []
            self.current_img = None
        elif tag == 'td':
            self.in_td = True
            self.td_count += 1
            if len(self.td_data) < self.td_count:
                self.td_data.extend([''] * (self.td_count - len(self.td_data)))
        elif tag == 'img':
            for attr, val in attrs:
                if attr == 'src':
                    self.current_img = val

    def handle_endtag(self, tag):
        if tag == 'td':
            self.in_td = False
        elif tag == 'tr':
            if len(self.td_data) >= 4:
                row = [d.strip() for d in self.td_data]
                if row[0] and row[0] not in ('Codigo', '') and row[1] and row[3]:
                    try:
                        price = int(''.join(c for c in row[3] if c.isdigit()))
                        if price > 0:
                            self.products.append({
                                'id': row[0],
                                'name': ' '.join(row[1].split()),
                                'bulto': row[2].strip() or '1',
                                'price': price,
                                'image': self.current_img or f'https://impotekno.com/fotos/{row[0]}.jpg'
                            })
                    except:
                        pass

    def handle_data(self, data):
        if self.in_td:
            s = data.strip()
            if s and len(self.td_data) >= self.td_count and self.td_count > 0:
                self.td_data[self.td_count-1] += (' ' if self.td_data[self.td_count-1] else '') + s

def sincronizar(xls_path):
    with open(xls_path, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()
    parser = ProductParser()
    parser.feed(content)
    products = parser.products
    print(f"✓ {len(products)} productos encontrados")
    js = f"window.PRODUCTOS_DATA = {json.dumps(products, indent=2, ensure_ascii=False)};"
    with open('productos.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("✓ productos.js actualizado")
    return products

if __name__ == '__main__':
    path = sys.argv[1] if len(sys.argv) > 1 else 'archivo.xls'
    sincronizar(path)
