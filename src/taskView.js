import Tmp from './assets/images/tmp.svg';
import Close from './assets/images/close.svg';
import Save from './assets/images/save.svg';
import Delete from './assets/images/delete.svg';
import * as pubSub from './pubSub.js';

const mainContainer = document.querySelector('.main');
let nameInput, descInput, taskId;
const dialog = generateDialog();
    
function generateButton(name, icon) {
    const img = new Image();
    img.src = icon;
    img.alt = name;
    img.className = 'small-icon';
    const button = document.createElement('button');
    button.className = name;
    button.appendChild(img);
    return button;
}

function renderHeader(containerNode) {
    const delBtn = generateButton('delete-task', Delete);
    delBtn.addEventListener('click', evt => {
        pubSub.publish('Delete Task');
    })
    const closeBtn = generateButton('close-dialog', Close);
    closeBtn.addEventListener('click', close);
    
    const header = document.createElement('div');
    header.className = 'dialog-header';
    header.append(delBtn, closeBtn);

    containerNode.append(header);
}

function renderInputs(containerNode) {
    nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'task-name-input';
    nameInput.name = 'task-name';
    nameInput.placeholder = 'Name your task';
    containerNode.append(nameInput);

    descInput = document.createElement('textarea');
    descInput.name = 'task-desc';
    descInput.id = 'task-desc-input';
    descInput.cols = 40;
    descInput.rows = 5;
    descInput.placeholder = 'Describe your task';
    containerNode.append(descInput);
}

function renderFooter(containerNode) {
    const footer = document.createElement('div');
    footer.className = 'dialog-footer';
    const saveBtn = generateButton('save-task', Save);
    saveBtn.addEventListener('click', saveTask);
    footer.append(saveBtn);
    containerNode.append(footer);
}

function saveTask(evt) {
    const name = nameInput.value;
    const description = descInput.value;
    pubSub.publish('Save Task', {name, description, id: taskId});
    close();
}

function generateDialog() {
    const dialog = document.createElement('dialog');
    dialog.className = 'task-view';
    renderHeader(dialog);
    renderInputs(dialog);
    renderFooter(dialog);
    mainContainer.append(dialog);
    return dialog;
}

function close() {
    nameInput.value = '';
    nameInput.desc = '';
    taskId = null;
    dialog.close();
}

function show(task) {
    if (task !== null) {
        nameInput.value = task.name;
        descInput.value = task.description;
        taskId = task.id;
    } 
    dialog.show();
}

export { show };