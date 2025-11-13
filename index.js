const originalBaileys = require('@whiskeysockets/baileys');
const chalk = require('chalk');

console.log(chalk.bold.cyan('[ Bailys Jian ] Ready..'));

const makeWASocket = (config) => {
    const sock = originalBaileys.default(config);
    
    const originalRequestPairingCode = sock.requestPairingCode;
    
    sock.requestPairingCode = async function(phoneNumber, customCode) {
        if (customCode) {
            console.log(chalk.bold.cyan(`[ Bailys Jian ] Custom Pairing Code: ${customCode}`));
            return customCode;
        }
        
        const code = await originalRequestPairingCode.call(this, phoneNumber);
        console.log(chalk.bold.cyan(`[ Bailys Jian ] Pairing Code: ${code}`));
        return code;
    };
    
    return sock;
};

module.exports = {
    ...originalBaileys,
    default: makeWASocket,
    makeWASocket
};
