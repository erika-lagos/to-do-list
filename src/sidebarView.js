import AllTasks from './assets/images/all-tasks.svg';
import Star from './assets/images/star.svg';
import Calendar from './assets/images/calendar.svg';
import NewWorkspace from './assets/images/new-workspace.svg';
import NewProject from './assets/images/new-project.svg';
import ProjectIcon from './assets/images/project-icon.svg';
import * as pubSub from './pubSub.js';

const sidebarContainer = document.querySelector('.sidebar');
let projectsContainer;
const defaultButtons = [
    createButton('Today', Star, true, 'Today Tasks'),
    createButton('Upcoming', Calendar, true, 'Upcoming'),
    createButton('All Tasks', AllTasks, true, 'All Tasks')
];
const footerButtons = [
    // createButton('New Workspace', NewWorkspace, false, 'New Workspace'),
    createButton('New Project', NewProject, true, 'New Project')
];

function createButton(name, icon, showName, action, actionData) {
    const img = new Image();
    img.src = icon;
    img.alt = name;
    img.className = 'icon';
    const button = document.createElement('button');
    button.className = 'sidebar-item';
    button.appendChild(img);
    if (showName) {
        button.append(name);
    }
    button.addEventListener('click', handleClick.bind(null, action, actionData))
    return button;
}

function handleClick(action, actionData, evt) {
    pubSub.publish(action, actionData);
}

function createUserButtons(userItems) {
    const userButtons = [];
    userItems?.forEach(item => {
        const button = createButton(item.name, ProjectIcon, true, 'Show Project', item.id);
        button.id = `project-${item.id}`;
        userButtons.push(button);
    });
    return userButtons;
}

function renderButtonGroup(buttons, containerClass) {
    const itemsContainer = document.createElement('div');
    itemsContainer.className = containerClass;
    itemsContainer.append(...buttons);
    sidebarContainer.appendChild(itemsContainer);
    return itemsContainer;
}

function addProject(project) {
    const [ projectNode ] = createUserButtons([ project ]);
    projectsContainer.append(projectNode);
}

function replaceProject(project) {
    const oldProjectNode = document.querySelector(`[id=project-${project.id}]`);
    const [ newProjectNode ] = createUserButtons([ project ]);
    oldProjectNode.parentNode.replaceChild(newProjectNode, oldProjectNode);
}

function removeProject(projectId) {
    const projectNode = document.querySelector(`[id=project-${projectId}]`);
    projectNode.parentNode.removeChild(projectNode);
}

function render(userItems) {
    renderButtonGroup(defaultButtons, 'sidebar-items');
    const userButtons = createUserButtons(userItems);
    projectsContainer = renderButtonGroup(userButtons, 'sidebar-items');
    renderButtonGroup(footerButtons, 'sidebar-footer');
}

export  { 
    render, 
    addProject,
    replaceProject,
    removeProject 
};