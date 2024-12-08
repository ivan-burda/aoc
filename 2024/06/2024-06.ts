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
  // console.log(printout);
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

//part1
export const getCountOfVisitedPositions = (input: string): number => {
  const visitedPositions = new Set<string>();
  let room = getRoom(input);
  let currentGuardPosition = getGuardPosition(room);
  let guardOrientation: Orientation = "UP";

  while (isPositionWithinRoom(currentGuardPosition, room)) {
    printRoom(room);
    visitedPositions.add(JSON.stringify(currentGuardPosition));

    let nextMovePosition = getNextMovePosition(
      currentGuardPosition,
      guardOrientation,
    );

    if (isNextPositionObstructed(nextMovePosition, room)) {
      guardOrientation = getNewGuardOrientation(guardOrientation);
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
  console.log(visitedPositions.size);
  return visitedPositions.size;
};
