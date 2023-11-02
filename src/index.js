import Task from './task';
import * as userState from './userState';
import * as pubSub from './pubSub';
import * as sidebarView from './sidebarView';
import * as homeView from './homeView';
import * as taskView from './taskView';
import './style.css';

function createTask(event) {
    taskView.show();
}

function saveTask(data) {
    if (data.id !== undefined && data.id !== null) {  
        const modifiedTask = userState.replaceTask(data);
        homeView.replaceTask(modifiedTask);
    } else {
        const task = new Task(data.name, data.desc);
        userState.addTask(task);
        homeView.addTask(task);
    }
}

function deleteTask(taskId) {
    userState.removeTask(taskId);
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
    homeView.render(userState.loadTasks());
    addEventListeners();
}

window.addEventListener('load', loadContent);
