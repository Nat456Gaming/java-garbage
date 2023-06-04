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
            daytime();
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
            console.log(players_list[player-1]);
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

/**
 * @return {string} Return who won (false if nobody)
 */
function is_game_finished(){
    let village_winning = true;
    let wolves_winning = true;
    let alive = [];
    players_list.forEach(player => {
        if (player.role == "wolf" || player.is_infected) village_winning = false;
        else if (player.role) wolves_winning = false;
        if (player.role) alive.push(player.name);
    });
    if (alive.length == 1) return alive[0];
    if (village_winning) return "village";
    if (wolves_winning) return "wolves";
    return false;
}

/**
 * @param {number} nb_player - player to kill
 * @param {boolean} try_married - kill the player married to them (true)
 * @return {string} The new role of the player
 */
function kill(nb_player, try_married = true){
    let player = players_list[nb_player-1]
    if (player.lifes > 0){
        player.lifes --;
        player.role = give_role();
    }else player.role = false;
    players_list[nb_player-1] = player;
    game_end(is_game_finished());
    if (player.married_to){
        if (try_married) kill(player.married_to,false);
        else save_players();
        player.married_to = 0
    }else save_players();
    return player.role;
}

function game_end(winner){
    if (winner){
        console.log(winner+" ont gagnés !");
    }else return ;
}

/**
 * @param {object} list - input array
 * @return {} A random object in the array
 */
function random(list){
    if (typeof list === "object") return list[Math.floor(Math.random()*list.length)];
    return false;
}

function give_role(){
    let role = "";
    for (let i = 0; i <= 30; i++){
        role = random(current_roles);
        if (! is_game_finished) break;
    }
    current_roles.splice(current_roles.indexOf(role), 1);
    save_players();
    return role;
}

function save_players(){
    setCookie("players_list",JSON.stringify(players_list));
    setCookie("current_roles",JSON.stringify(current_roles));
    return JSON.parse(getCookie("players_list"));
}

function daytime(time = step){
    if(time == 1){
        document.documentElement.style.setProperty('--foreground-color', "white");
        document.documentElement.style.setProperty('--background-color', "black");
    }else{
        document.documentElement.style.setProperty('--foreground-color', "black");
        document.documentElement.style.setProperty('--background-color', "white");
    }
}