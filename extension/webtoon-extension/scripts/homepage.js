const header = document.getElementById("header");
const header_read = document.getElementById("_toolBarRightArea");
const lang = window.location.href.split("/")[3];

let link = document.createElement('a');
link.setAttribute('href', '/'+lang+'/favorite');
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
}