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