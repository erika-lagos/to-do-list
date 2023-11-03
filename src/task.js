import { format, differenceInCalendarDays, formatDistanceToNowStrict } from 'date-fns';

export default class Task {

    static lastId = 0;

    constructor(name, description, dueDate, projectId, id = Task.lastId++, isComplete = false) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.projectId = projectId;
        this.id = id;
        this.isComplete = isComplete;
        if (this.id >= Task.lastId) {
            Task.lastId = this.id + 1;
        }
    }

    getProjectId() {
        return this.projectId;
    }

    setProjectId(id) {
        this.projectId = id;
    }

    setDueDate(date) {
        //TO-DO: validate the input
        this.dueDate = date;
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
        const today = new Date();
        const difference = differenceInCalendarDays(this.dueDate, today);
        if (difference === 0) {
            return 'today';
        } 
        if (difference < 0) {
            return formatDistanceToNowStrict(this.dueDate, {unit: 'day', addSuffix: true});
        } 
        if (difference > 6) {
            return format(this.dueDate, 'MMM dd');
        }
        return formatDistanceToNowStrict(this.dueDate, {unit: 'day', roundingMethod: 'ceil'});
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


    // setId(id) {
    //     this.id = id;
    // }

    // complete() {
    //     this.isComplete = true;
    // }

    // removeComplete() {
    //     this.isComplete = false;
    // }
}