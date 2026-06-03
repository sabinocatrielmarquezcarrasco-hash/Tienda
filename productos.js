const PRODUCTOS_DATA = [
    {
        "id": "BF-888S",
        "name": "HANDY  X 2  BAOFENG  5W",
        "price": 24100,
        "category": "AUTO, BICI Y CELULAR",
        "pack": "50",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
    },
    {
        "id": "TMCB6552",
        "name": "CAB-47022 CABLE HDMI 1.5M MALLADO",
        "price": 1300,
        "category": "CABLES Y ADAPTADORES",
        "pack": "250",
        "image": "https://images.unsplash.com/photo-1557853197-aefb550b6fdc?w=300&q=80"
    },
    {
        "id": "1901",
        "name": "CINTA METRICA 3M 3GTM CR-1901",
        "price": 1260,
        "category": "HERRAMIENTAS",
        "pack": "240",
        "image": "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=300&q=80"
    },
    {
        "id": "1903",
        "name": "CINTA METRICA GIANT  7.5 METROS",
        "price": 2999,
        "category": "HERRAMIENTAS",
        "pack": "120",
        "image": "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=300&q=80"
    },
    {
        "id": "LED-9726",
        "name": "LED-83094 TIRA LED 50X50 RGB 5M 9734",
        "price": 6700,
        "category": "ILUMINACION",
        "pack": "40",
        "image": "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=300&q=80"
    },
    {
        "id": "LED-83051",
        "name": "LED-83100 FOCO LED PARA ESPEJO",
        "price": 5900,
        "category": "ILUMINACION",
        "pack": "48",
        "image": "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=300&q=80"
    },
    {
        "id": "XR-011",
        "name": "LUZ DE BICI X2PCS HJ008-2 RL-5-23",
        "price": 1299,
        "category": "ILUMINACION",
        "pack": "240",
        "image": "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=300&q=80"
    },
    {
        "id": "XY3199",
        "name": "MINI MASAJEADOR BN1402",
        "price": 1714,
        "category": "BELLEZA",
        "pack": "120",
        "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80"
    },
    {
        "id": "AR-1401",
        "name": "VINCHA  P47  BT MELECH-232 16009",
        "price": 3250,
        "category": "AURICULARES VINCHA O BT",
        "pack": "100",
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80"
    },
    {
        "id": "GTS-1802",
        "name": "(BS PARLANTE BT 8 C/LUZ MIC",
        "price": 24500,
        "category": "PARLANTES Y MICROFONOS",
        "pack": "8",
        "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80"
    },
    {
        "id": "912",
        "name": "(BS)MONOPATIN C/LUZ  DE METAL",
        "price": 14999,
        "category": "ILUMINACION",
        "pack": "10",
        "image": "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=300&q=80"
    },
    {
        "id": "CQ-01",
        "name": "130501 LINGA PARA BICI 15X90",
        "price": 3422,
        "category": "AUTO, BICI Y CELULAR",
        "pack": "60",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
    },
    {
        "id": "TH-108",
        "name": "130T06  KIT LLAVE TUBO 108P",
        "price": 39500,
        "category": "HERRAMIENTAS",
        "pack": "5",
        "image": "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=300&q=80"
    },
    {
        "id": "ICO-160913",
        "name": "160918 COLCHON INFLABLE + INFLADOR  5min.",
        "price": 79999,
        "category": "HOGAR Y VARIEDADES",
        "pack": "3",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
    },
    {
        "id": "BF-777S",
        "name": "2 WALKIE TALKIE 16 CANALES",
        "price": 29659,
        "category": "HOGAR Y VARIEDADES",
        "pack": "50",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
    },
    {
        "id": "ACC0206",
        "name": "ACC0176 SET PARRILLERO 13 PCS ACERO",
        "price": 17100,
        "category": "HOGAR Y VARIEDADES",
        "pack": "12",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
    },
    {
        "id": "ADAPTADOR",
        "name": "ADAPTADOR INTERNACIONAL  VIAJERO AD-13",
        "price": 1999,
        "category": "CABLES Y ADAPTADORES",
        "pack": "200",
        "image": "https://images.unsplash.com/photo-1557853197-aefb550b6fdc?w=300&q=80"
    },
    {
        "id": "CA400-S2",
        "name": "ADAPTADOR MULTIMEDIA PRO",
        "price": 88690,
        "category": "CABLES Y ADAPTADORES",
        "pack": "100",
        "image": "https://images.unsplash.com/photo-1557853197-aefb550b6fdc?w=300&q=80"
    },
    {
        "id": "ALF-160902",
        "name": "ALFOMBRA INFLABLE 65X65CM OFERTA SEMANAL!",
        "price": 1189,
        "category": "HOGAR Y VARIEDADES",
        "pack": "100",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
    },
    {
        "id": "ALF-160901",
        "name": "ALFOMBRA INFLABLE PARA BEBES 100X100CM",
        "price": 2999,
        "category": "HOGAR Y VARIEDADES",
        "pack": "100",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
    },
    {
        "id": "PAD-61025",
        "name": "ALMOHADILLA REPOSAMUÑECAS OFERTA!!",
        "price": 3999,
        "category": "HOGAR Y VARIEDADES",
        "pack": "40",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
    },
    {
        "id": "OM-7012",
        "name": "ANAFE ELECTRICO 1 HORNALLA STAR VISION SV-1010",
        "price": 10900,
        "category": "HOGAR Y VARIEDADES",
        "pack": "12",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
    },
    {
        "id": "TMWF8401",
        "name": "ANTENA WIFI 600MPS TMPAS8417  1109",
        "price": 2965,
        "category": "HOGAR Y VARIEDADES",
        "pack": "500",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
    },
    {
        "id": "KM-2003",
        "name": "ANTORCHA ESTACA SOLAR CALIDO JK-2003 XF-6017",
        "price": 3350,
        "category": "ILUMINACION",
        "pack": "105",
        "image": "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=300&q=80"
    },
    {
        "id": "500-1",
        "name": "APLICADOR DE STRASS  PARA EL CABELLO 500-3",
        "price": 4500,
        "category": "HOGAR Y VARIEDADES",
        "pack": "200",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
    },
    {
        "id": "HOG0133NEG",
        "name": "ASPIRADORA DE AUTO INALAMBRICA",
        "price": 14900,
        "category": "AUTO, BICI Y CELULAR",
        "pack": "30",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
    },
    {
        "id": "OG-A3",
        "name": "ASPIRADORA DE AUTO PORTATIL 120W",
        "price": 22300,
        "category": "AUTO, BICI Y CELULAR",
        "pack": "20",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
    },
    {
        "id": "HOG0402AZU",
        "name": "ASPIRADORA DE TACHO 10L 600W (PLASTICO)",
        "price": 36900,
        "category": "HOGAR Y VARIEDADES",
        "pack": "1",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
    },
    {
        "id": "OM-VC-25",
        "name": "ASPIRADORA ELECTRICA RECARGABLE",
        "price": 46900,
        "category": "HOGAR Y VARIEDADES",
        "pack": "8",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
    },
    {
        "id": "HOG0393",
        "name": "ASPIRADORA TRINEO 880W",
        "price": 37750,
        "category": "HOGAR Y VARIEDADES",
        "pack": "1",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
    },
    {
        "id": "MELECH-209",
        "name": "ATORNILLADOR 12V 2 BATERIAS",
        "price": 26500,
        "category": "HOGAR Y VARIEDADES",
        "pack": "10",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80"
    },
    {
        "id": "AU-11007",
        "name": "AU-11017 AURICULAR TIME  (A/B/N/R)11019",
        "price": 772,
        "category": "AURICULARES VINCHA O BT",
        "pack": "1000",
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80"
    },
    {
        "id": "AU-1237",
        "name": "AU-11021  AURICULAR M/LIBRES TIME C/ EXHIBIDOR",
        "price": 945,
        "category": "AURICULARES VINCHA O BT",
        "pack": "400",
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80"
    },
    {
        "id": "AU-1236",
        "name": "AU-11022 AURICULAR M-LIBRES TIME C/ EXHIBIDOR",
        "price": 955,
        "category": "AURICULARES VINCHA O BT",
        "pack": "400",
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80"
    },
    {
        "id": "AU-11006",
        "name": "AU-11023 AURICULAR BOLSITA NEGRO Y BLANCO AU-11016",
        "price": 785,
        "category": "AURICULARES VINCHA O BT",
        "pack": "1000",
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80"
    }
];
