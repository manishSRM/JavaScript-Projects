var X = 700;
var Y = 700;
var score = 0;
var x, y;
var canvas;
var context;

function init() {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");
    setInterval(draw, 2000);
}

function giveNewCentre() {
    x = Math.floor(Math.random() * X) + 0
    y = Math.floor(Math.random() * Y) + 0
}

function draw() {
    context.clearRect(0, 0, X, Y);
    context.beginPath();
    giveNewCentre();
    while (x-20 < 0 || y-20 < 0 || x+20 > X || y+20 > Y)
        giveNewCentre();
    context.arc(x, y, 20, 0, 2*Math.PI);
    context.closePath();
    context.fillStyle = "blue";
    context.fill();
    context.stroke();
}

document.addEventListener("mousedown", function(event) {
    var x_coor = event.clientX;
    var y_coor = event.clientY;
    if (Math.sqrt((x-x_coor)*(x-x_coor) + (y-y_coor)*(y-y_coor)) < 20.0)
        score += 1;
    console.log("Your Score is "+score);
    context.clearRect(0, 0, X, Y);
});
