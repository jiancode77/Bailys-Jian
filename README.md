# Bailys-Jian

Custom Baileys package dengan pairing code support

## Installation

npm install github:jiancode77/Bailys-Jian
Usage
const { makeWASocket, useMultiFileAuthState } = require('github:jiancode77/Bailys-Jian');

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on('creds.update', saveCreds);
}

start();
