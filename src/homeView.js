import Tmp from './assets/images/tmp.svg';
import NewTask from './assets/images/new-task.svg';
import Delete from './assets/images/delete.svg';
import * as pubSub from './pubSub.js';

class footerButton {
    constructor(name, icon) {
        this.name = name;
        this.icon = icon;
    }
    
    renderButton() {
        const img = new Image();
        img.src = this.icon;
        img.alt = this.name;
        img.className = 'icon';
        const button = document.createElement('button');
        button.className = 'sidebar-item';
        button.appendChild(img);
        button.addEventListener('click', this.handleClick.bind(this));
        return button;
    }

    handleClick(event) {
        pubSub.publish(this.name, event);
    }
}

const mainContainer = document.querySelector('.main');
let homeContainer;

const footerButtons = [
    new footerButton('New Task', NewTask),
    new footerButton('New Header', Tmp)
];

function renderTaskNode(task) {
    const taskNode = document.createElement('div');
    taskNode.className = 'task';
    taskNode.id = `task-${task.id}`;

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'task-check';
    check.id = task.id;
    taskNode.append(check);

    const label = document.createElement('label');
    label.className = 'task-name';
    label.setAttribute('for', task.id);
    label.textContent = task.name;
    taskNode.append(label);

    const delButton = document.createElement('button');
    delButton.className = 'delete-task';
    const img = new Image();
    img.src = Delete;
    img.className = 'small-icon';
    delButton.append(img);
    delButton.addEventListener('click', evt => {
        pubSub.publish('Delete Task', task);
    });
    taskNode.append(delButton);

    return taskNode;
}

function renderTasks(tasks) {
    if (tasks === null || tasks === undefined) 
        return;
    homeContainer = document.createElement('div');
    homeContainer.className = 'home-view';
    tasks.forEach(task => {
        const taskNode = renderTaskNode(task);
        homeContainer.append(taskNode);
    });
    mainContainer.append(homeContainer)
}

function renderFooter(items) {
    if (items === null || items === undefined)
        return;
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'home-footer';
    items.forEach(item => {
        const button = item.renderButton();
        itemsContainer.append(button);
    });
    mainContainer.appendChild(itemsContainer);
}

function render(tasks) {
    renderTasks(tasks);
    renderFooter(footerButtons);    
}

function addTask(task) {
    const taskNode = renderTaskNode(task);
    homeContainer.append(taskNode);
}

function removeTask(taskId) {
    const taskNode = document.querySelector(`[id=task-${taskId}]`);
    homeContainer.removeChild(taskNode);
}

export { 
    render, 
    addTask,
    removeTask };