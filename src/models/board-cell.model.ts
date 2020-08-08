export interface BoardCell {
  isBomb?: boolean;
  checked?: boolean;
  flagged?: boolean;
  bombsAround?: number;
}
