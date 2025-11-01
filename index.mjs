import makeWASocket, { useMultiFileAuthState, fetchLatestBaileysVersion } from "@whiskeysockets/baileys";
import { generatePairing } from "./lib/pairing.mjs";
import { btn, lid, jid, list, template } from "./lib/buttons.mjs";
import { saveSession } from "./lib/utils.mjs";

const { state, saveCreds } = await useMultiFileAuthState("./auth");
const { version } = await fetchLatestBaileysVersion();
const pairing = await generatePairing();

saveSession(pairing.code);

const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
    generateHighQualityLinkPreview: true
});

sock.ev.on("creds.update", saveCreds);

sock.ev.on("connection.update", (u) => {
    if (u.qr) {
        const now = new Date().toLocaleTimeString();
        console.log("[36m[" + now + "] Welcome To Bailys Jian[0m");
        
        const normal = [btn("Send", "send"), btn("Open", "open"), btn("Close", "close")];
        const link = [lid("Website", "https://example.com")];
        const call = [jid("Call Owner", "+6200000")];
        const listing = list("Menu", [{ title: "Send", id: "send" }, { title: "Close", id: "close" }]);
        const temp = template("Hello", "Footer", [btn("Yes", "y"), lid("Site", "https://example.com"), jid("Call", "+6200000")]);
        
        console.log(normal, link, call, listing, temp);
    }
});
