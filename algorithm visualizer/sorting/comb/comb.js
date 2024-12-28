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

function comb() {
    comb_play();
}

// *** PLAY FUNCTIONS FOR OPERATION ***

// plays the algorithm
function comb_play()  {
    if (!function_running) {
        function_running=true;
        const moves = comb_sort([...array]);
        animate(moves);
    }
    else {
        myalert();
    }
}

// recursive animate function
function animate(moves) {
    if (moves.length == 0) {
        show_bars();
        function_running = false;
        return;
    }
    const [i,j] = moves.shift(0);
    
    [array[i], array[j]] = [array[j], array[i]];
    

    /* for audio:
    play_note(200+array[i]*500);
    play_note(200+array[j]*500);
    */
    show_bars([i,j]);
    setTimeout(function() {
        animate(moves), 15});
}


// *** SORTING FUNCTION ***
function comb_sort(array) {
    const moves=[];
    
    let n = array.length;
    let gap = n;

    let swapped = true;

    while (gap != 1 || swapped == true) {
        gap = get_next_gap(gap);
        swapped = false;

        for (let i = 0; i < n-gap; i++) {
            if (array[i] > array[i+gap]) {
                let temp = array[i];
                array[i] = array[i+gap];
                array[i+gap] = temp;
                moves.push([i,i+gap]);
                swapped = true;
            }
        }
    }
    return moves;
}

function get_next_gap(gap) {
    gap = parseInt((gap*10)/13, 10);
    if (gap < 1)
        return 1;
    return gap;
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