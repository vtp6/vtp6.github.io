const orange_text = document.getElementById("orange");
const purple_text = document.getElementById("purple");
const heading_h1 = document.getElementById("main-header");
const big_logo = document.getElementById("big-logo");
const logo_text = document.getElementById("big-logo-text");

let animation_text = [..."Vocabulary Testing Program"];

function next_run() {
    let character = animation_text.shift();
    orange_text.innerHTML += character;
    if (animation_text.length > 0) {
        setTimeout(next_run, 50);
    } else {
        increment();
    }
}

let n = 1;

function increment() {
    purple_text.innerHTML = "" + n;
    if (++n <= 6) setTimeout(increment, 100)
}

function animation() {
    setTimeout(() => {
        big_logo.classList.add("move-right");
        logo_text.classList.add("show");
    }, 500);
    setTimeout(() => {
        heading_h1.classList.remove("hidden");
        big_logo.classList.add("hidden");
        logo_text.classList.remove("show");
        increment();
    }, 2000);
}

animation();
