import EditView from './editView';

const extension = new EditView('Delete Project', 'Save Project', 'Name your project', 'Add a project description here');

function show(project) {
    extension.show(project);
}

export { show };