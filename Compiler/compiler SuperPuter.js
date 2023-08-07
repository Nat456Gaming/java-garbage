const file = 'programme.txt';

const contentFile = require('fs').readFileSync(file, "utf-8");
const lines = contentFile.split('\n');
const rl = require('readline').createInterface({
    input : require('fs').createReadStream(file),
    output : process.stdout,
    terminal: false
});

let output = "\n";
let line = 0;

rl.on('line', function (text) {
    if (text.trim() != ""){
        //console.log(text.trim());
        output += decodeline(text.trim().toLowerCase()).join(" ")+"\n";
    }else{
        output += "\n";
    }
    if (line == lines.length-1){
        console.log(output);
    }
    line ++;
});

/**
 * @param {string} line - line to analyse
 * @return {object} The output line in an array
 */
function decodeline(line){
    if (line.includes("#")){
        return [line];
    }else if(line.includes("goif")){
        return condition(true,line);
    }else if(line.includes("if")){
        return condition(false,line);
    }else if(line.includes("=")){
        return calc(line);
    }else if(line.includes("def")){
        let first = line.substring(3).trim();
        return ["label",first];
    }else if(line.includes("{")){
        let first = line.substring(0,line.indexOf("{")).trim();
        return ["label",first];
    }else if(line.includes("goto")){
        let first = line.substring(4).trim();
        return [202,first,0,"counter"];
    }else if(line.includes("call")){
        let first = line.substring(4).trim();
        return ["Call",first,0,0];
    }else if(line.includes("}")){
        return ["Ret",0,0,0];
    }else if(line.includes("interrupt")){
        let first = line.substring(9).trim();
        return [202,first,"0","reg_rupt"];
    }else{
        return [line];
    }
}

/**
 * @param {string} line - line to analyse
 * @return {object} The output line in an array
 */
function calc(line){
    let sign = ["&&","!&","||","!|","^^","!^",">>","<<","!>","!<","++","--","**","*+","//"];
    let out = [];
    let done = false;
    sign.forEach((value,index) =>{
        if(line.includes(value)){
            let concout = concat(false,value,line);
            out = [upcode(false,index,concout),concout[0],concout[1],line.substring(0,line.indexOf("=")).trim()];
            done = true;
        }
    })
    if (done){
        return out;
    }else{
        output = line.substring(0,line.indexOf("=")).trim();
        if(line.includes("!!")){
            let input = line.substring(line.indexOf("!!")+1).trim();
            return [upcode(false,15,[input,0]),input,0,output];
        }else{
            sign = ["+=","-=","*=","¤=","/="];
            out = [];
            done = false;
            sign.forEach((value,index) =>{
                if(line.includes(value)){
                    let first = line.substring(0,line.indexOf(value)).trim();
                    let second = line.substring(line.indexOf(value)+2).trim();
                    out = [upcode(false,index+10,[first,second]),first,second,first];
                    done = true;
                }
            })
            if (done){
                return out;
            }else{
                let input = line.substring(line.indexOf("=")+1).trim();
                return [upcode(false,10,[input,"0"]),input,0,output];
            }
        }
    }
}

/**
 * @param {boolean} call - Is a call or not
 * @param {string} line - line to analyse
 * @return {object} The output line in an array
 */
function condition(call,line){
    let sign = ["==","!=","<<","<=",">>",">="];
    let out = [];
    sign.forEach((value,index) =>{
        if(line.includes(value)){
            let concout = concat(true,value,line);
            out = [upcode(call,(32+index),concout),concout[0],concout[1],line.substring(line.indexOf(":")+1).trim()];
        }
    })
    return out;
}

/**
 * @param {boolean} cond - Is a condition or not
 * @param {string} sign - sign to analyse in the line
 * @param {string} line - line to analyse
 * @return {object} the 2 input values in an array
 */
function concat(cond,sign,line){
    if (cond) return [line.substring(line.indexOf("if")+2,line.indexOf(sign)).trim(),line.substring(line.indexOf(sign)+2,line.indexOf(":")).trim()];
    else return [line.substring(line.indexOf("=")+1,line.indexOf(sign)).trim(),line.substring(line.indexOf(sign)+2).trim()];
}

/**
 * @param {boolean} call - Is a call or not
 * @param {string} operator - value to begin with
 * @param {object} values - the 2 input values in an array
 * @return {number} The UPCODE
 */
function upcode(call,operator,values){
    if (call) operator += 16;
    if (isnumber(values[0])) operator += 128;
    if (isnumber(values[1])) operator += 64;
    return operator;
}

/**
 * @param {string} input - input value
 * @return {boolean} Is the input a number
 */
function isnumber(input){
    return "01234567879".includes(input[0]);
}