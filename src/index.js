import * as sidebarView from './sidebarView';
import * as homeView from './homeView';
import './style.css';

class Task {

    static lastTaskId = 0;

    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.id = Task.lastTaskId++;
        this.isComplete = false;
    }
}

const UserState = (function() {

    const tasks = [
        new Task('Hacer la cama', 'Asegurar que las sabanas estan limpias'),
        new Task('hacer de comer', 'Checar la lista del super'),
        new Task('estudiar javascript', 'Necesitamos un trabajo'),
        new Task('ir al scooer', 'Llevarle jugo a sebastian')
    ];

    function getTasks() {
        return tasks;
    }

    function addTask(newTask) {
        tasks.push(newTask);
    }

    function removeTask(id) {
        const taskIndex = tasks.findIndex(task => task.id === id);
        tasks.splice(taskIndex,1);
    }

    return {
        getTasks,
        addTask,
        removeTask,
    };

})();

function loadContent() {
    sidebarView.render();
    // homeView.render(UserState.getTasks());
}

window.addEventListener('load', loadContent);