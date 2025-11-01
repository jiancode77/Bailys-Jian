import fs from "fs";
import path from "path";

export function saveSession(code){
    const sessionPath = path.resolve("./session/pairSession/session.json");
    fs.writeFileSync(sessionPath,JSON.stringify({code,created:Date.now()}));
}
