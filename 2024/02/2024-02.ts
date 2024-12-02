//first 2 digit relations set a inc/decr trend which must not be violated when going on in the report
//two adjacent digits in a report can differ by 1,2 or 3 max

export const getSafeReportsCount = (input: string): number => {
  const results: boolean[] = [];
  const reports = input
    .split("\n")
    .map((report) => report.split(" "))
    .map((report) => report.map(Number));

  reports.forEach((report) => {
    let isReportSafe = true;
    const isReportIncreasing = report[1] - report[0] > 0;
    for (let i = 0; i < report.length - 1; i++) {
      if (report[i + 1] === report[i]) {
        isReportSafe = false;
        return;
      }

      const isAdjacentPairIncreasing = report[i + 1] - report[i] > 0;
      if (isAdjacentPairIncreasing !== isReportIncreasing) {
        isReportSafe = false;
        return;
      }

      const adjacentPairAbsoluteDifference = Math.abs(
        report[i + 1] - report[i],
      );
      if (adjacentPairAbsoluteDifference > 3) {
        isReportSafe = false;
        return;
      }
    }
    results.push(isReportSafe);
  });

  return results.length;
};
