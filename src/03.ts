import { getLinesSplitBy as getLinesOfFileSplitBy } from "./01";

function isSpecialSign(char: string): boolean {
    return char.match(/[^\.\d]/g) !== null
}

function hasSpecialNeighbours(content: string[][], lineIndex: number, startIndex: number, endIndex: number) {
    const rightNext = endIndex === undefined ? undefined : endIndex + 1;
    const rightie = endIndex === undefined ? undefined : content[lineIndex][endIndex];

    const leftie = content[lineIndex][startIndex - 1];

    const previousLine = content[lineIndex - 1]?.slice(Math.max(0, startIndex - 1), rightNext)
    const followingLine = content[lineIndex + 1]?.slice(Math.max(0, startIndex - 1), rightNext)

    const neighbours = [leftie, rightie].concat(previousLine).concat(followingLine).filter(e => !!e)
    for (const n of neighbours) {
        if (isSpecialSign(n)) {
            return true
        }
    }
}


const input: string[] = getLinesOfFileSplitBy('03');
const lines = input.map(l => [...l])

let result = 0

for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        const current = lines[i][j];
        if (Number(current)) {
            const afterNumberIndex = lines[i].slice(j).findIndex(e => e.match(/[^\d]/g))
            const afterNumber = afterNumberIndex !== -1 ? afterNumberIndex + j : undefined

            const currentNumber=  Number(lines[i].slice(j, afterNumber).reduce((a,b) => a.concat(b)))
            if (hasSpecialNeighbours(lines, i, j, afterNumber)) {
                result += currentNumber
            } else {
                console.log(`No neighbour :/ for ${currentNumber} | index: ${i}|${j}`)
                console.log()
            }
            j = afterNumber
        }
    }
}

console.log("result:" + result)
