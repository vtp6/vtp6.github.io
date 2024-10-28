const orange_text = document.getElementById("orange");
const purple_text = document.getElementById("purple");

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
    if (++n <= 6) setTimeout(increment, 50)
}

next_run();
