// script.js

// Declare variables using 'let' so they can be assigned inside DOMContentLoaded
// They are initially undefined here.
let timerDisplay;
let startButton;
let modes;
let addTaskButton;
let taskList;
let dropdownToggle; // For main nav dropdown
let navDropdown;    // For main nav dropdown
let taskDropdownToggle; // For tasks dropdown
let taskDropdown;       // For tasks dropdown
let clearAllTasksButton; // For the 'Clear all tasks' link
let pomodoroCounter; // For pomodoro counting
let focusMessage;

let countdown; // Variable to hold the setInterval
let timeLeft; // Time left in seconds
let isRunning = false; // To track if the timer is running
let currentMode = 'pomodoro'; // Default mode
let pomodoroCount = 1;

const initialTimes = {
    pomodoro: 25 * 60, // 25 minutes
    shortBreak: 5 * 60, // 5 minutes
    longBreak: 15 * 60 // 15 minutes
};

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = `${display} - Pomofocus`;
}

function updatePomodoroCounterDisplay() {
    if (pomodoroCounter) { // Ensure the element exists
        pomodoroCounter.textContent = `#${pomodoroCount}`;
    }
}

function startTimer() {
    if (isRunning) {
        clearInterval(countdown);
        isRunning = false;
        startButton.textContent = 'START';
        return;
    }

    isRunning = true;
    startButton.textContent = 'PAUSE';

    const now = Date.now();
    const then = now + timeLeft * 1000;

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            isRunning = false;
            startButton.textContent = 'START';
            alert(`${currentMode} finished!`);
            if (currentMode === 'pomodoro') {
                pomodoroCount++;
                updatePomodoroCounterDisplay();
            }
            return;
        }
        timeLeft = secondsLeft;
        displayTimeLeft(timeLeft);
    }, 1000);
}

function changeMode(mode) {
    clearInterval(countdown); // Stop any running timer
    isRunning = false;
    startButton.textContent = 'START';

    currentMode = mode;
    timeLeft = initialTimes[currentMode];
    displayTimeLeft(timeLeft);

    // Reset Pomodoro counter if switching back to 'pomodoro' mode manually
    if (currentMode === 'pomodoro') {
        pomodoroCount = 1; // Reset to #1 for a new cycle
        updatePomodoroCounterDisplay();
    }

    // NEW: Update focus message based on the current mode
    if (focusMessage) { // Ensure the element exists
        if (currentMode === 'pomodoro') {
            focusMessage.textContent = 'Time to focus!';
        } else if (currentMode === 'shortBreak') {
            focusMessage.textContent = 'Time for a short break!';
        } else if (currentMode === 'longBreak') {
            focusMessage.textContent = 'Time for a long break!';
        }
    }

    // Update active button styling
    document.querySelectorAll('.modes button').forEach(button => {
        button.classList.remove('active');
    });
    // Ensure the data-mode attributes in HTML match the camelCase here (e.g., "shortBreak", "longBreak")
    document.querySelector(`.modes button[data-mode="${mode}"]`).classList.add('active');

    const body = document.body;
    const timerContainer = document.querySelector('.timer-container');
    const startButtonElement = document.querySelector('.start-button');
    const tasksContainer = document.querySelector('.tasks-container');
    const taskSeparator = document.querySelector('.task-separator');
    const navButtons = document.querySelectorAll('.nav-buttons button');
    const addTaskBtn = document.querySelector('.add-task-button'); // Declare locally for use in this function


    // Apply transitions for color changes in pomo.css for these elements
    if (currentMode === 'pomodoro') {
        body.style.backgroundColor = 'rgb(186, 73, 73)';
        timerContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        startButtonElement.style.backgroundColor = '#fff';
        startButtonElement.style.color = 'rgb(186, 73, 73)';
        startButtonElement.style.boxShadow = '0 6px 0 rgb(235, 234, 234)';
        tasksContainer.style.backgroundColor = 'rgb(186, 73, 73)';
        tasksContainer.style.color = '#eee';
        pomodoroCounter.style.color = '#eee';
        focusMessage.style.color = '#eee';
        taskSeparator.style.borderColor = 'rgba(255, 255, 255)';
        if(addTaskBtn) addTaskBtn.style.color = 'rgba(255, 255, 255, 0.5)';
        // taskDropdownToggle.style.filter = 'invert(0%)';
        navButtons.forEach(btn => btn.style.color = '#eee');

    } else if (currentMode === 'shortBreak') {
        body.style.backgroundColor = 'rgb(70, 142, 145)';
        timerContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        startButtonElement.style.backgroundColor = '#fff';
        startButtonElement.style.color = 'rgb(70, 142, 145)';
        startButtonElement.style.boxShadow = '0 6px 0 rgb(235, 234, 234)';
        tasksContainer.style.backgroundColor = 'rgb(70, 142, 145)';
        tasksContainer.style.color = '#eee';
        pomodoroCounter.style.color = '#eee';
        focusMessage.style.color = '#eee';
        taskSeparator.style.borderColor = 'rgba(255, 255, 255)';
        if(addTaskBtn) addTaskBtn.style.color = 'rgba(255, 255, 255, 0.5)';
        // taskDropdownToggle.style.filter = 'invert(0%)';
        navButtons.forEach(btn => btn.style.color = '#eee');

    } else if (currentMode === 'longBreak') {
        body.style.backgroundColor = 'rgb(76, 117, 163)';
        timerContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        startButtonElement.style.backgroundColor = '#fff';
        startButtonElement.style.color = 'rgb(76, 117, 163)';
        startButtonElement.style.boxShadow = '0 6px 0 rgb(235, 234, 234)';
        tasksContainer.style.backgroundColor = 'rgb(76, 117, 163)';
        tasksContainer.style.color = '#eee';
        pomodoroCounter.style.color = '#eee';
        focusMessage.style.color = '#eee';
        taskSeparator.style.borderColor = 'rgba(255, 255, 255)';
        if(addTaskBtn) addTaskBtn.style.color = 'rgba(255, 255, 255, 0.5)';
        // taskDropdownToggle.style.filter = 'invert(0%)';
        navButtons.forEach(btn => btn.style.color = '#eee');
    }
}

