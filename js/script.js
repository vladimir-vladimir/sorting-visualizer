const COUNT = 100;
const sortingVisualizer = document.querySelector("#sorting-visualizer");
const numbers = Array.from({length: COUNT}, (_, i) => i + 1);
let timeBetweenSteps = 10, i, j;

shuffleArray(numbers);
drawAllRectangles(numbers);

const stepButton = document.createElement("button");
stepButton.innerText = "Bubble Sort";
stepButton.addEventListener("click", () => {
    i=0, j=0;
    bubbleSort(numbers);

});
document.getElementById("buttons").append(stepButton);

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

function delay(milliseconds) {
    const date = Date.now();
    while(Date.now() - date < milliseconds) {}
}


function bubbleSortStep(array) {
    if (i==array.length-1) {
        return;
    }
    if (j==array.length-i-1) {
        j=0;
        i++;
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



