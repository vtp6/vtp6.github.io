let header_version = -1;
const LOGO = "banner";

function add_header() {
    let screen_width = window.innerWidth;

    if (screen_width >= 1000 && header_version !== 0) {
        document.getElementById("header").innerHTML = `
            <a href="/"><img src="/logos/logo-${LOGO}.png" id="banner-logo" alt="VTP6" /></a>
            <a href="/help/" class="banner-link no-underline">HELP</a>
            <a href="/folders/" class="banner-link no-underline">FOLDERS</a>
            <a href="/grammar/" class="banner-link no-underline">GRAMMAR</a>
            <a href="/other/" class="banner-link no-underline">OTHER</a>
            <img id="theme-button" alt="Toggle theme" />
        `;

        header_version = 0;

        document.getElementById("theme-button").addEventListener("click", switch_theme);

    } else if (screen_width < 1000 && header_version !== 1) {
        document.getElementById("header").innerHTML = `
            <img id="dropdown-arrow" alt="Menu" />
            <a href="/" class="centre"><img src="/logos/logo-${LOGO}.png" id="banner-logo" alt="VTP6" /></a>
            <div id="dropdown-container" class="hidden">
                <a href="/help/" class="banner-link no-underline">HELP</a>
                <a href="/folders/" class="banner-link no-underline">FOLDERS</a>
                <a href="/grammar/" class="banner-link no-underline">GRAMMAR</a>
                <a href="/other/" class="banner-link no-underline">OTHER</a>
            </div>
            <img id="theme-button" alt="Toggle theme" />
        `;

        let dropdown_container = document.getElementById("dropdown-container");

        document.getElementById("dropdown-arrow").addEventListener("click", () => {
            if ([...dropdown_container.classList].includes("hidden")) {
                dropdown_container.classList.remove("hidden");
                document.getElementById("dropdown-arrow").classList.add("close-button");
            } else {
                dropdown_container.classList.add("hidden");
                document.getElementById("dropdown-arrow").classList.remove("close-button");
            }
        });

        header_version = 1;

        document.getElementById("theme-button").addEventListener("click", switch_theme);
    }
}

add_header();
window.addEventListener("resize", add_header);