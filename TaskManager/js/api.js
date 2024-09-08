import Task from "./task.js";
export const fetchTask = async () =>{
    try {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        return tasks.map(task=>new Task(task.heading, task.status)); 
    }catch(error){
        console.log(error)
        alert("Something went wrong")
        return []
    }
}

export const saveTask = async(tasks) =>{
    try{
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }catch(error){
        console.log(error)
        alert("Task can't save")
    }
}
