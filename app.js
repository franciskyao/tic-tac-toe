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
    gridMethods.grid[row][column] = mark;
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
// gridMethods.displayGridOnConsole();

//########## View ##########
/*
display grid
display X O
display refresh button
*/

var displayGrid = function() {
  var grid = document.createElement('table');
  var message = document.createElement('div');

  grid.setAttribute('id', 'grid');
  message.setAttribute('id', 'message');

  document.body.appendChild(grid);
  document.body.appendChild(message);

  for (var row = 0; row < 3; row++) {
    var tableRow = document.createElement('tr')
    tableRow.setAttribute('id', `R${row}`)
    document.getElementById('grid').appendChild(tableRow);
    for (var column = 0; column < 3; column++) {
      var rowColumn = `${row}-${column}`
      var mark = gridMethods.getMarkOn(rowColumn);
      var columnElement = document.createElement('th');

      columnElement.setAttribute('id', `${rowColumn}`);
      columnElement.innerHTML = `${mark}`
      tableRow.appendChild(columnElement);
    }

    tableRow.appendChild(columnElement);
    // document.getElementb=ById(`R${row}`).appendChild(tableRow)
  }
}

displayGrid();

//####### Controller #######
/*
Handles X and O input
Handles refresh page button input

*/