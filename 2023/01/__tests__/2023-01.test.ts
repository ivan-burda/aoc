import {getCalibrationValueSum} from "../2023-01";
import {readFileSync} from "graceful-fs";

describe('AOC-2023-01', () => {
    it('part 1 test data return sum of calibration values', () => {
        const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;
        expect(getCalibrationValueSum(input)).toEqual(142)
    });

    it('part 1 real data return sum of calibration values', () => {
        const input = readFileSync('2023/01/2023-01.txt', 'utf-8')
        expect(getCalibrationValueSum(input)).toEqual(54708)
    });


});
