const xhrSearchBtn = document.getElementById("xhr");
xhrSearchBtn.addEventListener("click", searchUsingXHR)

const fetchSearchBtn = document.getElementById("fetchSearch");
fetchSearchBtn.addEventListener("click", searchUsingFetchSearch)

const fetchAsyncBtn = document.getElementById("fetchAsync");
fetchAsyncBtn.addEventListener("click", searchUsingAsyncSearch)

const searchQuery = document.getElementById("queryInput");
const API_URL = "https://api.unsplash.com/search/photos";
const accessKey = "10BaBAMGIJpT5KyQEMqNKpLHXjcQsFLmvvyNSXd0Nf4";

function searchUsingXHR() {
    let queryTerm = searchQuery.value.trim();
    const xhr = new XMLHttpRequest();

    xhr.open("GET", API_URL + "?query=" + queryTerm)
    xhr.setRequestHeader("Authorization", "Client-ID " + accessKey)

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let responseText = xhr.responseText;
            let responseObj = JSON.parse(responseText);
            createImages(responseObj);
        }
    }
    xhr.send();
}

async function searchUsingAsyncSearch() {
    let queryTerm = searchQuery.value.trim();
    let response = await fetch(API_URL + "?query=" + queryTerm,
        {
            method: "GET",
            headers: {
                "Authorization": "Client-ID " + accessKey
            }
        }
    )
    if (response.ok) {
        const responseObj = await response.json();
        createImages(responseObj);
    }
}

function searchUsingFetchSearch() {
    let queryTerm = searchQuery.value.trim();
    fetch(API_URL + "?query=" + queryTerm, {
        method: "GET",
        headers: {
            "Authorization": "Client-ID " + accessKey
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        createImages(data)
    })
}

function createImages(obj) {
    const resultsElem = document.getElementById("results");
    resultsElem.innerHTML="";
    for (let item of obj.results) {
        let imgElem = document.createElement("img");
        imgElem.src = item.urls.small;
        imgElem.alt = item.alt_description;
        resultsElem.appendChild(imgElem);
    }
}