const express = require("express");
const { validateAuth } = require("../middlewares/auth");
const router = express.Router();
const { Order, Product } = require("../models");

router.get("/:userId", validateAuth, (req, res) => {
  Order.findAll({ where: { userId: req.params.userId } })
    .then((result) => res.send(result))
    .catch((error) => {
      console.log("error", error);
      res.status(500).send(error);
    });
});

router.get("/detail/:orderId", validateAuth, (req, res) => {
  Order.findOne({
    where: {
      id: req.params.orderId,
    },
    include: {
      model: Product,
    },
  })
    .then((result) => res.send(result))
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = router;
