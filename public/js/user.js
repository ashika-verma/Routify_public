function renderUserInfo(user) {
    console.log(user);
    let divToRender = "";
    divToRender += '<div class="no-hover item"><h3>' + user.name + '</h3></div>'
    divToRender += '<div class="no-hover item"><div class="teal ui ribbon label "> Level ' + user.level + ': Warrior </div></div>'
    divToRender += '<div class="no-hover item"><div><i class="icon"><img src="/static/css/img/diamonds.svg"></i>' + user.xp + '/160</div><div id="xp-bar" class="ui active small progress teal"><div class="bar"></div></div></div>';
    divToRender += '<div class="no-hover item"><div><i class="icon"><img src="/static/css/img/hearts.svg"></i>' + user.health + '/160</div><div id="health-bar" class="ui active small progress red"><div class="bar"></div></div></div>';
    divToRender += '<div class="no-hover item"><div><i class="icon"><img src="/static/css/img/two-coins.svg"></i>' + user.gold + '/160</div><div id="gold-bar" class="ui active small progress yellow"><div class="bar"></div></div></div>';
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
            percent: parseInt(user.xp)
        });
        $('#health-bar').progress({
            percent: parseInt(user.health)
        });
        console.log(typeof user.health)
        $('#gold-bar').progress({
            percent: parseInt(user.gold)
        });
        console.log('i refuse to work;');
    }


}
document.getElementById('user_dropdown').onclick = function () {
    get('/api/whoami', {}, function (user) {
        console.log('whooo')
        $('#xp-bar').progress({
            percent: user.xp
        });
        $('#health-bar').progress({
            percent: user.health
        });
        $('#gold-bar').progress({
            percent: user.gold
        });
    });

}