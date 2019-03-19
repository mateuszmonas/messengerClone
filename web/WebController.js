import {Conversation} from "../model/Conversation";
import {Message} from "../model/Message";
import {EventEmitter} from "eventemitter3";

export interface ListenerFn {
    (...args: Array<any>): void;
}

class WebController{

    constructor() {
        this.ee = new EventEmitter();
        this.getMessagesWebSocket = new WebSocket('ws://10.0.2.2:8080/getMessages');
        this.postMessageWebSocket = new WebSocket('ws://10.0.2.2:8080/postMessage');
        this.getMessagesWebSocket.onmessage = (msg) => {
            this.ee.emit('newMessageEvent', msg.data);
        };
    }

    async subscribeToNewMessageEvent(fn: ListenerFn) {
        this.ee.on('newMessageEvent', fn);
    }

    async getConversationsList(userId: String) {
        try{
            let response = [
                new Conversation('1', 'Witek'),
                new Conversation('2', 'Krzysztof')];
            return response;
        }catch (e) {

        }
    }

    async postMessage(message: Message){
        console.log(JSON.stringify(message));
        this.postMessageWebSocket.send(JSON.stringify(message));
    }

    async getMessages(conversationId: String) {
        this.getMessagesWebSocket.send(conversationId);
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
        }).then((response) => response.json());

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
        }).then((response) => response.json());

    }
}

export default new WebController();