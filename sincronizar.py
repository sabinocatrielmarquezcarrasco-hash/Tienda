import re
import json
import os

def clean_html_tags(text):
    return re.sub(r'<.*?>', '', text).strip()

def categorizar_real(desc):
    d = desc.lower()
    if 'parlante' in d or 'mic' in d or 'karaoke' in d: 
        return 'PARLANTES Y MICROFONOS'
    elif 'vincha' in d or 'p47' in d or 'bluetooth' in d or 'auricular' in d or 'audifono' in d: 
        return 'AURICULARES VINCHA O BT'
    elif 'cable' in d or 'hdmi' in d or 'adaptador' in d or 'ficha' in d or 'splitter' in d: 
        return 'CABLES Y ADAPTADORES'
    elif 'cargador' in d or 'fuente' in d or 'power bank' in d: 
        return 'CARGADORES Y FUENTES'
    elif 'led' in d or 'foco' in d or 'luz' in d or 'lampara' in d or 'solar' in d: 
        return 'ILUMINACION'
    elif 'termo' in d or 'vaso' in d or 'mate' in d or 'botella' in d: 
        return 'TERMOS Y VASOS'
    elif 'bici' in d or 'moto' in d or 'auto' in d or 'soporte' in d or 'handy' in d: 
        return 'AUTO, BICI Y CELULAR'
    elif 'cinta' in d or 'llave' in d or 'tubo' in d or 'pinza' in d or 'destornillador' in d: 
        return 'HERRAMIENTAS'
    elif 'masajeador' in d or 'depilador' in d or 'afeitadora' in d or 'planchita' in d or 'pelo' in d: 
        return 'BELLEZA'
    elif 'bazar' in d or 'balanza' in d or 'reloj' in d: 
        return 'BAZAR'
    else: 
        return 'HOGAR Y VARIEDADES'

# Buscar el archivo .xls en el directorio actual
archivo_origen = None
for file in os.listdir('.'):
    if file.endswith('.xls'):
        archivo_origen = file
        break

if not archivo_origen:
    print("Error: No se encontró ningún archivo .xls en la carpeta.")
    exit()

print(f"Procesando el archivo: {archivo_origen}")

with open(archivo_origen, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

rows = re.findall(r'<tr>(.*?)</tr>', content, re.DOTALL)
parsed_rows = []
for row in rows:
    cells = re.findall(r'<td.*?>(.*?)</td>', row, re.DOTALL)
    cells = [c.replace('&nbsp;', '').strip() for c in cells]
    if cells: 
        parsed_rows.append(cells)

clean_products = []
for r in parsed_rows:
    if len(r) >= 4:
        cod = clean_html_tags(r[0])
        desc = clean_html_tags(r[1])
        bulto = clean_html_tags(r[2])
        precio_raw = clean_html_tags(r[3])
        
        if cod != 'Codigo' and desc != 'Descripcion' and cod != '':
            try: 
                precio_final = int(float(precio_raw))
            except: 
                precio_final = 0
                
            cat = categorizar_real(desc)
            
            # Imágenes genéricas según su categoría asignada
            img = "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
            if cat == 'PARLANTES Y MICROFONOS': 
                img = "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80"
            elif cat == 'AURICULARES VINCHA O BT': 
                img = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80"
            elif cat == 'ILUMINACION': 
                img = "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=300&q=80"
            elif cat == 'CABLES Y ADAPTADORES': 
                img = "https://images.unsplash.com/photo-1557853197-aefb550b6fdc?w=300&q=80"
            elif cat == 'HERRAMIENTAS': 
                img = "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=300&q=80"
            elif cat == 'BELLEZA': 
                img = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80"
            elif cat == 'TERMOS Y VASOS': 
                img = "https://images.unsplash.com/photo-1517256064527-09c53b2d0c6b?w=300&q=80"
            
            clean_products.append({
                "id": cod,
                "name": desc,
                "price": precio_final,
                "category": cat,
                "pack": bulto,
                "image": img
            })

# Guardar base de datos limpia como constante global estricta para index.html
with open('productos.js', 'w', encoding='utf-8') as f:
    f.write("const PRODUCTOS_DATA = " + json.dumps(clean_products, indent=4, ensure_ascii=False) + ";")

print(f"Sincronización exitosa. Se procesaron {len(clean_products)} productos en productos.js")
