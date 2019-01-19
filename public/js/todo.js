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
    input.onclick = checkboxClickedHandler;
    const label = document.createElement('label');
    label.textContent = todoJSON.text;

    checkBox.appendChild(input);
    checkBox.appendChild(label);

    if (user._id !== undefined) {
        //if the user exists
    }
    return segment;
}

function checkboxClickedHandler() {
    console.log(this.parentElement.parentElement.id);
    console.log(this.checked);
    const data = {
        id: this.parentElement.parentElement.id,
        checked: this.checked
    }
    if (this.checked) {
        $.uiAlert({
            textHead: 'You may now log-in with the username you have chosen', // header
            text: 'You may now log-in with the username you have chosen', // Text
            bgcolor: '#19c3aa', // background-color
            textcolor: '#fff', // color
            position: 'top-right',// position . top And bottom ||  left / center / right
            icon: 'checkmark box', // icon in semantic-UI
            time: 3, // time
        })
    }
    post('/api/todoChecked', data);
}

function submitTodoHandler() {
    const newTodoInput = document.getElementById('todo-text-input');


    const data = {
        content: newTodoInput.value,
        complete: false
    };

    post('/api/todo', data, todo => {

        console.log(todo);
        //make new todo here
        const todosDiv = document.getElementById('todos');


        const segment = document.createElement('div');
        segment.setAttribute('id', todo.id);
        segment.className = 'ui compact segment';

        const checkBox = document.createElement('div');
        checkBox.className = 'ui checkbox';
        segment.appendChild(checkBox);

        const input = document.createElement('input');
        input.type = "checkbox";
        input.onclick = checkboxClickedHandler;
        const label = document.createElement('label');
        //text
        label.textContent = data.content;

        checkBox.appendChild(input);
        checkBox.appendChild(label);

        todosDiv.prepend(segment);
        newTodoInput.value = '';
    });

}


function renderTodos(user) {
    if (user._id !== undefined) {
        console.log("you have a user!");
    }


    const todosDiv = document.getElementById('todos');
    get('/api/todo', {}, function (todoArr) {
        for (let i = 0; i < todoArr.length; i++) {
            const currentTodo = todoArr[i];
            if (currentTodo.creator_id == user._id) {
                todosDiv.prepend(todoDOMObject(currentTodo, user));
            }

        }
    });
}