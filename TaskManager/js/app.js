import { fetchTask, saveTask } from "./api.js";
import Task from "./task.js";

let tasks = [];

const loadTask = async()=>{
    tasks = await fetchTask()
    renderTask()
}

const renderTask = () => {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = ''; // Clear the task list before rendering
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = task.getTaskHtml(index);
        taskElement.querySelector('.custom-checkbox').addEventListener('click', () => toggleTaskComplete(index));
        taskElement.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));
        taskList.appendChild(taskElement);
    });
};


const addTask = (heading) =>{
    const newTask = new Task(heading)
    tasks.push(newTask)
    saveTask(tasks)
    renderTask()
}

const toggleTaskComplete = (index) =>{
    tasks[index].taskComplete()
    saveTask(tasks)
    renderTask()
}

const deleteTask =(index) =>{
    tasks.splice(index, 1);
    saveTask(tasks)
    renderTask()
} 

document.getElementById('task-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const taskInput = document.getElementById('task-input')
    addTask(taskInput.value)
    taskInput.value = ''
})

document.addEventListener('click', function(event){
    const taskInoputBtn = event.target.closest('.btn');
    if (taskInoputBtn){
        const newTask = document.getElementById('task-input');
        console.log(newTask);
    }else{
        console.log('Not clicked');
    }
})

document.addEventListener('click', function(event) {
    const menuIcon = event.target.closest('.menu-icon');
    if (menuIcon) {
        const task = menuIcon.closest('.task');
        task.classList.toggle('show-actions');
    } else {
        // Close all task action menus if clicked outside
        document.querySelectorAll('.task').forEach(task => {
            task.classList.remove('show-actions');
        });
    }
});

document.addEventListener('change', function(event) {
    const checkbox = event.target.closest('input[type="checkbox"]');
    if (checkbox) {
        const taskText = checkbox.nextElementSibling; // Get the label (task text)
        taskText.classList.toggle('completed', checkbox.checked); // Toggle the completed class based on the checkbox state
    }
});

loadTask()