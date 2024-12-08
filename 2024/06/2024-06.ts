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

interface TurningPositions {
  x: number;
  y: number;
  orientation: Orientation;
}

interface GuardMovementPositionsResult {
  visitedPositions: Set<string>;
  turningPositions: TurningPositions[];
}

const getGuardMovementPositions = (
  room: Room,
): GuardMovementPositionsResult => {
  const visitedPositions = new Set<string>();
  const turningPositions = [];
  let currentGuardPosition = getGuardPosition(room);
  let guardOrientation: Orientation = "UP";
  while (isPositionWithinRoom(currentGuardPosition, room)) {
    // printRoom(room);
    //add here logics to check whether the visitedPositions set already contains the stringified new position -> if yes, push in "LOOP" and break the "while"
    visitedPositions.add(JSON.stringify(currentGuardPosition));

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
  };
};

//part1
export const getCountOfVisitedPositions = (input: string): number => {
  let room = getRoom(input);
  return getGuardMovementPositions(room).visitedPositions.size;
};

//part2

const getMovingDirection = () => {};

export const getCountOfPossibleObstaclePositions = (input: string): number => {
  let room = getRoom(input);
  const turningPositions = getGuardMovementPositions(room).turningPositions;
  console.log(turningPositions);
  const possibleObstaclePositions = new Set<string>();

  for (let i = 1; i <= turningPositions.length - 3; i++) {
    if (turningPositions[i].orientation === "UP") {
    }
    if (turningPositions[i].orientation === "RIGHT") {
    }
    if (turningPositions[i].orientation === "DOWN") {
      //find existing obstacles in area:
      //have a function to get coordinates of all obstacles (a hashmap, ideally)
      /*
                        x: 0 ... turningPositions[i].x-2
                        y: turningPositions[i].y+1 ... room.maxCoordinateY
            
                        loop over existing obstacles and get those with coordinates matching requirement above
                        loop over the obstacles within the area
                              based on the looped obstacle location, check where a new obstacle would have to be placed to hit the looped-over obstacle
                              if the place for a new obstacle is available then:
                              create a new room representation with the new obstacle and the guard position located based the newly placed obstacle
                              call getGuardMovementPositions()
                              if the starting position appears in the positions twice then this is a loop -> push the obstacle into the array of possible obstacles
      
            
            
                         */
    }
    if (turningPositions[i].orientation === "LEFT") {
    }
  }

  //Finds only rectangular loops
  // for (let i = 0; i <= turningPositions.length - 3; i++) {
  //   if (
  //     turningPositions[i][1] === turningPositions[i + 1][1] &&
  //     turningPositions[i + 1][0] === turningPositions[i + 2][0]
  //   ) {
  //     possibleObstaclePositions.add(
  //       JSON.stringify([
  //         turningPositions[i][0] - 1,
  //         turningPositions[i + 2][1],
  //       ]),
  //     );
  //   }
  // }

  return possibleObstaclePositions.size;
};

/*
DOWN+LEFT, check positions of obstacles in the area contained by the two
  for each found obstacle try:
  placing a new obstacle to reach the found obstacle
  create a new room representation with the new obstacle and the guard position located based the newly places obstacle -> call getGuardMovementPositions() and if the starting position appears in the positions twice then this is a loop


 */

//idea2


