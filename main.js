let lst = words.split("\n").map(l => l.split("\t"));
console.log(lst);

// const h1 = document.querySelector("h1");
// if (h1.innerHTML !== "VTP6") {
//     alert("Error!");
//     throw new Error();
// }

let table = document.createElement("table");

let head = document.createElement("tr");
head.innerHTML = `<th>Term</th> <th>Definition</th>`
table.appendChild(head);

lst.forEach(x => {
    let [a, b] = x;
    let row = document.createElement("tr");
    if (a.length > 20) {
        a = a.slice(0, 17) + "...";
    }
    if (b.length > 20) {
        b = b.slice(0, 17) + "...";
    }
    row.innerHTML = `<td>` + a + `</td> <td>` + b + `</td>`;
    table.appendChild(row);
})

document.body.appendChild(table);