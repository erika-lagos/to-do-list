import Task from './task';

const tasks = [
    // new Task('Hacer la cama', 'Asegurar que las sabanas estan limpias'),
    // new Task('hacer de comer', 'Checar la lista del super'),
    // new Task('estudiar javascript', 'Necesitamos un trabajo'),
    // new Task('ir al soccer', 'Llevarle jugo a sebastian')
];

function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks !== undefined && storedTasks !== null) {
        storedTasks.forEach(task => {
        addTask(new Task(task.name, task.description, task.id, task.isComplete));
        });
    }
    return getTasks();
}

function storeTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    return tasks;
}

function addTask(newTask) {
    tasks.push(newTask);
    storeTasks();
}

function removeTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks.splice(taskIndex,1);
    storeTasks();
}

function replaceTask(taskData) {
    const oldTask = tasks.find(task => task.id === taskData.id);
    oldTask.name = taskData.name;
    oldTask.description = taskData.description;
    storeTasks();
    return oldTask;
}

export {
    loadTasks,
    getTasks,
    addTask,
    removeTask,
    replaceTask
};