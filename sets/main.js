let lst = words.split("\n").map(l => l.split("\t"));

let h1 = document.querySelector("h1");
h1.innerHTML = `<a href="../../">VTP6</a>`;

let answer = "";
let correct = 0;
let total = 0;

function random_choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function check_input_classic() {
    total++;
    if (answer.toLowerCase().split("/").includes(document.getElementById("inp").value.toLowerCase())) {
        correct++;
        document.getElementById("msg").innerHTML = "Correct!";
    } else {
        document.getElementById("msg").innerHTML = "Wrong: " + answer;
    }
    document.getElementById("sb").innerHTML = correct + "/" + total +
        " (" + (correct / total * 100).toFixed(2) + "%)";
    if (total < +document.getElementById("sld").value) {
        new_question_classic();
    } else {
        document.getElementById("inp").value = "";
        document.getElementById("inp").disabled = true;
        document.getElementById("qs").innerHTML =
            `<input type=button onclick="javascript:location.reload();" value="Restart" />`;
    }
}

function new_question_classic() {
    document.getElementById("inp").value = "";
    document.getElementById("inp").focus();
    [document.getElementById("qs").innerHTML, answer] = random_choice(lst);
    lst.splice([document.getElementById("qs").innerHTML, answer], 1);
}

function start_classic() {
    document.getElementById("tbl").hidden = true;
    document.getElementById("btn").hidden = true;
    document.getElementById("lbl").hidden = true;
    document.getElementById("sld").hidden = true;
    document.getElementById("num").hidden = true;
    br1.hidden = true; br2.hidden = true;

    let scorebar = document.createElement("b");
    scorebar.id = "sb";
    scorebar.innerHTML = "0/0 (0.00%)";
    document.body.insertBefore(scorebar, sub);

    let question = document.createElement("h3");
    question.id = "qs";
    document.body.insertBefore(question, sub);

    let inp = document.createElement("input");
    inp.setAttribute("type", "text");
    inp.id = "inp";
    document.body.insertBefore(inp, sub);
    inp.focus();

    document.body.insertBefore(document.createElement("br"), sub);

    let messagebar = document.createElement("i");
    messagebar.id = "msg";
    document.body.insertBefore(messagebar, sub);

    new_question_classic();

    inp.addEventListener("keyup", ({key}) => {
        if (key === "Enter") {
            check_input_classic();
        }
    });
}

let slider = document.createElement("input");
slider.setAttribute("type", "range");
slider.setAttribute("value", lst.length);
slider.min = 1;
slider.max = lst.length;
slider.id = "sld";
slider.name = "sld";
document.body.appendChild(slider);

let label = document.createElement("label");
label.setAttribute("for", "sld");
label.innerHTML = "Words: "
label.id = "lbl";
document.body.insertBefore(label, slider);

let num = document.createElement("el");
num.innerHTML = lst.length + " &emsp;";
slider.oninput = () => {
    num.innerHTML = slider.value + " &emsp;";
}
num.id = "num"
document.body.appendChild(num);

let btn = document.createElement("input");
btn.setAttribute("type", "button");
btn.setAttribute("value", "Start");
btn.onclick = start_classic;
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

let sub = document.createElement("br");
document.body.appendChild(sub);
document.body.append(document.createElement("br"));
let sub2 = document.createElement("sub");
sub2.innerHTML = "© 2023 Rujul Nayak";
document.body.appendChild(sub2);