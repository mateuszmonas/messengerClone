import {Message} from "../model/Message";
import {EventEmitter} from "eventemitter3";
import {AsyncStorage} from "react-native";
import {MessageServerURL, MessageWebSocketURL} from "../GlobalStrings";

export interface ListenerFn {
    (...args: Array<any>): void;
}

class WebController{

    constructor() {
        this.ee = new EventEmitter();
        this.newMessageSocket = new WebSocket(MessageWebSocketURL + '/getMessages');
        this.newMessageSocket.onmessage = (msg) => {
            this.ee.emit('newMessageEvent', msg.data);
        };
    }

    async subscribeToNewMessageEvent(fn: ListenerFn) {
        this.ee.on('newMessageEvent', fn);
    }

    async postMessage(message: Message){
        return fetch(MessageServerURL + '/postMessage',
            {
                method: 'POST',
                body: JSON.stringify(message)
            }).then(response => response.json());
    }

    getConversationsList() {
        return fetch(MessageServerURL + '/getConversations',
            {
                method: 'GET',
            }).then(response => response.json());
    }

    getMessages(conversationId: String) {
        return fetch(MessageServerURL + '/getMessages',
            {
                method: 'GET',
            }).then(response => response.json());
    }

    registerRequest(username: String, password: String) {
        return fetch(MessageServerURL + '/register', {
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
        return fetch(MessageServerURL + '/login', {
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
                    AsyncStorage.setItem('token', response.data.token);
                    AsyncStorage.setItem('userId', response.userId.toString());
                    this.token = response.data.token;
                    this.userId = response.userId;
                }
                return response;
            });
    }
}

export default new WebController();