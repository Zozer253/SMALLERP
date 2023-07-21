module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define('Customers', {
    idCustomers: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    phone: DataTypes.STRING(20),
    name: DataTypes.STRING(50),
    date: DataTypes.DATE,
  });

  Customers.associate = (models) => {
    Customers.belongsTo(models.Users, {
      foreignKey: 'user_idUser',
    });
  };

  return Customers;
};
