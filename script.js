const newTask = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("tasks");
const filter = document.getElementById("filter");

filter.addEventListener("click", filterTasks);
document.addEventListener("DOMContentLoaded", loadFromLocal);
newTask.addEventListener("click", addNewTask);

function addNewTask(event) {
    event.preventDefault();
    const containerChild = document.createElement("div");
    containerChild.classList.add("newTask");

    const myTask = document.createElement("div")
    myTask.classList.add("taskStyle");
    myTask.innerText = taskInput.value;

    const completeBtn = document.createElement("i");
    completeBtn.classList.add("fa-solid", "fa-check"); completeBtn.id="confirm";

    const deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa-solid", "fa-trash"); deleteBtn.id="delete";

    containerChild.appendChild(myTask);
    saveToLocal(taskInput.value);
    containerChild.appendChild(completeBtn);
    containerChild.appendChild(deleteBtn);

    document.getElementById("tasks").appendChild(containerChild);

    taskInput.value = "";

    completeBtn.addEventListener("click", completeTask);

    deleteBtn.addEventListener("click", deleteTask);
};

function deleteTask(e) {
    const item = e.target.parentElement;
    item.classList.add("deleteAnimation");
    removeFromLocal(item);
    item.addEventListener('transitionend', function(){
        item.remove();
    });
}

function completeTask(e) {
    e.stopPropagation();
    e.target.parentElement.classList.toggle("completed");
}

function filterTasks(e) {
    const tasks = taskList.childNodes;
    tasks.forEach(function(task){
        switch(e.target.value){
            default :
                task.style.display = "flex";
                break;
            case "all":
                task.style.display = "flex";
                break;
            case "completed":
                if(task.classList.contains("completed")) {
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!task.classList.contains("completed")) {
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                }
                break;
        }
    });
}

function saveToLocal(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) tasks = [];
    else tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadFromLocal() {
    let tasks;
    if (localStorage.getItem("tasks") === null) tasks = [];
    else tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(function(task){
        const containerChild = document.createElement("div");
        containerChild.classList.add("newTask");

        const myTask = document.createElement("div")
        myTask.classList.add("taskStyle");
        myTask.innerText = task;

        const completeBtn = document.createElement("i");
        completeBtn.classList.add("fa-solid", "fa-check"); completeBtn.id="confirm";

        const deleteBtn = document.createElement("i");
        deleteBtn.classList.add("fa-solid", "fa-trash"); deleteBtn.id="delete";

        containerChild.appendChild(myTask);
        containerChild.appendChild(completeBtn);
        containerChild.appendChild(deleteBtn);

        document.getElementById("tasks").appendChild(containerChild);

        completeBtn.addEventListener("click", completeTask);

        deleteBtn.addEventListener("click", deleteTask);
    });
}

function removeFromLocal(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) tasks = [];
    else tasks = JSON.parse(localStorage.getItem("tasks"));
    const taskIndex = task.children[0].innerText;
    tasks.splice(tasks.indexOf(taskIndex), 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


