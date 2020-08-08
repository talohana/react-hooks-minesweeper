import React, { useCallback, useState } from 'react';
import { Window, WindowHeader } from 'react95';
import styled from 'styled-components';
import { BOARD_SIZE, BOMBS_AMOUNT } from '../constants';
import { GameState } from '../models';
import { checkCell, createBoard, revealBoard, toggleFlag } from '../utils/board-utils';
import Board from './Board';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: teal;
`;

const StyledLink = styled.a`
  text-decoration: underline;
`;

const Game = () => {
  const [board, setBoard] = useState(createBoard(BOARD_SIZE, BOMBS_AMOUNT));
  const [gameState, setGameState] = useState(GameState.PLAYING);

  const onCellChecked = useCallback(
    (index: number) => {
      setBoard(prevBoard => {
        return board.cells[index]!.isBomb
          ? revealBoard(prevBoard)
          : checkCell(index, prevBoard, BOARD_SIZE);
      });

      board.cells[index]!.isBomb && setGameState(GameState.LOST);
    },
    [board.cells, setBoard]
  );

  const onCellFlagged = useCallback(
    (index: number) => setBoard(prevBoard => toggleFlag(prevBoard, index)),
    [setBoard]
  );

  return (
    <Wrapper>
      <Window>
        <WindowHeader>
          <span>Minesweeper by </span>
          <StyledLink href="https://github.com/talohana" target="blank">
            Tal Ohana
          </StyledLink>
        </WindowHeader>
        <Board board={board} onCellChecked={onCellChecked} onCellFlagged={onCellFlagged} />
      </Window>
    </Wrapper>
  );
};

export default Game;
