function rewardDOMObject(rewardJSON, user) {
    const rewardsDiv = document.getElementById('rewards');
    /*
    <div class="ui compact segment">
        <div class="ui grid">
            <div class="left aligned ten wide column">stop</div>
            <div class="right aligned middle aligned six wide column">
                <i class="large icon ui "><img src="/static/css/img/two-coins.svg"></i>
                <i class="ui horizontal right">10</i>
            </div>
        </div>
    </div>
    */
    console.log(rewardJSON);
    const segment = document.createElement('div');
    segment.setAttribute('id', rewardJSON._id);
    segment.className = 'ui compact segment';

    let innerBoi = '<div class="ui grid"><div class="left aligned ten wide column">' + rewardJSON.text + '</div>';
    innerBoi += '<div class="right aligned middle aligned six wide column">';
    innerBoi += '<i class="large icon ui"><img src="/static/css/img/two-coins.svg"></i><i class="ui horizontal right">' + rewardJSON.reward + '</i>';
    innerBoi += '</div></div></div>';

    segment.innerHTML = innerBoi;

    rewardsDiv.prepend(segment);
    segment.firstElementChild.firstElementChild.onclick = rewardModal;
    segment.firstElementChild.lastElementChild.onclick = claimReward;


}

function claimReward() {
    let goldClaimed = this.textContent;
    console.log(goldClaimed);
    $.uiAlert({
        textHead: 'You claimed your reward!', // header
        text: 'May you have fun with ' + this.text, // Text
        bgcolor: '#19c3aa', // background-color
        textcolor: '#fff', // color
        position: 'bottom-right',// position . top And bottom ||  left / center / right
        icon: 'checkmark box', // icon in semantic-UI
        time: 3, // time
    });


    var p = new Promise(function (res, rej) {
        post('/api/rewardClaimed', { "gold": goldClaimed });
        setTimeout(
            function () {
                res('whoo');
            }, 300);
    });
    p.then(function (res) {
        get('/api/whoami', {}, function (user) {
            renderUserInfo(user);
        });
    })

}

function submitRewardHandler() {
    const newRewardInput = document.getElementById('reward-text-input');


    const data = {
        content: newRewardInput.value,
        reward: 10
    };

    post('/api/reward', data, reward => {

        get('/api/whoami', {}, function (user) {
            const longtermsDiv = document.getElementById('rewards');
            renderNewRewards(user)
            document.getElementById("reward-text-input").value = "";
        });
    });

}


function renderRewards(user) {
    if (user._id !== undefined) {
        console.log("you have a user!");
    }


    const rewardsDiv = document.getElementById('rewards');
    get('/api/reward', { "user": user._id }, function (rewardArr) {
        for (let i = 0; i < rewardArr.length; i++) {
            const currentReward = rewardArr[i];
            rewardDOMObject(currentReward, user);

        }
    });
}
function renderNewRewards(user) {
    if (user._id !== undefined) {
        console.log("you have a user!");
    }

    get('/api/reward', { "user": user._id }, function (longtermArr) {
        const currentLongterm = longtermArr[longtermArr.length - 1];
        rewardDOMObject(currentLongterm, user);
    });
}

function rewardModal() {
    let longtermID = this.parentElement.parentElement.id;
    // document.getElementById(longtermID).textContent;
    let savethis = this;
    // //childNodes[0].nodeValue
    document.getElementById('reward-modal-input').value = this.textContent;
    document.getElementById('reward-modal-gold').value = this.parentElement.lastElementChild.textContent;
    $('#reward-modal')
        .modal({
            onDeny: function () {
                const data = {
                    id: longtermID,
                };
                document.getElementById(longtermID).outerHTML = "";
                post('/api/rewardDeleted', data);
            },
            onApprove: function () {
                const newCont = document.getElementById('reward-modal-input').value;
                const newValue = document.getElementById('reward-modal-gold').value;
                const data = {
                    id: longtermID,
                    content: newCont,
                    reward: newValue
                };
                console.log(this.textContent);
                savethis.textContent = newCont;
                savethis.parentElement.lastElementChild.innerHTML = '<i class="large icon ui"><img src="/static/css/img/two-coins.svg"></i><i class="ui horizontal right">' + newValue + '</i>';
                post('/api/rewardModalUpdated', data);
            }
        })
        .modal('show');

}