var file = './programme.txt';

const contentFile = require('fs').readFileSync(file, "utf-8") ;
const lines = contentFile.split('\n');
var rl = require('readline').createInterface({
    input : require('fs').createReadStream(file),
    output : process.stdout,
    terminal: false
});

let output = "\n";
let line = 0;

rl.on('line', function (text) {
    if (text.trim() != ""){
        //console.log(text.trim());
        output += decodeline(text.trim().toLowerCase()).join(" ")+"\n"
    }else{
        output += "\n"
    }
    if (line == lines.length-1){
        console.log(output);
    }
    line ++;
});

function decodeline(line){
    if (line.includes("#")){
        return [line]
    }else if(line.includes("goif")){
        return condition(true,line);
    }else if(line.includes("if")){
        return condition(false,line);
    }else if(line.includes("=")){
        let out = line.substring(0,line.indexOf("=")).trim();
        if(line.includes("+")){
            let concout = concat(false,"+",line)
            return [upcode(false,0,concout),concout[1],concout[3],out]
        }else if(line.includes("-")){
            let concout = concat(false,"-",line)
            return [upcode(false,1,concout),concout[1],concout[3],out]
        }else if(line.includes("&")){
            let concout = concat(false,"&",line)
            return [upcode(false,2,concout),concout[1],concout[3],out]
        }else if(line.includes("|")){
            let concout = concat(false,"|",line)
            return [upcode(false,3,concout),concout[1],concout[3],out]
        }else if(line.includes("!")){
            let first = line.substring(line.indexOf("!")+1).trim();
            if ("01234567879".includes(first)){
                return ["196",first,"0",out]
            }else{
                return ["68",first,"0",out]
            }
        }else if(line.includes("^")){
            let concout = concat(false,"^",line)
            return [upcode(false,5,concout),concout[1],concout[3],out]
        }else if(line.includes(">")){
            let concout = concat(false,">",line)
            return [upcode(false,6,concout),concout[1],concout[3],out]
        }else if(line.includes("<")){
            let concout = concat(false,"<",line)
            return [upcode(false,7,concout),concout[1],concout[3],out]
        }else if(line.includes("*")){
            let concout = concat(false,"*",line)
            return [upcode(false,8,concout),concout[1],concout[3],out]
        }else if(line.includes("µ")){
            let concout = concat(false,"µ",line)
            return [upcode(false,9,concout),concout[1],concout[3],out]
        }else{
            let first = line.substring(line.indexOf("=")+1).trim();
            if ("01234567879".includes(first)){
                return ["192",first,"0",out]
            }else{
                return ["64",first,"0",out]
            }
        }
    }else if(line.includes("def")){
        let first = line.substring(3).trim();
        return ["label",first];
    }else if(line.includes("{")){
        let first = line.substring(0,line.indexOf("{")).trim();
        return ["label",first];
    }else if(line.includes("goto")){
        let first = line.substring(4).trim();
        return ["192",first,"0","counter"];
    }else if(line.includes("call")){
        let first = line.substring(4).trim();
        return ["Call",first,"0","0"];
    }else if(line.includes("}*")){
        return ["exit_rupt","0","0","0"];
    }else if(line.includes("}")){
        return ["Ret","0","0","0"];
    }else if(line.includes("interrupt")){
        let first = line.substring(9).trim();
        return [192,first,"0","reg_rupt"];
    }
}

function condition(call,line){
    let sign = ["==","!=","<<","<=",">>",">="];
    let out = []
    sign.forEach((value,index) =>{
        if(line.includes(value)){
            let concout = concat(true,value,line);
            out = [upcode(call,(32+index),concout),concout[1],concout[3],line.substring(line.indexOf(":")+1).trim()];
        }
    })
    return out;
}

function concat(cond,sign,line){
    let out = [];
    let values = [];
    if (cond) values = [line.substring(line.indexOf("if")+2,line.indexOf(sign)).trim(),line.substring(line.indexOf(sign)+2,line.indexOf(":")).trim()];
    else values = [line.substring(line.indexOf("=")+1,line.indexOf(sign)).trim(),line.substring(line.indexOf(sign)+1).trim()];
    values.forEach(val =>{
        out.push("01234567879".includes(val[0]));
        out.push(val);
    });
    return out;
}

function upcode(call,operator,concout){
    if (call) operator += 16;
    if (concout[0]) operator += 128;
    if (concout[2]) operator += 64;
    return (operator)
}