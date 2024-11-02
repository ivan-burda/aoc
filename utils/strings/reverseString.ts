export const reverseString = (input: string): string => {
    if (input.length === 1) {
        return input[0]
    }
    return reverseString(input.slice(1, input.length)) + input[0]
}