export const getFactorial = (number: number): number => {
    if (number === 1) {
        return 1;
    } else {
        const factorial = getFactorial(number - 1)
        return number * factorial
    }

}