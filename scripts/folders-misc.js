let units_flexboxes = [...document.querySelectorAll("div.units-flexbox")];

units_flexboxes.forEach(flexbox => {
    flexbox.addEventListener("click", (event) => {
        let target = event.target;
        if (target.nodeName === "INPUT") return;
        while (target.nodeName !== "DIV") target = target.parentElement;
        let checkbox = target.querySelector(`input[type="checkbox"]`);
        console.log(checkbox);
        checkbox.checked = !checkbox.checked;
    }, true);
})