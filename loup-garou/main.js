window.onload = () => {
    if(getCookie("players")){
        document.getElementById('players_number').value = Number(getCookie("players"));
        document.getElementById('roles_number').value = Number(getCookie("roles"));
    }
};

let old_players = 0;
let old_roles = 0;
let old_players_names = ["","","","","","","","","","","","","","","","","","","",""]
let players_list = [];
setInterval(() => { update(); }, 100);

function update(){
    let players = document.getElementById('players_number').value;
    if (players != old_players){
        players = Math.round(players);
        if (players > 10) players = 10;
        else if (players < 4) players = 4;
        document.getElementById('players_number').value = players;
        old_players = players;
        setCookie("players",players);
        
        players_list = [];
        document.getElementById("players_container").innerHTML = '';
        for (let i = 1; i <= players; i++) {
            let player = document.createElement("input");
            player.setAttribute("type","text");
            player.setAttribute("placeholder","Joueur "+i);
            player.setAttribute("id","player"+i);
            document.getElementById('players_container').appendChild(player);
            players_list.push("player"+i);
        }
        update_players();
    }
    let roles = document.getElementById('roles_number').value
    if (roles != old_roles){
        roles = Math.round(roles);
        if (roles > 3) roles = 3;
        else if (roles < 1) roles = 1;
        document.getElementById('roles_number').value = roles;
        old_roles = roles;
        setCookie("roles",roles);
    }
    players_list.forEach((id,pos) => {
        if (document.getElementById(id).value !== old_players_names[pos]){
            old_players_names[pos] = document.getElementById(id).value;
            setCookie(id,document.getElementById(id).value);
        }
    });
}

function update_players(){
    players_list.forEach(id => {
        if(getCookie(id)){
            document.getElementById(id).value = getCookie(id);
        }
    })
}

function start_game(){
    let test = true
    for (let i = 1; i <= document.getElementById('players_number').value; i++) {
        if (! document.getElementById('player'+i).value){
            test = false
        }
    }
    if (test){
        document.getElementById("home").style.display = "none";
        document.getElementById("game").style.display = "block";
    }else{
        alert("Nomme bien tous les joueurs !")
    }
}