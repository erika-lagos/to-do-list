export default class Task {

    static lastTaskId = 0;

    constructor(name, description, id = Task.lastTaskId++, isComplete = false) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.isComplete = isComplete;
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