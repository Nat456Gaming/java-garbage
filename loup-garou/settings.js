window.onload = () => {
    if(getCookie("players")) document.getElementById('players_number').value = Number(getCookie("players"));
    if(getCookie("roles")) document.getElementById('roles_number').value = Number(getCookie("roles"));
    update();
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
        start();
    }else{
        alert("Nomme bien tous les joueurs !")
    }
}



function create_card(player,total){
    let W = window.innerWidth
    let H = window.innerHeight
    if (H<W) W = H;
    else H = W;
    let angle = (Math.PI*2/total)*player; //calc_angle(player,total);
    let card = document.createElement("div");
    card.setAttribute("class","div-btn-player");
    //card.style.position = "absolute";
    card.style.left = String(window.innerWidth/2 + Math.round(calc_coord(angle)[0]*W/3) - 50)+"px";
    card.style.bottom = String(window.innerHeight/2 + Math.round(calc_coord(angle)[1]*H/3) - 50)+"px";
    card.style.zIndex = player;
    card.style.transform =  "rotate("+String(-angle-Math.PI/2)+"rad) scale("+String(W*H/2093230+159323/418646)+")";
    card.innerHTML ='<button class="btn-player" id="btn_player"'+player+' onclick="player_pressed('+player+')"><img id="img_player'+player+'" src="images/back.png"><h2 class="player-name">'+document.getElementById("player"+String(player)).value+'</h2></button>';
    document.getElementById('game_player_container').appendChild(card);
}

function calc_coord(angle){
    let x = Math.cos(angle)//*(-10*Math.abs(Math.sin(angle))/125*Math.PI+1)
    let y = Math.sin(angle)//*(-10*Math.abs(Math.cos(angle))/125*Math.PI+1)
    return [x,y]
}
/*
function calc_angle(player, total, W = window.innerWidth/2, H = window.innerHeight/2){
    let c = Math.sqrt(W**2+H**2);
    console.log(c)
    let pos = 4*c/total*player;
    let side = Math.floor(pos/c);
    let x = 0;
    let y = 1;
    if (side != 4){
        let d = pos%(4*c);
        if (side == 0 || side == 2) d = c-d;
        console.log(d)
        x = -(c*W/d-W);
        y = -(c*H/d-H);
        if (y==0) y = 1;
    }
    //console.log(x," - ",y, " - ",side)
    return Math.atan(y/x)+side*Math.PI/2;
}*/