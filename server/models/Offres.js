module.exports = (sequelize, DataTypes) => {
  const Offres = sequelize.define("Offres", {
    idoffres: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total: DataTypes.FLOAT,
  });

  Offres.associate = (models) => {
    Offres.belongsTo(models.Users, {
      foreignKey: "user_idUser",
    });
    Offres.belongsTo(models.Cotations, {
      foreignKey: "cotation_id",
    });
    Offres.belongsTo(models.Commandes, {
      foreignKey: "offres_idoffres",
    });
  };

  return Offres;
};
