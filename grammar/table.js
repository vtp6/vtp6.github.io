let tbls = [...document.querySelectorAll(".convert")];

function extract_data(elem) {
  let str = elem.getAttribute("js-data");
  return zip(
    ...str
    .split("\n")
    .map(s => s.trim().split(";"))
    .filter(l => l.join(""))
  );
}

function zip(a, ...b) {
  return a.map((k, i) => [k, ...b.map(c => c[i])]);
}

function format(string) {
  return string
    .replaceAll(/\[(.*)\]/g, `$1`)
    .replaceAll(/\*(.*)\*/g, `<b>$1</b>`)
    .replaceAll(/\_(.*)\_/g, `<i>$1</i>`);
}

function prefix(string) {
  return string
    .match(/\[(.*)\]/)[1]
    .replaceAll(/\*(.*)\*/g, `$1`)
    .replaceAll(/\_(.*)\_/g, `$1`);
}

tbls.forEach(tbl => {
  let [head, ...data] = extract_data(tbl);

  let hrow = document.createElement("tr");
  head.forEach(s => {
    let th = document.createElement("th");
    th.innerHTML = format(s);
    hrow.appendChild(th);
  });
  tbl.appendChild(hrow);

  data.forEach(row => {
    let trow = document.createElement("tr");

    row.forEach((cell, ind) => {
      let td = document.createElement("td");
      let pref = prefix(head[ind]);

      td.innerHTML = pref + format("_*" + cell + "*_");
      trow.appendChild(td);
    });

    tbl.appendChild(trow);
  });
})