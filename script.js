//start up variables
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
// Our Array
let tasks = [];

//save data to local storage function
function loadData() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        showTask();
    }
}

loadData()

// creating a function for list items
function createTaskListItem(taskText, index) {
    //new task
    const li = document.createElement("li");
    li.innerHTML = taskText;

    const iconContainer = document.createElement("div");
    //creating edit icon
    const editIcon = document.createElement("i");
    editIcon.className = "fa-solid fa-pen-to-square";
    editIcon.onclick = function () {
        const newTaskText = prompt("Edit the task:", taskText);
        if (newTaskText !== null) {
            editTask(index, newTaskText);
        }
    };

    //delete button
    const deleteButton = document.createElement("span");
    deleteButton.innerHTML = "&times;";
    deleteButton.onclick = function () {
        deleteTask(index);
    };

    iconContainer.appendChild(editIcon);
    iconContainer.appendChild(deleteButton);

    li.appendChild(iconContainer);

    return li;
}

// function to add a task

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something.");
        } else{
            const taskText = inputBox.value;
            tasks.push({ text: taskText, checked:false});
            saveData();
            listContainer.appendChild(createTaskListItem(taskText, tasks.length - 1));
        }
        inputBox.value = "";
}

//eddit taks

function editTask(index, newContent) {
    if (newContent === null || newContent === "") {
        alert("You must write something.")
        return;
    }
    tasks[index].test = newContent;
    showTask();
}

// Delete Tasks

function deleteTask(index) {
    if (confirm("Are you really sure you want to delete?")) {
        tasks.splice(index, 1);
        showTask();
    }
}

// array index

function getIndex(listItem) {
    return Array.from(listContainer.children).indexOf(listItem);
}

//adds checked task off list ability - edit task
listContainer.addEventListener("click", function (e) {
    if(e.target.tagName === "Li"){
        const index = getIndex(e.target);
        tasks[index].checked = !tasks[index].checked;
        e.target.classList.toggle("checked");
        saveData();
    }else if (e.target.tagName === "I") {
        const index = getIndex(e.target.parentElement);
        const currentTaskText = tasks[index].text;
        const newTaskText = prompt("Edit the Task", currentTaskText);
        if (newTaskText !== null) {
            editTask(index, newTaskText);
        }
    }
}, false);

//save data as JSON string to lo0cal storage

function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
    listContainer.innerHTML = '';

    tasks.forEach((task, index) =>{
        const li = createTaskListItem(task.text, index);

        if (tasks.checked) {
            li.classList.add("checked");
        }

        listContainer.appendChild(li);
    });

    saveData();
}

showTask();