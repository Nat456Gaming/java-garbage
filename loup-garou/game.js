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
            console.log(JSON.parse(getCookie("players_list"))[player-1]);
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

function is_game_finished(){
    let village_winning = true;
    let wolves_winning = true;
    players_list.forEach(player => {
        if (player.role == "wolf" || player.is_infected) village_winning = false;
        else wolves_winning = false;
    });
    if (village_winning) return "village";
    else if (wolves_winning) return "wolves";
    else return false;
}

function kill(nb_player, try_married = true){
    let player = players_list[nb_player-1]
    if (player.lifes > 0){
        for (let i = 0; i > 20; i++){
            player.role = "new-role";
            if (! is_game_finished){
                break;
            }
        }
    }else player.role = false;
    game_end(is_game_finished());
    if (player.married_to && try_married){
        kill(player.married_to,false);
    }
}

function game_end(winner){
    if (winner){
        console.log(winner+" ont gagnés !");
    }else return ;
}