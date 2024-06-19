/* <div class="units-flexbox" name="unit1">
    <input type="checkbox" class="folders-checkbox" />
    <span class="checkbox-label">Unit 1</span>
</div> */

let units = TERMS_LIST.split("\n\n");

const uflex = document.getElementById("units-flex");

units = units.map((unit, uindex) => {
    let [unit_header, ...urest] = unit.split("\n");
    assert(unit_header.startsWith("# "), "Header " + uindex + " not in proper format.");
    unit_name = unit_header.slice(2);
    unit_varname = unit_name.toLowerCase().replaceAll(" ", "");
    let unit_terms = urest.map((uline, ulindex) => {
        let uret = uline.split("\t");
        assert(uret.length === 2, "Line not in proper format in " + unit_name + " (line " + ulindex + ").");
        return uret;
    });
    let uflexbox = document.createElement("div");
    uflexbox.classList.add("units-flexbox");
    uflexbox.setAttribute("name", unit_varname);
    uflexbox.innerHTML = `
        <input type="checkbox" class="folders-checkbox" />
        <span class="checkbox-label">${unit_name} <i>(${unit_terms.length})</i></span>`;
    uflex.appendChild(uflexbox);
    return [[unit_name, unit_varname], unit_terms];
});