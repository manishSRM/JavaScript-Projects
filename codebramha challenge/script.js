var col = prompt("Please enter board width");
var row = prompt("Please enter board height");
var myGrid = makeGrid(row, col);
var max = (row*col) / 3;
var min = 4;
var villains = Math.floor(Math.random() * (max - min + 1)) + min;
// E = empty V = Villian H = Hero
var statusGrid = generateStatusGrid(row, col);
locateVilliansInGrid(villains, row, col, statusGrid, myGrid);

function isThisCellEmpty(cellForVillian, statusGrid) {
    return statusGrid[cellForVillian[0]][cellForVillian[1]] == 'E' ? true : false;
}

function generateNewCellForVillian(row, col) {
    var cell_X = Math.floor(Math.random() * (row));
    var cell_Y = Math.floor(Math.random() * (col));
    if (cell_X < 0 || cell_Y < 0)
        return generateNewCellForVillian(row, col)
    return [cell_X, cell_Y];
}

function locateInthisCell(cellForVillian, statusGrid, myGrid) {
    statusGrid[cellForVillian[0]][cellForVillian[1]] = "V";
    var trs = myGrid.getElementsByTagName('tr');
    var tds = trs[cellForVillian[0]].getElementsByTagName('td');
    var thisCanvas = document.createElement("canvas");
    thisCanvas.width = 41;
    thisCanvas.height = 17;
    var thisContext = thisCanvas.getContext('2d');
    thisContext.beginPath();
    thisContext.arc(21, 8, 7, 0, 2*Math.PI);
    thisContext.fillStyle = "red";
    thisContext.fill();
    thisContext.stroke();
    tds[cellForVillian[1]].appendChild(thisCanvas);
}

function locateVilliansInGrid(villains, row, col, statusGrid, myGrid) {
    for (var i = 0; i < villains; i++) {
        var cellForVillian = generateNewCellForVillian(row, col);
        cellForVillian[0] = parseInt(cellForVillian[0]);
        cellForVillian[1] = parseInt(cellForVillian[1]);
        while (!isThisCellEmpty(cellForVillian, statusGrid)) {
            cellForVillian = generateNewCellForVillian(row, col);
            cellForVillian[0] = parseInt(cellForVillian[0]);
            cellForVillian[1] = parseInt(cellForVillian[1]);
        }
        locateInthisCell(cellForVillian, statusGrid, myGrid);
    }
}

// var trs = myGrid.getElementsByTagName('tr');
// for (var i = 0; i < trs.length; i++) {
//     var tds = trs[i].getElementsByTagName("td");
//     for (var j = 0; j < tds.length; j++) {
//         var thisCanvas = document.createElement("canvas");
//         thisCanvas.width = 41;
//         thisCanvas.height = 17;
//         var thisContext = thisCanvas.getContext('2d');
//         thisContext.beginPath();
//         thisContext.arc(21, 8, 7, 0, 2*Math.PI);
//         thisContext.fillStyle = "red";
//         thisContext.fill();
//         thisContext.stroke();
//         tds[j].appendChild(thisCanvas);
//         // console.log(tds[j]);
//     }
// }

function makeGrid(row, col) {
    var grid = document.createElement("table");
    grid.className = "grid";
    for (var i = 0; i < row; i++) {
        var tr = grid.appendChild(document.createElement("tr"));
        for (var j = 0; j < col; j++) {
            var cell = tr.appendChild(document.createElement("td"));
        }
    }
    document.body.appendChild(grid);
    return grid;
}

function generateStatusGrid(row, col) {
    var statusGrid = new Array(row);
    for (var i = 0; i < row; i++) {
        statusGrid[i] = new Array(2);
        for (var j = 0; j < col; j++)
            statusGrid[i][j] = 'E';
    }
    return statusGrid;
}
