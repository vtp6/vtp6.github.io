let cookies_button = document.createElement("div");
cookies_button.innerHTML = `
    <h1 id="cookie-title">Cookies on VTP6</h1>
    <p id="cookie-text">
        We use cookies on this site (vtp6.rujulnayak.com) to store your theme preferences,
        to save your high scores, and for website analytics. Aside from analytics, we will
        never use any third party cookies on this website.
    </p>
    <input type="button" id="cookie-button" value="OK &check;" />
`;
cookies_button.id = "cookie-banner";

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

function remove_banner() {
    cookies_button.remove();
    document.cookie = "cookiesAllowed=1;domain=vtp6.rujulnayak.com;max-age=31536000";
}

if (!get_cookies()["cookiesAllowed"]) {
    document.body.appendChild(cookies_button);
    document.getElementById("cookie-button").addEventListener("click", remove_banner);
} else {
    document.cookie = "cookiesAllowed=1;domain=vtp6.rujulnayak.com;max-age=31536000";
}