let match_sample = [];
let match_pairs = [];

let match_selections = [undefined, undefined];
let match_texts = [undefined, undefined];

let match_time = 0;
let match_timer_id = 0;

let completed_pairs = 0;

function three_two_one_go() {
    let countdown_text = document.createElement("h1");
    countdown_text.innerHTML = "3";
    countdown_text.id = "match-countdown";
    document.getElementById("match-div").appendChild(countdown_text);

    setTimeout(() => {
        countdown_text.innerHTML = "2";
        countdown_text.style.animation = "none";
        countdown_text.offsetWidth;
        countdown_text.style.animation = "threeTwoOne 1s";
    }, 1000);

    setTimeout(() => {
        countdown_text.innerHTML = "1";
        countdown_text.style.animation = "none";
        countdown_text.offsetWidth;
        countdown_text.style.animation = "threeTwoOne 1s";
    }, 2000);

    setTimeout(() => {
        document.getElementById("timer-text").innerText = "0.0s";
        match_timer_id = setInterval(() => {
            document.getElementById("timer-text").innerText =
                (++match_time / 10).toFixed(1) + "s";
        }, 100);
        [...document.querySelectorAll(".match-text-div.blur")].forEach(a => {
            a.classList.remove("blur");
            a.addEventListener("click", folders_match_input);
        });
        countdown_text.remove();
    }, 3000);
}

function folders_start_match(terms) {
    match_sample = random_sample(terms, 6);

    let match_div = document.createElement("div");
    match_div.id = "match-div";
    document.getElementById("content")
        .insertBefore(match_div, document.getElementById("margin"));

    timer_div = document.createElement("div");
    timer_div.id = "timer-div";
    timer_div.innerHTML = `<span id="timer-text">&nbsp;</span>`;
    match_div.appendChild(timer_div);
    
    match_pairs = zip(
        random_shuffle(match_sample.map(a => a[0])),
        random_shuffle(match_sample.map(b => b[1]))
    );

    match_pairs.forEach((pair, i) => {
        let line_div = document.createElement("div");
        line_div.classList.add("match-line-div");
        pair.forEach((s, j) => {
            let text_div = document.createElement("div");
            text_div.classList.add("match-text-div", "blur");
            text_div.id = "match-text-div-" + i + "-" + j;
            text_div.innerHTML = sanitise(s).replaceAll("(", "").replaceAll(")", "");
            line_div.appendChild(text_div);
        });
        match_div.appendChild(line_div);
    });

    window.scrollTo(0, document.body.scrollHeight);

    three_two_one_go();
}

function folders_match_input(event) {
    let elem = event.target;
    if ([...elem.classList].includes("done")) return;
    let srcid = elem.id.split("-");
    let [x, y] = srcid.slice(srcid.length - 2);
    match_texts[+y] = match_pairs[+x][+y];
    let prev_selection = match_selections[+y];
    if (prev_selection === elem) {
        elem.classList.remove("selected");
        match_selections[+y] = undefined;
    } else {
        if (prev_selection !== undefined)
            prev_selection.classList.remove("selected");
        elem.classList.add("selected");
        match_selections[+y] = elem;
    }
    if (match_selections[0] !== undefined
        && match_selections[1] !== undefined)
            folders_match_check_input();
}

function folders_match_check_input() {
    match_selections.forEach((element, index) => {
        element.classList.remove("wrong");
        element.classList.remove("selected");
        if (match_sample.map(JSON.stringify).includes(JSON.stringify(match_texts))) {
            element.classList.add("done");
            element.innerHTML =
                `<img id="folders-done-image" height="${element.offsetHeight / 2}px" />`;
            if (index === 0) completed_pairs++;
        } else {
            element.classList.remove("wrong");
            element.offsetHeight;
            element.classList.add("wrong");
            match_time += 5;
        }
    });
    match_selections = [undefined, undefined];
    if (completed_pairs === 6) {
        clearInterval(match_timer_id);
        window.scrollTo(0, 0);
        let temp_string = "";
        if (set_match_high_score(match_time / 10))
            temp_string = ` <img class="high-score-image" /> `;
        update_help_tip();
        document.getElementById("timer-div").innerHTML =
            `<button class="start-button" id="share-button" role="button">Share!</button>` +
            temp_string + document.getElementById("timer-div").innerHTML + temp_string +
            `<button class="start-button" id="restart-button" role="button">Restart!</button>`;
        document.getElementById("restart-button").addEventListener("click", () => {
            document.getElementById("match-div").remove();
            document.getElementById("settings-bar").hidden = false;
            document.getElementById("units-flex").style.display = "flex";
            
            match_sample = [];
            match_pairs = [];

            match_selections = [undefined, undefined];
            match_texts = [undefined, undefined];

            match_time = 0;
            match_timer_id = 0;

            completed_pairs = 0;
        });
        document.getElementById("share-button").addEventListener("click", () => {
            let link = document.createElement("a");
            link.download = "vtp6-match.png";
            link.href = create_match_image();
            link.click();
            if (navigator.share) {
                navigator.share({
                    title: "VTP6 Match",
                    text: `I completed ${OPTIONS["name"]} Match mode in ${(match_time / 10).toFixed(1)}s on VTP6. ` +
                    `\nCan you beat me? Try it here: ${location.href}`
                });
            }
        });
    }
}

function create_match_image() {
    let cnv = document.createElement("canvas");
    cnv.width = cnv.height = 2000;
    let ctx = cnv.getContext("2d");
    ctx.textAlign = "center";

    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    ctx.font = "120px Metropolitis";
    ctx.fillStyle = "#2a8c8c";
    ctx.fillText("Vocabulary Testing Program 6", cnv.width / 2, 200);

    ctx.font = "250px Metropolitis";
    ctx.fillStyle = "#8c2a8c"
    ctx.fillText((match_time / 10).toFixed(1) + "s", cnv.width / 2, 1000);

    ctx.font = "50px Manrope";
    ctx.fillStyle = "#e0f0f0";
    ctx.fillText("vtp6.rujulnayak.com", cnv.width / 2, 1950);

    ctx.font = "80px Manrope";
    ctx.fillText("I completed " + OPTIONS["name"] + " Match mode in", cnv.width / 2, 700);

    ctx.font = "100px Manrope"
    ctx.fillStyle = "orange";
    ctx.fillText("Can you beat me?", cnv.width / 2, 1500);

    let data = cnv.toDataURL('image/png');
    return data;
}

function set_match_high_score(score) {
    let currenths = localStorage.getItem("vtp6HighScore_match");
    if (currenths === null || score < +currenths.slice(0, -1)) {
        localStorage.setItem("vtp6HighScore_match", score.toFixed(1) + "s");
        return true;
    } else {
        return false;
    }
}