let meta1 = document.createElement("meta");
meta1.property = "og:image";
meta1.content = "../../icon.jpg";
document.head.appendChild(meta1);

let meta2 = document.createElement("meta");
meta2.property = "og:image:width";
meta2.content = "256";
document.head.appendChild(meta2);

let meta3 = document.createElement("meta");
meta3.property = "og:image:height";
meta3.content = "256";
document.head.appendChild(meta3);

let lst = words.split("\n").map((l) => l.split("\t"));

let h1 = document.querySelector("h1");
h1.innerHTML = `<a href="../../">VTP6</a>`;

let answer = "";
let correct = 0;
let total = 0;

let wrong = [];

let id = 0;

let hangman_num = 1;

const PAIRS = 6;

function random_choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function random_shuffle(ls) {
  let a = [];
  let l = [...ls];
  [...l].forEach((_) => {
    let x = random_choice(l);
    a.push(x);
    l.splice(l.indexOf(x), 1);
  });
  return a;
}

function remove_punctuation(string) {
  return [...string]
    .map((c) => {
      let ord = c.charCodeAt(0);
      return (64 < ord && ord < 91) || (96 < ord && ord < 123) ? c : "";
    })
    .join("");
}

function generate_options(str) {
  if (![...str].includes("(")) {
    return [str];
  }
  let ret = [str];
  for (let ind = 0; ind < str.length; ind++) {
    let chr = str[ind];
    if (chr === "(") {
      let prev = str.slice(0, ind);
      while (str[ind] !== ")") {
        ind++
      }
      ret.push(prev + str.slice(ind + 1));
    }
  }
  return ret;
}

function check_input() {
  total++;
  /* Easy mode: (document.getElementById("inp").value.toLowerCase().split(" ").map(q => 
        answer.toLowerCase().split("/").map(j => j.split(", ")).flat()
        .map(k => k.split(" ")).flat().map(r => 
            remove_punctuation(r) === remove_punctuation(q)
        )
    ).flat().includes(true)) */
  if (
    (remove_punctuation(answer) === remove_punctuation(
      document.getElementById("inp").value.toLowerCase()))
    ||
    (answer
      .toLowerCase()
      .split("/")
      .map((q) => q.split(", "))
      .flat()
      .map((p) => generate_options(p))
      .flat()
      .map((r) => remove_punctuation(r))
      .includes(
        remove_punctuation(document.getElementById("inp").value.toLowerCase()),
      )
    )
  ) {
    correct++;
    document.getElementById("msg").innerHTML = "Correct!";
    return true;
  } else {
    document.getElementById("msg").innerHTML = "Wrong: " + answer;
    wrong.push([
      document.getElementById("qs").innerHTML,
      answer.toLowerCase(),
      document.getElementById("inp").value.toLowerCase(),
    ]);
    return false;
  }
}

function check_input_classic() {
  check_input();
  document.getElementById("sb").innerHTML =
    correct + "/" + total + " (" + ((correct / total) * 100).toFixed(2) + "%)";
  document.getElementById("rmn").innerHTML = rmntext(total);
  if (total < +document.getElementById("sld").value) {
    new_question_classic();
  } else {
    create_wrongtbl();
  }
}

function create_wrongtbl() {
  document.getElementById("inp").value = "";
  document.getElementById("inp").disabled = true;
  document.getElementById(
    "qs",
  ).innerHTML = 
    `<input type=button onclick="javascript:window.location.replace(location.href.split('?')[0] + '?mode=` +
    document.getElementById("game").value + `');" value="Restart" />`;

  document.body.insertBefore(document.createElement("br"), sub);
  document.body.insertBefore(document.createElement("br"), sub);

  let retry = document.createElement("input");
  retry.setAttribute("type", "button");
  retry.setAttribute("value", "Retry mistakes");
  retry.id = "rty";
  retry.onclick = () => {
    try {document.getElementById("sb").remove();} catch {}
    try {document.getElementById("img").remove();} catch {}
    document.getElementById("qs").remove();
    document.getElementById("rmn").remove();
    document.getElementById("inp").remove();
    document.getElementById("msg").remove();
    document.getElementById("rty").remove();
    document.getElementById("txt").remove();
    document.getElementById("wtb").remove();
    lst = wrong.map(triplet => [triplet[0], triplet[1]]);
    document.getElementById("sld").value = lst.length;
    [...document.querySelectorAll("br:not(.exempt)")].map(br => br.remove());
    correct = 0;
    total = 0;
    wrong = [];
    id = 0;
    hangman_num = 1;
    start();
  };
  if (wrong.length === 0) {
    retry.disabled = true;
  }
  document.body.insertBefore(retry, sub);

  let txt = document.createElement("h3");
  txt.innerHTML = "Mistakes:";
  txt.id = "txt";
  document.body.insertBefore(txt, sub);

  let wrongtbl = document.createElement("table");

  let hd = document.createElement("tr");
  hd.innerHTML = `<th>Term</th> <th>Definition</th> <th>Your answer</th>`;
  wrongtbl.appendChild(hd);

  wrong.forEach((trp) => {
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
    tr.innerHTML =
      `<td title="` +
      trp[0] +
      `">` +
      u +
      `</td> <td title="` +
      trp[1] +
      `">` +
      v +
      `</td> <td title="` +
      trp[2] +
      `">` +
      w +
      `</td>`;
    wrongtbl.appendChild(tr);
  });

  wrongtbl.id = "wtb";

  document.body.insertBefore(wrongtbl, sub);
}

