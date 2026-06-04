import os
import json

def sincronizar_catalogo(hojas_excel):
    clean_products = []
    
    # Un contador simple para darle un ID numérico de imagen único a cada fila
    for idx, fila in enumerate(hojas_excel):
        cod = str(fila.get('ID', '')).strip()
        desc = str(fila.get('NOMBRE', '')).strip()
        cat = str(fila.get('CATEGORIA', 'GENERAL')).strip().upper()
        
        # Tomamos el precio base del Excel
        precio_base = float(fila.get('PRECIO', 0))
        
        if not cod or not desc:
            continue

        # Usamos Picsum con el índice 'idx' como semilla fija. 
        # Esto garantiza que cada producto tenga una foto totalmente distinta y NUNCA se rompa el link.
        img_producto = f"https://picsum.photos/id/{10 + idx}/400/300"
        
        clean_products.append({
            "id": cod,
            "name": desc,
            "category": cat,
            "price": precio_base,
            "image": img_producto
        })

    # Guardamos en productos.js
    ruta_js = os.path.join(os.path.dirname(__file__), 'productos.js')
    with open(ruta_js, 'w', encoding='utf-8') as f:
        f.write("window.PRODUCTOS_DATA = " + json.dumps(clean_products, indent=4, ensure_ascii=False) + ";")
