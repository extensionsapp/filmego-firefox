var self          = require("sdk/self");
var ss            = require("sdk/simple-storage");
var tabs          = require('sdk/tabs');
var _             = require("sdk/l10n").get;

var button = require('sdk/ui/button/toggle').ToggleButton({
    id: "FILMEGO",
    label: "FILMEGO",
    icon: {
        "16": "./icons/logo16.png",
        "32": "./icons/logo32.png",
        "64": "./icons/logo64.png"
    },
    onChange: handleChange
});

var panel = require("sdk/panel").Panel({
    width: 400,
    height: 350,
    contentURL: self.data.url("popup.html"),
    contentScriptFile: [
        self.data.url("popup.js"),
        self.data.url("./js/jquery.min.js"),
        self.data.url("./js/bootstrap.min.js")
    ],
    contentScriptWhen: "end",
    onHide: handleHide,
    onShow: handleShow
});

function handleChange(state) {
    if (state.checked) {
        panel.show({
            position: button
        });
    }
}

function handleHide() {
    button.state('window', {checked: false});
}

function handleShow() {

    ss.storage.quality = (!ss.storage.quality) ? undefined : ss.storage.quality;
    ss.storage.translate = (!ss.storage.translate) ? undefined : ss.storage.translate;
    ss.storage.type = (!ss.storage.type) ? undefined : ss.storage.type;

    var local = {
        idealTranslate: "idealTranslate",
        profTranslate: "profTranslate",
        authorTranslate: "authorTranslate",
        amateurTranslate: "amateurTranslate",
        subTranslate: "subTranslate",
        allTranslate: "allTranslate",
        torrentTranslate1: "torrentTranslate1",
        torrentTranslate2: "torrentTranslate2",
        torrentTranslate3: "torrentTranslate3",
        torrentTranslate4: "torrentTranslate4",
        torrentTranslate5: "torrentTranslate5",
        torrentTranslate6: "torrentTranslate6",
        idealQuality: "idealQuality",
        goodQuality: "goodQuality",
        badQuality: "badQuality",
        kpkQuality: "kpkQuality",
        allQuality: "allQuality",
        torrentQuality1: "torrentQuality1",
        torrentQuality2: "torrentQuality2",
        torrentQuality3: "torrentQuality3",
        torrentQuality4: "torrentQuality4",
        extendedType: "extendedType",
        theatricalType: "theatricalType",
        directedType: "directedType",
        alternativeType: "alternativeType",
        allType: "allType",
        torrentType1: "torrentType1",
        torrentType2: "torrentType2",
        torrentType3: "torrentType3",
        torrentType4: "torrentType4",
        torrentType5: "torrentType5",
        lineHelp: "onlineHelp",
        downloadHelp: "downloadHelp",
        magnetHelp: "magnetHelp",
        updownHelp: "updownHelp",
        linkHelp: "linkHelp",
        alertNotData: "alertNotData",
        alertSave: "alertSave",
        alertSaveMenu: "alertSaveMenu",
        download: "download",
        line: "online",
        yeahNewVersion: "yeahNewVersion",
        updateNewVersion: "updateNewVersion"
    };

    for (var k in local) {
        if (local.hasOwnProperty(k)) {
            local[k] = _(local[k]);
        }
    }

    panel.port.emit("bootstrap", {
        quality: ss.storage.quality,
        translate: ss.storage.translate,
        type: ss.storage.type,
        url: tabs.activeTab.url,
        title: tabs.activeTab.title,
        id: tabs.activeTab.id.replace(/\D/g, '') + tabs.activeTab.index,
        local: local,
        version: self.version
    });

    panel.port.on("quality", function(filter) {
        if (filter != "") {
            ss.storage.quality = filter;
        }
    });
    panel.port.on("translate", function(filter) {
        if (filter != "") {
            ss.storage.translate = filter;
        }
    });
    panel.port.on("type", function(filter) {
        if (filter != "") {
            ss.storage.type = filter;
        }
    });

}