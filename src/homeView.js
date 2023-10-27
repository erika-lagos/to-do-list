import Tmp from './assets/images/tmp.svg';

function renderTaskNode(task) {
    const taskNode = document.createElement('div');
    taskNode.className = 'task';

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'task-check';
    check.id = task.id;
    taskNode.append(check);

    const label = document.createElement('label');
    label.className = 'task-name';
    label.setAttribute('for', task.id);
    label.textContent = task.name;
    taskNode.append(label);

    return taskNode;
}


const mainContainer = document.querySelector('.main');

function render(tasks) {
    if (tasks === null || tasks === undefined)
        return;
    const homeContainer = document.createElement('div');
    homeContainer.className = 'home-view';
    tasks.forEach(task => {
        const taskNode = renderTaskNode(task);
        homeContainer.append(taskNode);
    });
    mainContainer.append(homeContainer)
}

export { render };