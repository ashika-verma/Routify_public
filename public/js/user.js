function renderUserInfo(user) {

    let levelTitle = '';
    let level = user.level;
    let maxXP = level * 100;
    let maxGold = level * 50;
    let calculatedXp = user.xp - (level - 1) * 100;

    if (calculatedXp > maxXP) {
        level += 1;
        maxXP = level * 100;
        maxGold = level * 50;
        calculatedXp = user.xp - (level - 1) * 100;
        get('/api/whoami', {}, function (user) {
            post('/api/updateLevel', { id: user._id });
        });

    }
    let xppercentage = calculatedXp / maxXP;
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

    console.log(user);
    let divToRender = "";
    divToRender += '<div class="no-hover item"><h3>' + user.name + '</h3></div>'
    divToRender += '<div class="no-hover item"><div class="teal ui ribbon label "> Level ' + level + ': ' + levelTitle + ' </div></div>'
    divToRender += '<div class="no-hover item"><div><i class="icon"><img src="/static/css/img/diamonds.svg"></i>' + user.xp + '</div><div id="xp-bar" class="ui active small progress teal"><div class="bar"></div><div class="label" style="text-align:right; color:teal">Until next level: ' + calculatedXp + '/' + maxXP + '</div></div></div>';
    divToRender += '<div class="no-hover item"><div><i class="icon"><img src="/static/css/img/two-coins.svg"></i>' + user.gold + '/' + maxGold + '</div><div id="gold-bar" class="ui active small progress yellow"><div class="bar"></div></div></div>';
    divToRender += '<div class="ui item"><h4> Join Party</h4></div>';
    divToRender += '<div class="ui item"><h4> Log Out</h4></div>';
    let user_dropdown = document.getElementById('user_dropdown');
    user_dropdown.innerHTML = divToRender;

    if (user._id !== undefined) {
        //if the user exists
        //initialize dropdowns
        $('.ui.dropdown')
            .dropdown();
        $('#xp-bar').progress({
            percent: xppercentage * 100
        });
        console.log(xppercentage);
        $('#gold-bar').progress({
            percent: parseInt(user.gold)
        });
        console.log('i refuse to work;');
    }


}
