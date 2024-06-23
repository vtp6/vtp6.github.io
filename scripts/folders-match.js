function folders_start_match(terms) {
    let sample = random_sample(terms, 6);

    let match_div = document.createElement("div");
    match_div.id = "match-div";
    document.getElementById("content").insertBefore(match_div, document.getElementById("margin"));
    
    let pairs = zip(random_shuffle(sample.map(a => a[0])), random_shuffle(sample.map(b => b[1])));
    pairs.forEach((pair, i) => {
        let line_div = document.createElement("div");
        line_div.classList.add("match-line-div");
        pair.forEach((s, j) => {
            let text_div = document.createElement("div");
            text_div.classList.add("match-text-div");
            text_div.id = "match-text-div-" + i + "-" + j;
            text_div.innerHTML = s;
            line_div.appendChild(text_div);
        });
        match_div.appendChild(line_div);
    });
}