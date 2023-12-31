import NewHeader from './assets/images/new-header.svg';
import NewTask from './assets/images/new-task.svg';
import Edit from './assets/images/edit.svg';
import Delete from './assets/images/delete.svg';
import ProjectIcon from './assets/images/project-icon.svg';
import PriorityFlag from './assets/images/priority-flag.svg';
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
        button.append(img, this.name);
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
    new footerButton('New Task', NewTask)
    // new footerButton('New Header', NewHeader)
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
        task.isComplete = check.checked;
        pubSub.publish('Save Task', task);
    });
    
    taskNode.append(check);
    
    if (task.dueDate) {
        const dateLabel = createDateLabel(task);
        taskNode.append(dateLabel);
    }
    
    const label = document.createElement('label');
    label.className = 'task-name';
    label.setAttribute('for', task.id);
    label.textContent = task.name;
    taskNode.append(label);

    if (task.highPriority) {
        const priorityMarker = document.createElement('div');
        priorityMarker.classList.add('high-priority', 'high-priority-small');
        const img = new Image();
        img.src = PriorityFlag;
        img.alt = 'Priority flag';
        img.className = 'tiny-icon';
        priorityMarker.append(img, 'High Priority');
        // priorityMarker.textContent = 'High Priority';
        taskNode.append(priorityMarker);
    }
    
    const editButton = createButton(Edit, 'Edit Task', task);
    const delButton = createButton(Delete, 'Delete Task', task.id);
    const taskButtons = document.createElement('div');
    taskButtons.className = 'inline-buttons';
    taskButtons.append(editButton, delButton);
    taskNode.append(taskButtons);
    
    return taskNode;
}

function createDateLabel(userObject) {
    const dateLabel = document.createElement('label');
    dateLabel.className = 'date-label';
    dateLabel.textContent = userObject.getDateStringToDisplay();
    dateLabel.classList.add(userObject.getStatusFlag());
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

    if (project.dueDate) {
        const dateLabel = createDateLabel(project);
        dateLabel.classList.add('large-date');
        nameNode.append(dateLabel);
    }
    
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

function renderTaskList(tasks, title) {
    clear();
    const titleNode = document.createElement('div');
    titleNode.className = 'section-header';
    titleNode.textContent = title;
    homeContainer.append(titleNode);
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
    renderTaskList, 
    addTask,
    removeTask,
    replaceTask,
    replaceProject 
};