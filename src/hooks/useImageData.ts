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

    return {
        signImageCounts,
        ruleImageCounts,
        getImagePath,
        handleZeroPad,
        addOrRemoveFromArray,
        getBookmarkedItems,
    }
}