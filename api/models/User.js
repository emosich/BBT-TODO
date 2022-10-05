const { DataTypes, Model } = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class User extends Model {
  //se puede hacer un metodo con this.cart y automaticamente linkea los carritos?

  toggleAdmin() {
    const isAdmin = this.dataValues.is_admin;
    return !isAdmin;
  }

  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    salt: {
      type: DataTypes.STRING,
    },

    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
    },

    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },

  { sequelize: db, modelName: "user" }
);

User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync();

  user.salt = salt;

  return user.hash(user.password, salt).then((hash) => {
    user.password = hash;
  });
});

//ver si puedo agregar otro hook para algo?

module.exports = User;
