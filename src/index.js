module.exports = function solveSudoku(matrix) {
    const sudoku = matrix;

    if (solve()) {
        return sudoku;
    }

    //check if a possible number is already in a row
    function isInRow(row, number) {
        for (let i = 0; i < sudoku.length; i++) {
            if (sudoku[row][i] == number) {
                return true;
            }
        }
        return false;
    }

    //check if possible number is already in a column
    function isInCol(col, number) {
        for (let i = 0; i < sudoku.length; i++) {
            if (sudoku[i][col] == number) {
                return true;
            }
        }
        return false;
    }

    //check if possible number is in its 3x3 box
    function isInBox(row, col, number) {
        let r = row - row % 3;
        let c = col - col % 3;

        for (let i = r; i < r + 3; i++) {
            for (let j = c; j < c + 3; j++) {
                if (sudoku[i][j] == number) {
                    return true;
                }
            }
        }
        return false;
    }


    function isValid(row, col, number) {
        return !isInRow(row, number) && !isInCol(col, number) && !isInBox(row, col, number);
    }


    //solve function
    function solve() {
        for (let row = 0; row < sudoku.length; row++) {
            for (let col = 0; col < sudoku.length; col++) {
                //search for an empty cell
                if (sudoku[row][col] == 0) {
                    for (let number = 1; number <= sudoku.length; number++) {
                        if (isValid(row, col, number)) {
                            sudoku[row][col] = number;

                            if (solve()) {
                                return true;
                            } else {
                                sudoku[row][col] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
}