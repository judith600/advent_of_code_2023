import { getLinesSplitBy as getLinesOfFileSplitBy } from "./01";

const lines: string[] = getLinesOfFileSplitBy('02');

const setsRegex = /(Game (?<game>\d+))*(:|;)(?<sets>( (?<number>\d+) (?<color>blue|red|green),?){0,3})*/g
const numberColorRegex = / ((?<number>\d+) (?<color>blue|red|green),?)*/g

const limits = {
    red: 12,
    green: 13,
    blue: 14
}

function partOne() {
    const impossibleGameNumbers = new Set([])
    for (const line of lines) {
        const result = [...line.matchAll(setsRegex)]
        const gameNumber = result[0].groups.game
        const sets = result.map(elem => elem.groups.sets)

        for (const set of sets) {
            const colorCombinations = [...set.matchAll(numberColorRegex)].map(elem => elem.groups);
            colorCombinations.forEach(combination => {
                if (combination['number'] > limits[combination['color']]) {
                    impossibleGameNumbers.add(Number(gameNumber))
                }
            })
        }
    }
    console.log(impossibleGameNumbers)
    const result = (lines.length * (lines.length + 1)) / 2 - Array.from(impossibleGameNumbers).reduce((a, b) => a + b, 0)
    return result
}

class CubeMatrix  {
    red: number = 0;
    green: number = 0;
    blue: number = 0
}

function partTwo(lines: string[]) {
    const matrixCollection = new Array();

    for (const line of lines) {
        const result = [...line.matchAll(setsRegex)]
        const matrix = new CubeMatrix();
        const sets = result.map(elem => elem.groups.sets)

        for (const set of sets) {
            const colorCombinations = [...set.matchAll(numberColorRegex)].map(elem => elem.groups);
            colorCombinations.forEach(combination => {
                const currentValue = matrix[combination.color]
                if (currentValue < combination.number) {
                    matrix[combination.color] = Number(combination.number)
                }
            })
        }
        // console.log(matrix)
        matrixCollection.push(matrix.blue * matrix.green * matrix.red)
    }
    console.log(matrixCollection)
    const result = matrixCollection.reduce((a,b) => a+ b)
    return result
}

const input: string[] = getLinesOfFileSplitBy('02');

console.log(partTwo(input))
