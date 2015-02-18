
// -----------------------------------------------------------------------------
// Start function
// -----------------------------------------------------------------------------
self.port.on("bootstrap", bootstrap);
// -----------------------------------------------------------------------------

var i = 0;

var quality = "allQuality",     qualityId = 0;      // Default All
var translate = "allTranslate", translateId = 0;    // Default All
var type = "allType",           typeId = 0;         // Default All

var parseXml;

function bootstrap(items) {

    filterGet(items);
    menu(items);
    torrent([items]);

}

if (window.DOMParser) {
    parseXml = function(xmlStr) {
        return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
    };
} else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
    parseXml = function(xmlStr) {
        var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlStr);
        return xmlDoc;
    };
} else {
    parseXml = function() { return null; }
}

// Analysis of the data obtained
function filterGet(items) {

    document.getElementById('menuQualitySave').classList.add('caret');
    document.getElementById("menuQualitySave").textContent = "";
    document.getElementById('menuTranslateSave').classList.add('caret');
    document.getElementById("menuTranslateSave").textContent = "";
    document.getElementById('menuTypeSave').classList.add('caret');
    document.getElementById("menuTypeSave").textContent = "";

    if (items.hasOwnProperty('quality')) {

        quality = items["quality"];

        if (quality == "idealQuality") {
            qualityId = 3;
        }
        else if (quality == "goodQuality") {
            qualityId = 2;
        }
        else if (quality == "badQuality") {
            qualityId = 1;
        }
        else if (quality == "kpkQuality") {
            qualityId = 4;
        }

    }

    if (items.hasOwnProperty('translate')) {

        translate = items["translate"];

        if (translate == "idealTranslate") {
            translateId = 1;
        }
        else if (translate == "profTranslate") {
            translateId = 2;
        }
        else if (translate == "authorTranslate") {
            translateId = 3;
        }
        else if (translate == "amateurTranslate") {
            translateId = 4;
        }
        else if (translate == "subTranslate") {
            translateId = 5;
        }

    }

    if (items.hasOwnProperty('type')) {

        type = items["type"];

        if (type == "extendedType") {
            typeId = 1;
        }
        else if (type == "theatricalType") {
            typeId = 2;
        }
        else if (type == "directedType") {
            typeId = 3;
        }
        else if (type == "alternativeType") {
            typeId = 4;
        }

    }

    var translateArr = [
        ["idealTranslate",   items["local"]["idealTranslate"]],
        ["profTranslate",    items["local"]["profTranslate"]],
        ["authorTranslate",  items["local"]["authorTranslate"]],
        ["amateurTranslate", items["local"]["amateurTranslate"]],
        ["subTranslate",     items["local"]["subTranslate"]],
        ["allTranslate",     items["local"]["allTranslate"]]
    ];

    var qualityArr = [
        ["idealQuality",     items["local"]["idealQuality"]],
        ["goodQuality",      items["local"]["goodQuality"]],
        ["badQuality",       items["local"]["badQuality"]],
        ["kpkQuality",       items["local"]["kpkQuality"]],
        ["allQuality",       items["local"]["allQuality"]]
    ];

    var typeArr = [
        ["extendedType",     items["local"]["extendedType"]],
        ["theatricalType",   items["local"]["theatricalType"]],
        ["directedType",     items["local"]["directedType"]],
        ["alternativeType",  items["local"]["alternativeType"]],
        ["allType",          items["local"]["allType"]]
    ];

    var helpArr = [
        ["onlineHelp",       items["local"]["lineHelp"]],
        ["downloadHelp",     items["local"]["downloadHelp"]],
        ["magnetHelp",       items["local"]["magnetHelp"]],
        ["updownHelp",       items["local"]["updownHelp"]],
        ["linkHelp",         items["local"]["linkHelp"]]
    ];

    for (i = 0; i < helpArr.length; i++) {

        while(document.getElementById(helpArr[i][0]).firstChild){
            document.getElementById(helpArr[i][0]).removeChild(document.getElementById(helpArr[i][0]).firstChild);
        }

        var menuHelpSpan1 = document.createElement('span');
        var menuHelpSpan2 = document.createElement('span');
        var menuHelpSpan3 = document.createElement('span');
        var menuHelpI1    = document.createElement('i');
        var menuHelpI2    = document.createElement('i');

        if (helpArr[i][0] == "onlineHelp") {
            menuHelpI2.setAttribute("class", "fa fa-youtube-play fa-stack-1x text-danger");
        }
        else if (helpArr[i][0] == "downloadHelp") {
            menuHelpI2.setAttribute("class", "fa fa-cloud-download fa-stack-1x text-success");
        }
        else if (helpArr[i][0] == "magnetHelp") {
            menuHelpI2.setAttribute("class", "fa fa-magnet fa-stack-1x text-warning");
        }
        else if (helpArr[i][0] == "updownHelp") {
            menuHelpI2.setAttribute("class", "fa fa-thumbs-up fa-flip-horizontal fa-stack-1x text-success");
        }
        else if (helpArr[i][0] == "linkHelp") {
            menuHelpI2.setAttribute("class", "fa fa-external-link fa-stack-1x text-muted");
        }

        menuHelpSpan1.setAttribute("class", "fa-stack fa-lg");
        menuHelpI1.setAttribute("class", "fa fa-square fa-stack-2x");
        menuHelpSpan1.appendChild(menuHelpI1);
        menuHelpSpan1.appendChild(menuHelpI2);
        menuHelpSpan2.textContent = " - " + helpArr[i][1];
        menuHelpSpan3.appendChild(menuHelpSpan1);
        menuHelpSpan3.appendChild(menuHelpSpan2);
        document.getElementById(helpArr[i][0]).appendChild(menuHelpSpan3);

    }

    for (i = 0; i < translateArr.length; i++) {

        while(document.getElementById(translateArr[i][0]).firstChild){
            document.getElementById(translateArr[i][0]).removeChild(document.getElementById(translateArr[i][0]).firstChild);
        }

        var translateI      = document.createElement('i');
        var translateStrong = document.createElement('strong');
        var translateSpan   = document.createElement('span');

        if (translate == translateArr[i][0]) {
            translateI.setAttribute("class", "fa fa-dot-circle-o");
            translateStrong.textContent = " " + translateArr[i][1];
            document.getElementById(translateArr[i][0]).appendChild(translateI);
            document.getElementById(translateArr[i][0]).appendChild(translateStrong);
        }
        else {
            translateI.setAttribute("class", "fa fa-circle-o");
            translateSpan.textContent = " " + translateArr[i][1];
            document.getElementById(translateArr[i][0]).appendChild(translateI);
            document.getElementById(translateArr[i][0]).appendChild(translateSpan);
        }

    }

    for (i = 0; i < qualityArr.length; i++) {

        while(document.getElementById(qualityArr[i][0]).firstChild){
            document.getElementById(qualityArr[i][0]).removeChild(document.getElementById(qualityArr[i][0]).firstChild);
        }

        var qualityI      = document.createElement('i');
        var qualityStrong = document.createElement('strong');
        var qualitySpan   = document.createElement('span');

        if (quality == qualityArr[i][0]) {
            qualityI.setAttribute("class", "fa fa-dot-circle-o");
            qualityStrong.textContent = " " + qualityArr[i][1];
            document.getElementById(qualityArr[i][0]).appendChild(qualityI);
            document.getElementById(qualityArr[i][0]).appendChild(qualityStrong);
        }
        else {
            qualityI.setAttribute("class", "fa fa-circle-o");
            qualitySpan.textContent = " " + qualityArr[i][1];
            document.getElementById(qualityArr[i][0]).appendChild(qualityI);
            document.getElementById(qualityArr[i][0]).appendChild(qualitySpan);
        }
    }

    for (i = 0; i < typeArr.length; i++) {

        while(document.getElementById(typeArr[i][0]).firstChild){
            document.getElementById(typeArr[i][0]).removeChild(document.getElementById(typeArr[i][0]).firstChild);
        }

        var typeI      = document.createElement('i');
        var typeStrong = document.createElement('strong');
        var typeSpan   = document.createElement('span');

        if (type == typeArr[i][0]) {
            typeI.setAttribute("class", "fa fa-dot-circle-o");
            typeStrong.textContent = " " + typeArr[i][1];
            document.getElementById(typeArr[i][0]).appendChild(typeI);
            document.getElementById(typeArr[i][0]).appendChild(typeStrong);
        }
        else {
            typeI.setAttribute("class", "fa fa-circle-o");
            typeSpan.textContent = " " + typeArr[i][1];
            document.getElementById(typeArr[i][0]).appendChild(typeI);
            document.getElementById(typeArr[i][0]).appendChild(typeSpan);
        }
        
    }

}

