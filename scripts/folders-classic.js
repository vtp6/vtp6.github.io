let full_terms_list = [];
let randomised_terms = [];

let [question, answer] = ["", ""];

let split_answer = [];

let textbox = undefined;

let correct = 0;
let wrong = 0;

let wrongtbl = [];

const THRESHOLD = 0.2; // 80% typo detection threshold

function set_progress_bar_background(val) {
    document.getElementById("progress-bar")
        .style.width = `${100 - val}%`;
}

function new_question() {
    [question, answer] = randomised_terms.shift();
    document.getElementById("classic-question-text").innerHTML = sanitise(question);

    split_answer = answer.toLowerCase().split(",")
        .map(str => str.split("/")).flat()
        .map(expand_parens);

    if (randomised_terms.length === 0) randomised_terms = random_shuffle(full_terms_list);

    textbox.focus();
}

function update_bar_text() {
    let total = correct + wrong;
    let percentage = correct / total * 100;
    document.getElementById("progress-bar-text").innerHTML =
        `${correct}/${total} (${percentage.toFixed(2)}%)`;
    set_progress_bar_background(percentage);
}

function check_input(value) {
    let unpunctuated = remove_punctuation(value.toLowerCase());
    textbox.value = "";

    let typo_p = document.getElementById("typo-text");

    let typo = typo_p.innerHTML === `<span class="orange">Typo?</span> Try again.`;
    typo_p.innerHTML = "&nbsp;";

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

    if (split_answer.some(lst =>
        lst.map(remove_punctuation).includes(unpunctuated))
    ) return true;

    if (typo) return false;

    if (split_answer.flat().some(s => {
        let ans = levDist(remove_punctuation(s), unpunctuated) /
            remove_punctuation(s).length;
        console.log(ans);
        return ans <= THRESHOLD;
    })) {
        textbox.value = value;
        typo_p.innerHTML = `<span class="orange">Typo?</span> Try again.`;
        return undefined;
    }

    return false;
}

function check_input_classic() {
    let result = check_input(userans = textbox.value);

    if (result === undefined) return;

    if (OPTIONS["all"]) {
        // coming soon...
    } else {
        textbox.classList.remove("correct");
        textbox.classList.remove("wrong");
        textbox.offsetWidth;
        if (result) {
            correct++;
            textbox.classList.add("correct");
            document.getElementById("typo-text").innerHTML = `
                <span class="green">Correct!</span>
            `;
        } else {
            wrong++;
            textbox.classList.add("wrong");
            document.getElementById("typo-text").innerHTML = `
                <span class="red">Wrong:</span>
                ${answer}
            `;
            wrongtbl.push([question, answer, userans]);
        }
        new_question();
    }
    update_bar_text();
}

function finish_classic_game() {
    let nrn = next_round_number(correct + wrong);
    let left = nrn - correct - wrong;
    if (window.confirm(
        "Are you completely sure you want to finish the game?" +
        (left < Math.max((correct + wrong) / 10, 10) ?
            `\n\nOnly ${pluralise(left, " more question")} ` +
            `to go until you have completed ${nrn} questions.`
        : "")
    )) {
        // finish the game (coming soon)
    }
}

function folders_start_classic(terms) {
    full_terms_list = [...terms];
    randomised_terms = random_shuffle(terms);

    let classic_div = document.createElement("div");
    classic_div.innerHTML = `
        <div id="progress-bar-div">
            <div id="progress-bar-container"><div id="progress-bar"></div></div>
            <span id="progress-bar-text">0/0 (0.00%)</span>
        </div>
        <h1 id="classic-question">
            <button class="start-button" id="skip-button">Skip &rarr;</button>
            <span id="classic-question-text"></span>
            <button class="start-button" id="finish-button">Finish!</button>
        </h1>
        <div id="input-div">
            <input type="text" id="classic-input"
                placeholder="Type the definition here..."
                autocomplete="off" autocorrect="off"
                spellcheck="false" />
            <button class="start-button" id="square-finish-button"><img id="finish-image" /></button>
        </div>
        <p id="typo-text">&nbsp;</p>
    `;
    classic_div.id = "classic-div";
    document.getElementById("content")
        .insertBefore(classic_div, document.getElementById("margin"));

    textbox = document.getElementById("classic-input");

    document.getElementById("skip-button").addEventListener("click", () =>
        (textbox.value = "") || check_input_classic()
    );

    document.getElementById("finish-button").addEventListener("click", finish_classic_game);
    document.getElementById("square-finish-button").addEventListener("click", finish_classic_game);

    textbox.addEventListener("keyup", ({ key }) => {
        if (key === "Enter") {
            check_input_classic();
        }
    });

    window.scrollTo(0, 0);
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
