// Wait for the HTML document to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {

    // Step 1: Select DOM elements
    const addButton = document.getElementById('add-task-btn');  // "Add Task" button
    const taskInput = document.getElementById('task-input');    // Input field for new tasks
    const taskList = document.getElementById('task-list');      // UL element to display tasks

    // Step 2: Define the addTask function
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new <li> element for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // When the "Remove" button is clicked, remove the task
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
        };

        // Append the "Remove" button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Clear the input field after adding a task
        taskInput.value = "";
    }

    // Step 3: Add event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Step 4: Add event listener for pressing the "Enter" key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});
