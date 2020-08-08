import React from 'react';
import styled from 'styled-components';
import { Board as BoardModel } from '../models';
import BoardCell from './BoardCell';

interface Props {
  board: BoardModel;
  onCellChecked: (index: number) => any;
  onCellFlagged: (index: number) => any;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 1fr);
`;

const Board = ({ board, onCellChecked, onCellFlagged }: Props) => {
  const cells = board.cells.map((cell, i) => (
    <BoardCell
      key={i}
      cell={cell}
      cellIndex={i}
      onCellChecked={() => onCellChecked(i)}
      onCellFlagged={() => onCellFlagged(i)}
    ></BoardCell>
  ));

  return <Wrapper>{cells}</Wrapper>;
};

export default Board;
