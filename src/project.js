import { format, differenceInCalendarDays, formatDistanceToNowStrict } from 'date-fns';

export default class Project {
    
    static lastId = 0;

    constructor(name, description, dueDate, id = Project.lastId++, progress = 0, tasks = []) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.id = id;
        this.progress = progress;
        this.tasks = tasks;
        if (this.id >= Project.lastId) {
            Project.lastId = this.id + 1;
        }
    }

    getTasks() {
        return this.tasks;
    }

    addTask(task) {
        this.tasks.push(task);
        // this.calculateProgress();
    }

    addTasks(tasks) {
        this.tasks.push(...tasks);
    }

    removeTask(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        this.tasks.splice(taskIndex,1);
    }

    getTask(id) {
        return this.tasks.find(task => task.id === id);
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getDateStringForPicker() {
        if (!this.dueDate) {
            return undefined;
        }
        return format(this.dueDate, 'yyyy-MM-dd');
    }

    getDateStringToDisplay() {
        if (!this.dueDate) {
            return undefined;
        }
        return format(this.dueDate, 'MMM dd');
    }

    getStatusFlag() {
        if (!this.dueDate) {
            return '';
        }
        const today = new Date();
        const difference = differenceInCalendarDays(this.dueDate, today);
        if (difference === 0) {
            return 'due-today';
        } 
        if (difference < 0) {
            return 'overdue';
        } 
    }
}