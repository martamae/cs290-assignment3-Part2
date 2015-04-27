var gistLog = [];
var gistList = [];
var faveGists = [];

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
        localStorage.setItem("faveGist", faveGists);

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
            //Remove from favorite list 
            var ulfRemove = this.parentNode.parentNode;
            var ulfParent = this.parentNode.parentNode.parentNode;

            ulfParent.removeChild(ulfRemove);

            //Remove from local storage
            localStorage.removeItem("faveGist");


            //Creates html to add gist to gist list
            generateGistHtml(faveGist);
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

var printFaves = function () {
    temp = localStorage.getItem("faveGist");
    faveGists = JSON.parse(temp);
    console.log(faveGists);
}

window.onload = function () {
    //fetch data from gitHub
    fetchData();

    //Favorite List
    var favString = localStorage.getItem("faveGist"), favObj;
    if (favString == null) {
        favObj = { "faveGist": [] };
        localStorage.setItem("faveGists", JSON.stringify(favObj));
    }
    else {
        favObj = JSON.parse(localStorage.getItem("gistFave"));

        printFaves();
    }

    //Add to favorite list
    // var id = faveGist.id;
    //   var description = faveGist.description;
    //    var url = faveGist.url;

    //Create favorite list
    //  var ulf = document.getElementById('favegistlist');
    //var ulfChild = document.createElement('ul');
    //var lifDesc = document.createElement('li');
    // lifDesc.innerText = description;
    // var lifURL = document.createElement('li');
    // lifURL.innerText = url;

    // var lifButton = document.createElement('li');
    // var rbutton = document.createElement('input');
    // rbutton.type = "button";
    // rbutton.value = "-";
    // rbutton.setAttribute("gistId", id);

    // rbutton.onclick = function () {
    //Remove from favorite list 
    //   var ulfRemove = this.parentNode.parentNode;
    //  var ulfParent = this.parentNode.parentNode.parentNode;

    // ulfParent.removeChild(ulfRemove);

    //Remove from local storage
    //localStorage.removeItem("faveGist");

    //Creates html to add gist to gist list
    // generateGistHtml(faveGist);
    //   }

    //Append
    //  lifButton.appendChild(rbutton);
    //ulfChild.appendChild(lifButton);
    //ulfChild.appendChild(lifDesc);
    //ulfChild.appendChild(lifURL);
    //ulf.appendChild(ulfChild);

}