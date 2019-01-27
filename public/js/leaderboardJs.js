//<div style="border-top:none" class="eight wide computer column">
//    <div class="ui segments">
// <div class="ui teal primary inverted segment fluid icon input">
//     <div class="ui container">
//         <div class="ui grid">
//             <div class="three wide column">Rank</div>
//             <div class="eleven wide column">Name</div>
//             <div class="two wide column large screen only">xp:</div>
//         </div>
//     </div>
// </div>
// <div class="ui teal tertiary inverted segment">
//     <div class="ui container">
//         <div class="ui grid">
// <div class="three wide column">#1</div>
// <div class="eleven wide column">Ashika</div>
// <div class="two wide column large screen only">120</div>
//         </div>
//     </div>
// </div>
/*<div class="ui teal secondary inverted segment">
    <div class="ui container">
        <div class="ui grid">
            <div class="three wide column">#2</div>
            <div class="eleven wide column">Your mom</div>
            <div class="two wide column large screen only">114</div>
        </div>
    </div>
</div>
<div class="ui teal tertiary inverted segment">
    <div class="ui container">
        <div class="ui grid">
            <div class="three wide column">#3</div>
            <div class="eleven wide column">asdf</div>
            <div class="two wide column large screen only">110</div>
        </div>
    </div>
</div>*/
//     </div>
// </div>

function renderLeaderboards(user) {


    get('/api/getGroups', { "user": user._id }, function (groupArr) {
        const leaderboardDiv = document.getElementById('renderLeaderboards');
        for (j in groupArr) {
            // let currentGroup = groupArr[j];

            get('/api/getSortedMembers', { "group_id": groupArr[j]._id }, function (memberArr) {
                console.log(memberArr);
                console.log(j);
                let members;
                const leaderboard = document.createElement('div');
                leaderboard.classList = 'four wide computer column';

                //this doesn't work
                if (j === 0) {
                    leaderboard.style = 'border-top: none';
                }

                let innerBoi = '<div class="ui segments">';
                innerBoi += '<div class="ui teal primary inverted segment fluid icon input"><div class="ui container" ><div class="ui grid"><div class="three wide column">Rank</div><div class="eleven wide column">Name</div><div class="two wide column">xp:</div></div></div></div>'
                //insert for loop here
                for (i in memberArr) {
                    let type = "teal tertiary";
                    let rank = parseInt(i) + 1;
                    let name = memberArr[i].name;
                    let xp = memberArr[i].xp;
                    if (i % 2 !== 0) {
                        type = "teal secondary";
                    }
                    if (memberArr[i]._id === user._id) {
                        type = "blue"
                    }
                    innerBoi += '<div class="ui ' + type + ' inverted segment"><div class="ui container" ><div class="ui grid">';
                    innerBoi += '<div class="three wide column">#' + rank + '</div>';
                    innerBoi += '<div class="eleven wide column">' + name + '</div>';
                    innerBoi += '<div class="two wide column ">' + xp + '</div>';
                    innerBoi += '</div></div></div>'
                    //end for loop here
                }
                innerBoi += '</div>'

                leaderboard.innerHTML = innerBoi;
                leaderboardDiv.append(leaderboard);
            });

        }

    });

}


