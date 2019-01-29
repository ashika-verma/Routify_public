// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

// models
const User = require('../models/user');
const Todo = require('../models/todo');
const LongTerm = require('../models/longterm');
const Habit = require('../models/habit');
const Reward = require('../models/reward');
const Group = require('../models/group');

// const Story = require('../models/story');
// const Comment = require('../models/comment');

const router = express.Router();

// api endpoints
router.get('/whoami', function (req, res) {

    if (req.isAuthenticated()) {
        console.log(req.user);
        console.log(req.user._id);
        User.findOne({ _id: req.user._id }).then(user => {
            console.log(user);
            res.send(user);
        })

    }
    else {
        //res.redirect('/home');

        res.send({});
    }
});


//TODO
router.get('/todo', function (req, res) {
    Todo.find({ creator_id: req.user }, function (err, todos) {
        res.send(todos);
    });

});

router.post(
    '/todo',
    connect.ensureLoggedIn(),
    function (req, res) {
        const newTodo = new Todo({
            'creator_id': req.user._id,
            'text': req.body.content,
            'complete': req.body.complete,
        });
        newTodo.save(function (err, todo) {

            // configure socketio
            if (err) console.log(err);
            res.send({ "id": todo._id });
        });

    }
);

router.post(
    '/todoChecked',
    connect.ensureLoggedIn(),
    function (req, res) {
        Todo.findOne({ _id: req.body.id }, function (err, todo) {
            //res.send(todo);
            todo.complete = req.body.checked;

            todo.save(function (err) {
                if (err) console.log(err);
            });

        });
        User.findOne({ _id: req.user }, function (err, user) {
            console.log(user);
            console.log(user.xp);
            user.xp += 10;
            user.save(function (err) {
                if (err) console.log(err);
            });
        });

        res.send({});
    }
);
router.post(
    '/todoUpdated',
    connect.ensureLoggedIn(),
    function (req, res) {
        Todo.findOne({ _id: req.body.id }, function (err, todo) {
            //res.send(todo);
            todo.text = req.body.content;

            todo.save(function (err) {
                if (err) console.log(err);
            });

        });

        res.send({});
    }
);

router.post(
    '/todoDeleted',
    connect.ensureLoggedIn(),
    function (req, res) {
        Todo.deleteOne({ _id: req.body.id }).exec();
        res.send({});

    }
);


//LONGTERM
router.get('/longterm', function (req, res) {
    LongTerm.find({ creator_id: req.user }, function (err, todos) {
        res.send(todos);
    });
});

router.post(
    '/longterm',
    connect.ensureLoggedIn(),
    function (req, res) {
        const newLongTerm = new LongTerm({
            'creator_id': req.user._id,
            'text': req.body.content,
            'percentage': req.body.percentage
        });
        newLongTerm.save(function (err, longterm) {

            // configure socketio
            if (err) console.log(err);
            res.send({ "id": longterm._id });
        });

    }
);

router.post(
    '/longtermUpdated',
    connect.ensureLoggedIn(),
    function (req, res) {
        LongTerm.findOne({ _id: req.body.id }, function (err, longterm) {
            //res.send(todo);
            longterm.percentage = req.body.percentage;
            longterm.save(function (err) {
                if (err) console.log(err);
            });

        });

        res.send({});
    }
);

router.post(
    '/longtermModalUpdated',
    connect.ensureLoggedIn(),
    function (req, res) {
        LongTerm.findOne({ _id: req.body.id }, function (err, todo) {
            //res.send(todo);
            todo.text = req.body.content;

            todo.save(function (err) {
                if (err) console.log(err);
            });

        });
        res.send({});
    }
);

router.post(
    '/longtermDeleted',
    connect.ensureLoggedIn(),
    function (req, res) {
        LongTerm.deleteOne({ _id: req.body.id }).exec();
        res.send({});

    }
);

//HABIT
router.get('/habit', function (req, res) {

    Habit.find({ creator_id: req.user }, function (err, todos) {
        res.send(todos);
    });
});

router.post(
    '/habit',
    connect.ensureLoggedIn(),
    function (req, res) {
        const newHabit = new Habit({
            'creator_id': req.user._id,
            'text': req.body.content,
            'count': req.body.count
        });
        newHabit.save(function (err, habit) {

            // configure socketio
            if (err) console.log(err);
            res.send({ "id": habit._id });
        });

    }
);
router.post(
    '/habitUpdated',
    connect.ensureLoggedIn(),
    function (req, res) {
        Habit.findOne({ _id: req.body.id }, function (err, habit) {
            //res.send(todo);
            habit.count = req.body.count;

            habit.save(function (err) {
                if (err) console.log(err);
            });

        });

        res.send({});
    }
);
router.post(
    '/habitDeleted',
    connect.ensureLoggedIn(),
    function (req, res) {
        Habit.deleteOne({ _id: req.body.id }).exec();
        res.send({});

    }
);
router.post(
    '/habitModalUpdated',
    connect.ensureLoggedIn(),
    function (req, res) {
        Habit.findOne({ _id: req.body.id }, function (err, todo) {
            //res.send(todo);
            todo.text = req.body.content;

            todo.save(function (err) {
                if (err) console.log(err);
            });

        });
        res.send({});
    }
);

