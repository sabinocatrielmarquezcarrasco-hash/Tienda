import json

def calcular_precios(costo):
    # Lógica Estratégica:
    # Margen Minorista 60% (para ser competitivo) y Mayorista 20%
    minorista = round(costo * 1.60, -1)
    mayorista = round(costo * 1.20, -1)
    return minorista, mayorista

def procesar_productos(lista_raw):
    catalogo = []
    for item in lista_raw:
        precio_min, precio_may = calcular_precios(item['precio'])
        catalogo.append({
            "id": item['id'],
            "name": item['name'],
            "precio_minorista": precio_min,
            "precio_mayorista": precio_may,
            "image": item['image']
        })
    return catalogo