function addNewTask() {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item'); // Add a class for styling

    taskItem.innerHTML = `
        <div class="task-left">
            <input type="checkbox" class="task-checkbox">
            <input type="text" class="task-text-input" placeholder="What are you working on?">
        </div>
    `;
    // Ensure taskList is not null before appending
    if (taskList) {
        taskList.appendChild(taskItem);
    } else {
        console.error("taskList element not found. Cannot add new task.");
        return; // Exit if taskList is not found
    }


    // Add event listener to the checkbox within this new task item
    const checkbox = taskItem.querySelector('.task-checkbox');
    if (checkbox) { // Check if checkbox exists
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // Checkbox is checked, remove the parent task item
                taskItem.remove(); // Removes the entire taskItem div
            }
        });
    }

    // Focus on the newly created input field
    const taskTextInput = taskItem.querySelector('.task-text-input');
    if (taskTextInput) { // Check if input exists
        taskTextInput.focus();
    }
}


// --- Event Listeners and Initial Setup (Moved inside DOMContentLoaded) ---
document.addEventListener('DOMContentLoaded', () => {
    // Assign values to the 'let' variables now that the DOM is fully loaded
    timerDisplay = document.querySelector('.timer-display');
    startButton = document.querySelector('.start-button');
    modes = document.querySelector('.modes');
    addTaskButton = document.querySelector('.add-task-button');
    taskList = document.querySelector('#task-list');
    dropdownToggle = document.querySelector('#dropdown-toggle');
    navDropdown = document.querySelector('#nav-dropdown');
    taskDropdownToggle = document.querySelector('#task-dropdown-toggle');
    taskDropdown = document.querySelector('#task-dropdown');
    clearAllTasksButton = document.querySelector('#clear-all-tasks-button'); // Assign the new clear button
    pomodoroCounter = document.querySelector('.pomodoro-counter');

    // Attach all Event Listeners
    if (startButton) {
        startButton.addEventListener('click', startTimer);
    }

    if (modes) {
        modes.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                let mode;
                const buttonText = e.target.textContent;

                if (buttonText === 'Pomodoro') {
                    mode = 'pomodoro';
                } else if (buttonText === 'Short Break') {
                    mode = 'shortBreak';
                } else if (buttonText === 'Long Break') {
                    mode = 'longBreak';
                } else {
                    // Fallback in case textContent doesn't exactly match
                    mode = e.target.dataset.mode || 'pomodoro'; // Use data-mode directly
                }

                changeMode(mode);
            }
        });
    }

    if (addTaskButton) {
        addTaskButton.addEventListener('click', addNewTask);
    }

    // Event listener for main nav dropdown toggle
    if (dropdownToggle && navDropdown) {
        dropdownToggle.addEventListener('click', (event) => {
            navDropdown.classList.toggle('show');
            // Close the tasks dropdown if it's open
            if (taskDropdown && taskDropdown.classList.contains('show')) {
                taskDropdown.classList.remove('show');
            }
            event.stopPropagation();
        });
    }

    // NEW: Event listener to toggle tasks dropdown visibility
    if (taskDropdownToggle && taskDropdown) {
        taskDropdownToggle.addEventListener('click', (event) => {
            taskDropdown.classList.toggle('show');
            // Close the main nav dropdown if it's open
            if (navDropdown && navDropdown.classList.contains('show')) {
                navDropdown.classList.remove('show');
            }
            event.stopPropagation();
        });
    }

    // MODIFIED: Event listener to close BOTH dropdowns if clicked outside
    document.addEventListener('click', (event) => {
        // Check main nav dropdown
        if (navDropdown && !dropdownToggle.contains(event.target) && !navDropdown.contains(event.target)) {
            navDropdown.classList.remove('show');
        }
        // Check tasks dropdown
        if (taskDropdown && !taskDropdownToggle.contains(event.target) && !taskDropdown.contains(event.target)) {
            taskDropdown.classList.remove('show');
        }
    });

    // NEW: Event listener for 'Clear all tasks' button
    if (clearAllTasksButton && taskList) {
        clearAllTasksButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior

            // Clear all child elements from the taskList
            while (taskList.firstChild) {
                taskList.removeChild(taskList.firstChild);
            }

            taskDropdown.classList.remove('show'); // Hide dropdown after action
            // Optional: You might want to display a message or update task count
        });
    }

    // Initial setup
    // Ensure timerDisplay is available before using it
    if (timerDisplay) {
        timeLeft = initialTimes.pomodoro;
        displayTimeLeft(timeLeft);
    }

    updatePomodoroCounterDisplay();

    // Ensure the active class is set for the pomodoro button on load
    const pomodoroButton = document.querySelector(`.modes button[data-mode="pomodoro"]`);
    if (pomodoroButton) {
        pomodoroButton.classList.add('active');
    }

    // Call changeMode with the initial 'pomodoro' to set all colors correctly
    // Ensure all necessary elements are available before calling changeMode
    changeMode('pomodoro');
});