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
    //let todoID = this.parentElement.parentElement.id;
    //document.getElementById(todoID).innerText;
    //document.getElementById('create-group-input').value = "Name Group";

    $('#join-group-modal')
        .modal({
            onApprove: function () {

                const join_code = document.getElementById('join-group-input').value;
                const data = {
                    code: join_code
                };

                // document.getElementById(todoID).firstElementChild.childNodes[1].textContent = newCont;
                post('/api/joinGroup', data, function (member) {
                    if (member.already_member) {
                        alert("You are already a member!");
                    }
                });
            }
        })
        .modal('show');



}

function renderGroups() {
    // <div class="red card">
    //     <div class="content">
    //         <div class="header">Safety Frosh</div>
    //         <div class="meta">
    //             <span>Join Code: 503849</span>
    //         </div>
    //     </div>
    //     <div class="content">
    //         <h4 class="ui sub header">Members</h4>
    //         <div class="ui small feed">
    //             <p>Ashika</p>
    //             <p>Ashika</p>
    //             <p>Ashika</p>
    //         </div>
    //     </div>

    //     <div class="extra content">
    //         <a class="red">
    //             <i class="sign in alternate icon"></i>
    //             Leave Group
    //         </a>
    //     </div>
    // </div>

}