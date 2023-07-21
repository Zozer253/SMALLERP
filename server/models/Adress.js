module.exports = (sequelize, DataTypes) => {
  const Adress = sequelize.define("Adress", {
    idAdress: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    province: DataTypes.STRING(50),
    ville: DataTypes.STRING(50),
    street: DataTypes.STRING(50),
  });

  Adress.associate = (models) => {
    Adress.belongsTo(models.Entreprises, {
      foreignKey: "Entreprise_idEntreprise",
    });
  };

  return Adress;
};
