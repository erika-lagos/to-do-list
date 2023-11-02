export default class Project {
    
    static lastId = 0;

    constructor(name, description, id = Project.lastId++, progress = 0, tasks = []) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.progress = progress;
        this.tasks = tasks;
        if (this.id > Project.lastId + 1) {
            Project.lastId = this.id + 1;
        }
    }

    addTask(task) {
        this.tasks.push(task);
        // this.calculateProgress();
    }

    getTasks() {
        return this.tasks;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }
}