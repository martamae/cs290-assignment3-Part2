var gistLog = [];
var fetchData = function () {
    var req = new XMLHttpRequest();
    if (!req) {
        throw 'Unable to create HttpRequest.';
    }

    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            var gistLog = JSON.parse(this.responseText);

            for (var i = 0; i < gistLog.length; i++) {
                generateGistHtml(gistLog[i]);
            }
        }
    };
    req.open('GET', 'https://api.github.com/gists');
    req.send();
}

var saveInput = function () {
    var input = document.getElementsByName('input')[0].value;
}

var generateGistHtml = function (gist) {
    var id = gist.id;
    var description = gist.description;
    var url = gist.url;

    //Create list
    var ul = document.getElementById('gistlist');
    var ulChild = document.createElement('ul');
    ulChild.id = id;
    var liDesc = document.createElement('li');
    liDesc.innerText = description;
    var liURL = document.createElement('li');
    liURL.innerText = url;
    ulChild.appendChild(liDesc);
    ulChild.appendChild(liURL);
    ul.appendChild(ulChild);

    //gist will have the entire gist data that comes from the api,
    // for the details check my pinned discussion about understanding JSON
    //Add a button (code above goes here) next to each element and save
    // the gist id in the html to be able to find it again, if you chose id,
    // you need a function called findById(id) that takes a gist id and iterates
    // over originalGistList to find the appropriate gist and returns it.
    //This function will be used in the previous step function (fetchData)
}
    
var findById = function(id) {
	//iterate over list of gists to find the gist with id equals to input id
    //return that gist
}

window.onload = function () {
    fetchData();
}