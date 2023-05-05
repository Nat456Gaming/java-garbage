const lang = window.location.href.split("/")[3];

chrome.storage.sync.get({ first: false, second: false, third: false, fourth: false },(settings) => {
    if (settings.first){
        document.getElementById("noticeArea").remove();
        document.getElementsByTagName("body")[0].classList.add("cleaner");
    }if (settings.second){
        document.getElementsByTagName("body")[0].classList.add("no-btn");
    }
    const header_read = document.getElementById("_toolBarRightArea");
    if (header_read){
        let link = document.createElement('a')
        link.setAttribute('href', `/${lang}/favorite`)
        link.setAttribute('title', 'Subscribed')
        link.className = "favorite-link-read"
        link.innerHTML = "♥";
        header_read.insertBefore(link, document.getElementsByClassName("spi_area")[0]);

        const next_url = document.getElementsByClassName("pg_next")[0].href;
        if(next_url){ 
            if(settings.third){
                let next_link = document.createElement('a');
                next_link.setAttribute('href', next_url);
                next_link.setAttribute('title', 'Next Episode');
                next_link.className = "next-ep-read";
                next_link.innerHTML = '<p class="next-btn arrow">→</p> <p class="next-btn next">NEXT</p>';
                document.getElementById("container").appendChild(next_link);
            }
        }else if (settings.fourth){
            let link2 = document.createElement('a');
            link2.setAttribute('href', '/'+lang+'/favorite');
            link2.setAttribute('title', 'Subscribed');
            link2.innerHTML = '<p style="line-height: 53px;">♥</p>';
            link2.className = "next-ep-favorite-read";
            document.getElementById("container").appendChild(link2);
        }
        addEventListener('keypress', event => {
            if (event.key === "n") window.location.href = next_url ? next_url : `/${lang}/favorite`;
        })
    }
});