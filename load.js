// Load the links onto the main page

const ll = document.getElementById("linklist");

LIST_OF_LINKS.forEach(s => {
    if (s === "") {
        ll.appendChild(document.createElement("br"));
    } else {
        let newli = document.createElement("li");
        newli.innerHTML = `<a href="./sets/` + s.replaceAll(" ", "") + `">` + s + `</a>`;
        ll.appendChild(newli);
    }
});