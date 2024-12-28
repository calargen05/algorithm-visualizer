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

function heap() {
    heap_play();
}

// *** PLAY FUNCTIONS FOR OPERATION ***

// plays the algorithm
function heap_play()  {
    if (!function_running) {
        function_running=true;
        const moves = heap_sort([...array]);
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
    [array[i], array[j]] = [array[j], array[i]]; // Swap the elements

    show_bars([i, j]); // Highlight the swapped bars
    setTimeout(() => animate(moves), 15);
}


// *** SORTING FUNCTIONS ***
function heap_sort(array) {
    const moves = [];
    const len = array.length;

    // Build max heap
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
        heapify(array, len, i, moves);
    }

    // Extract elements from the heap
    for (let i = len - 1; i > 0; i--) {
        // Move current root to the end
        moves.push([0, i]); // Animation move
        [array[0], array[i]] = [array[i], array[0]];

        // Call heapify on the reduced heap
        heapify(array, i, 0, moves);
    }

    return moves;
}

function heapify(array, len = array.length, i, moves) {
    let largest = i; // Initialize largest as root
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // If left child is larger than root
    if (left < len && array[left] > array[largest]) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < len && array[right] > array[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest !== i) {
        moves.push([i, largest]); // Animation move
        [array[i], array[largest]] = [array[largest], array[i]];

        // Recursively heapify the affected sub-tree
        heapify(array, len, largest, moves);
    }
}

function show_bars(indices) {
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