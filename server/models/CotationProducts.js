module.exports = (sequelize, DataTypes) => {
  const CotationProducts = sequelize.define("CotationProducts", {
    idtable1: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // nom: DataTypes.STRING(45),
    quantité: DataTypes.INTEGER,
  });

  CotationProducts.associate = (models) => {
    CotationProducts.belongsTo(models.Cotations, {
      foreignKey: "cotation_idcotation",
    });

    CotationProducts.belongsTo(models.Products, {
      foreignKey: "produit_idproduit",
    });
  };

  return CotationProducts;
};
