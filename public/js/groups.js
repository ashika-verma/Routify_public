function createGroupModal() {
    //let todoID = this.parentElement.parentElement.id;
    //document.getElementById(todoID).innerText;
    //document.getElementById('create-group-input').value = "Name Group";
    $('.coupled.modal')
        .modal({
            allowMultiple: false
        })
        ;
    // attach events to buttons
    $('#new-group-modal')
        .modal('attach events', '#create-group-modal .approve.button')
        ;


    $('#create-group-modal')
        .modal({
            onApprove: function () {

                let colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink'];
                let chosen_color = colors[Math.floor(Math.random() * 10)];
                const newCont = document.getElementById('create-group-input').value;
                const data = {
                    color: chosen_color,
                    group_name: newCont,
                };

                // document.getElementById(todoID).firstElementChild.childNodes[1].textContent = newCont;
                post('/api/newGroup', data, function (code) {
                    console.log(code);
                });
            }
        })
        .modal('show');



}
function joinGroupModal() {
    $('#join-group-modal')
        .modal({
            onApprove: function () {

                const join_code = document.getElementById('join-group-input').value;
                const data = {
                    code: join_code
                };
                post('/api/joinGroup', data, function (member) {
                    if (member.already_member) {
                        alert("You are already a member!");
                    } else {

                    }
                });
            }
        })
        .modal('show');
}

// function leaveGroupModal() {
//     $('#leave-group-modal')
//         .modal({
//             onApprove: function () {

//                 const group_idboi = document.getElementById('leave-group-input').value;
//                 const data = {
//                     group_id: group_idboi
//                 };
//                 post('/api/leaveGroup', data, function (member) {
//                     if (member.already_member) {
//                         alert("You are already a member!");
//                     }
//                 });
//             }
//         })
//         .modal('show');
// }

function renderGroups(user) {
    console.log('i work');
    get('/api/getGroups', { "user": user._id }, function (groupArr) {
        console.log(groupArr);
        const bigGroupDiv = document.getElementById('groups');
        for (let i = 0; i < groupArr.length; i++) {
            const currentGroup = groupArr[i];

            const groupDiv = document.createElement('div');
            groupDiv.classList = currentGroup.color + " card";
            let innerHTMLBoi = '<div class="fixed-height content"><div class="header">' + currentGroup.name + '</div>';
            innerHTMLBoi += '<div class="meta"><span>Join Code: ' + currentGroup.code + '</span></div></div>';
            innerHTMLBoi += '<div class="content"><h4 class="ui sub header">Members</h4><div id="members-' + currentGroup._id + '" class="ui small feed">';
            innerHTMLBoi += '</div></div>';
            innerHTMLBoi += '<div id="' + currentGroup._id + '" class="extra content"><a class="red"><i class="sign in alternate icon"></i>Leave Group</a>';
            innerHTMLBoi += '</div>';
            groupDiv.innerHTML = innerHTMLBoi;
            bigGroupDiv.append(groupDiv);




            //appending stuff
            for (j in currentGroup.members) {
                let memberID = currentGroup.members[j];
                get('/api/getUserInfo', { "member_id": memberID }, function (member) {
                    console.log(member);
                    const members_p_div = document.getElementById('members-' + currentGroup._id);
                    const p_member = document.createElement('p');
                    p_member.innerText = member.name;
                    members_p_div.append(p_member);
                });
            }
            document.getElementById(currentGroup._id).firstElementChild.onclick = urmom;

        }
    });
}

function urmom() {
    console.log("hello!");
}