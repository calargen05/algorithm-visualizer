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
            array[i] = Math.floor(Math.random()*100);
        show_bars();
        function_running=false;
    }
}

// *** MAIN CALLER FUNCTION FOR USER INTERACTION ***

function radix() {
    radix_play();
}

// *** PLAY FUNCTIONS FOR OPERATION ***

// plays the algorithm
function radix_play() {
    if (!function_running) {
        function_running = true;
        const moves = [];
        radix_sort([...array], moves, () => animate(moves));
    } else {
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

    const [i, j] = moves.shift(); // Get the next move

    array[j] = array[i]

    show_bars([i, j]); // Highlight the moved bars
    setTimeout(() => animate(moves), 15); // Adjust delay for smoother animation
}



// *** SORTING FUNCTIONS ***
function radix_sort(array, moves, callback) {
    const max = getMax(array);
    let exp = 1;

    function processStep() {
        if (exp <= max) {
            console.log('countSort')
            countSort(array, array.length, exp, moves);
            exp *= 10;
            setTimeout(processStep, 0); // Yield control after each pass
        } else {
            callback(); // Start animation after sorting completes
        }
    }

    processStep(); // Start the sorting process
}

function getMax(array) {
    let mx = array[0];
    for (let i=1; i < array.length; i++)
        if (array[i] > mx)
            mx = array[i];
    return mx;
}

function countSort(array, n, exp, moves) {
    let output = new Array(n).fill(0);
    let count = new Array(10).fill(0);

    // Count occurrences of digits
    for (let i = 0; i < n; i++) {
        const index = Math.floor(array[i] / exp);
        count[index % 10] += 1;
    }

    // Update count[] so it contains actual positions in the output array
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    let i = n-1;
    while (i >= 0) {
        const index = Math.floor(array[i] / exp);
        output[count[index % 10] - 1] = array[i];
        moves.push([i, count[index % 10] - 1]);
        count[index % 10] -= 1;
        i -= 1;
    }

    // Copy sorted elements back to the original array and record moves
    for (let i = 0; i < n; i++) {
        moves.push([i, i]);
        array[i] = output[i];
        console.log(array[i]+'  '+i);
    }
}



function show_bars(indices /*, pivotIndex*/) {
    const bar_container = document.querySelector(".bar_container");
    bar_container.innerHTML="";

    // creating the bars for the algoritm visualizers
    for (let i=0; i<array.length; i++) {
        const bar=document.createElement("div");
        bar.style.height = array[i]*1+"%";
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