function get_cookies() {
    let str = document.cookie.split(";");
    let d = {};
    for (i = 0; i < str.length; i++) {
        if (str[i] === "") continue;
        let c = str[i].split("=");
        d[c[0].trim()] = c[1].trim();
    }
    return d;
}

function switch_theme() {
    document.body.style.animation = "";
    document.body.offsetWidth;
    document.body.style.animation = "switchTheme 1s";
    if (theme === "light") {
        theme = "dark";
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        document.cookie = "vtp6Theme=dark;domain=vtp6.rujulnayak.com;max-age=31536000";
    } else {
        theme = "light";
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        document.cookie = "vtp6Theme=light;domain=vtp6.rujulnayak.com;max-age=31536000";
    }
}

let theme = get_cookies()["vtp6Theme"];

if (theme === undefined || theme === "light") {
    theme = "light";
    document.body.classList.add("light-theme");
} else {
    theme = "dark";
    document.body.classList.add("dark-theme");
}