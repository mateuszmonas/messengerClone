import {EventEmitter} from "eventemitter3";
import {AsyncStorage} from "react-native";
import {AuthenticationServerURL, MessageServerURL, MessageWebSocketURL} from "../GlobalStrings";

export interface ListenerFn {
    (...args: Array<any>): void;
}

class WebController{

    async connectToSocket() {
        console.log('connectToSocket');
        if (this.username === undefined) {
            this.username = await AsyncStorage.getItem('username');
        }
        this.ee = new EventEmitter();
        this.newMessageSocket = new WebSocket(MessageWebSocketURL);
        this.newMessageSocket.onerror = (msg) => {
            console.log(msg);
        };
        this.newMessageSocket.onopen = (msg) => {
            console.log('onopen');
            this.newMessageSocket.send(JSON.stringify({username: this.username}));
        };
        this.newMessageSocket.onmessage = (msg) => {
            console.log('got websocket msg');
            this.ee.emit('newMessageEvent');
        };
        this.newMessageSocket.onclose = (msg) => {
            console.log('onclose');
            this.newMessageSocket.send(JSON.stringify({username: this.username}));
        };
    }

    constructor() {
        this.getUserData();
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

    async addUserToConversation(username: [], conversationId: number) {
        return fetch(MessageServerURL + `/addUserToConversation`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({conversationId: conversationId, users: username})
            }).then(response => response.json());
    }

    async postConversation(conversationName: String, users: []) {
        users.concat(this.username);
        return fetch(MessageServerURL + `/createConversation`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({name: conversationName})
            }).then(response => response.json())
            .then(response => {
                this.addUserToConversation(users, response.id).done();
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