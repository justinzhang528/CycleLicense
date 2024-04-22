import imageCounts from '@/json/imageData.json'

export default function () {
    const signImageCounts = imageCounts.signImageCounts
    const ruleImageCounts = imageCounts.ruleImageCounts
    const getImagePath = (type: string, fileName: string, postFix: string = "") => {
        return "./public/images/" + type + "/" + fileName + postFix + ".png";
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

    // generate a random array of 4 numbers, ranging from 0 to 'count', 'exist' must exist in array
    const generateRandomArray = (count: number, exist: number) => {
        let array = Array.from({length: count}, (_, i) => i + 1);
        const existIndex = array.indexOf(exist);
        array.splice(existIndex, 1);
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        array.splice(Math.floor(Math.random() * 3), 0, exist);
        return array.slice(0, 4);
    }

    const generateChoiceProblems = (problemCounts: number, totalCounts: number, type: string) => {
        let result = [];
        const mainDir = "./public/images/";

        for(let i = 1; i <= problemCounts; i++){

            let choiceArray = generateRandomArray(totalCounts, i);
            const json = {
                sn: i,
                questionPath: mainDir + type + "/" + handleZeroPad(i, 3) + 'Q.png',
                choice1Path: mainDir + type + "/" + handleZeroPad(choiceArray[0], 3) + 'A.png',
                choice2Path: mainDir + type + "/" + handleZeroPad(choiceArray[1], 3) + 'A.png',
                choice3Path: mainDir + type + "/" + handleZeroPad(choiceArray[2], 3) + 'A.png',
                choice4Path: mainDir + type + "/" + handleZeroPad(choiceArray[3], 3) + 'A.png',
                ans: choiceArray.indexOf(i) + 1
            }
            result.push(json);
        }
        return result;
    }

    return {
        signImageCounts,
        ruleImageCounts,
        getImagePath,
        handleZeroPad,
        addOrRemoveFromArray,
        getBookmarkedItems,
        generateChoiceProblems,
    }
}