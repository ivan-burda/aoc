import {getSimilarityScore, getTotalDistance} from "../2024-01";
import {readFileSync} from "graceful-fs";

const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`

const fullInput = readFileSync('2024/01/2024-01.txt', 'utf8')

describe('AOC-2024-01', () => {
    it('part1-test: returns total distance', () => {
        expect(getTotalDistance(testInput)).toEqual(11)
    });

    it('part1-full: returns total distance', () => {
        expect(getTotalDistance(fullInput)).toEqual(2970687)
    })

    it('part2-test: returns similarity score', () => {
        expect(getSimilarityScore(testInput)).toEqual(31)
    })

    it('part2-full: returns similarity score', () => {
        expect(getSimilarityScore(fullInput)).toEqual(23963899)
    })
});
