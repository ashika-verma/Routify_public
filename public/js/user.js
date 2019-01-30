// function calculateXPCorrect(level) {
//     console.log(level);
//     sum = 0;
//     for (let i = 0; i < level; i++) {
//         sum += i * 100;
//     }
//     console.log(sum);
//     return sum;
// }

// 100 - 100
// 200 - 300
// 300 - 600
// 400 - 1000
// 500 - 1500
// 600 - 2100
// 700 - 2900
// 800 - 3700
// 900 - 4800

function renderUserInfo(user) {
    let oldLevel = user.level;
    let calculatedXp = 0;
    let levelTitle = '';
    if (user.xp > 4800) {
        user.level = 10;
        calculatedXp = user.xp - 4800;
        levelTitle = "GOD";
    } else if (user.xp > 3700) {
        user.level = 9;
        calculatedXp = user.xp - 3700;
    } else if (user.xp > 2900) {
        user.level = 8;
        calculatedXp = user.xp - 2900;
    } else if (user.xp > 2100) {
        user.level = 7;
        calculatedXp = user.xp - 2100;
    } else if (user.xp > 1500) {
        user.level = 6;
        calculatedXp = user.xp - 1500;
    } else if (user.xp > 1000) {
        user.level = 5;
        calculatedXp = user.xp - 1000;
    } else if (user.xp > 600) {
        user.level = 4;
        calculatedXp = user.xp - 600;
    } else if (user.xp > 300) {
        user.level = 3;
        calculatedXp = user.xp - 300;
    } else if (user.xp > 100) {
        user.level = 2;
        calculatedXp = user.xp - 100;
    } else {
        user.level = 1;
        calculatedXp = user.xp;
    }
    if (user.level !== oldLevel) {
        get('/api/whoami', {}, function (user) {
            post('/api/updateLevel', { id: user._id, newLevel: user.level });
        });
    }


    let level = user.level;
    let maxXP = level * 100;
    let maxGold = level * 50;
    if (user.gold > maxGold) {
        user.gold = maxGold;
        get('/api/whoami', {}, function (user) {
            post('/api/updateGold', { id: user._id, newGold: maxGold });
        });
    }
    //let calculatedXp = user.xp - calculateXPCorrect(level);
    let xppercentage = calculatedXp / maxXP;
    // if (calculatedXp > maxXP) {
    //     console.log('hi');
    //     level += 1;
    //     maxXP = level * 100;
    //     maxGold = level * 50;
    //     calculatedXp = user.xp - calculateXPCorrect(level);
    //     xppercentage = calculatedXp / maxXP;
    //     get('/api/whoami', {}, function (user) {
    //         post('/api/updateLevel', { id: user._id });
    //     });

    // }
    switch (level) {
        case 1:
            levelTitle = 'Novice';
            break;
        case 2:
            levelTitle = 'Neophyte';
            break;
        case 3:
            levelTitle = 'Initiate';
            break;
        case 4:
            levelTitle = 'Adept';
            break;
        case 5:
            levelTitle = 'Mage';
            break;
        case 6:
            levelTitle = 'Master';
            break;
        case 7:
            levelTitle = 'Headmaster';
            break;
        case 8:
            levelTitle = 'Grand Sorceror';
            break;
        case 8:
            levelTitle = 'Supreme Wizard';
            break;
        case 9:
            levelTitle = 'Archmage';
            break;
    }
    // Novice--------13 tasks
    // Neophyte------21 tasks
    // Initiate------34 tasks
    // Adept--------- 55 tasks
    // Mage----------89 tasks
    // Master--------144 tasks
    // Headmaster----- 233 tasks
    // Grand Sorceror - 377 tasks
    // Supreme Wizard - 610 tasks
    // Archmage------- 987 tasks

    //  console.log(user);
    let divToRender = "";
    divToRender += '<div class="no-hover item"><h3>' + user.name + '</h3></div>'
    divToRender += '<div class="no-hover item"><div class="teal ui ribbon label "> Level ' + level + ': ' + levelTitle + ' </div></div>'
    divToRender += '<div class="no-hover item"><div><i class="icon"><img src="/static/css/img/diamonds.svg"></i>' + user.xp + '</div><div id="xp-bar" class="ui active small progress teal"><div class="bar"></div><div class="label" style="text-align:right; color:teal">Until next level: ' + (maxXP - calculatedXp) + '/' + maxXP + '</div></div></div>';
    divToRender += '<div class="no-hover item"><div><i class="icon"><img src="/static/css/img/two-coins.svg"></i>' + user.gold + '/' + maxGold + '</div><div id="gold-bar" class="ui active small progress yellow"><div class="bar"></div></div></div>';
    //divToRender += '<div class="ui item"><h4> Join Party</h4></div>';
    divToRender += '<div onclick=logout() class="ui item"><h4>Log Out</h4></div>';
    let user_dropdown = document.getElementById('user_dropdown');
    user_dropdown.innerHTML = divToRender;
    document.getElementById('xp').textContent = user.xp;
    document.getElementById('gold').textContent = user.gold;


    if (user._id !== undefined) {
        //if the user exists
        //initialize dropdowns
        $('.ui.dropdown')
            .dropdown();
        $('#xp-bar').progress({
            percent: xppercentage * 100
        });
        $('#gold-bar').progress({
            percent: user.gold / maxGold * 100
        });
    }


}
function logout() {
    window.location.href = '/logout';
}
