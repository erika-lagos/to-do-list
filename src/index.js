import Task from './task';
import * as pubSub from './pubSub';
import * as sidebarView from './sidebarView';
import * as homeView from './homeView';
import * as taskView from './taskView';
import './style.css';

const UserState = (function() {

    const tasks = [
        new Task('Hacer la cama', 'Asegurar que las sabanas estan limpias'),
        new Task('hacer de comer', 'Checar la lista del super'),
        new Task('estudiar javascript', 'Necesitamos un trabajo'),
        new Task('ir al soccer', 'Llevarle jugo a sebastian')
    ];

    function getTasks() {
        return tasks;
    }

    function addTask(newTask) {
        tasks.push(newTask);
    }

    function removeTask(id) {
        const taskIndex = tasks.findIndex(task => task.id === id);
        tasks.splice(taskIndex,1);
    }

    function replaceTask(taskData) {
        const oldTask = tasks.find(task => task.id === taskData.id);
        oldTask.name = taskData.name;
        oldTask.description = taskData.description;
        return oldTask;
    }

    return {
        getTasks,
        addTask,
        removeTask,
        replaceTask
    };

})();

function createTask(event) {
    taskView.show();
}

function saveTask(data) {
    if (data.taskId !== null) {  
        const modifiedTask = UserState.replaceTask(data);
        homeView.replaceTask(modifiedTask);
    } else {
        const task = new Task(data.name, data.desc);
        UserState.addTask(task);
        homeView.addTask(task);
    }
}

function deleteTask(taskId) {
    UserState.removeTask(taskId);
    homeView.removeTask(taskId);
}

function editTask(task) {
    taskView.show(task);
}

function createHeader(event) {
    //TODO: implement this functionality
    console.log('Create header functionality pending')
}

function addEventListeners() {
    pubSub.subscribe('New Task', createTask);
    pubSub.subscribe('New Header', createHeader);
    pubSub.subscribe('Save Task', saveTask);
    pubSub.subscribe('Delete Task', deleteTask);
    pubSub.subscribe('Edit Task', editTask);
}

function loadContent() {
    sidebarView.render();
    homeView.render(UserState.getTasks());
    addEventListeners();
}

window.addEventListener('load', loadContent);
