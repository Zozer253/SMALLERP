const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * renameColumn(Categries_Categories) => "Products"
 * changeColumn(visibility) => "Products"
 *
 */

const info = {
  revision: 13,
  name: "noname",
  created: "2023-07-18T12:22:59.440Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "renameColumn",
    params: ["Products", "Categries_Categories", "category_id"],
  },
  {
    fn: "changeColumn",
    params: [
      "Products",
      "visibility",
      { type: Sequelize.STRING, field: "visibility" },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "renameColumn",
    params: ["Products", "category_id", "Categries_Categories"],
  },
  {
    fn: "changeColumn",
    params: [
      "Products",
      "visibility",
      { type: Sequelize.ENUM("visible", "masqué"), field: "visibility" },
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