// Save of the data obtained
function filterSave(quality, translate, type, items) {

    var alertI     = document.createElement('i');
    var alertSpan1 = document.createElement('span');
    var alertSpan2 = document.createElement('span');
    
    alertSpan1.setAttribute("class", "text-success");
    alertI.setAttribute("class", "fa fa-check");
    alertSpan2.textContent = " OK";
    alertSpan1.appendChild(alertI);
    alertSpan1.appendChild(alertSpan2);

    var filter = {};
    if (quality != false) {
        document.getElementById('menuQualitySave').classList.remove('caret');
        document.getElementById("menuQualitySave").textContent = "";
        document.getElementById("menuQualitySave").appendChild(alertSpan1);
        filter.quality = quality;
    }
    else {
        filter.quality = "";
    }
    if (translate != false) {
        document.getElementById('menuTranslateSave').classList.remove('caret');
        document.getElementById("menuTranslateSave").textContent = "";
        document.getElementById("menuTranslateSave").appendChild(alertSpan1);
        filter.translate = translate;
    }
    else {
        filter.translate = "";
    }
    if (type != false) {
        document.getElementById('menuTypeSave').classList.remove('caret');
        document.getElementById("menuTypeSave").textContent = "";
        document.getElementById("menuTypeSave").appendChild(alertSpan1);
        filter.type = type;
    }
    else {
        filter.type = "";
    }

    var alertInfoDiv1 = document.createElement('div');
    var alertInfoDiv2 = document.createElement('div');
    alertInfoDiv1.setAttribute("class", "panel panel-success");
    alertInfoDiv1.setAttribute("style", "margin: 20px;");
    alertInfoDiv2.setAttribute("class", "panel-body text-center");
    alertInfoDiv2.textContent = items;
    alertInfoDiv1.appendChild(alertInfoDiv2);

    document.getElementById('information').classList.remove('hide');
    document.getElementById("information").textContent = "";
    document.getElementById("information").insertBefore(alertInfoDiv1, document.getElementById("information").firstChild);

    self.port.emit("quality", filter.quality);
    self.port.emit("translate", filter.translate);
    self.port.emit("type", filter.type);

    return false;
    
}

