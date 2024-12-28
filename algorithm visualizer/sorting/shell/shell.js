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

function shell() {
    shell_play();
}

// *** PLAY FUNCTIONS FOR OPERATION ***

// plays the algorithm
function shell_play()  {
    if (!function_running) {
        function_running=true;
        const moves = shell_sort([...array]);
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

    [array[i], array[j]] = [array[j], array[i]];

    show_bars([i, j]); // Highlight the swapped bars
    setTimeout(() => animate(moves), 15);
}


// *** SORTING FUNCTIONS ***
function shell_sort(array) {
    const moves = [];

    for (let gap = Math.floor(array.length/2); gap > 0; gap = Math.floor(gap/2))
        for (let i = gap; i < array.length; ++i) {
            let tmp = array[i];
            let j = i;

            for (; j >= gap && tmp < array[j - gap]; j -= gap) {
                moves.push([j, j - gap]);
                array[j] = array[j - gap];
            }
            array[j] = tmp;
        }

    return moves;
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