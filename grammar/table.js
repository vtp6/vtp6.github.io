/*

SYNTAX GUIDE

1.  The table is transposed, so rows in the js-data attribute
    are actually the columns of the real table

    NOTE: "row" from hereon in means row *of the js-data*, or
    column of the real table

2.  The cells in each row are separated by semicolons ;

3.  The first cell in each row is the header cell. Header
    cells are the template for cells in their row.

    EXAMPLE js-data:
      Col 1;abc;def
      Col 2;ghi;jkl
      Col 3;mno;pqr

    This will produce a table with three columns. The table
    will look like this:

       Col 1 | Col 2 | Col 3
      -------+-------+-------
       abc   | ghi   | mno
       def   | jkl   | pqr

    Yes, this table has been automatically generated from
    those three lines of js-data.

4.  Header cells may contain PREFIXES. These are contained in
    square brackets [] and save you from typing out the same
    prefix into each cell

    EXAMPLE js-data:
      [habl]ar;o;as;a;amos;áis;an
      [com]er;o;es;e;emos;éis;en
      [viv]ir;o;es;e;imos;ís;en

    This will produce a table with three columns. The table
    will look like this:

       hablar   | comer   | vivir
      ----------+---------+---------
       hablo    | como    | vivo
       hablas   | comes   | vives
       habla    | come    | vive
       hablamos | comemos | vivimos
       habláis  | coméis  | vivís
       hablan   | comen   | viven

    As you can see, the prefixes from the headers have been
    automatically added to each cell in their table column.

5.  Header cells may also contain SUFFIXES. These work the
    same way as prefixes, except they use braces {} and are
    added on at the end of each cell in the row.

    EXAMPLE js-data:
      {hablar};voy a ;vas a ;va a ;vamos a ;vais a ;van a 
      {comer};voy a ;vas a ;va a ;vamos a ;vais a ;van a 
      {vivir};voy a ;vas a ;va a ;vamos a ;vais a ;van a 

    This will produce a table with three columns. The table
    will look like this:

       hablar         | comer         | vivir
      ----------------+---------------+---------------
       voy a hablar   | voy a comer   | voy a vivir
       vas a hablar   | vas a comer   | vas a vivir
       va a hablar    | va a comer    | va a vivir
       vamos a hablar | vamos a comer | vamos a vivir
       vais a hablar  | vais a comer  | vais a vivir
       van a hablar   | van a comer   | van a vivir

    Prefixes and suffixes can also be used simultaneously.


[More coming soon...]

*/

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
    .replaceAll(/\|(.*)\|/g, ``)
    .replaceAll(/\/(.*)\//g, ``)
    .replaceAll(/\[(.*)\]/g, `$1`)
    .replaceAll(/\{(.*)\}/g, `$1`)
    .replaceAll(/\*(.*)\*/g, `<b>$1</b>`)
    .replaceAll(/\_(.*)\_/g, `<i>$1</i>`);
}

function prefix(string) {
  let m = string.match(/\[(.*)\]/)
  if (m === null) {
    return "";
  }
  return m[1]
    .replaceAll(/\*(.*)\*/g, `$1`)
    .replaceAll(/\_(.*)\_/g, `$1`)
    .replaceAll(/\|(.*)\|/g, `$1`)
    .replaceAll(/\/(.*)\//g, `$1`);
}

function suffix(string) {
  let m = string.match(/\{(.*)\}/)
  if (m === null) {
    return "";
  }
  return m[1]
    .replaceAll(/\*(.*)\*/g, `$1`)
    .replaceAll(/\_(.*)\_/g, `$1`)
    .replaceAll(/\|(.*)\|/g, `$1`)
    .replaceAll(/\/(.*)\//g, `$1`);
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
      let suff = suffix(head[ind]);

      if (cell[0] === "\\") {
        td.innerHTML = format(cell.slice(1));
      } else {
        td.innerHTML = pref + format("_*" + cell + "*_") + suff;
      }

      trow.appendChild(td);
    });

    tbl.appendChild(trow);
  });
})