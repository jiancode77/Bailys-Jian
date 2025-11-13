# JianBailys - Custom Baileys Package

## 1. Setup Project

```bash
mkdir JianBailys
cd JianBailys
npm init -y
npm install @whiskeysockets/baileys chalk
```

## 2. Struktur Folder

```
JianBailys/
├── index.js
├── package.json
└── README.md
```

## 3. package.json

```json
{
  "name": "@jiancode77/jianbailys",
  "version": "1.0.0",
  "description": "Custom Baileys with pairing code support",
  "main": "index.js",
  "type": "commonjs",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["baileys", "whatsapp", "pairing-code"],
  "author": "jiancode77",
  "license": "MIT",
  "dependencies": {
    "@whiskeysockets/baileys": "latest",
    "chalk": "^4.1.2"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/jiancode77/JianBailys.git"
  }
}
```

## 4. index.js

```javascript
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
```

## 5. README.md

```markdown
# Bailys-Jian

Custom Baileys package dengan pairing code support

## Installation

```bash
npm install github:jiancode77/Bailys-Jian
```

## Usage

### Basic Usage (QR Code)

```javascript
const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('github:jiancode77/Bailys-Jian');

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on('creds.update', saveCreds);
    
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) start();
        } else if (connection === 'open') {
            console.log('Connected!');
        }
    });
}

start();
```

### Pairing Code Usage

```javascript
const { makeWASocket, useMultiFileAuthState } = require('github:jiancode77/Bailys-Jian');

async function startWithPairing() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
    });

    if (!sock.authState.creds.registered) {
        const phoneNumber = '628123456789';
        const code = await sock.requestPairingCode(phoneNumber);
        console.log('Pairing Code:', code);
    }

    sock.ev.on('creds.update', saveCreds);
}

startWithPairing();
```

### Custom Pairing Code

```javascript
const { makeWASocket, useMultiFileAuthState } = require('github:jiancode77/Bailys-Jian');

async function startWithCustomPairing() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
    });

    if (!sock.authState.creds.registered) {
        const phoneNumber = '628123456789';
        await sock.requestPairingCode(phoneNumber);
    }

    sock.ev.on('creds.update', saveCreds);
}

startWithCustomPairing();
```

## Features

- ✅ Console log chalk bold cyan saat package di-load
- ✅ Support pairing code
- ✅ Support custom pairing code
- ✅ Full baileys compatibility
- ✅ QR Code support

## Author

**jiancode77**

## License

MIT
```

## 6. Upload ke GitHub

```bash
git init
echo "node_modules/\nsession/" > .gitignore
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/jiancode77/JianBailys.git
git branch -M main
git push -u origin main
```

## 7. Cara Install

```bash
npm install github:jiancode77/JianBailys
```

Ketika package di-import, otomatis muncul:
```
[ Bailys Jian ] Ready..
```
