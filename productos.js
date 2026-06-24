const productos = [
    { id: "BF-888S", nombre: "HANDY X 2 BAOFENG 5W", precio: 24100, imagen: "https://impotekno.com/fotos/BF-888S.jpg" },
    { id: "TMCB6552", nombre: "CAB-47022 CABLE HDMI 1.5M MALLADO", precio: 1300, imagen: "https://impotekno.com/fotos/TMCB6552.jpg" },
    { id: "1901", nombre: "CINTA METRICA 3M 3GTM CR-1901", precio: 1260, imagen: "https://impotekno.com/fotos/1901.jpg" },
    { id: "1903", nombre: "CINTA METRICA GIANT 7.5 METROS", precio: 2999, imagen: "https://impotekno.com/fotos/1903.jpg" },
    { id: "LED-9726", nombre: "LED-83094 TIRA LED 50X50 RGB 5M 9734", precio: 6700, imagen: "https://impotekno.com/fotos/LED-9726.jpg" },
    { id: "XR-011", nombre: "LUZ DE BICI X2PCS HJ008-2 RL-5-23", precio: 1350, imagen: "https://impotekno.com/fotos/XR-011.jpg" },
    { id: "XY3199", nombre: "MINI MASAJEADOR BN1402", precio: 1714, imagen: "https://impotekno.com/fotos/XY3199.jpg" },
    { id: "LED-9727", nombre: "TIRA LED 28X35 RGB 5M LED 2835", precio: 4499, imagen: "https://impotekno.com/fotos/LED-9727.jpg" }
];

function cargarCatalogo() {
    const contenedor = document.getElementById('catalogo');
    contenedor.innerHTML = productos.map(p => `
        <div class="product-card">
            <img src="${p.imagen}" alt="${p.nombre}" onerror="this.src='placeholder.jpg'">
            <h3>${p.nombre}</h3>
            <p><strong>$ ${p.precio.toLocaleString()}</strong></p>
            <button onclick="comprar('${p.nombre}', ${p.precio})">Comprar</button>
        </div>
    `).join('');
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', cargarCatalogo);