//REWARD
router.get('/reward', function (req, res) {
    Reward.find({ creator_id: req.user }, function (err, rewards) {
        res.send(rewards);
    });
});

router.post(
    '/reward',
    connect.ensureLoggedIn(),
    function (req, res) {
        const newReward = new Reward({
            'creator_id': req.user._id,
            'text': req.body.content,
            'reward': req.body.reward
        });
        newReward.save(function (err, reward) {

            // configure socketio
            if (err) console.log(err);
            res.send({ "id": reward._id });
        });

    }
);
router.post(
    '/rewardDeleted',
    connect.ensureLoggedIn(),
    function (req, res) {
        Reward.deleteOne({ _id: req.body.id }).exec();
        res.send({});

    }
);
router.post(
    '/rewardModalUpdated',
    connect.ensureLoggedIn(),
    function (req, res) {
        Reward.findOne({ _id: req.body.id }, function (err, todo) {
            //res.send(todo);
            todo.text = req.body.content;

            todo.save(function (err) {
                if (err) console.log(err);
            });

        });
        res.send({});
    }
);


//LEADERBOARD STUFF
router.get('/leaderboard', function (req, res) {
    User.find({}).sort({ xp: -1 }).limit(5).exec(
        function (err, users) {

            res.send(users)
        }
    );
});


//GROUP STUFF
router.post(
    '/newGroup',
    connect.ensureLoggedIn(),

    function (req, res) {
        let code = Math.round(100000 + Math.random() * 900000);
        let code_string = "" + code;

        // Group.find({ code: code_string }, function (err, groups) {
        //     if (err) {
        //         //if doesn't exist, do things
        //     }
        //     res.send(rewards);
        // });
        const newGroup = new Group({
            'name': req.body.group_name,
            'color': req.body.color,
            'code': code_string,
            'members': [req.user._id]
        });
        newGroup.save(function (err, habit) {

            // configure socketio
            if (err) console.log(err);
            res.send({ "code": code_string });
        });

    }
);
router.post(
    '/joinGroup',
    connect.ensureLoggedIn(),
    function (req, res) {
        // console.log(req);
        Group.findOne({ code: req.body.code }, function (err, group) {

            console.log(req.body.code);
            console.log(group);
            if (group !== null) {

                //       group.members.addToSet(req.user._id);
                if (group.members.includes(req.user._id)) {
                    console.log("YOu're already a memeber");
                    res.send({ "already_member": true });
                } else {
                    group.members.push(req.user._id);
                    group.save(function (err) {
                        if (err) console.log(err);
                    });
                    res.send({ "already_member": false });
                }
            }
            // let size = group.members.size;
        });
    }
);

router.post(
    '/leaveGroup',
    connect.ensureLoggedIn(),
    function (req, res) {
        console.log(req.query.group_id);
        Group.findOne({ _id: req.body.group_id }, function (err, group) {
            console.log(group.members);
            group.members.pull(req.user._id);
            group.save(function (err) {
                if (err) console.log(err);
            });
            res.send({});

        });
    }
);
router.get('/getGroups', function (req, res) {
    Group.find({ members: req.user._id }, function (err, groups) {
        res.send(groups);
    });
});
router.get('/getUserInfo', function (req, res) {
    User.findOne({ _id: req.query.member_id }, function (err, User) {
        res.send(User);
    });
});



router.get('/getSortedMembers', function (req, res) {
    Group.findOne({ _id: req.query.group_id }, function (err, group) {
        //console.log(group);
        members = group.members;
        console.log(members);
        Promise.all(members.map(id => User.findOne({ _id: id }))).then(newMembers => {
            console.log(newMembers);
            newMembers.sort(function (a, b) {
                return b.xp - a.xp;
            })
            res.send(newMembers);
        })
        // console.log(members);
        // let memberUserList = [];
        // for (i = 0; i < members.length; i++) {
        //     console.log('actual: ' + i);
        //     please(i);
        //     User.findOne({ _id: members[i] }, function (err, boi) {
        //         memberUserList.push(boi);
        //         console.log('async: ' + i);
        //         if (memberUserList.length === members.length) {
        //             memberUserList.sort(function (a, b) {
        //                 return b.xp - a.xp;
        //             })
        //             console.log("im list: " + memberUserList)
        //             res.send(memberUserList);
        //         }
        //     });
        // }
    });
});
function please(i) {
    console.log("hi im i: " + i);
}


module.exports = router;
