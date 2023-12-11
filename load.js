// Load the links onto the main page

const sub = document.getElementById("sub");
const cstm = document.getElementById("custom");
const cntnr = document.getElementById("container");

function items(obj){
  var ret = [];
  for(v in obj){
      ret.push([v, obj[v]]);
  }
  return ret;
}

function isDict(a) {
  return a.constructor == Object;
}

function recurse(dict, obj, pref="") {
  let it = [...items(dict)];
  console.log(it);
  it.forEach(pair => {
    let [a, b] = pair;
    let det = document.createElement("details");
    let sum = document.createElement("summary");
    sum.innerHTML = a;
    det.appendChild(sum);
    if (!isDict(b)) {
      let ul = document.createElement("ul");
      b.forEach((s) => {
        let newli = document.createElement("li");
        newli.innerHTML =
          `<a href="./sets/` + (pref + a + s).replaceAll(" ", "") + `">` + s + `</a>`;
        ul.appendChild(newli);
      });
      det.appendChild(ul);
    }
    obj.appendChild(det);
    console.log(a, b);
    if (isDict(b)) {
      recurse(b, det, pref + a);
    }
  });
}

recurse(LIST_OF_LANGS, cntnr);

/* OLD
LIST_OF_LINKS.forEach(([a, b]) => {
  let det = document.createElement("details");
  let sum = document.createElement("summary");
  let [l, ...o] = a.split(" ");
  sum.innerHTML = l + ` <i>` + o.join(" ") + `</i>`;
  det.appendChild(sum);
  let ul = document.createElement("ul");
  b.forEach((s) => {
    let newli = document.createElement("li");
    newli.innerHTML =
      `<a href="./sets/` + (a + s).replaceAll(" ", "") + `">` + s + `</a>`;
    ul.appendChild(newli);
  });
  det.appendChild(ul);
  document.body.insertBefore(det, cstm);
  document.body.insertBefore(document.createElement("br"), cstm);
  document.body.insertBefore(document.createElement("br"), cstm);
});
*/

