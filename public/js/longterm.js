function longtermDOMObject(longtermJSON, user) {
    const longtermsDiv = document.getElementById('longterms');

    // <div class="ui compact segment"> ~

    //     <div class="ui compact segment"> ~
    //         <div class="ui grid">~
    //             <div class="left aligned ten wide column">~
    //                 Left floated right aligned column~
    //                                         </div>~
    //             <div class="right aligned middle aligned six wide column">~
    //                 <div class="ui green horizontal label">87%</div>~
    //             </div>~
    //         </div>~

    //     </div>~
    //     <div class="ui slidecontainer">
    //         <input type="range" min="0" max="100" value="58" class="slider" id="myRange">
    //      </div>
    //</div>        ~
    const segment = document.createElement('div');
    segment.setAttribute('id', longtermJSON._id);
    segment.className = 'ui compact segment';

    let innerBoi = '<div class="ui compact segment"><div class="ui grid"><div class="left aligned ten wide column">' + longtermJSON.text;
    innerBoi += '</div>';

    innerBoi += '<div class="right aligned middle aligned six wide column">';


    if (longtermJSON.percentage > 90) {
        innerBoi += '<div class="ui green horizontal label">';
    } else if (longtermJSON.percentage > 50) {
        innerBoi += '<div class="ui olive horizontal label">';
    } else if (longtermJSON.percentage > 0) {
        innerBoi += '<div class="ui orange horizontal label">';
    } else {
        innerBoi += '<div class="ui grey horizontal label">';
    }


    innerBoi += longtermJSON.percentage + '%</div></div></div></div>';
    innerBoi += '<div class="ui slidecontainer"><input type="range" min="0" max="100" value="' + longtermJSON.percentage + '" class="slider" id="range-' + longtermJSON._id + '"></div>'

    segment.innerHTML = innerBoi;
    longtermsDiv.prepend(segment);


    console.log('range-' + longtermJSON._id);
    let input = document.getElementById('range-' + longtermJSON._id);
    input.onchange = onLongtermSlideHandler;
    input.oninput = slideyBoySlides;
    segment.firstElementChild.firstElementChild.firstElementChild.onclick = longtermModal;

    if (user._id !== undefined) {
        //if the user exists
    }
}


function submitLongtermHandler() {
    const newLongtermInput = document.getElementById('longterm-text-input');


    const data = {
        content: newLongtermInput.value,
        percentage: 0

    };

    post('/api/longterm', data, longterm => {

        get('/api/whoami', {}, function (user) {
            const longtermsDiv = document.getElementById('longterms');
            renderNewLongterms(user)
            document.getElementById("longterm-text-input").value = "";
        });

    });

}

function renderNewLongterms(user) {
    if (user._id !== undefined) {
        console.log("you have a user!");
    }

    get('/api/longterm', { "user": user._id }, function (longtermArr) {
        const currentLongterm = longtermArr[longtermArr.length - 1];
        longtermDOMObject(currentLongterm, user);
    });
}


function renderLongterms(user) {
    if (user._id !== undefined) {
        console.log("you have a user!");
    }


    //const longtermsDiv = document.getElementById('longterms');
    get('/api/longterm', { "user": user._id }, function (longtermArr) {
        for (let i = 0; i < longtermArr.length; i++) {
            const currentLongterm = longtermArr[i];
            //longtermsDiv.prepend(longtermDOMObject(currentLongterm, user));
            longtermDOMObject(currentLongterm, user);
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
    let label = this.parentElement.parentElement.firstElementChild.firstElementChild.lastElementChild.firstElementChild;

    label.innerText = this.value + "%";
    label.classList.remove("green");
    label.classList.remove("orange");
    label.classList.remove("olive");
    label.classList.remove("grey");
    if (this.value > 90) {
        label.classList.add("green");
    } else if (this.value > 50) {
        label.classList.add("olive");
    } else if (this.value > 0) {
        label.classList.add("orange");
    } else {
        label.classList.add("grey");
    }
}
function longtermModal() {
    let longtermID = this.parentElement.parentElement.parentElement.id;
    document.getElementById(longtermID).textContent;
    let savethis = this;
    //childNodes[0].nodeValue
    document.getElementById('longterm-modal-input').value = this.textContent;
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
                console.log(this.textContent);
                savethis.textContent = newCont;
                post('/api/habitModalUpdated', data);
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
            position: 'bottom-right',// position . top And bottom ||  left / center / right
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
            position: 'bottom-right',// position . top And bottom ||  left / center / right
            icon: 'remove circle', // icon in semantic-UI
            time: 3, // time
        })
    }
}