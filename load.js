// Load the links onto the main page

const ll = document.getElementById("linklist");

LIST_OF_LINKS.forEach(s => {
    let newli = document.createElement("li");
    newli.innerHTML = `<a href="./` + s.replaceAll(" ", "") + `">` + s + `</a>`;
    ll.appendChild(newli);
});