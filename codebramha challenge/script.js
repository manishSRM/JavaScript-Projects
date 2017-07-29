var col = prompt("Please enter board width");
var row = prompt("Please enter board height");
var myGrid = makeGrid(row, col);
var max = (row*col) / 3;
var min = 4;
var villains = Math.floor(Math.random() * (max - min + 1)) + min;
// E = Empty V = Villian H = Hero
var statusGrid = generateStatusGrid(row, col);
var villianCellList = locateVilliansInGrid(villains, row, col, statusGrid, myGrid);
var heroLocation = locateOurHeroInGrid(statusGrid, myGrid, row, col);
// setInterval(tryToMove(heroLocation), 1000);

function tryToMove(heroLocation) {
    var destination = [heroLocation[0]-1, heroLocation[1]-1];
    var thisCanvas = document.getElementById(heroLocation[0].toString() + heroLocation[1].toString());
    var thisContext = thisCanvas.getContext('2d');
    var x = thisCanvas.width;
    var y = thisCanvas.height;
    thisContext.clearRect(0, 0, x, y);
    thisContext.beginPath();
    thisContext.arc(21, 8, 7, 0, 2*Math.PI);
    thisContext.fillStyle = "blue";
    thisContext.fill();
    thisContext.stroke();

}

function isThisCellEmpty(newCell, statusGrid) {
    return statusGrid[newCell[0]][newCell[1]] == 'E' ? true : false;
}

function generateNewCell(row, col) {
    var cell_X = Math.floor(Math.random() * (row));
    var cell_Y = Math.floor(Math.random() * (col));
    if (cell_X < 0 || cell_Y < 0)
        return generateNewCell(row, col)
    return [cell_X, cell_Y];
}

function locateInthisCell(cell, statusGrid, myGrid, character) {
    statusGrid[cell[0]][cell[1]] = character == "H" ? "H" : "V";
    var trs = myGrid.getElementsByTagName('tr');
    var tds = trs[cell[0]].getElementsByTagName('td');
    var thisCanvas = document.createElement("canvas");
    thisCanvas.id = cell[0].toString() + cell[1].toString();
    thisCanvas.width = 41;
    thisCanvas.height = 17;
    var thisContext = thisCanvas.getContext('2d');
    thisContext.beginPath();
    thisContext.arc(21, 8, 7, 0, 2*Math.PI);
    thisContext.fillStyle = (character == "H") ? "blue" : "red";
    thisContext.fill();
    thisContext.stroke();
    tds[cell[1]].appendChild(thisCanvas);
}

function locateVilliansInGrid(villains, row, col, statusGrid, myGrid) {
    var villianCellList = [];
    for (var i = 0; i < villains; i++) {
        var cellForVillian = generateNewCell(row, col);
        cellForVillian[0] = parseInt(cellForVillian[0]);
        cellForVillian[1] = parseInt(cellForVillian[1]);
        while (!isThisCellEmpty(cellForVillian, statusGrid)) {
            cellForVillian = generateNewCell(row, col);
            cellForVillian[0] = parseInt(cellForVillian[0]);
            cellForVillian[1] = parseInt(cellForVillian[1]);
        }
        villianCellList.push(cellForVillian);
        locateInthisCell(cellForVillian, statusGrid, myGrid, "V");
    }
    return villianCellList;
}

function locateOurHeroInGrid(statusGrid, myGrid, row, col) {
    var cellForHero = undefined;
    while (true) {
        cellForHero = generateNewCell(row, col);
        cellForHero[0] = parseInt(cellForHero[0]);
        cellForHero[1] = parseInt(cellForHero[1]);
        if (isThisCellEmpty(cellForHero, statusGrid))
            break;
    }
    locateInthisCell(cellForHero, statusGrid, myGrid, "H");
    return cellForHero;
}

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
