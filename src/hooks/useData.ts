import dataSource from '@/json/dataSource.json'
import {ref} from "vue";

export default function () {
    const DEFAULT_PROBLEM_COUNT = 10
    const INCREMENT_PROBLEM_COUNT = 5
    const DEFAULT_LIFE = 5
    const DEFAULT_LIFE_INCREASE_INTERVAL = 1000 * 60 * 60 // in milliseconds
    const DEFAULT_UNLIMITED_VALID_TIME = 1000 * 60 * 60 * 24 * 365 // in milliseconds
    const life = ref({"totalLife": DEFAULT_LIFE,"currentLife": localStorage.getItem('currentLife') ? Number(localStorage.getItem('currentLife')) : DEFAULT_LIFE})
    const signCounts = dataSource.signs.length
    const ruleCounts = dataSource.rules.length
    const getImagePath = (type: string, fileName: string, postFix: string = "") => {
        return "images/" + type + "/" + fileName + postFix + ".png";
    }

    const handleZeroPad = (num: number, places: number) => {
        return String(num).padStart(places, '0');
    }

    const addOrRemoveFromArray = (arr: number[], n: number) => {
        const index = arr.indexOf(n);
        if (index === -1) {
            // If n is not in the array, add it
            arr.push(n);
        } else {
            // If n is in the array, remove it
            arr.splice(index, 1);
        }
        return arr;
    }

    const getBookmarkedItems = (type: string) => {
        const str: string | null = localStorage.getItem(type);
        if (str === null || str === 'NaN' || str === '')
            return [];
        const res: number[] = (str || '{}').split(',').map(Number);
        return res.sort((a, b) => a - b);
    }

    // generates an array of unrepeated random numbers ranging from 1 to the specified 'range', with a length of 'count':
    function generateUniqueRandomNumbers(range: number, count: number): number[] {
        if (count > range) {
            throw new Error("Count cannot be greater than range.");
        }

        const numbers: number[] = [];
        for (let i = 1; i <= range; i++) {
            numbers.push(i);
        }

        const result: number[] = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            const randomNumber = numbers[randomIndex];
            result.push(randomNumber);
            numbers.splice(randomIndex, 1);
        }

        return result;
    }

    // generate a random array of 4 numbers, ranging from 0 to 'count', 'exist' must exist in array
    const generateRandomNumbers = (totalCounts: number, exist: number, count: number) => {
        let array = Array.from({length: totalCounts}, (_, i) => i + 1);
        const existIndex = array.indexOf(exist);
        array.splice(existIndex, 1);
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        array.splice(Math.floor(Math.random() * 3), 0, exist);
        return array.slice(0, count);
    }

    const generateMultipleChoiceProblems = (problemCounts: number, totalCounts: number, type: string) => {
        let result = [];
        const shuffleOrderNumbers = generateUniqueRandomNumbers(totalCounts, problemCounts);

        for (const [index, element] of shuffleOrderNumbers.entries()) {

            let choiceArray = generateRandomNumbers(totalCounts, element, 4);
            const json = {
                sn: index,
                question: handleZeroPad(element, 3),
                choice1: handleZeroPad(choiceArray[0], 3),
                choice2: handleZeroPad(choiceArray[1], 3),
                choice3: handleZeroPad(choiceArray[2], 3),
                choice4: handleZeroPad(choiceArray[3], 3),
                ans: choiceArray.indexOf(element) + 1
            }
            result.push({'type': type, 'data': json});
        }
        return result;
    }

    const generateTrueFalseProblem = (problemCounts: number, totalCounts: number, type: string) => {
        let result = [];
        const shuffleOrderNumbers = generateUniqueRandomNumbers(totalCounts, problemCounts);

        for (const [index, element] of shuffleOrderNumbers.entries()) {

            let choiceArray = generateRandomNumbers(totalCounts, element, 2);
            const json = {
                sn: index,
                question: handleZeroPad(element, 3),
                trueFalse: handleZeroPad(choiceArray[0], 3),
                ans: choiceArray[0] === element ? 1 : 0
            }
            result.push({'type': type, 'data': json});
        }
        return result;
    }

    const getProblems = (type: string) => {
        return JSON.parse(localStorage.getItem(type) || '{}');
    }

    const getChooseAns = (type: string) => {
        return (localStorage.getItem(type) || '{}').split(',').map(Number)
    }

    const getTotalScore = (problemType: string, chooseAnsType: string) => {
        let score = 0;
        let n = 0;
        for (const problem of getProblems(problemType)) {
            if (problem.data.ans === getChooseAns(chooseAnsType)[n]) {
                score += 1;
            }
            n += 1;
        }
        return score;
    }

    function isInteger(input: any): boolean {
        // Regular expression to match integer numbers
        const integerRegex = /^-?\d+$/;

        // Check if the input string matches the integer regular expression
        return integerRegex.test(input);
    }

    return {
        DEFAULT_PROBLEM_COUNT,
        INCREMENT_PROBLEM_COUNT,
        DEFAULT_LIFE,
        DEFAULT_LIFE_INCREASE_INTERVAL,
        DEFAULT_UNLIMITED_VALID_TIME,
        life,
        signCounts,
        ruleCounts,
        getImagePath,
        handleZeroPad,
        addOrRemoveFromArray,
        getBookmarkedItems,
        generateMultipleChoiceProblems,
        generateTrueFalseProblem,
        getProblems,
        getChooseAns,
        getTotalScore,
        isInteger,
    }
}