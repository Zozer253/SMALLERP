module.exports = (sequelize, DataTypes) => {
  const Expenses = sequelize.define("Expenses", {
    idExpenses: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rising: DataTypes.FLOAT,
    date: DataTypes.DATE,
    description: DataTypes.TEXT,
    image: DataTypes.TEXT,
  });

  Expenses.associate = (models) => {
    Expenses.belongsTo(models.Users, {
      foreignKey: "users_idUser",
    });
  };

  return Expenses;
};
