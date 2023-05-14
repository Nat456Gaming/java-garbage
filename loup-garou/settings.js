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
    let roles = document.getElementById('roles_number').value;

    if (players != old_players){
        players = Math.round(players);
        if (players > 10) players = players % 10;
        if (players < 4) players = 4;
        document.getElementById('players_number').value = players;
        old_players = players;
        setCookie("players",players);
        if (players < 8 && roles == 1) document.getElementById('roles_number').value = 2

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
    
    if (roles != old_roles){
        roles = Math.round(roles);
        if (roles > 3) roles = roles % 3;
        if (roles == 1 && players < 8 ) roles = 2;
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
    let W = window.innerWidth;
    let H = window.innerHeight;
    /*if (H<W) W = H;
    else H = W;*/
    let angle = (Math.PI*2/total)*player; //calc_angle(player,total);
    let card = document.createElement("div");
    card.setAttribute("class","div-btn-player");
    //card.style.position = "absolute";
    card.style.left = String(window.innerWidth/2 + Math.round(square_coord(player, total, W, H)/*circle_coord(angle,W,H)*/[0]) - 50)+"px";
    card.style.bottom = String(window.innerHeight/2 + Math.round(square_coord(player, total, W, H)/*circle_coord(angle,W,H)*/[1]) - 50)+"px";
    card.style.zIndex = player;
    card.style.transform =  "rotate("+String(/*-angle-Math.PI/2*/square_coord(player, total, W, H)[2])+"rad) scale("+String(calc_scale(W,H))+")";
    card.innerHTML ='<button class="btn-player" id="btn_player"'+player+' onclick="player_pressed('+player+')"><img id="img_player'+player+'" src="images/back.png"><h2 class="player-name">'+document.getElementById("player"+String(player)).value+'</h2></button>';
    document.getElementById('game_player_container').appendChild(card);
}

function circle_coord(angle, W, H){
    let x = Math.cos(angle)*W/3; //*(-10*Math.abs(Math.sin(angle))/125*Math.PI+1)
    let y = Math.sin(angle)*H/3; //*(-10*Math.abs(Math.cos(angle))/125*Math.PI+1)
    return [x,y];
}

function square_coord(player, total, Width, Height){
    let W = Width
    let H = Height
    if (W<=H){
        W = Height
        H = Width
    }
    let x = W/Math.round(total/2)*(player-Math.round(total/2)/2-0.5)
    let y = -H/3.5;
    let angle = 0;
    if (player > Math.round(total/2)){
        x = W/(total-Math.round(total/2))*(player-Math.round(total/2)-(total-Math.round(total/2))/2-0.5)
        y = H/3.5;
        angle = Math.PI;
    }
    if (Width>=Height) return [x,y,angle];
    else{
        document.getElementById("center_button").style.transform = "rotate("+String(Math.PI/2)+"rad)"
        return [y,x,angle+Math.PI/2];
    } 
}

function calc_scale(W, H){
    //return W*H/2093230+159323/418646
    return W*H/2061400+5/22
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