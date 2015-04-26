var gistLog = [];
var fetchData = function () {
    var req = new XMLHttpRequest();
    if (!req) {
        throw 'Unable to create HttpRequest.';
    }

    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            var gistLog = JSON.parse(this.responseText);
        }
    };
    req.open('GET', 'https://api.github.com/gists');
    req.send();
}

window.onload = function () {
    fetchData();
}