module.exports = {
    PORT: 3000,
    USERS: process.cwd() + '/db/users.json',
    MSGS: process.cwd() + '/db/messages.json',
    jwtSecret: 'secret',
    jwtExpiresIn: '1h'
}