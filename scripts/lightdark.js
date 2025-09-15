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
