function get_cookies() {
    let str = document.cookie.split(";");
    let d = {};
    for (i = 0; i < str.length; i++) {
        if (str[i] === "") continue;
        let c = str[i].split("=");
        if (d[c[0].trim()] === undefined)
            d[c[0].trim()] = c[1].trim();
    }
    return d;
}


// Port to local storage

if (localStorage.length === 0) {
    d = get_cookies();
    for (key in d) {
        if (key !== "cookiesAllowed" && key !== "vtp6NewLogo1")
            localStorage.setItem(key, d[key]);
    }
}


function switch_theme() {
    document.body.style.animation = "";
    document.body.offsetWidth;
    document.body.style.animation = "switchTheme 1s";
    if (theme === "light") {
        theme = "dark";
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        localStorage.setItem("vtp6Theme", "dark");
    } else {
        theme = "light";
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        localStorage.setItem("vtp6Theme", "light");
    }
}

let theme = localStorage.getItem("vtp6Theme");

if (theme === undefined || theme === "light") {
    theme = "light";
    document.body.classList.add("light-theme");
} else {
    theme = "dark";
    document.body.classList.add("dark-theme");
}
