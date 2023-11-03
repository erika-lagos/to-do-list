import Close from './assets/images/close.svg';
import Save from './assets/images/save.svg';
import Delete from './assets/images/delete.svg';
import * as pubSub from './pubSub.js';

export default class EditView {
    
    activeId;
    
    constructor(deleteAction, saveAction, placeholderName, placeholderDesc) {
        this.deleteAction = deleteAction;
        this.saveAction = saveAction;
        this.placeholderName = placeholderName;
        this.placeholderDesc = placeholderDesc;
        this.mainContainer = document.querySelector('.main');
        this.nameInput = this.createNameInput();
        this.descInput = this.createDescInput(); 
        this.dateInput = this.createDateInput();
        this.dialog = this.generateDialog();
    }

    createButton(name, icon) {
        const img = new Image();
        img.src = icon;
        img.alt = name;
        img.className = 'small-icon';
        const button = document.createElement('button');
        button.className = name;
        button.appendChild(img);
        return button;
    }

    createHeader() {
        const delBtn = this.createButton('delete-task', Delete);
        delBtn.addEventListener('click', evt => {
            pubSub.publish(this.deleteAction, activeId);
            this.close();
        })
        const closeBtn = this.createButton('close-dialog', Close);
        closeBtn.addEventListener('click', this.close.bind(this));
        const header = document.createElement('div');
        header.className = 'dialog-header';
        header.append(delBtn, closeBtn);

        return header;
    }

    createNameInput() {
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = 'task-name-input';
        nameInput.name = 'task-name';
        nameInput.placeholder = this.placeholderName;
        return nameInput;
    }

    createDescInput() {
        const descInput = document.createElement('textarea');
        descInput.name = 'task-desc';
        descInput.id = 'task-desc-input';
        descInput.cols = 50;
        descInput.rows = 4;
        descInput.placeholder = this.placeholderDesc;
        return descInput;
    }

    createDateInput() {
        const dueDateNode = document.createElement('input');
        dueDateNode.type = 'date';
        dueDateNode.id = 'due-date-input';
        dueDateNode.name = 'due-date';
        return dueDateNode;
    }

    createObjectTitle() {
        const titleNode = document.createElement('div');
        titleNode.className = 'dialog-object-title';
        titleNode.append(this.nameInput, this.dateInput);
        return titleNode;
    }

    createFooter() {
        const footer = document.createElement('div');
        footer.className = 'dialog-footer';
        const saveBtn = this.createButton('save-task', Save);
        saveBtn.addEventListener('click', this.save.bind(this));
        footer.append(saveBtn);
        return footer;
    }

    save() {
        const name = this.nameInput.value;
        const description = this.descInput.value;
        const dueDate = this.dateInput.value !== '' ? new Date(`${this.dateInput.value}T00:00`) : undefined;
        pubSub.publish(this.saveAction, {name, description, dueDate, id: this.activeId});
        this.close();
    }

    close() {
        this.nameInput.value = '';
        this.descInput.value = '';
        this.dateInput.value = '';
        this.activeId = undefined;
        this.dialog.close();
    }

    generateDialog() {
        const dialog = document.createElement('dialog');
        dialog.className = 'edit-view';
        dialog.append(this.createHeader());
        dialog.append(this.createObjectTitle());
        dialog.append(this.descInput);
        dialog.append(this.createFooter())
        this.mainContainer.append(dialog);
        return dialog;
    }

    show(userObject) {
        if (userObject !== undefined) {
            this.nameInput.value = userObject.name ? userObject.name : '';
            this.descInput.value = userObject.description ? userObject.description : '';
            this.dateInput.value = userObject.getDateString();
            this.activeId = userObject.id;
        } 
        this.dialog.show();
    }

}
