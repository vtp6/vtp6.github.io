let match_sample = [];
let match_pairs = [];

let match_selections = [undefined, undefined];
let match_texts = [undefined, undefined];

let match_time = 0;
let match_timer_id = 0;

let completed_pairs = 0;

function folders_start_match(terms) {
    match_sample = random_sample(terms, 6);

    let match_div = document.createElement("div");
    match_div.id = "match-div";
    document.getElementById("content")
        .insertBefore(match_div, document.getElementById("margin"));

    timer_div = document.createElement("div");
    timer_div.id = "timer-div";
    timer_div.innerHTML = `<span id="timer-text">0.0s</span>`;
    match_div.appendChild(timer_div);

    match_timer_id = setInterval(() => {
        document.getElementById("timer-text").innerText =
            (++match_time / 10).toFixed(1) + "s";
    }, 100);
    
    match_pairs = zip(
        random_shuffle(match_sample.map(a => a[0])),
        random_shuffle(match_sample.map(b => b[1]))
    );

    match_pairs.forEach((pair, i) => {
        let line_div = document.createElement("div");
        line_div.classList.add("match-line-div");
        pair.forEach((s, j) => {
            let text_div = document.createElement("div");
            text_div.classList.add("match-text-div");
            text_div.id = "match-text-div-" + i + "-" + j;
            text_div.innerHTML = s.replaceAll("(", "").replaceAll(")", "");
            line_div.appendChild(text_div);
            text_div.addEventListener("click", folders_match_input);
        });
        match_div.appendChild(line_div);
    });

    // window.scrollTo(0, document.body.scrollHeight);
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
        document.getElementById("timer-div").innerHTML +=
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
    }
}