// Wait for the download page
function menu(items) {
    
    document.getElementById('search').addEventListener('click', function() {
        
        items.title = document.getElementById('query').value;
        items.url = "search";
        
        return torrent([items]);
        
    });

    document.onkeyup = function (e) {

        e = e || window.event;

        if (e.keyCode === 13) {

            items.title = document.getElementById('query').value;
            items.url = "search";

            document.getElementById('menu').click();

            return torrent([items]);

        }

        return false;

    };

    while(document.getElementById("information").firstChild){
        document.getElementById("information").removeChild(document.getElementById("information").firstChild);
    }

    var progressI   = document.createElement('i');
    var progressDiv = document.createElement('div');
    
    progressI.setAttribute("class", "fa fa-spinner fa-spin fa-5x text-success");
    progressDiv.setAttribute("style", "margin:100px auto; text-align:center;");
    progressDiv.appendChild(progressI);
    document.getElementById("information").appendChild(progressDiv);

    document.getElementById('menuOnline').addEventListener('click', function() {
        document.getElementById('menuFilterOn').classList.remove('disabled');
        document.getElementById('menuFilterOff').classList.remove('disabled');
        document.getElementById('menuOnline').classList.add('disabled');

        document.getElementById('information').classList.add('hide');
        document.getElementById('contentFilterOn').classList.add('hide');
        document.getElementById('contentFilterOff').classList.add('hide');
        document.getElementById('contentOnline').classList.remove('hide');
    });
    document.getElementById('menuFilterOn').addEventListener('click', function() {
        document.getElementById('menuOnline').classList.remove('disabled');
        document.getElementById('menuFilterOff').classList.remove('disabled');
        document.getElementById('menuFilterOn').classList.add('disabled');

        document.getElementById('information').classList.add('hide');
        document.getElementById('contentOnline').classList.add('hide');
        document.getElementById('contentFilterOff').classList.add('hide');
        document.getElementById('contentFilterOn').classList.remove('hide');
    });
    document.getElementById('menuFilterOff').addEventListener('click', function() {
        document.getElementById('menuOnline').classList.remove('disabled');
        document.getElementById('menuFilterOn').classList.remove('disabled');
        document.getElementById('menuFilterOff').classList.add('disabled');

        document.getElementById('information').classList.add('hide');
        document.getElementById('contentOnline').classList.add('hide');
        document.getElementById('contentFilterOn').classList.add('hide');
        document.getElementById('contentFilterOff').classList.remove('hide');
    });

    document.getElementById('idealQuality').addEventListener('click', function() {
        return filterSave("idealQuality", false, false, items["local"]["alertSave"]);
    });
    document.getElementById('goodQuality').addEventListener('click', function() {
        return filterSave("goodQuality", false, false, items["local"]["alertSave"]);
    });
    document.getElementById('badQuality').addEventListener('click', function() {
        return filterSave("badQuality", false, false, items["local"]["alertSave"]);
    });
    document.getElementById('kpkQuality').addEventListener('click', function() {
        return filterSave("kpkQuality", false, false, items["local"]["alertSave"]);
    });
    document.getElementById('allQuality').addEventListener('click', function() {
        return filterSave("allQuality", false, false, items["local"]["alertSave"]);
    });

    document.getElementById('idealTranslate').addEventListener('click', function() {
        return filterSave(false, "idealTranslate", false, items["local"]["alertSave"]);
    });
    document.getElementById('profTranslate').addEventListener('click', function() {
        return filterSave(false, "profTranslate", false, items["local"]["alertSave"]);
    });
    document.getElementById('authorTranslate').addEventListener('click', function() {
        return filterSave(false, "authorTranslate", false, items["local"]["alertSave"]);
    });
    document.getElementById('amateurTranslate').addEventListener('click', function() {
        return filterSave(false, "amateurTranslate", false, items["local"]["alertSave"]);
    });
    document.getElementById('subTranslate').addEventListener('click', function() {
        return filterSave(false, "subTranslate", false, items["local"]["alertSave"]);
    });
    document.getElementById('allTranslate').addEventListener('click', function() {
        return filterSave(false, "allTranslate", false, items["local"]["alertSave"]);
    });

    document.getElementById('extendedType').addEventListener('click', function() {
        return filterSave(false, false, "extendedType", items["local"]["alertSave"]);
    });
    document.getElementById('theatricalType').addEventListener('click', function() {
        return filterSave(false, false, "theatricalType", items["local"]["alertSave"]);
    });
    document.getElementById('directedType').addEventListener('click', function() {
        return filterSave(false, false, "directedType", items["local"]["alertSave"]);
    });
    document.getElementById('alternativeType').addEventListener('click', function() {
        return filterSave(false, false, "alternativeType", items["local"]["alertSave"]);
    });
    document.getElementById('allType').addEventListener('click', function() {
        return filterSave(false, false, "allType", items["local"]["alertSave"]);
    });
}

// Load online
function online(tabs) {
    
    var online = new XMLHttpRequest();
    online.open("POST", "http://api.qimdb.com/online", true);
    online.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    online.overrideMimeType('text/xml');
    online.onreadystatechange = function() {
        
        if (online.readyState == 4) {

            var xmlDoc = parseXml(online.responseText);

            var onlineXml = xmlDoc.querySelectorAll('online');

            while(document.getElementById("contentOnline").firstChild){
                document.getElementById("contentOnline").removeChild(document.getElementById("contentOnline").firstChild);
            }

            if (onlineXml && onlineXml.length >= 1) {

                for (var i = 0; i < onlineXml.length; i++) {

                    if (!onlineXml[i]) continue;

                    var ii = i+1;

                    var onlineDataPanel = document.createElement('div');
                    onlineDataPanel.setAttribute("class", "panel panel-info");
                    onlineDataPanel.setAttribute("id", "play" + ii);
                    onlineDataPanel.setAttribute("style", "margin: 20px;");

                    var onlineDataHeading = document.createElement('div');
                    onlineDataHeading.setAttribute("class", "panel-heading text-left");
                    onlineDataHeading.setAttribute("id", "playTitle" + ii);
                    onlineDataHeading.textContent = onlineXml[i].getAttribute("title");

                    var onlineDataBody = document.createElement('div');
                    onlineDataBody.setAttribute("class", "panel-body text-center");

                    var onlineDataA = document.createElement('a');
                    var href = onlineXml[i].getAttribute("href");
                    href = href.replace('https://', '');
                    href = href.replace('http://', '');
                    onlineDataA.setAttribute("href", "html/online.html#" + href + "///" + tabs[0].title.replace(/[^A-Za-zА-Яа-яЁё0-9 -]/g, '') + "///online");
                    onlineDataA.setAttribute("target", "_blank");
                    onlineDataA.setAttribute("id", "linkOnline" + ii);

                    var onlineDataImg = document.createElement('img');
                    onlineDataImg.setAttribute("src", "img/play.png");
                    onlineDataImg.setAttribute("class", "img-thumbnail");

                    onlineDataA.appendChild(onlineDataImg);
                    onlineDataBody.appendChild(onlineDataA);
                    onlineDataPanel.appendChild(onlineDataHeading);
                    onlineDataPanel.appendChild(onlineDataBody);
                    document.getElementById("contentOnline").appendChild(onlineDataPanel);

                }

            }
            else {

                document.getElementById('menuOnline').classList.remove('disabled');
                document.getElementById('menuOnline').classList.remove('btn-success');
                document.getElementById('menuOnline').classList.add('btn-danger');

                var contentOnlineDiv1 = document.createElement('div');
                var contentOnlineDiv2 = document.createElement('div');
                contentOnlineDiv1.setAttribute("class", "panel panel-success");
                contentOnlineDiv1.setAttribute("style", "margin: 20px;");
                contentOnlineDiv2.setAttribute("class", "panel-body text-center");
                contentOnlineDiv2.textContent = tabs[0]["local"]["alertNotData"];
                contentOnlineDiv1.appendChild(contentOnlineDiv2);
                document.getElementById("contentOnline").appendChild(contentOnlineDiv1);

                if (document.getElementById("contentFilterOff").textContent == tabs[0]["local"]["alertNotData"] && document.getElementById("contentFilterOn").textContent == tabs[0]["local"]["alertNotData"]) {
                    document.getElementById('contentOnline').classList.add('hide');
                    information();
                }

            }

        }

    };
    online.send("format=xml&title=" + encodeURIComponent(tabs[0].title) + "&url=" + encodeURIComponent(tabs[0].url));

}

