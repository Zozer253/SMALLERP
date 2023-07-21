module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define("Categories", {
    Categories: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: DataTypes.STRING(45),
    illustration: DataTypes.STRING(45),
  });

  return Categories;
};
