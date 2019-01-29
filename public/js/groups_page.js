function main() {
    get('/api/whoami', {}, function (user) {

        console.log(user);
        renderUserInfo(user);
        renderGroups(user);
    });
}

main();
