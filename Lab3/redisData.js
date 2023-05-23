const {createClient} = require("redis");
const client = createClient({
    password: 'J3zmUtDMV8FGhykQEufAxRGzPE4vQBHk',
    socket: {
        host: 'redis-16836.c250.eu-central-1-1.ec2.cloud.redislabs.com',
        port: 16836
    }
});

client.connect().then(r => console.log('Redis connected.'));

module.exports = client;