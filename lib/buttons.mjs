export function btn(text,id){return{buttonId:id,buttonText:{displayText:text},type:1}}
export function lid(text,url){return{urlButton:{displayText:text,url}}}
export function jid(text,jid){return{callButton:{displayText:text,phoneNumber:jid}}}
export function list(title,rows){return{title,rows:rows.map((r,i)=>({title:r.title,rowId:r.id||`r${i}`,description:r.desc||""}))}}
export function template(text,footer,buttons){return{text,footer,templateButtons:buttons}}
