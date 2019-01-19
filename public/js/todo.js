function todoDOMObject(todoJSON, user) {
    const segment = document.createElement('div');
    segment.setAttribute('id', todoJSON._id);
    segment.className = 'ui compact segment';

    const checkBox = document.createElement('div');
    checkBox.className = 'ui checkbox';
    segment.appendChild(checkBox);

    const input = document.createElement('input');
    input.type = "checkbox";
    input.checked = todoJSON.complete;
    const label = document.createElement('label');
    label.textContent = todoJSON.text;
    checkBox.appendChild(input);
    checkBox.appendChild(label);

    if (user._id !== undefined)
        cardFooter.appendChild(newCommentDOMObject(todoJSON._id));

    return segment;
}


function submitTodoHandler() {
    const newTodoInput = document.getElementById('todo-text-input');

    const data = {
        content: newTodoInput.value,
        complete: false
    };

    post('/api/todo', data);
    newTodoInput.value = '';
}

function renderTodos(user) {
    if (user._id !== undefined)
        document.getElementById('new-story').appendChild(newtodoDOMObject());

    const storiesDiv = document.getElementById('stories');
    get('/api/todo', {}, function (todoArr) {
        for (let i = 0; i < todoArr.length; i++) {
            const currentTodo = todoArr[i];
            storiesDiv.append(todoDOMObject(currentTodo, user));

        }
    });
}