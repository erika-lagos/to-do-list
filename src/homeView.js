import NewHeader from './assets/images/new-header.svg';
import NewTask from './assets/images/new-task.svg';
import Edit from './assets/images/edit.svg';
import Delete from './assets/images/delete.svg';
import ProjectIcon from './assets/images/project-icon.svg';
import * as pubSub from './pubSub.js';

class footerButton {
    constructor(name, icon) {
        this.name = name;
        this.icon = icon;
    }
    
    createButton() {
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
const homeContainer = createHomeContainer();

const footerButtons = [
    new footerButton('New Task', NewTask),
    new footerButton('New Header', NewHeader)
];

function createHomeContainer() {
    const container = document.createElement('div');
    container.className = 'home-view';
    return container;
}

function createButton(icon, action, data) {
    const button = document.createElement('button');
    const img = new Image();
    img.src = icon;
    img.className = 'small-icon';
    button.append(img);
    button.addEventListener('click', evt => {
        pubSub.publish(action, data);
    });
    return button;
}

function createTaskNode(task) {
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
    
    const editButton = createButton(Edit, 'Edit Task', task);
    const delButton = createButton(Delete, 'Delete Task', task.id);
    const taskButtons = document.createElement('div');
    taskButtons.className = 'task-buttons';
    taskButtons.append(editButton, delButton);
    taskNode.append(taskButtons);
    
    return taskNode;
}

function renderTasks(tasks) {
    if (tasks !== null && tasks !== undefined) {
        tasks.forEach(task => {
            const taskNode = createTaskNode(task);
            homeContainer.append(taskNode);
        });
    }
}

function renderFooter(items) {
    if (items === null || items === undefined)
        return;
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'home-footer';
    items.forEach(item => {
        const button = item.createButton();
        itemsContainer.append(button);
    });
    mainContainer.appendChild(itemsContainer);
}

function renderProjectDetails(project) {
    const nameNode = document.createElement('div');
    nameNode.className = 'project-name';
    nameNode.textContent = project.name;
    const descNode = document.createElement('div');
    descNode.className = 'project-description';
    descNode.textContent = project.description;
    const projectNode = document.createElement('div');
    projectNode.className = 'project';
    projectNode.append(nameNode, descNode);
    homeContainer.append(projectNode);
}

function render() {
    mainContainer.append(homeContainer);
    renderFooter(footerButtons);
}

function renderProject(project) {
    homeContainer.innerHTML = '';
    renderProjectDetails(project);
    renderTasks(project.getTasks());
}


function renderAllTasks(tasks) {
    renderTasks(tasks);   
}

function addTask(task) {
    const taskNode = createTaskNode(task);
    homeContainer.append(taskNode);
}

function removeTask(taskId) {
    const taskNode = document.querySelector(`[id=task-${taskId}]`);
    homeContainer.removeChild(taskNode);
}

function replaceTask(task) {
    const oldTaskNode = document.querySelector(`[id=task-${task.id}]`);
    const newTaskNode = createTaskNode(task);
    homeContainer.replaceChild(newTaskNode, oldTaskNode);
}

export { 
    render,
    renderProject,
    renderAllTasks, 
    addTask,
    removeTask,
    replaceTask };