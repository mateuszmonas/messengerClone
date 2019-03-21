const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws, req) {
    ws.on('message', function incoming(message) {
        console.log('MessageServerURL: %s', req.url);
        switch (req.url) {
            case '/postMessage':
                ws.send(message);
                break;
            case '/getMessages':
                let response = '[{"messageId":"1","authorId":"1","text":"siemson"},' +
                            '{"messageId":"2","authorId":"2","text":"elo"},' +
                            '{"messageId":"3","authorId":"1","text":"co tam?"},' +
                            '{"messageId":"4","authorId":"2","text":"dobrze a u cb"},' +
                            '{"messageId":"5","authorId":"1","text":"tez dobrze"},' +
                            '{"messageId":"6","authorId":"2","text":"no to git"},' +
                            '{"messageId":"7","authorId":"1","text":"zgadza sie"},' +
                            '{"messageId":"8","authorId":"2","text":"to elo"}]';
                        ws.send(response);
                break;
        }
        // let str = message.substring(0,1);
        // message = message.substring(1);
        // if(str!=='{') {
        //     if (str === '0') {
        //         ws.send(message);
        //     } else if (str === '1') {
        //         let response = '[{"messageId":"1","authorId":"1","text":"siemson"},' +
        //             '{"messageId":"2","authorId":"2","text":"elo"},' +
        //             '{"messageId":"3","authorId":"1","text":"co tam?"},' +
        //             '{"messageId":"4","authorId":"2","text":"dobrze a u cb"},' +
        //             '{"messageId":"5","authorId":"1","text":"tez dobrze"},' +
        //             '{"messageId":"6","authorId":"2","text":"no to git"},' +
        //             '{"messageId":"7","authorId":"1","text":"zgadza sie"},' +
        //             '{"messageId":"8","authorId":"2","text":"to elo"}]';
        //         console.log('sending: %s', response);
        //         ws.send(response);
        //     }
        // }
    });
});