
const availableCubes:Record<string, number> = {
    red: 12,
    green: 13,
    blue: 14
}

export const getSumOfRange = (upTo:number):number => {
    let sum = 0;
    for (let i = 0; i <=upTo; i++) {
        sum+=i;
    }
    return sum
}

const getGamesRepresentation = (input:string) => {
    return input.split('\n').map((line) => {
        const [,drawCubes] = line.split(': ')
        return drawCubes.split('; ').map(draw=> {
            return draw.split(', ').map(colorAndCount=>{
                const [count, color] = colorAndCount.split(' ');
                return({color, count})
            });
        })
    })

}


export const possibleGameIdsSum = (input:string):number => {
    const impossibleGameIndices = new Set<number>();

    const games = getGamesRepresentation(input);
    games.forEach(((game,index)=>game.forEach(draw=>draw.forEach(colorAndCount=>{
        const {color, count} = colorAndCount;
        if(Number(count) > availableCubes[color]){
            impossibleGameIndices.add(index+1)
        }
    }))))

    return getSumOfRange(games.length) - Array.from(impossibleGameIndices).reduce((sum, currentNumber)=>sum + currentNumber, 0);
}

export const sumPowerOfCubeSetsForGames = (input:string):number => {
    let sum = 0;
    const games = getGamesRepresentation(input);

    games.forEach(game=>{
        const minReq:Record<string, number> = {};
        game.forEach(draw=>{
            draw.forEach(colorCount=>{
                if(!(colorCount.color in minReq)){
                    minReq[colorCount.color]=Number(colorCount.count)
                }
                if(colorCount.color in minReq && Number(colorCount.count) > minReq[colorCount.color]){
                    minReq[colorCount.color] = Number(colorCount.count);
                }
            })
        })
        sum += Object.values(minReq).reduce((acc, cur)=>acc * cur, 1);;
    })

    return sum;
}