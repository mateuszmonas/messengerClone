import {Message} from "../model/Message";
import {EventEmitter} from "eventemitter3";

export interface ListenerFn {
    (...args: Array<any>): void;
}

class WebController{

    constructor() {
        this.ee = new EventEmitter();
        this.newMessageSocket = new WebSocket('ws://10.0.2.2:8080/getMessages');
        this.postMessageWebSocket = new WebSocket('ws://10.0.2.2:8080/postMessage');
        this.newMessageSocket.onmessage = (msg) => {
            this.ee.emit('newMessageEvent', msg.data);
        };
    }

    async subscribeToNewMessageEvent(fn: ListenerFn) {
        this.ee.on('newMessageEvent', fn);
    }

    async postMessage(message: Message){
        console.log(JSON.stringify(message));
        this.postMessageWebSocket.send(JSON.stringify(message));
    }

    getConversationsList() {
        return fetch('http://10.0.2.2:3000/getConversations',
            {
                method: 'GET',
            }).then(response => response.json());
    }

    getMessages(conversationId: String) {
        return fetch('http://10.0.2.2:3000/getMessages',
            {
                method: 'GET',
            }).then(response => response.json());
    }

    registerRequest(username: String, password: String) {
        return fetch('http://10.0.2.2:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: username,
                password: password
            })
        }).then(response => response.json());
    }

    loginRequest(username: String, password: String) {
        return fetch('http://10.0.2.2:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: username,
                password: password,
            })
        }).then((response) => response.json())
            .then(response => {
                if (response.success) {
                    this.token = response.data.token;
                    this.userId = response.userId;
                }
                return response;
            });
    }
}

export default new WebController();