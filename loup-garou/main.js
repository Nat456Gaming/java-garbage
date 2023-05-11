window.onload = () => {
    if(getCookie("players")) document.getElementById('players_number').value = Number(getCookie("players"));
    if(getCookie("roles")) document.getElementById('roles_number').value = Number(getCookie("roles"));
    update()
};

let old_players = 0;
let old_roles = 0;
let old_players_names = [];
let players_list = [];
setInterval(() => { update(); }, 100);

function update(){
    let players = document.getElementById('players_number').value;
    if (players != old_players){
        players = Math.round(players);
        if (players > 10) players = players % 10;
        if (players < 4) players = 4;
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
        players_list.forEach(id => {
            if(getCookie(id)) document.getElementById(id).value = getCookie(id);
        })
    }
    let roles = document.getElementById('roles_number').value;
    if (roles != old_roles){
        roles = Math.round(roles);
        if (roles > 3) roles = roles % 3;
        if (roles < 1) roles = 1;
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

function start_game(){
    let test = true
    for (let i = 1; i <= document.getElementById('players_number').value; i++) {
        if (! document.getElementById('player'+i).value){
            test = false
        }
    }
    if (test){
        for (let i = 1; i <= getCookie("players"); i++) {
            create_card(i,getCookie("players"));
        }
        document.getElementById("home").style.display = "none";
        document.getElementById("game").style.display = "block";
    }else{
        alert("Nomme bien tous les joueurs !")
    }
}

function create_card(player,total){
    let pos = 360/total*player;
    let angle = (360/total)*player //calc_angle(circumference()/total*player) 
    let card = document.createElement("button");
    card.setAttribute("class","btn_player");
    card.setAttribute("id","btn_player"+player);
    card.style.position = "absolute";
    card.style.bottom = String(window.innerHeight/2 + Math.cos(angle*Math.PI/180)*window.innerHeight/3 - 50)+"px";
    card.style.left = String(window.innerWidth/2 + Math.sin(angle*Math.PI/180)*window.innerWidth/3 - 50)+"px";
    //card.style.bottom = String(window.innerHeight/2 + ellipse(pos)[1] - 50)+"px";
    //card.style.left = String(window.innerWidth/2 + ellipse(pos)[0] - 50)+"px";
    card.style.zIndex = player;
    card.style.transform =  "rotate("+String(angle+180)+"deg)";
    card.innerHTML ='<img id="img_player'+player+'" src="images/back.png"><h2 class="player-name">'+document.getElementById("player"+String(player)).value+'</h2>';
    document.getElementById('game_player_container').appendChild(card);
}

function calc_angle(pos){
    return Math.atan2(window.innerHeight/3*Math.sin(pos),window.innerWidth/3*Math.cos(pos))
}

function circumference(){
    let a = window.innerHeight/3
    let b = window.innerWidth/3
    return Math.PI*(3*(a+b)-Math.sqrt((3*a+b)*(a+3*b)))
}

function ellipse(pos, a = window.innerWidth/3, b = window.innerHeight/3){
    let x = a * Math.sqrt(1-((pos/b)**2))
    let y = b * Math.sqrt(1-(x**2)/(a**2))
    return [x,y]
}