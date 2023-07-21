const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Categories", deps: []
 * createTable() => "Entreprises", deps: []
 * createTable() => "OffreProduits", deps: []
 * createTable() => "Adresses", deps: [Entreprises]
 * createTable() => "Users", deps: [Entreprises]
 * createTable() => "Cotations", deps: [Users]
 * createTable() => "Offres", deps: [OffreProduits, Users, Cotations]
 * createTable() => "Commandes", deps: [Offres]
 * createTable() => "CotationProducts", deps: [Cotations]
 * createTable() => "Customers", deps: [Users]
 * createTable() => "Stocks", deps: [Users]
 * createTable() => "CommandeClients", deps: [Commandes]
 * createTable() => "Products", deps: [Categories]
 * createTable() => "Entries", deps: [Stocks]
 * createTable() => "Sorties", deps: [Commandes, Stocks]
 * createTable() => "Expenses", deps: [Users]
 *
 */

const info = {
  revision: 1,
  name: "noname",
  created: "2023-06-07T14:42:12.273Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "Categories",
      {
        Categories: {
          type: Sequelize.INTEGER,
          field: "Categories",
          autoIncrement: true,
          primaryKey: true,
        },
        nom: { type: Sequelize.STRING(45), field: "nom" },
        illustration: { type: Sequelize.STRING(45), field: "illustration" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Entreprises",
      {
        idEntreprise: {
          type: Sequelize.INTEGER,
          field: "idEntreprise",
          autoIncrement: true,
          primaryKey: true,
        },
        logo: { type: Sequelize.TEXT, field: "logo" },
        nom: { type: Sequelize.STRING(45), field: "nom" },
        description: { type: Sequelize.TEXT, field: "description" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "OffreProduits",
      {
        idofproduit: {
          type: Sequelize.INTEGER,
          field: "idofproduit",
          autoIncrement: true,
          primaryKey: true,
        },
        quantité: { type: Sequelize.INTEGER, field: "quantité" },
        prix_unitaire: { type: Sequelize.STRING(50), field: "prix_unitaire" },
        total: { type: Sequelize.STRING(50), field: "total" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Adresses",
      {
        idAdress: {
          type: Sequelize.INTEGER,
          field: "idAdress",
          autoIncrement: true,
          primaryKey: true,
        },
        province: { type: Sequelize.STRING(50), field: "province" },
        ville: { type: Sequelize.STRING(50), field: "ville" },
        street: { type: Sequelize.STRING(50), field: "street" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        Entreprise_idEntreprise: {
          type: Sequelize.INTEGER,
          field: "Entreprise_idEntreprise",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Entreprises", key: "idEntreprise" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Users",
      {
        idUser: {
          type: Sequelize.INTEGER,
          field: "idUser",
          autoIncrement: true,
          primaryKey: true,
        },
        firstName: { type: Sequelize.STRING(50), field: "firstName" },
        lastName: { type: Sequelize.STRING(50), field: "lastName" },
        role: { type: Sequelize.ENUM("ADMIN"), field: "role" },
        email: { type: Sequelize.STRING(100), field: "email" },
        phone: { type: Sequelize.STRING(20), field: "phone" },
        password: { type: Sequelize.STRING(100), field: "password" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        Entreprise_idEntreprise: {
          type: Sequelize.INTEGER,
          field: "Entreprise_idEntreprise",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Entreprises", key: "idEntreprise" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Cotations",
      {
        idcotation: {
          type: Sequelize.INTEGER,
          field: "idcotation",
          autoIncrement: true,
          primaryKey: true,
        },
        date: { type: Sequelize.DATE, field: "date" },
        description: { type: Sequelize.TEXT, field: "description" },
        etat: { type: Sequelize.STRING(45), field: "etat" },
        "durée de validation": {
          type: Sequelize.STRING(45),
          field: "durée de validation",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        user_idUser: {
          type: Sequelize.INTEGER,
          field: "user_idUser",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Users", key: "idUser" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Offres",
      {
        idoffres: {
          type: Sequelize.INTEGER,
          field: "idoffres",
          autoIncrement: true,
          primaryKey: true,
        },
        total: { type: Sequelize.FLOAT, field: "total" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        offres_idoffres: {
          type: Sequelize.INTEGER,
          field: "offres_idoffres",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "OffreProduits", key: "idofproduit" },
          allowNull: true,
        },
        user_idUser: {
          type: Sequelize.INTEGER,
          field: "user_idUser",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Users", key: "idUser" },
          allowNull: true,
        },
        cotation_idcotation: {
          type: Sequelize.INTEGER,
          field: "cotation_idcotation",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Cotations", key: "idcotation" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Commandes",
      {
        idcommandes: {
          type: Sequelize.INTEGER,
          field: "idcommandes",
          autoIncrement: true,
          primaryKey: true,
        },
        date: { type: Sequelize.DATE, field: "date" },
        status: { type: Sequelize.STRING(45), field: "status" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        offres_idoffres: {
          type: Sequelize.INTEGER,
          field: "offres_idoffres",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Offres", key: "idoffres" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "CotationProducts",
      {
        idtable1: {
          type: Sequelize.INTEGER,
          field: "idtable1",
          autoIncrement: true,
          primaryKey: true,
        },
        quantité: { type: Sequelize.STRING(45), field: "quantité" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        cotation_idcotation: {
          type: Sequelize.INTEGER,
          field: "cotation_idcotation",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Cotations", key: "idcotation" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Customers",
      {
        idCustomers: {
          type: Sequelize.INTEGER,
          field: "idCustomers",
          autoIncrement: true,
          primaryKey: true,
        },
        phone: { type: Sequelize.STRING(20), field: "phone" },
        name: { type: Sequelize.STRING(50), field: "name" },
        date: { type: Sequelize.DATE, field: "date" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        user_idUser: {
          type: Sequelize.INTEGER,
          field: "user_idUser",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Users", key: "idUser" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Stocks",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        idproduit_pulic: { type: Sequelize.INTEGER, field: "idproduit_pulic" },
        stock: { type: Sequelize.INTEGER, field: "stock" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        users_idUser: {
          type: Sequelize.INTEGER,
          field: "users_idUser",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Users", key: "idUser" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "CommandeClients",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        commandes_idcommandes: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Commandes", key: "idcommandes" },
          allowNull: true,
          field: "commandes_idcommandes",
        },
        quantity: { type: Sequelize.STRING(45), field: "quantity" },
        price: { type: Sequelize.STRING(45), field: "price" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Products",
      {
        idProduit: {
          type: Sequelize.INTEGER,
          field: "idProduit",
          autoIncrement: true,
          primaryKey: true,
        },
        s_k_u: { type: Sequelize.STRING(45), field: "s_k_u" },
        statut: { type: Sequelize.STRING(45), field: "statut" },
        date: { type: Sequelize.DATE, field: "date" },
        photo: { type: Sequelize.STRING(45), field: "photo" },
        validated: { type: Sequelize.BOOLEAN, field: "validated" },
        visibility: { type: Sequelize.ENUM("..."), field: "visibility" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        Categries_Categories: {
          type: Sequelize.INTEGER,
          field: "Categries_Categories",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Categories", key: "Categories" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Entries",
      {
        identries: {
          type: Sequelize.INTEGER,
          field: "identries",
          autoIncrement: true,
          primaryKey: true,
        },
        Quantity: { type: Sequelize.INTEGER, field: "Quantity" },
        price: { type: Sequelize.FLOAT, field: "price" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        stock_idproduit_pulic: {
          type: Sequelize.INTEGER,
          field: "stock_idproduit_pulic",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Stocks", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Sorties",
      {
        idsorties: {
          type: Sequelize.INTEGER,
          field: "idsorties",
          autoIncrement: true,
          primaryKey: true,
        },
        qty: { type: Sequelize.INTEGER, field: "qty" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        commandes_idcommandes: {
          type: Sequelize.INTEGER,
          field: "commandes_idcommandes",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Commandes", key: "idcommandes" },
          allowNull: true,
        },
        stock_idproduit_pulic: {
          type: Sequelize.INTEGER,
          field: "stock_idproduit_pulic",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Stocks", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Expenses",
      {
        idExpenses: {
          type: Sequelize.INTEGER,
          field: "idExpenses",
          autoIncrement: true,
          primaryKey: true,
        },
        rising: { type: Sequelize.FLOAT, field: "rising" },
        date: { type: Sequelize.DATE, field: "date" },
        description: { type: Sequelize.TEXT, field: "description" },
        image: { type: Sequelize.TEXT, field: "image" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        users_idUser: {
          type: Sequelize.INTEGER,
          field: "users_idUser",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Users", key: "idUser" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["Adresses", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Categories", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["CommandeClients", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Commandes", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["CotationProducts", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Cotations", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Customers", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Entreprises", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Entries", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Expenses", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["OffreProduits", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Offres", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Products", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Sorties", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Stocks", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Users", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
