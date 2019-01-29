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
        console.log(groupArr);
        for (j in groupArr) {

            get('/api/getSortedMembers', { "group_id": groupArr[j]._id }, function (oof) {
                let memberArr = oof.newMembers;
                console.log(memberArr);
                console.log(j);
                let members;
                const leaderboard = document.createElement('div');
                leaderboard.classList = 'eight wide computer column';

                //this doesn't work
                if (j === 0) {
                    leaderboard.style = 'border-top: none';
                }
                let innerBoi = '<h3 style="padding-left:10px; margin-bottom:-7px">' + oof.groupName + '</h3>';
                innerBoi += '<div class="ui segments">';
                innerBoi += '<div class="ui teal primary inverted segment fluid icon input"><div class="ui container" ><div class="ui grid"><div class="three wide column">Rank</div><div class="nine wide column">Name</div><div class="four wide column">xp:</div></div></div></div>'
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
                    innerBoi += '<div class="nine wide column">' + name + '</div>';
                    innerBoi += '<div class="four wide column ">' + xp + '</div>';
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
function renderOverallLeaderboards(user) {
    const leaderboardDiv = document.getElementById('renderOverallLeaderboards');
    get('/api/leaderboard', {}, function (memberArr) {
        console.log(memberArr);

        const leaderboard = document.createElement('div');
        leaderboard.classList = 'eight wide computer column';

        //this doesn't work
        if (j === 0) {
            leaderboard.style = 'border-top: none';
        }

        let innerBoi = '<div class="ui segments">';
        innerBoi += '<div class="ui teal primary inverted segment fluid icon input"><div class="ui container" ><div class="ui grid"><div class="three wide column">Rank</div><div class="nine wide column">Name</div><div class="four wide column">xp:</div></div></div></div>'
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
            innerBoi += '<div class="nine wide column">' + name + '</div>';
            innerBoi += '<div class="four wide column ">' + xp + '</div>';
            innerBoi += '</div></div></div>'
            //end for loop here
        }
        innerBoi += '</div>'

        leaderboard.innerHTML = innerBoi;
        leaderboardDiv.append(leaderboard);
    });
    get('/api/leaderboardAll', {}, function (memberArr) {
        console.log(memberArr);
        saveIndex = 0;
        let memArray = [];
        for (i in memberArr) {
            if (memberArr[i]._id === user._id) {
                saveIndex = parseInt(i);
                if (saveIndex < 1) {
                    saveIndex += 2;
                }
                if (saveIndex < 2) {
                    saveIndex += 1;
                }
                if (saveIndex > memberArr.length - 1) {
                    saveIndex -= 3;
                }
                console.log(memberArr[i]);
                break;
            }
        }
        for (let i = saveIndex - 2; i < saveIndex + 3; i++) {
            console.log(i, saveIndex);
            memArray.push(memberArr[i]);

        }
        console.log(memArray);
        const leaderboard = document.createElement('div');
        leaderboard.classList = 'eight wide computer column';

        //this doesn't work
        if (j === 0) {
            leaderboard.style = 'border-top: none';
        }

        let innerBoi = '<div class="ui segments">';
        innerBoi += '<div class="ui teal primary inverted segment fluid icon input"><div class="ui container" ><div class="ui grid"><div class="three wide column">Rank</div><div class="nine wide column">Name</div><div class="four wide column">xp:</div></div></div></div>'
        //insert for loop here
        for (i in memArray) {
            let type = "teal tertiary";
            let rank = parseInt(i) + saveIndex - 1;
            let name = memArray[i].name;
            let xp = memArray[i].xp;
            if (i % 2 !== 0) {
                type = "teal secondary";
            }
            if (memArray[i]._id === user._id) {
                type = "blue"
            }
            innerBoi += '<div class="ui ' + type + ' inverted segment"><div class="ui container" ><div class="ui grid">';
            innerBoi += '<div class="three wide column">#' + rank + '</div>';
            innerBoi += '<div class="nine wide column">' + name + '</div>';
            innerBoi += '<div class="four wide column ">' + xp + '</div>';
            innerBoi += '</div></div></div>'
            //end for loop here
        }
        innerBoi += '</div>'

        leaderboard.innerHTML = innerBoi;
        leaderboardDiv.append(leaderboard);
    });

}
function leaderMenu(text) {
    if (text === "overall") {
        document.getElementById('overall').className = "ui active teal item";
        document.getElementById('your').className = "ui teal item";
        document.getElementById('renderLeaderboards').style.display = 'none';
        document.getElementById('renderOverallLeaderboards').style.display = 'block';
    } else {
        document.getElementById('your').className = "ui active teal item";
        document.getElementById('overall').className = "ui teal item";
        document.getElementById('renderLeaderboards').style.display = 'block';
        document.getElementById('renderOverallLeaderboards').style.display = 'none';

    }
}

