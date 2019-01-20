function longtermDOMObject(longtermJSON, user) {
    const segment = document.createElement('div');
    segment.setAttribute('id', longtermJSON._id);
    segment.className = 'ui compact segment';

    const innerSegment = document.createElement('div');
    innerSegment.className = 'ui compact segment';
    innerSegment.innerText = longtermJSON.text;

    const label = document.createElement('div');
    if (longtermJSON.percentage > 0) {
        label.className = 'ui green horizontal label right';
    } else {
        label.className = 'ui grey horizontal label right';
    }
    label.innerText = longtermJSON.percentage + "%";


    const slidecontainer = document.createElement('div');
    slidecontainer.className = 'ui slidecontainer';



    const input = document.createElement('input');
    input.type = "range";
    input.min = 0;
    input.max = 100;
    input.value = longtermJSON.percentage;
    input.onchange = onLongtermSlideHandler;
    input.oninput = slideyBoySlides;
    input.className = "slider";
    console.log(input);

    slidecontainer.appendChild(input);
    innerSegment.appendChild(label);
    segment.appendChild(innerSegment);
    segment.appendChild(slidecontainer);






    if (user._id !== undefined) {
        //if the user exists
    }
    return segment;
    // <div class="ui compact segment">
    //     <div class="ui compact segment">work on book
    //           <div class="ui green horizontal label right">58%</div>
    //     </div>
    //     <div class="ui slidecontainer">
    //         <input type="range" min="1" max="100" value="58" class="slider" id="myRange">
    //     </div>
    //</div>
}


function submitLongtermHandler() {
    const newLongtermInput = document.getElementById('longterm-text-input');


    const data = {
        content: newLongtermInput.value,
        percentage: 0

    };

    post('/api/longterm', data, longterm => {

        console.log(longterm);
        //make new todo here
        const longtermsDiv = document.getElementById('longterms');

        const segment = document.createElement('div');
        segment.setAttribute('id', longterm.id);
        segment.className = 'ui compact segment';

        const innerSegment = document.createElement('div');
        innerSegment.className = 'ui compact segment';
        innerSegment.innerText = newLongtermInput.value;

        const label = document.createElement('div');
        label.className = 'ui grey horizontal label right';
        label.innerText = "0%";


        const slidecontainer = document.createElement('div');
        slidecontainer.className = 'ui slidecontainer';



        const input = document.createElement('input');
        input.type = "range";
        input.min = 0;
        input.max = 100;
        input.value = 0;
        input.onchange = onLongtermSlideHandler;
        input.oninput = slideyBoySlides;
        input.className = "slider";
        console.log(input);

        slidecontainer.appendChild(input);
        innerSegment.appendChild(label);
        segment.appendChild(innerSegment);
        segment.appendChild(slidecontainer);

        longtermsDiv.prepend(segment);
        newLongtermInput.value = '';
    });

}


function renderLongterms(user) {
    if (user._id !== undefined) {
        console.log("you have a user!");
    }


    const longtermsDiv = document.getElementById('longterms');
    get('/api/longterm', {}, function (longtermArr) {
        for (let i = 0; i < longtermArr.length; i++) {
            const currentLongterm = longtermArr[i];
            if (currentLongterm.creator_id == user._id) {
                longtermsDiv.prepend(longtermDOMObject(currentLongterm, user));
            }

        }
    });
}

function onLongtermSlideHandler() {
    console.log(this.parentElement.parentElement.id);
    console.log(this.value);
    const data = {
        id: this.parentElement.parentElement.id,
        percentage: this.value
    }

    post('/api/longtermUpdated', data);
}

function slideyBoySlides() {
    let label = this.parentElement.parentElement.firstElementChild.firstElementChild;
    label.innerText = this.value + "%";
    if (this.value > 0) {
        label.classList.add("green");
        label.classList.remove("grey");
    } else {
        label.classList.add("grey");
        label.classList.remove("green");
    }
}

function doAlert(changed) {
    if (changed > 0) {
        $.uiAlert({
            textHead: 'You may now log-in with the username you have chosen', // header
            text: 'You may now log-in with the username you have chosen', // Text
            bgcolor: '#19c3aa', // background-color
            textcolor: '#21ba45', // color
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
            icon: 'checkmark box', // icon in semantic-UI
            time: 3, // time
        })
    }
}