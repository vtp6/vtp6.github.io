if (OPTIONS["lang"] !== "cs") {
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
}

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
    classic_infinite: "Same as Classic mode, except you can keep answering questions for as long as you want.",
    match: "Match the terms on the left to the definitions on the right as quickly as possible.",
    quick_fire: "Race against the clock to answer as many questions as possible in a set amount of time."
}

let gms = document.getElementById("gamemode-selector");

Object.keys(GAME_MODE_DESCRIPTIONS).forEach(key => {
    let optn = document.createElement("option");
    optn.value = key;
    optn.innerHTML = title_case(key.replaceAll("_", " "));
    gms.appendChild(optn);
});

let last_game_mode = localStorage.getItem("vtp6GameMode");
if (Object.keys(GAME_MODE_DESCRIPTIONS).includes(last_game_mode))
    gms.value = last_game_mode;

function update_help_tip() {
    document.getElementById("help-tip").innerHTML =
        `<i>${GAME_MODE_DESCRIPTIONS[gms.value]}</i> &nbsp; <a href="/help#game-mode">Help.</a>`;
    let high_score = localStorage.getItem(`vtp6HighScore_` + gms.value);
    if (high_score !== null) {
        document.getElementById("high-score-text").innerHTML = high_score;
    } else {
        document.getElementById("high-score-text").innerHTML = "N/A";
    }
    localStorage.setItem("vtp6GameMode", gms.value);
}

gms.addEventListener("input", update_help_tip);

update_help_tip();