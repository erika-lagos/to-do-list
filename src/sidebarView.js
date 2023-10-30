import Tmp from './assets/images/tmp.svg';
import AllTasks from './assets/images/all-tasks.svg';
import NewTask from './assets/images/new-task.svg';

class sidebarItem {
    constructor(name, icon, fullTextButtons) {
        this.name = name;
        this.icon = icon;
        this.fullTextButtons = fullTextButtons;
    }

    renderButton() {
        const img = new Image();
        img.src = this.icon;
        img.alt = this.name;
        img.className = 'icon';
        const button = document.createElement('button');
        button.className = 'sidebar-item';
        button.appendChild(img);
        if (this.fullTextButtons) {
            button.append(this.name);
        }
        return button;
    }
}

const sidebarContainer = document.querySelector('.sidebar');
const defaultItems = [
    new sidebarItem('All Tasks', AllTasks, true)
];
const footerItems = [
    new sidebarItem('New Workspace', Tmp, false),
    new sidebarItem('New Project', Tmp, false),
    new sidebarItem('New Task', NewTask, false)
];

function renderItems(items, containerName) {
    if (items === null || items === undefined)
        return;
    const itemsContainer = document.createElement('div');
    itemsContainer.className = containerName;
    items.forEach(item => {
        const button = item.renderButton();
        itemsContainer.append(button);
    });
    sidebarContainer.appendChild(itemsContainer);
}

function render(userItems) {
    renderItems(defaultItems, 'sidebar-items');
    renderItems(userItems, 'sidebar-items');
    renderItems(footerItems, 'sidebar-footer');
}

export  { render };