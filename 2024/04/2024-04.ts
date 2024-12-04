type Board = string[][];
type LetterCoordinates = number[];
type Word = LetterCoordinates[];

const getBoard = (input: string): Board => {
  return input.split("\n").reduce<string[][]>((acc, curr) => {
    acc.push(curr.split(""));
    return acc;
  }, []);
};

const isPositionWithinBoard = (
  coordinates: number[],
  grid: string[][],
): boolean => {
  const maxX = grid[0].length - 1;
  const maxY = grid.length - 1;
  const [x, y] = coordinates;
  return x >= 0 && y >= 0 && x <= maxX && y <= maxY;
};

const getBoardSize = (boardGrid: Board): number[] => {
  const gameWidth = boardGrid[0].length;
  const gameHeight = boardGrid.length;
  return [gameWidth, gameHeight];
};

const getLetterAtBoardCoordinates = (
  letterCoordinates: LetterCoordinates,
  board: Board,
): string | undefined => {
  if (!isPositionWithinBoard(letterCoordinates, board)) {
    return undefined;
  }

  const [boardColumn, boardRow] = letterCoordinates;
  return board[boardRow][boardColumn];
};

// Part1

const generateWordPossibleCoordinates = (
  wordStartCoordinateX: number,
  wordStartCoordinateY: number,
  wordToSearch: string,
  board: Board,
) => {
  const wordToSearchLength = wordToSearch.length;

  const UP = [];
  // for (let i = 0; i < wordToSearchLength; i++) {
  //   const coordinates = [wordStartCoordinateX, wordStartCoordinateY - i];
  //   if (isPositionWithinBoard(coordinates, board)) {
  //     UP.push(coordinates);
  //   }
  // }

  for (let i = 0; i < wordToSearchLength; i++) {
    const letter = getLetterAtBoardCoordinates(
      [wordStartCoordinateX, wordStartCoordinateY - i],
      board,
    );

    if (letter) {
      UP.push(letter);
    }
  }

  const UP_RIGHT = [];
  for (let i = 0; i < wordToSearchLength; i++) {
    const coordinates = [wordStartCoordinateX + i, wordStartCoordinateY - i];
    if (isPositionWithinBoard(coordinates, board)) {
      UP_RIGHT.push(coordinates);
    }
  }

  const RIGHT = [];
  for (let i = 0; i < wordToSearchLength; i++) {
    const coordinates = [wordStartCoordinateX + i, wordStartCoordinateY];
    if (isPositionWithinBoard(coordinates, board)) {
      RIGHT.push(coordinates);
    }
  }

  const DOWN_RIGHT = [];
  for (let i = 0; i < wordToSearchLength; i++) {
    const coordinates = [wordStartCoordinateX + i, wordStartCoordinateY + i];
    if (isPositionWithinBoard(coordinates, board)) {
      DOWN_RIGHT.push(coordinates);
    }
  }

  const DOWN = [];
  for (let i = 0; i < wordToSearchLength; i++) {
    const coordinates = [wordStartCoordinateX, wordStartCoordinateY + i];
    if (isPositionWithinBoard(coordinates, board)) {
      DOWN.push(coordinates);
    }
  }

  const DOWN_LEFT = [];
  for (let i = 0; i < wordToSearchLength; i++) {
    const coordinates = [wordStartCoordinateX - i, wordStartCoordinateY + i];
    if (isPositionWithinBoard(coordinates, board)) {
      DOWN_LEFT.push(coordinates);
    }
  }

  const LEFT = [];
  for (let i = 0; i < wordToSearchLength; i++) {
    const coordinates = [wordStartCoordinateX - i, wordStartCoordinateY];
    if (isPositionWithinBoard(coordinates, board)) {
      LEFT.push(coordinates);
    }
  }

  const UP_LEFT = [];
  for (let i = 0; i < wordToSearchLength; i++) {
    const coordinates = [wordStartCoordinateX - i, wordStartCoordinateY - i];
    if (isPositionWithinBoard(coordinates, board)) {
      UP_LEFT.push(coordinates);
    }
  }

  const relatedWords = [
    UP,
    UP_RIGHT,
    RIGHT,
    DOWN_RIGHT,
    DOWN,
    DOWN_LEFT,
    LEFT,
    UP_LEFT,
  ].filter((direction) => direction.length === wordToSearch.length);

  return relatedWords
    .map((currentWordLetterCoordinates) =>
      currentWordLetterCoordinates
        .map(
          (letterCoordinates) =>
            board[letterCoordinates[1]][letterCoordinates[0]],
        )
        .join(""),
    )
    .filter((locatedWord) => locatedWord === wordToSearch)
    .filter((findings) => findings.length);
};

export const getXMASWordCount = (input: string): number => {
  const wordToSearch = "XMAS";
  const board = getBoard(input);
  const [gameWidth, gameHeight] = getBoardSize(board);
  let locatedXMASWordCount = 0;

  for (let yIndex = 0; yIndex < gameHeight; yIndex++) {
    for (let xIndex = 0; xIndex < gameWidth; xIndex++) {
      if (getLetterAtBoardCoordinates([xIndex, yIndex], board) === "X") {
        const relatedWords = generateWordPossibleCoordinates(
          xIndex,
          yIndex,
          wordToSearch,
          board,
        );

        locatedXMASWordCount += relatedWords.length;
      }
    }
  }

  return locatedXMASWordCount;
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
  const [boardWidth, boardHeight] = getBoardSize(board);
  const crossMiddleLetter = "A";
  let locatedXmasCrossCount = 0;

  for (let yIndex = 0; yIndex < boardHeight; yIndex++) {
    for (let xIndex = 0; xIndex < boardWidth; xIndex++) {
      if (board[yIndex][xIndex] === crossMiddleLetter) {
        if (isXmasCross(xIndex, yIndex, board)) {
          locatedXmasCrossCount++;
        }
      }
    }
  }

  return locatedXmasCrossCount;
};
