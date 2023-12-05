import { readFileSync } from "fs";

const testInput = ["two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen"];

const numberWords = /(?=(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)|(\d))/g

const numberMapping = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}

function getCalibrationValues(input: Array<string>): number {
    let result = 0;
    const calibrationValues = [];
    for (const elem of input) {
        const matches = Array.from(elem.matchAll(numberWords))
            .map(arr => arr.filter(e => e))
            .flatMap(e => e)
            .map(elem => Number(elem) ? elem : numberMapping[elem])
        const calibration = matches[0] + matches[matches.length - 1];
        calibrationValues.push(calibration)
        result += Number(calibration)
    }
    return result
}

export function getLinesSplitBy(fileName: string, delimiter: string = '\r\n'): string[] {
    const input = readFileSync('./resources/' + fileName, "utf-8");
    return input.split(delimiter)
}


console.log(getCalibrationValues(getLinesSplitBy('01', '\r\n')))



