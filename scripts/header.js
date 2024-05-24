let header_version = -1;

function add_header() {
    let screen_width = window.innerWidth;

    if (screen_width >= 1000 && header_version !== 0) {
        document.getElementById("header").innerHTML = `
            <a href="/"><img src="/logos/logo-banner.png" id="banner-logo" /></a>
            <a href="/about/" class="banner-link">ABOUT</a>
            <a href="/folders/" class="banner-link">FOLDERS</a>
            <a href="/grammar/" class="banner-link">GRAMMAR</a>
            <a href="/credits/" class="banner-link">CREDITS</a>
            <img src="/images/dark.svg" id="theme-button" />
        `;

        header_version = 0
    } else if (screen_width < 1000 && header_version !== 1) {
        document.getElementById("header").innerHTML = `
            <a href="/"><img src="/logos/logo-banner.png" id="banner-logo" /></a>
            <img id="dropdown-arrow" />
            <div id="dropdown-container">
                <a href="/about/" class="banner-link">ABOUT</a>
                <a href="/folders/" class="banner-link">FOLDERS</a>
                <a href="/grammar/" class="banner-link">GRAMMAR</a>
                <a href="/credits/" class="banner-link">CREDITS</a>
            </div>
            <img id="theme-button" />
        `;

        let dropdown_container = document.getElementById("dropdown-container");
        dropdown_container.style.display = "none";

        document.getElementById("dropdown-arrow").addEventListener("click", () => {
            if (dropdown_container.style.display === "none") {
                dropdown_container.style.display = "inherit";
            } else {
                dropdown_container.style.display = "none";
            }
        });

        header_version = 1;
    }
}

add_header();
window.addEventListener("resize", add_header);