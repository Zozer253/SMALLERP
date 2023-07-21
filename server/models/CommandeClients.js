module.exports = (sequelize, DataTypes) => {
  const CommandeClients = sequelize.define("CommandeClients", {
    commandes_idcommandes: DataTypes.INTEGER,
    quantity: DataTypes.STRING(45),
    price: DataTypes.STRING(45),
  });

  CommandeClients.associate = (models) => {
    CommandeClients.belongsTo(models.Commandes, {
      foreignKey: "commandes_idcommandes",
    });
  };

  return CommandeClients;
};
