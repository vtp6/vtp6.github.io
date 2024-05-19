console.log("%c Welcome to the VTP6 console!!! ",
  "background-color: aqua; color: black; font-style: italic; border: 5px solid hotpink; font-size: 2em;");
console.log("You'll just see some random debug stuff here");
console.log(":D")

const lst = document.getElementById("list");
const prv = document.getElementById("preview");
const srt = document.getElementById("start");
const qsn = document.getElementById("qs");
const inp = document.getElementById("input");
const ran = document.getElementById("realans");
const rst = document.getElementById("restart");
const num = document.getElementById("numbers");
const prc = document.getElementById("percentage");
const gup = document.getElementById("giveup");
const spc = document.getElementById("spacing");
const grp = document.getElementById("graph");

if(performance.navigation.type == 2){
  location.reload(true);
}

[docname, ...pages] = text.split("\n\n\n");

const section_names = [...pages.map(string => string.split("\n")[0])];

let question = "";
let answer = "";
let order = [];

const LEVTHRESHOLD = 90;

let time = 0;
let id = -1;

let graph_points = [[0, 0]];

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

// Self-diagnostics
let failed = false;
pages.forEach(bigtext => {
  let [_, lat, __, nums] = bigtext.split("\n\n");
  zip(lat.split("||"), nums.split("\n")).forEach(pair => {
    if (
      (aa =
        pair[0]
        .replaceAll("\n", " ")
        .trim()
        .split(" ")
        .filter(pp => pp !== "")
        .length
      ) !== (bb =
        pair[1]
        .replaceAll("\n", " ")
        .trim()
        .split(" ")
        .filter(qq => qq !== "")
        .length
      )
    ) {
      console.warn("Mismatch:", [pair[0], pair[1]], [aa, bb]);
      failed = true;
    }
  });
});
if (!failed) {
  console.log("%cSelf-diagnostics passed.", "font-style: italic; font-weight: bolder; color: lightgreen");
} else {
  console.error("Self-diagnostics failed. Please report to vtp6_feedback@outlook.com");
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
  spc.hidden = false;
  gup.hidden = false;
  
  question.split("\n").forEach((line, index) => {
    let h3 = document.createElement("h3");
    h3.id = "heading" + index;
    h3.classList.add("bottom-padding");
    h3.innerHTML = line;
    qsn.appendChild(h3);
  });

  id = setInterval(() =>
    graph_points.push(
      [++time, Math.min(prc.innerHTML.slice(0, -1), 100)]
    ), 100);

  inp.focus();
}

function at_least(n, m) {
  return Math.max(n, m);
}

function show_numbers() {
  if ((query = [...document.querySelectorAll(".emulate-h3")]).length === 0) {
    let i = 0;
    question.split("\n").forEach((line, lineix) => {
      let words = line.trim().replaceAll(/ +/g, " ").split(" ");
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
    if (i !== order.length) {
      console.warn("Something went wrong. Please report to vtp6_feedback@outlook.com");
    } else {
      console.log("%cAll good :)", "font-style: italic; color: darkgreen");
    }
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
        (96 < ord && ord < 123) ||
        (ord > 127) || (ord == 32)
      ) ? c : "";
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

function draw_graph() {
  const ctx = grp.getContext("2d");
  let xscale = (grp.width - 10) / time;
  let yscale = (grp.height - 10) / 100;

  let points = graph_points.map(xy => {
    let [x, y] = xy;
    return [xscale * x, grp.height - yscale * y - 5];
  });

  console.log(points);
  points.forEach(point => {
    ctx.beginPath();
    ctx.fillStyle = "#bbbbbb";
    ctx.arc(...point, 1, 0, 2 * Math.PI);
    ctx.fill();
  });

  zip(
    points.slice(0, -1),
    points.slice(1)
  ).forEach(pts => {
    let [xy1, xy2] = pts;
    ctx.beginPath();
    ctx.moveTo(...xy1);
    ctx.lineTo(...xy2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#bbbbbb";
    ctx.stroke();
  });

  ctx.beginPath();
  ctx.moveTo(0, grp.height - 5);
  ctx.lineTo(grp.width - 10, grp.height - 5);
  ctx.moveTo(0, grp.height - 5);
  ctx.lineTo(0, 5);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#dddddd";
  ctx.stroke();
}

function check(del=1) {
  let old_score = prc.innerHTML;
  userans = remove_punctuation(inp.value);
  let score = 100 - (levDist(
    userans.toLowerCase(), r = remove_punctuation(answer).toLowerCase()
  ) / Math.max(r.length, userans.length)) * 100;
  prc.innerHTML = Math.floor(score * 100 / 90) + "%";
  if (prc.innerHTML !== old_score) {
    prc.style.animation = "";
    prc.offsetWidth;
    prc.style.animation = "fadeIn 0.5s";
    // if (del !== 0) {
    //   graph_points.push([time, Math.min(prc.innerHTML.slice(0, -1), 100)]);
    // }
  }
  if (score >= LEVTHRESHOLD) {
    clearInterval(id);
    inp.hidden = true;
    num.hidden = true;
    ran.hidden = false;
    prc.hidden = true;
    spc.hidden = true;
    gup.hidden = true;
    ran.innerHTML = answer + " <b>(" + (time / 10).toFixed(1) + "s)</b>";
    rst.hidden = false;
    console.log(graph_points);
    draw_graph();
    grp.hidden = false;
    rst.focus();
  }
}

function give_up() {
  inp.value = answer;
  check(0);
}

// From https://stackoverflow.com/a/11381730
function mobile() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if (mobile()) {
  alert("VTP6 Literature is not currently designed for mobiles.");
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
gup.addEventListener("click", give_up);
rst.addEventListener("click", () =>
  window.location.replace(location.href.split('?')[0] +
  "?sections=" + encodeURIComponent(checked_list))
);