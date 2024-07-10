export function getCalibrationValueSum(input:string){
    return input.split("\n")
        .map(line=>line.replace(/\D/g, ''))
        .map(digitSequence => Number(digitSequence[0]+digitSequence[digitSequence.length-1]))
        .reduce((sum, currentNumber)=>sum+currentNumber,0)
}