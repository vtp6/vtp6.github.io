// NOTE: because Quick Fire and Classic share a lot of features,
// the code behind Quick Fire mode was added to this file instead
// of a separate folders-quickfire.js

let full_terms_list = [];
let randomised_terms = [];

let [question, answer] = ["", ""];

let split_answer = [];

let textbox = undefined;

let correct = 0;
let wrong = 0;

let wrongtbl = [];

let quickfire_timer = 150;
let quickfire_timer_id = 0;
let quickfire_increment = 30;

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

    if (OPTIONS["all"]) document.getElementById("classic-question-text").innerHTML +=
        ` (<span id="classic-all-num">0</span>/${split_answer.length})`;

    if (randomised_terms.length === 0) randomised_terms = random_shuffle(full_terms_list);

    textbox.focus();
}

function update_bar_text() {
    let total = correct + wrong;
    let percentage = correct / total * 100;
    document.getElementById("progress-bar-text").innerHTML =
        `${correct}/${total} (${percentage.toPrecision(3)}%)`;
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

    textbox.classList.remove("correct");
    textbox.classList.remove("wrong");
    textbox.offsetWidth;

    if (OPTIONS["all"]) {
        if (result) {
            textbox.classList.add("correct");
            split_answer = split_answer.filter(l =>
                !l.map(remove_punctuation)
                .includes(remove_punctuation(userans))
            );
            if (split_answer.length === 0) {
                correct++;
                document.getElementById("typo-text").innerHTML = `
                    <span class="green">Correct!</span>
                `;
                new_question();
            } else {
                let n = document.getElementById("classic-all-num");
                n.innerHTML = +n.innerHTML + 1;
                document.getElementById("typo-text").innerHTML = `
                    <span class="green">Keep going!</span>
                `;
            }
        } else {
            wrong++;
            textbox.classList.add("wrong");
            document.getElementById("typo-text").innerHTML = `
                <span class="red">Wrong:</span>
                ${answer}
            `;
            wrongtbl.push([question, answer, userans]);
            new_question();
        }
    } else {
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

function check_input_quickfire() {
    let result = check_input(userans = textbox.value);

    if (result === undefined) return;

    textbox.classList.remove("correct");
    textbox.classList.remove("wrong");
    textbox.offsetWidth;

    if (OPTIONS["all"]) {
        if (result) {
            textbox.classList.add("correct");
            split_answer = split_answer.filter(l =>
                !l.map(remove_punctuation)
                .includes(remove_punctuation(userans))
            );
            if (split_answer.length === 0) {
                correct++;
                document.getElementById("typo-text").innerHTML = `
                    <span class="green">Correct!</span>
                `;
                new_question();
                quickfire_timer += quickfire_increment;
                quickfire_increment = Math.max(quickfire_increment - 2, 5);
            } else {
                let n = document.getElementById("classic-all-num");
                n.innerHTML = +n.innerHTML + 1;
                document.getElementById("typo-text").innerHTML = `
                    <span class="green">Keep going!</span>
                `;
            }
        } else {
            wrong++;
            textbox.classList.add("wrong");
            document.getElementById("typo-text").innerHTML = `
                <span class="red">Wrong:</span>
                ${answer}
            `;
            wrongtbl.push([question, answer, userans]);
            new_question();
        }
    } else {
        if (result) {
            correct++;
            textbox.classList.add("correct");
            document.getElementById("typo-text").innerHTML = `
                <span class="green">Correct!</span>
            `;
            quickfire_timer += quickfire_increment;
            quickfire_increment = Math.max(quickfire_increment - 2, 5);
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
        document.getElementById("classic-div").remove();
        let finish_div = document.createElement("div");
        finish_div.innerHTML = `
            <div id="score-div">
                <h3>${correct}/${correct + wrong} (${(correct / ((correct + wrong) || 1) * 100).toPrecision(3)}%)</h3>
            </div>
            <div id="restart-button-div">
                <button class="start-button" id="classic-restart-button">Restart!</button>
            </div>
            <table id="wrong-table">
                <tr>
                    <th>Term</th>
                    <th>Definition</th>
                    <th>Your&nbsp;Answer</th>
                </tr>
            </table>
        `;
        finish_div.id = "finish-div";
        document.getElementById("content")
            .insertBefore(finish_div, document.getElementById("margin"));

        wrongtbl.forEach(row => {
            let [a, b, c] = row;
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${a}</td> <td>${b}</td>
                <td><em>${c}</em></td>
            `;
            document.getElementById("wrong-table").appendChild(tr);
        });

        document.getElementById("classic-restart-button")
            .addEventListener("click", () => {
                document.getElementById("finish-div").remove();
                document.getElementById("settings-bar").hidden = false;
                document.getElementById("units-flex").style.display = "flex";

                full_terms_list = [];
                randomised_terms = [];

                [question, answer] = ["", ""];

                split_answer = [];

                textbox = undefined;

                correct = 0;
                wrong = 0;

                wrongtbl = [];

                quickfire_timer = 150;
                quickfire_timer_id = 0;
                quickfire_increment = 30;
            });
    }
}

function set_quickfire_high_score(score) {
    let currenths = get_cookies()["vtp6HighScore_quick_fire"];
    if (currenths === undefined || score > +currenths) {
        document.cookie =
            `vtp6HighScore_quick_fire=${score};` +
            `domain=vtp6.rujulnayak.com;path=/;max-age=31536000`;
        return true;
    } else {
        return false;
    }
}

function finish_quickfire_game() {
    clearInterval(quickfire_timer_id);

    document.getElementById("classic-div").remove();

    let high_score = set_quickfire_high_score(correct);

    let finish_div = document.createElement("div");
    finish_div.innerHTML = `
        <div id="score-div">
            <h3>Your score was ${high_score ? `<img class="qf-high-score-image" />` : ""} ${correct}</h3>
        </div>
        <div id="restart-button-div">
            <button class="start-button" id="classic-restart-button">Restart!</button>
        </div>
        <table id="wrong-table">
            <tr>
                <th>Term</th>
                <th>Definition</th>
                <th>Your&nbsp;Answer</th>
            </tr>
        </table>
    `;
    finish_div.id = "finish-div";
    document.getElementById("content")
        .insertBefore(finish_div, document.getElementById("margin"));

    wrongtbl.forEach(row => {
        let [a, b, c] = row;
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${a}</td> <td>${b}</td>
            <td><em>${c}</em></td>
        `;
        document.getElementById("wrong-table").appendChild(tr);
    });

    document.getElementById("classic-restart-button")
        .addEventListener("click", () => {
            document.getElementById("finish-div").remove();
            document.getElementById("settings-bar").hidden = false;
            document.getElementById("units-flex").style.display = "flex";

            full_terms_list = [];
            randomised_terms = [];

            [question, answer] = ["", ""];

            split_answer = [];

            textbox = undefined;

            correct = 0;
            wrong = 0;

            wrongtbl = [];

            quickfire_timer = 150;
            quickfire_timer_id = 0;
            quickfire_increment = 30;
        });
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

function folders_start_quickfire(terms) {
    full_terms_list = [...terms];
    randomised_terms = random_shuffle(terms);

    let classic_div = document.createElement("div");
    classic_div.innerHTML = `
        <div id="quickfire-timer-div">
            <h3 id="quickfire-timer">&nbsp;</h3>
        </div>
        <h1 id="classic-question" class="quickfire-question">
            <span id="classic-question-text" class="quickfire-question-text"></span>
        </h1>
        <div id="input-div">
            <input type="text" id="classic-input" class="quickfire-input"
                placeholder="Type the definition here..."
                autocomplete="off" autocorrect="off"
                spellcheck="false" />
        </div>
        <p id="typo-text">&nbsp;</p>
    `;
    classic_div.id = "classic-div";
    document.getElementById("content")
        .insertBefore(classic_div, document.getElementById("margin"));

    if (OPTIONS["all"]) quickfire_timer = 250;
    document.getElementById("quickfire-timer").innerText = (quickfire_timer / 10).toFixed(1) + "s";

    textbox = document.getElementById("classic-input");

    textbox.addEventListener("keyup", ({ key }) => {
        if (key === "Enter") {
            check_input_quickfire();
        }
    });

    quickfire_timer_id = setInterval(() => {
        document.getElementById("quickfire-timer").innerText =
            (--quickfire_timer / 10).toFixed(1) + "s";
        if (quickfire_timer <= 0) finish_quickfire_game();
    }, 100);

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
