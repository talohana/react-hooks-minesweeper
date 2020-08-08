import React from 'react';
import { Button } from 'react95';
import styled from 'styled-components';
import { BoardCell as BoardCellModel } from '../models';

interface Props {
  cell: BoardCellModel;
  cellIndex: number;
  onCellChecked: () => any;
  onCellFlagged: () => any;
}

const StyledButton = styled(Button)`
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1rem;
  background-color: ${({ isBomb }) => (isBomb ? 'red' : 'inherit')};

  :focus::after {
    outline: none;
  }
`;

const CheckedButton = styled(StyledButton).attrs(() => ({ variant: 'flat', disabled: false }))``;

const BoardCell = ({ cell, onCellChecked, onCellFlagged }: Props) => {
  const { checked, flagged, bombsAround, isBomb } = cell;

  return checked ? (
    <CheckedButton isBomb={isBomb}>{isBomb ? '💣' : bombsAround}</CheckedButton>
  ) : (
    <StyledButton
      onClick={onCellChecked}
      onContextMenu={(e: MouseEvent) => {
        e.preventDefault();
        onCellFlagged();
      }}
    >
      {flagged && '🚩'}
    </StyledButton>
  );
};

export default BoardCell;
