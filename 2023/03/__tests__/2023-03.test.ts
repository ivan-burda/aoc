import {getPartsNumber} from "../2023-03";

describe('AOC-2023-03', () => {
    it('part-1-test-data', () => {
        const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
        expect(getPartsNumber(input)).toBe(533784)
    });

});
