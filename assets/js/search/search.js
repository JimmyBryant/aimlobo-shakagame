

let fuse; // holds our search engine
let resList = document.getElementById('searchResults');
let sInput = document.getElementById('searchInput');
let first, last, current_elem = null;
let resultsAvailable = false;

// Convert YAML configuration to JavaScript object
const fuseOpts = {
    isCaseSensitive: false,
    shouldSort: true,
    location: 0,
    distance: 1000,
    threshold: 0.4,
    minMatchCharLength: 0,
    limit: 10,
    keys: ["title", "permalink", "summary", "content"]
};

// Load our search index
window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/index.json', true); // Ensure this path is correct for your setup
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                if (data) {
                    // Use the options from fuseOpts
                    let options = {
                        isCaseSensitive: fuseOpts.isCaseSensitive,
                        shouldSort: fuseOpts.shouldSort,
                        location: fuseOpts.location,
                        distance: fuseOpts.distance,
                        threshold: fuseOpts.threshold,
                        minMatchCharLength: fuseOpts.minMatchCharLength,
                        keys: fuseOpts.keys
                    };
                    fuse = new Fuse(data, options); // Initialize fuse with data
                }
            }
        }
    };
    xhr.send();
};

// Perform search on input
sInput.addEventListener('input', function (e) {
    const results = fuse.search(e.target.value);
    // Clear previous results
    resList.innerHTML = '';

    if (results.length === 0) {
        resultsAvailable = false;
        return;
    }

    resultsAvailable = true;
    first = null;
    last = null;

    // Display results
    results.forEach((result, idx) => {
        let item = result.item; // Access the original item
        let resultItem = document.createElement('li');
        resultItem.innerHTML = `<a href="${item.permalink}">${item.title}</a>`;
        resList.appendChild(resultItem);

        if (idx === 0) {
            first = resultItem;
        }
        if (idx === results.length - 1) {
            last = resultItem;
        }
    });
});

// Handle keyboard navigation
document.addEventListener('keydown', function (e) {
    if (resultsAvailable) {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (current_elem === null) {
                    current_elem = first;
                } else {
                    current_elem = current_elem.nextSibling || current_elem;
                }
                current_elem.querySelector('a').focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (current_elem === null) {
                    current_elem = last;
                } else {
                    current_elem = current_elem.previousSibling || current_elem;
                }
                current_elem.querySelector('a').focus();
                break;
            case 'Escape':
                resList.innerHTML = '';
                sInput.value = '';
                current_elem = null;
                resultsAvailable = false;
                break;
            case 'Enter':
                if (current_elem) {
                    current_elem.querySelector('a').click();
                }
                break;
        }
    }
});
