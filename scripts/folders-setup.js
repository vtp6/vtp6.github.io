if (OPTIONS["lang"] !== "cs") {
    units = TERMS_LIST.split("\n\n");

    const uflex = document.getElementById("units-flex");

    total = 0;

    units = units.map((unit, uindex) => {
        let [unit_header, ...urest] = unit.split("\n");
        if (!assert(unit_header.startsWith("# "),
            "Header " + uindex + " not in proper format.")) return;
        unit_name = unit_header.slice(2);
        unit_varname = unit_name.toLowerCase().replaceAll(" ", "");
        let unit_terms = urest.map((uline, ulindex) => {
            let uret = uline.split("\t");
            if (assert(uret.length === 2,
                "Line not in proper format in " +
                unit_name + " (line " + ulindex + ").")
            ) return uret;
        }).filter(l => l !== undefined);
        let uflexbox = document.createElement("div");
        uflexbox.classList.add("units-flexbox");
        uflexbox.setAttribute("name", unit_varname);
        uflexbox.innerHTML = `
            <input type="checkbox" class="folders-checkbox" />
            <span class="checkbox-label">${unit_name} <i>(${unit_terms.length})</i></span>`;
        uflex.appendChild(uflexbox);
        total += unit_terms.length;
        return [[unit_name, unit_varname], unit_terms];
    });

    assert(is_unique(units.map(l => l[0][1])), "Headers are not unique.");

    assert(units.length == NUM_UNITS, "Expected " + NUM_UNITS + " units, got " + units.length + ".");

    document.getElementById("insert-length-here").innerHTML = "(" + total + " terms)";

    let download = document.createElement("button");
    download.id = "dl";
    download.classList.add("start-button");
    download.innerHTML = "Download Files";
    download.addEventListener("click", () => {
        let a = document.createElement("a");
        a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(TERMS_LIST);
        a.download = OPTIONS["name"] + " - VTP6.txt";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        a.remove();
    });
    document.getElementById("content").insertBefore(download, document.getElementById("margin"));
}