// Load download link
function torrent(tabs) {

    var torrent = new XMLHttpRequest();
    torrent.open("POST", "http://api.qimdb.com/torrent", true);
    torrent.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    torrent.overrideMimeType('text/xml');
    torrent.onreadystatechange = function() {

        if (torrent.readyState == 4) {

            var xmlDoc = parseXml(torrent.responseText);

            var torrentXml = xmlDoc.querySelectorAll('torrent');

            while(document.getElementById("contentFilterOn").firstChild){
                document.getElementById("contentFilterOn").removeChild(document.getElementById("contentFilterOn").firstChild);
            }
            while(document.getElementById("contentFilterOff").firstChild){
                document.getElementById("contentFilterOff").removeChild(document.getElementById("contentFilterOff").firstChild);
            }

            var onlineText = tabs[0]["local"]["line"];
            var downloadText = tabs[0]["local"]["download"];

            if (torrentXml && torrentXml.length >= 1) {

                var colorOff           = "#ffffff";
                var colorOn            = "#ffffff";
                var zebraOff           = 0;
                var zebraOn            = 0;

                for (var i = 0; i < torrentXml.length; i++) {

                    if (!torrentXml[i]) continue;

                    var space = document.createElement('span');
                    space.textContent = " ";

                    var filterTranslate    = false;
                    var userId             = torrentXml[i].getAttribute("tracker") + '_' + torrentXml[i].getAttribute("tracker_id") +'_'+ tabs[0].id;
                    var torrentTitle       = (torrentXml[i].getAttribute("title").length > 45) ? torrentXml[i].getAttribute("title").substr(0, 45) + '...' : torrentXml[i].getAttribute("title");

// UP **************
                    var torrentUp = document.createElement('a');
                    var torrentUpSpan = document.createElement('span');
                    var torrentUpI = document.createElement('i');
                    var torrentUpText = document.createElement('span');

                    if (torrentXml[i].getAttribute("tracker") + '_' + torrentXml[i].getAttribute("tracker_id") +'_'+ torrentXml[i].getAttribute("rating_last_id") != userId) {
                        torrentUp.setAttribute("href", "#upRating");
                        torrentUp.setAttribute("style", "text-decoration: none;");
                        torrentUp.setAttribute("class", "up up" + userId);
                        torrentUp.setAttribute("alt", userId);
                        torrentUpSpan.setAttribute("class", "label label-default");
                        torrentUpSpan.setAttribute("style", "margin: 0 1px 0 0;");
                        torrentUpI.setAttribute("class", "fa fa-thumbs-up fa-flip-horizontal text-success");
                        torrentUpText.setAttribute("class", "text-success");
                        torrentUpText.setAttribute("id", "thumbs-up" + userId);
                        torrentUpText.textContent = " " + torrentXml[i].getAttribute("rating_up");
                        torrentUpSpan.appendChild(torrentUpI);
                        torrentUpSpan.appendChild(torrentUpText);
                        torrentUp.appendChild(torrentUpSpan);
                    }
                    else {
                        torrentUpSpan.setAttribute("class", "label label-default");
                        torrentUpSpan.setAttribute("style", "margin: 0 1px 0 0;");
                        torrentUpI.setAttribute("class", "fa fa-thumbs-up fa-flip-horizontal text-muted");
                        torrentUpText.setAttribute("class", "text-muted");
                        torrentUpText.setAttribute("id", "thumbs-up" + userId);
                        torrentUpText.textContent = " " + torrentXml[i].getAttribute("rating_up");
                        torrentUpSpan.appendChild(torrentUpI);
                        torrentUpSpan.appendChild(torrentUpText);
                        torrentUp = torrentUpSpan;
                    }

// DOWN ************
                    var torrentDown = document.createElement('a');
                    var torrentDownSpan = document.createElement('span');
                    var torrentDownI = document.createElement('i');
                    var torrentDownText = document.createElement('span');

                    if (torrentXml[i].getAttribute("tracker") + '_' + torrentXml[i].getAttribute("tracker_id") +'_'+ torrentXml[i].getAttribute("rating_last_id") != userId) {
                        torrentDown.setAttribute("href", "#downRating");
                        torrentDown.setAttribute("style", "text-decoration: none;");
                        torrentDown.setAttribute("class", "down down" + userId);
                        torrentDown.setAttribute("alt", userId);
                        torrentDownSpan.setAttribute("class", "label label-default");
                        torrentDownSpan.setAttribute("style", "margin: 0 1px;");
                        torrentDownI.setAttribute("class", "fa fa-thumbs-down text-danger");
                        torrentDownText.setAttribute("class", "text-danger");
                        torrentDownText.setAttribute("id", "thumbs-down" + userId);
                        torrentDownText.textContent = torrentXml[i].getAttribute("rating_down") + " ";
                        torrentDownSpan.appendChild(torrentDownText);
                        torrentDownSpan.appendChild(torrentDownI);
                        torrentDown.appendChild(torrentDownSpan);
                    }
                    else {
                        torrentDownSpan.setAttribute("class", "label label-default");
                        torrentDownSpan.setAttribute("style", "margin: 0 1px;");
                        torrentDownI.setAttribute("class", "fa fa-thumbs-down text-muted");
                        torrentDownText.setAttribute("class", "text-muted");
                        torrentDownText.setAttribute("id", "thumbs-down" + userId);
                        torrentDownText.textContent = torrentXml[i].getAttribute("rating_down") + " ";
                        torrentDownSpan.appendChild(torrentDownText);
                        torrentDownSpan.appendChild(torrentDownI);
                        torrentDown = torrentDownSpan;
                    }

// DOWNLOAD ********
                    var torrentDownload = document.createElement('a');
                    var torrentDownloadI = document.createElement('i');
                    var torrentDownloadText = document.createElement('span');
                    torrentDownload.setAttribute("href", "http://torrent.qimdb.com/download/" + torrentXml[i].getAttribute("tracker") + "_" + torrentXml[i].getAttribute("tracker_id"));
                    torrentDownload.setAttribute("style", "text-decoration: none;");
                    torrentDownload.setAttribute("target", "_blank");
                    torrentDownloadI.setAttribute("class", "fa fa-cloud-download text-success");
                    torrentDownloadText.textContent = downloadText + " ";
                    torrentDownload.appendChild(torrentDownloadText);
                    torrentDownload.appendChild(torrentDownloadI);

// MAGNET **********
                    var torrentMagnet = document.createElement('a');
                    var torrentMagnetI = document.createElement('i');
                    torrentMagnet.setAttribute("href", "magnet:?xt=urn:btih:" + torrentXml[i].getAttribute("download") + "&dn=FILMEGO&tr=udp%3A%2F%2Fbt.firebit.org%3A2710%2Fannounce&tr=udp%3A%2F%2Fbt.rutor.org%3A2710%2Fannounce&tr=udp%3A%2F%2Fannounce.opensharing.org%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.istole.it%3A6969%2Fannounce");
                    torrentMagnet.setAttribute("style", "margin: 0 3px;");
                    torrentMagnet.setAttribute("target", "_blank");
                    torrentMagnetI.setAttribute("class", "fa fa-magnet text-warning");
                    torrentMagnet.appendChild(torrentMagnetI);

// ONLINE **********
                    var torrentOnline = document.createElement('a');
                    var torrentOnlineI = document.createElement('i');
                    var torrentOnlineText = document.createElement('span');
                    torrentOnline.setAttribute("href", "html/online.html#torrent.qimdb.com/download/" + torrentXml[i].getAttribute("tracker") + "_" + torrentXml[i].getAttribute("tracker_id") + "///" + tabs[0].title.replace(/[^A-Za-zА-Яа-яЁё0-9 -]/g, '') + "///acestream");
                    torrentOnline.setAttribute("style", "text-decoration: none;");
                    torrentOnline.setAttribute("target", "_blank");
                    torrentOnlineI.setAttribute("class", "fa fa-youtube-play text-danger");
                    torrentOnlineText.textContent = " " + onlineText;
                    torrentOnline.appendChild(torrentOnlineI);
                    torrentOnline.appendChild(torrentOnlineText);

// TRACKER LINK ****
                    var torrentTrackerLink = document.createElement('a');
                    var torrentTrackerLinkI = document.createElement('i');
                    torrentTrackerLink.setAttribute("href", "http://torrent.qimdb.com/tracker/" + torrentXml[i].getAttribute("tracker") + "_" + torrentXml[i].getAttribute("tracker_id"));
                    torrentTrackerLink.setAttribute("style", "margin: 0 3px 0 0;");
                    torrentTrackerLink.setAttribute("target", "_blank");
                    torrentTrackerLinkI.setAttribute("class", "fa fa-external-link text-muted");
                    torrentTrackerLink.appendChild(torrentTrackerLinkI);

// SIZE ************
                    var torrentSize = document.createElement('span');
                    var torrentSizeI = document.createElement('i');
                    var torrentSizeText = document.createElement('span');

                    if (torrentXml[i].getAttribute("size") <= 1024) {
                        torrentSize.setAttribute("class", "label label-warning");
                    }
                    else if (torrentXml[i].getAttribute("size") <= 3500) {
                        torrentSize.setAttribute("class", "label label-info");
                    }
                    else if (torrentXml[i].getAttribute("size") <= 100000) {
                        torrentSize.setAttribute("class", "label label-success");
                    }
                    else {
                        torrentSize.setAttribute("class", "label label-default");
                    }

                    torrentSize.setAttribute("style", "margin: 0 1px;");
                    torrentSizeI.setAttribute("class", "fa fa-hdd-o");
                    torrentSizeText.textContent = " " + (torrentXml[i].getAttribute("size")/1024).toFixed(2) + " GB";
                    torrentSize.appendChild(torrentSizeI);
                    torrentSize.appendChild(torrentSizeText);

// QUALITY *********
                    var torrentQuality = document.createElement('span');
                    var torrentQualityI = document.createElement('i');
                    var torrentQualityText = document.createElement('span');

                    if (torrentXml[i].getAttribute("quality") != 0) {

                        if (torrentXml[i].getAttribute("quality") == 1) {
                            torrentQuality.setAttribute("class", "label label-danger");
                        }
                        else if (torrentXml[i].getAttribute("quality") == 2) {
                            torrentQuality.setAttribute("class", "label label-info");
                        }
                        else if (torrentXml[i].getAttribute("quality") == 3) {
                            torrentQuality.setAttribute("class", "label label-success");
                        }
                        else if (torrentXml[i].getAttribute("quality") == 4) {
                            torrentQuality.setAttribute("class", "label label-warning");
                        }

                        torrentQuality.setAttribute("style", "margin: 0 1px;");
                        torrentQualityI.setAttribute("class", "fa fa-picture-o");
                        torrentQualityText.textContent = " " + tabs[0]["local"]["torrentQuality" + torrentXml[i].getAttribute("quality")];
                        torrentQuality.appendChild(torrentQualityI);
                        torrentQuality.appendChild(torrentQualityText);

                    }

// TRANSLATE *******
                    var torrentTranslate  = document.createElement('span');
                    var torrentTranslateI = document.createElement('i');
                    var torrentTranslateText = document.createElement('span');

                    var translate = torrentXml[i].getAttribute("translate");
                    translate = translate.split("");
                    translate.sort();
                    var length = translate.length;
                    while (length--) {
                        if (translate[length] == translate[length-1]) {
                            translate.splice(length, 1);
                            if (translateId != 0 && translateId == translate[length]) {
                                filterTranslate = true;
                            }
                        }
                    }

                    if (translate.length >= 2) {
                        var text = "";
                        for (var tt = 0; tt < translate.length; tt++) {
                            if (text == "") {
                                text = " " + tabs[0]["local"]["torrentTranslate" + translate[tt]];
                            }
                            else {
                                text = text + " + " + tabs[0]["local"]["torrentTranslate" + translate[tt]];
                            }
                        }
                        torrentTranslate.setAttribute("class", "label label-default");
                        torrentTranslate.setAttribute("style", "margin: 0 1px;");
                        torrentTranslateI.setAttribute("class", "fa fa-volume-up");
                        torrentTranslateText.textContent = text;
                        torrentTranslate.appendChild(torrentTranslateI);
                        torrentTranslate.appendChild(torrentTranslateText);
                    }
                    else if (translate[0] != 0) {
                        for (var ttt = 0; ttt < translate.length; ttt++) {
                            if (translate[ttt] == 1) {
                                if (torrentXml[i].getAttribute("quality") == 1) {
                                    torrentTranslate.setAttribute("class", "label label-default");
                                }
                                else {
                                    torrentTranslate.setAttribute("class", "label label-success");
                                }
                            }
                            else if (translate[ttt] == 2) {
                                torrentTranslate.setAttribute("class", "label label-info");
                            }
                            else if (translate[ttt] == 3) {
                                torrentTranslate.setAttribute("class", "label label-warning");
                            }
                            else if (translate[ttt] == 4) {
                                torrentTranslate.setAttribute("class", "label label-warning");
                            }
                            else if (translate[ttt] == 5) {
                                torrentTranslate.setAttribute("class", "label label-default");
                            }
                            else if (translate[ttt] == 6) {
                                torrentTranslate.setAttribute("class", "label label-danger");
                            }
                            torrentTranslate.setAttribute("style", "margin: 0 1px;");
                            torrentTranslateI.setAttribute("class", "fa fa-volume-up");
                            torrentTranslateText.textContent = " " + tabs[0]["local"]["torrentTranslate" + translate[ttt]];
                            torrentTranslate.appendChild(torrentTranslateI);
                            torrentTranslate.appendChild(torrentTranslateText);
                        }
                    }

// TYPE ************
                    var torrentType = document.createElement('span');
                    var torrentTypeI = document.createElement('i');
                    var torrentTypeText = document.createElement('span');

                    if (torrentXml[i].getAttribute("type") != 0) {

                        torrentType.setAttribute("class", "label label-default");
                        torrentType.setAttribute("style", "margin: 0 0 0 1px;");
                        torrentTypeI.setAttribute("class", "fa fa-tags");
                        torrentTypeText.textContent = " " + tabs[0]["local"]["torrentType" + torrentXml[i].getAttribute("type")];
                        torrentType.appendChild(torrentTypeI);
                        torrentType.appendChild(torrentTypeText);

                    }

// LIST ************
                    var filterOffList = document.createElement('li');
                    var filterOffDiv1 = document.createElement('div');
                    var filterOffDiv2 = document.createElement('div');
                    var filterOffSpan1 = document.createElement('span');

                    var filterOnList = document.createElement('li');
                    var filterOnDiv1 = document.createElement('div');
                    var filterOnDiv2 = document.createElement('div');
                    var filterOnSpan1 = document.createElement('span');

                    if ((qualityId != 0 && qualityId != 5 && qualityId == torrentXml[i].getAttribute("quality")) || (typeId != 0 && typeId == torrentXml[i].getAttribute("type")) || filterTranslate == true) {
                        if (zebraOn%2) {colorOn = "#F3F3F3";} else {colorOn = "#ffffff";} zebraOn++;

                        filterOnList.setAttribute("class", "list-group-item text-left");
                        filterOnList.setAttribute("style", "background:" + colorOn + "; margin: 0; padding: 5px 2px;");
                        filterOnDiv1.setAttribute("style", "font-size: 10px; color: #959595;");
                        filterOnSpan1.setAttribute("title", torrentXml[i].getAttribute("title"));
                        filterOnSpan1.textContent = torrentTitle;
                        filterOnDiv2.setAttribute("style", "float: right; font-size: 10px;");

                        filterOnDiv2.appendChild(torrentDownload);
                        filterOnDiv2.appendChild(torrentMagnet);
                        filterOnDiv2.appendChild(torrentOnline);
                        filterOnDiv1.appendChild(torrentTrackerLink);
                        filterOnDiv1.appendChild(filterOnSpan1);
                        filterOnDiv1.appendChild(filterOnDiv2);
                        filterOnList.appendChild(filterOnDiv1);
                        filterOnList.appendChild(torrentUp);
                        filterOnList.appendChild(torrentDown);
                        filterOnList.appendChild(torrentSize);
                        filterOnList.appendChild(torrentQuality);
                        filterOnList.appendChild(torrentTranslate);
                        filterOnList.appendChild(torrentType);

                        document.getElementById("contentFilterOn").appendChild(filterOnList);
                    }
                    else {
                        if (zebraOff%2) {colorOff = "#F3F3F3";} else {colorOff = "#ffffff";} zebraOff++;

                        filterOffList.setAttribute("class", "list-group-item text-left");
                        filterOffList.setAttribute("style", "background:" + colorOff + "; margin: 0; padding: 5px 2px;");
                        filterOffDiv1.setAttribute("style", "font-size: 10px; color: #959595;");
                        filterOffSpan1.setAttribute("title", torrentXml[i].getAttribute("title"));
                        filterOffSpan1.textContent = torrentTitle;
                        filterOffDiv2.setAttribute("style", "float: right; font-size: 10px;");

                        filterOffDiv2.appendChild(torrentDownload);
                        filterOffDiv2.appendChild(torrentMagnet);
                        filterOffDiv2.appendChild(torrentOnline);
                        filterOffDiv1.appendChild(torrentTrackerLink);
                        filterOffDiv1.appendChild(filterOffSpan1);
                        filterOffDiv1.appendChild(filterOffDiv2);
                        filterOffList.appendChild(filterOffDiv1);
                        filterOffList.appendChild(torrentUp);
                        filterOffList.appendChild(torrentDown);
                        filterOffList.appendChild(torrentSize);
                        filterOffList.appendChild(torrentQuality);
                        filterOffList.appendChild(torrentTranslate);
                        filterOffList.appendChild(torrentType);

                        document.getElementById("contentFilterOff").appendChild(filterOffList);

                    }

                }

            }

            document.getElementById('information').classList.add('hide');
            document.getElementById('menuNav').classList.remove('hide');
            // Empty ALL
            document.getElementById('menuFilterOn').classList.remove('btn-danger');
            document.getElementById('menuFilterOff').classList.remove('btn-danger');
            document.getElementById('menuOnline').classList.remove('btn-danger');
            document.getElementById('menuFilterOn').classList.remove('disabled');
            document.getElementById('menuFilterOff').classList.remove('disabled');
            document.getElementById('menuOnline').classList.remove('disabled');
            document.getElementById('menuFilterOn').classList.add('btn-success');
            document.getElementById('menuFilterOff').classList.add('btn-success');
            document.getElementById('menuOnline').classList.add('btn-success');
            document.getElementById("contentFilterOn").classList.add('hide');
            document.getElementById("contentFilterOff").classList.add('hide');
            document.getElementById("contentOnline").classList.add('hide');

// *********
            var contentFilterOnDiv1 = document.createElement('div');
            var contentFilterOnDiv2 = document.createElement('div');

            contentFilterOnDiv1.setAttribute("class", "panel panel-success");
            contentFilterOnDiv1.setAttribute("style", "margin: 20px;");
            contentFilterOnDiv2.setAttribute("class", "panel-body text-center");
            contentFilterOnDiv2.textContent = tabs[0]["local"]["alertNotData"];

            contentFilterOnDiv1.appendChild(contentFilterOnDiv2);
// *********
            var contentFilterOffDiv1 = document.createElement('div');
            var contentFilterOffDiv2 = document.createElement('div');

            contentFilterOffDiv1.setAttribute("class", "panel panel-success");
            contentFilterOffDiv1.setAttribute("style", "margin: 20px;");
            contentFilterOffDiv2.setAttribute("class", "panel-body text-center");
            contentFilterOffDiv2.textContent = tabs[0]["local"]["alertNotData"];

            contentFilterOffDiv1.appendChild(contentFilterOffDiv2);
// *********

            if (document.getElementById("contentFilterOff").textContent != "") {
                if (document.getElementById("contentFilterOn").textContent != "") {
                    document.getElementById('menuFilterOff').classList.remove('disabled');
                    document.getElementById('menuFilterOn').classList.add('disabled');
                    document.getElementById('contentFilterOn').classList.remove('hide');
                }
                else {
                    document.getElementById('menuFilterOn').classList.remove('disabled');
                    document.getElementById('menuFilterOn').classList.remove('btn-success');
                    document.getElementById('menuFilterOn').classList.add('btn-danger');
                    document.getElementById('menuFilterOff').classList.add('disabled');
                    document.getElementById('contentFilterOff').classList.remove('hide');
                    document.getElementById("contentFilterOn").appendChild(contentFilterOnDiv1);
                }
            }
            else {
                document.getElementById('menuFilterOn').classList.remove('disabled');
                document.getElementById('menuFilterOn').classList.remove('btn-success');
                document.getElementById('menuFilterOn').classList.add('btn-danger');
                document.getElementById('menuFilterOff').classList.remove('disabled');
                document.getElementById('menuFilterOff').classList.remove('btn-success');
                document.getElementById('menuFilterOff').classList.add('btn-danger');
                document.getElementById('menuOnline').classList.add('disabled');
                document.getElementById('contentOnline').classList.remove('hide');
                document.getElementById("contentFilterOff").appendChild(contentFilterOffDiv1);
                document.getElementById("contentFilterOn").appendChild(contentFilterOnDiv1);
            }

            loadRating();
            online(tabs);
            version(tabs);

        }

    };
    torrent.send("format=xml&title=" + encodeURIComponent(tabs[0].title) + "&url=" + encodeURIComponent(tabs[0].url));

}

