let scr = document.createElement("script");
scr.setAttribute("async", true);
scr.setAttribute("data-id", "101434094");
scr.setAttribute("src", "//static.getclicky.com/js");
document.body.appendChild(scr);

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

let h1 = document.querySelector("h1");
h1.innerHTML = `<a href="../../">VTP6</a> &nbsp; <img id="dl" src="../download.svg" height="25px" onclick="javascript:downloadbar()" />`;

let realanswer = "";
let answer = [];
let done = [];
let question = "";

let correct = 0;
let total = 0;

let wrong = [];

let id = 0;

let hangman_num = 1;

const PAIRS = 6;

const LEVTHRESHOLD = 80;

function download(i) {
  if (i === 0) {
    todl = lstcopy.flat().join("\n");
  } else {
    todl = lstcopy.map(pair => pair.join("\t")).join("\n");
  }
  console.log(todl);
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(todl));
  let tempx = location.href.substring(0, location.href.lastIndexOf('/')).split("/")
  element.setAttribute('download', tempx[tempx.length - 1] + ".txt");
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  document.getElementById("fmt0").remove();
  document.getElementById("fmt1").remove();
  document.getElementById("dl").hidden = false;
}

function downloadbar() {
  document.getElementById("dl").hidden = true;
  ["VTP5", "VTP6"].forEach((fmt, index) => {
    let fmtbtn = document.createElement("input");
    fmtbtn.setAttribute("type", "button");
    fmtbtn.setAttribute("value", fmt);
    fmtbtn.onclick = () => download(index);
    fmtbtn.id = "fmt" + index;
    fmtbtn.classList.add("pad");
    h1.appendChild(fmtbtn);
  });
}

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
      return (
        (47 < ord && ord < 58) || 
        (64 < ord && ord < 91) || 
        (96 < ord && ord < 123)
        || (ord > 127)) ? c : "";
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
  let dsts = [];
  let userans = remove_punctuation(
    document.getElementById("inp").value.toLowerCase()
  );
  if (
    /* (remove_punctuation(answer) === remove_punctuation(
      document.getElementById("inp").value.toLowerCase()))
    || // (no need) */
    answer.some((poss) => {
      tempvar = realanswer
        .toLowerCase()
        .split("/")
        .map((q) => q.split(", "))
        .flat()
        .map((p) => generate_options(p))
        .flat()
        .map((r) => remove_punctuation(r))
        .indexOf(poss);
      return poss === userans;
    })
  ) {
    answer.splice(answer.indexOf(userans), 1);
    done.push(
      realanswer
        .toLowerCase()
        .split("/")
        .map((q) => q.split(", "))
        .flat()
        .map((p) => generate_options(p))
        .flat()
        [tempvar]
    );
    if (answer.length === 0) {
      correct++;
    } else {
      total--;
    }
    document.getElementById("msg").innerHTML = "Correct!";
    return true;
  } else if (
    document.getElementById("msg").innerHTML !== "Are you sure?" &&
    answer.some((r) => {
      let dst = levDist(r, userans) / Math.max(
        r.length, userans.length
      );
      dsts.push(((1 - dst) * 100).toFixed(2) + "%");
      return dst <= (100 - LEVTHRESHOLD) / 100;
    })
  ) {
    console.log(dsts.join("; "));
    document.getElementById("msg").innerHTML = "Are you sure?";
    total--;
    return undefined;
  } else {
    console.log(dsts.join("; "));
    document.getElementById("msg").innerHTML = "Wrong: " + realanswer;
    wrong.push([
      document.getElementById("qs").innerHTML,
      realanswer.toLowerCase(),
      document.getElementById("inp").value.toLowerCase(),
    ]);
    answer = [];
    return false;
  }
}