function hide_stuff() {
  document.getElementById("tbl").hidden = true;
  document.getElementById("btn").hidden = true;
  document.getElementById("lbl").hidden = true;
  document.getElementById("sld").hidden = true;
  document.getElementById("num").hidden = true;
  document.getElementById("swap").hidden = true;
  document.getElementById("game").hidden = true;
  br1.hidden = true;
  br2.hidden = true;
  sp1.hidden = true;
  sp2.hidden = true;
}

function new_question_classic() {
  document.getElementById("inp").value = "";
  document.getElementById("inp").focus();
  [document.getElementById("qs").innerHTML, answer] = temp = random_choice(lst);
  lst.splice(lst.indexOf(temp), 1);
}

function start_classic() {
  hide_stuff();

  let scorebar = document.createElement("b");
  scorebar.id = "sb";
  scorebar.innerHTML = "0/0 (0.00%)";
  document.body.insertBefore(scorebar, sub);

  let remaining = document.createElement("p");
  remaining.id = "rmn";
  remaining.innerHTML = rmntext();
  document.body.insertBefore(remaining, sub);

  let question = document.createElement("h3");
  question.id = "qs";
  document.body.insertBefore(question, sub);

  let inp = document.createElement("input");
  inp.setAttribute("type", "text");
  inp.setAttribute("autocorrect", "off");
  inp.setAttribute("spellcheck", "off");
  inp.id = "inp";
  document.body.insertBefore(inp, sub);
  inp.focus();

  document.body.insertBefore(document.createElement("br"), sub);

  let messagebar = document.createElement("i");
  messagebar.id = "msg";
  document.body.insertBefore(messagebar, sub);

  new_question_classic();

  inp.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
      check_input_classic();
    }
  });
}

function start_match() {
  hide_stuff();

  let pairs = random_shuffle(random_shuffle(lst).slice(0, PAIRS));
  let pa = random_shuffle(pairs.map((i) => i[0]));
  let pb = random_shuffle(pairs.map((j) => j[1]));

  let timer = document.createElement("h3");
  timer.innerHTML = "0.0s";
  timer.id = "timer";
  document.body.insertBefore(timer, sub);

  let time = 0;
  id = setInterval(() => {
    let tmr = document.getElementById("timer");
    tmr.innerText = (++time / 10).toFixed(1) + "s";
  }, 100);

  let matchtbl = document.createElement("table");
  matchtbl.id = "mt";

  [...Array(PAIRS).keys()].forEach((n) => {
    let c = pa[n];
    let d = pb[n];

    let div = document.createElement("tr");

    div.innerHTML =
      `<td><input type="button" class="bigbutton" value="` +
      c +
      `" onclick="javascript:clicked(this)" /></td> <td><input type="button" ` +
      `class="bigbutton" value="` +
      d +
      `" onclick="javascript:clicked(this)" /></td>`;

    matchtbl.appendChild(div);
  });

  document.body.insertBefore(matchtbl, sub);
}

function clicked(elem) {
  if ([...elem.classList].includes("done")) {
    return;
  }
  if ([...elem.classList].includes("selected")) {
    elem.classList.remove("selected");
  } else {
    elem.classList.add("selected");
    let q = [...document.querySelectorAll(".selected")];
    if (q.length >= 2) {
      q.forEach((qq) => qq.classList.remove("selected"));
      let [qt, qd] = q.slice(0, 2);
      if (
        lst.find(
          (elm) =>
            elm + "" === [qt.value, qd.value] + "" ||
            elm + "" === [qd.value, qt.value] + "",
        )
      ) {
        qt.classList.add("done");
        qd.classList.add("done");
        qt.value = "";
        qd.value = "";
      }

      if ([...document.querySelectorAll(".done")].length >= PAIRS * 2) {
        clearInterval(id);

        let restart = document.createElement("input");
        restart.setAttribute("type", "button");
        restart.value = "Restart";
        restart.onclick = () => window.location.replace(
          location.href.split('?')[0] + '?mode=' +
          document.getElementById("game").value);
        document.body.insertBefore(restart, document.getElementById("mt"));
      }
    }
  }
}

function rmntext(n = 0) {
  return (sval = (document.getElementById("sld").value - n)) +
    " question" + (sval !== 1 ? "s" : "") + " remaining.";
}

