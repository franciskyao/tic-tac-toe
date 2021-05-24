console.log('app.js loaded!')


/*
##########################
######### Model ##########
##########################
*/

/*
Store data in 3 x 3 grid
R0-C0 || R0-C1 || R0-C2
R1-C0 || R1-C1 || R1-C2
R2-C0 || R2-C1 || R2-C2
*/

var gridMethods = {
  grid: [],

  getGrid: function () {
    return gridMethods.grid;
  },

  createEmptyGrid: function () {
    for (var row = 0; row < 3; row++) {
      var rows = [];
      for (var column = 0; column < 3; column++) {
        var rowColumnName = `${row}-${column}`;
        rows.push({name: rowColumnName, mark: null});
      }
      gridMethods.grid.push(rows);
    }
  },

  removeAllMarks: function () {
    for (var row = 0; row < 3; row++) {
      for (var column = 0; column < 3; column++) {
        gridMethods.grid[row][column].mark = null;
      }
    }
  },

  displayGridOnConsole: function() {
    for (var row = 0; row < 3; row++) {
      for (var column = 0; column < 3; column++) {
        console.log(`|| RC:${row}${column} ${gridMethods.grid[row][column].mark} ||`);
      }
      console.log('\n');
    }
  },

  changeMarkOn: function(rowColumn, mark) {
    rowColumn = rowColumn.split('-');
    var row = parseInt(rowColumn[0]);
    var column = parseInt(rowColumn[1]);
    gridMethods.grid[row][column].mark = mark;
  },

  getMarkOn: function(rowColumn) {
    rowColumn = rowColumn.split('-');
    var row = parseInt(rowColumn[0]);
    var column = parseInt(rowColumn[1]);
    return gridMethods.grid[row][column].mark;
  },

  getRowColumnInfo: function (rowColumn){
    rowColumn = rowColumn.split('-');
    var row = parseInt(rowColumn[0]);
    var column = parseInt(rowColumn[1]);
    return gridMethods.grid[row][column];
  }

};

var xTurn = true;

gridMethods.createEmptyGrid();

/*
##########################
########## View ##########
##########################
*/

var grid = document.createElement('table');
var message = document.createElement('div');

var displayGrid = function() {
  for (var row = 0; row < 3; row++) {
    var tableRow = document.createElement('tr');

    tableRow.setAttribute('id', `R${row}`);
    document.getElementById('grid').appendChild(tableRow);

    for (var column = 0; column < 3; column++) {
      var rowColumn = `${row}-${column}`;
      var mark = gridMethods.getMarkOn(rowColumn);
      var columnElement = document.createElement('th');

      columnElement.setAttribute('id', `${rowColumn}`);
      columnElement.innerHTML = `${mark}`;
      tableRow.appendChild(columnElement);
    }

    tableRow.appendChild(columnElement);
  }
}

var displayMessage = {
  clearMessage: function() {
    document.getElementById('message').innerHTML = '';
  },

  winner: function(player) {
    var winnerMessage = document.create('p');
    winnerMessage.innerHTML = `The winner is ${player} player!!!`;
    message.appendChild(winnerMessage);
  },

  illegalMove: function (player) {
    var illegalMessage = document.createElement('p');
    illegalMessage.innerHTML = `Player ${player} Committed an illegal move. Please try again.`;
    message.appendChild(illegalMessage);
  },
  yourTurn: function (player) {
    var yourTurnMessage = document.createElement('p');
    yourTurnMessage.innerHTML = `It is ${player}'s Turn `;
    message.appendChild(yourTurnMessage);

  }

};

var changeDisplayedMarkOn = function(rowColumn) {
  var mark = gridMethods.getMarkOn(rowColumn);
  document.getElementById(rowColumn).innerHTML = `${mark}`;
}

grid.setAttribute('id', 'grid');
message.setAttribute('id', 'message');
document.body.appendChild(grid);
document.body.appendChild(message)
displayGrid();

/*
##########################
####### Controller #######
##########################
*/
//on click,
//change data on grid
//re render new data

var isMoveValid = function (rowColumn) {
  return !gridMethods.getMarkOn(rowColumn);
}

var nextTurn = function() {
  if (!xTurn) {
    return 'O';
  } else {
    return 'X';
  }
}

document.getElementById('grid').onclick = function(event) {
  var rowColumn = event.target.id;
  var mark = null;

  if (xTurn) {
    mark = 'X';
  } else {
    mark = 'O';
  }

  if (isMoveValid(rowColumn)) {
    gridMethods.changeMarkOn(rowColumn, mark);
    changeDisplayedMarkOn(rowColumn);
    displayMessage.clearMessage();
    xTurn = !xTurn;
    displayMessage.yourTurn(nextTurn());
  } else {
    displayMessage.clearMessage();
    displayMessage.illegalMove(mark);
  }
}

// Handles X and O input
// Handles refresh page button input
