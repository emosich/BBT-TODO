const express = require("express");
const { Category } = require("../models");
const router = express.Router();

// obtengo todas las categorias
router.get("/", (req, res) => {
  Category.findAll().then((r) => res.send(r));
});

// agrego categoria
router.post("/", (req, res) => {
  const { name } = req.body;
  Category.findOrCreate({ where: { name } })
    .then((category) => {
      console.log(category);
      res.status(201).send(category[0]);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(401);
    });
});

// eliminar categoria
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.sendStatus(202))
    .catch((error) => error);
});

// editar categoria
router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  Category.update(req.body, {
    where: {
      id,
    },
    returning: true,
  })
    .then(([affectedRows, updated]) => {
      const category = updated[0];
      res.send(category);
    })
    .catch(next);
});

module.exports = router;
