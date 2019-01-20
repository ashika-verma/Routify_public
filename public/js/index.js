

function main() {
    get('/api/whoami', {}, function (user) {
        console.log(user);
        renderTodos(user);
        renderLongterms(user);
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

$("#longterm-text-input").on('keyup', function (e) {
    if (e.keyCode == 13 && document.getElementById("longterm-text-input").value !== "") {
        // Do something
        submitLongtermHandler();
        console.log("please");
    }
});




main();

