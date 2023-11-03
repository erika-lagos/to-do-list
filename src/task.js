export default class Task {

    static lastId = 0;

    constructor(name, description, id = Task.lastId++, isComplete = false) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.isComplete = isComplete;
        if (this.id >= Task.lastId) {
            Task.lastId = this.id + 1;
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