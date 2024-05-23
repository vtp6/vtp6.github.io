let cks = document.createElement("div");
cks.innerHTML = `
    <h1 id="cookie-title">Cookies on VTP6</h1>
    <p id="cookie-text">
        We use cookies on this site (vtp6.rujulnayak.com) to store your theme preferences,
        and to save your high scores. We will never use cookies to track you or store your
        personal data.
    </p>
    <input type="button" id="cookie-button" value="OK &check;" />
`;
cks.id = "cookie-banner";

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
    cks.remove();
    document.cookie = "cookiesAllowed=1;domain=vtp6.rujulnayak.com;max-age=31536000";
}

if (!get_cookies()["cookiesAllowed"]) {
    document.body.appendChild(cks);
    document.getElementById("cookie-button").addEventListener("click", remove_banner);
} else {
    document.cookie = "cookiesAllowed=1;domain=vtp6.rujulnayak.com;max-age=31536000";
}