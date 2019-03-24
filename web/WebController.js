import {EventEmitter} from "eventemitter3";
import {AsyncStorage} from "react-native";
import {AuthenticationServerURL, MessageServerURL, MessageWebSocketURL} from "../GlobalStrings";

export interface ListenerFn {
    (...args: Array<any>): void;
}

class WebController{

    constructor() {
        this.ee = new EventEmitter();
        this.newMessageSocket = new WebSocket(MessageWebSocketURL + '/getMessages');
        this.getUserData();
        this.newMessageSocket.onmessage = (msg) => {
            this.ee.emit('newMessageEvent', msg.data);
        };
    }

    async getUserData() {
        this.token = await AsyncStorage.getItem('token');
        this.userId = await AsyncStorage.getItem('userId');
        this.username = await AsyncStorage.getItem('username');
    }

    async subscribeToNewMessageEvent(fn: ListenerFn) {
        this.ee.on('newMessageEvent', fn);
    }

    async postMessage(text: String, conversationId: number) {
        return fetch(MessageServerURL + '/sendMessage',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    conversationId: conversationId,
                    userName: this.username,
                    text: text
                })
            }).then(response => response.json());
    }

    async addUserToConversation(username: String, conversationId: number) {
        return fetch(MessageServerURL + `/addUserToConversation`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({conversationId: conversationId, userLogin: username})
            }).then(response => response.json());
    }

    async postConversation(conversationName: String, users: []) {
        return fetch(MessageServerURL + `/createConversation`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({name: conversationName})
            }).then(response => response.json())
            .then(response => {
            this.addUserToConversation(this.username, response.id)
                .catch(console.log);
            return response;
        }).then(response => {
                for (let i = 0; i < users.length; i++) {
                    this.addUserToConversation(users[i], response.id)
                        .catch(console.log);
                }
            return response;
        });
    }

    async getConversationsList() {
        return fetch(MessageServerURL + `/getConversations/${this.userId}`,
            {
                method: 'GET',
            }).then(response => response.json());
    }

    async getMessages(conversationId: String) {
        return fetch(MessageServerURL + `/getConversationMessages/${conversationId}`,
            {
                method: 'GET'
            }).then(response => response.json());
    }

    async registerRequest(username: String, password: String) {
        return fetch(AuthenticationServerURL + '/register', {
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

    async loginRequest(username: String, password: String) {
        return fetch(AuthenticationServerURL + '/login', {
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
                    AsyncStorage.setItem('username', username);
                    AsyncStorage.setItem('userId', response.id.toString());
                    this.token = response.data.token;
                    this.userId = response.id;
                    this.username = username;
                }
                return response;
            });
    }
}

export default new WebController();