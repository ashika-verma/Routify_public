

function main() {
    get('/api/whoami', {}, function (user) {
        console.log(user);
        renderUserInfo(user);
        renderTodos(user);
        renderLongterms(user);
        renderHabits(user);
        renderRewards(user);
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

$("#habit-text-input").on('keyup', function (e) {
    if (e.keyCode == 13 && document.getElementById("habit-text-input").value !== "") {
        // Do something
        submitHabitHandler();
        console.log("please");
    }
});

$("#reward-text-input").on('keyup', function (e) {
    if (e.keyCode == 13 && document.getElementById("reward-text-input").value !== "") {
        // Do something
        submitRewardHandler();
        console.log("please");
    }
});




main();

