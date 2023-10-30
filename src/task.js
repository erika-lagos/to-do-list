export default class Task {

    static lastTaskId = 0;

    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.id = Task.lastTaskId++;
        this.isComplete = false;
    }
}