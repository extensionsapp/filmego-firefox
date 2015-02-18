document.addEventListener('DOMContentLoaded', function() {
    if(window.location.hash) {
        var height = window.innerHeight-110;
        var width = window.innerWidth-110;
        document.getElementById("iframe").setAttribute("src", "http://" + window.location.hash.substring(1));
        document.getElementById("iframe").setAttribute("height", height);
        document.getElementById("iframe").setAttribute("width", width);
    }
});