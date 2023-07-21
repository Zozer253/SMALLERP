module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: DataTypes.STRING(50),
    lastName: DataTypes.STRING(50),
    role: DataTypes.ENUM("ADMIN", "VENDEUR_LOCAL", "MINING"),
    email: DataTypes.STRING(100),
    phone: DataTypes.STRING(20),
    password: DataTypes.STRING(100),
  });

  Users.associate = (models) => {
    Users.belongsTo(models.Entreprises, {
      foreignKey: "Entreprise_idEntreprise",
      allowNull: true,
      optional: true,
    });

    Users.hasMany(models.Expenses, {
      foreignKey: "users_idUser",
    });
    Users.hasMany(models.Customers, {
      foreignKey: "user_idUser",
    });
    Users.hasMany(models.Cotations, {
      foreignKey: "user_idUser",
    });
    Users.hasMany(models.Stocks, {
      foreignKey: "users_idUser",
    });
    Users.hasMany(models.Offres, {
      foreignKey: "user_idUser",
    });
  };

  return Users;
};
