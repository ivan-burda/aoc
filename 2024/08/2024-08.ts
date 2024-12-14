type Grid = string[][];
const getMaxGridCoordinates = (grid: Grid): number[] => {
  const maxCoordinateX = grid[0].length - 1;
  const maxCoordinateY = grid.length - 1;
  return [maxCoordinateX, maxCoordinateY];
};

const printOut = (grid: Grid): void => {
  let printout = "";
  const [maxCoordinateX, maxCoordinateY] = getMaxGridCoordinates(grid);
  for (
    let gridCoordinateY = 0;
    gridCoordinateY <= maxCoordinateY;
    gridCoordinateY++
  ) {
    for (
      let gridCoordinateX = 0;
      gridCoordinateX <= maxCoordinateX;
      gridCoordinateX++
    ) {
      printout += grid[gridCoordinateY][gridCoordinateX];
    }
    printout += "\n";
  }
  console.log(printout);
};

type Antenna = { x: number; y: number; id: string };
const getAntennas = (grid: Grid) => {
  const antennas: Record<string, Antenna[]> = {};
  const [maxCoordinateX, maxCoordinateY] = getMaxGridCoordinates(grid);
  for (let y = 0; y <= maxCoordinateY; y++) {
    for (let x = 0; x <= maxCoordinateX; x++) {
      if (grid[y][x] !== ".") {
        const antennaFrequencyType = antennas[grid[y][x]];
        const antennaPosition = {
          x,
          y,
          id: `${JSON.stringify(x)}-${JSON.stringify(y)}`,
        };
        if (antennaFrequencyType) {
          antennaFrequencyType.push(antennaPosition);
        } else {
          antennas[grid[y][x]] = [antennaPosition];
        }
      }
    }
  }
  return antennas;
};

type PositionCoordinates = number[];
const isPositionWithinGrid = (
  positionCoordinates: PositionCoordinates,
  grid: Grid,
): boolean => {
  const [x, y] = positionCoordinates;
  const [maxCoordinateX, maxCoordinateY] = getMaxGridCoordinates(grid);
  return x >= 0 && y >= 0 && x <= maxCoordinateX && y <= maxCoordinateY;
};

type Antinode = {
  x: number;
  y: number;
  id: string;
};
const getAntennaPairAntinodes = (
  antennaA: Antenna,
  antennaB: Antenna,
): Antinode[] => {
  const twoAntennasDistanceX = antennaA.x - antennaB.x;
  const twoAntennasDistanceY = antennaA.y - antennaB.y;
  const preNode = {
    x: antennaA.x + twoAntennasDistanceX,
    y: antennaA.y + twoAntennasDistanceY,
    id: `${JSON.stringify(antennaA.x + twoAntennasDistanceX)}-${JSON.stringify(antennaA.y + twoAntennasDistanceY)}`,
  };

  const postNode = {
    x: antennaB.x + twoAntennasDistanceX,
    y: antennaB.y + twoAntennasDistanceY,
    id: `${JSON.stringify(antennaB.x + twoAntennasDistanceX)}-${antennaB.y + twoAntennasDistanceY}`,
  };

  return [preNode, postNode];
};

const isValidAntinode = (
  node: Antinode,
  antennaA: Antenna,
  antennaB: Antenna,
): boolean => {
  return node.id !== antennaA.id && node.id !== antennaB.id;
};

export const getAntinodeLocationCount = (input: string): number => {
  const grid = input.split("\n").map((line) => line.split(""));
  const antennas = getAntennas(grid);
  const antinodes: Record<string, Set<Antinode>> = {};

  Object.entries(antennas).forEach(
    ([antennaFrequencyType, antennaPositions]) => {
      for (let i = 0; i < antennaPositions.length; i++) {
        for (let j = 0; j < antennaPositions.length; j++) {
          if (i !== j) {
            const antennaA = antennaPositions[i];
            const antennaB = antennaPositions[j];
            const [preNode, postNode] = getAntennaPairAntinodes(
              antennaA,
              antennaB,
            );

            if (antinodes[antennaFrequencyType]) {
              if (
                isPositionWithinGrid([preNode.x, preNode.y], grid) &&
                isValidAntinode(preNode, antennaA, antennaB)
              ) {
                antinodes[antennaFrequencyType].add(preNode);
              }
              if (
                isPositionWithinGrid([postNode.x, postNode.y], grid) &&
                isValidAntinode(postNode, antennaA, antennaB)
              ) {
                antinodes[antennaFrequencyType].add(postNode);
              }
            } else {
              antinodes[antennaFrequencyType] = new Set();
              if (
                isPositionWithinGrid([preNode.x, preNode.y], grid) &&
                isValidAntinode(preNode, antennaA, antennaB)
              ) {
                antinodes[antennaFrequencyType].add(preNode);
              }
              if (
                isPositionWithinGrid([postNode.x, postNode.y], grid) &&
                isValidAntinode(postNode, antennaA, antennaB)
              ) {
                antinodes[antennaFrequencyType].add(postNode);
              }
            }
          }
        }
      }
    },
  );

  const result = new Set();
  Object.values(antinodes).forEach((antenaRelatedAntinodes) => {
    antenaRelatedAntinodes.forEach((antinode) => {
      result.add(JSON.stringify(antinode));
    });
  });

  return result.size;
};
