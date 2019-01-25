// dependencies
const express = require('express');
const router = express.Router();

// public endpoints
router.get('/', function (req, res, next) {
    // if (req.user) {
    //res.redirect("/user/" + req.user._id);
    res.sendFile('index.html', { root: 'src/views' });
    //   } else {
    //     res.sendFile('home.html', { root: 'src/views' });
    //}


});

router.get('/home', function (req, res, next) {
    res.sendFile('home.html', { root: 'src/views' });
});

router.get('/u/profile', function (req, res) {
    res.sendFile('profile.html', { root: 'src/views' });
});

router.get('/leaderboard', function (req, res) {

    // if (req.user) {
    //res.redirect("/user/" + req.user._id);
    res.sendFile('leaderboard.html', { root: 'src/views' });
    //  } else {
    //    res.sendFile('home.html', { root: 'src/views' });
    //}
});

router.get('/groups', function (req, res) {

    // if (req.user) {
    //res.redirect("/user/" + req.user._id);
    res.sendFile('groups.html', { root: 'src/views' });
    //  } else {
    //    res.sendFile('home.html', { root: 'src/views' });
    //}
});

module.exports = router;
