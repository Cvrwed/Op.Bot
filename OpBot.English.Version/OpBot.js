const mineflayer = require('mineflayer');
//const minecraftData = require('minecraft-data');
//const vec3 = require('vec3');
const crypto = require('crypto');

class Bot {
    constructor(username) {
        this.bot = mineflayer.createBot({
            username: username,
            password: crypto.randomBytes(3).toString('hex'),
            version: '1.16.5',
            host: 'uvalubia.me',
            port: 25565,
            hideErrors: true,
            keepAlive: true,
        });

        this.bot.on('message', (message) => {
            console.log(message.toAnsi());
        });

        this.bot.once('spawn', () => {
            this.flight(); // Start flying when the bot spawns
        });

        const pass = "Manolo123+";
        let sessionStart = false; 
        let registerStart = false; 
        let tpAcceptSent = false; 

        this.bot.on('message', (message) => {
            if (message.toString().includes('/login') && !sessionStart) {
                this.bot.chat(`/login ${pass}`);
                sessionStart = true;
            } else if (message.toString().includes('/register') && !registerStart) {
                this.bot.chat(`/register ${pass} ${pass}`);
                registerStart = true;
            } else if (message.toString().includes('/tpaccept') && !tpAcceptSent) {
                this.bot.chat('/tpaccept');
                tpAcceptSent = true;
            }
        });


        this.bot.on('disconnect', (packet) => {
            console.log(`[${username}] Disconnected: ` + packet.reason);
        });

        this.bot.on('end', () => {
            console.log(`[${username}] Connection Lost.`);
        });

        this.bot.on('error', (err) => {
        console.log(err);
        });
    }

    flight() {
        this.bot.creative.startFlying(true);
        this.bot.setControlState('jump', true);
    }

    joinBots(numBots) {
        let i = 0;
        const interval = setInterval(() => {
        if (i < numBots) {
            i++;
            const username = crypto.randomBytes(8).toString('hex');
            new Bot(username);
        } else {
            clearInterval(interval);
        }
        }, 5000);
    }
}

const numBots = 200;
new Bot('Tzt251').joinBots(numBots);
