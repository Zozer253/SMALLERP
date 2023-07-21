module.exports = (sequelize, DataTypes) => {
  const OffreProduits = sequelize.define("OffreProduits", {
    idofproduit: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantité: DataTypes.INTEGER,
    prix_unitaire: DataTypes.STRING(50),
    total: DataTypes.STRING(50),
  });

  OffreProduits.associate = (models) => {
    OffreProduits.hasOne(models.Offres, {
      foreignKey: "offres_idoffres",
    });
  };

  return OffreProduits;
};
