let lst = words.split("\n").map(l => l.split("\t"));

// const h1 = document.querySelector("h1");
// if (h1.innerHTML !== "VTP6") {
//     alert("Error!");
//     throw new Error();
// }

function random_choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function start() {
    document.getElementById("tbl").hidden = true;
    document.getElementById("btn").hidden = true;
}

let btn = document.createElement("input");
btn.setAttribute("type", "button");
btn.setAttribute("value", "Start");
btn.onclick = start;
btn.id = "btn"
document.body.appendChild(btn);

document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"));

let table = document.createElement("table");
table.id = "tbl";

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