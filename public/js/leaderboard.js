

function main() {
    get('/api/whoami', {}, function (user) {
        console.log(user);
        renderLeaderboards(user);
        renderOverallLeaderboards(user);
    });
}

main();