function longtermDOMObject(longtermJSON, user) {
    const segment = document.createElement('div');
    segment.setAttribute('id', longtermJSON._id);
    segment.className = 'ui compact segment';

    const innerSegment = document.createElement('div');
    innerSegment.className = 'ui compact segment';
    innerSegment.innerText = longtermJSON.text;
    innerSegment.onclick = longtermModal;

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

        //make new longterm here
        const longtermsDiv = document.getElementById('longterms');

        const segment = document.createElement('div');
        segment.setAttribute('id', longterm.id);
        segment.className = 'ui compact segment';

        const innerSegment = document.createElement('div');
        innerSegment.className = 'ui compact segment';
        innerSegment.innerText = newLongtermInput.value;
        innerSegment.onclick = longtermModal;

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
    get('/api/longterm', { "user": user._id }, function (longtermArr) {
        for (let i = 0; i < longtermArr.length; i++) {
            const currentLongterm = longtermArr[i];
            longtermsDiv.prepend(longtermDOMObject(currentLongterm, user));


        }
    });
}

//updates server about new position of slider
function onLongtermSlideHandler() {
    const longtermID = this.parentElement.parentElement.id;
    let newVal = this.value;
    const data = {
        id: longtermID,
        percentage: this.value
    }


    get('/api/longterm', {}, function (longtermArr) {
        let before = 0;
        for (i in longtermArr) {
            if (longtermArr[i]._id === longtermID) {
                before = longtermArr[i].percentage;
            }
        }
        doAlert(newVal - before);
    });



    post('/api/longtermUpdated', data);

}

//updates label and nothing else
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
function longtermModal() {
    let longtermID = this.parentElement.id;
    document.getElementById(longtermID).textContent;
    //childNodes[0].nodeValue
    document.getElementById('longterm-modal-input').value = document.getElementById(longtermID).firstElementChild.childNodes[0].nodeValue;
    $('#longterm-modal')
        .modal({
            onDeny: function () {
                const data = {
                    id: longtermID,
                };
                document.getElementById(longtermID).outerHTML = "";
                post('/api/longtermDeleted', data);
            },
            onApprove: function () {
                const newCont = document.getElementById('longterm-modal-input').value;
                const data = {
                    id: longtermID,
                    content: newCont,
                };
                document.getElementById(longtermID).firstElementChild.childNodes[0].nodeValue = newCont;
                post('/api/longtermModalUpdated', data);
            }
        })
        .modal('show');

}

function doAlert(changed) {
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