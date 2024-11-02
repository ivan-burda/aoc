export const getMissingNumber = (arr: number[]): number | undefined => {
    const sorted = arr.sort((a, b) => a - b);
    let missing;

    for (let i = 0; i < sorted.length; i++) {
        if (sorted[i] !== i) {
            missing = i;
            break;
        }
    }

    return missing
}