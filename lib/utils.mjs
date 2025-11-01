import fs from "fs";
import path from "path";
export function saveSession(code){
  const p=path.resolve("./session/pairSession/session.json");
  fs.mkdirSync(path.dirname(p),{recursive:true});
  fs.writeFileSync(p,JSON.stringify({code,created:Date.now()}))
}
export function loadSession(){
  const p=path.resolve("./session/pairSession/session.json");
  if(!fs.existsSync(p))return null;
  return JSON.parse(fs.readFileSync(p,"utf8"))
}
export async function send(sock,jid,body){
  await sock.sendMessage(jid,body)
}
