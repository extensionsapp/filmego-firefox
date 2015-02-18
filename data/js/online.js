document.addEventListener('DOMContentLoaded', function() {
    if(window.location.hash) {
        var width = (parseInt(document.getElementById("online").offsetWidth)-5 <= 400) ? 400 : parseInt(document.getElementById("online").offsetWidth)-5;
        var height = parseInt(document.getElementById("online").offsetHeight)-14;
        var data = window.location.hash.substring(1).split("///");
        document.title = decodeURIComponent(data[1]);
        if (data[2] == "online") {
            var url = data[0].split("?");
            if (url[1] === undefined) {url[1] = "";}

            var iframe = document.createElement('iframe');
            iframe.setAttribute("src", "http://"+url[0]+"?"+url[1]+"&h="+height+"&w="+width);
            iframe.setAttribute("width", "100%");
            iframe.setAttribute("height", "100%");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allowfullscreen", "true");

            document.getElementById("online").appendChild(iframe);
        }
        else if (data[2] == "acestream") {
            width = width-9;

            var embed = document.createElement('embed');
            embed.setAttribute("id", "plugin");
            embed.setAttribute("type", "application/x-acestream-plugin");
            embed.setAttribute("width", "" + width + "");
            embed.setAttribute("height", "" + height + "");
            embed.setAttribute("nofscontrolsenable", "true");

            document.getElementById("online").appendChild(embed);

            var plugin = document.getElementById("plugin");

            if(plugin.playlistLoadAsync) {
                plugin.playlistLoadAsync("http://"+data[0], 0, 0, 0);
            }
            else {
                var div = document.createElement('div');
                var a = document.createElement('a');
                var img = document.createElement('img');
                div.setAttribute("style", "color: #FFFFFF; text-align: center; margin: 10px; font-family: Verdana, Arial, Helvetica, sans-serif;");
                a.setAttribute("href", "http://dl.acestream.org/products/acestream-full/win/latest");
                a.setAttribute("target", "_blank");
                img.setAttribute("src", "../img/tutorial.png");

                a.appendChild(img);
                div.appendChild(a);
                document.getElementById("online").textContent = "";
                document.getElementById("online").appendChild(div);
            }
        }
    } else {
        var h1 = document.createElement('h1');
        h1.setAttribute("style", "color: #c5c5c5; margin: 20px;");
        h1.textContent = "KuHa HE 6yDeT!";

        document.getElementById("online").appendChild(h1);
    }
});