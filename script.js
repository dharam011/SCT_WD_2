const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

let startTime = 0;
let elapsedTime = 0;
let intervalId;
let running = false;

// Function to format timealse
function formatTime(time) {
  let date = new Date(time);
  let minutes = date.getUTCMinutes();
  let seconds = date.getUTCSeconds();
  let milliseconds = date.getUTCMilliseconds();

  return (
    `${minutes.toString().padStart(2, '0')}:` +
    `${seconds.toString().padStart(2, '0')}.` +
    `${milliseconds.toString().padStart(3, '0')}`
  );
}

// Start or pause 
function startPauseStopwatch() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 10);
    startPauseBtn.innerHTML = "<i class='ri-pause-large-line'></i>";
    lapBtn.disabled = false;
  } else {
    clearInterval(intervalId);
    elapsedTime = Date.now() - startTime;
  startPauseBtn.innerHTML = "<i class='ri-play-large-line'></i>";;
    lapBtn.disabled = true;
  }
  running = !running;
}
display
function updateTime() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

// Reset 
function resetStopwatch() {
  clearInterval(intervalId);
  startTime = 0;
  elapsedTime = 0;
  running = false;
  display.textContent = '00:00.00';
  startPauseBtn.innerHTML = "<i class='ri-play-large-line'></i>";;
  lapBtn.disabled = true;
  lapsList.innerHTML = '';
}

//lap
function recordLap() {
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapsList.appendChild(lapItem);
}

// Event Listeners
startPauseBtn.addEventListener('click', startPauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

// Disable lap 
lapBtn.disabled = true;

resetBtn.addEventListener('click', resetStopwatch);
