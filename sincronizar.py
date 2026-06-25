import json
import os

# Configuración de márgenes
MARGEN_MINORISTA = 1.60  # 60% de ganancia sobre costo
MARGEN_MAYORISTA = 1.20  # 20% de ganancia sobre costo

def sincronizar_catalogo(lista_productos):
    # Procesar productos con cálculos automáticos
    catalogo_final = []
    
    for p in lista_productos:
        costo = p['price']
        # Calculamos minorista y mayorista automáticamente
        catalogo_final.append({
            "id": p['id'],
            "name": p['name'],
            "precio_min": round(costo * MARGEN_MINORISTA, -1),
            "precio_may": round(costo * MARGEN_MAYORISTA, -1),
            "images": p['images']
        })

    # Guardar en productos.js
    with open('productos.js', 'w', encoding='utf-8') as f:
        f.write("window.PRODUCTOS_DATA = " + json.dumps(catalogo_final, indent=4, ensure_ascii=False) + ";")

# --- AQUÍ PEGARÁS TU LISTA DE PRODUCTOS ---
# El script tomará los datos, calculará los márgenes y generará el archivo JS.
