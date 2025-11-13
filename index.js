const originalBaileys = require('@whiskeysockets/baileys');
const chalk = require('chalk');

console.log(chalk.bold.cyan('[ Bailys Jian ] Ready..'));

const makeWASocket = (config) => {
    return originalBaileys.default(config);
};

module.exports = {
    ...originalBaileys,
    default: makeWASocket,
    makeWASocket
};
