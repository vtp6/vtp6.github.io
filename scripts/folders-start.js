function folders_start_game() {
    document.getElementById("settings-bar").hidden = true;
    document.getElementById("units-flex").style.display = "none";

    game_mode = document.getElementById("gamemode-checkbox").checked ? "match" : "classic";

    let selected_units = [...
        document.getElementById("units-flex")
        .querySelectorAll("input[type=checkbox]:checked")
    ].map((inputbox) => inputbox.parentElement.getAttribute("name"));

    let selected_terms = units.filter(
        lst => selected_units.includes(lst[0][1])
    ).map(arr => arr[1]).flat();

    if (game_mode === "match") {
        folders_start_match(selected_terms);
    } else if (game_mode === "classic") {
        folders_start_classic(selected_terms);
    }
}

document.getElementById("start-button").addEventListener("click", folders_start_game);