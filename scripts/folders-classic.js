let full_terms_list = [];
let randomised_terms = [];

function folders_start_classic(terms) {
    full_terms_list = [...terms];
    randomised_terms = random_shuffle(terms);

    let classic_div = document.createElement("div");
    classic_div.innerHTML = `
        
    `;
    classic_div.id = "classic-div";
    document.getElementById("content")
        .insertBefore(classic_div, document.getElementById("margin"));
}