module.exports = (sequelize, DataTypes) => {
  const Sorties = sequelize.define("Sorties", {
    idsorties: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    qty: DataTypes.INTEGER,
  });

  Sorties.associate = (models) => {
    Sorties.belongsTo(models.Commandes, {
      foreignKey: "commandes_idcommandes",
    });
    Sorties.belongsTo(models.Stocks, {
      foreignKey: "stock_idproduit_pulic",
    });
  };

  return Sorties;
};
