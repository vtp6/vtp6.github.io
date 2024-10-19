function folders_start_game() {
    document.getElementById("settings-bar").hidden = true;

    // game_mode = document.getElementById("gamemode-checkbox").checked ? "match" : "classic";
    game_mode = document.getElementById("gamemode-selector").value;

    if (OPTIONS["lang"] !== "cs") {
        document.getElementById("units-flex").style.display = "none";
        let selected_units = [...
            document.getElementById("units-flex")
            .querySelectorAll("input[type=checkbox]:checked")
        ].map((inputbox) => inputbox.parentElement.getAttribute("name"));

        selected_terms = units.filter(
            lst => selected_units.includes(lst[0][1])
        ).map(arr => arr[1]).flat();
    } else {
        selected_terms = terms;
    }
    
    if (game_mode === "classic") {
        folders_start_legacy(selected_terms)
    } else if (game_mode === "classic_infinite") {
        folders_start_classic(selected_terms);
    } else if (game_mode === "match") {
        folders_start_match(selected_terms);
    } else if (game_mode === "quick_fire") {
        folders_start_quickfire(selected_terms);
    }
}

document.getElementById("start-button").addEventListener("click", folders_start_game);