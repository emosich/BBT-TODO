const { User, Category, Product } = require("../models");

User.bulkCreate(
  [
    {
      name: "Joselito",
      lastname: "Duarte",
      email: "joselito@gmail.com",
      password: "algarrobo",
      date_of_birth: "1980-12-02", //como se pone la fecha!?
      address: "asdeas",
      is_admin: true,
    },

    {
      name: "Jose",
      lastname: "Dua",
      email: "jose@gmail.com",
      password: "alga",
      date_of_birth: "1999-10-24",
      address: "astr",
    },

    {
      name: "Braulio",
      lastname: "Arte",
      email: "Braulio@gmail.com",
      password: "robo",
      date_of_birth: "2001-11-20",
      address: "dddd",
      is_admin: true,
    },

    {
      name: "Kletus",
      lastname: "Teduar",
      email: "kletus@gmail.com",
      password: "Gala",
      date_of_birth: "1987-07-03",
      address: "kidsagds",
    },

    {
      name: "Cristobal",
      lastname: "Remo",
      email: "cristobal@gmail.com",
      password: "agua",
      date_of_birth: "2003-01-18",
      address: "iyzy",
    },
  ],
  { validate: true, individualHooks: true }
);

Category.bulkCreate([
  {
    name: "Vinos",
  },
  {
    name: "Cervezas",
  },
  {
    name: "Espumantes",
  },
  {
    name: "Licores",
  },
  {
    name: "Gin",
  },
  {
    name: "Vodka",
  },
  {
    name: "Ron",
  },
  {
    name: "Aperitivos",
  },
  {
    name: "Whisky",
  },
  {
    name: "Otros",
  },
]).then(() => {
  Product.bulkCreate([
    {
      name: "Pack Andes Ipa Pack x5 475ml",
      categoryId: 2,
      price: 1200,
      description:
        "La Andes IPA Andina es una cerveza estilo IPA, valga la redundancia, de la escuela Inglesa. Como seguramente usted sabe, este estilo de cerveza se caracteriza por el amargor que le otorga su alto contenido de lúpulo.",
      stock: 20,
      brand: "Andes",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/476/675/products/and1-2c855b2a7f4839a46e16096851750218-640-0.jpg",
    },
    {
      name: "Paulaner Weissbier Lata 500ml",
      categoryId: 2,
      price: 790,
      description:
        "Es considerada la cerveza de trigo número 1 en Alemania y una de las favoritas del mundo. Una obra maestra elaborada por expertos, mediante una técnica perfeccionada por los maestros cerveceros de Paulaner llamada suspensión de levadura, que da como resultado un aspecto uniforme, ligeramente turbio, una calidad constante y un sabor perfecto.",
      stock: 20,
      brand: "Paulaner",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/3300701-f3b7aa6eddc7d781f915755587555671-640-01-5b40aabc2ddc2f587915918300349161-640-0.jpg",
    },
    {
      name: "Stella Artois Lata 269ml",
      categoryId: 2,
      price: 200,
      description:
        "Es una cerveza muy equilibrada de un color dorado brillante. En esta cerveza predominan moderadas notas a frutas blancas y de cereal que resaltan levemente sobre el aroma herbal del lúpulo Saaz. En boca presenta una sensación suave, ligera de amargo y con efecto refrescante. La Stella Artois es ideal para acompañar quesos, pastas y carnes con salas de cítricos o ensaladas afrutadas.",
      stock: 20,
      brand: "Stella Artois",
      images:
        "https://cdn.shopify.com/s/files/1/0254/2947/5433/products/cerveza-stella-artois-belgium-269_C-siempreencasa_500x.png?v=1637180550?nocache=0.5602055357686924",
    },
    {
      name: "Fernet Branca 710ml",
      categoryId: 10,
      price: 1200,
      description:
        "Producto del ingenio y la visión de Bernandino Branca, nace en 1845 una bebida única para la época. Ella es resultado de la combinación de hierbas, cortezas, raíces, frutos y cuidado artesanal, a la que su creador bautizó con el nombre de fernet. Así nació Fernet Branca.",
      stock: 20,
      brand: "Branca",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/fernet-brancamenta-750ml1-4cd7f4771af031369a15627817288255-480-0.jpg",
    },
    {
      name: "Fernet Branca 1L",
      categoryId: 10,
      price: 1900,
      description: "Fernet fernet brranca branca branca",
      stock: 20,
      brand: "Branca",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/fernet-branca-1l1-22cf1c861e96c6bda515627818456812-480-0.jpg",
    },
    {
      name: "Botella Patagonia 24.7 750ml",
      categoryId: 2,
      price: 450,
      description:
        "Nuestra 24.7 es una Session IPA, de amargor marcado otorgado por una combinación de lúpulos patagónicos. Con intenso aroma cítrico y frutal. El agregado de sauco y miel patagónicos balancean el amargor del lúpulo, aportando cierta acidez y final seco.",
      stock: 20,
      brand: "Patagonia",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/333611-43fba1b86f3b4c68d415671052502457-640-01-45fd310cca4964c3bd15918297820259-640-0.jpg",
    },
    {
      name: "Botella Gancia",
      categoryId: 8,
      price: 1300,
      description: "Botella Gancia Botella Gancia Botella Gancia",
      stock: 2,
      brand: "Gancia",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/gancia-950ml1-6ccf34584bd8855e3215627816837011-480-0.jpg",
    },
    {
      name: "Mastrantonio 63 Petit Verdot",
      categoryId: 1,
      price: 2500,
      description:
        "Color Rojo profundo con tintes grante. Aromas a Frutas rojas, especias y tostados intensas pero elegantes.Entrada de boca seco, se percibe un vino complejo y elegante, con taninos dulces y rugosos con un cuerpo sedosos y de buena acidez.",
      stock: 10,
      brand: "Bodega Familia Mastrantonio",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/mastrantonio-63-premium-petit-verdot-750ml1-f93c993493f647fdc516573816053885-480-0.jpg",
    },
    {
      name: "Zaha Malbec",
      categoryId: 1,
      price: 3000,
      description:
        "Color Rojo profundo con tintes violáceos. Aromas a Frutas rojas, florales y vegetales bien amalgamadas.",
      stock: 5,
      brand: "Bodega Teho",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/zaha-malbec1-b006de289dfcd8c3fa16573815230668-640-0.png",
    },
    {
      name: "Norton Cosecha Tardía",
      categoryId: 1,
      price: 700,
      description: "Ideal para aquellos que quieren incursionar en los vinos.",
      stock: 5,
      brand: "Bodega Norton",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/tardia_mrkvfd1-70f19628a2226ecc1115918287459152-640-0.jpg",
    },
    {
      name: "Alma Negra Brut Nature 750ml",
      categoryId: 3,
      price: 4100,
      description: "Un sensacional espumante, para no arrepentirse.",
      stock: 5,
      brand: "Familia Brutsky",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/40911-1a868ca602da33ef0116189560174152-320-0.jpg",
    },
    {
      name: "Licor de Huevo Tres Plumas",
      categoryId: 4,
      price: 560,
      description: "Licor de sensacional sabor e intensidad.",
      stock: 5,
      brand: "Tres Plumas",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/5420141-06ce264fed14e0142515918250839034-320-0.jpg",
    },
    {
      name: "Tia Maria Cream 690ml",
      categoryId: 4,
      price: 1750,
      description:
        "Tia Maria Cream combina el sabor de Tia Maria más la sensualidad de la crema fresca y un toque de finas esencias.",
      stock: 5,
      brand: "Tia Maria",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/tia-maria-cream-690ml1-9dccbb156ff126db0415627832149667-320-0.jpg",
    },
    {
      name: "Gin Terrier Old Tom",
      categoryId: 5,
      price: 4200,
      description:
        "Un viaje sensorial al siglo XIX,en el que nace este estilo. Más dulce que un London Dry Gin y menos que una Ginebra Holandesa, el Old Tom vuelve para quedarse.",
      stock: 5,
      brand: "Old Tom",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/whatsapp-image-2021-05-22-at-15-49-3921-0f18965618fc42367e16217814844049-320-0.jpeg",
    },
    {
      name: "Gin Larios Rose 700ml",
      categoryId: 5,
      price: 2900,
      description: "Gin mediterráneo de excelencia, destilado cuatro veces.",
      stock: 5,
      brand: "Larios",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/larios-rose1-361bd76a3a5c33ccb116464063317401-320-0.jpg",
    },
    {
      name: "Abolute Blue 750ml",
      categoryId: 6,
      price: 3300,
      description:
        "El primero de todos los Absolut, producido en 1979. Modo de consumo: Puro, con hielo o en tragos. Tipo de elaboración: Destilación continua.",
      stock: 5,
      brand: "Absolute Vodka",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/absolut-blue-750ml1-da62fac0e6f537d57c15627801825570-320-0.jpg",
    },
    {
      name: "Abolute Mandrin 750ml",
      categoryId: 6,
      price: 3600,
      description:
        "Introducido en 1999. Es de color cristalino. Su aroma es de carácter complejo y frutado aportado por la combinación de naranjas y mandarinas, con notas de cáscaras de naranja.",
      stock: 5,
      brand: "Absolute Vodka",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/image71-8b9f64232aa72929a515913104553675-320-0.jpeg",
    },
    {
      name: "Skyy Maracuya 750ml",
      categoryId: 6,
      price: 1350,
      description:
        "Impresionante sabor a maracuyá combinado con vodka.",
      stock: 5,
      brand: "Skyy",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/skyy-maracuya-750ml1-94cc1d8802a6616f3215616914225619-320-0.jpg",
    },
    {
      name: "Bacardi Oro 1L",
      categoryId: 7,
      price: 2800,
      description:
        "Bacardí Carta Blanca Oro es el primer ron dorado ligero del mundo. Se envejece en barricas de roble blanco tostado al fuego para darle carácter, sometiéndolo posteriormente a filtración hasta conseguir su suavidad característica.",
      stock: 5,
      brand: "Bacardi",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/ron-bacardi-carta-oro-40-r2-4653_41-b659e9c506b7039f1d15914732492415-320-0.jpg",
    },
    {
      name: "Bacardi Superior 1L",
      categoryId: 7,
      price: 2800,
      description:
        "Un clásico ron blanco con notas distintivas de vainilla y almendra, elaborado en barriles de roble blanco y moldeado con una mezcla secreta de carbón vegetal para lograr una suavidad inconfundible.",
      stock: 5,
      brand: "Bacardi",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/bacardi-superior-1l1-aa3271c59f5b5bf38a15610621030616-320-0.jpg",
    },
    {
      name: "Buchanas Deluxe 750ml",
      categoryId: 9,
      price: 7300,
      description:
        "Un clásico por más de 130 años, el whisky de 12 años de Buchanan's, una de las marcas de whisky escocés de lujo más icónicas y premiadas del mundo.",
      stock: 5,
      brand: "Buchanas",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/buchanans-deluxe1-402260182c8195eb9015603122157081-320-0.jpg",
    },
    {
      name: "Chivas 12 años 500ml",
      categoryId: 9,
      price: 4300,
      description:
        "El Whisky Chivas Regal aparece en escena por el año 1801 en la vieja Escocia, producido por la compañía Chivas Brothers en la ciudad de Aberdeen (Escocia). La destilería que lo fabrica es “Strathisla”, de procedencia del pueblo de Keith, a las orillas del rio Spey.",
      stock: 5,
      brand: "Chivas",
      images:
        "https://d3ugyf2ht6aenh.cloudfront.net/stores/972/269/products/chivas-12-anos-500ml1-8f95af54252fc9888815627945613202-320-0.jpg",
    },

  ]);
});
