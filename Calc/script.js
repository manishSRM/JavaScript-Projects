var button = document.getElementsByTagName("button");
if (button) {
    for (var i = 0; i < button.length; i++) {
        var lastTime = false;
        button[i].addEventListener("click", function(event) {
            var thisEvent = event.target.innerHTML;
            if (thisEvent != '=') {
                if (lastTime) {
                    lastTime = false;
                    document.getElementById('result').value = "";
                }
                document.getElementById('result').value += thisEvent;
            } else {
                lastTime = true;
                document.getElementById('result').value = eval(document.getElementById('result').value);
            }
        });
    }
}
