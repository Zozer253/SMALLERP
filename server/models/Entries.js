module.exports = (sequelize, DataTypes) => {
  const Entries = sequelize.define("Entries", {
    identries: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
  });

  Entries.associate = (models) => {
    Entries.belongsTo(models.Stocks, {
      foreignKey: "stock_idproduit_pulic",
    });
  };

  return Entries;
};
