import { Dictionary } from "../../utils/dataStructures/dictionary/dictionary";
import { number } from "yargs";

type Room = string[][];
type PositionCoordinates = number[];

const getMaxRoomCoordinates = (room: Room): number[] => {
  const maxCoordinateX = room[0].length - 1;
  const maxCoordinateY = room.length - 1;
  return [maxCoordinateX, maxCoordinateY];
};

const isPositionWithinRoom = (
  positionCoordinates: PositionCoordinates,
  room: Room,
): boolean => {
  const [x, y] = positionCoordinates;
  const [maxCoordinateX, maxCoordinateY] = getMaxRoomCoordinates(room);
  return x >= 0 && y >= 0 && x <= maxCoordinateX && y <= maxCoordinateY;
};

const getRoom = (input: string): Room => {
  return input.split("\n").reduce<string[][]>((acc, curr) => {
    acc.push(curr.split(""));
    return acc;
  }, []);
};

const getObjectAtRoomCoordinates = (
  positionCoordinates: PositionCoordinates,
  room: Room,
): string => {
  if (!isPositionWithinRoom(positionCoordinates, room)) {
    return "";
  }

  const [boardColumn, boardRow] = positionCoordinates;
  return room[boardRow][boardColumn];
};

const getGuardPosition = (room: Room): PositionCoordinates => {
  const [maxCoordinateX, maxCoordinateY] = getMaxRoomCoordinates(room);
  const guardCoordinates: PositionCoordinates = [];
  for (
    let roomCoordinateY = 0;
    roomCoordinateY <= maxCoordinateY;
    roomCoordinateY++
  ) {
    for (
      let roomCoordinateX = 0;
      roomCoordinateX <= maxCoordinateX;
      roomCoordinateX++
    ) {
      if (
        ["^", ">", "v", "<"].includes(
          getObjectAtRoomCoordinates([roomCoordinateX, roomCoordinateY], room),
        )
      ) {
        guardCoordinates.push(roomCoordinateX);
        guardCoordinates.push(roomCoordinateY);
        return guardCoordinates;
      }
    }
  }
  return [];
};

const printRoom = (room: Room): void => {
  let printout = "";
  const [maxCoordinateX, maxCoordinateY] = getMaxRoomCoordinates(room);
  for (
    let roomCoordinateY = 0;
    roomCoordinateY <= maxCoordinateY;
    roomCoordinateY++
  ) {
    for (
      let roomCoordinateX = 0;
      roomCoordinateX <= maxCoordinateX;
      roomCoordinateX++
    ) {
      printout += room[roomCoordinateY][roomCoordinateX];
    }
    printout += "\n";
  }
  console.log(printout);
};

type Orientation = "UP" | "RIGHT" | "DOWN" | "LEFT";

const getNextMovePosition = (
  guardPosition: PositionCoordinates,
  guardOrientation: Orientation,
) => {
  const [guardCurrentX, guardCurrentY] = guardPosition;
  const map = {
    UP: [guardCurrentX, guardCurrentY - 1],
    RIGHT: [guardCurrentX + 1, guardCurrentY],
    DOWN: [guardCurrentX, guardCurrentY + 1],
    LEFT: [guardCurrentX - 1, guardCurrentY],
  };
  return map[guardOrientation];
};

const getNewGuardOrientation = (currentOrientation: Orientation) => {
  const orientationChangeMap: Record<Orientation, Orientation> = {
    UP: "RIGHT",
    RIGHT: "DOWN",
    DOWN: "LEFT",
    LEFT: "UP",
  };
  return orientationChangeMap[currentOrientation];
};

const getRotatedGuardSymbol = (newOrientation: Orientation) => {
  const rotateGuardMap: Record<Orientation, string> = {
    UP: "^",
    RIGHT: ">",
    DOWN: "v",
    LEFT: "<",
  };
  return rotateGuardMap[newOrientation];
};

const isNextPositionObstructed = (
  positionCoordinates: PositionCoordinates,
  room: Room,
): boolean => {
  return getObjectAtRoomCoordinates(positionCoordinates, room) === "#";
};

const moveGuardAndGetUpdatedRoom = (
  room: Room,
  currentGuardPosition: PositionCoordinates,
  nextGuardPosition: PositionCoordinates,
  guardOrientation: Orientation,
) => {
  if (!isPositionWithinRoom(nextGuardPosition, room)) {
    return room;
  }
  const [guardCurrentX, guardCurrentY] = currentGuardPosition;
  const [guardNextX, guardNextY] = nextGuardPosition;
  room[guardCurrentY][guardCurrentX] = ".";
  room[guardNextY][guardNextX] = getRotatedGuardSymbol(guardOrientation);
  return room;
};

