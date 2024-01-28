let inputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl=document.getElementById("spinner");
inputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";
        let searchInput = inputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(responce) {
                return responce.json();
            })
            .then(function(jsonData) {
                //console.log(jsonData);
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);

            });
    }
});

function displayResults(searchResults) {
    //let result=searchResults[0];
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}


function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    //creating result item (div container -- result-item)
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    //anchor title --resut -title
    let resultTitle = document.createElement("a");
    resultTitle.classList.add("result-title");
    resultTitle.textContent = title;
    resultTitle.href = link;
    resultTitle.target = "_blank";
    resultItemEl.appendChild(resultTitle);

    //title break
    let titleBreak = document.createElement("br");
    resultTitle.appendChild(titleBreak);
    //anchor url --result url
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.herf = link;
    urlEl.textContent = link;
    urlEl.target = "_blank";
    resultItemEl.appendChild(urlEl);
    //line break
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);
    //para discp
    let descpEl = document.createElement("p");
    descpEl.classList.add("link-description");
    descpEl.textContent = description;
    resultItemEl.appendChild(descpEl);
}