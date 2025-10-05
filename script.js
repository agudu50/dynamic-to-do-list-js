// script.js
// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {

  // --- Select DOM elements ---
  const addButton = document.getElementById('add-task-btn'); // "Add Task" button
  const taskInput = document.getElementById('task-input');   // input field
  const taskList = document.getElementById('task-list');     // <ul> for tasks

  // --- Initialize tasks array from localStorage (or empty array) ---
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  // --- Helper: save tasks array to localStorage ---
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // --- Create and append a DOM task item ---
  // taskText: string, save (boolean) indicates whether to store in localStorage
  function addTask(taskText, save = true) {
    const text = (typeof taskText === 'string') ? taskText.trim() : taskInput.value.trim();

    // If empty, alert user and exit (only when called from UI, not when loading)
    if (!text) {
      if (save) alert('Please enter a task.');
      return;
    }

    // Create <li> and inner span for text (keeps text clean when button is appended)
    const listItem = document.createElement('li');
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    listItem.appendChild(textSpan);

    // Store original task text on the li for safe removal/lookup
    listItem.dataset.task = text;

    // Create "Remove" button and style class
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');

    // When Remove clicked: remove from DOM and update localStorage
    removeButton.onclick = function () {
      // Remove element from DOM
      taskList.removeChild(listItem);

      // Remove first matching occurrence from tasks array and save
      const index = tasks.indexOf(text);
      if (index > -1) {
        tasks.splice(index, 1);
        saveTasks();
      }
    };

    // Append button and list item to the DOM
    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);

    // If caller requests saving (not during initial load), update tasks array & storage
    if (save) {
      tasks.push(text);
      saveTasks();
      // Clear input only when user added (not when loading from storage)
      taskInput.value = '';
    } else {
      // when loading from storage, don't clear input
    }
  }

  // --- Load tasks from localStorage into DOM on startup ---
  function loadTasks() {
    // tasks is already parsed at top; use it to create DOM nodes without re-saving
    tasks.forEach(storedText => addTask(storedText, false));
  }

  // --- Attach event listeners ---
  addButton.addEventListener('click', function () {
    addTask(); // user-driven add -> save = true by default
  });

  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // prevent form submit / page refresh if any
      addTask();
    }
  });

  // --- Initial load ---
  loadTasks();
});
