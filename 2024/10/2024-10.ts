type Area = string[][];
const getArea = (input: string): Area => {
  return input.split("\n").reduce<string[][]>((acc, curr) => {
    acc.push(curr.split(""));
    return acc;
  }, []);
};

const getMaxAreaCoordinates = (area: Area): number[] => {
  const maxCoordinateX = area[0].length - 1;
  const maxCoordinateY = area.length - 1;
  return [maxCoordinateX, maxCoordinateY];
};

const printArea = (area: Area): void => {
  let printout = "";
  const [maxCoordinateX, maxCoordinateY] = getMaxAreaCoordinates(area);
  for (
    let areaCoordinateY = 0;
    areaCoordinateY <= maxCoordinateY;
    areaCoordinateY++
  ) {
    for (
      let areaCoordinateX = 0;
      areaCoordinateX <= maxCoordinateX;
      areaCoordinateX++
    ) {
      printout += area[areaCoordinateY][areaCoordinateX];
    }
    printout += "\n";
  }
  console.log(printout);
};

type Coordinates = { x: number; y: number };
const getAllHeadCoordinates = (area: Area): Coordinates[] => {
  const headCoordinates = [];
  for (let i = 0; i < area.length; i++) {
    for (let j = 0; j < area[i].length; j++) {
      if (area[i][j] === "0") {
        headCoordinates.push({ x: j, y: i });
      }
    }
  }
  return headCoordinates;
};

const isPositionWithinArea = (
  positionCoordinates: Coordinates,
  area: Area,
): boolean => {
  const [maxCoordinateX, maxCoordinateY] = getMaxAreaCoordinates(area);
  return (
    positionCoordinates.x >= 0 &&
    positionCoordinates.y >= 0 &&
    positionCoordinates.x <= maxCoordinateX &&
    positionCoordinates.y <= maxCoordinateY
  );
};

const getNumberAtAreaCoordinates = (
  areaCoordinates: Coordinates,
  area: Area,
): string | undefined => {
  if (!isPositionWithinArea(areaCoordinates, area)) {
    return undefined;
  }
  return area[areaCoordinates.y][areaCoordinates.x];
};

type GlobalHeadRelatedTails = Record<string, Set<string>>;
type GlobalHeadRatings = Record<string, string[]>;

const getHeadRelatedTails = (
  area: Area,
  stepCoordinates: Coordinates,
  head: Coordinates,
  globalHeadRelatedTails: GlobalHeadRelatedTails,
  globalHeadRatings: GlobalHeadRatings,
): void => {
  const locatedTailsTemp: Coordinates[] = [];
  const top = { x: stepCoordinates.x, y: stepCoordinates.y - 1 };
  const right = { x: stepCoordinates.x + 1, y: stepCoordinates.y };
  const bottom = { x: stepCoordinates.x, y: stepCoordinates.y + 1 };
  const left = { x: stepCoordinates.x - 1, y: stepCoordinates.y };

  const currentValue = Number(
    getNumberAtAreaCoordinates(stepCoordinates, area),
  );
  const topValue = Number(getNumberAtAreaCoordinates(top, area));
  const rightValue = Number(getNumberAtAreaCoordinates(right, area));
  const bottomValue = Number(getNumberAtAreaCoordinates(bottom, area));
  const leftValue = Number(getNumberAtAreaCoordinates(left, area));

  const worthyCoordinates: Coordinates[] = [];
  if (topValue - currentValue === 1) {
    worthyCoordinates.push(top);
  }
  if (currentValue === 8 && topValue === 9) {
    locatedTailsTemp.push(top);
  }

  if (rightValue - currentValue === 1) {
    worthyCoordinates.push(right);
  }
  if (currentValue === 8 && rightValue === 9) {
    locatedTailsTemp.push(right);
  }

  if (bottomValue - currentValue === 1) {
    worthyCoordinates.push(bottom);
  }
  if (currentValue === 8 && bottomValue === 9) {
    locatedTailsTemp.push(bottom);
  }

  if (leftValue - currentValue === 1) {
    worthyCoordinates.push(left);
  }
  if (currentValue === 8 && leftValue === 9) {
    locatedTailsTemp.push(left);
  }

  locatedTailsTemp.forEach((tail) => {
    const headReference = `${JSON.stringify(head.x)}-${JSON.stringify(head.y)}`;
    if (globalHeadRelatedTails[headReference]) {
      globalHeadRelatedTails[headReference].add(`${tail.x}-${tail.y}`);
      globalHeadRatings[headReference].push(`${tail.x}-${tail.y}`);
    } else {
      globalHeadRelatedTails[headReference] = new Set();
      globalHeadRelatedTails[headReference].add(`${tail.x}-${tail.y}`);
      globalHeadRatings[headReference] = [`${tail.x}-${tail.y}`];
    }
  });

  worthyCoordinates.forEach((coordinate) => {
    getHeadRelatedTails(
      area,
      coordinate,
      head,
      globalHeadRelatedTails,
      globalHeadRatings,
    );
  });
};

interface Result {
  trailheadScoreSum: number;
  trailheadRatingSum: number;
}

export const getTrailheadStats = (input: string): Result => {
  const area = getArea(input);
  const heads = getAllHeadCoordinates(area);
  const globalHeadRelatedTails: GlobalHeadRelatedTails = {};
  const globalHeadRatings: GlobalHeadRatings = {};

  for (let i = 0; i < heads.length; i++) {
    getHeadRelatedTails(
      area,
      heads[i],
      heads[i],
      globalHeadRelatedTails,
      globalHeadRatings,
    );
  }

  return {
    trailheadScoreSum: Object.values(globalHeadRelatedTails).reduce(
      (acc, currentHeadRelatedTails) => {
        acc += currentHeadRelatedTails.size;
        return acc;
      },
      0,
    ),
    trailheadRatingSum: Object.values(globalHeadRatings).reduce(
      (acc, currentHeadRelatedTails) => {
        acc += currentHeadRelatedTails.length;
        return acc;
      },
      0,
    ),
  };
};
