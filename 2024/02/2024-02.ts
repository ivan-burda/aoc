const getReports = (input: string): number[][] => {
  return input
    .split("\n")
    .map((report) => report.split(" "))
    .map((report) => report.map(Number));
};

export const isIncreasing = (report: number[]): boolean => {
  for (let i = 0; i < report.length; i++) {
    if (report[i + 1] < report[i]) {
      return false;
    }
  }
  return true;
};

export const isDecreasing = (report: number[]): boolean => {
  for (let i = 0; i < report.length; i++) {
    if (report[i + 1] > report[i]) {
      return false;
    }
  }
  return true;
};

export const isRequiredAllowedDifference = (
  num1: number,
  num2: number,
): boolean => {
  const absDiff = Math.abs(num1 - num2);
  return absDiff >= 1 && absDiff <= 3;
};

const isReportSafe = (report: number[]): boolean => {
  const isReportIncreasing = isIncreasing(report);
  const isReportDecreasing = isDecreasing(report);
  const hasReportConstantTrend = isReportDecreasing || isReportIncreasing;
  let areAdjacentDifferencesOK = true;

  for (let i = 0; i < report.length - 1; i++) {
    if (!isRequiredAllowedDifference(report[i], report[i + 1])) {
      areAdjacentDifferencesOK = false;
    }
  }

  return hasReportConstantTrend && areAdjacentDifferencesOK;
};

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
  const completelySafeReports = getSafeReportsCountPart1(input);

  return completelySafeReports;
};
