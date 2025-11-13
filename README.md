## 4. Upload ke GitHub

```bash
git init
echo "node_modules/\nsession/" > .gitignore
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/jiancode77/Bailys-Jian.git
git branch -M main
git push -u origin main
```

## 5. Cara Orang Lain Pakai

### Opsi 1: Install langsung
```bash
npm install github:jiancode77/Bailys-Jian
```

### Opsi 2: Pakai alias di package.json (RECOMMENDED)

Di `package.json` mereka:
```json
{
  "dependencies": {
    "@whiskeysockets/baileys": "npm:@jiancode77/baileys@github:jiancode77/Bailys-Jian"
  }
}
```

Atau lebih simple:
```json
{
  "dependencies": {
    "@whiskeysockets/baileys": "github:jiancode77/Bailys-Jian"
  }
}
```

Lalu:
```bash
npm install
```

**Sekarang mereka bisa pakai seperti biasa:**
```javascript
const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
```

Tapi isinya adalah baileys modifikasi kamu! ✅

## 6. Contoh Penggunaan

### Pairing Code Biasa
```javascript
const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');

async function connect() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
    });

    if (!sock.authState.creds.registered) {
        const phoneNumber = '628123456789';
        const code = await sock.requestPairingCode(phoneNumber);
    }

    sock.ev.on('creds.update', saveCreds);
    
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) connect();
        } else if (connection === 'open') {
            console.log('Connected!');
        }
    });
}

connect();
```

### Custom Pairing Code
```javascript
const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

async function connectCustom() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
    });

    if (!sock.authState.creds.registered) {
        const phoneNumber = '628123456789';
        const customCode = 'JIAN-CODE';
        await sock.requestPairingCode(phoneNumber, customCode);
    }

    sock.ev.on('creds.update', saveCreds);
}

connectCustom();
```

## 7. README.md

```markdown
# @jiancode77/baileys

Custom Baileys package dengan full pairing code support

## Installation

Tambahkan di `package.json`:
```json
{
  "dependencies": {
    "@whiskeysockets/baileys": "github:jiancode77/Bailys-Jian"
  }
}
```

Lalu:
```bash
npm install
```

## Usage

### Pairing Code Biasa
```javascript
const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

async function connect() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
    });

    if (!sock.authState.creds.registered) {
        const code = await sock.requestPairingCode('628123456789');
        console.log('Pairing Code:', code);
    }

    sock.ev.on('creds.update', saveCreds);
}

connect();
```

### Custom Pairing Code
```javascript
const code = await sock.requestPairingCode('628123456789', 'YOUR-CUSTOM-CODE');
```

## Features

- ✅ 100% Support Pairing Code
- ✅ Support Custom Pairing Code  
- ✅ Console log chalk cyan bold
- ✅ Full Baileys compatibility
- ✅ Drop-in replacement untuk @whiskeysockets/baileys

## Console Output

Saat package di-load:
```
[ Bailys Jian ] Ready..
```

Saat pairing code:
```
[ Bailys Jian ] Pairing Code: XXXX-XXXX
```

## Author

jiancode77

## License

MIT
```

## Hasil Akhir

Orang install seperti ini:
```json
{
  "dependencies": {
    "@whiskeysockets/baileys": "github:jiancode77/Bailys-Jian"
  }
}
```

Dan pakai seperti biasa:
```javascript
const baileys = require('@whiskeysockets/baileys');
```

Tapi isinya baileys modifikasi kamu dengan:
- ✅ Console log cyan bold
- ✅ 100% support pairing code
- ✅ Support custom pairing code
