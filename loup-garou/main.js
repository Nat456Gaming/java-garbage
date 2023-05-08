if(getCookie("players")){
    document.getElementById('players_number').value = getCookie(players);
    document.getElementById('roles_number').value = getCookie(roles);
}

let old_players = 0;
setInterval(function() { update_players_number(document.getElementById('players_number').value); }, 100);

function update_players_number(players){
    if (players != old_players){
        players = Math.round(players);
        if (players > 10) players = 10;
        else if (players < 4) players = 4;
        document.getElementById('players_number').value = players
        old_players = players;
        setCookie("players",players);

        document.getElementById("players_container").innerHTML = '';
        for (let i = 1; i <= players; i++) {
            let player = document.createElement("input")
            player.setAttribute("type","text")
            player.setAttribute("placeholder","Joueur "+i)
            player.setAttribute("id","player"+i)
            document.getElementById('players_container').appendChild(player);
        }
    }
}

let old_roles = 0;
setInterval(function() { update_roles_number(document.getElementById('roles_number').value); }, 100);

function update_roles_number(roles){
    if (roles != old_roles){
        roles = Math.round(roles);
        if (roles > 3) roles = 3;
        else if (roles < 1) roles = 1;
        document.getElementById('roles_number').value = roles
        var nb_roles = document.getElementById('players_number').value * roles;
        old_roles = roles;
        setCookie("roles",roles);
    }
}

function start_game(){
    document.getElementById("home").style.display = "none";
    document.getElementById("game").style.display = "block";
}