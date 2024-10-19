const upload = document.getElementById("input-upload");
const file_text = document.getElementById("file-upload-text");
const upload_go = document.getElementById("upload-go-button");

let terms = [];

function read_vtp6_format(text) {
    let lines = text.split("\n");
    lines.forEach(line => {
        let spl = line.split("\t");
        if (spl.length == 2) {
            terms.push(spl);
        } else {
            console.error("Invalid line: " + line);
        }
    });
}

upload.addEventListener("input", () => {
    let n = upload.files.length
    if (n == 0) {
        file_text.innerHTML = `<i>No files selected</i>`;
        upload_go.disabled = true;
    } else if (n == 1) {
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
                read_vtp6_format(reader.result)
            }, false);
            reader.readAsText(file);
        }
    });
    document.getElementById("custom-upload-box").hidden = true;
    document.getElementById("settings-bar").hidden = false;
});