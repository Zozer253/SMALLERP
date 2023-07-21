module.exports = (sequelize, DataTypes) => {
  const Commandes = sequelize.define("Commandes", {
    idcommandes: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: DataTypes.DATE,
    status: DataTypes.STRING(45),
  });

  Commandes.associate = (models) => {
    Commandes.belongsTo(models.Offres, {
      foreignKey: "offres_idoffres",
    });
  };

  return Commandes;
};
