import { Category, Product } from './types';

// Helper for color visuals shared across components
export const getColorHex = (name: string): string => {
  const map: {[key: string]: string} = {
      'Blanco': '#ffffff',
      'Negro': '#000000',
      'Negro Mate': '#1a1a1a',
      'Rojo': '#ef4444',
      'Azul': '#3b82f6',
      'Celeste': '#38bdf8',
      'Verde': '#22c55e',
      'Naranja': '#f97316',
      'Amarillo': '#eab308',
      'Amarillo Flúo': '#ccff00',
      'Gris': '#6b7280',
      'Plata': '#9ca3af',
      'Plateado': '#9ca3af',
      'Marrón': '#78350f',
      'Dorado': '#ffd700',
      'Dorado Oscuro': '#b8860b',
      'Cromado': '#e3e3e3', // Gradient logic handles best in CSS, flat color fallback
      'Transparente': '#f3f4f6' // Light gray to represent clear
  };
  return map[name] || '#cccccc';
};

export const BRANDS = ['Voge 300 DS', 'Benelli TRK 251', 'Daelim Liberty', 'Universal'];

export const CATEGORIES: Category[] = [
  {
    id: 'moto',
    name: 'MOTO',
    groups: [
      {
        name: 'Plásticos',
        items: [
          'Aletas de Tanque',
          'Cachas Portanúmero',
          'Cubre Amortiguador',
          'Cubre Barrales',
          'Cubre Carter',
          'Cubre Cuadro',
          'Cubre Disco',
          'Cubre Horquillon',
          'Cubre Motor',
          'Guardabarro Delantero',
          'Guardabarro Trasero',
          'Guía Desliza Cadena',
          'Kits Plásticos',
          'Porta Número'
        ]
      },
      {
        name: 'Mecánica',
        items: [
          'Repuestos de Motor',
          'Filtros/Mantenimientos',
          'Juntas',
          'Pistón',
          'Carburador',
          'Mangueras'
        ]
      },
      {
        name: 'Chasis & Accesorios',
        items: [
          'Accesorios/Herramientas',
          'Asientos',
          'Bauleras',
          'Defensas',
          'Faros',
          'Manubrios',
          'Parabrisas'
        ]
      },
      {
        name: 'Ruedas',
        items: ['Ruedas', 'Cámaras', 'Cubiertas', 'Llantas', 'Rayos']
      },
      {
        name: 'Transmisión',
        items: ['Transmisión', 'Cadenas', 'Coronas', 'Piñones']
      },
      {
        name: 'Frenos',
        items: [
          'Discos',
          'Calipers',
          'Flexibles',
          'Palancas',
          'Pastillas',
          'Otros'
        ]
      },
      {
        name: 'Tanque',
        items: ['Tanque', 'Tapas']
      }
    ]
  },
  {
    id: 'piloto',
    name: 'PILOTO',
    groups: [
      {
        name: 'Indumentaria',
        items: ['Indumentaria', 'Botas', 'Cascos']
      }
    ]
  }
];

