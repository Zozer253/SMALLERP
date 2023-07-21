module.exports = (sequelize, DataTypes) => {
  const Stocks = sequelize.define('Stocks', {
    idproduit_pulic: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
  });

  Stocks.associate = (models) => {
    Stocks.belongsTo(models.Users, {
      foreignKey: 'users_idUser',
    });
  };

  return Stocks;
};
