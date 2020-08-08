import { shuffle } from 'lodash';
import { BoardCell } from '../models/board-cell.model';
import { Board } from '../models/board.model';

export function createBoard(size: number, bombsAmount: number): Board {
  const cells: BoardCell[] = shuffle([
    ...Array(size ** 2 - bombsAmount).fill({ checked: false, flagged: false }),
    ...Array(bombsAmount).fill({ checked: false, falgged: false, isBomb: true }),
  ]);

  const cellsWithBombsAround = cells.map((cell, index) => ({
    ...cell,
    bombsAround: countBombsAround(index, size, cells),
  }));

  return { cells: cellsWithBombsAround };
}

export function checkCell(index: number, board: Board, boardSize: number): Board {
  const cell = board.cells[index];

  if (!cell || cell?.checked) return board; // out of bounds or already checked
  if (cell.bombsAround! > 0) return checkSingleCell(index, board);

  let result = checkSingleCell(index, board);

  result = checkCell(index - boardSize, result, boardSize); // top
  result = checkCell(index + boardSize, result, boardSize); // bottom

  if (!isLeftEdge(index, boardSize)) {
    result = checkCell(index - boardSize - 1, result, boardSize); // top-left
    result = checkCell(index - 1, result, boardSize); // left
    result = checkCell(index + boardSize - 1, result, boardSize); // bottom-left
  }

  if (!isRightEdge) {
    result = checkCell(index + 1, result, boardSize); // right
    result = checkCell(index + boardSize + 1, result, boardSize); // bottom-right
    result = checkCell(index - boardSize + 1, result, boardSize); // top-right
  }

  return result;
}

function checkSingleCell(index: number, board: Board): Board {
  return {
    cells: board.cells.map((cell, i) => (i === index ? { ...cell, checked: true } : cell)),
  };
}

export function revealBoard(board: Board): Board {
  return {
    cells: board.cells.map(cell => ({ ...cell, checked: true })),
  };
}

export function toggleFlag({ cells }: Board, index: number): Board {
  return {
    cells: cells.map((cell, i) => (i === index ? { ...cell, flagged: !cell.flagged } : cell)),
  };
}

export function isLeftEdge(index: number, boardSize: number): boolean {
  return index % boardSize === 0;
}

export function isRightEdge(index: number, boardSize: number): boolean {
  return index % boardSize === boardSize - 1;
}

function countBombsAround(index: number, size: number, cells: BoardCell[]): number {
  let bombs: number = 0;

  if (index >= size) {
    // top
    if (cells[index - size].isBomb) {
      bombs++;
    }
    // top-right
    if (!isRightEdge(index, size) && cells[index - size + 1].isBomb) {
      bombs++;
    }
    // top-left
    if (!isLeftEdge(index, size) && cells[index - size - 1].isBomb) {
      bombs++;
    }
  }

  // left
  if (!isLeftEdge(index, size) && cells[index - 1].isBomb) {
    bombs++;
  }

  // right
  if (!isRightEdge(index, size) && cells[index + 1].isBomb) {
    bombs++;
  }

  if (index < size * (size - 1)) {
    // bottom
    if (cells[index + size].isBomb) {
      bombs++;
    }

    // bototm-right
    if (!isRightEdge(index, size) && cells[index + size + 1].isBomb) {
      bombs++;
    }

    // bottom-left
    if (!isLeftEdge(index, size) && cells[index + size - 1].isBomb) {
      bombs++;
    }
  }

  return bombs;
}
