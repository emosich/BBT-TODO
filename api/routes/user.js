const express = require("express");
const router = express.Router();
const { generateToken } = require("../config/tokens");
const { validateAuth } = require("../middlewares/auth");
const { User, Cart } = require("../models");
const { Op } = require("sequelize");

//ruta para registro
router.post("/register", (req, res) => {
  User.create(req.body)
    .then((user) => {
      Cart.create().then((cart) => {
        user.setCart(cart);
      });
      res.status(201).send(user);
    })
    .catch((err) => console.log(err));
});

//ruta para login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        userId: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        is_admin: user.is_admin,
        id : user.id,
      };

      const token = generateToken(payload);

      res.cookie("token", token);

      res.send(payload);
    });
  });
});

//ruta que devuelve un usuario si ya esta logueado:
router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

//ruta para logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

//editar un usuario:
router.put("/edit/:userId", (req, res) => {
  User.update(req.body, { where: { id: req.params.userId }, returning: true })
    .then(([affectedRows, updated]) => {
      const userUpdated = updated[0];
      res.send(userUpdated);
    })
    .catch((err) => console.log(err));
});

//---------> ADMIN:
//promover administradores:
router.put("/admin/:userId", (req, res) => {
  User.update({ is_admin: true }, { where: { id: req.params.userId } }).then(
    () => {
      res.sendStatus(204);
    }
  );
});

//togglear el estado is_admin, esta ruta no la pide pero capaz sirve:
router.put("/admin/toggle/:userId", (req, res) => {
  User.findByPk(req.params.userId)
    .then((user) => {
      user.update({ is_admin: user.toggleAdmin() });
    })
    .then(() => {
      res.sendStatus(202);
    });
});

//eliminar un usuario:
/* router.delete("/admin/:userId", (req, res) => {
  User.destroy({ where: { id: req.params.userId } })
    .then(() => {
      Cart.destroy({ where: { userId: req.params.userId } });
      res.sendStatus(202);
    })
    .catch((err) => console.log(err));
}); */

//se borra el campo userId pero no se borra el cart, revisar
router.delete("/admin/:userId", (req, res) => {
  Promise.all([
    Cart.destroy({ where: { userId: req.params.userId } }),
    User.destroy({ where: { id: req.params.userId } }),
  ])
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => console.log(err));
});

//ver todos los usuarios, tiene una condicion que evalua si es admin o no, se le puede sacar y evaluar desde el front:
router.get("/admin/:adminId", (req, res) => {
  User.findByPk(req.params.adminId)
    .then((user) => {
      if (user.is_admin) {
        User.findAll({ where: { id: { [Op.not]: req.params.adminId } } }).then(
          (users) => res.send(users)
        );
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => console.log(err));
});

/******** RUTAS DE PRUEBA ********/

router.get("/:userId", (req, res) => {
  User.findByPk(req.params.userId, { include: { model: Cart } }).then((user) =>
    res.send(user)
  );
});

module.exports = router;
