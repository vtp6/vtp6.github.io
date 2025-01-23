// As of 23rd Jan 2025, we've switched from cookies to local storage.
// The code in this file is now no longer necessary.

/*

const MAIN_BANNER = false;
const BANNER_COOKIE = "vtp6NewLogo1";

let cookies_button = document.createElement("div");
cookies_button.innerHTML = `
    <h1 id="cookie-title">Welcome to the new VTP6</h1>
    <p id="cookie-text">
        We use cookies on this site (vtp6.rujulnayak.com) to store your theme preferences,
        to save your statistics on this website (e.g. high scores), and for website analytics.
        Aside from analytics, we will never use any third party cookies on this website.
        For more info, see <a href="/help#cookies">the Help page</a>.
    </p>
    <input type="button" id="cookie-button" value="OK &check;" />
`;
cookies_button.id = "cookie-banner";

let main_banner = document.createElement("div");
main_banner.innerHTML = `
    <h1 id="banner-title">New Logo Feedback</h1>
    <p id="banner-text">
        We've changed our logo and would like some feedback. Click the button below to
        see the changes.
    </p>
    <input type="button" id="logo-button" value="See changes" /> &nbsp;
    <input type="button" id="dismiss-banner" value="Dismiss" />
`;
main_banner.id = "main-banner";

function remove_cookies_banner() {
    cookies_button.remove();
    document.cookie = "cookiesAllowed=1;domain=vtp6.rujulnayak.com;path=/;max-age=31536000";
}

function remove_main_banner() {
    main_banner.remove();
    document.cookie = BANNER_COOKIE + "=1;domain=vtp6.rujulnayak.com;path=/;max-age=31536000";
}

if (!get_cookies()["cookiesAllowed"]) {
    document.body.appendChild(cookies_button);
    document.getElementById("cookie-button").addEventListener("click", remove_cookies_banner);
} else {
    document.cookie = "cookiesAllowed=1;domain=vtp6.rujulnayak.com;path=/;max-age=31536000";
}

if (!get_cookies()[BANNER_COOKIE] && MAIN_BANNER) {
    document.body.appendChild(main_banner);
    document.getElementById("dismiss-banner").addEventListener("click", remove_main_banner);
    document.getElementById("logo-button").addEventListener("click", () => {remove_main_banner(); window.open("/new-logo/");});
} else {
    document.cookie = BANNER_COOKIE + "=1;domain=vtp6.rujulnayak.com;path=/;max-age=31536000";
}

function delete_cookies() {
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
}

*/
