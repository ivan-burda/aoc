export const getHighestNumber = (arr: number[]): number => {
    return arr.sort((a, b) => b - a)[0];
}