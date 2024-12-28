const n=100; const array=[];
let function_running = false

// called init so when user refreshes the page, the visualizer will be initialized
init();

// *** THE FOLLOWING CODE IS FOR ADDING SOUND IF I WANT THE SOUND. Using the WebAudioApi btw.***
/* let audioCtx = null;

play_note = () => {
    if (audioCtx == null) {
        audioCtx = new (
            AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext
        )();
    }
    const duration = 0.1;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime+duration);
    const node=audioCtx.createGain();
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(
        0, audioCtx.currentTime=duration);
    osc.connect(node);
    node.connect(audioCtx.destination);
}
*/

// initializing the bars and array
function init() {
    if(function_running)
        myalert()
    else {
        // loading array with random numbers
        for (let i=0; i<n; i++)
            array[i] = Math.random();
        show_bars();
        function_running=false;
    }
}

// *** MAIN CALLER FUNCTION FOR USER INTERACTION ***

function quick() {
    quick_play();
}

// *** PLAY FUNCTIONS FOR OPERATION ***

// plays the algorithm
function quick_play()  {
    if (!function_running) {
        function_running=true;
        const moves = quick_sort([...array]);
        animate(moves);
    }
    else {
        myalert();
    }
}

// recursive animate function
function animate(moves) {
    if (moves.length === 0) {
        show_bars(); // Final state
        function_running = false;
        return;
    }

    const [i, j] = moves.shift(); // Get the next swap
    array[i] = j;
    show_bars([i],[p]); // Highlight the swapped bars
    setTimeout(() => animate(moves), 15);
}


// *** SORTING FUNCTIONS ***
function quick_sort(array) {
    const moves = [];
    quick_sort_recursive(array, 0, array.length - 1, moves);
    return moves;
}

function quick_sort_recursive(array, left, right, moves) {
    if (left >= right) return;

    const pivotIndex = partition(array, left, right, moves);
    p = pivotIndex;

    // Recursively sort the left and right partitions
    quick_sort_recursive(array, left, pivotIndex - 1, moves);
    quick_sort_recursive(array, pivotIndex + 1, right, moves);
}

function partition(array, left, right, moves) {
    const pivot = array[right]; // Choose the rightmost element as pivot
    let i = left - 1;

    for (let j = left; j < right; ++j) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            moves.push([i, array[i]]);
            moves.push([j, array[j]]);
        }
    }

    // Place the pivot in its correct position
    [array[i + 1], array[right]] = [array[right], array[i + 1]];
    moves.push([i + 1, array[i + 1]]);
    moves.push([right, array[right]]);

    return i + 1; // Return the pivot's final position
}


function show_bars(indices /*, pivotIndex*/) {
    const bar_container = document.querySelector(".bar_container");
    bar_container.innerHTML="";

    // creating the bars for the algoritm visualizers
    for (let i=0; i<array.length; i++) {
        const bar=document.createElement("div");
        bar.style.height = array[i]*100+"%";
        bar.classList.add("bar");
        
        // loop to make the bar red when being sorted and blue if it isn't being sorted
        if (indices && indices.includes(i)) {
            bar.style.backgroundColor='#5e63ff';
        }

        /*if(pivotIndex && pivotIndex.includes(i)) {
            bar.style.backgroundColor='#0008ff';
        }*/

        bar_container.appendChild(bar);
    }
}

function myalert() {
    return window.alert("Sorting Algorithm still active. Please wait.");
}










// ***FUNCTIONS AND VARIABLES FOR THE SIDEBAR INTERACTIVITY***

const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

function toggleSubMenu(button) {
    button.nextElementSibling.classList.toggle('show');
    button.classList.toggle('rotate');

    if(sidebar.classList.contains('close')) {
        sidebar.classList.toggle('close');
        toggleButton.classList.toggle('rotate');
    }
}

function toggleSidebar() {
    sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');

    closeAllSubMenus();
}

function closeAllSubMenus() {
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show');
        ul.previousElementSibling.classList.remove('rotate');
    })
}