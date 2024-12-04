type Board = string[][];
type LetterCoordinates = number[];

const getBoard = (input: string): Board => {
  return input.split("\n").reduce<string[][]>((acc, curr) => {
    acc.push(curr.split(""));
    return acc;
  }, []);
};

const isPositionWithinBoard = (
  positionCoordinates: LetterCoordinates,
  board: Board,
): boolean => {
  const [x, y] = positionCoordinates;
  const [maxCoordinateX, maxCoordinateY] = getMaxBoardCoordinates(board);
  return x >= 0 && y >= 0 && x <= maxCoordinateX && y <= maxCoordinateY;
};

const getMaxBoardCoordinates = (board: Board): number[] => {
  const maxCoordinateX = board[0].length - 1;
  const maxCoordinateY = board.length - 1;
  return [maxCoordinateX, maxCoordinateY];
};

const getLetterAtBoardCoordinates = (
  letterCoordinates: LetterCoordinates,
  board: Board,
): string => {
  if (!isPositionWithinBoard(letterCoordinates, board)) {
    return "";
  }

  const [boardColumn, boardRow] = letterCoordinates;
  return board[boardRow][boardColumn];
};

// Part1
const getSearchedWordCountInDirections = (
  wordStartCoordinateX: number,
  wordStartCoordinateY: number,
  wordToSearch: string,
  board: Board,
) => {
  const wordToSearchLength = wordToSearch.length;

  const charsAtDirection: Record<string, (string | undefined)[]> = {
    UP: [],
    UP_RIGHT: [],
    RIGHT: [],
    DOWN_RIGHT: [],
    DOWN: [],
    DOWN_LEFT: [],
    LEFT: [],
    UP_LEFT: [],
  };

  for (let i = 0; i < wordToSearchLength; i++) {
    charsAtDirection.UP.push(
      getLetterAtBoardCoordinates(
        [wordStartCoordinateX, wordStartCoordinateY - i],
        board,
      ),
    );

    charsAtDirection.UP_RIGHT.push(
      getLetterAtBoardCoordinates(
        [wordStartCoordinateX + i, wordStartCoordinateY - i],
        board,
      ),
    );

    charsAtDirection.RIGHT.push(
      getLetterAtBoardCoordinates(
        [wordStartCoordinateX + i, wordStartCoordinateY],
        board,
      ),
    );

    charsAtDirection.DOWN_RIGHT.push(
      getLetterAtBoardCoordinates(
        [wordStartCoordinateX + i, wordStartCoordinateY + i],
        board,
      ),
    );
    charsAtDirection.DOWN.push(
      getLetterAtBoardCoordinates(
        [wordStartCoordinateX, wordStartCoordinateY + i],
        board,
      ),
    );

    charsAtDirection.DOWN_LEFT.push(
      getLetterAtBoardCoordinates(
        [wordStartCoordinateX - i, wordStartCoordinateY + i],
        board,
      ),
    );

    charsAtDirection.LEFT.push(
      getLetterAtBoardCoordinates(
        [wordStartCoordinateX - i, wordStartCoordinateY],
        board,
      ),
    );

    charsAtDirection.UP_LEFT.push(
      getLetterAtBoardCoordinates(
        [wordStartCoordinateX - i, wordStartCoordinateY - i],
        board,
      ),
    );
  }

  return Object.values(charsAtDirection)
    .map((charactersAtDirection) => charactersAtDirection.join(""))
    .filter((word) => word === wordToSearch).length;
};

export const getXMASWordCount = (input: string): number => {
  const board = getBoard(input);
  const [maxCoordinateX, maxCoordinateY] = getMaxBoardCoordinates(board);
  const wordToSearch = "XMAS";
  let locatedXmasWordCount = 0;

  for (
    let boardCoordinateY = 0;
    boardCoordinateY <= maxCoordinateY;
    boardCoordinateY++
  ) {
    for (
      let boardCoordinateX = 0;
      boardCoordinateX <= maxCoordinateX;
      boardCoordinateX++
    ) {
      if (
        getLetterAtBoardCoordinates(
          [boardCoordinateX, boardCoordinateY],
          board,
        ) === "X"
      ) {
        locatedXmasWordCount += getSearchedWordCountInDirections(
          boardCoordinateX,
          boardCoordinateY,
          wordToSearch,
          board,
        );
      }
    }
  }

  return locatedXmasWordCount;
};

// Part2
const isXmasCross = (
  crossMiddleX: number,
  crossMiddleY: number,
  board: Board,
): boolean => {
  const upperRightLetter = getLetterAtBoardCoordinates(
    [crossMiddleX + 1, crossMiddleY - 1],
    board,
  );
  const bottomLeftLetter = getLetterAtBoardCoordinates(
    [crossMiddleX - 1, crossMiddleY + 1],
    board,
  );
  const upperLeftLetter = getLetterAtBoardCoordinates(
    [crossMiddleX - 1, crossMiddleY - 1],
    board,
  );
  const bottomRightLetter = getLetterAtBoardCoordinates(
    [crossMiddleX + 1, crossMiddleY + 1],
    board,
  );

  const allowedCrossParts = ["MAS", "SAM"];
  const diagonalA = [bottomLeftLetter, "A", upperRightLetter].join("");
  const diagonalB = [bottomRightLetter, "A", upperLeftLetter].join("");

  return !!(
    allowedCrossParts.find((part) => part === diagonalA) &&
    allowedCrossParts.find((part) => part === diagonalB)
  );
};

export const getXmasCrossCount = (input: string): number => {
  const board = getBoard(input);
  const [maxCoordinateX, maxCoordinateY] = getMaxBoardCoordinates(board);
  const crossMiddleLetter = "A";
  let locatedXmasCrossCount = 0;

  for (
    let boardCoordinateY = 0;
    boardCoordinateY <= maxCoordinateY;
    boardCoordinateY++
  ) {
    for (
      let boardCoordinateX = 0;
      boardCoordinateX <= maxCoordinateX;
      boardCoordinateX++
    ) {
      if (
        getLetterAtBoardCoordinates(
          [boardCoordinateX, boardCoordinateY],
          board,
        ) === crossMiddleLetter
      ) {
        if (isXmasCross(boardCoordinateX, boardCoordinateY, board)) {
          locatedXmasCrossCount++;
        }
      }
    }
  }

  return locatedXmasCrossCount;
};
