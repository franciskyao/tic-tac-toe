console.log('app.js loaded!')


  //######### Model #########

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
  }

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
    gridMethods.grid[row][column] = mark;
  },

  getRowColumnInfo = function (rowColumn)
  rowColumn = rowColumn.split('-');
  var row = parseInt(rowColumn[0]);
  var column = parseInt(rowColumn[1]);
  return gridMethods.grid[row][column];
};

var xTurn = true;

gridMethods.createEmptyGrid();
gridMethods.displayGridOnConsole();

//########## View ##########
/*
display grid
display X O
display refresh button
*/

//####### Controller #######
/*
Handles X and O input
Handles refresh page button input

*/