const getReports = (input: string): number[][] => {
  return input
    .split("\n")
    .map((report) => report.split(" "))
    .map((report) => report.map(Number));
};

export const isConstantlyIncreasing = (report: number[]): boolean => {
  for (let i = 0; i < report.length; i++) {
    if (report[i + 1] < report[i]) {
      return false;
    }
  }
  return true;
};

export const isConstantlyDecreasing = (report: number[]): boolean => {
  for (let i = 0; i < report.length; i++) {
    if (report[i + 1] > report[i]) {
      return false;
    }
  }
  return true;
};

export const isDifferenceValid = (num1: number, num2: number): boolean => {
  const absDiff = Math.abs(num1 - num2);
  return absDiff >= 1 && absDiff <= 3;
};

const isReportSafe = (report: number[]): boolean => {
  const isReportIncreasing = isConstantlyIncreasing(report);
  const isReportDecreasing = isConstantlyDecreasing(report);
  const isConstantTrend = isReportDecreasing || isReportIncreasing;
  let areAllAdjacentDifferencesValid = true;

  for (let i = 0; i < report.length - 1; i++) {
    if (!isDifferenceValid(report[i], report[i + 1])) {
      areAllAdjacentDifferencesValid = false;
    }
  }

  return isConstantTrend && areAllAdjacentDifferencesValid;
};

export const removeItem = (
  report: number[],
  indexToRemove: number,
): number[] => {
  return report.slice(0, indexToRemove).concat(report.slice(indexToRemove + 1));
};

// Part1
export const getSafeReportsCountPart1 = (input: string): number => {
  let safeReports = 0;
  const reports = getReports(input);

  reports.forEach((report) => {
    if (isReportSafe(report)) {
      safeReports++;
    }
  });

  return safeReports;
};

// Part2
export const getSafeReportsCountPart2 = (input: string): number => {
  let safeReports = 0;
  const reports = getReports(input);

  reports.forEach((report) => {
    if (isReportSafe(report)) {
      safeReports++;
    } else {
      const reportVariantsWithSingleItemRemoved = [];
      for (let i = 0; i < report.length; i++) {
        reportVariantsWithSingleItemRemoved.push(removeItem(report, i));
      }
      if (reportVariantsWithSingleItemRemoved.some(isReportSafe)) {
        safeReports++;
      }
    }
  });

  return safeReports;
};
