function habitDOMObject(habitJSON, user) {



    const segment = document.createElement('div');
    segment.setAttribute('id', habitJSON._id);
    segment.className = 'ui compact segment';

    const innerSegment = document.createElement('div');
    innerSegment.className = 'ui compact segment';
    innerSegment.innerText = habitJSON.text;

    const label = document.createElement('div');
    if (habitJSON.count > 0) {
        label.className = 'ui green horizontal label right';
    } else if (habitJSON.count < 0) {
        label.className = 'ui red horizontal label right';
    } else {
        label.className = 'ui grey horizontal label right';
    }
    label.innerText = habitJSON.count;

    const btncontainer = document.createElement('div');
    btncontainer.className = 'ui fluid buttons';

    const downbtn = document.createElement('button');
    downbtn.className = 'ui button';
    const downicon = document.createElement('i');
    downicon.className = 'chevron down icon';
    downbtn.appendChild(downicon);
    downbtn.onclick = subtractCount;

    const or = document.createElement('div');
    or.className = 'or';

    const upbtn = document.createElement('button');
    upbtn.className = 'ui button';
    const upicon = document.createElement('i');
    upicon.className = 'chevron up icon';
    upbtn.appendChild(upicon);
    upbtn.onclick = addCount;


    btncontainer.appendChild(downbtn);
    btncontainer.appendChild(or);
    btncontainer.appendChild(upbtn);

    innerSegment.appendChild(label);
    segment.appendChild(innerSegment);
    segment.appendChild(btncontainer);



    if (user._id !== undefined) {
        //if the user exists
    }
    return segment;

    // <div class="ui compact segment">
    //     <div class="ui compact clearing segment">looked at phone
    //         <div class="ui red horizontal label right">-1</div>
    //     </div>
    //     <div class="ui fluid buttons">
    //         <button class="ui button"><i class="chevron down icon"></i></button>
    //         <div class="or"></div>
    //         <button class="ui button"><i class="chevron up icon"></i></button>
    //     </div>

    // </div>

}


function submitHabitHandler() {
    const newHabitInput = document.getElementById('habit-text-input');


    const data = {
        content: newHabitInput.value,
        count: 0
    };

    post('/api/habit', data, habit => {

        const segment = document.createElement('div');
        segment.setAttribute('id', habit.id);
        segment.className = 'ui compact segment';

        const innerSegment = document.createElement('div');
        innerSegment.className = 'ui compact segment';
        innerSegment.innerText = newHabitInput.value;

        const label = document.createElement('div');
        label.className = 'ui grey horizontal label right';
        label.innerText = 0;

        const btncontainer = document.createElement('div');
        btncontainer.className = 'ui fluid buttons';

        const downbtn = document.createElement('button');
        downbtn.className = 'ui button';
        const downicon = document.createElement('i');
        downicon.className = 'chevron down icon';
        downbtn.appendChild(downicon);
        downbtn.onclick = subtractCount;

        const or = document.createElement('div');
        or.className = 'or';

        const upbtn = document.createElement('button');
        upbtn.className = 'ui button';
        const upicon = document.createElement('i');
        upicon.className = 'chevron up icon';
        upbtn.appendChild(upicon);
        upbtn.onclick = addCount;


        btncontainer.appendChild(downbtn);
        btncontainer.appendChild(or);
        btncontainer.appendChild(upbtn);

        innerSegment.appendChild(label);
        segment.appendChild(innerSegment);
        segment.appendChild(btncontainer);


        const habitsDiv = document.getElementById('habits');
        habitsDiv.prepend(segment);
        newHabitInput.value = '';
    });

}


function renderHabits(user) {
    if (user._id !== undefined) {
        console.log("you have a user!");
    }


    const habitsDiv = document.getElementById('habits');
    get('/api/habit', {}, function (habitArr) {
        for (let i = 0; i < habitArr.length; i++) {
            const currentHabit = habitArr[i];
            if (currentHabit.creator_id == user._id) {
                habitsDiv.prepend(habitDOMObject(currentHabit, user));
            }

        }
    });
}


function addCount() {
    doAlert(1);

    const habitID = this.parentElement.parentElement.id;

    let label = this.parentElement.parentElement.firstElementChild.firstElementChild;
    label.innerText = parseInt(label.innerText) + 1;
    let newCount = parseInt(label.innerText);
    if (newCount > 0) {
        label.classList.add("green");
        label.classList.remove("grey");
    } else if (newCount < 0) {
        label.classList.add("red");
        label.classList.remove("grey");
    } else {
        label.classList.add("grey");
        label.classList.remove("red");
        label.classList.remove("green");
    }

    const data = {
        id: habitID,
        count: label.innerText
    }

    post('/api/habitUpdated', data);

}

function subtractCount() {
    doAlert(-1);

    const habitID = this.parentElement.parentElement.id;

    let label = this.parentElement.parentElement.firstElementChild.firstElementChild;
    label.innerText = parseInt(label.innerText) - 1;
    let newCount = parseInt(label.innerText);
    if (newCount > 0) {
        label.classList.add("green");
        label.classList.remove("grey");
    } else if (newCount < 0) {
        label.classList.add("red");
        label.classList.remove("grey");
    } else {
        label.classList.add("grey");
        label.classList.remove("red");
        label.classList.remove("green");
    }

    const data = {
        id: habitID,
        count: label.innerText
    }

    post('/api/habitUpdated', data);

}



function doAlert(changed) {
    console.log(changed);
    if (changed > 0) {
        $.uiAlert({
            textHead: 'Fantastic! You just earned __ gold and __ xp!', // header
            text: 'Keep on going! You are doing great!', // Text
            bgcolor: '#21ba45', // background-color
            textcolor: '#fff', // color
            position: 'top-right',// position . top And bottom ||  left / center / right
            icon: 'checkmark box', // icon in semantic-UI
            time: 3, // time
        })
    }
    else if (changed < 0) {
        $.uiAlert({
            textHead: 'Oh no! You lost __ gold and __ xp!', // header
            text: 'Keep on trying with your goal and good luck!', // Text
            bgcolor: '#db2828', // background-color
            textcolor: '#fff', // color
            position: 'top-right',// position . top And bottom ||  left / center / right
            icon: 'remove circle', // icon in semantic-UI
            time: 3, // time
        })
    }
}