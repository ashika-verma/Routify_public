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
    Todo.find({}, function (err, todos) {
        res.send(todos);
    });
});

router.post(
    '/todo',
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
    function (req, res) {
        Todo.deleteOne({ _id: req.body.id }).exec();
        res.send({});

    }
);


//LONGTERM
router.get('/longterm', function (req, res) {
    LongTerm.find({}, function (err, todos) {
        res.send(todos);
    });
});

router.post(
    '/longterm',
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


//HABIT
router.get('/habit', function (req, res) {
    Habit.find({}, function (err, todos) {
        res.send(todos);
    });
});

router.post(
    '/habit',
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
    Reward.find({}, function (err, rewards) {
        res.send(rewards);
    });
});

router.post(
    '/reward',
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

/*

router.get('/user', function (req, res) {
    User.findOne({ _id: req.query._id }, function (err, user) {
        res.send(user);
    });
});

router.get('/stories', function (req, res) {
    Story.find({}, function (err, stories) {
        res.send(stories);
    });
});

router.post(
    '/story',
    connect.ensureLoggedIn(),
    function (req, res) {
        const newStory = new Story({
            'creator_id': req.user._id,
            'creator_name': req.user.name,
            'content': req.body.content,
        });



        newStory.save(function (err, story) {

            // configure socketio
            if (err) console.log(err);
        });

        User.findOne({ _id: req.user._id }, function (err, user) {
            user.last_post = req.body.content;
            user.save();
        });

        res.send({});
    }
);

router.get('/comment', function (req, res) {
    Comment.find({ parent: req.query.parent }, function (err, comments) {
        res.send(comments);
    })
});

router.post(
    '/comment',
    connect.ensureLoggedIn(),
    function (req, res) {
        const newComment = new Comment({
            'creator_id': req.user._id,
            'creator_name': req.user.name,
            'parent': req.body.parent,
            'content': req.body.content,
        });

        newComment.save(function (err, comment) {
            if (err) console.log(err);
        });

        res.send({});
    }
);*/
module.exports = router;
