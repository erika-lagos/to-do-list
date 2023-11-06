import EditView from './editView';
import Save from './assets/images/save.svg';
import PriorityFlag from './assets/images/priority-flag.svg';
import FlagOutline from './assets/images/flag-outline.svg';
import * as pubSub from './pubSub.js';

export default class TaskView extends EditView {
    
    constructor(deleteAction, saveAction, placeholderName, placeholderDesc) {
        super(deleteAction, saveAction, placeholderName, placeholderDesc);
        this.priorityFlag = false;
        
    }

    togglePriority() {
        this.setPriority(!this.priorityFlag);
    }
    
    setPriority(isHighPriority) {
        this.priorityFlag = isHighPriority;
        const newTogglePriorityButton = this.createPriorityToggle(this.priorityFlag);
        this.togglePriorityButton.parentNode.replaceChild(newTogglePriorityButton, this.togglePriorityButton);
        this.togglePriorityButton = newTogglePriorityButton;
    }

    createPriorityToggle(isHighPriority) {
        const button = document.createElement('button');
        const img = new Image();
        img.src = isHighPriority ? PriorityFlag : FlagOutline;
        img.alt = 'Priority Flag';
        img.className = 'icon';
        button.append(img, isHighPriority ? 'High Priority' : 'Low Priority');
        button.className = isHighPriority ? 'high-priority' : 'low-priority';
        button.addEventListener('click', this.togglePriority.bind(this)); 
        return button;
    }

    createFooter() {
        const saveBtn = this.createButton('save-task', Save);
        saveBtn.addEventListener('click', this.save.bind(this));
        const footer = document.createElement('div');
        footer.className = 'dialog-footer';
        this.togglePriorityButton = this.createPriorityToggle(false);
        footer.append(this.togglePriorityButton, saveBtn);
        return footer;
    }

    save() {
        const name = this.nameInput.value;
        const description = this.descInput.value;
        const dueDate = this.dateInput.value !== '' ? new Date(`${this.dateInput.value}T00:00`) : undefined;
        pubSub.publish(this.saveAction, {name, description, dueDate, highPriority: this.priorityFlag, id: this.activeId});
        this.close();
    }

    close() {
        this.nameInput.value = '';
        this.descInput.value = '';
        this.dateInput.value = '';
        this.setPriority(false);
        this.activeId = undefined;
        this.dialog.close();
    }

    show(userObject) {
        if (userObject !== undefined) {
            this.nameInput.value = userObject.name ? userObject.name : '';
            this.descInput.value = userObject.description ? userObject.description : '';
            this.dateInput.value = userObject.getDateStringForPicker();
            this.setPriority(userObject.highPriority);
            this.activeId = userObject.id;
        } 
        this.dialog.show();
    }

}