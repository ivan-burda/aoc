export const getArraySum = (input: number[]): number => {
    if (input.length === 1) {
        return input[0]
    } else {
        return input[0] + getArraySum(input.slice(1, input.length));
    }
}