const placeObstacleAndGetUpdatedRoom = (
  room: Room,
  obstaclePosition: PositionCoordinates,
) => {
  if (!isPositionWithinRoom(obstaclePosition, room)) {
    return room;
  }
  const [obstacleX, obstacleY] = obstaclePosition;
  const newRoom = [...room];
  newRoom[obstacleY][obstacleX] = "#";

  return newRoom;
};

interface TurningPositions {
  x: number;
  y: number;
  orientation: Orientation;
}

interface GuardMovementPositionsResult {
  visitedPositions: Set<string>;
  turningPositions: TurningPositions[];
  isLoop: boolean;
}

const getGuardMovementPositions = (
  room: Room,
): GuardMovementPositionsResult => {
  let duplicateEntries = 0;
  let isLoop = false;
  const visitedPositions = new Set<string>();
  const visitedPositionWithDirection: Record<string, number> = {};
  const turningPositions: TurningPositions[] = [];
  let currentGuardPosition = getGuardPosition(room);
  let guardOrientation: Orientation = "UP";
  while (isPositionWithinRoom(currentGuardPosition, room)) {
    const currentPositionsStringified = JSON.stringify(currentGuardPosition);

    if (isLoop) {
      break;
    }

    // if (visitedPositions.has(currentPositionsStringified)) {
    //   duplicateEntries++;
    // }
    visitedPositions.add(JSON.stringify(currentGuardPosition));

    //visitedPositionWithDirection

    if (
      visitedPositionWithDirection[
        JSON.stringify(currentGuardPosition) + currentGuardPosition
      ] === 4
    ) {
      isLoop = true;
      break;
    }

    if (
      visitedPositionWithDirection[
        JSON.stringify(currentGuardPosition) + currentGuardPosition
      ]
    ) {
      visitedPositionWithDirection[
        JSON.stringify(currentGuardPosition) + currentGuardPosition
      ]++;
    } else {
      visitedPositionWithDirection[
        JSON.stringify(currentGuardPosition) + currentGuardPosition
      ] = 1;
    }

    let nextMovePosition = getNextMovePosition(
      currentGuardPosition,
      guardOrientation,
    );

    if (isNextPositionObstructed(nextMovePosition, room)) {
      guardOrientation = getNewGuardOrientation(guardOrientation);
      turningPositions.push({
        x: currentGuardPosition[0],
        y: currentGuardPosition[1],
        orientation: guardOrientation,
      });
    }

    if (!isNextPositionObstructed(nextMovePosition, room)) {
      room = moveGuardAndGetUpdatedRoom(
        room,
        currentGuardPosition,
        nextMovePosition,
        guardOrientation,
      );
      currentGuardPosition = nextMovePosition;
    }
  }
  return {
    visitedPositions,
    turningPositions,
    isLoop: isLoop,
  };
};

//part1
export const getCountOfVisitedPositions = (input: string): number => {
  let room = getRoom(input);
  return getGuardMovementPositions(room).visitedPositions.size;
};

//part2

const getMovingDirection = () => {};

const getAllObstaclePositions = (room: Room): PositionCoordinates[] => {
  const [maxCoordinateX, maxCoordinateY] = getMaxRoomCoordinates(room);
  const obstacles = [];
  for (
    let roomCoordinateY = 0;
    roomCoordinateY <= maxCoordinateY;
    roomCoordinateY++
  ) {
    for (
      let roomCoordinateX = 0;
      roomCoordinateX <= maxCoordinateX;
      roomCoordinateX++
    ) {
      if (
        getObjectAtRoomCoordinates([roomCoordinateX, roomCoordinateY], room) ===
        "#"
      ) {
        obstacles.push([roomCoordinateX, roomCoordinateY]);
      }
    }
  }
  return obstacles;
};

interface Limit {
  lower: number;
  upper: number;
}

const getAllObstaclesWithinArea = (
  obstacles: PositionCoordinates[],
  xLimit: Limit,
  yLimit: Limit,
): PositionCoordinates[] => {
  return obstacles.filter(
    (obstacle) =>
      obstacle[0] >= xLimit.lower &&
      obstacle[0] <= xLimit.upper &&
      obstacle[1] >= yLimit.lower &&
      obstacle[1] <= yLimit.upper,
  );
};

export const getCountOfPossibleObstaclePositions = (input: string): number => {
  const room = getRoom(input);
  // console.log("starting room");
  // printRoom(room);
  const movementPositions = [
    ...getGuardMovementPositions(room).visitedPositions,
  ]
    .map((pos) => JSON.parse(pos))
    .splice(1);
  const guardStartingPosition = getGuardPosition(room);
  const roomsWithPossibleObstacles: Room[] = [];
  let loopCount = 0;
  movementPositions.forEach((position) => {
    if (
      getGuardMovementPositions(
        placeObstacleAndGetUpdatedRoom(getRoom(input), position),
      ).isLoop
    ) {
      loopCount++;
    }
  });

  return loopCount;
};
