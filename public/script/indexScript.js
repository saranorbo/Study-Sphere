const timerDisplayHour = document.getElementById('timer-display-hour');
const timerDisplayMinute = document.getElementById('timer-display-minute');
const timerDisplaySecond = document.getElementById('timer-display-second');
const startButton = document.getElementById('start-timer-btn');


let initialHours = 0;
let initialMinutes = 0;
let initialSeconds = 0;
let intervalId = null; // Variable to hold the interval ID
var pauseInfo;


var storedPauseInfo ;

async function checkStoredtime(){
  storedPauseInfo = await JSON.parse(localStorage.getItem('pauseInfo'));
  if (storedPauseInfo && storedPauseInfo.hasOwnProperty('flag') && storedPauseInfo.flag === 1) {
    timerDisplayHour.value = storedPauseInfo.pauseHour;
    timerDisplayMinute.value = storedPauseInfo.pauseMinute;
    timerDisplaySecond.value = storedPauseInfo.pauseSecond;

    // Create a new object with updated flag property
    const updatedPauseInfo = { ...storedPauseInfo, flag: 0 };
    localStorage.setItem('pauseInfo', JSON.stringify(updatedPauseInfo));
  }
}


checkStoredtime()

function startTimer() {
  
 
  
  timerDisplayHour.readOnly=true;
  timerDisplayMinute.readOnly=true;
  timerDisplaySecond.readOnly=true;
  // Validate user input:
  if (!validateInput()) {
    alert("Invalid input! Please enter valid numbers for hours, minutes, and seconds.");
    return; // Prevent further execution if input is invalid
  }

  // Get initial values and convert to numbers (if necessary):
  initialHours = parseInt(timerDisplayHour.value) || 0;
  initialMinutes = parseInt(timerDisplayMinute.value) || 0;
  initialSeconds = parseInt(timerDisplaySecond.value) || 0;

  // Disable start button:
  startButton.disabled = true;

  // Calculate initial total seconds:
  let totalSeconds = initialHours * 3600 + initialMinutes * 60 + initialSeconds;

  // Start the timer:
  intervalId = setInterval(() => {
    // Decrement total seconds:
    totalSeconds--;

    // Handle timer completion and stop:
    if (totalSeconds <= 0) {
      alert("Timer completed!");
      clearInterval(intervalId);
      startButton.disabled = false; // Enable start button again
      return; // Exit the interval
    }

    // Calculate remaining hours, minutes, and seconds:
    let remainingHours = Math.floor(totalSeconds / 3600);
    let remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
    let remainingSeconds = totalSeconds % 60;

    // Update display with leading zeros:
    timerDisplayHour.value = String(remainingHours).padStart(2, '0');
    timerDisplayMinute.value = String(remainingMinutes).padStart(2, '0');
    timerDisplaySecond.value = String(remainingSeconds).padStart(2, '0');
  }, 1000); // Update timer every second
}

function validateInput() {
  // Check if all input fields are valid numbers:
  return !isNaN(timerDisplayHour.value) && !isNaN(timerDisplayMinute.value) && !isNaN(timerDisplaySecond.value);
}

// Add event listener to start button:
startButton.addEventListener("click", startTimer);

function stop_timer(){

  
   pauseInfo = {
    pauseHour: Number(timerDisplayHour.value),
    pauseMinute: Number(timerDisplayMinute.value),
    pauseSecond: Number(timerDisplaySecond.value),
    flag: 1
};

// Serializing and storing the object
localStorage.setItem('pauseInfo', JSON.stringify(pauseInfo));
// pauseInfo.flag=1
location.reload()

 }

 function restartTimer(){
  location.reload()
 }

 function hour1(){
    timerDisplayHour.value = 1;
    timerDisplayMinute.value = 0;
    timerDisplaySecond.value = 0;
 }

 function hour2(){
    timerDisplayHour.value = 2;
    timerDisplayMinute.value = 0;
    timerDisplaySecond.value = 0;
 }

 function break5(){
    timerDisplayHour.value = 0;
    timerDisplayMinute.value = 5;
    timerDisplaySecond.value = 0;
 }





 const taskInput = document.getElementById("task-input");
const taskSubmitBtn = document.getElementById("task-submit-btn");
const taskList = document.getElementById("task-list");

let tasks = []; // Array to store tasks

taskSubmitBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    // Create a new task object
    const task = {
      id: tasks.length + 1, // Assign a unique ID
      text: taskText,
      completed: false,
    };

    // Add task to the array
    tasks.push(task);

    // Render the task in the task list
    renderTask(task);

    taskInput.value = ""; // Clear the input field
  }
});

function renderTask(task) {
  const taskItem = document.createElement("li");
  taskItem.id = `task-${task.id}`;
  taskItem.classList.add("task-item");

  // Checkbox for task completion
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `task-checkbox-${task.id}`;
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
  });

  // Task text
  const taskTextElement = document.createElement("span");
  taskTextElement.textContent = task.text;

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(taskItem);
    tasks = tasks.filter((t) => t.id !== task.id); // Remove task from the array
  });

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskTextElement);
  taskItem.appendChild(deleteBtn);

  taskList.appendChild(taskItem);
}