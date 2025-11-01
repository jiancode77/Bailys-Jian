import fs from "fs";
import path from "path";

export function generatePairing(prefix="JIAN-CODE"){
    const code = `${prefix}-${Math.floor(Math.random()*9000+1000)}`;
    const sessionPath = path.resolve("./session/pairSession");
    if(!fs.existsSync(sessionPath)) fs.mkdirSync(sessionPath,{recursive:true});
    fs.writeFileSync(path.join(sessionPath,"pairing.json"),JSON.stringify({code}));
    return {code};
}
