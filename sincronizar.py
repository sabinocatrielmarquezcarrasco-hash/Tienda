import re
import json
import os
import urllib.parse

def clean_html_tags(text):
    return re.sub(r'<.*?>', '', text).strip()

# Ponemos la lógica de extracción simulada desde tu Excel/Estructura base
def sincronizar_catalogo(hojas_excel):
    clean_products = []
    
    for fila in hojas_excel:
        cod = str(fila.get('ID', '')).strip()
        desc = clean_html_tags(str(fila.get('NOMBRE', ''))).strip()
        cat = str(fila.get('CATEGORIA', ' ')).strip().upper()
        bulto = str(fila.get('BULTO', '1')).strip()
        
        if not cod or not desc:
            continue

        # Limpieza del nombre para la búsqueda de la foto individual
        nombre_limpio = desc.split(']')[-1].strip() if ']' in desc else desc
        palabras_clave = " ".join(nombre_limpio.split()[:3])
        busqueda_url = urllib.parse.quote(palabras_clave)
        
        # Generamos dos fotos únicas basadas en el ID del artículo para el efecto GIF
        img1 = f"https://source.unsplash.com/featured/400x300/?{busqueda_url}&sig={cod}1"
        img2 = f"https://source.unsplash.com/featured/400x300/?{busqueda_url}&sig={cod}2"
        
        clean_products.append({
            "id": cod,
            "name": desc,
            "category": cat,
            "pack": bulto,
            "images": [img1, img2]
        })

    # Forzamos la escritura limpia asignándola directo al objeto Window del navegador
    ruta_js = os.path.join(os.path.dirname(__file__), 'productos.js')
    with open(ruta_js, 'w', encoding='utf-8') as f:
        f.write("window.PRODUCTOS_DATA = " + json.dumps(clean_products, indent=4, ensure_ascii=False) + ";")

# Ejecución de prueba interna con tu mockup si corrés el script localmente
if __name__ == "__main__":
    # Este bloque lee tus datos actuales del array para procesarlos
    mock_data = [
        {"ID": "BF-888S", "NOMBRE": "HANDY X 2 BAOFENG 5W", "CATEGORIA": "AUTO, BICI Y CELULAR", "BULTO": "50"},
        {"ID": "TMCB6552", "NOMBRE": "CABLE HDMI 1.5M MALLADO", "CATEGORIA": "CABLES Y ADAPTADORES", "BULTO": "250"},
        {"ID": "1901", "NOMBRE": "CINTA METRICA 3M 3GTM CR-1901", "CATEGORIA": "HERRAMIENTAS", "BULTO": "240"}
    ]
    sincronizar_catalogo(mock_data)
    print("Sincronización exitosa: 'productos.js' creado sin precios y con firmas de imágenes únicas.")
