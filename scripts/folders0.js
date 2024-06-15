let units_flexboxes = [...document.querySelectorAll("div.units-flexbox")];

units_flexboxes.forEach(flexbox => {
    flexbox.addEventListener("click", (event) => {
        let checkbox = event.target.querySelector(`input[type="checkbox"]`);
        console.log(checkbox);
        checkbox.checked = !checkbox.checked;
    })
})