const upload = document.getElementById("input-upload");
const file_text = document.getElementById("file-upload-text");
const upload_go = document.getElementById("upload-go-button");
const upload_format = document.getElementById("file-format");

let terms = [];

function read_vtp6_format(text) {
    let lines = text.split("\n");
    lines.forEach(line => {
        let spl = line.split("\t");
        if (spl.length === 2) {
            terms.push(spl);
        } else {
            console.error("Invalid line: " + line);
        }
    });
}

function read_vtp5_format(text) {
    let lines = text.split("\n");
    for (let i = 0; i < lines.length; i += 2) {
        terms.push([lines[i], lines[i + 1]]);
    }
}

function read_csv_format(text) {
    text.split("\n").forEach(line => {
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
        if (result.length === 2) {
            terms.push(result);
        } else {
            console.error("Invalid line: " + line);
        }
    });
}

upload.addEventListener("input", () => {
    let n = upload.files.length
    if (n === 0) {
        file_text.innerHTML = `<i>No files selected</i>`;
        upload_go.disabled = true;
    } else if (n === 1) {
        file_text.innerHTML = `<i>1 file selected</i>`;
        upload_go.disabled = false;
    } else {
        file_text.innerHTML = `<i>${n} files selected</i>`;
        upload_go.disabled = false;
    }
});

upload_go.addEventListener("click", () => {
    files = [...upload.files];
    files.forEach(file => {
        if (file) {
            let reader = new FileReader();
            reader.addEventListener("load", () => {
                let splits = file.name.split(".");
                if (splits[splits.length - 1].toLowerCase() == "csv" || upload_format.value === "csv") {
                    read_csv_format(reader.result);
                }
                if (upload_format.value === "vtp6") {
                    read_vtp6_format(reader.result);
                } else if (upload_format.value === "vtp5") {
                    read_vtp5_format(reader.result);
                }
            }, false);
            reader.readAsText(file);
        }
    });
    document.getElementById("custom-upload-box").hidden = true;
    document.getElementById("settings-bar").hidden = false;
});

document.getElementById("all-defs-checkbox").addEventListener("input", ({target}) => {
    OPTIONS["all"] = target.checked;
});
