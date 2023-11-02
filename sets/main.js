let lst = words.split("\n").map(l => l.split("\t"));

let h1 = document.querySelector("h1");
h1.innerHTML = `<a href="../../">VTP6</a>`;

let answer = "";
let correct = 0;
let total = 0;

let wrong = [];

function random_choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function random_shuffle(ls) {
    let a = [];
    let l = [...ls];
    [...l].forEach(_ => {
        let x = random_choice(l);
        a.push(x);
        l.splice(l.indexOf(x), 1);
    });
    return a;
}

function check_input_classic() {
    total++;
    if (answer.toLowerCase().split("/").map(q => q.split(", ")).flat()
        .includes(document.getElementById("inp").value.toLowerCase())) {
        correct++;
        document.getElementById("msg").innerHTML = "Correct!";
    } else {
        document.getElementById("msg").innerHTML = "Wrong: " + answer;
        wrong.push([
            document.getElementById("qs").innerHTML, 
            answer.toLowerCase(), 
            document.getElementById("inp").value.toLowerCase()
        ]);
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

        document.body.insertBefore(document.createElement("br"), sub);
        document.body.insertBefore(document.createElement("br"), sub);

        let txt = document.createElement("h3");
        txt.innerHTML = "Mistakes:";
        document.body.insertBefore(txt, sub);

        let wrongtbl = document.createElement("table");

        let hd = document.createElement("tr");
        hd.innerHTML = `<th>Term</th> <th>Definition</th> <th>Your answer</th>`;
        wrongtbl.appendChild(hd);

        wrong.forEach(trp => {
            let [u, v, w] = trp;
            let tr = document.createElement("tr");
            if (u.length > 18) {
                u = u.slice(0, 15) + "...";
            }
            if (v.length > 18) {
                v = v.slice(0, 15) + "...";
            }
            if (w.length > 18) {
                w = w.slice(0, 15) + "...";
            }
            tr.innerHTML = `<td title="` + trp[0] + `">` +
                u + `</td> <td title="` + trp[1] + `">` +
                v + `</td> <td title="` + trp[2] + `">` +
                w + `</td>`;
            wrongtbl.appendChild(tr);
        });

        document.body.insertBefore(wrongtbl, sub);

    }
}

function new_question_classic() {
    document.getElementById("inp").value = "";
    document.getElementById("inp").focus();
    [document.getElementById("qs").innerHTML, answer] = temp = random_choice(lst);
    lst.splice(lst.indexOf(temp), 1);
}

function start_classic() {
    document.getElementById("tbl").hidden = true;
    document.getElementById("btn").hidden = true;
    document.getElementById("lbl").hidden = true;
    document.getElementById("sld").hidden = true;
    document.getElementById("num").hidden = true;
    document.getElementById("game").hidden = true;
    br1.hidden = true; br2.hidden = true; sp.hidden = true;

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

function start_match() {
    console.log(random_shuffle(lst).slice(0, 6));
}

function start() {
    let selected = document.getElementById("game").value;
    if (selected === "classic") {
        start_classic();
    // } else if (selected === "match") {
    //     start_match();
    } else {
        alert("Unimplemented.");
    }
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
label.innerHTML = "Words: ";
label.id = "lbl";
document.body.insertBefore(label, slider);

let num = document.createElement("el");
num.innerHTML = lst.length + " &emsp;";
slider.oninput = () => {
    num.innerHTML = slider.value + " &emsp;";
}
num.id = "num";
document.body.appendChild(num);

let select = document.createElement("select");
let optn1 = document.createElement("option");
optn1.value = "classic";
optn1.innerHTML = "Classic";
select.appendChild(optn1);
let optn2 = document.createElement("option");
optn2.value = "match";
optn2.innerHTML = "Match";
select.appendChild(optn2);
select.id = "game";
document.body.appendChild(select);

let sp = document.createElement("el");
sp.innerHTML = "&emsp;";
document.body.appendChild(sp);

let btn = document.createElement("input");
btn.setAttribute("type", "button");
btn.setAttribute("value", "Start");
btn.onclick = start;
btn.id = "btn";
document.body.appendChild(btn);

document.body.appendChild(br1 = document.createElement("br"));
document.body.appendChild(br2 = document.createElement("br"));

let table = document.createElement("table");
table.id = "tbl";

let head = document.createElement("tr");
head.innerHTML = `<th>Term</th> <th>Definition</th>`;
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
    row.innerHTML = `<td title="` + x[0] + `">` + a +
        `</td> <td title="` + x[1] + `">` + b + `</td>`;
    table.appendChild(row);
})

document.body.appendChild(table);

let sub = document.createElement("br");
document.body.appendChild(sub);
document.body.append(document.createElement("br"));
let sub2 = document.createElement("sub");
sub2.innerHTML = `© Rujul Nayak 2023 - <a href="mailto:vtp6_feedback@outlook.com">Feedback</a>`;
document.body.appendChild(sub2);