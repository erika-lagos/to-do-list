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

    return {
        getTasks,
        addTask,
        removeTask,
    };

})();

function createTask(event) {
    taskView.show();
}

function saveTask(data) {
    //To-Do: implement functionality
    const task = new Task(data.name, data.desc);
    //add task to userstate
    UserState.addTask(task);
    //render new task
    homeView.addTask(task);
}

function createHeader(event) {
    //TODO: implement this functionality
    console.log('Create header functionality pending')
}

function addEventListeners() {
    pubSub.subscribe('New Task', createTask);
    pubSub.subscribe('New Header', createHeader);
    pubSub.subscribe('Save Task', saveTask);
}

function loadContent() {
    sidebarView.render();
    homeView.render(UserState.getTasks());
    addEventListeners();
}

window.addEventListener('load', loadContent);
