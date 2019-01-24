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
    label.onclick = todoModal;

    checkBox.appendChild(input);
    checkBox.appendChild(label);

    if (user._id !== undefined) {
        //if the user exists
    }
    return segment;
}

function checkboxClickedHandler() {
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
        label.onclick = todoModal;

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
    get('/api/todo', { "user": user._id }, function (todoArr) {
        console.log(todoArr);
        for (let i = 0; i < todoArr.length; i++) {
            const currentTodo = todoArr[i];
            todosDiv.prepend(todoDOMObject(currentTodo, user));
        }


    });


}

//what date addition might look like
/* <div style="
    position: relative;
    font-size: .7rem;
    left: 26px;
">
Due: 1/19/2039
</div> */

function todoModal() {
    let todoID = this.parentElement.parentElement.id;
    document.getElementById(todoID).innerText;
    document.getElementById('todo-modal-input').value = document.getElementById(todoID).innerText;
    $('#todo-modal')
        .modal({
            onDeny: function () {
                const data = {
                    id: todoID,
                };
                document.getElementById(todoID).outerHTML = "";
                post('/api/todoDeleted', data);
            },
            onApprove: function () {
                const newCont = document.getElementById('todo-modal-input').value;
                const data = {
                    id: todoID,
                    content: newCont,
                };
                document.getElementById(todoID).firstElementChild.childNodes[1].textContent = newCont;
                post('/api/todoUpdated', data);
            }
        })
        .modal('show');

}

function todoShow(element, name) {

    let elementArr = document.getElementsByClassName('ui active yellow item');
    for (i in elementArr) {
        elementArr[i].className = 'ui yellow item';
    }
    element.classList.add('active');




    let chillin = document.getElementById('todos').children;
    if (name === "all") {
        for (i in chillin) {
            chillin[i].style.display = 'block';
        }
    } else if (name === "not done") {
        for (i in chillin) {
            if (chillin[i].firstElementChild.firstElementChild.checked) {
                chillin[i].style.display = 'none';
            } else {
                chillin[i].style.display = 'block';
            }

        }
    }
    else if (name === "done") {
        for (i in chillin) {
            if (chillin[i].firstElementChild.firstElementChild.checked) {
                chillin[i].style.display = 'block';
            } else {
                chillin[i].style.display = 'none';
            }

        }
    }


}