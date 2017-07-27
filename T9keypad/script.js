var button = document.getElementsByTagName("button");
if (button) {
    for (var i = 0; i < button.length; i++) {
        var itPrints = false;
        var count = {val : -1};
        button[i].addEventListener("mouseup", function(event) {
            clearTimeout(pressTime);
            var buttonVal = this.getAttribute("data-value");
            var valids;
            if (buttonVal == "*" || buttonVal == "0" || buttonVal == "#") {
                valids = undefined;
                updateResult1(buttonVal);
            } else {
                valids = this.getElementsByTagName("span")[0].textContent;
            }
            if (valids != undefined) {
                temp = window.setTimeout(function() {
                    if (itPrints == false) {
                        updateResult2(valids, count);
                    }
                }, 500);
            }
        });
        button[i].addEventListener("mousedown", function(event) {
            count.val = -1;
            itPrints = false;
            var buttonVal = this.getAttribute("data-value");
            pressTime = window.setTimeout(function() {
                itPrints = true;
                updateResult1(buttonVal);
            }, 1000);
        });
    }
}

function updateResult1(buttonVal) {
    document.getElementById('result').value += buttonVal
}

function updateResult2(valids, count) {
    if (count.val == -1) {
        count.val = count.val + 1;
        document.getElementById('result').value += valids.split(" ")[count.val];
    } else {
        count.val = (count.val + 1) % (valids.length);
        var temp = document.getElementById('result').value;
        temp = temp.substr(0, temp.length - 1);
        document.getElementById('result').value = temp + valids.split(" ")[count.val];
    }
}
