var gistLog = [];
var gistList = [];

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
                gistList[i] = gistLog[i];
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
    var liDesc = document.createElement('li');
    liDesc.innerText = description;
    var liURL = document.createElement('li');
    liURL.innerText = url;

    var liButton = document.createElement('li');
    var fbutton = document.createElement('input');
    fbutton.type = "button";
    fbutton.value = "+";
    fbutton.setAttribute("gistId", id);

    fbutton.onclick = function () {
        var gistId = this.getAttribute("gistId");
        var faveGist = findById(gistId);

        //Add gist to favorite list in local storage
        var gists = [];
        gists[0] = faveGist;
        localStorage["faveGists"] = JSON.stringify(gists);

        //Add to favorite list
        var description = faveGist.description;
        var url = faveGist.url;

        //Create favorite list
        var ulf = document.getElementById('favegistlist');
        var ulfChild = document.createElement('ul');
        var lifDesc = document.createElement('li');
        lifDesc.innerText = description;
        var lifURL = document.createElement('li');
        lifURL.innerText = url;

        var lifButton = document.createElement('li');
        var rbutton = document.createElement('input');
        rbutton.type = "button";
        rbutton.value = "-";
        rbutton.setAttribute("gistId", gistId);

        rbutton.onclick = function () {

            console.log("Remove click");
            //Add to gist list


            //Remove from favorite list 
        }

        //Append
        lifButton.appendChild(rbutton);
        ulfChild.appendChild(lifButton);
        ulfChild.appendChild(lifDesc);
        ulfChild.appendChild(lifURL);
        ulf.appendChild(ulfChild);

        var ulRemove = this.parentNode.parentNode;
        var ulParent = this.parentNode.parentNode.parentNode;

        ulParent.removeChild(ulRemove);
    }

    //Append
    liButton.appendChild(fbutton);
    ulChild.appendChild(liButton);
    ulChild.appendChild(liDesc);
    ulChild.appendChild(liURL);
    ul.appendChild(ulChild);
}

var findById = function (id) {
    //iterate over list of gists to find the gist with id equals to input id
    //return that gist

    for (var i = 0; i < gistList.length; i++) {
        if (id === gistList[i].id) {
            return gistList[i];
        }
    }
}

window.onload = function () {
    fetchData();
}