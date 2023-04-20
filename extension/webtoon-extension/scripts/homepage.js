const lang = window.location.href.split("/")[3];
let link = document.createElement('a');
link.setAttribute('href', '/'+lang+'/favorite');
link.setAttribute('title', 'Subscribed');
link.innerHTML = "♥";

const header_read = document.getElementById("_toolBarRightArea");
/*const header = document.getElementById("header");
if (header){
    link.className = "favorite-link";
    const bar = document.getElementsByClassName("bar")[0];
    const btn_bar = document.getElementsByClassName("sta")[0];
    btn_bar.insertBefore(link, bar);
}else */if (header_read){
    link.className = "favorite-link-read";
    const bar = document.getElementsByClassName("spi_area")[0];
    header_read.insertBefore(link, bar);


    const next_url = document.getElementsByClassName("pg_next")[0].href;
    if(next_url){
        let next_link = document.createElement('a');
        next_link.setAttribute('href', next_url);
        next_link.setAttribute('title', 'Next Episode');
        next_link.className = "next-ep-read";
        next_link.innerHTML = '<p class="next-btn arrow">→</p> <p class="next-btn next">NEXT</p>';
        document.getElementById("container").appendChild(next_link)
    }else{
        let link2 = document.createElement('a');
        link2.setAttribute('href', '/'+lang+'/favorite');
        link2.setAttribute('title', 'Subscribed');
        link2.innerHTML = '<p style="line-height: 53px;">♥</p>';
        link2.className = "next-ep-favorite-read";
        document.getElementById("container").appendChild(link2)
    }
}

document.getElementById("noticeArea").remove();