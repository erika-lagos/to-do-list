import AllTasks from './assets/images/all-tasks.svg';
import NewWorkspace from './assets/images/new-workspace.svg';
import NewProject from './assets/images/new-project.svg';
import ProjectIcon from './assets/images/project-icon.svg';
import * as pubSub from './pubSub.js';

const sidebarContainer = document.querySelector('.sidebar');
const defaultButtons = [
    createButton('All Tasks', AllTasks, true, 'All Tasks')
];
const footerButtons = [
    createButton('New Workspace', NewWorkspace, false, 'New Workspace'),
    createButton('New Project', NewProject, false, 'New Project')
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
    if (!userItems) {
        return userButtons;
    }
    userItems.forEach(item => {
        userButtons.push(createButton(item.name, ProjectIcon, true, 'Show Project', item.id));
    });
    return userButtons;
}

function renderButtons(items, containerClass) {
    if (items === null || items === undefined)
        return;
    const itemsContainer = document.createElement('div');
    itemsContainer.className = containerClass;
    itemsContainer.append(...items);
    sidebarContainer.appendChild(itemsContainer);
}

function render(userItems) {
    renderButtons(defaultButtons, 'sidebar-items');
    const userButtons = createUserButtons(userItems);
    renderButtons(userButtons, 'sidebar-items');
    renderButtons(footerButtons, 'sidebar-footer');
}

export  { render };