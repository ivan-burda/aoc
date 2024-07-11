export function getCalibrationValueSum(input:string){
    return input.split("\n")
        .map(line=>line.replace(/\D/g, ''))
        .map(digitSequence => Number(digitSequence[0]+digitSequence[digitSequence.length-1]))
        .reduce((sum, currentNumber)=>sum+currentNumber,0)
}

const wordsToNumbers:Record<string, number> = {one:1, two:2, three:3, four:4, five: 5, six:6, seven:7, eight:8, nine: 9};
const mainNumbers: number[] = [];

const getAllIndices = (line:string, word:string):number[] => {
    const indices = [];
    let startIndex = 0;

    while ((startIndex = line.indexOf(word, startIndex)) !== -1) {
        indices.push(startIndex);
        startIndex += word.length;
    }

    return indices;
}

export function getCalibrationValueSum2(input:string){
input.split('\n').forEach((line, index) => {
    const locatedNumbers:{number: number, position: number}[] = [];

    for (const word of Object.keys(wordsToNumbers)) {
        const indices = getAllIndices(line, word);
        indices.forEach(index => locatedNumbers.push({number: wordsToNumbers[word], position: index}));
    }
    for (const number of Object.values(wordsToNumbers)) {
        const indices = getAllIndices(line, number.toString());
        indices.forEach(index => locatedNumbers.push({number: Number(number), position: index}));
    }

    const orderLineNumbers = locatedNumbers
        .sort((a,b)=>a.position - b.position).map(locatedNumber=>locatedNumber.number)

    if(orderLineNumbers.length){
    mainNumbers.push(Number(orderLineNumbers[0].toString() + orderLineNumbers[orderLineNumbers.length-1].toString()))
    }


})

    return mainNumbers.reduce((sum, currentNumber)=>sum + currentNumber, 0);
}