// Voting rating
function loadRating() {

    var up   = document.getElementsByClassName("up");
    var down = document.getElementsByClassName("down");

    for(var i_up=0;i_up<up.length;i_up++){

        up[i_up].addEventListener('click', function() {

            var id = this.getAttribute("alt");
            rating("up", id);

        }, false);
    }

    for(var i_down=0;i_down<down.length;i_down++){

        down[i_down].addEventListener('click', function() {

            var id = this.getAttribute("alt");
            rating("down", id);

        }, false);

    }

}

// Send rating
function rating(type, id) {

    var up = (type == "up") ? 1 : 0;
    var down = (type == "down") ? 1 : 0;

    var upIcon = (type == "up") ? 'fa-spinner fa-spin' : 'fa-thumbs-up fa-flip-horizontal';
    var downIcon = (type == "down") ? 'fa-spinner fa-spin' : 'fa-thumbs-down';

    var newUp = up + parseInt(document.getElementById("thumbs-up" + id).textContent);
    var oldUp = document.getElementsByClassName("up" + id);

    var torrentUpSpan = document.createElement('span');
    var torrentUpI = document.createElement('i');
    var torrentUpText = document.createElement('span');

    torrentUpSpan.setAttribute("class", "label label-default");
    torrentUpSpan.setAttribute("style", "margin: 0 1px 0 0;");
    torrentUpI.setAttribute("class", upIcon + " fa text-muted");
    torrentUpText.setAttribute("class", "text-muted");
    torrentUpText.textContent = " " + newUp;
    torrentUpSpan.appendChild(torrentUpI);
    torrentUpSpan.appendChild(torrentUpText);

    for(var span_up = 0; span_up < oldUp.length; span_up++){
        oldUp[span_up].parentNode.insertBefore(torrentUpSpan, oldUp[span_up]);
        oldUp[span_up].parentNode.removeChild(oldUp[span_up]);
    }

    var newDown = down+parseInt(document.getElementById("thumbs-down"+id).textContent);
    var oldDown = document.getElementsByClassName("down"+id);

    var torrentDownSpan = document.createElement('span');
    var torrentDownI = document.createElement('i');
    var torrentDownText = document.createElement('span');

    torrentDownSpan.setAttribute("class", "label label-default");
    torrentDownSpan.setAttribute("style", "margin: 0 1px;");
    torrentDownI.setAttribute("class", downIcon + " fa text-muted");
    torrentDownText.setAttribute("class", "text-muted");
    torrentDownText.textContent = newDown + " ";
    torrentDownSpan.appendChild(torrentDownText);
    torrentDownSpan.appendChild(torrentDownI);

    for(var span_down = 0; span_down < oldDown.length; span_down++){
        oldDown[span_down].parentNode.insertBefore(torrentDownSpan, oldDown[span_down]);
        oldDown[span_down].parentNode.removeChild(oldDown[span_down]);
    }

    var rating = new XMLHttpRequest();
    rating.open("POST", "http://api.qimdb.com/torrent/rating", true);
    rating.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    rating.onreadystatechange = function() {

        if (rating.readyState == 4) {

            torrentUpI.setAttribute("class", "fa fa-thumbs-up fa-flip-horizontal text-muted");

            for(var span_up = 0; span_up < oldUp.length; span_up++){
                oldUp[span_up].parentNode.insertBefore(torrentUpSpan, oldUp[span_up]);
                oldUp[span_up].parentNode.removeChild(oldUp[span_up]);
            }

            torrentDownI.setAttribute("class", "fa fa-thumbs-down text-muted");

            for(var span_down = 0; span_down < oldDown.length; span_down++){
                oldDown[span_down].parentNode.insertBefore(torrentDownSpan, oldDown[span_down]);
                oldDown[span_down].parentNode.removeChild(oldDown[span_down]);
            }

        }

    };
    rating.send("idi=" + id + "&typ=" + type);

}

