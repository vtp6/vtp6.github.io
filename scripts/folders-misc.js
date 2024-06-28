let units_flexboxes = [...document.querySelectorAll("div.units-flexbox")];

let [unit_all, ...unit_checkboxes] = [...document.querySelectorAll(`input.folders-checkbox`)];

units_flexboxes.forEach(flexbox => {
    flexbox.addEventListener("click", (event) => {
        let target = event.target;
        if (target.nodeName === "INPUT") return;
        while (target.nodeName !== "DIV") target = target.parentElement;
        let checkbox = target.querySelector(`input[type="checkbox"]`);
        console.log(checkbox);
        checkbox.checked = !checkbox.checked;
        change_all_box(checkbox);
    }, true);
});

[...unit_checkboxes, unit_all].forEach(checkbox => {
    checkbox.addEventListener("input", (event) => {
        change_all_box(event.target);
    });
});

function change_all_box(ubox) {
    if (ubox === unit_all) {
        unit_checkboxes.forEach(ucbox => ucbox.checked = unit_all.checked);
    } else {
        unit_all.checked = unit_checkboxes.every(box => box.checked);
    }
    document.getElementById("start-button").disabled = !unit_checkboxes.some(box => box.checked);
}

document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "a") {
        event.preventDefault();
        unit_all.checked = true;
        change_all_box(unit_all);
    }
});

// function gamemode_checkbox_input() {
//     if (document.getElementById("gamemode-checkbox").checked) {
//         document.getElementById("before-slider").classList.add("not-selected");
//         document.getElementById("after-slider").classList.remove("not-selected");
//     } else {
//         document.getElementById("after-slider").classList.add("not-selected");
//         document.getElementById("before-slider").classList.remove("not-selected");
//     }
// }

// document.getElementById("gamemode-checkbox").addEventListener("input", gamemode_checkbox_input);

// document.getElementById("before-slider").addEventListener("click", () => {
//     document.getElementById("gamemode-checkbox").checked = false;
//     gamemode_checkbox_input();
// });

// document.getElementById("after-slider").addEventListener("click", () => {
//     document.getElementById("gamemode-checkbox").checked = true;
//     gamemode_checkbox_input();
// });

const GAME_MODE_DESCRIPTIONS = {
    classic: "Simply give the definition of each term that comes up. No clock, no high scores, no stress.",
    match: "Match the terms on the left to the definitions on the right as quickly as possible.",
    quick_fire: "Race against the clock to answer as many questions as possible."
}

let gms = document.getElementById("gamemode-selector");

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }

Object.keys(GAME_MODE_DESCRIPTIONS).forEach(key => {
    let optn = document.createElement("option");
    optn.value = key;
    optn.innerHTML = toTitleCase(key.replaceAll("_", " "));
    gms.appendChild(optn);
});

function update_help_tip() {
    let selected_game_mode = GAME_MODE_DESCRIPTIONS[gms.value];
    document.getElementById("help-tip").innerHTML =
        `<i>${selected_game_mode}</i> &nbsp; <a href="/help/game-mode">Help.</a>`;
    let high_score = get_cookies()[`vtp6HighScore_` + selected_game_mode];
    if (high_score !== undefined) {
        document.getElementById("high-score-text").innerHTML = high_score;
    } else {
        document.getElementById("high-score-text").innerHTML = "N/A";
    }
}

gms.addEventListener("input", update_help_tip);

update_help_tip();