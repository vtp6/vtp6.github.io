let lst = words.split("\n").map(l => l.split("\t"));

let answer = "";
let correct = 0;
let total = 0;

function random_choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function check_input() {
    total++;
    if (answer.split("/").includes(document.getElementById("inp").value)) {
        correct++;
        document.getElementById("msg").innerHTML = "Correct!";
    } else {
        document.getElementById("msg").innerHTML = "Wrong: " + answer;
    }
    document.getElementById("sb").innerHTML = correct + "/" + total +
        " (" + (correct / total * 100).toFixed(2) + "%)";
    if (lst.length > 0) {
        new_question();
    }
}

function new_question() {
    document.getElementById("inp").value = "";
    document.getElementById("inp").focus();
    [document.getElementById("qs").innerHTML, answer] = random_choice(lst);
    lst.splice([document.getElementById("qs").innerHTML, answer], 1);
}

function start() {
    document.getElementById("tbl").hidden = true;
    document.getElementById("btn").hidden = true;
    br1.hidden = true; br2.hidden = true;

    let scorebar = document.createElement("b");
    scorebar.id = "sb";
    scorebar.innerHTML = "0/0 (0.00%)";
    document.body.appendChild(scorebar);

    let question = document.createElement("h3");
    question.id = "qs";
    document.body.appendChild(question);

    let inp = document.createElement("input");
    inp.setAttribute("type", "text");
    inp.id = "inp";
    document.body.appendChild(inp);
    inp.focus();

    document.body.appendChild(document.createElement("br"));

    let messagebar = document.createElement("i");
    messagebar.id = "msg";
    document.body.appendChild(messagebar);

    new_question();

    inp.addEventListener("keyup", ({key}) => {
        if (key === "Enter") {
            check_input();
        }
    });
}

let btn = document.createElement("input");
btn.setAttribute("type", "button");
btn.setAttribute("value", "Start");
btn.onclick = start;
btn.id = "btn"
document.body.appendChild(btn);

document.body.appendChild(br1 = document.createElement("br"));
document.body.appendChild(br2 = document.createElement("br"));

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