// Mock Data updated to match new categories
export const PRODUCTS: Product[] = [
  // MOTO - Frenos (Updated Subcategories)
  { id: '26', name: 'Pastillas De Freno Traseras Yamaha Super Tenere Xtz 750', category: 'MOTO', subcategory: 'Pastillas', price: 45000, stock: 5, image: 'https://http2.mlstatic.com/D_NQ_NP_2X_910149-MLA79016617378_092024-F.webp', compatibleBrands: ['Yamaha'] },
  { 
    id: '40', 
    name: 'Pastillas Freno Yamaha Xj 400 600 Seca Diversion Fz Fzr Rd', 
    category: 'MOTO', 
    subcategory: 'Pastillas', 
    price: 36750, 
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_766667-MLA79746177700_102024-F.webp', 
    compatibleBrands: ['Yamaha'] 
  },
  { id: '27', name: 'Soporte De Sensor De Rueda Delantera Benelli Trk 251', category: 'MOTO', subcategory: 'Otros', price: 15000, stock: 5, image: 'https://http2.mlstatic.com/D_NQ_NP_2X_933669-MLA95531906926_102025-F.webp', compatibleBrands: ['Benelli TRK 251'] },
  { id: '33', name: 'Pastillas Traseras Metalicas Voge 500 Ds Ac', category: 'MOTO', subcategory: 'Pastillas', price: 42000, stock: 5, image: 'https://http2.mlstatic.com/D_NQ_NP_2X_799266-MLA83912408426_042025-F.webp', compatibleBrands: ['Voge 500 DS'] },

  // MOTO - Plásticos
  {
    id: '42',
    name: 'Cubre Barrales Suspensión Ktm Husqvarna Gas Gas Stark Varg',
    category: 'MOTO',
    subcategory: 'Cubre Barrales',
    price: 82450,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_984766-MLA91186737922_092025-F.webp',
    compatibleBrands: ['KTM', 'Husqvarna', 'Gas Gas']
  },
  {
    id: '43',
    name: 'Cachas Portanumero Lateral Ktm Exc F Sxf Xcf W 2019 Al 2023',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 82500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_932604-MLA93972779623_102025-F.webp',
    gallery: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_744577-MLA91254733788_092025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_813133-MLA91250071064_092025-F.webp'
    ],
    compatibleBrands: ['KTM']
  },

  // MOTO - Transmisión
  { id: '34', name: 'Cubetas De Direccion Cristo Benelli Trk 251 Rodamientos', category: 'MOTO', subcategory: 'Transmisión', price: 35000, stock: 5, image: 'https://http2.mlstatic.com/D_NQ_NP_2X_920965-MLA87927380721_072025-F.webp', compatibleBrands: ['Benelli TRK 251'] },

  // MOTO - Accesorios (Faros in Chasis & Accesorios -> Faros)
  {
    id: '44',
    name: 'Faro Luz Completo Ktm Exc Sxf 2014 A 2023 Delantero Enduro Ambos Lados',
    category: 'MOTO',
    subcategory: 'Faros',
    price: 140000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_638839-MLA101288904240_122025-F.webp',
    gallery: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_697696-MLA101288924000_122025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_925911-MLA101290039362_122025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_687309-MLA101290099094_122025-F.webp'
    ],
    compatibleBrands: ['KTM', 'Husqvarna']
  },
  {
    id: '50',
    name: 'Mascara Luz Optica Completa Kawasaki Klx 450 300 250 Ambos Lados',
    category: 'MOTO',
    subcategory: 'Faros',
    price: 140000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_703457-MLA101282754126_122025-F.webp',
    gallery: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_821486-MLA101288607246_122025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_733421-MLA101788990887_122025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_795784-MLA101788484247_122025-F.webp'
    ],
    compatibleBrands: ['Kawasaki']
  },
  { 
    id: '37', 
    name: 'Juego De Tornillos Tornado Para Cachas Honda Xr 250 Negro', 
    category: 'MOTO', 
    subcategory: 'Accesorios/Herramientas', 
    price: 35000, 
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_766280-MLA81430198623_122024-F.webp', 
    compatibleBrands: ['Honda XR 250', 'Honda Tornado'] 
  },
  { 
    id: '38', 
    name: 'Kit Tornillos Y Arandelas Cachas Honda Tornado Xr 250 X8 C', 
    category: 'MOTO', 
    subcategory: 'Accesorios/Herramientas', 
    price: 42000, 
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_976080-MLA89667924328_082025-F.webp', 
    gallery: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_993071-MLA93588451711_092025-F.webp',
    ],
    compatibleBrands: ['Honda XR 250', 'Honda Tornado'] 
  },
  {
    id: '45',
    name: 'Kit Tornillos Arandelas Cachas Honda Tornado Xr 250 Dorado Dorado',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 33900,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_926968-MLA93549738758_102025-F.webp',
    compatibleBrands: ['Honda', 'Tornado']
  },
  {
    id: '46',
    name: 'Kit Tornillos Y Arandelas De Cachas Honda Tornado Xr 250 X8',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 35000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_764501-MLA89935926800_082025-F.webp',
    compatibleBrands: ['Honda', 'Tornado']
  },
  {
    id: '47',
    name: 'Kit Tornillos Arandelas Cachas Kawasaki Kdx 200 220 Kx Kmx Verde',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 38000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_603378-MLA93550469248_102025-F.webp',
    compatibleBrands: ['Kawasaki']
  },
  // MOTO - Bauleras
  {
    id: '39',
    name: 'Soporte Bidon Nafta Auxiliar Universal Givi E163 Moto Viaje Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 255000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_774243-MLA93700564344_102025-F.webp',
    compatibleBrands: ['Universal']
  },
  {
    id: '41',
    name: 'Parrilla Soporte De Baul Bajaj Rouser Ns 200 Reforzada Givi Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 85000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_724716-MLA93544832980_102025-F.webp',
    gallery: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_732793-MLA91137438166_092025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_986623-MLA91150866637_082025-F.webp'
    ],
    compatibleBrands: ['Bajaj', 'Rouser NS 200']
  },
  
  // MOTO - Mecánica
  { id: '29', name: 'Filtro Aire + Aceite Y Limpiador Yamaha Yz 125 250 426 450', category: 'MOTO', subcategory: 'Filtros/Mantenimientos', price: 95000, stock: 5, image: 'https://http2.mlstatic.com/D_NQ_NP_2X_788593-MLA82582120052_032025-F.webp', compatibleBrands: ['Yamaha'] },

  // MOTO - Manubrios (in Chasis & Accesorios group)
  { id: '28', name: 'Puños Manoplas Benelli Trk 251 Originales C/ Tubo Acelerador Negro', category: 'MOTO', subcategory: 'Manubrios', price: 40000, stock: 5, image: 'https://http2.mlstatic.com/D_NQ_NP_2X_740281-MLA87862101915_072025-F.webp', compatibleBrands: ['Benelli TRK 251'] },
  { 
    id: '35', 
    name: 'Manoplas Puños Grips Moto Enduro Motocross', 
    category: 'MOTO', 
    subcategory: 'Manubrios', 
    price: 28000, 
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_800511-MLA84771721652_052025-F.webp',
    gallery: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_748147-MLA92012797495_092025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_988353-MLA85070370913_052025-F.webp'
    ],
    compatibleBrands: ['Universal'],
    colors: ['Verde', 'Azul', 'Naranja']
  },

  // MOTO - Repuestos de Motor
  { 
    id: '36', 
    name: 'Mangueras Japonesas Radiador Honda Crf 250 2010 Al 2013 Rojo', 
    category: 'MOTO', 
    subcategory: 'Mangueras', 
    price: 95000, 
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_811917-MLA93615442404_102025-F.webp', 
    compatibleBrands: ['Honda']
  },

  // MOTO - Ruedas
  { id: '25', name: 'Llanta Delantera Voge 300 DS Original Negro', category: 'MOTO', subcategory: 'Llantas', price: 380000, stock: 5, image: 'https://http2.mlstatic.com/D_NQ_NP_2X_828958-MLA93617964296_102025-F.webp', compatibleBrands: ['Voge 300 DS'] },

  // MOTO - Tanque
  { 
    id: '30', 
    name: 'Tapa De Tanque Yamaha Yfz 450 Banshee Blaster Raptor 250 350', 
    category: 'MOTO', 
    subcategory: 'Tapas', 
    price: 68000, 
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_713487-MLA90284223504_082025-F.webp',
    gallery: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_788385-MLA90669262877_082025-F.webp',
    ],
    compatibleBrands: ['Yamaha']
  },
  { 
    id: '31', 
    name: 'Tapa De Tanque Combustible Kawasaki Kxf 250 450 Aluminio', 
    category: 'MOTO', 
    subcategory: 'Tapas', 
    price: 60000, 
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_616550-MLA95865318564_102025-F.webp',
    gallery: [
    
    ],
    compatibleBrands: ['Kawasaki']
  },
  { 
    id: '32', 
    name: 'Tapa De Tanque Combustible Motomel X3m 125 Skua Xtreme 125', 
    category: 'MOTO', 
    subcategory: 'Tapas', 
    price: 22000, 
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_737972-MLA91122238454_092025-F.webp',
    gallery: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_965759-MLA92383701543_092025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_737243-MLA89082584923_072025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_753110-MLA93307047793_092025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_856364-MLA89952433441_082025-F.webp'
    ],
    compatibleBrands: ['Motomel']
  },
  {
    id: '48',
    name: 'Manoplas Italianas Ktm Exc Sx F Enduro Cross Puños Grips',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 34000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_715214-MLA92398810178_092025-F.webp',
    compatibleBrands: ['KTM', 'Universal']
  },
  {
    id: '49',
    name: 'Manoplas Grip + Acelerador Ktm Sxf Sx Exc Excf 2016 A 2022 Naranja - Gris',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 45000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_761034-MLA95089524512_102025-F.webp',
    gallery: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_772787-MLA95525930241_102025-F.webp'
    ],
    compatibleBrands: ['KTM'],
    colors: ['Naranja', 'Negro']
  },
  {
    id: '51',
    name: 'Cachas Laterales Tapa Filtro Ktm Exc F Sx F Xc F 2019 A 2023 Azul/ Naranja',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 102000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_687815-MLA93549794966_102025-F.webp',
    compatibleBrands: ['KTM'],
    colors: ['Azul', 'Naranja']
  },
  {
    id: '52',
    name: 'Guardabarro Delantero Honda Crf 250 450 2021 Al 2026 Rojo Delantero',
    category: 'MOTO',
    subcategory: 'Guardabarro Delantero',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_788649-MLA101882345023_122025-F.webp',
    compatibleBrands: ['Honda', 'CRF'],
    colors: ['Rojo']
  },
  {
    id: '53',
    name: 'Guardabarro Delantero Ktm Exc Excf Sxf 2013 A 2016 Negro',
    category: 'MOTO',
    subcategory: 'Guardabarro Delantero',
    price: 67500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_733922-MLA91030704424_092025-F.webp',
    compatibleBrands: ['KTM'],
    colors: ['Negro']
  },
  {
    id: '54',
    name: 'Guardabarro Trasero Ktm Exc F Xc W Xcf W 2020 Al 2023',
    category: 'MOTO',
    subcategory: 'Guardabarro Trasero',
    price: 67500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_619690-MLA91121305370_092025-F.webp',
    compatibleBrands: ['KTM']
  },
  {
    id: '55',
    name: 'Guardabarro Delantero Yamaha Yz Yzf Wrf 2020 Al 2026 Azul',
    category: 'MOTO',
    subcategory: 'Guardabarro Delantero',
    price: 76500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_863427-MLA91034108420_092025-F.webp',
    compatibleBrands: ['Yamaha'],
    colors: ['Azul']
  },
  {
    id: '56',
    name: 'Guardabarro Trasero Honda Crf 250 R 450 R 2021 Al 2026 Negro Trasero',
    category: 'MOTO',
    subcategory: 'Guardabarro Trasero',
    price: 100000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_603843-MLA101304520562_122025-F.webp',
    compatibleBrands: ['Honda'],
    colors: ['Negro']
  },
  {
    id: '57',
    name: 'Placa Porta Numero Yamaha Yz 250 F 125 450 2018 Al 2022 Azul Azul',
    category: 'MOTO',
    subcategory: 'Porta Número',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_854914-MLA101890399487_122025-F.webp',
    compatibleBrands: ['Yamaha'],
    colors: ['Azul']
  },
  {
    id: '58',
    name: 'Cubre Barrales Suspension Husqvarna Fc Fx Fe S Tc Te Tx',
    category: 'MOTO',
    subcategory: 'Cubre Barrales',
    price: 72750,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_996945-MLA91539956805_092025-F.webp',
    compatibleBrands: ['Husqvarna']
  },
  {
    id: '59',
    name: 'Guardabarro Delantero Ktm Exc F Sx F Xcf 2017 - 2023 Naranja Delantero',
    category: 'MOTO',
    subcategory: 'Guardabarro Delantero',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_779153-MLA101671128815_122025-F.webp',
    compatibleBrands: ['KTM'],
    colors: ['Naranja']
  },
  {
    id: '60',
    name: 'Cachas Aletas Cubre Tanque Kawasaki Kxf 450 2012 Al 2015 Blanco',
    category: 'MOTO',
    subcategory: 'Aletas de Tanque',
    price: 61110,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_647413-MLA93971993365_102025-F.webp',
    compatibleBrands: ['Kawasaki'],
    colors: ['Blanco']
  },
  {
    id: '61',
    name: 'Cachas Aletas Cubre Tanque Kawasaki Kxf 250 2013 Al 2016 Negro',
    category: 'MOTO',
    subcategory: 'Aletas de Tanque',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_867735-MLA93550668636_102025-F.webp',
    compatibleBrands: ['Kawasaki'],
    colors: ['Negro']
  },
  {
    id: '62',
    name: 'Guardabarro Delantero Kawasaki Kxf 2013 Al 2016 Negro',
    category: 'MOTO',
    subcategory: 'Guardabarro Delantero',
    price: 63000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_843332-MLA91032917948_092025-F.webp',
    compatibleBrands: ['Kawasaki'],
    colors: ['Negro']
  },
  {
    id: '63',
    name: 'Guardabarro Delantero Suzuki Rmz 2008 Al 2018 Blanco',
    category: 'MOTO',
    subcategory: 'Guardabarro Delantero',
    price: 65475,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_678393-MLA91033817880_092025-F.webp',
    compatibleBrands: ['Suzuki'],
    colors: ['Blanco']
  },
  {
    id: '64',
    name: 'Cachas Aletas Cubre Tanque Kawasaki Kx F 250 2017 Al 2020 Negro',
    category: 'MOTO',
    subcategory: 'Aletas de Tanque',
    price: 61110,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_899813-MLA93552020712_102025-F.webp',
    compatibleBrands: ['Kawasaki'],
    colors: ['Negro']
  },
  {
    id: '65',
    name: 'Cachas Portanumero Lateral Husqvarna Fe Fc Fx Te Tc 19 - 23 Blanco',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 74690,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_666253-MLA93973670115_102025-F.webp',
    compatibleBrands: ['Husqvarna'],
    colors: ['Blanco']
  },
  {
    id: '66',
    name: 'Cubre Barrales Protectores Suspension Suzuki Rmz 2018 2023',
    category: 'MOTO',
    subcategory: 'Cubre Barrales',
    price: 55000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_731027-MLA79997016125_102024-F.webp',
    compatibleBrands: ['Suzuki']
  },
  {
    id: '67',
    name: 'Cachas Portanumero Lateral Honda Crf 250 450 2021 - 2024 Negro',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 110000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_840471-MLA101884352053_122025-F.webp',
    compatibleBrands: ['Honda'],
    colors: ['Negro']
  },
  {
    id: '68',
    name: 'Guardabarro Trasero Ktm Exc Y Exc - F 2020 Al 2023 Blanco Trasero',
    category: 'MOTO',
    subcategory: 'Guardabarro Trasero',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_782420-MLA102373248434_122025-F.webp',
    compatibleBrands: ['KTM'],
    colors: ['Blanco']
  },
  {
    id: '69',
    name: 'Cachas Aletas Cubre Tanque Ktm Exc F Sx F Xc Wf 2019 Al 2023 Naranja',
    category: 'MOTO',
    subcategory: 'Aletas de Tanque',
    price: 120000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_819259-MLA101165509480_122025-F.webp',
    compatibleBrands: ['KTM'],
    colors: ['Naranja']
  },
  {
    id: '70',
    name: 'Cubre Barrales Suspension Yamaha Yz F 250 450 2015 Al 2023',
    category: 'MOTO',
    subcategory: 'Cubre Barrales',
    price: 110000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_702086-MLA101386443538_122025-F.webp',
    compatibleBrands: ['Yamaha']
  },
  {
    id: '71',
    name: 'Cachas Portanumero Lateral Kawasaki Kxf 250 450 2012 Al 2016 Blanco',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 65475,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_878451-MLA93550441450_102025-F.webp',
    compatibleBrands: ['Kawasaki'],
    colors: ['Blanco']
  },
  {
    id: '72',
    name: 'Cachas Aletas De Tanque Suzuki Rmz 450 2008 Al 2017 Radiador Amarillo',
    category: 'MOTO',
    subcategory: 'Aletas de Tanque',
    price: 67900,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_851584-MLA93971619371_102025-F.webp',
    compatibleBrands: ['Suzuki'],
    colors: ['Amarillo']
  },
  {
    id: '73',
    name: 'Cachas Portanumero Lateral Kawasaki Kxf 250 450 2012 Al 2016 Negro',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 67500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_786490-MLA93970284743_102025-F.webp',
    compatibleBrands: ['Kawasaki'],
    colors: ['Negro']
  },
  {
    id: '74',
    name: 'Cachas Portanumero Laterales Kawasaki Kxf 250 450 2012 2016 Negro',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 58500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_810570-MLA93966800211_102025-F.webp',
    compatibleBrands: ['Kawasaki'],
    colors: ['Negro']
  },
  {
    id: '75',
    name: 'Cubre Barrales Suspension Ktm Husqvarna Gasgas Stark Varg',
    category: 'MOTO',
    subcategory: 'Cubre Barrales',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_769933-MLA101661440237_122025-F.webp',
    compatibleBrands: ['KTM', 'Husqvarna', 'Gas Gas']
  },
  {
    id: '76',
    name: 'Soporte Top Case Givi Ktm Adventure 390 2020 2024',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 110000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_875804-MLA93604769496_102025-F.webp',
    compatibleBrands: ['KTM', 'Adventure 390'],
    colors: ['Negro']
  },
  {
    id: '77',
    name: 'Soporte Baul Trasero Portaequip C/base Honda Nc 750x 21 - 26',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 350000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_756569-MLA102062455292_122025-F.webp',
    compatibleBrands: ['Honda', 'NC 750X'],
    colors: ['Negro']
  },
  {
    id: '78',
    name: 'Base Original Givi M6m Baules Monolock Con Porta U',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 85000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_977197-MLA101936617562_122025-F.webp',
    compatibleBrands: ['Universal', 'Givi'],
    colors: ['Negro']
  },
  {
    id: '79',
    name: 'Aletas Tanque Kawasaki Kx 125 250 Cubre Radiador 2003 2008 Verde',
    category: 'MOTO',
    subcategory: 'Aletas de Tanque',
    price: 115500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_649586-MLA93547074192_102025-F.webp',
    compatibleBrands: ['Kawasaki', 'KX 125', 'KX 250'],
    colors: ['Verde']
  },
  {
    id: '80',
    name: 'Placa Porta Numero Honda Crf 250 450 2021 Al 2026 Negro Rojo',
    category: 'MOTO',
    subcategory: 'Porta Número',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_986533-MLA101884844607_122025-F.webp',
    compatibleBrands: ['Honda', 'CRF'],
    colors: ['Negro', 'Rojo']
  },
  {
    id: '81',
    name: 'Cachas Aletas Cubre Tanque Suzuki Rmz 250 450 2018 Al 2025 Amarillo/ Azul',
    category: 'MOTO',
    subcategory: 'Aletas de Tanque',
    price: 52000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_898579-MLA93545718318_102025-F.webp',
    compatibleBrands: ['Suzuki', 'RMZ'],
    colors: ['Amarillo', 'Azul']
  },
  {
    id: '82',
    name: 'Cachas Aletas Cubre Tanque Yamaha Yzf Yzfx Wrf 2018 Al 2024 Azul',
    category: 'MOTO',
    subcategory: 'Aletas de Tanque',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_673147-MLA93969917857_102025-F.webp',
    compatibleBrands: ['Yamaha', 'YZF', 'YZFX', 'WRF'],
    colors: ['Azul']
  },
  {
    id: '83',
    name: 'Cacha Cubre Tanque Filtrera Yamaha Yzf 450 2018 Azul',
    category: 'MOTO',
    subcategory: 'Aletas de Tanque',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_988100-MLA93722917650_102025-F.webp',
    compatibleBrands: ['Yamaha', 'YZF 450'],
    colors: ['Azul']
  },
  {
    id: '84',
    name: 'Cacha Tapa Filtro Ktm Exc F Sxf Xc F W 2019 - 2023 Naranja Naranja',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 98000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_788011-MLA101667356359_122025-F.webp',
    compatibleBrands: ['KTM'],
    colors: ['Naranja']
  },
  {
    id: '85',
    name: 'Guardabarro Trasero Yamaha Wrf Yzf X 2018 Al 2024 Dorado Trasero',
    category: 'MOTO',
    subcategory: 'Guardabarro Trasero',
    price: 100000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_741708-MLA101174939972_122025-F.webp',
    compatibleBrands: ['Yamaha'],
    colors: ['Dorado']
  },
  {
    id: '86',
    name: 'Tuercas De Cachas Plasticas Voge 300 Ds Plateado',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 8000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_814384-MLA94053086706_102025-F.webp',
    compatibleBrands: ['Voge', '300 DS'],
    colors: ['Plata']
  },
  {
    id: '87',
    name: 'Manija Palanca De Embrague Honda Crf 250 450 2009 Al 2017 Plateado',
    category: 'MOTO',
    subcategory: 'Palancas',
    price: 65500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_806367-MLA95532165602_102025-F.webp',
    compatibleBrands: ['Honda', 'CRF'],
    colors: ['Plata']
  },
  {
    id: '88',
    name: 'Union De Defensas De Tanque Royal Enfield Himalayan Bs6',
    category: 'MOTO',
    subcategory: 'Defensas',
    price: 60000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_976723-MLA95405949400_102025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan'],
    colors: ['Negro']
  },
  {
    id: '89',
    name: 'Soporte Baul Portaequipaje Bajaj Dominar 200 250 23 - 24 Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 130000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_653738-MLA93836970860_102025-F.webp',
    compatibleBrands: ['Bajaj', 'Dominar'],
    colors: ['Negro']
  },
  {
    id: '90',
    name: 'Soporte De Baul Parrilla Vespa Lx 50 125 150 2005 A 2009 Cromado',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 60000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_819003-MLA83208313009_032025-F.webp',
    compatibleBrands: ['Vespa'],
    colors: ['Cromado']
  },
  {
    id: '91',
    name: 'Cubre Barrales Protectores Suspension Honda Crf 250 450',
    category: 'MOTO',
    subcategory: 'Cubre Barrales',
    price: 110000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_993585-MLA101304576480_122025-F.webp',
    compatibleBrands: ['Honda', 'CRF 250', 'CRF 450']
  },
  {
    id: '92',
    name: 'Guardabarros Corta Spray Yamaha Mt 07 Tracer 2016 - 2017 Trasera',
    category: 'MOTO',
    subcategory: 'Guardabarro Trasero',
    price: 210000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_889942-MLA101895282111_122025-F.webp',
    compatibleBrands: ['Yamaha', 'MT 07', 'Tracer']
  },
  {
    id: '93',
    name: 'Cacha Tapa Filtro Ktm Exc F Sxf Xc F W 2019 - 2023 Blanco Blanco',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 98000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_951726-MLA101169395750_122025-F.webp',
    compatibleBrands: ['KTM'],
    colors: ['Blanco']
  },
  {
    id: '94',
    name: 'Cacha Tapa Filtro Ktm Exc F Sx F 2023 - 2024 Blanco Blanco',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 98000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_819655-MLA101671175479_122025-F.webp',
    compatibleBrands: ['KTM'],
    colors: ['Blanco']
  },
  {
    id: '95',
    name: 'Cachas Aletas Cubre Tanque Yamaha Yzf Yzf X Wrf 2018 Al 2024 Dorado Oscuro',
    category: 'MOTO',
    subcategory: 'Aletas de Tanque',
    price: 120000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_800426-MLA101173461104_122025-F.webp',
    compatibleBrands: ['Yamaha'],
    colors: ['Dorado']
  },
  {
    id: '96',
    name: 'Guardabarro Trasero Ktm Sx F Xc Exc F 2019 Al 2023 Celeste Trasero',
    category: 'MOTO',
    subcategory: 'Guardabarro Trasero',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_905296-MLA101663995159_122025-F.webp',
    compatibleBrands: ['KTM'],
    colors: ['Azul']
  },
  {
    id: '97',
    name: 'Cacha Cubre Tanque Filtrera Yamaha Yzf 450 2018 Dorado Dorado Oscuro',
    category: 'MOTO',
    subcategory: 'Aletas de Tanque',
    price: 120000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_969683-MLA101174937362_122025-F.webp',
    compatibleBrands: ['Yamaha', 'YZF 450'],
    colors: ['Dorado']
  },
  {
    id: '98',
    name: 'Cachas Portanumero Lateral Ktm Exc F Sxf Xcf W 2019 A 2023 Celeste',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 110000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_844585-MLA101664176469_122025-F.webp',
    compatibleBrands: ['KTM'],
    colors: ['Azul']
  },
  {
    id: '99',
    name: 'Cachas Portanumero Lateral Yamaha Wrf Yzf Yzf X 2018 Al 2024 Dorado Oscuro',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 110000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_605095-MLA101173336606_122025-F.webp',
    compatibleBrands: ['Yamaha'],
    colors: ['Dorado']
  },
  {
    id: '100',
    name: 'Manoplas Puños Grips Yamaha Mt 03 07 09 125 Fz 160 250 3.0 Azul',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 34000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_674861-MLA93551682194_102025-F.webp',
    compatibleBrands: ['Yamaha', 'MT', 'FZ'],
    colors: ['Azul']
  },
  {
    id: '101',
    name: 'Guardabarros Corta Spray Kawasaki Versys 650 2015 - 2021',
    category: 'MOTO',
    subcategory: 'Guardabarro Trasero',
    price: 115500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_798744-MLA82451498184_022025-F.webp',
    compatibleBrands: ['Kawasaki', 'Versys 650']
  },
  {
    id: '102',
    name: 'Manija De Embrague Con Descompresor Kxf Klx Rmz Dr Xr Wrf Yz',
    category: 'MOTO',
    subcategory: 'Palancas',
    price: 78000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_795598-MLA81945058619_012025-F.webp',
    compatibleBrands: ['Kawasaki', 'Suzuki', 'Honda', 'Yamaha']
  },
  {
    id: '103',
    name: 'Barra Agarre Porta Equipaje Yamaha Rx 100 Original Pasajero Cromado',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 45000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_712255-MLA93635625514_102025-F.webp',
    compatibleBrands: ['Yamaha', 'RX 100'],
    colors: ['Cromado']
  },
  {
    id: '104',
    name: 'Visor De Repuesto Casco Givi Hx01 Tourer Vidrio Lente Transp Transparente',
    category: 'PILOTO',
    subcategory: 'Cascos',
    price: 37500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_883521-MLA94004440809_102025-F.webp',
    compatibleBrands: ['Givi'],
    colors: ['Transparente']
  },
  {
    id: '105',
    name: 'Kit Tornillos Cachas Skua Xtz Zr Td Triax 150 Enduro Motard Azul',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 35000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_748204-MLA81556000757_122024-F.webp',
    compatibleBrands: ['Skua', 'XTZ', 'Triax', 'Enduro'],
    colors: ['Azul']
  },
  {
    id: '106',
    name: 'Chicler Alta Y Baja Keihin Yamaha Yz Yzf Wrf 125 250 426 450',
    category: 'MOTO',
    subcategory: 'Repuestos de Motor',
    price: 34000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_761379-MLA83080500597_032025-F.webp',
    compatibleBrands: ['Yamaha', 'Keihin']
  },
  {
    id: '107',
    name: 'Tuercas De Cachas Plasticas Carenado Benelli Trk 251 Negro',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 8500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_839779-MLA93658641932_102025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251'],
    colors: ['Negro']
  },
  {
    id: '108',
    name: 'X2 Hebilla Completa Bota Acerbis X Pro V Shark Cross Enduro',
    category: 'PILOTO',
    subcategory: 'Botas',
    price: 40000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_901692-MLA94059871197_102025-F.webp',
    compatibleBrands: ['Acerbis']
  },
  {
    id: '109',
    name: 'Kit Tornillos Arandelas Cachas Kawasaki Kdx Kmx 200 Manoplas Verde',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 43600,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_981105-MLA93663827842_102025-F.webp',
    compatibleBrands: ['Kawasaki', 'KDX', 'KMX'],
    colors: ['Verde']
  },
  {
    id: '110',
    name: 'Protector De Escape Chico Royal Enfield Himalayan Bs6',
    category: 'MOTO',
    subcategory: 'Defensas',
    price: 40000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_978779-MLA87251783146_072025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan']
  },
  {
    id: '111',
    name: 'Tornillos Caliper Delantero Benelli Trk 251 Originales',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 10000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_778453-MLA87298087325_072025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '112',
    name: 'Manija De Embrague Yzf 250 426 450 Completa Con Descompresor',
    category: 'MOTO',
    subcategory: 'Palancas',
    price: 74000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_663761-MLA81945058537_012025-F.webp',
    compatibleBrands: ['Yamaha', 'YZF']
  },
  {
    id: '113',
    name: 'Pastillas Freno Kawasaki Kle 400 500 Klr Tengai 650 Concours',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 34000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_722395-MLA79787957881_102024-F.webp',
    compatibleBrands: ['Kawasaki', 'KLR', 'KLE']
  },
  {
    id: '114',
    name: 'Filtro Aire + Aceite Y Cleaner Honda Crf 250 450 2009 A 2013',
    category: 'MOTO',
    subcategory: 'Filtros/Mantenimientos',
    price: 95000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_901972-MLA82955113325_032025-F.webp',
    compatibleBrands: ['Honda', 'CRF']
  },
  {
    id: '115',
    name: 'Cachas Porta Numero Laterales Yamaha Yz 2015 Al 2021 El Par Blanco',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 115430,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_699965-MLA93734546616_102025-F.webp',
    compatibleBrands: ['Yamaha', 'YZ'],
    colors: ['Blanco']
  },
  {
    id: '116',
    name: 'Faro Luz Completo Ktm Exc Sxf 2014 A 2019 Delantero Enduro',
    category: 'MOTO',
    subcategory: 'Faros',
    price: 140000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_722183-MLA80313575021_102024-F.webp',
    compatibleBrands: ['KTM', 'EXC', 'SXF']
  },
  {
    id: '117',
    name: 'Cachas Plasticos Daelim Liberty Roja Rojo',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_747300-MLA94007360815_102025-F.webp',
    compatibleBrands: ['Daelim', 'Liberty'],
    colors: ['Rojo']
  },
  {
    id: '118',
    name: 'Puños Grip Honda Cb Xr 150 190 250 Viaje Ruta Manopla Italia',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 34000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_971620-MLA89093108155_082025-F.webp',
    compatibleBrands: ['Honda', 'CB', 'XR']
  },
  {
    id: '119',
    name: 'Amortiguadores Traseros Daelim Liberty A Resorte Alternativo',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 35000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_795727-MLA81941802114_022025-F.webp',
    compatibleBrands: ['Daelim', 'Liberty']
  },
  {
    id: '120',
    name: 'Anclaje Repuesto Cubremanos Acerbis X Factory Endurance Negro Izquierdo/derecho',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_996260-MLA93650610848_102025-F.webp',
    compatibleBrands: ['Acerbis', 'Universal'],
    colors: ['Negro']
  },
  {
    id: '121',
    name: 'Corta Corriente Hombre Agua Tierra Jet Ski Cuatriciclo',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 71400,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_660942-MLA79040754462_092024-F.webp',
    compatibleBrands: ['Universal']
  },
  {
    id: '122',
    name: 'Soportes Anclajes 28mm Repuesto Cubremanos Aluminio Gris Izquierdo/derecho',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 40000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_713757-MLA93639255020_102025-F.webp',
    compatibleBrands: ['Universal'],
    colors: ['Gris']
  },
  {
    id: '123',
    name: 'Soporte Caliper De Freno Delantero Voge 300 Ds Anclaje',
    category: 'MOTO',
    subcategory: 'Calipers',
    price: 25000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_896259-MLA87928295171_072025-F.webp',
    compatibleBrands: ['Voge', '300 DS']
  },
  {
    id: '124',
    name: 'Manoplas Grip + Acelerador Honda Crf 250 450 R X',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 45000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_692855-MLA81944945797_012025-F.webp',
    compatibleBrands: ['Honda', 'CRF']
  },
  {
    id: '125',
    name: 'Junta Union Medio Escape Yamaha Wr 250x Suzuki Drz 400 S Sm',
    category: 'MOTO',
    subcategory: 'Juntas',
    price: 36750,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_861573-MLA80647665286_112024-F.webp',
    compatibleBrands: ['Yamaha', 'Suzuki']
  },
  {
    id: '126',
    name: 'Guiño Trasero Benelli Trk 251',
    category: 'MOTO',
    subcategory: 'Faros',
    price: 65000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_738952-MLA90071500138_082025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '127',
    name: 'Pedalin Posapie Delantero Derecho Benelli Trk 251',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 36000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_746206-MLA87529516078_072025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '128',
    name: 'Cacha Lateral De Guardabarro Delantero Benelli Trk 251 Der Blanco',
    category: 'MOTO',
    subcategory: 'Guardabarro Delantero',
    price: 73600,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_858236-MLA93712918192_102025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251'],
    colors: ['Blanco']
  },
  {
    id: '129',
    name: 'Cubre Disco De Freno Delant Stark Future Varg Cross Enduro',
    category: 'MOTO',
    subcategory: 'Cubre Disco',
    price: 150000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_655994-MLA89825119828_082025-F.webp',
    compatibleBrands: ['Stark Future Varg']
  },
  {
    id: '130',
    name: 'Pastillas Freno Trasero Yamaha Yfz 450 Raptor 700 2024 Sbs',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_940716-MLA79787575609_102024-F.webp',
    compatibleBrands: ['Yamaha', 'YFZ 450', 'Raptor 700']
  },
  {
    id: '131',
    name: 'Suzuki Dr 350 Protector Cubre Tapa Filtro Aceite Defensa Lat',
    category: 'MOTO',
    subcategory: 'Defensas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_714433-MLA79244354454_092024-F.webp',
    compatibleBrands: ['Suzuki', 'DR 350']
  },
  {
    id: '132',
    name: 'Cacha Lateral Izquierda Himalayan Bs6 Royal Enfield Original Negro',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 45000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_939333-MLA93564330512_102025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan'],
    colors: ['Negro']
  },
  {
    id: '133',
    name: 'Puños Con Tubo Acelerador Himalayan Bs6 Royal Enfield Negro',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 44000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_637968-MLA94094215493_102025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan'],
    colors: ['Negro']
  },
  {
    id: '134',
    name: 'Soportes Anclajes De Cristo Al Manubrio Benelli Trk 251',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 55000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_669953-MLA87927896933_072025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '135',
    name: 'Tapa De Tanque Cuatriciclo Atv Chino Negro',
    category: 'MOTO',
    subcategory: 'Tapas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_985028-MLA94019428451_102025-F.webp',
    compatibleBrands: ['Universal', 'ATV'],
    colors: ['Negro']
  },
  {
    id: '136',
    name: 'Eje Trasero Rueda Voge 300 Ds Original',
    category: 'MOTO',
    subcategory: 'Ruedas',
    price: 32500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_859483-MLA87356109875_072025-F.webp',
    compatibleBrands: ['Voge', '300 DS']
  },
  {
    id: '137',
    name: 'Cacha Lateral De Guardabarro Delantero Benelli Trk 251 Izq Blanco',
    category: 'MOTO',
    subcategory: 'Guardabarro Delantero',
    price: 73600,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_792884-MLA93700556980_102025-F.webp',
    compatibleBrands: ['Benelli TRK 251'],
    colors: ['Blanco']
  },
  {
    id: '138',
    name: 'Tuerca Cristo Barrales Kawasaki Kx 125 Kxf 250 450 Klx 450r',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 40000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_717481-MLA79389558415_092024-F.webp',
    compatibleBrands: ['Kawasaki']
  },
  {
    id: '139',
    name: 'Porta Patente Voge 300 Ds Guardabarro Trasero Colin',
    category: 'MOTO',
    subcategory: 'Guardabarro Trasero',
    price: 45000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_990202-MLA80120867573_102024-F.webp',
    compatibleBrands: ['Voge', '300 DS']
  },
  {
    id: '140',
    name: 'Parrilla Para Baul Trasero Scooter Kymco Dink Soporte Rack Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_896741-MLA94077312163_102025-F.webp',
    compatibleBrands: ['Kymco'],
    colors: ['Negro']
  },
  {
    id: '141',
    name: 'Cacha Base Componentes Electricos Voge 300 Ds Bajo Asiento Negro',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 30000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_935019-MLA94156884281_102025-F.webp',
    compatibleBrands: ['Voge', '300 DS'],
    colors: ['Negro']
  },
  {
    id: '142',
    name: 'Kit Tornillos Cachas Plasticos Skua Xtz Xr Triax 150 Enduro Naranja',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 40000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_836449-MLA94076360603_102025-F.webp',
    compatibleBrands: ['Skua', 'XTZ', 'XR', 'Triax'],
    colors: ['Naranja']
  },
  {
    id: '143',
    name: 'Parrilla Italiana Soporte De Baul Vespa Primavera Sprint Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 63750,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_996859-MLA94069589281_102025-F.webp',
    compatibleBrands: ['Vespa', 'Primavera', 'Sprint'],
    colors: ['Negro']
  },
  {
    id: '144',
    name: 'Eje De Rueda Delantera Benelli Trk 251 Original',
    category: 'MOTO',
    subcategory: 'Ruedas',
    price: 45000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_832017-MLA87927834383_072025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '145',
    name: 'Protector Cobertor Deposito De Freno Manijas Brembo 2015',
    category: 'MOTO',
    subcategory: 'Otros',
    price: 42000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_838360-MLA84627929024_052025-F.webp',
    compatibleBrands: ['Brembo']
  },
  {
    id: '146',
    name: 'Chicler De Alta Keihin Carburador Fcr Pwk Pwm Moto Atv Japon',
    category: 'MOTO',
    subcategory: 'Carburador',
    price: 22000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_699761-MLA78910009902_092024-F.webp',
    compatibleBrands: ['Keihin', 'FCR', 'PWK', 'PWM']
  },
  {
    id: '147',
    name: 'Pastillas De Freno Traseras Yamaha Raptor 90 Grizzly 300',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 34000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_717665-MLA79787444187_102024-F.webp',
    compatibleBrands: ['Yamaha', 'Raptor 90', 'Grizzly 300']
  },
  {
    id: '148',
    name: 'Cacha Trasera Bajo Asiento Lateral Voge 300 Ds Original',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 70000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_975210-MLA80122102579_102024-F.webp',
    compatibleBrands: ['Voge', '300 DS']
  },
  {
    id: '149',
    name: 'Kit Anclajes De Cubremanos Acerbis Profile Rally Enduro Moto Negro Izquierdo/derecho',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 39900,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_649935-MLA79148439695_092024-F.webp',
    compatibleBrands: ['Acerbis', 'Universal'],
    colors: ['Negro']
  },
  {
    id: '150',
    name: 'Guantes Ufo Hydra Motocross Enduro Mtb Moto Bici Montaña Bmx',
    category: 'PILOTO',
    subcategory: 'Indumentaria',
    price: 38500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_647208-MLA79486802347_092024-F.webp',
    gallery: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_714262-MLA79486960901_092024-F.webp'
    ],
    compatibleBrands: ['Ufo']
  },
  {
    id: '151',
    name: 'Brazo Link Amortiguador Trasero Bieleta Voge 300 Ds Original',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 63000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_818461-MLA79868894568_102024-F.webp',
    compatibleBrands: ['Voge', '300 DS']
  },
  {
    id: '152',
    name: 'Guardabarro Trasero Suzuki Rmz 250 2010 Al 2018 Amarillo',
    category: 'MOTO',
    subcategory: 'Guardabarro Trasero',
    price: 80000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_809065-MLA87457260253_072025-F.webp',
    compatibleBrands: ['Suzuki', 'RMZ'],
    colors: ['Amarillo']
  },
  {
    id: '153',
    name: 'Junta Union Medio Escape Honda Crf 150 250 450 Xr 250 400',
    category: 'MOTO',
    subcategory: 'Juntas',
    price: 36750,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_932782-MLA79414264228_092024-F.webp',
    compatibleBrands: ['Honda', 'CRF', 'XR']
  },
  {
    id: '154',
    name: 'Comando Luces Switch Izquierdo Trk-251 Benelli',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 83000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_919513-MLA86606975729_062025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '155',
    name: 'Puños Grip Italia Cromados Custom Chopper Cafe Racer Bobber Azul',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 40000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_731981-MLA94036375209_102025-F.webp',
    compatibleBrands: ['Universal'],
    colors: ['Azul']
  },
  {
    id: '156',
    name: 'Refuerzo De Colin Guardabarro Trasero Benelli Trk 251 Negro',
    category: 'MOTO',
    subcategory: 'Guardabarro Trasero',
    price: 45000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_836855-MLA94062819075_102025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251'],
    colors: ['Negro']
  },
  {
    id: '157',
    name: 'Kit Manijas Suzuki Dr 350 250 C/ Descompresor Freno Embrague',
    category: 'MOTO',
    subcategory: 'Palancas',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_836811-MLA82455793010_022025-F.webp',
    compatibleBrands: ['Suzuki', 'DR 350', 'DR 250']
  },
  {
    id: '158',
    name: 'Soportes De Faro Delantero Voge 300 Ds Orginal Ambos Lados',
    category: 'MOTO',
    subcategory: 'Faros',
    price: 10000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_988717-MLA86896711978_072025-F.webp',
    compatibleBrands: ['Voge', '300 DS']
  },
  {
    id: '159',
    name: 'Anclaje Repuesto Cubremanos Acerbis Ufo Alma Aluminio 28mm Gris Izquierdo/derecho',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_951532-MLA93667273684_102025-F.webp',
    compatibleBrands: ['Acerbis', 'Ufo'],
    colors: ['Gris']
  },
  {
    id: '160',
    name: 'Asiento Original Benelli Trk 251 Trasero Acompañante Negro',
    category: 'MOTO',
    subcategory: 'Asientos',
    price: 80000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_815626-MLA93605995864_102025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251'],
    colors: ['Negro']
  },
  {
    id: '161',
    name: 'Asiento Original Benelli Trk 251 Delantero Conductor Negro',
    category: 'MOTO',
    subcategory: 'Asientos',
    price: 80000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_606305-MLA94054965283_102025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251'],
    colors: ['Negro']
  },
  {
    id: '162',
    name: 'Embellecedor Soporte De Tablero Velocimetro Re Himalayan Bs6',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 30000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_611300-MLA88725365084_072025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan']
  },
  {
    id: '163',
    name: 'Cachas Laterales Kayo K6 Filtrera Blanca Completa Motocross Blanco',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 64000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_731545-MLA94152819303_102025-F.webp',
    compatibleBrands: ['Kayo', 'K6'],
    colors: ['Blanco']
  },
  {
    id: '164',
    name: 'Tensor De Horquillon Cadena Transmision Voge 300 Ds',
    category: 'MOTO',
    subcategory: 'Transmisión',
    price: 25000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_955114-MLA89073492185_072025-F.webp',
    compatibleBrands: ['Voge', '300 DS']
  },
  {
    id: '165',
    name: 'Pastillas De Freno Trasero Yamaha Yz Yzf Wrf 125 250 450',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_688333-MLA82767776658_032025-F.webp',
    compatibleBrands: ['Yamaha']
  },
  {
    id: '166',
    name: 'Cacha Lateral Derecha Benelli Trk 251 Negro',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 83000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_648208-MLA94049975611_102025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251'],
    colors: ['Negro']
  },
  {
    id: '167',
    name: 'Kit Manijas Rebatibles Honda Crf 250 450 Con Descompresor',
    category: 'MOTO',
    subcategory: 'Palancas',
    price: 125000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_931186-MLA89940292993_082025-F.webp',
    compatibleBrands: ['Honda', 'CRF']
  },
  {
    id: '168',
    name: 'Tapas Motor Husqvarna Fe Fc 450 501 2017 Al 2023',
    category: 'MOTO',
    subcategory: 'Cubre Motor',
    price: 100000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_713995-MLA78961768596_092024-F.webp',
    compatibleBrands: ['Husqvarna']
  },
  {
    id: '169',
    name: 'Parabrisas Givi Air Flow Kawasaki Versys 650 Y Versys 1000',
    category: 'MOTO',
    subcategory: 'Parabrisas',
    price: 148000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_696740-MLA82453844250_022025-F.webp',
    compatibleBrands: ['Kawasaki', 'Versys']
  },
  {
    id: '170',
    name: 'Repuesto Hebillas Bota X-move 2.0 Acerbis',
    category: 'PILOTO',
    subcategory: 'Botas',
    price: 43000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_901692-MLA94059871197_102025-F.webp',
    compatibleBrands: ['Acerbis']
  },
  {
    id: '171',
    name: 'Gomas Antivibradoras Soporte Manubrio Voge 300 Ds Original Negro',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 30000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_961290-MLA93690529494_102025-F.webp',
    compatibleBrands: ['Voge', '300 DS'],
    colors: ['Negro']
  },
  {
    id: '172',
    name: 'Cubre Carter Chapón Original Himalayan Bs6 Royal Enfield',
    category: 'MOTO',
    subcategory: 'Cubre Carter',
    price: 120000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_834676-MLA91296186803_082025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan']
  },
  {
    id: '173',
    name: 'Ojo De Gato Trasero Voge 300 Ds Original Ambos Lados Rojo',
    category: 'MOTO',
    subcategory: 'Faros',
    price: 8000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_660018-MLA87220261097_072025-F.webp',
    compatibleBrands: ['Voge', '300 DS'],
    colors: ['Rojo']
  },
  {
    id: '174',
    name: 'Refuerzo De Colin Guardabarro Trasero Benelli Trk 251 Negro',
    category: 'MOTO',
    subcategory: 'Guardabarro Trasero',
    price: 45000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_944752-MLA94092532943_102025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251'],
    colors: ['Negro']
  },
  {
    id: '175',
    name: 'Sensor Abs Voge 300 Ds Original',
    category: 'MOTO',
    subcategory: 'Otros',
    price: 110000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_701555-MLA86897738142_072025-F.webp',
    compatibleBrands: ['Voge', '300 DS']
  },
  {
    id: '176',
    name: 'Kit Manijas Y Manoplas Suzuki Dr 350 250 Puño Varios Colores',
    category: 'MOTO',
    subcategory: 'Palancas',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_892589-MLA89117648544_082025-F.webp',
    compatibleBrands: ['Suzuki', 'DR 350', 'DR 250']
  },
  {
    id: '177',
    name: 'Pastillas Delanteras Metalicas Voge 500 R Ds 650 Ds',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 45000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_675007-MLA84161738299_042025-F.webp',
    compatibleBrands: ['Voge', '500 R', '500 DS', '650 DS']
  },
  {
    id: '178',
    name: 'Resorte Embrague Centrifugo Daelim Liberty 50 Original',
    category: 'MOTO',
    subcategory: 'Transmisión',
    price: 17640,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_868219-MLA89467795790_082025-F.webp',
    compatibleBrands: ['Daelim', 'Liberty 50']
  },
  {
    id: '179',
    name: 'Palanca Llave Saca Cubiertas Drc Moto Enduro Motocross',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 40000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_843560-MLA80647665786_112024-F.webp',
    compatibleBrands: ['Universal', 'Drc']
  },
  {
    id: '180',
    name: 'Roce De Cadena Moto Voge 300 Ds Ac 300r',
    category: 'MOTO',
    subcategory: 'Guía Desliza Cadena',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_737903-MLA80954526508_122024-F.webp',
    compatibleBrands: ['Voge', '300 DS', '300r']
  },
  {
    id: '181',
    name: 'Protector De Escape Curvo Royal Enfield Himalayan Scram 411',
    category: 'MOTO',
    subcategory: 'Defensas',
    price: 12000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_988684-MLA89077203937_072025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan', 'Scram 411']
  },
  {
    id: '182',
    name: 'Piñon Transmisión Honda Japon Ez 90 Cb Xl 100 125 Cm200 Twin',
    category: 'MOTO',
    subcategory: 'Piñones',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_853177-MLA79359952825_092024-F.webp',
    compatibleBrands: ['Honda', 'Ez 90', 'Cb 100', 'Xl 125']
  },
  {
    id: '183',
    name: 'Kit Juego Aros De Pistón Kawasaki Kz 200 Klt 200 Japon Kz200',
    category: 'MOTO',
    subcategory: 'Pistón',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_748561-MLA79391346395_092024-F.webp',
    compatibleBrands: ['Kawasaki', 'KZ 200', 'KLT 200']
  },
  {
    id: '184',
    name: 'Cacha Lateral Izquierda Benelli Trk 251 Negro',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 94500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_804216-MLA80659410422_112024-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251'],
    colors: ['Negro']
  },
  {
    id: '185',
    name: 'Tuerca Cristo Barral Suzuki Rmz Rmx 250 450 Drz 400 V-strom',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 42000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_679623-MLA79996978971_102024-F.webp',
    compatibleBrands: ['Suzuki', 'RMZ', 'RMX', 'DRZ', 'V-strom']
  },
  {
    id: '186',
    name: 'Soportes Anclajes Repuesto Cubremanos Acerbis Ufo Aluminio Gris Izquierdo/derecho',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 55000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_674123-MLA93650674848_102025-F.webp',
    compatibleBrands: ['Acerbis', 'Ufo'],
    colors: ['Gris']
  },
  {
    id: '187',
    name: 'Cachas Laterales Royal Enfield Himalayan Bs6 Negro Mate Negro',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 160000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_724988-MLA93974779465_102025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan'],
    colors: ['Negro Mate', 'Negro']
  },
  {
    id: '188',
    name: 'Pastillas De Freno Delanteras Benelli Tnt15 Gilera Vc 150',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 45000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_782625-MLA79255971177_092024-F.webp',
    compatibleBrands: ['Benelli', 'TNT 15', 'Gilera', 'VC 150']
  },
  {
    id: '189',
    name: 'Visor De Repuesto Casco Acerbis Active Vidrio Lente Transp Transparente',
    category: 'PILOTO',
    subcategory: 'Cascos',
    price: 35000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_954583-MLA93634163072_102025-F.webp',
    compatibleBrands: ['Acerbis'],
    colors: ['Transparente']
  },
  {
    id: '190',
    name: 'Cubre Disco De Freno Delantero Husqvarna Fe Fc Fx Tc Te Tx',
    category: 'MOTO',
    subcategory: 'Cubre Disco',
    price: 150000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_958710-MLA84612537829_052025-F.webp',
    compatibleBrands: ['Husqvarna']
  },
  {
    id: '191',
    name: 'Tapa Deposito Liquido De Freno Yamaha Yz 85 125 250 2t Azul',
    category: 'MOTO',
    subcategory: 'Otros',
    price: 58000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_716266-MLA80489844781_112024-F.webp',
    compatibleBrands: ['Yamaha'],
    colors: ['Azul']
  },
  {
    id: '192',
    name: 'Cubre Disco Freno Delantero Ktm Exc Excf Sxf 2024 2023 2022',
    category: 'MOTO',
    subcategory: 'Cubre Disco',
    price: 150000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_789415-MLA84612466727_052025-F.webp',
    compatibleBrands: ['KTM', 'EXC', 'SXF']
  },
  {
    id: '193',
    name: 'Tapa De Motor Carter Encendido Daelim Liberty 50 Original',
    category: 'MOTO',
    subcategory: 'Repuestos de Motor',
    price: 68250,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_876449-MLA79641851411_092024-F.webp',
    compatibleBrands: ['Daelim', 'Liberty 50']
  },
  {
    id: '194',
    name: 'Kit Anclajes De Cubremanos Acerbis Profile Rally Enduro Moto Negro Izquierdo/derecho',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 42000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_966956-MLA79786123063_102024-F.webp',
    compatibleBrands: ['Acerbis'],
    colors: ['Negro']
  },
  {
    id: '195',
    name: 'Guardabarro Trasero Voge 300 Ds Interno Original',
    category: 'MOTO',
    subcategory: 'Guardabarro Trasero',
    price: 80000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_933546-MLA88716096748_072025-F.webp',
    compatibleBrands: ['Voge', '300 DS']
  },
  {
    id: '196',
    name: 'Cubredisco Trasero Amx Ktm Exc Exc-f Sxf 2024 2023 22 21 20 Naranja',
    category: 'MOTO',
    subcategory: 'Cubre Disco',
    price: 72000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_911245-MLA94087265817_102025-F.webp',
    compatibleBrands: ['KTM', 'EXC', 'SXF'],
    colors: ['Naranja']
  },
  {
    id: '197',
    name: 'Manija Embrague Rebatible Honda Cbr 1000 Rr 954 Rr 600 Rr',
    category: 'MOTO',
    subcategory: 'Palancas',
    price: 63000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_856741-MLA78804251900_092024-F.webp',
    compatibleBrands: ['Honda', 'CBR 1000', 'CBR 600']
  },
  {
    id: '198',
    name: 'Cubre Carter Aluminio Triumph Tiger 800 Givi',
    category: 'MOTO',
    subcategory: 'Cubre Carter',
    price: 240000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_988299-MLA91126642560_092025-F.webp',
    compatibleBrands: ['Triumph', 'Tiger 800']
  },
  {
    id: '199',
    name: 'Mascara De Faro Original Suzuki Dr 350 250 Ambos Lados',
    category: 'MOTO',
    subcategory: 'Faros',
    price: 120000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_966748-MLA91137147648_092025-F.webp',
    compatibleBrands: ['Suzuki', 'DR 350', 'DR 250']
  },
  {
    id: '200',
    name: 'Soporte Tanque Nafta Auxiliar Givi Universal E163 Moto Viaje Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 280000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_666573-MLA94020682765_102025-F.webp',
    compatibleBrands: ['Universal', 'Givi'],
    colors: ['Negro']
  },
  {
    id: '201',
    name: 'Guardabarro Trasero Honda Crf 250 R 450 R 2021 Al 2026 Negro Trasero',
    category: 'MOTO',
    subcategory: 'Guardabarro Trasero',
    price: 100000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_603843-MLA101304520562_122025-F.webp',
    compatibleBrands: ['Honda', 'CRF'],
    colors: ['Negro']
  },
  {
    id: '202',
    name: 'Guardabarro Trasero Yamaha Wrf Yzf X 2018 Al 2024 Dorado Trasero',
    category: 'MOTO',
    subcategory: 'Guardabarro Trasero',
    price: 100000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_741708-MLA101174939972_122025-F.webp',
    compatibleBrands: ['Yamaha', 'WRF', 'YZF'],
    colors: ['Dorado']
  },
  {
    id: '203',
    name: 'Cubre Disco Delantero Linear Ktm Acerbis Italiano Naranja',
    category: 'MOTO',
    subcategory: 'Cubre Disco',
    price: 150000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_753348-MLA93609204822_102025-F.webp',
    compatibleBrands: ['KTM', 'Acerbis'],
    colors: ['Naranja']
  },
  {
    id: '204',
    name: 'Pedal Freno Trasero Royal Enfield Himalayan Bs6 Original',
    category: 'MOTO',
    subcategory: 'Otros',
    price: 45000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_992509-MLA89721976093_082025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan']
  },
  {
    id: '205',
    name: 'X2 Reten Bancada 14 X 30 X 7 Japon Ciclomotor Daelim 50',
    category: 'MOTO',
    subcategory: 'Repuestos de Motor',
    price: 18000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_623722-MLA79018163330_092024-F.webp',
    compatibleBrands: ['Daelim', 'Liberty 50']
  },
  {
    id: '206',
    name: 'Caliper De Freno Re Himalayan Bs6 Completo C/ Pastillas',
    category: 'MOTO',
    subcategory: 'Calipers',
    price: 85000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_770362-MLA89075285349_072025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan']
  },
  {
    id: '207',
    name: 'Vejiga Escape Original Honda Cr 125 1989',
    category: 'MOTO',
    subcategory: 'Repuestos de Motor',
    price: 260000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_793576-MLA79798259643_102024-F.webp',
    compatibleBrands: ['Honda', 'CR 125']
  },
  {
    id: '208',
    name: 'Tuercas Y Bulon Ajusta Cristo Benelli Trk 251 Direccion',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 45000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_989512-MLA87595687916_072025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '209',
    name: 'Soportes Clamp Inferior De Manubrio Voge 300 Ds Negro',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 60000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_641440-MLA93993680313_102025-F.webp',
    compatibleBrands: ['Voge', '300 DS'],
    colors: ['Negro']
  },
  {
    id: '210',
    name: 'Guardabarro Delantero Superior Benelli Trk 251',
    category: 'MOTO',
    subcategory: 'Guardabarro Delantero',
    price: 130000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_882339-MLA88050825993_072025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '211',
    name: 'Parabrisas Givi Bmw G 310 R 2017 2018 Transparente',
    category: 'MOTO',
    subcategory: 'Parabrisas',
    price: 165000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_916286-MLA93583311116_102025-F.webp',
    compatibleBrands: ['BMW', 'G 310 R', 'Givi'],
    colors: ['Transparente']
  },
  {
    id: '212',
    name: 'Soportes De Guardabarro Delanero Voge 300ds Original',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 45000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_727330-MLA87222778055_072025-F.webp',
    compatibleBrands: ['Voge', '300 DS']
  },
  {
    id: '213',
    name: 'Parrilla Porta Baul Trasero Yamaha Mt 09 Xsr 900 Reforzada Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 155000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_995306-MLA87579248487_072025-F.webp',
    compatibleBrands: ['Yamaha', 'MT 09', 'XSR 900'],
    colors: ['Negro']
  },
  {
    id: '214',
    name: 'Colin Cacha Bajo Asiento Benelli Trk 251 Blanco',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 160000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_977196-MLA93676999168_102025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251'],
    colors: ['Blanco']
  },
  {
    id: '215',
    name: 'Cable Acelerador Himalayan Bs6 Royal Enfield Original',
    category: 'MOTO',
    subcategory: 'Repuestos de Motor',
    price: 38000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_729232-MLA89592126353_082025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan']
  },
  {
    id: '216',
    name: 'Tapa De Tambor De Llave Benelli Trk 251',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 20000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_942709-MLA87718732264_072025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '217',
    name: 'Guardabarro Interno Benelli Trk 251 Cubre Cristo',
    category: 'MOTO',
    subcategory: 'Guardabarro Delantero',
    price: 34000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_658134-MLA83228008443_032025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '218',
    name: 'Protector Cubre Carter Honda Crf 250 450 Chapon Plastico',
    category: 'MOTO',
    subcategory: 'Cubre Carter',
    price: 218000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_978408-MLA89029764038_082025-F.webp',
    compatibleBrands: ['Honda', 'CRF']
  },
  {
    id: '219',
    name: 'Cacha Lateral Cubre Tanque Benelli Trk 251 Izquierda Negro',
    category: 'MOTO',
    subcategory: 'Aletas de Tanque',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_910970-MLA94085133113_102025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251'],
    colors: ['Negro']
  },
  {
    id: '220',
    name: 'Guardabarro Delantero Honda Trx 250 1997 A 2004 Recon Sport',
    category: 'MOTO',
    subcategory: 'Guardabarro Delantero',
    price: 250000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_768923-MLA79248260304_092024-F.webp',
    compatibleBrands: ['Honda', 'TRX']
  },
  {
    id: '221',
    name: 'Cable Cebador Original Royal Enfield Himalayan Bs6',
    category: 'MOTO',
    subcategory: 'Repuestos de Motor',
    price: 40000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_836649-MLA89592158487_082025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan']
  },
  {
    id: '222',
    name: 'Flexible De Freno Trasero Voge 300 Ds Del Caliper',
    category: 'MOTO',
    subcategory: 'Flexibles',
    price: 70000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_863545-MLA89073356583_072025-F.webp',
    compatibleBrands: ['Voge', '300 DS']
  },
  {
    id: '223',
    name: 'Tapa Deposito Liquido De Freno Yamaha Yzf Yz Wrf 2007 A 2018',
    category: 'MOTO',
    subcategory: 'Otros',
    price: 78000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_622357-MLA88843000099_072025-F.webp',
    compatibleBrands: ['Yamaha', 'YZF', 'WRF']
  },
  {
    id: '224',
    name: 'Guia De Cables Del Cristo Voge 300 Ds Original',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 15000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_689710-MLA87222166825_072025-F.webp',
    compatibleBrands: ['Voge', '300 DS']
  },
  {
    id: '225',
    name: 'Soporte De Flexible De Freno Voge 300 Ds Original',
    category: 'MOTO',
    subcategory: 'Flexibles',
    price: 15000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_830824-MLA86898707678_072025-F.webp',
    compatibleBrands: ['Voge', '300 DS']
  },
  {
    id: '226',
    name: 'Pastillas Freno Suzuki Gn 125 Mondial Hd 150 Zanella Hj 125',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_732618-MLA79787582479_102024-F.webp',
    compatibleBrands: ['Suzuki', 'Mondial', 'Zanella']
  },
  {
    id: '227',
    name: 'Tapas Motor Ktm Husqvarna Exc Xcw Sx Tc Te 125 150 2023 2025',
    category: 'MOTO',
    subcategory: 'Cubre Motor',
    price: 180000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_909831-MLA78944771526_092024-F.webp',
    compatibleBrands: ['KTM', 'Husqvarna']
  },
  {
    id: '228',
    name: 'Kit De Pistón Kawasaki Gto 110 Perno Aros Trabas + Regalo!',
    category: 'MOTO',
    subcategory: 'Pistón',
    price: 40000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_838699-MLA79486933521_092024-F.webp',
    compatibleBrands: ['Kawasaki']
  },
  {
    id: '229',
    name: 'Faro Luz Completo Ktm Exc Sxf 2008 A 2013 Delantero Enduro Ambos Lados',
    category: 'MOTO',
    subcategory: 'Faros',
    price: 140000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_920046-MLA83032555499_032025-F.webp',
    compatibleBrands: ['KTM']
  },
  {
    id: '230',
    name: 'Porta Equipaje Honda Twister Cb300 2009 A 2015 Porta Baul Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 78000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_921149-MLA93611597410_102025-F.webp',
    compatibleBrands: ['Honda'],
    colors: ['Negro']
  },
  {
    id: '231',
    name: 'Manija Descompresor Cuatriciclo Yamaha Yfz 450 Atv',
    category: 'MOTO',
    subcategory: 'Palancas',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_838824-MLA80086840479_102024-F.webp',
    compatibleBrands: ['Yamaha']
  },
  {
    id: '232',
    name: 'Manija Palanca De Embrague Honda Crf 250 450 2009 Al 2017 Plateado',
    category: 'MOTO',
    subcategory: 'Palancas',
    price: 65500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_635502-MLA95532165604_102025-F.webp',
    compatibleBrands: ['Honda'],
    colors: ['Plateado']
  },
  {
    id: '233',
    name: 'Cupula Parabrisas Suzuki Dl 650 V Strom 11-16 Givi Italiano',
    category: 'MOTO',
    subcategory: 'Parabrisas',
    price: 180000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_795302-MLA79168723948_092024-F.webp',
    compatibleBrands: ['Suzuki', 'Givi']
  },
  {
    id: '234',
    name: 'Cubremanos Acerbis Atv Alma De Aluminio Por Lado',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 120000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_984453-MLA88939513716_082025-F.webp',
    compatibleBrands: ['Acerbis']
  },
  {
    id: '235',
    name: 'Silenciador Interno Arresta Llama Yamaha Wrf 250 450 Escape',
    category: 'MOTO',
    subcategory: 'Repuestos de Motor',
    price: 99750,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_643164-MLA79040817307_092024-F.webp',
    compatibleBrands: ['Yamaha']
  },
  {
    id: '236',
    name: 'Cable Acelerador Original Benelli Trk 251',
    category: 'MOTO',
    subcategory: 'Repuestos de Motor',
    price: 18000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_700375-MLA86605042339_062025-F.webp',
    compatibleBrands: ['Benelli']
  },
  {
    id: '237',
    name: 'Cubre Manos 3en1 Motocross Enduro Dual Road Yamaha Husqvarna Azul Izquierdo/derecho',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 140000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_650442-MLA95088001648_102025-F.webp',
    compatibleBrands: ['Yamaha', 'Husqvarna'],
    colors: ['Azul']
  },
  {
    id: '238',
    name: 'Soporte De Baul Kawasaki Z 750 2007 Al 2014 Z 1000 07 Al 09 Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 168000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_789663-MLA93611308858_102025-F.webp',
    compatibleBrands: ['Kawasaki'],
    colors: ['Negro']
  },
  {
    id: '239',
    name: 'Kit Aros Piston Kawasaki Ke 125 +0.50mm',
    category: 'MOTO',
    subcategory: 'Pistón',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_808224-MLA79389491191_092024-F.webp',
    compatibleBrands: ['Kawasaki']
  },
  {
    id: '240',
    name: 'Pastillas Freno Honda Elite 125 Mod Nuevo Calidad Original',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_649099-MLA79540172408_102024-F.webp',
    compatibleBrands: ['Honda']
  },
  {
    id: '241',
    name: 'Pastillas Freno Kawasaki Kdx 200 Klr 250 600 650',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_606402-MLA79787796015_102024-F.webp',
    compatibleBrands: ['Kawasaki']
  },
  {
    id: '242',
    name: 'Caliper De Freno Delantero Voge 300 Ds + Pastillas Originale',
    category: 'MOTO',
    subcategory: 'Calipers',
    price: 80000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_680361-MLA87595633928_072025-F.webp',
    compatibleBrands: ['Voge 300 DS']
  },
  {
    id: '243',
    name: 'Puños Pro Grip Blanco Manoplas Moto Cross Enduro Mx Italia Blanco',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 37800,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_803744-MLA94124648001_102025-F.webp',
    compatibleBrands: ['Pro Grip'],
    colors: ['Blanco']
  },
  {
    id: '244',
    name: 'Guantes Originales De Cuero American Custom Chopper Vintage Negro M',
    category: 'PILOTO',
    subcategory: 'Indumentaria',
    price: 52500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_700588-MLA94052017201_102025-F.webp',
    compatibleBrands: ['Custom Chopper'],
    colors: ['Negro']
  },
  {
    id: '245',
    name: 'Piñón Original Daelim Liberty Ciclomotor 50 70',
    category: 'MOTO',
    subcategory: 'Piñones',
    price: 18000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_681106-MLA94106250095_102025-F.webp',
    compatibleBrands: ['Daelim', 'Liberty']
  },
  {
    id: '246',
    name: 'Marco De Tablero Velocímetro Benelli Trk 251',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 65000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_891156-MLA87031566702_072025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '247',
    name: 'Cubre Disco Kawasaki Kxf 250 450 Klx 450 Delantero',
    category: 'MOTO',
    subcategory: 'Cubre Disco',
    price: 150000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_674521-MLA84311712402_052025-F.webp',
    compatibleBrands: ['Kawasaki']
  },
  {
    id: '248',
    name: 'Comando Derecho Royal Enfield Himalayan Bs6 Original',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 82000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_965624-MLA89080026656_082025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan']
  },
  {
    id: '249',
    name: 'Cacha De Batería Y Fusibles Bajo Asiento Re Himalayan Bs6 Negro',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 45000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_874760-MLA94121314939_102025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan'],
    colors: ['Negro']
  },
  {
    id: '250',
    name: 'Soporte Caliper De Freno Royal Enfield Himalayan Bs6',
    category: 'MOTO',
    subcategory: 'Calipers',
    price: 40000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_946986-MLA89075476009_072025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan']
  },
  {
    id: '251',
    name: 'Kit Cubre Disco Kawasaki Kxf 250 450 Klx 450 Doble Protector',
    category: 'MOTO',
    subcategory: 'Cubre Disco',
    price: 180000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_796669-MLA84312426694_052025-F.webp',
    compatibleBrands: ['Kawasaki']
  },
  {
    id: '252',
    name: 'Kit Tira Hebilla Alpinestars Tech 8 Repuesto Bota Motocross',
    category: 'PILOTO',
    subcategory: 'Botas',
    price: 168000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_734322-MLA93661015574_102025-F.webp',
    compatibleBrands: ['Alpinestars', 'Tech 8']
  },
  {
    id: '253',
    name: 'Clamp Soporte Flexible Freno Zeta Kxf Klx Kx Rmz Rm Drz',
    category: 'MOTO',
    subcategory: 'Flexibles',
    price: 55000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_634884-MLA89068601795_072025-F.webp',
    compatibleBrands: ['Kawasaki', 'Suzuki']
  },
  {
    id: '254',
    name: 'Cable Embrague Voge 300 Ds Completo Original',
    category: 'MOTO',
    subcategory: 'Repuestos de Motor',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_690780-MLA79872787678_102024-F.webp',
    compatibleBrands: ['Voge', '300 DS']
  },
  {
    id: '255',
    name: 'Placa Porta Numero Ktm Sxf 2013 Al 2015 Exc F 2016 Cross Blanco',
    category: 'MOTO',
    subcategory: 'Porta Número',
    price: 75600,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_925267-MLA94102394475_102025-F.webp',
    compatibleBrands: ['KTM'],
    colors: ['Blanco']
  },
  {
    id: '256',
    name: 'Caliper De Freno Benelli Trk 251 Pastillas Nuevas Originales',
    category: 'MOTO',
    subcategory: 'Calipers',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_714721-MLA87714410598_072025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '257',
    name: 'Guardabarro Trasero Interno Benelli Trk 251',
    category: 'MOTO',
    subcategory: 'Guardabarro Trasero',
    price: 140000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_938534-MLA87717576224_072025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '258',
    name: 'Cubremanos Atv Cuatriciclo Acerbis Alma De Aluminio Yfm Trx Negro Izquierdo/derecho',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 120000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_841208-MLA94023976357_102025-F.webp',
    compatibleBrands: ['Acerbis', 'Universal', 'ATV'],
    colors: ['Negro']
  },
  {
    id: '259',
    name: 'Parabrisas Givi Air Flow Kawasaki Versys 650 - Versys 1000',
    category: 'MOTO',
    subcategory: 'Parabrisas',
    price: 190000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_696740-MLA82453844250_022025-F.webp',
    compatibleBrands: ['Kawasaki', 'Versys', 'Givi']
  },
  {
    id: '260',
    name: 'Soporte Anclaje Baules Laterales Nc 700x 750x Givi Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 283500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_660273-MLA93660234426_102025-F.webp',
    compatibleBrands: ['Honda', 'NC 700X', 'NC 750X', 'Givi'],
    colors: ['Negro']
  },
  {
    id: '261',
    name: 'Tapa De Tanque Acerbis Carga Rapida Enduro Rally Competicion Negro',
    category: 'MOTO',
    subcategory: 'Tapas',
    price: 99750,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_878413-MLA79280954317_092024-F.webp',
    compatibleBrands: ['Acerbis'],
    colors: ['Negro']
  },
  {
    id: '262',
    name: 'X4 Pastillas Freno Honda Cb 600 F N S Hornet Cbr 600f 1000f',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 50400,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_647395-MLA79746046784_102024-F.webp',
    compatibleBrands: ['Honda']
  },
  {
    id: '263',
    name: 'Defensa De Tanque Delantera Himalayan Bs6 Royal Enfield Derecho',
    category: 'MOTO',
    subcategory: 'Defensas',
    price: 210000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_649363-MLA91150144119_082025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan']
  },
  {
    id: '264',
    name: 'Pastillas Delanteras Twister Cbx 250 Yamaha Ybr 125 250 Ebc',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 42000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_723035-MLA79576724294_102024-F.webp',
    compatibleBrands: ['Honda', 'Yamaha']
  },
  {
    id: '265',
    name: 'Cubre Carter Acerbis Ktm Sx Exc Xc W 125 150 2016 Al 2023',
    category: 'MOTO',
    subcategory: 'Cubre Carter',
    price: 220000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_870975-MLA80128109856_112024-F.webp',
    compatibleBrands: ['KTM', 'Acerbis']
  },
  {
    id: '266',
    name: 'Bulbo Switch Freno Delantero Himalayan Bs6 Royal Enfield Negro',
    category: 'MOTO',
    subcategory: 'Otros',
    price: 25000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_757580-MLA93732969044_102025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan'],
    colors: ['Negro']
  },
  {
    id: '267',
    name: 'Guiño Delantero Derecho Benelli Trk251',
    category: 'MOTO',
    subcategory: 'Faros',
    price: 85000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_742690-MLA80571166711_112024-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '268',
    name: 'Filtro Aire + Aceite Y Limpiador Yamaha Yzf Wrf 250 450 Fx',
    category: 'MOTO',
    subcategory: 'Filtros/Mantenimientos',
    price: 95000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_667204-MLA89827210069_082025-F.webp',
    compatibleBrands: ['Yamaha']
  },
  {
    id: '269',
    name: 'Parabrisas Italiano Royal Enfield Meteor 350 Completo C/ Kit',
    category: 'MOTO',
    subcategory: 'Parabrisas',
    price: 210000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_832569-MLA82381862004_022025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Meteor 350']
  },
  {
    id: '270',
    name: 'Protector Ktm Duke 390 200 Accesorio Cubre Disco Delantero Negro',
    category: 'MOTO',
    subcategory: 'Cubre Disco',
    price: 115500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_862094-MLA93988263021_102025-F.webp',
    compatibleBrands: ['KTM', 'Duke'],
    colors: ['Negro']
  },
  {
    id: '271',
    name: 'Bujes De Eje De Rueda Delantera Benelli Trk 251 Original',
    category: 'MOTO',
    subcategory: 'Ruedas',
    price: 15000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_909883-MLA87928318125_072025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '272',
    name: 'Cable Asiento Trasero Benelli Trk 251 Negro',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 15000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_695535-MLA93627199620_102025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251'],
    colors: ['Negro']
  },
  {
    id: '273',
    name: 'Soporte Baul Moto Porta Candado Seguridad Anti Robo Traba U Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 84000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_725066-MLA94017958285_102025-F.webp',
    compatibleBrands: ['Universal'],
    colors: ['Negro']
  },
  {
    id: '274',
    name: 'Filtro Aire + Limpia Y Lubrica Honda Crf 250 F 2019 - 2025',
    category: 'MOTO',
    subcategory: 'Filtros/Mantenimientos',
    price: 95000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_986898-MLA93493215517_092025-F.webp',
    compatibleBrands: ['Honda', 'CRF']
  },
  {
    id: '275',
    name: 'Filtro Aceite Moto Daelim Altino 125 Daystar Roadwin Original',
    category: 'MOTO',
    subcategory: 'Filtros/Mantenimientos',
    price: 18000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_912489-MLA79658794435_092024-F.webp',
    compatibleBrands: ['Daelim']
  },
  {
    id: '276',
    name: 'Soporte Anclaje Baules Laterales Honda Nc 750x 2021 - 2026 Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 450000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_820468-MLA102434155583_122025-F.webp',
    compatibleBrands: ['Honda', 'NC 750X'],
    colors: ['Negro']
  },
  {
    id: '277',
    name: 'Cacha Cubre Tanque Central Benelli Trk 251 Original Negro',
    category: 'MOTO',
    subcategory: 'Aletas de Tanque',
    price: 84000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_885215-MLA94062860841_102025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251'],
    colors: ['Negro']
  },
  {
    id: '278',
    name: 'Cacha Cubre Tanque Benelli Trk 251 Lateral Izquierda Blanco',
    category: 'MOTO',
    subcategory: 'Aletas de Tanque',
    price: 125000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_773821-MLA93994515327_102025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251'],
    colors: ['Blanco']
  },
  {
    id: '279',
    name: 'Pedalin Izquierdo Yamaha Yz Yzf Wrf Original Acero Japón',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 63000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_638169-MLA79491701837_092024-F.webp',
    compatibleBrands: ['Yamaha']
  },
  {
    id: '280',
    name: 'Parrilla Italiana Soporte Baul Piaggio Mp3 Yourban 125 - 300 Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 76000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_731405-MLA93615425796_102025-F.webp',
    compatibleBrands: ['Piaggio', 'MP3'],
    colors: ['Negro']
  },
  {
    id: '281',
    name: 'Kit Juego Aros De Pistón Yamaha Xs 400 Japon +0.25 +0.50',
    category: 'MOTO',
    subcategory: 'Pistón',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_634643-MLA79249405416_092024-F.webp',
    compatibleBrands: ['Yamaha']
  },
  {
    id: '282',
    name: 'Kit Aros De Pistón Suzuki 2r8 Gt250 X7 Standard Top Japon',
    category: 'MOTO',
    subcategory: 'Pistón',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_631495-MLA79562689458_102024-F.webp',
    compatibleBrands: ['Suzuki']
  },
  {
    id: '283',
    name: 'Kit Juego Aros De Piston Suzuki X5 Gt 200 +0.50',
    category: 'MOTO',
    subcategory: 'Pistón',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_760258-MLA79563008658_102024-F.webp',
    compatibleBrands: ['Suzuki']
  },
  {
    id: '284',
    name: 'Kit Juego Aros De Piston Suzuki X5 Gt 200 +0.25',
    category: 'MOTO',
    subcategory: 'Pistón',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_827923-MLA79562592228_102024-F.webp',
    compatibleBrands: ['Suzuki']
  },
  {
    id: '285',
    name: 'Corona De Arranque Daelim Liberty 50cc Original',
    category: 'MOTO',
    subcategory: 'Coronas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_822479-MLA79353545125_092024-F.webp',
    compatibleBrands: ['Daelim', 'Liberty']
  },
  {
    id: '286',
    name: 'Kit Aros Piston Kawasaki Gto 110 Varias Medidas',
    category: 'MOTO',
    subcategory: 'Pistón',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_956376-MLA79119051392_092024-F.webp',
    compatibleBrands: ['Kawasaki']
  },
  {
    id: '287',
    name: 'Pastillas De Freno Kymco Venox 250 2000 Al 2014 Delanteras',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_615643-MLA79540355898_102024-F.webp',
    compatibleBrands: ['Kymco']
  },
  {
    id: '288',
    name: 'Araña Soporte De Tablero Velocimetro Royal Enfield Himalayan',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 220000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_782931-MLA89079039727_072025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan']
  },
  {
    id: '289',
    name: 'Tanque De Nafta Moto Auxiliar Delantero Enduro Universal',
    category: 'MOTO',
    subcategory: 'Tanque',
    price: 290000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_771686-MLA80430466807_112024-F.webp',
    compatibleBrands: ['Universal']
  },
  {
    id: '290',
    name: 'Parabrisas Italiano Yamaha Mt 09 Tracer Ahumado Con Spoiler',
    category: 'MOTO',
    subcategory: 'Parabrisas',
    price: 142500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_616513-MLA82382064834_022025-F.webp',
    compatibleBrands: ['Yamaha', 'MT 09', 'Tracer']
  },
  {
    id: '291',
    name: 'Pastillas De Freno Yamaha Xv Xvz 1300 1700 Road Royal Star',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 36750,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_641170-MLA79392322701_092024-F.webp',
    compatibleBrands: ['Yamaha']
  },
  {
    id: '292',
    name: 'Cacha Lateral Cubre Tanque Benelli Trk 251 Derecho Negro',
    category: 'MOTO',
    subcategory: 'Aletas de Tanque',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_736091-MLA93665775102_102025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251'],
    colors: ['Negro']
  },
  {
    id: '293',
    name: 'Tapas Motor Gas Gas Ex 450 Año 2021 Al 2023 Enduro',
    category: 'MOTO',
    subcategory: 'Cubre Motor',
    price: 100000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_713995-MLA78961768596_092024-F.webp',
    compatibleBrands: ['Gas Gas']
  },
  {
    id: '294',
    name: 'X2 Filtro Aceite Suzuki Gs 400 450 500 700 1000 Katana Gsx',
    category: 'MOTO',
    subcategory: 'Filtros/Mantenimientos',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_885710-MLA79018377808_092024-F.webp',
    compatibleBrands: ['Suzuki']
  },
  {
    id: '295',
    name: 'Kit Aros De Piston Kawasaki Ke 125 +0.25mm',
    category: 'MOTO',
    subcategory: 'Pistón',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_634055-MLA79112184804_092024-F.webp',
    compatibleBrands: ['Kawasaki']
  },
  {
    id: '296',
    name: 'Kit Aros De Piston Suzuki Gt 185 Medida +0.50mm',
    category: 'MOTO',
    subcategory: 'Pistón',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_938653-MLA79411345353_092024-F.webp',
    compatibleBrands: ['Suzuki']
  },
  {
    id: '297',
    name: 'Pastillas Freno Delanteras Kdx 200 Kl 600 650 Kmx Kx 125 250',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_801477-MLA79147388214_092024-F.webp',
    compatibleBrands: ['Kawasaki']
  },
  {
    id: '298',
    name: 'Kit De Aros De Piston Suzuki Gt 200 Ts 100 Rugo Medida +1.00',
    category: 'MOTO',
    subcategory: 'Pistón',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_728261-MLA79391377757_092024-F.webp',
    compatibleBrands: ['Suzuki']
  },
  {
    id: '299',
    name: 'Promo! Pastillas De Freno Yamaha Ttr 230 Hechas En Dinamarca',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_948919-MLA79388908851_092024-F.webp',
    compatibleBrands: ['Yamaha']
  },
  {
    id: '300',
    name: 'X2 Filtro Aceite Yamaha Fz 700 750 1000 Genesis Xj 1200 1300',
    category: 'MOTO',
    subcategory: 'Filtros/Mantenimientos',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_843369-MLA79389426021_092024-F.webp',
    compatibleBrands: ['Yamaha']
  },
  {
    id: '301',
    name: 'Juego Kit Aros De Piston Original Suzuki B120 Tc120 Vintage',
    category: 'MOTO',
    subcategory: 'Pistón',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_912633-MLA79392717179_092024-F.webp',
    compatibleBrands: ['Suzuki']
  },
  {
    id: '302',
    name: 'X2 Filtro Aceite Honda Trx 400 500 650 680 Fourtrax Rancher',
    category: 'MOTO',
    subcategory: 'Filtros/Mantenimientos',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_764448-MLA79397517060_092024-F.webp',
    compatibleBrands: ['Honda']
  },
  {
    id: '303',
    name: 'X2 Filtro Aceite Honda Vt R Cb 250 350 400 450 Cx 500 Gl 650',
    category: 'MOTO',
    subcategory: 'Filtros/Mantenimientos',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_775175-MLA79397517538_092024-F.webp',
    compatibleBrands: ['Honda']
  },
  {
    id: '304',
    name: 'Protector Chapon Cubre Carter Atv Honda Trx 420 Rancher',
    category: 'MOTO',
    subcategory: 'Cubre Carter',
    price: 75000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_910324-MLA79041836628_092024-F.webp',
    compatibleBrands: ['Honda', 'ATV']
  },
  {
    id: '305',
    name: 'Equipo Conjunto Cross Enduro 32 M Fly Racing Kinetic Pro M Negro',
    category: 'PILOTO',
    subcategory: 'Indumentaria',
    price: 178500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_759863-MLA93562900552_102025-F.webp',
    compatibleBrands: ['Fly Racing'],
    colors: ['Negro']
  },
  {
    id: '306',
    name: 'Cachas Tapa Alforja Royal Enfield Himalayan Bs6 Negro',
    category: 'MOTO',
    subcategory: 'Cachas Portanúmero',
    price: 45000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_620598-MLA94019714347_102025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan'],
    colors: ['Negro']
  },
  {
    id: '307',
    name: 'Protector Cubre Carter Chasis Ktm Exc F 250 2012 2013 Italia',
    category: 'MOTO',
    subcategory: 'Cubre Carter',
    price: 250000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_643596-MLA79787284303_102024-F.webp',
    compatibleBrands: ['KTM']
  },
  {
    id: '308',
    name: 'Soporte De Radiador Voge 300 Ds Original',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 30000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_636105-MLA89071382499_072025-F.webp',
    compatibleBrands: ['Voge', '300 DS']
  },
  {
    id: '309',
    name: 'Protector Inferior De Cuadro Benelli Trk 251 Izquierdo',
    category: 'MOTO',
    subcategory: 'Cubre Cuadro',
    price: 35000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_975039-MLA87928300797_072025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '310',
    name: 'Soporte Pedalin Completo Trasero Derecho Voge 300 Ds Original',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 115500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_833999-MLA80125038305_102024-F.webp',
    compatibleBrands: ['Voge', '300 DS']
  },
  {
    id: '311',
    name: 'Cubre Disco Delantero Suzuki Rmz 250 450 Amarillo Ventilado Amarillo',
    category: 'MOTO',
    subcategory: 'Cubre Disco',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_983772-MLA94147337025_102025-F.webp',
    compatibleBrands: ['Suzuki'],
    colors: ['Amarillo']
  },
  {
    id: '312',
    name: 'Guardabarro Trasero Colin Honda Crf 250 X Hasta 2018 Con Luz',
    category: 'MOTO',
    subcategory: 'Guardabarro Trasero',
    price: 115500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_708873-MLA79041175076_092024-F.webp',
    compatibleBrands: ['Honda', 'CRF']
  },
  {
    id: '313',
    name: 'Cristo Inferior Benelli Trk 251 Dirección',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 290000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_980260-MLA87927655477_072025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '314',
    name: 'Defensa De Tanque Delantera Himalayan Bs6 Royal Enfield Izq',
    category: 'MOTO',
    subcategory: 'Defensas',
    price: 210000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_600659-MLA90761137426_082025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan']
  },
  {
    id: '315',
    name: 'Protector Cubeta Freno Benelli Trk 251 Talon Derecho',
    category: 'MOTO',
    subcategory: 'Otros',
    price: 35000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_931686-MLA87596466170_072025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '316',
    name: 'Sensor De Temperatura Himalayan Bs6 Royal Enfield',
    category: 'MOTO',
    subcategory: 'Repuestos de Motor',
    price: 37000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_973706-MLA90661358110_082025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan']
  },
  {
    id: '317',
    name: 'Horquillon Trasero Voge 300 Ds Original',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 180000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_680752-MLA87158032555_072025-F.webp',
    compatibleBrands: ['Voge', '300 DS']
  },
  {
    id: '318',
    name: 'Cupula Parabrisas Suzuki Dl 1000 V Strom 14-19 Givi Italiano',
    category: 'MOTO',
    subcategory: 'Parabrisas',
    price: 178500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_819191-MLA79388903359_092024-F.webp',
    compatibleBrands: ['Suzuki', 'V-Strom 1000', 'Givi']
  },
  {
    id: '319',
    name: 'Soporte De Parabrisas Benelli Trk 251 Negro',
    category: 'MOTO',
    subcategory: 'Parabrisas',
    price: 110000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_641995-MLA87529934352_072025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251'],
    colors: ['Negro']
  },
  {
    id: '320',
    name: 'Protector Cubre Tapas Motor Ktm Sxf Excf 450 500',
    category: 'MOTO',
    subcategory: 'Cubre Motor',
    price: 100000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_790576-MLA79066735027_092024-F.webp',
    compatibleBrands: ['KTM']
  },
  {
    id: '321',
    name: 'Protector Cubre Carter Ktm Excf 450 500 2017 Al 2019',
    category: 'MOTO',
    subcategory: 'Cubre Carter',
    price: 240000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_719964-MLA79414737396_092024-F.webp',
    compatibleBrands: ['KTM']
  },
  {
    id: '322',
    name: 'Guardabarro Trasero Royal Enfield Himalayan Bs6 Original',
    category: 'MOTO',
    subcategory: 'Guardabarro Trasero',
    price: 80000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_889257-MLA89375586629_082025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan']
  },
  {
    id: '323',
    name: 'Protector Cubre Carter Ktm Sxf 450 2016 Al 2018',
    category: 'MOTO',
    subcategory: 'Cubre Carter',
    price: 220000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_619010-MLA79414735850_092024-F.webp',
    compatibleBrands: ['KTM']
  },
  {
    id: '324',
    name: 'Tapa De Filtro De Aceite Yzf Wrf 250 450 Fx Zeta Japón Azul',
    category: 'MOTO',
    subcategory: 'Filtros/Mantenimientos',
    price: 84000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_679374-MLA80437993944_112024-F.webp',
    compatibleBrands: ['Yamaha'],
    colors: ['Azul']
  },
  {
    id: '325',
    name: 'Filtro Aceite Moto Suzuki Dr 350 250 Beta Euro 350 Alka',
    category: 'MOTO',
    subcategory: 'Filtros/Mantenimientos',
    price: 18000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_903100-MLA79397516396_092024-F.webp',
    compatibleBrands: ['Suzuki', 'Beta']
  },
  {
    id: '326',
    name: 'Filtro De Aire + Aceite Y Limpiador Yamaha Yz 85 Racing',
    category: 'MOTO',
    subcategory: 'Filtros/Mantenimientos',
    price: 88500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_982226-MLA90076068893_082025-F.webp',
    compatibleBrands: ['Yamaha']
  },
  {
    id: '327',
    name: 'Cristo Superior Benelli Trk 251 Dirección',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 220000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_898348-MLA87926763175_072025-F.webp',
    compatibleBrands: ['Benelli', 'TRK 251']
  },
  {
    id: '328',
    name: 'Ramal Arnes De Cables Luces Traseras Himalayan Bs6 Re',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 45000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_823907-MLA91150050875_082025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan']
  },
  {
    id: '329',
    name: 'Promo! Pastillas De Freno Yamaha Xtz 250 125 Sbs Dinamarca',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_857123-MLA79388901813_092024-F.webp',
    compatibleBrands: ['Yamaha']
  },
  {
    id: '330',
    name: 'Pastillas De Freno Suzuki Dr 350 250 Rm Rmx Ts 125 200 250',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_681153-MLA79389373785_092024-F.webp',
    compatibleBrands: ['Suzuki']
  },
  {
    id: '331',
    name: 'Aros De Pistón Yamaha Gt 80 +0.50mm',
    category: 'MOTO',
    subcategory: 'Pistón',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_830474-MLA79149337738_092024-F.webp',
    compatibleBrands: ['Yamaha']
  },
  {
    id: '332',
    name: 'Kit Juego Aros De Piston Honda St 70 0.75 Original Mod Viejo',
    category: 'MOTO',
    subcategory: 'Pistón',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_693226-MLA79392795511_092024-F.webp',
    compatibleBrands: ['Honda']
  },
  {
    id: '333',
    name: 'X3 Filtro Aceite Japones Suzuki Dr 800 750 600 500 Savage Sp',
    category: 'MOTO',
    subcategory: 'Filtros/Mantenimientos',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_644534-MLA79642056931_092024-F.webp',
    compatibleBrands: ['Suzuki']
  },
  {
    id: '334',
    name: 'Pastillas De Freno Beta Euro 350 2003 Al 2006',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_884109-MLA79540197130_102024-F.webp',
    compatibleBrands: ['Beta']
  },
  {
    id: '335',
    name: 'Pastillas De Freno Yamaha Ttr 230 Xtz 125 250 Enduro Delante',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_862005-MLA79787493485_102024-F.webp',
    compatibleBrands: ['Yamaha']
  },
  {
    id: '336',
    name: 'Pastillas De Freno Kymco Downtown Xciting Superdink 250 300',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_747326-MLA79746315640_102024-F.webp',
    compatibleBrands: ['Kymco']
  },
  {
    id: '337',
    name: 'Placa Porta Numero Kayo K6 Cross 250 Blanco',
    category: 'MOTO',
    subcategory: 'Porta Número',
    price: 85000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_631268-MLA94038345447_102025-F.webp',
    compatibleBrands: ['Kayo'],
    colors: ['Blanco']
  },
  {
    id: '338',
    name: 'Soporte Baul Givi Porta Candado Seguridad Anti Robo Traba U Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_755336-MLA94152831047_102025-F.webp',
    compatibleBrands: ['Givi', 'Universal'],
    colors: ['Negro']
  },
  {
    id: '339',
    name: 'Cubre Carter Acerbis Kawasaki Kxf 450 16 18',
    category: 'MOTO',
    subcategory: 'Cubre Carter',
    price: 180000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_680396-MLA88631099637_072025-F.webp',
    compatibleBrands: ['Kawasaki', 'Acerbis']
  },
  {
    id: '340',
    name: 'Soporte Baul Honda Vfr 750 1994 Givi Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 240000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_613753-MLA80384719613_112024-F.webp',
    compatibleBrands: ['Honda', 'Givi'],
    colors: ['Negro']
  },
  {
    id: '341',
    name: 'Guardabarro Delantero Yamaha Yz Yzf Wrf 2006 Al 2014 Azul',
    category: 'MOTO',
    subcategory: 'Guardabarro Delantero',
    price: 73500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_715231-MLA79746183848_102024-F.webp',
    compatibleBrands: ['Yamaha'],
    colors: ['Azul']
  },
  {
    id: '342',
    name: 'Parabrisas Scooter Piaggio Mp3 125 300 Givi Con Kit Anclajes Transparente',
    category: 'MOTO',
    subcategory: 'Parabrisas',
    price: 170000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_814435-MLA90046623964_082025-F.webp',
    compatibleBrands: ['Piaggio', 'Givi'],
    colors: ['Transparente']
  },
  {
    id: '343',
    name: 'Soporte Rack Baul Maleta Lateral Yamaha Xt 660 2004 A 2006 Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 220000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_847519-MLA94095903505_102025-F.webp',
    compatibleBrands: ['Yamaha'],
    colors: ['Negro']
  },
  {
    id: '344',
    name: 'Cubremanos Supermotard Acerbis Super Moto Alma Aluminio Amarillo Izquierdo/derecho',
    category: 'MOTO',
    subcategory: 'Manubrios',
    price: 240000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_718990-MLA93994878351_102025-F.webp',
    compatibleBrands: ['Acerbis'],
    colors: ['Amarillo']
  },
  {
    id: '345',
    name: 'Pantalón De Viaje Dual Road 36 Xl Impermeable Axo Italia Negro talla 36',
    category: 'PILOTO',
    subcategory: 'Indumentaria',
    price: 290000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_998514-MLA93580914556_102025-F.webp',
    compatibleBrands: ['Axo'],
    colors: ['Negro']
  },
  {
    id: '346',
    name: 'Tanque De Nafta Kawasaki Kxf 450 2006 Al 2008 Acerbis 12lts',
    category: 'MOTO',
    subcategory: 'Tanque',
    price: 450000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_622267-MLA82657146327_022025-F.webp',
    compatibleBrands: ['Kawasaki', 'Acerbis']
  },
  {
    id: '347',
    name: 'Soporte Baul Trasero Yamaha Mt 09 Xsr 900 Reforzado Givi Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 240000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_984756-MLA93692911430_102025-F.webp',
    compatibleBrands: ['Yamaha', 'Givi'],
    colors: ['Negro']
  },
  {
    id: '348',
    name: 'Soporte Central Abs Himalayan Bs6 Royal Enfield',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 35000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_677656-MLA90662255108_082025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan']
  },
  {
    id: '349',
    name: 'Kit De Plasticos Suzuki Rmz 450 2010 Al 2017 Amarillo Cachas Amarrillo Flúo',
    category: 'MOTO',
    subcategory: 'Kits Plásticos',
    price: 315000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_913032-MLA94117315009_102025-F.webp',
    compatibleBrands: ['Suzuki'],
    colors: ['Amarillo']
  },
  {
    id: '350',
    name: 'Cubre Piñon De Transmisión Royal Enfield Himalayan Bs6',
    category: 'MOTO',
    subcategory: 'Transmisión',
    price: 65000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_818404-MLA88982714242_082025-F.webp',
    compatibleBrands: ['Royal Enfield', 'Himalayan']
  },
  {
    id: '351',
    name: 'Parabrisas Deflector Yamaha Mt 07 Tracer 32x33cm Givi',
    category: 'MOTO',
    subcategory: 'Parabrisas',
    price: 90000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_882776-MLA79360468145_092024-F.webp',
    compatibleBrands: ['Yamaha', 'Givi']
  },
  {
    id: '352',
    name: 'Placa Porta Numero Delanter Ktm Husqvarna Sxf Fc 2016 A 2018 Negro',
    category: 'MOTO',
    subcategory: 'Porta Número',
    price: 94000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_868019-MLA93576662848_102025-F.webp',
    compatibleBrands: ['KTM', 'Husqvarna'],
    colors: ['Negro']
  },
  {
    id: '353',
    name: 'Protector Radiador Acero Inoxidable Versys 1000 17-19 Negro Negro',
    category: 'MOTO',
    subcategory: 'Defensas',
    price: 140000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_852974-MLA91518843647_092025-F.webp',
    compatibleBrands: ['Kawasaki', 'Versys 1000'],
    colors: ['Negro']
  },
  {
    id: '354',
    name: 'Filtro Aire + Aceite Y Cleaner Ktm Sx Exc 1994 A 1997',
    category: 'MOTO',
    subcategory: 'Filtros/Mantenimientos',
    price: 88500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_813093-MLA82667921688_032025-F.webp',
    compatibleBrands: ['KTM']
  },
  {
    id: '355',
    name: 'Soporte Givi Baules Lateral Yamaha Xt 660 2007 A 2012 Pl362 Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 378000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_702987-MLA93722920842_102025-F.webp',
    compatibleBrands: ['Yamaha', 'Givi'],
    colors: ['Negro']
  },
  {
    id: '356',
    name: 'Cubrecarter Ktm 125 150 Sx 2011 Al 2016',
    category: 'MOTO',
    subcategory: 'Cubre Carter',
    price: 250000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_765589-MLA84923117739_052025-F.webp',
    compatibleBrands: ['KTM']
  },
  {
    id: '357',
    name: 'Cable De Acelerador Voge 300 Ds Original Completo',
    category: 'MOTO',
    subcategory: 'Repuestos de Motor',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_639847-MLA80122255103_102024-F.webp',
    compatibleBrands: ['Voge', '300 DS']
  },
  {
    id: '358',
    name: 'Pastillas Freno Tras Moto Honda Goldwin Gl 1100 1500 Cb 750',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_972441-MLA79411355887_092024-F.webp',
    compatibleBrands: ['Honda']
  },
  {
    id: '359',
    name: 'Kit Juego Aros De Pistón Yamaha Gp 80 +0.25 +0.75',
    category: 'MOTO',
    subcategory: 'Pistón',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_737695-MLA79150261828_092024-F.webp',
    compatibleBrands: ['Yamaha']
  },
  {
    id: '360',
    name: 'Pastillas De Freno Renthal Fa92 Moto Honda Xl Xr 1988',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_919432-MLA79642055187_092024-F.webp',
    compatibleBrands: ['Honda']
  },
  {
    id: '361',
    name: 'Kit Aros Piston Kawasaki Ke 100 +0.25mm',
    category: 'MOTO',
    subcategory: 'Pistón',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_659817-MLA79786678845_102024-F.webp',
    compatibleBrands: ['Kawasaki']
  },
  {
    id: '362',
    name: 'Pastillas De Freno Kawasaki Versys 300 Sbs Dinamarca',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_894460-MLA79787469073_102024-F.webp',
    compatibleBrands: ['Kawasaki', 'Versys 300']
  },
  {
    id: '363',
    name: 'Pastillas De Freno Yamaha Ybr 125 Xt 225 350 Xt600 Dt 125r',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_920200-MLA79745857682_102024-F.webp',
    compatibleBrands: ['Yamaha']
  },
  {
    id: '364',
    name: 'Pastillas Freno Husqvarna Tc Te Wrk 510 350 240 125 Ktm Exc',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_822499-MLA79745996602_102024-F.webp',
    compatibleBrands: ['Husqvarna', 'KTM']
  },
  {
    id: '365',
    name: '3 Filtros De Aceite Kawasaki Z250 Er250 Ex 305 Kz 305',
    category: 'MOTO',
    subcategory: 'Filtros/Mantenimientos',
    price: 33000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_690340-MLA80027230213_102024-F.webp',
    compatibleBrands: ['Kawasaki']
  },
  {
    id: '366',
    name: 'Pastillas Freno Delantero Suzuki Dr 650 750 800 Ebc Kevlar',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 36750,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_635380-MLA79411150121_092024-F.webp',
    compatibleBrands: ['Suzuki']
  },
  {
    id: '367',
    name: 'Pastillas De Freno Honda Cn 250 Helix Spazio Scooter',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 36750,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_659855-MLA79787851097_102024-F.webp',
    compatibleBrands: ['Honda']
  },
  {
    id: '368',
    name: 'Pastillas Freno Suzuki Bandit Dr 800 Big Gs Gsx Djebel Rg',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 36750,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_781666-MLA79787792801_102024-F.webp',
    compatibleBrands: ['Suzuki']
  },
  {
    id: '369',
    name: 'Pastillas De Freno Yamaha Tzr Tdr Srx Rz Fz Fzr Fzs Sdr Rd',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 36750,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_648752-MLA79540584774_102024-F.webp',
    compatibleBrands: ['Yamaha']
  },
  {
    id: '370',
    name: 'Soporte Baul Yamaha Tdm 850 1996 - 2001 Negro',
    category: 'MOTO',
    subcategory: 'Bauleras',
    price: 240000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_699455-MLA93615604250_102025-F.webp',
    compatibleBrands: ['Yamaha'],
    colors: ['Negro'],
    description: 'Soporte trasero robusto diseñado específicamente para la Yamaha TDM 850 (96-01). Fabricado en acero de alta resistencia con acabado en pintura epoxi negra, ideal para montar baúles Givi y asegurar tu carga en viajes largos.'
  },
  {
    id: '371',
    name: 'Filtro Aire + Aceite Y Limpiador Yamaha Yzf 450 2010 A 2013',
    category: 'MOTO',
    subcategory: 'Filtros/Mantenimientos',
    price: 88500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_879877-MLA90029466035_082025-F.webp',
    compatibleBrands: ['Yamaha'],
    description: 'Kit completo de mantenimiento para Yamaha YZF 450 (2010-2013). Incluye filtro de aire de doble densidad para máxima filtración y filtro de aceite de alto flujo, garantizando la protección óptima del motor en condiciones off-road.'
  },
  {
    id: '372',
    name: 'Conjunto Equipo Enduro Rallly Off Road Small 30 40 Bermuda S Negro',
    category: 'PILOTO',
    subcategory: 'Indumentaria',
    price: 240000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_925470-MLA93561692324_102025-F.webp',
    compatibleBrands: ['Universal'],
    colors: ['Negro'],
    description: 'Equipo técnico off-road diseñado para la máxima libertad de movimiento. Incluye jersey transpirable y bermuda resistente a la abrasión con paneles elásticos. Ideal para Enduro y Rally, combinando estilo y funcionalidad.'
  },
  {
    id: '373',
    name: 'Pastillas Freno Honda Cb Cbx Gl 1100 1200 Nsr 250 400 Vf 700',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 52500,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_893283-MLA79540364576_102024-F.webp',
    compatibleBrands: ['Honda'],
    description: 'Juego de pastillas de freno sinterizadas para clásicas Honda (CB, CBX, Goldwing). Ofrecen una frenada progresiva y potente, restaurando la seguridad original de tu motocicleta clásica con tecnología moderna.'
  },
  {
    id: '374',
    name: 'X4 Pastillas Freno Suzuki V Strom 800 Kawasaki Ninja 650 Ex',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 62000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_845270-MLA79540255478_102024-F.webp',
    compatibleBrands: ['Suzuki', 'Kawasaki'],
    description: 'Kit de 4 pastillas de freno delanteras de alto rendimiento. Compuesto cerámico para una larga duración y menor desgaste del disco. Compatibles con V-Strom 800 y Ninja 650.'
  },
  {
    id: '375',
    name: 'Pastillas De Freno Ebc 131 Honda Cr 80 85 125 250 Crf 230',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 60900,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_986281-MLA79798039932_102024-F.webp',
    compatibleBrands: ['Honda', 'EBC'],
    description: 'Pastillas EBC 131 de competición. Compuesto de carbono específico para motocross y enduro, ofreciendo mordida agresiva y resistencia al calor extremo. Ideales para Honda CR y CRF.'
  },
  {
    id: '376',
    name: 'Posapie Talonera Kawasaki Bayou Klf 400 1993 1994 Pedalines',
    category: 'MOTO',
    subcategory: 'Accesorios/Herramientas',
    price: 80000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_908324-MLA79390556491_092024-F.webp',
    compatibleBrands: ['Kawasaki'],
    description: 'Pedalines reposapiés de reemplazo directo para Kawasaki Bayou KLF 400. Construcción metálica con dentado agresivo para máximo agarre en barro y condiciones difíciles.'
  },
  {
    id: '377',
    name: 'Pastillas De Freno Trasero R1 1998 A 2002 Ebc Linea Dorada',
    category: 'MOTO',
    subcategory: 'Pastillas',
    price: 77700,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_631807-MLA79168772790_092024-F.webp',
    compatibleBrands: ['Yamaha', 'EBC'],
    description: 'Pastillas traseras EBC Serie Dorada (Sinterizadas HH) para Yamaha R1. La máxima fricción disponible para calle y pista, proporcionando un control excepcional del tren trasero.'
  },
  {
    id: '378',
    name: 'Central Abs Himalayan Bs6 Royal Enfield Original Negro',
    category: 'MOTO',
    subcategory: 'Otros',
    price: 220000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_864523-MLA90761881400_082025-F.webp',
    compatibleBrands: ['Royal Enfield'],
    colors: ['Negro'],
    description: 'Módulo de control ABS original para Royal Enfield Himalayan BS6. Componente electrónico esencial para el sistema de frenado antibloqueo, garantizando seguridad en frenadas de emergencia.'
  },
  {
    id: '379',
    name: 'Cubierta 16 650 8 Tractor Cesped 16x6.50-8 16x650x8 Japon H',
    category: 'MOTO',
    subcategory: 'Cubiertas',
    price: 360000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_789227-MLA93642637406_102025-F.webp',
    gallery: ['https://http2.mlstatic.com/D_NQ_NP_2X_899365-MLA79249899676_092024-F.webp'],
    compatibleBrands: ['Universal'],
    description: 'Cubierta de alta resistencia 16x6.50-8 para minitractores y vehículos utilitarios. Fabricación japonesa con caucho de larga duración y diseño de tacos para tracción en césped y tierra.'
  },
  {
    id: '380',
    name: 'Placa Porta Numero Italiana Acerbis Raptor Con Cubre Cristo',
    category: 'MOTO',
    subcategory: 'Porta Número',
    price: 94000,
    stock: 5,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_794442-MLA81894938582_012025-F.webp',
    compatibleBrands: ['Acerbis'],
    description: 'Placa porta número delantera Acerbis modelo Raptor. Diseño italiano aerodinámico con sistema de montaje universal a los barrales. Incluye espacio para cableado y protección inferior.'
  }
];