module.exports = (sequelize, DataTypes) => {
  const Cotations = sequelize.define("Cotations", {
    idcotation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: DataTypes.DATE,
    description: DataTypes.TEXT,
    etat: DataTypes.STRING(45),
    dureedevalidation: DataTypes.STRING(45), // Nouvelle colonne ajoutée
  });

  Cotations.associate = (models) => {
    Cotations.belongsTo(models.Users, {
      foreignKey: "user_idUser",
    });
  };

  return Cotations;
};
