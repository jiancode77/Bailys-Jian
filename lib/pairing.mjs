import fs from "fs";
import path from "path";
import readline from "readline";
export async function generatePairing(){
  const rl=readline.createInterface({input:process.stdin,output:process.stdout});
  const code=await new Promise(r=>{rl.question("PAIRING CODE: ",a=>{rl.close();r(a.trim())})});
  const p=path.resolve("./session/pairSession");
  if(!fs.existsSync(p))fs.mkdirSync(p,{recursive:true});
  fs.writeFileSync(path.join(p,"pairing.json"),JSON.stringify({code}));
  return{code}
}
