let step = 0; //0 is beginning, 1 is night, 2 is morning, 3 is vote
let night = "wolf"; 

function start(){
    step = 0;
    console.log("game started !");
}

function center_button(){
    switch (step){
        case 0:
            document.getElementById("center_button").style.display = "none";
            step = 1;
            break;
        case 1:
            //do nothing
            break;
        case 2:
            step = 3;
            break;
        case 3:
            console.log("Nobody has been voted");
            document.getElementById("center_button").style.display = "none";
            step = 1;
    }
}

function player_pressed(player){
    switch (step){
        case 0:
            console.log("Player "+player);
            break;
        case 1:
            switch (night){
                case "wolf":
                    document.getElementById("img_player"+player).style.border = "solid red 5px";
                    break;
            }
            break;
        case 2:
            //do nothing
            break;
        case 3:
            console.log("Player "+player+" has been voted");
            step = 1;
    }
}