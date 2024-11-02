interface PartLocation  {
    part: string;
    locations: string[]
}

export const getPartsNumber = (input: string) => {
    const partLocations: PartLocation[] = [];
    const symbolLocations: Record<string, string> = {};

    input.split('\n').forEach((line, index) => {
        const numbers = line.match(/\d+/g) ?? [];
        numbers.forEach((number)=>{
            const locs = [];
            const startsAt = line.indexOf(number);
            const endsAt = startsAt + number.length;
            partLocations.push({
                part: number,
                locations: []
            })
        })
    })
}





const partLocations = [
    {part: '467', locations: ['0-0', '0-1', '0-2']},
    {part: '114', locations: ['0-5', '0-6', '0-7']},
    {part: '35', locations: ['2-2', '2-3']}
    ]

const symbolLocations =
    {
        '1-4': '*',
        '3-6': '#',
        '4-3': '*',
    }

const isPartAdjacentToSymbol = () => {
    //467
    const adjacentLocations = ['0-3', '1-0','1-1', '1-2', '1-3']
    //35
    const adjacentLocations2 = ['1-1','1-2', '1-3', '1-4', '2-1', '2-4', '3-1','3-2','3-3','3-4']
}

/*
part1
get all part locations
get all symbol locations

for each part
-list all possible adjacent locations
-for each adjacent location check if it is in "symbolLocations"
--yes: add the part name (number) to the total

return total
 */

/*
part2
Is a gear?
Keep in "symbolLocations" only *, create an array such as const gearLocations ['1-4', '4-3', etc.]


-for each gearLocations


 */

const getPartsWithLocations = (line:string) => {

}

console.log(getPartsWithLocations("..35..633.35"))