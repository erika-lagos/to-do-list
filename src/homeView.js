import NewHeader from './assets/images/new-header.svg';
import NewTask from './assets/images/new-task.svg';
import Edit from './assets/images/edit.svg';
import Delete from './assets/images/delete.svg';
import ProjectIcon from './assets/images/project-icon.svg';
import * as pubSub from './pubSub.js';
import { differenceInCalendarDays, formatDistanceToNowStrict } from 'date-fns';

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
    check.checked = task.isComplete;
    check.addEventListener('change', evt => {
        //This is dirty here :(
        task.isComplete = check.checked;
        pubSub.publish('Save Task', task);
    });
    taskNode.append(check);
    
    if (task.dueDate) {
        const dateLabel = createDateLabel(task.dueDate);
        taskNode.append(dateLabel);
    }
    
    const label = document.createElement('label');
    label.className = 'task-name';
    label.setAttribute('for', task.id);
    label.textContent = task.name;
    taskNode.append(label);
    
    const editButton = createButton(Edit, 'Edit Task', task);
    const delButton = createButton(Delete, 'Delete Task', task.id);
    const taskButtons = document.createElement('div');
    taskButtons.className = 'inline-buttons';
    taskButtons.append(editButton, delButton);
    taskNode.append(taskButtons);
    
    return taskNode;
}

function createDateLabel(dueDate) {
    const dateLabel = document.createElement('label');
    dateLabel.className = 'date-label';
    
    const today = new Date();
    const difference = differenceInCalendarDays(dueDate, today);
    if (difference === 0) {
        dateLabel.classList.add('due-today');
        dateLabel.textContent = 'today';
    } else if (difference < 0) {
        dateLabel.classList.add('overdue');
        dateLabel.textContent = formatDistanceToNowStrict(dueDate, {unit: 'day', addSuffix: true});
    } else {
        dateLabel.textContent = formatDistanceToNowStrict(dueDate, {unit: 'day', roundingMethod: 'ceil'});
    }
    return dateLabel;
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

function createProjectNode(project) {
    const nameNode = document.createElement('div');
    nameNode.className = 'project-header';
    nameNode.textContent = project.name;
    
    const editButton = createButton(Edit, 'Edit Project', project);
    const delButton = createButton(Delete, 'Delete Project', project.id);
    const projectButtons = document.createElement('div');
    projectButtons.className = 'inline-buttons';
    projectButtons.append(editButton, delButton);
    nameNode.append(projectButtons);
    
    const descNode = document.createElement('div');
    descNode.className = 'project-description';
    descNode.textContent = project.description;

    const projectNode = document.createElement('div');
    projectNode.className = 'project';
    projectNode.append(nameNode, descNode);
    
    return projectNode;
}

function render() {
    mainContainer.append(homeContainer);
    renderFooter(footerButtons);
}

function clear() {
    homeContainer.innerHTML = '';
}

function renderProject(project) {
    clear();
    homeContainer.append(createProjectNode(project));
    renderTasks(project.getTasks());
}

function replaceProject(project) {
    const oldNode = document.querySelector('.project');
    const newNode = createProjectNode(project);
    homeContainer.replaceChild(newNode, oldNode);
}

function renderAllTasks(tasks) {
    clear();
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
    clear,
    renderProject,
    renderAllTasks, 
    addTask,
    removeTask,
    replaceTask,
    replaceProject 
};