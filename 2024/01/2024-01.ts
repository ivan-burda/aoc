const getSortedRows = (input:string) => {
    return input
        .split('\n')
        .reduce<[number[], number[]]>((acc, curr)=>{
            const [num1,num2] = curr
                .split(' ')
                .filter(item=>item!=="")
                .map(item=>Number(item));
            acc[0].push(num1)
            acc[1].push(num2)
            return acc;
        },[[],[]])
        .map(row=>row.sort((a,b)=>a-b));
}

export const getTotalDistance = (input:string):number=> {
    const [numberRow1, numberRow2] = getSortedRows(input);

    return numberRow1.reduce((acc,curr,currentIndex)=>{
        acc+=Math.abs(curr-numberRow2[currentIndex])
        return acc
    },0)
}


export const getSimilarityScore = (input:string):number => {
    const [numberRow1, numberRow2] = getSortedRows(input);
    const row2NumberOccurrenceCount = numberRow2.reduce<Record<string,number>>((acc,curr)=>{
        if(!acc[curr]){
            acc[curr]=1;
        }else{
            acc[curr] +=1;
        }
        return acc
    },{})

    return numberRow1.reduce((acc,curr)=>{
        acc += curr*(row2NumberOccurrenceCount[curr] ?? 0)
        return acc;
    },0)
}