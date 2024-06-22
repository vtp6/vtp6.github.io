let units_flexboxes = [...document.querySelectorAll("div.units-flexbox")];

let [unit_all, ...unit_checkboxes] = [...document.querySelectorAll(`input.folders-checkbox`)];

let the_start_button_element = document.getElementById("start-button");

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
    the_start_button_element.disabled = !unit_checkboxes.some(box => box.checked);
}

document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "a") {
        event.preventDefault();
        unit_all.checked = true;
        change_all_box(unit_all);
    }
});