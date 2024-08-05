
const availableCubes:Record<string, number> = {
    red: 12,
    green: 13,
    blue: 14
}

export const getSum = (upTo:number):number => {
    let sum = 0;
    for (let i = 0; i <=upTo; i++) {
        sum+=i;
    }
    return sum
}

export const possibleGameIdsSum = (input:string) => {
    const impossibleGameIndices = new Set<number>();

   const games = input.split('\n').map((line) => {
        const [,drawCubes] = line.split(': ')
        return drawCubes.split('; ').map(draw=> {
            return draw.split(', ').map(colorAndCount=>{
               const [count, color] = colorAndCount.split(' ');
                return({color, count})
            });
        })
    })

    games.forEach(((game,index)=>game.forEach(draw=>draw.forEach(colorAndCount=>{
        const {color, count} = colorAndCount;
        if(Number(count) > availableCubes[color]){
            impossibleGameIndices.add(index+1)
        }
    }))))

    return getSum(games.length) - Array.from(impossibleGameIndices).reduce((sum, currentNumber)=>sum + currentNumber, 0);
}