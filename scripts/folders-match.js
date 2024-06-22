function folders_start_match(terms) {
    let sample = random_sample(terms, 6);

    let match_div = document.createElement("div");
    match_div.id = "match-div";
    document.getElementById("content").insertBefore(match_div, document.getElementById("margin"));
}