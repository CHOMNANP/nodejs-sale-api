const amqp = require('amqplib/callback_api');
const {
    rabbitmq: rabbitmqConfig
} = require("./config");

const path = require('path');
const fs = require('fs');

amqp.connect(rabbitmqConfig.connectionUrl, function (error0, connection) {

    if (error0) {
        throw error0;
    }

    //Message Queue
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        const rabbitmqDir = fs.readdirSync(path.resolve('./module/rabbitmq'));
        for (const _queue of rabbitmqDir) {
            if (_queue.endsWith(".js")) {
                let { register } = require(path.resolve(`./module/rabbitmq/${_queue}`));
                register(channel);
            }
        }

    });

});
