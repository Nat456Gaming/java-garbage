const header = document.getElementById("header");
const header_read = document.getElementById("_toolBarRightArea");

const lang = window.location.href.split("/")[3];
let link = document.createElement('a');
link.setAttribute('href', '/'+lang+'/favorite');
link.setAttribute('title', 'Favorites');
link.innerHTML = "+";

if (header && false){
    link.className = "favorite-link";
    const bar = document.getElementsByClassName("bar")[0];
    const btn_bar = document.getElementsByClassName("sta")[0];
    btn_bar.insertBefore(link, bar);
}else if (header_read){
    link.className = "favorite-link-read";
    const bar = document.getElementsByClassName("spi_area")[0];
    header_read.insertBefore(link, bar);

    const next_url = document.getElementsByClassName("pg_next")[0].href;
    if(next_url){
        let next_link = document.createElement('a');
        next_link.setAttribute('href', next_url);
        next_link.setAttribute('title', 'NextEpisode');
        next_link.className = "next-ep-read";
        next_link.innerHTML = "NEXT";
        document.getElementById("container").insertBefore(next_link, document.getElementById("_topBtn"))
    }
}