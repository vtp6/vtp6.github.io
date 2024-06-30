let full_terms_list = [];
let randomised_terms = [];

let [question, answer] = ["", ""];

let split_answer = [];

let textbox = undefined;

let correct = 0;
let wrong = 0;

const THRESHOLD = 0.8

function set_progress_bar_background(val, col) {
    document.getElementById("progress-bar-container").style.background =
        `linear-gradient(to right, ${col} ${val * 100}%, let(--other-colour) ${(1 - val) * 100}%)`;
}

function new_question() {
    [question, answer] = randomised_terms.shift();
    document.getElementById("classic-question-text").innerHTML = sanitise(question);

    split_answer = answer.split(",")
        .map(str => str.split("/")).flat()
        .map(remove_punctuation)
        .map(expand_parens);
}

function check_input_classic() {
    let value = textbox.value;
    let unpunctuated = remove_punctuation(value);
    textbox.value = "";

    let rickroll = [            // Hey there!
        "thonnu",               // 
        "thunno",               // You're looking at the code
        "rujul",                // behind rickrolls on VTP6.
        "rujulnayak",           // 
        "vtp",                  // Enter any of these keywords
        "vtp6",                 // into the input box on VTP6,
        "rick",                 // and you will be redirected
        "rickroll",             // to a rickroll (link below).
        "rickrollme",           // 
        "nevergonnagiveyouup",  // Try it out at your own risk.
    ];

    if (rickroll.includes(unpunctuated))
        return window.open(
            "https://youtu.be/xvFZjo5PgG0", // This is the link.
        "_blank").focus();

    if (split_answer.some(lst => lst.includes(unpunctuated)))
        return true;

    if (split_answer.flat().some(s =>
        levDist(s, unpunctuated) / s.length >= THRESHOLD
    )) {
        // tell the user there's a typo
        return undefined;
    }

    return false;
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
        <input type="text" id="classic-input"
            placeholder="Type the definition here..."
            autocomplete="off" autocorrect="off"
            spellcheck="false" />
    `;
    classic_div.id = "classic-div";
    document.getElementById("content")
        .insertBefore(classic_div, document.getElementById("margin"));

    textbox = document.getElementById("classic-input");
    textbox.focus();

    textbox.addEventListener("keyup", ({ key }) => {
        if (key === "Enter") {
            console.log(check_input_classic());
        }
    });

    new_question();
}


// https://stackoverflow.com/a/11958496 by James Westgate
function levDist(s, t) {
    let d = [];

    let n = s.length;
    let m = t.length;

    if (n == 0) return m;
    if (m == 0) return n;

    for (let i = n; i >= 0; i--) d[i] = [];

    for (let i = n; i >= 0; i--) d[i][0] = i;
    for (let j = m; j >= 0; j--) d[0][j] = j;

    for (let i = 1; i <= n; i++) {
        let s_i = s.charAt(i - 1);

        for (let j = 1; j <= m; j++) {

            if (i == j && d[i][j] > 4) return n;

            let t_j = t.charAt(j - 1);
            let cost = (s_i == t_j) ? 0 : 1;

            let mi = d[i - 1][j] + 1;
            let b = d[i][j - 1] + 1;
            let c = d[i - 1][j - 1] + cost;

            if (b < mi) mi = b;
            if (c < mi) mi = c;

            d[i][j] = mi;

            if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }

    return d[n][m];
}
