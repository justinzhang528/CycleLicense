import imageCounts from '@/json/imageData.json'

export default function () {
    const signCounts = imageCounts.signImageCounts
    const ruleCounts = imageCounts.ruleImageCounts
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

    const getBookmarkedItems = (type: string)=>{
        const str = localStorage.getItem(type);
        if(str === null || str === 'NaN' || str === '')
            return [];
        return (str || '{}').split(',').map(Number);
    }

    // generate shuffle order numbers ranging from 1~range
    const generateShuffleOrderNumbers = (range: number): number[] => {
        // Initialize array with numbers from 1 to n
        const numbers = Array.from({ length: range }, (_, index) => index + 1);

        // Fisher-Yates shuffle algorithm
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        return numbers;
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

    const generateMultipleChoiceProblems = (problemCounts: number, totalCounts: number) => {
        let result = [];
        const shuffleOrderNumbers = generateShuffleOrderNumbers(problemCounts);

        for(const [index, element] of shuffleOrderNumbers.entries()){

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
            result.push(json);
        }
        return result;
    }

    const generateTrueFalseProblem = (problemCounts: number, totalCounts: number) => {
        let result = [];
        const shuffleOrderNumbers = generateShuffleOrderNumbers(problemCounts);

        for(const [index, element] of shuffleOrderNumbers.entries()){

            let choiceArray = generateRandomNumbers(totalCounts, element, 2);
            const json = {
                sn: index,
                question: handleZeroPad(element, 3),
                trueFalse: handleZeroPad(choiceArray[0], 3),
                ans: choiceArray[0] === element ? 1 : 0
            }
            result.push(json);
        }
        return result;
    }

    const getProblems  = (type: string)=>{
        return JSON.parse(localStorage.getItem(type) || '{}');
    }

    const getChooseAns = (type: string)=>{
        return (localStorage.getItem(type)  || '{}').split(',').map(Number)
    }

    const getTotalScore = (problemType: string, chooseAnsType: string) => {
        let score = 0;
        let n = 0;
        for (const problem of getProblems(problemType)) {
            if(problem.ans === getChooseAns(chooseAnsType)[n]){
                score += 1;
            }
            n += 1;
        }
        return score;
    }

    return {
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
    }
}