function start_hangman() {
  hide_stuff();

  let image = document.createElement("img");
  image.src = "../Hangman/Slide1.png";
  image.id = "img";
  document.body.insertBefore(image, sub);

  let remaining = document.createElement("p");
  remaining.id = "rmn";
  remaining.innerHTML = rmntext();
  document.body.insertBefore(remaining, sub);

  let question = document.createElement("h3");
  question.id = "qs";
  document.body.insertBefore(question, sub);

  let inp = document.createElement("input");
  inp.setAttribute("type", "text");
  inp.setAttribute("autocorrect", "off");
  inp.setAttribute("spellcheck", "off");
  inp.id = "inp";
  document.body.insertBefore(inp, sub);
  inp.focus();

  document.body.insertBefore(document.createElement("br"), sub);

  let messagebar = document.createElement("i");
  messagebar.id = "msg";
  document.body.insertBefore(messagebar, sub);

  new_question_classic();

  inp.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
      check_input_hangman();
    }
  });
}

function check_input_hangman() {
  let res = check_input();
  if (!res) {
    hangman_num++;
    document.getElementById("img").src = "../Hangman/Slide" + hangman_num + ".png";
    if (hangman_num >= 8) {
      document.getElementById("img").src = "../Hangman/Slide8.png";
      create_wrongtbl();
      return;
    }
  }
  document.getElementById("rmn").innerHTML = rmntext(total);
  if (total < +document.getElementById("sld").value) {
    new_question_classic();
  } else {
    create_wrongtbl();
  }
}

function start() {
  let selected = document.getElementById("game").value;
  if (selected === "classic") {
    start_classic();
  } else if (selected === "match") {
    start_match();
  } else if (selected === "hangman") {
    start_hangman();
  } else {
    alert("Unimplemented.");
    document.getElementById("game").value = "classic";
  }
}

function update_slider() {
  let selected = document.getElementById("game").value;
  let sldr = document.getElementById("sld");
  if (selected === "match") {
    sldr.disabled = true;
  } else {
    sldr.disabled = false;
  }
}

function swaptd() {
  lst = lst.map(pair => [pair[1], pair[0]]);
  draw_table();
}

let slider = document.createElement("input");
slider.setAttribute("type", "range");
slider.min = 1;
slider.max = lst.length;
slider.setAttribute("value", lst.length);
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
};
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
let optn3 = document.createElement("option");
optn3.value = "hangman";
optn3.innerHTML = "Hangman";
select.appendChild(optn3);
select.id = "game";
select.oninput = update_slider;
let args = location.search.slice(1);
let params = {};
args.split("&").forEach(function (pair) {
  if (pair !== "") {
    pair = pair.split("=");
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
});
if ("mode" in params && ["classic", "match", "hangman"].includes(params["mode"])) {
  select.value = params["mode"];
}
document.body.appendChild(select);

update_slider();

let sp1 = document.createElement("el");
sp1.innerHTML = "&emsp;";
document.body.appendChild(sp1);

let swp = document.createElement("input");
swp.setAttribute("type", "button");
swp.setAttribute("value", "Swap");
swp.onclick = swaptd;
swp.id = "swap";
document.body.appendChild(swp);

let sp2 = document.createElement("el");
sp2.innerHTML = "&emsp;";
document.body.appendChild(sp2);

let btn = document.createElement("input");
btn.setAttribute("type", "button");
btn.setAttribute("value", "Start");
btn.onclick = start;
btn.id = "btn";
document.body.appendChild(btn);

document.body.appendChild((br1 = document.createElement("br")));
document.body.appendChild((br2 = document.createElement("br")));

function draw_table() {
  if (old_table = document.getElementById("tbl")) {
    old_table.remove();
  }

  let table = document.createElement("table");
  table.id = "tbl";

  let head = document.createElement("tr");
  head.innerHTML = `<th>Term</th> <th>Definition</th>`;
  table.appendChild(head);

  lst.forEach((x) => {
    let [a, b] = x;
    let row = document.createElement("tr");
    if (a.length > 20) {
      a = a.slice(0, 17) + "...";
    }
    if (b.length > 20) {
      b = b.slice(0, 17) + "...";
    }
    row.innerHTML =
      `<td title="` +
      x[0] +
      `">` +
      a +
      `</td> <td title="` +
      x[1] +
      `">` +
      b +
      `</td>`;
    table.appendChild(row);
  });

  document.body.insertBefore(table, sub);
}

let sub = document.createElement("br");
sub.classList.add("exempt");
document.body.appendChild(sub);
document.body.append(document.createElement("br"));
let sub2 = document.createElement("div");
sub2.innerHTML = `<el>© Rujul Nayak 2023</el> ` +
  `| <a href="mailto:vtp6_feedback@outlook.com" class="feedback">Feedback</a> ` +
  `<a href="https://github.com/vtp6/vtp6.github.io"><img src="../logosmall.png" class="logo" /></a>`;
sub2.id = "sub";
document.body.appendChild(sub2);

draw_table();