function check_input_classic() {
  if (check_input() !== undefined) {
    let perc = ((correct / total) * 100).toFixed(2);
    if (perc === "NaN") {
      perc = "0.00";
    }
    document.getElementById("sb").innerHTML =
      correct + "/" + total + " (" + perc + "%)";
    document.getElementById("rmn").innerHTML = rmntext(total);
    if (total < +document.getElementById("sld").value) {
      new_question_classic();
    } else {
      create_wrongtbl();
    }
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

  document.getElementById("acbr").remove();
  document.getElementById("done").remove();

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
  if (answer.length === 0) {
    [question, realanswer] = temp = random_choice(lst);
    answer =
      realanswer
        .toLowerCase()
        .split("/")
        .map((q) => q.split(", "))
        .flat()
        .map((p) => generate_options(p))
        .flat()
        .map((r) => remove_punctuation(r));
    document.getElementById("qs").innerHTML = question + " (0/" + answer.length + ")";
    lst.splice(lst.indexOf(temp), 1);
    done = [];
  } else {
    document.getElementById("qs").innerHTML =
      question + " (" + done.length + "/" + (answer.length + done.length) + ")";
  }
  document.getElementById("done").innerHTML = "Correct answers: " + done.join(", ");
}

function showacbr(ix) {
  // 0 = reset

  // 10 = es:
  //  11 = á
  //  12 = é
  //  13 = í
  //  14 = ñ
  //  15 = ó
  //  16 = ú
  //  17 = ü

  // 20 = de:
  //  21 = ä
  //  22 = ö
  //  23 = ß
  //  24 = ü

  // 30 = fr:
  //  31 = à
  //  32 = â
  //  33 = ç
  //  34 = é
  //  35 = è
  //  36 = ê
  //  37 = ë
  //  38 = î
  //  39 = ï
  //  40 = ô
  //  41 = ù
  //  42 = û
  //  43 = ü

  let accentbar = document.createElement("div");
  accentbar.id = "acbr";

  if (ix === 0) {
    ["ES", "DE", "FR"].forEach((lang, indx) => {
      let langbtn = document.createElement("input");
      langbtn.setAttribute("type", "button");
      langbtn.value = lang;
      langbtn.classList.add("accentbtn");
      langbtn.onclick = () => showacbr((indx + 1) * 10);
      accentbar.appendChild(langbtn);
    });
  }

  if (ix === 10) {
    [`á`, `é`, `í`, `ñ`, `ó`, `ú`, `ü`].forEach((acc, indx) => {
      let accbtn = document.createElement("input");
      accbtn.setAttribute("type", "button");
      accbtn.value = acc;
      accbtn.classList.add("accentbtn");
      accbtn.onclick = () => showacbr(11 + indx);
      accentbar.appendChild(accbtn);
    });
    let resetbtn = document.createElement("input");
    resetbtn.setAttribute("type", "button");
    resetbtn.value = "Back";
    resetbtn.classList.add("accentbtn");
    resetbtn.onclick = () => showacbr(0);
    accentbar.appendChild(resetbtn);
  }

  if (ix === 20) {
    [`ä`, `ö`, `ß`, `ü`].forEach((acc, indx) => {
      let accbtn = document.createElement("input");
      accbtn.setAttribute("type", "button");
      accbtn.value = acc;
      accbtn.classList.add("accentbtn");
      accbtn.onclick = () => showacbr(21 + indx);
      accentbar.appendChild(accbtn);
    });
    let resetbtn = document.createElement("input");
    resetbtn.setAttribute("type", "button");
    resetbtn.value = "Back";
    resetbtn.classList.add("accentbtn");
    resetbtn.onclick = () => showacbr(0);
    accentbar.appendChild(resetbtn);
  }

  if (ix === 30) {
    [`à`, `â`, `ç`, `é`, `è`, `ê`, `ë`, `î`,
      `ï`, `ô`, `ù`, `û`, `ü`].forEach((acc, indx) => {
      let accbtn = document.createElement("input");
      accbtn.setAttribute("type", "button");
      accbtn.value = acc;
      accbtn.classList.add("accentbtn");
      accbtn.onclick = () => showacbr(31 + indx);
      accentbar.appendChild(accbtn);
    });
    let resetbtn = document.createElement("input");
    resetbtn.setAttribute("type", "button");
    resetbtn.value = "Back";
    resetbtn.classList.add("accentbtn");
    resetbtn.onclick = () => showacbr(0);
    accentbar.appendChild(resetbtn);
  }

  let inputbox = document.getElementById("inp");

  if (10 < ix && ix < 18) {
    inputbox.value += [`á`, `é`, `í`, `ñ`, `ó`, `ú`, `ü`][ix - 11];
    accentbar = document.getElementById("acbr");
  }

  if (20 < ix && ix < 25) {
    inputbox.value += [`ä`, `ö`, `ß`, `ü`][ix - 21];
    accentbar = document.getElementById("acbr");
  }

  if (30 < ix && ix < 44) {
    inputbox.value += [`à`, `â`, `ç`, `é`, `è`, `ê`, `ë`, `î`,
      `ï`, `ô`, `ù`, `û`, `ü`][ix - 31];
    accentbar = document.getElementById("acbr");
  }

  inputbox.focus();

  document.getElementById("acbr").replaceWith(accentbar);

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

  document.body.insertBefore(document.createElement("br"), sub);

  let donebar = document.createElement("p");
  donebar.id = "done";
  donebar.innerHTML = "&nbsp;"
  document.body.insertBefore(donebar, sub)

  document.body.insertBefore(document.createElement("br"), sub);

  let accentbar = document.createElement("div");
  accentbar.id = "acbr";
  ["ES", "DE", "FR"].forEach((lang, indx) => {
    let langbtn = document.createElement("input");
    langbtn.setAttribute("type", "button");
    langbtn.value = lang;
    langbtn.classList.add("accentbtn");
    langbtn.onclick = () => showacbr((indx + 1) * 10);
    accentbar.appendChild(langbtn);
  });
  document.body.insertBefore(accentbar, sub);

  if (location.href.includes("Spanish")) {
    showacbr(10);
  } else if (location.href.includes("German")) {
    showacbr(20);
  } else if (location.href.includes("French")) {
    showacbr(30);
  }

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

  document.body.insertBefore(document.createElement("br"), sub);

  let donebar = document.createElement("p");
  donebar.id = "done";
  donebar.innerHTML = "&nbsp;"
  document.body.insertBefore(donebar, sub)

  document.body.insertBefore(document.createElement("br"), sub);

  let accentbar = document.createElement("div");
  accentbar.id = "acbr";
  ["ES", "DE", "FR"].forEach((lang, indx) => {
    let langbtn = document.createElement("input");
    langbtn.setAttribute("type", "button");
    langbtn.value = lang;
    langbtn.classList.add("accentbtn");
    langbtn.onclick = () => showacbr((indx + 1) * 10);
    accentbar.appendChild(langbtn);
  });
  document.body.insertBefore(accentbar, sub);

  if (location.href.includes("Spanish")) {
    showacbr(10);
  } else if (location.href.includes("German")) {
    showacbr(20);
  } else if (location.href.includes("French")) {
    showacbr(30);
  }

  new_question_classic();

  inp.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
      check_input_hangman();
    }
  });
}

