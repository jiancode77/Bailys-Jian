import { generatePairing } from './lib/pairing.mjs';
import { renderButtons } from './lib/buttons.mjs';
import { saveSession } from './lib/utils.mjs';

console.log("Starting Bailys-Jian...");

const pairing = generatePairing("JIAN-CODE");
console.log("Pairing code:", pairing.code);

saveSession(pairing.code);

const buttons = renderButtons(["Send Message","Open Chat","Close"]);
console.log("Buttons:", buttons.map(b=>`[${b}]`).join(" "));
