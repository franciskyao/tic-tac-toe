console.log('app.js loaded!');

/*
##########################
######### Model ##########
##########################
*/

var playerMethods = {
  X: {name: 'Ecks', win: 0},
  O: {name: 'Oh', win: 0},

  getName: function(xo) {
    return playerMethods[xo].name;
  },

  getWins: function(xo) {
    return playerMethods[xo].win;
  },

  changeName: function(xo, newName) {
    player[xo].name = name;
  },

  addWin: function(xo) {
    player[xo].win++;
  }
};

var gridMethods = {
  grid: [],

  getGrid: function() {
    return gridMethods.grid;
  },

  createEmptyGrid: function() {
    for (var row = 0; row < 3; row++) {
      var rows = [];
      for (var column = 0; column < 3; column++) {
        var rowColumnName = `${row}-${column}`;
        rows.push({name: rowColumnName, mark: null});
      }
      gridMethods.grid.push(rows);
    }
  },

  removeAllMarks: function() {
    for (var row = 0; row < 3; row++) {
      for (var column = 0; column < 3; column++) {
        gridMethods.grid[row][column].mark = 'null';
      }
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

  didRowMatch: function(rowColumn) {
    var mark = gridMethods.getMarkOn(rowColumn);
    rowColumn = rowColumn.split('-');
    var row = parseInt(rowColumn[0]);
    for (var column = 0; column < 3; column++) {
      if (gridMethods.grid[row][column].mark !== mark) {
        return false;
      }
    }
    return true;
  },

  didColumnMatch: function(rowColumn) {
    var mark = gridMethods.getMarkOn(rowColumn);
    rowColumn = rowColumn.split('-');
    var column = parseInt(rowColumn[1]);
    for (var row = 0; row < 3; row++) {
      if (gridMethods.grid[row][column].mark !== mark) {
        return false;
      }
    }
    return true;
  },

  didMinorDiagMatch: function(rowColumn) {
    var mark = gridMethods.getMarkOn(rowColumn);
    var column = 0;
    for (var row = 2; row >= 0; row--) {
      if (gridMethods.grid[row][column].mark !== mark) {
        return false;
      }
      column++;
    }
    return true
  },

  didMajorDiagMatch: function(rowColumn) {
    var mark = gridMethods.getMarkOn(rowColumn);
    var column = 0;
    for (var row = 0; row < 3; row++) {
      if (gridMethods.grid[row][column].mark !== mark) {
        return false;
      }
      column++;
    }
    return true

  },

  didAnyDirMatch: function(rowColumn) {
    if (gridMethods.didRowMatch(rowColumn) ||
    gridMethods.didColumnMatch(rowColumn) ||
    gridMethods.didMinorDiagMatch(rowColumn) ||
    gridMethods.didMajorDiagMatch(rowColumn)) {
      return true;
    } else {
      false;
    }
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
var tally = document.createElement('div');

var displayGrid = function() {
  for (var row = 0; row < 3; row++) {
    var tableRow = document.createElement('tr');

    tableRow.setAttribute('id', `R${row}`);
    document.getElementById('grid').appendChild(tableRow);

    for (var column = 0; column < 3; column++) {
      var rowColumn = `${row}-${column}`;
      var mark = gridMethods.getMarkOn(rowColumn);
      if (mark === null) {
        mark = '-';
      }
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
    var winnerMessage = document.createElement('p');
    var name = playerMethods.getName(player);
    winnerMessage.innerHTML = `The winner is ${name} player!!!`;
    message.appendChild(winnerMessage);
  },

  illegalMove: function(player) {
    var illegalMessage = document.createElement('p');
    var name = playerMethods.getName(player);
    illegalMessage.innerHTML = `Player ${name} Committed an illegal move. Please try again.`;
    message.appendChild(illegalMessage);
  },

  yourTurn: function(player) {
    var yourTurnMessage = document.createElement('p');
    var name = playerMethods.getName(player);
    yourTurnMessage.innerHTML = `It is ${name}'s Turn `;
    message.appendChild(yourTurnMessage);
  }
};

var changeDisplayedMarkOn = function(rowColumn) {
  var mark = gridMethods.getMarkOn(rowColumn);
  document.getElementById(rowColumn).innerHTML = `${mark}`;
}

var displayDefaultName = function() {
  var playerXElement = document.createElement('p');
  var playerOElement = document.createElement('p');
  var nameX = playerMethods.getName('X');
  var winX = playerMethods.getWins('X')
  var nameO = playerMethods.getName('O');
  var winO = playerMethods.getWins('O')
  console.log(nameX)
  playerXElement.setAttribute('id', 'X');
  playerOElement.setAttribute('id', 'O');
  playerXElement.innerHTML = `${nameX}: ${winX}`;
  playerOElement.innerHTML = `${nameO}: ${winO}`;
  tally.appendChild(playerXElement);
  tally.appendChild(playerOElement);
}

var updateDisplayTally = function(xo) {

};

var updateDisplayName = function(xo) {

};

tally.setAttribute('id', 'tally');
grid.setAttribute('id', 'grid');
message.setAttribute('id', 'message');
document.body.appendChild(tally);
document.body.appendChild(grid);
document.body.appendChild(message)
displayGrid();
displayDefaultName();

/*
##########################
####### Controller #######
##########################
*/

var isMoveValid = function (rowColumn) {
  return !gridMethods.getMarkOn(rowColumn);
}

var whosTurn = function(boolean) {
  if (boolean) {
    return 'X';
  } else {
    return 'O';
  }
}

document.getElementById('grid').onclick = function(event) {
  var rowColumn = event.target.id;
  var mark = whosTurn(xTurn);
  displayMessage.clearMessage();

  if (isMoveValid(rowColumn)) {
    gridMethods.changeMarkOn(rowColumn, mark);
    changeDisplayedMarkOn(rowColumn);
    if (gridMethods.didAnyDirMatch(rowColumn)) {
      displayMessage.winner(mark);
    } else {
      xTurn = !xTurn;
      displayMessage.yourTurn(whosTurn(xTurn));
    }
  } else {
    displayMessage.illegalMove(mark);
  }
}

// Handles X and O input
// Handles refresh page button input
