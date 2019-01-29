

function main() {
    get('/api/whoami', {}, function (user) {
        console.log(user);
        renderUserInfo(user);
        renderLeaderboards(user);
        renderOverallLeaderboards(user);
    });
}

main();