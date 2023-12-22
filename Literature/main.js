const lst = document.getElementById("list");
const prv = document.getElementById("preview");
const srt = document.getElementById("start");
const qsn = document.getElementById("qs");
const inp = document.getElementById("input");
const ran = document.getElementById("realans");
const rst = document.getElementById("restart");
const num = document.getElementById("numbers");
const prc = document.getElementById("percentage");

if(performance.navigation.type == 2){
  location.reload(true);
}

[docname, ...pages] = text.split("\n\n\n");

const section_names = [...pages.map(string => string.split("\n")[0])];

let question = "";
let answer = "";
let order = [];

const LEVTHRESHOLD = 90;

function htmlify(string) {
  return string
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\n", "<br />");
}

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

function checkbox_change(page_name, checked) {
  if (checked) {
    checked_list.push(page_name.slice(9));
  } else {
    checked_list.splice(checked_list.indexOf(page_name.slice(9)), 1);
  }
  checked_list = checked_list.filter(onlyUnique);
  checked_list.sort((a, b) => section_names.indexOf(a) - section_names.indexOf(b));
  console.log(checked_list);
  prv.innerHTML = [...checked_list.map(str => {
    let txt = get_page_text(str);
    return txt.split("\n\n")[1].replaceAll(" ||", "");
  })].join("\n\n").replaceAll("\n", "<br />");
}

function get_page_text(page_name) {
  for (i = 0; i < pages.length; i++) {
    let pg = pages[i];
    let nm = section_names[i];
    if (page_name == nm) {
      return pg;
    }
  }
  return "";
}

function random_choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function zip(a, ...b) {
  return a.map((k, i) => [k, ...b.map(c => c[i])]);
}

function start() {
  if (checked_list.length === 0) {
    return;
  }
  console.log(checked_list);

  lst.hidden = true;
  prv.hidden = true;
  srt.hidden = true;

  let sections = checked_list.map(get_page_text);
  let question_bank = sections.map(sc =>
    zip(sc.split("\n\n")[1].split("||"),
        sc.split("\n\n")[2].split("\n"),
        sc.split("\n\n")[3].split("\n"))
  ).flat().map(trip => [trip[0].trim(), trip[1], trip[2].split(" ")]);

  [question, answer, order] = random_choice(question_bank);
  qsn.hidden = false;
  inp.hidden = false;
  num.hidden = false;
  prc.hidden = false;
  
  question.split("\n").forEach((line, index) => {
    let h3 = document.createElement("h3");
    h3.id = "heading" + index;
    h3.classList.add("bottom-padding");
    h3.innerHTML = line;
    qsn.appendChild(h3);
  });

  inp.focus();
}

function at_least(n, m) {
  return Math.max(n, m);
}

function show_numbers() {
  if ((query = [...document.querySelectorAll(".emulate-h3")]).length === 0) {
    let i = 0;
    question.split("\n").forEach((line, lineix) => {
      let words = line.trim().split(" ");
      let string = "";
      words.forEach(word => {
        // string += order[i] + "&nbsp;".repeat(word.length + 1 - order[i].length);
        let pre = at_least(Math.floor((word.length - order[i].length) / 2), 0)
        string += "&nbsp;".repeat(pre) + order[i] + "&nbsp;".repeat(at_least(word.length + 1 - order[i].length - pre, 0));
        i++;
      });
      let p = document.createElement("p");
      p.classList.add("emulate-h3");
      p.innerHTML = string;
      qsn.insertBefore(p, document.getElementById("heading" + lineix));
    });
    num.value = "Hide numbers";
  } else {
    query.forEach(elem => elem.remove());
    num.value = "Show numbers";
  }
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

function check() {
  let old_score = prc.innerHTML;
  userans = remove_punctuation(inp.value);
  let score = 100 - (levDist(
    userans.toLowerCase(), r = remove_punctuation(answer).toLowerCase()
  ) / Math.max(r.length, userans.length)) * 100;
  prc.innerHTML = Math.floor(score) + "%";
  if (prc.innerHTML !== old_score) {
    prc.style.animation = "";
    prc.offsetWidth;
    prc.style.animation = "fadeIn 0.5s";
  }
  if (score >= LEVTHRESHOLD) {
    inp.hidden = true;
    num.hidden = true;
    ran.hidden = false;
    prc.hidden = true;
    ran.innerHTML = answer;
    rst.hidden = false;
  }
}

let args = location.search.slice(1);
let params = {};
args.split("&").forEach(function (pair) {
  if (pair !== "") {
    pair = pair.split("=");
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
});

let h = window.location.href;
console.log(h.substring(0, h.lastIndexOf('/') + 1) + h.substring(h.lastIndexOf('/') + 1).split("?")[0]);
window.history.pushState({}, document.title, h.substring(0, h.lastIndexOf('/') + 1) + h.substring(h.lastIndexOf('/') + 1).split("?")[0]);

let checked_list = [];
if ("sections" in params) {
  checked_list = decodeURIComponent(params["sections"]).split(",").filter(a => get_page_text(a) !== "");
}

section_names.forEach(el => {
  let li = document.createElement("li");
  let inpt = document.createElement("input");
  inpt.setAttribute("type", "checkbox");
  inpt.setAttribute("id", "checkbox-" + el);
  inpt.addEventListener('change', function() {
    checkbox_change(this.id, this.checked);
  });
  if (checked_list.includes(el)) {
    inpt.checked = true;
    checkbox_change(inpt.id, true);
  }
  li.appendChild(inpt);
  let text = document.createElement("el");
  text.innerHTML = "&nbsp;" + el;
  text.setAttribute("id", "box-" + el);
  text.addEventListener("click", function() {
    let box = document.getElementById("check" + this.id);
    box.checked = !box.checked;
    checkbox_change(box.id, box.checked);
  });
  li.appendChild(text);
  li.classList.add("noselect");
  lst.appendChild(li);
});

srt.addEventListener("click", start);
inp.addEventListener("input", check);
num.addEventListener("click", show_numbers);
rst.addEventListener("click", () =>
  window.location.replace(location.href.split('?')[0] +
  "?sections=" + encodeURIComponent(checked_list))
);