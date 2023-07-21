const { DataTypes } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  const Products = sequelize.define("Products", {
    idProduit: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: DataTypes.STRING(45),
    statut: DataTypes.STRING(45),
    date: DataTypes.DATE,
    photo: DataTypes.STRING(100),
    validated: DataTypes.BOOLEAN,
    visibility: {
      type: DataTypes.STRING,
      values: ['visible', 'masqué']
    }
  });

  Products.associate = (models) => {
    Products.belongsTo(models.Categories, { 
      foreignKey: "category_id", 
    });
  };

  return Products;
};
