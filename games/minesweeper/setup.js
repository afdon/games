
let board = [];
let mineIndices = [];

export let settings = {
    mines: 30,
    rows: 16,
    cols: 30,
};

// export const cellSize = `calc(100vmin / ${Math.max(SETTINGS.numRows, SETTINGS.numCols)})`;
export const cellSize = `${90 / (Math.max(settings.rows, settings.cols))})vmin`;


export const changeSettings = (m, r, c) => {
    return settings;
};

export const reinit = (m, r, c) => {
    changeSettings(m, r, c)
    board = initialize()
    display = getDisplayValues(b)
    return display;
}


// export const start = {
//   initialize: initialize,
//   createBoard: createBoard,
//   generateMineIndices: generateMineIndices,
//   fillMines: fillMines,
// }

export const createBoard = (rows, cols) => {
    for (let i = 0; i < rows * cols; i++) {
        board.push(0);
    }
    return board;
};

const cellIndex = (rowIndex, colIndex, rows, cols) => {
    if (rowIndex < 0 || rowIndex >= rows || colIndex < 0 || colIndex >= cols) {
        return null;
    }
    const cellIdx = rowIndex * cols + colIndex;
    return cellIdx;
};

export const getRandomIndex = (totalCells) => {
    const index = Math.floor(Math.random() * totalCells);
    return index;
};

export const generateMineIndices = (numberOfMines, rows, cols) => {
    let totalCells = rows * cols;

    while (mineIndices.length < numberOfMines) {
        let mineIdx;
        mineIdx = getRandomIndex(totalCells);

        if (!mineIndices.includes(mineIdx)) {
            mineIndices.push(mineIdx);
        }
    }

    return mineIndices;
};

export const fillMines = (mineIndices, board) => {
    for (let i = 0; i < mineIndices.length; i++) {
        let mineIdx = mineIndices[i];
        board[mineIdx] = 10;

        incrementNeighbors(mineIdx, settings.rows, settings.cols);
    }
    return board;
};

export const incrementNeighbors = (mineIdx, rows, cols) => {
    let neighbors = getNeighborsIdx(mineIdx, rows, cols);
    // console.log("neighbors", neighbors);
    for (let i = 0; i < neighbors.length; i++) {
        let idx = neighbors[i];
        if (typeof board[idx] === "number") {
            board[idx]++;
        }
    }
};

export const getNeighborsIdx = (index, rows, cols) => {
    const rowIdx = Math.floor(index / cols);
    const colIdx = index % cols;
    let north = cellIndex(rowIdx - 1, colIdx, rows, cols);
    let east = cellIndex(rowIdx, colIdx + 1, rows, cols);
    let south = cellIndex(rowIdx + 1, colIdx, rows, cols);
    let west = cellIndex(rowIdx, colIdx - 1, rows, cols);
    let northeast = cellIndex(rowIdx - 1, colIdx + 1, rows, cols);
    let northwest = cellIndex(rowIdx - 1, colIdx - 1, rows, cols);
    let southeast = cellIndex(rowIdx + 1, colIdx + 1, rows, cols);
    let southwest = cellIndex(rowIdx + 1, colIdx - 1, rows, cols);

    const neighbors = {
        north: north,
        east: east,
        south: south,
        west: west,
        northeast: northeast,
        northwest: northwest,
        southeast: southeast,
        southwest: southwest,
    };
    //   return neighbors;
    return Object.values(neighbors);
};

export const initialize = (s) => {
    let board = createBoard(s.rows, s.cols);
    let mineIndices = generateMineIndices(
        s.mines,
        s.rows,
        s.cols
    );
    board = fillMines(mineIndices, board);
    return board;
};

export const getDisplayValues = (array) => {
    return array.map((element) => {
        if (element === 0) { return "" } // blanks
        if (element >= 10) { return "💣" } // 💣 🍘
        if (element > 0 && element < 10) { return element } // adjacents
        // if (element < 0) { return "" } // hidden
        return element; // return the element as is if none of the conditions match
    });
}

export const findConnectedCellsToReveal = (index, board) => {
    let queue = [index];
    let visited = [];
    let cellsToReveal = [];

    let counter = 0;

    while (queue.length > 0 && counter < settings.rows * settings.cols) {
        counter++;
        let curCell = queue.shift();

        if (board[curCell] === 0) {
            let neighbors = getNeighborsIdx(curCell, settings.rows, settings.cols).slice(0, 4);
            neighbors.forEach(n => {
                cellsToReveal.push(n);

                if (n !== null && !visited.includes(n) && board[n] === 0) {
                    visited.push(n);
                    queue.push(n);
                }
            })
        }
    }

    return cellsToReveal;
}