// New version alert
function version(tabs) {

    var version = new XMLHttpRequest();
    version.open("POST", "http://filmego.org/version", true);
    version.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    version.onreadystatechange = function() {

        if (version.readyState == 4) {

            if ('' + version.responseText != tabs[0].version + '') {

                document.getElementById('ver').classList.remove('hide');

                while(document.getElementById("ver").firstChild){
                    document.getElementById("ver").removeChild(document.getElementById("ver").firstChild);
                }

                var ver = document.createElement('span');
                var verText = document.createElement('span');
                var verSpan = document.createElement('span');
                var verA = document.createElement('a');

                verText.setAttribute("style", "margin: 10px 0 10px 0;");
                verSpan.textContent = tabs[0]["local"]["yeahNewVersion"] + " " + version.responseText + " » ";
                verA.setAttribute("href", "html/iframe.html#filmego.org/update");
                verA.setAttribute("target", "_blank");
                verA.setAttribute("style", "color: #d2d2d2;");
                verA.textContent = tabs[0]["local"]["updateNewVersion"];

                verText.appendChild(verSpan);
                verText.appendChild(verA);
                ver.appendChild(verText);
                document.getElementById("ver").appendChild(ver);

            }

        }

    };
    version.send("browser=firefox");

}

// Load main information
function information() {

    var information = new XMLHttpRequest();
    information.open("POST", "http://filmego.org/information", true);
    information.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    information.overrideMimeType('text/xml');
    information.onreadystatechange = function() {

        if (information.readyState == 4) {

            var xmlDoc = parseXml(information.responseText);

            var info = xmlDoc.querySelectorAll('information');

            while(document.getElementById("information").firstChild){
                document.getElementById("information").removeChild(document.getElementById("information").firstChild);
            }

            document.getElementById('information').classList.remove('hide');

            var informationDiv1 = document.createElement('div');
            var informationDiv2 = document.createElement('div');
            var informationDiv3 = document.createElement('div');
            var informationImg = document.createElement('img');

            informationDiv1.setAttribute("class", "panel panel-success");
            informationDiv1.setAttribute("style", "margin: 20px;");
            informationDiv2.setAttribute("class", "panel-body text-justify");
            informationDiv2.textContent = info[0].getAttribute("text");
            informationDiv3.setAttribute("class", "text-center");
            informationImg.setAttribute("src", "img/gif2.gif");
            informationImg.setAttribute("style", "width: 235px; margin-bottom: 20px;");
            informationImg.setAttribute("class", "img-thumbnail");

            informationDiv1.appendChild(informationDiv2);
            informationDiv3.appendChild(informationImg);
            informationDiv1.appendChild(informationDiv3);

            document.getElementById("information").appendChild(informationDiv1);

        }

    };
    information.send();

}