function rewardDOMObject(rewardJSON, user) {

    // <div onclick="claimReward" class="ui compact segment">looked at phone
    //     <i class="ui horizontal right">10</i>
    //     <i class="large icon ui horizontal right"><img src="/static/css/img/two-coins.svg"></i>
    // </div>
    console.log(rewardJSON);
    const segment = document.createElement('div');
    segment.setAttribute('id', rewardJSON._id);
    segment.className = 'ui compact segment';
    segment.innerText = rewardJSON.text;
    segment.onclick = claimReward;

    const num = document.createElement('i');
    num.className = 'ui horizontal right';
    num.innerText = 10;
    segment.appendChild(num);

    const icon = document.createElement('i');
    icon.className = 'large icon ui horizontal right';
    const image = document.createElement('img');
    image.src = "/static/css/img/two-coins.svg";
    icon.appendChild(image);
    segment.appendChild(icon);


    if (user._id !== undefined) {
        //if the user exists
    }
    return segment;
}

function claimReward() {

    $.uiAlert({
        textHead: 'You claimed your reward!', // header
        text: 'May you have fun with ' + this.text, // Text
        bgcolor: '#19c3aa', // background-color
        textcolor: '#fff', // color
        position: 'top-right',// position . top And bottom ||  left / center / right
        icon: 'checkmark box', // icon in semantic-UI
        time: 3, // time
    })

}

function submitRewardHandler() {
    const newRewardInput = document.getElementById('reward-text-input');


    const data = {
        content: newRewardInput.value
    };

    post('/api/reward', data, reward => {

        console.log(reward);
        //make new reward here
        const rewardsDiv = document.getElementById('rewards');


        const segment = document.createElement('div');
        segment.setAttribute('id', reward.id);
        segment.className = 'ui compact segment';
        segment.onclick = claimReward;
        segment.innerText = newRewardInput.value;

        const num = document.createElement('i');
        num.className = 'ui horizontal right';
        num.innerText = 10;
        segment.appendChild(num);

        const icon = document.createElement('i');
        icon.className = 'large icon ui horizontal right';
        const image = document.createElement('img');
        image.src = "/static/css/img/two-coins.svg";
        icon.appendChild(image);
        segment.appendChild(icon);

        rewardsDiv.prepend(segment);
        newRewardInput.value = '';
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
            rewardsDiv.prepend(rewardDOMObject(currentReward, user));


        }
    });
}