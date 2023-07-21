module.exports = (sequelize, DataTypes) => {
  const Entreprises = sequelize.define("Entreprises", {
    idEntreprise: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    logo: DataTypes.TEXT,
    nom: DataTypes.STRING(45),
    description: DataTypes.TEXT,
  });

  Entreprises.associate = (models) => {
    Entreprises.hasMany(models.Users, {
      foreignKey: "Entreprise_idEntreprise",
    });
    Entreprises.hasOne(models.Adress, {
      foreignKey: "Entreprise_idEntreprise",
    });
  };

  return Entreprises;
};
