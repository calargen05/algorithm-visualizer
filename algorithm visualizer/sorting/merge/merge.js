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

function merge() {
    merge_play();
}

// *** PLAY FUNCTIONS FOR OPERATION ***

// plays the algorithm
function merge_play()  {
    if (!function_running) {
        function_running=true;
        const moves = merge_sort([...array]);
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

    show_bars([i]); // Highlight the swapped bars
    setTimeout(() => animate(moves), 15);
    console.log('animated');
}


// *** SORTING FUNCTIONS ***
function merge_sort(array) {
    const moves = [];
    const tmp = [];
    merge_internal(array, tmp, 0, array.length-1, moves);
    return moves;
}

function merge_internal(array, tmp, left, right, moves) {
    if (left < right) {
        const center = Math.floor((left + right)/2);
        merge_internal(array, tmp, left, center, moves);
        merge_internal(array, tmp, center+1, right, moves);
        merge_compare(array, tmp, left, center+1, right, moves);
    }
}

function merge_compare(array, tmp, left, right, right_end, moves) {
    const left_end = right-1;
    tmp_pos = left;
    num_elements = right_end - left+1;

    while (left <= left_end && right <= right_end) {
        if (array[left] <= array[right]) {
            tmp[tmp_pos++] = array[left++];
        }
        else {
            tmp[tmp_pos++] = array[right++];
        }
    }

    // copy the rest of the first half
    while (left <= left_end) {
        tmp[tmp_pos++] = array[left++];
    }

    // copy the rest of the right half
    while (right <= right_end) {
        tmp[tmp_pos++] = array[right++];
    }

    // copy tmp back
    for (let i=0; i<num_elements; ++i, --right_end) {
        array[right_end] = tmp[right_end];
        moves.push([right_end, tmp[right_end]]);
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