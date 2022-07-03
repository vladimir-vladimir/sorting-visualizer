const COUNT = 128;
const sortingVisualizer = document.querySelector("#sorting-visualizer");
const numbers = Array.from({length: COUNT}, (_, i) => i + 1);
let tempNumbers = Array(numbers.length);
let timeBetweenSteps = 25, i, j, l, lt, rt, step, idx;
let startPressed = false;

shuffleArray(numbers);
drawAllRectangles(numbers);

const bubbleSortButton = document.createElement("button");
bubbleSortButton.innerText = "Bubble Sort";
bubbleSortButton.addEventListener("click", () => {
    if (startPressed) {
        return;
    }
    startPressed = true;
    i=0, j=0;
    bubbleSort(numbers);
});
document.getElementById("buttons").append(bubbleSortButton);

const mergeSortButton = document.createElement("button");
mergeSortButton.innerText = "Merge Sort";
mergeSortButton.addEventListener("click", () => {
    if (startPressed) {
        return;
    }
    startPressed = true;
    step=1, l=0, idx=-1;
    mergeSort(numbers, 0, numbers.length-1);
});
document.getElementById("buttons").append(mergeSortButton);

const refreshButton = document.createElement("button");
refreshButton.innerText = "Refresh";
refreshButton.addEventListener("click", () => {
    location.reload();
});
document.getElementById("buttons").append(refreshButton);

function createRectangle(value, maxValue, width, id, parentElement) {
    const rectangle = document.createElement("div");
    rectangle.id = `${id}`;
    parentElement.append(rectangle);
    rectangle.classList.add("rectangle");
    const height = parentElement.offsetHeight*0.999/maxValue*value;
    rectangle.style.height = height + "px";
    rectangle.style.width = width + "px";
}

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function drawAllRectangles(array) {
    sortingVisualizer.innerHTML = "";
    document.getElementById("buttons").style.height = "20px";
    sortingVisualizer.style.height = document.getElementById("sort").offsetHeight -
        document.getElementById("buttons").offsetHeight + "px";
        sortingVisualizer.style.width = document.getElementById("sort").offsetWidth + "px";
    const WIDTH = sortingVisualizer.offsetWidth*0.9/COUNT;
    for (let i=0; i<COUNT; i++) {
        createRectangle(numbers[i], COUNT, WIDTH, i, sortingVisualizer);
    }
}

function shuffleArray(array) {
    const len = array.length;
    for (let i=0; i<len-1; i++) {
        const idx = Math.floor(Math.random()*(len-1-i));
        swap(array, idx, len-1-i);
    }
}

function bubbleSortStep(array) {
    if (j==array.length-i-1) {
        j=0;
        i++;
    }
    if (i==array.length-1) {
        return;
    }
    if (array[j] > array[j+1]) {
        swap(array, j, j+1);
        let temp = document.getElementById(`${j}`).style.height;
        document.getElementById(`${j}`).style.height = document.getElementById(`${j+1}`).style.height;
        document.getElementById(`${j+1}`).style.height = temp;
    }
    j++;
}

function bubbleSort(array) {
    bubbleSortStep(array);
    timer = setTimeout(() => {bubbleSort(array);}, timeBetweenSteps);
    if (i==array.length-1) {
        clearTimeout(timer);
    }
}

// Spaghetti code that allows for a smooth transition at each step of merge sort
function merge(array, left, right) {
    if (l >=right) {
        l=left;
        step*=2;
    }
    if (step>right-left) {
        return;
    }
    let m = (l+step-1>right) ? right:l+step-1;
    let r = (l+2*step-1>right) ? right:l+2*step-1;
 
    if (idx==-1) {
        idx=l;
        lt=l; 
        rt=m+1;
        for (let i=l; i<r+1; i++) {
            tempNumbers[i] = array[i];
        }
    }
    if (idx>r) {
        idx=-1;
        l += 2*step;
    } else {
        if (lt<=m && (rt>r || tempNumbers[lt]<array[rt])) {
            array[idx] = tempNumbers[lt];
            lt++;
        } else {
            array[idx] = tempNumbers[rt];
            rt++;
        }
        document.getElementById(`${idx}`).style.height = sortingVisualizer.offsetHeight*0.999/COUNT*array[idx]+"px";
        idx++;
    }
}

function mergeSort(array, left, right) {
    merge(array, left, right);
    timer = setTimeout(() => {mergeSort(array, left, right);}, timeBetweenSteps);
    if (step > right-left) {
        clearTimeout(timer);
    }
}

function mergeStep(array, left, mid, right) {
    let tempArr = Array(right-left+1), lt = 0, rt = mid-left+1;
    for (let it=0; it<right-left+1; it++) {
        tempArr[it] = array[it+left];
    }
    for (let it=left; it<=right; it++) {
        if (lt<=mid-left && (rt>right-left || tempArr[lt]<tempArr[rt])) {
            array[it] = tempArr[lt];
            lt++;
        } else {
            array[it] = tempArr[rt];
            rt++;
        }
        document.getElementById(`${it}`).style.height = sortingVisualizer.offsetHeight*0.999/COUNT*array[it]+"px";
    }
}  
