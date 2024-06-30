let full_terms_list = [];
let randomised_terms = [];

let [question, answer] = ["", ""];

let textbox = undefined;

function set_progress_bar_background(val, col) {
    document.getElementById("progress-bar-container").style.background =
        `linear-gradient(to right, ${col} ${val * 100}%, var(--other-colour) ${(1 - val) * 100}%)`;
}

function new_question() {
    [question, answer] = randomised_terms.shift();
    document.getElementById("classic-question-text").innerHTML = sanitise(question);
}

function folders_start_classic(terms) {
    full_terms_list = [...terms];
    randomised_terms = random_shuffle(terms);

    let classic_div = document.createElement("div");
    classic_div.innerHTML = `
        <div id="progress-bar-div">
            <div id="progress-bar-container"></div>
            <span id="progress-bar-text">0/0 (0.00%)</span>
        </div>
        <h1 id="classic-question">
            <span id="classic-question-text"></span>
            <button class="start-button" id="finish-button">Finish!</button>
        </h1>
        <input type="text" id="classic-input" placeholder="Type the definition here..." />
    `;
    classic_div.id = "classic-div";
    document.getElementById("content")
        .insertBefore(classic_div, document.getElementById("margin"));

    textbox = document.getElementById("classic-input");
    textbox.focus();

    new_question();
}