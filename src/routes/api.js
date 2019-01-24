// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

// models
const User = require('../models/user');
const Todo = require('../models/todo');
const LongTerm = require('../models/longterm');
const Habit = require('../models/habit');
const Reward = require('../models/reward');

// const Story = require('../models/story');
// const Comment = require('../models/comment');

const router = express.Router();

// api endpoints
router.get('/whoami', function (req, res) {

    if (req.isAuthenticated()) {
        res.send(req.user);
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
        });
        newReward.save(function (err, reward) {

            // configure socketio
            if (err) console.log(err);
            res.send({ "id": reward._id });
        });

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



module.exports = router;
