

function main() {
    get('/api/whoami', {}, function (user) {
        console.log(user);
        renderTodos(user);
    });
}



//on Enter
$("#todo-text-input").on('keyup', function (e) {
    if (e.keyCode == 13 && document.getElementById("todo-text-input").value !== "") {
        // Do something
        submitTodoHandler();
        console.log("please");
    }
});



main();

