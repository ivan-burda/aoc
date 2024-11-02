export const getFibonacci = (number: number, memo: Record<number, number> = {}): number => {

    if (number === 0 || number === 1) return number;


    if (!memo[number]) {
        memo[number] = getFibonacci(number - 2, memo) + getFibonacci(number - 1, memo)
    }


    return memo[number]
}