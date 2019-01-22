// dependencies
const express = require('express');
const router = express.Router();

// public endpoints
router.get('/', function (req, res, next) {
    res.sendFile('index.html', { root: 'src/views' });
});

router.get('/home', function (req, res, next) {
    res.sendFile('home.html', { root: 'src/views' });
});

router.get('/u/profile', function (req, res) {
    res.sendFile('profile.html', { root: 'src/views' });
});

router.get('/leaderboard', function (req, res) {
    res.sendFile('leaderboard.html', { root: 'src/views' });
});

module.exports = router;