function check_input_hangman() {
  let res = check_input();
  if (res !== undefined) {
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

function draw_stuff() {

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

  sp1 = document.createElement("el");
  sp1.innerHTML = "&emsp;";
  document.body.appendChild(sp1);

  let swp = document.createElement("input");
  swp.setAttribute("type", "button");
  swp.setAttribute("value", "Swap");
  swp.onclick = swaptd;
  swp.id = "swap";
  document.body.appendChild(swp);

  sp2 = document.createElement("el");
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

  draw_sub();

  draw_table();

}

let sub = 0;
let sp1 = 0;
let sp2 = 0;

function draw_sub() {
  sub = document.createElement("br");
  sub.classList.add("exempt");
  document.body.appendChild(sub);
  document.body.append(document.createElement("br"));
  let sub2 = document.createElement("div");
  sub2.innerHTML = `<el>© Rujul Nayak 2023</el> ` +
    `| <a href="mailto:vtp6_feedback@outlook.com" class="feedback">Feedback</a> ` +
    `<a href="https://github.com/vtp6/vtp6.github.io"><img src="../logosmall.png" class="logo" /></a>`;
  sub2.id = "sub";
  document.body.appendChild(sub2);
}

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

let lst = [];

function parseCSVLine(line) {
  let result = [];
  let curr = "";
  let quotes = "";
  let escaped = false;
  for (let ind = 0; ind < line.length; ind++) {
    let char = line[ind];
    if (escaped) {
      curr += char;
      escaped = false;
      continue;
    }
    if (char === "," && quotes === "") {
      result.push(curr);
      curr = "";
      continue;
    }
    if (char === "'" || '"' === char) {
      if (quotes === char && !escaped) {
        quotes = "";
      } else {
        quotes = char;
      }
      continue;
    }
    if (char === "\\") {
      escaped = true;
      continue;
    }
    curr += char;
  }
  result.push(curr);
  return result;
}

let ext = "";
let typ = document.getElementById("inputtype");
let counter = 0;

function readerfunc(rdr) {
  console.log(words = rdr.result);
  if (ext === "csv") {
    lst.push(...words.split("\n").map((l) => {
      let temp = parseCSVLine(l);
      console.log(temp);
      return temp;
    }));
  } else if (typ.value === "vtp6") {
    lst.push(...words.split("\n").map((l) => {
      let next = l.split("\t");
      if (next.length === 2) {
        return next;
      } else {
        alert("Invalid format");
        throw new Error();
      }
    }));
  } else {
    let tmp = words.split("\n");
    tmp = tmp.reduce((acc, _, i) =>
      (i % 2 === 0 ? acc.push(tmp.slice(i, i + 2)) && acc : acc), []);
    tmp.forEach(pair => {
      if (pair.length !== 2) {
        alert("Invalid format");
        throw new Error();
      }
    });
    lst.push(...tmp);
  }
  counter++;
  if (counter === files.length) {
    lstcopy = [...lst];
    document.getElementById("wlbl").hidden = true;
    document.getElementById("txtx").hidden = true;
    document.getElementById("msgs").hidden = true;
    document.getElementById("brk0").hidden = true;
    document.getElementById("brk1").hidden = true;
    document.getElementById("brk2").hidden = true;
    document.getElementById("brk3").hidden = true;
    document.getElementById("brk4").hidden = true;
    document.getElementById("start").hidden = true;
    typ.hidden = true;
    draw_stuff();
  }
}

let files = [];
let lstcopy = [];

function levDist(s, t) {
  var d = []; //2d matrix

  // Step 1
  var n = s.length;
  var m = t.length;

  if (n == 0) return m;
  if (m == 0) return n;

  //Create an array of arrays in javascript (a descending loop is quicker)
  for (var i = n; i >= 0; i--) d[i] = [];

  // Step 2
  for (var i = n; i >= 0; i--) d[i][0] = i;
  for (var j = m; j >= 0; j--) d[0][j] = j;

  // Step 3
  for (var i = 1; i <= n; i++) {
      var s_i = s.charAt(i - 1);

      // Step 4
      for (var j = 1; j <= m; j++) {

          //Check the jagged ld total so far
          if (i == j && d[i][j] > 4) return n;

          var t_j = t.charAt(j - 1);
          var cost = (s_i == t_j) ? 0 : 1; // Step 5

          //Calculate the minimum
          var mi = d[i - 1][j] + 1;
          var b = d[i][j - 1] + 1;
          var c = d[i - 1][j - 1] + cost;

          if (b < mi) mi = b;
          if (c < mi) mi = c;

          d[i][j] = mi; // Step 6

          //Damerau transposition
          if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
              d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
          }
      }
  }

  // Step 7
  return d[n][m];
}

try {
  flagvar;
  document.getElementById("start").addEventListener("click", async function() {
    files = [...document.getElementById("txtx").files];
    console.log(files);
    files.forEach(file => {
      if (file) {
        ext = file.name.split('.').pop();
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          () => readerfunc(reader),
          false,
        );
        reader.readAsText(file);
      }
    });
});
} catch {
  lst = words.split("\n").map((l) => l.split("\t"));
  lstcopy = [...lst];
  draw_stuff();
}