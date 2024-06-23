let match_sample = [];
let match_pairs = [];

match_selections = [undefined, undefined];
match_texts = [undefined, undefined];

function folders_start_match(terms) {
    match_sample = random_sample(terms, 6);

    let match_div = document.createElement("div");
    match_div.id = "match-div";
    document.getElementById("content")
        .insertBefore(match_div, document.getElementById("margin"));
    
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
    match_selections.forEach(element => {
        element.classList.remove("selected");
        if (match_sample.map(JSON.stringify).includes(JSON.stringify(match_texts))) {
            element.classList.add("done");
            element.innerHTML =
                `<img id="folders-done-image" height="${element.offsetHeight / 2}px" />`;
        } else {
            element.classList.add("wrong");
        }
    });
    match_selections = [undefined, undefined];
}