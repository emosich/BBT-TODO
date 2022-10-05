const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const { Product, Category } = require("../models");

router.get("/", (req, res) => {
  Product.findAll().then((result) => res.send(result));
});

// ruta para buscar un producto en especifico por nombre.
router.get("/search", (req, res) => {
  const { string } = req.query;
  Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${string}%`,
      },
    },
  }).then((r) => res.send(r));
});

router.get("/:category", (req, res) => {
  Category.findOne({
    where: { name: req.params.category },
    include: { model: Product },
  }).then((categoria) => {
    res.send(categoria.products);
  });
});

router.get("/single/:id", (req, res) => {
  const id = req.params.id;
  Product.findByPk(id).then((result) => res.send(result));
});

router.post("/", (req, res) => {
  const { categoryName, ...producto } = req.body;
 
  // const { categoria } = req.body;

  //   Categorias.findOrCreate({ where: { nombre: categoria } }).then((finds) => {
  //     const categorias = finds[0];
  //     Productos.create(req.body)
  //       .then((producto) => producto.setCategoria(categorias))
  //       .then((productos) => res.send(productos));
  //   });

  // Product.create(producto)
  //   .then((product) => {
  //     Category.findOrCreate({ where: { name: req.body.categoria } }).then(
  //       (categoria) => {
  //         product.setCategories(categoria);
  //         res.status(201).send(product);
  //       }
  //     );
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.sendStatus(401);
  //   });

  Category.findOrCreate({where:{
    name: categoryName,
  }})
  .then((response)=> {
    const categoria = response[0]
    
    Product.create(producto)
    .then(producto=> producto.setCategory(categoria).then(result=> res.send(result)))
    
  })

});

router.put("/:id", (req, res) => {
  //Me genera dudas esta ruta, Funciona el edit, pero depende de como configuran el front, no necesitamos pasarle el id para que reconozca al admin y pueda editar.
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  }).then(([e, product]) => res.status(201).send(product));
});

router.delete("/:id", (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => res.sendStatus(204));
});

module.exports = router;
