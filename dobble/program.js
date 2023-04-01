const nb_symbol = 50;
const nb_symbol_per_card = 8;
const nb_card = 15;

function create_card(first){
    let card = [first]
    while (card.length < nb_symbol_per_card) {
        let number = Math.floor(Math.random()*nb_symbol+1);
        if (! card.includes(number)){
            card.push(number);
        }
    }
    return card;
}

function create(){
    let list = [create_card(0)];
    let output = ["\n"];
    while (list.length < nb_card+1) {
        let out = false;
        while (! out){
            var new_card = create_card(list.length);
                out = true;
                list.forEach(card => {
                    let equal = 0;
                    for (var i = 0; i < nb_symbol_per_card; i++) {
                        if (new_card.includes(card[i])) {
                            equal++;
                            if (equal > 1){
                                out = false;
                                break;
                            } 
                        }
                    }
                    if (equal != 1){
                        out = false;
                    }
                });
        }
        if(out){
            console.log(list.length+" "+new_card);
            list.push(new_card);
            if (output.length < 10) var space = " ";
            else var space = "";
            output.push(space+(output.length)+" | "+
            new_card.map(value =>{
                if (value < 10) return " "+value;
                else return value;
            }).join(" "));
        }
    }
    list.shift();
    return [list,output.join("\n")];
}

console.log(create()[1]);