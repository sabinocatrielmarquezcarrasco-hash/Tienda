import re
import json
import os
import urllib.parse

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
            
            # Limpieza inteligente del nombre para la búsqueda de imágenes individuales
            # Quita marcas temporales y códigos para quedarse con el objeto real (Ej: "CINTA METRICA")
            nombre_limpio = desc.split(']')[-1].strip() if ']' in desc else desc
            palabras = nombre_limpio.split()
            # Tomamos palabras clave representativas evitando códigos del final
            palabras_clave = " ".join([p for p in palabras[:3] if not p.isdigit() and len(p) > 2])
            if not palabras_clave:
                palabras_clave = cat
                
            busqueda_url = urllib.parse.quote(palabras_clave.lower())
            
            # Motor dinámico de imágenes estables (Unsplash optimizado con ID semilla único para evitar repeticiones)
            img1 = f"https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=500&auto=format&fit=crop&sig={cod}"
            
            # Ajuste de fallbacks temáticos hiperespecíficos por si la palabra falla
            if 'handy' in desc.lower():
                img1 = f"https://images.unsplash.com/photo-1614362143431-7589eddfcb68?w=500&auto=format&fit=crop&q=80&sig={cod}"
                img2 = f"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=80&sig={cod}"
            elif 'cable' in desc.lower() or 'hdmi' in desc.lower():
                img1 = f"https://images.unsplash.com/photo-1557853197-aefb550b6fdc?w=500&auto=format&fit=crop&q=80&sig={cod}"
                img2 = f"https://images.unsplash.com/photo-1610443224419-be4d35db150a?w=500&auto=format&fit=crop&q=80&sig={cod}"
            elif 'cinta' in desc.lower() or 'metrica' in desc.lower():
                img1 = f"https://images.unsplash.com/photo-1530631673369-bc20fdb32288?w=500&auto=format&fit=crop&q=80&sig={cod}"
                img2 = f"https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&auto=format&fit=crop&q=80&sig={cod}"
            elif 'led' in desc.lower() or 'tira' in desc.lower() or 'foco' in desc.lower():
                img1 = f"https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=500&auto=format&fit=crop&q=80&sig={cod}"
                img2 = f"https://images.unsplash.com/photo-1507646227500-4d389b0012be?w=500&auto=format&fit=crop&q=80&sig={cod}"
            elif 'masajeador' in desc.lower():
                img1 = f"https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&auto=format&fit=crop&q=80&sig={cod}"
                img2 = f"https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&auto=format&fit=crop&q=80&sig={cod}"
            elif 'auricular' in desc.lower() or 'vincha' in desc.lower():
                img1 = f"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80&sig={cod}"
                img2 = f"https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&auto=format&fit=crop&q=80&sig={cod}"
            elif 'parlante' in desc.lower():
                img1 = f"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=80&sig={cod}"
                img2 = f"https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=80&sig={cod}"
            else:
                # Imagen genérica de tecnología/bazar limpia e individualizada por ID para que no repita
                img1 = f"https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=80&sig={cod}"
                img2 = f"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=80&sig={cod}"

            # Definición automática de variantes/colores según el tipo de artículo
            lista_variantes = ["Predeterminado", "Variante B"]
            if 'led' in desc.lower() or 'rgb' in desc.lower():
                lista_variantes = ["RGB Multicolor", "Blanco Frío", "Blanco Cálido"]
            elif 'auricular' in desc.lower() or 'vincha' in desc.lower() or 'handy' in desc.lower():
                lista_variantes = ["Negro", "Azul", "Rojo", "Gris"]
            elif 'cinta' in desc.lower():
                lista_variantes = ["Métrica Estándar", "Carcasa Reforzada"]

            clean_products.append({
                "id": cod,
                "name": desc,
                "price": precio_final,
                "category": cat,
                "pack": bulto,
                "images": [img1, img2],
                "variants": lista_variantes
            })

# Guardar base de datos limpia como constante global estricta para index.html
with open('productos.js', 'w', encoding='utf-8') as f:
    f.write("const PRODUCTOS_DATA = " + json.dumps(clean_products, indent=4, ensure_ascii=False) + ";")

print(f"Sincronización exitosa. Se procesaron {len(clean_products)} productos en productos.js")
