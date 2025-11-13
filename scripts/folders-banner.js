// Handles the "this specification is now obsolete" banner

const warn_div = document.getElementById("warning");
const btn1 = document.getElementById("warning-dismiss");
const btn2 = document.getElementById("warning-never");

if (localStorage.getItem("vtp6BannerOff") !== "1") warn_div.classList.remove("hidden");

btn1.addEventListener("click", () => warn_div.classList.add("hidden"));
btn2.addEventListener("click", () => {
    warn_div.classList.add("hidden");
    localStorage.setItem("vtp6BannerOff", "1");
});
