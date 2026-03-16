document.addEventListener("DOMContentLoaded", () => {
    // insert header
    const pageBody = document.querySelector("body");

    const bannerHeader = document.createElement("div");
    bannerHeader.id = "header";
    const siteTitle = document.createElement("h1");
    siteTitle.textContent = "Kimboleh.dev";
    const siteSubtitle = document.createElement("h2");
    siteSubtitle.textContent = "your mind is filled with thoughts of Internet";

    bannerHeader.appendChild(siteTitle);
    bannerHeader.appendChild(siteSubtitle);
    pageBody.insertBefore(bannerHeader, pageBody.firstChild);

    // insert cool audio
    const whirlingAudio = document.createElement("audio");
    whirlingAudio.autoplay = "true";
    whirlingAudio.controls = "true";
    whirlingAudio.textContent = "Your browser does not support this audio player.";
    const mp3 = document.createElement("source");
    mp3.src = "";
    if (window.location.hostname === "127.0.0.1") {
        mp3.src = "http://" + window.location.hostname + ":5500/src/assets/whirling_in_rags.mp3";
    } else {
        mp3.src = "https://" + window.location.hostname + "/src/assets/whirling_in_rags.mp3";
    }
    mp3.type = "audio/mpeg";
    whirlingAudio.appendChild(mp3);
    pageBody.insertBefore(whirlingAudio, pageBody.firstChild);

    // insert menus
    const mainContainer = document.querySelector("#container");

    const leftMenu = document.createElement("div");
    leftMenu.id = "left-menu";
    leftMenu.classList.add("nav-menu");
    const rightMenu = document.createElement("div");
    rightMenu.id = "right-menu";
    const rightLinks = document.createElement("div");
    rightLinks.id = "right-links"
    rightLinks.classList = "window";
    const statusCafe = document.createElement("div");
    statusCafe.id = "statuscafe";
    statusCafe.classList = "window";
    statusCafe.innerHTML = `<div id="statuscafe-username"></div><div id="statuscafe-content"></div>`;
    rightMenu.appendChild(statusCafe);
    rightMenu.appendChild(rightLinks);
    mainContainer.appendChild(leftMenu);
    mainContainer.appendChild(rightMenu);
    getStatusCafe();

    const leftLinks = document.createElement("ul");

    // asynchronously fetch the site pages and then add them to the list
    fetch("../src/site-pages.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            for (page in data) {
                let listItem = document.createElement("li");
                let link = document.createElement("a");
                link.textContent = page;
                link.href = data[page].url;
                listItem.appendChild(link);
                leftLinks.appendChild(listItem);
            }
        })
        .catch(error => console.error('Failed to fetch data:', error));

    leftMenu.appendChild(leftLinks);

    rightLinks.innerHTML =
        `
            <ul>
                <!--<li>Meet My Neighbors!</li>
                    <ul>
                        <li><a title="olorollo" href="https://olorollo.neocities.org/" target="_blank"><img src="https://olorollo.neocities.org/olorollo-btn.gif"></a></li>
                    </ul> -->
                <li>Cool Sites</li>
                    <ul>
                        <li><a href="https://www.dragonflycave.com"><img src="../src/img/buttons/tcod.gif" /></a></li>
                        <li><a title="olorollo" href="https://olorollo.neocities.org/" target="_blank"><img src="https://olorollo.neocities.org/olorollo-btn.gif"></a></li>
                        <li><a href="https://libre.town/"><img src="../src/img/buttons/8834_libretown.gif" /></a></li>
                        <li><a href="https://www.thefrugalgamer.net/"><img src="../src/img/buttons/frugalgamer_button2.png" /></a></li>
                        <li><a href="https://32bit.cafe/"><img src="../src/img/buttons/32bitty-loren.png" /></a></li>
                    </ul>
                <li>Link my site!</li>
                <li><img src="../src/img/buttons/kimboleh-site-button.gif" /></li>
                <li>
                    <textarea><a href="https://kimboleh.dev"><img src="../src/img/buttons/kimboleh-site-button.gif" /></a></textarea>
                </li>
            </ul>
            <hr>
            <img src="../src/img/buttons/antiai_button.png" />
        `;
});

function getStatusCafe() {
    fetch("https://status.cafe/users/kimbo/status.json")
        .then( r => r.json() )
        .then( r => {
            if (!r.content.length) {
                document.getElementById("statuscafe-content").innerHTML = "No status yet."
                return
            }
            document.getElementById("statuscafe-username").innerHTML = '<a href="https://status.cafe/users/kimbo" target="_blank">' + r.author + '</a> ' + r.face + ' ' + r.timeAgo
            document.getElementById("statuscafe-content").innerHTML = r.content
        })
}