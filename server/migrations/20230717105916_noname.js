const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(nom) => "CotationProducts"
 * addColumn(produit_idproduit) => "CotationProducts"
 *
 */

const info = {
  revision: 7,
  name: "noname",
  created: "2023-07-17T10:59:16.964Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["CotationProducts", "nom", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "CotationProducts",
      "produit_idproduit",
      {
        type: Sequelize.INTEGER,
        field: "produit_idproduit",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        references: { model: "Products", key: "idProduit" },
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["CotationProducts", "produit_idproduit", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "CotationProducts",
      "nom",
      { type: Sequelize.STRING(45), field: "nom" },
      { transaction },
    ],
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
