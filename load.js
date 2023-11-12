// Load the links onto the main page

const sub = document.getElementById("sub");
const cstm = document.getElementById("custom");

LIST_OF_LINKS.forEach(([a, b]) => {
  let det = document.createElement("details");
  let sum = document.createElement("summary");
  sum.innerHTML = a;
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
