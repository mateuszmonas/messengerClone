import {Conversation} from "../model/Conversation";
import {Message} from "../model/Message";
import {EventEmitter} from "eventemitter3";

export interface ListenerFn {
    (...args: Array<any>): void;
}

class WebController{

    constructor() {
        this.ee = new EventEmitter();
        this.getMessagesWebSocket = new WebSocket('ws://10.0.2.2/getMessages:8080');
        this.postMessageWebSocket = new WebSocket('ws://10.0.2.2/postMessage:8080');
        this.getMessagesWebSocket.onmessage = (msg) => {
            this.ee.emit('newMessageEvent', msg.data);
        };
    }

    async subscribeToNewMessageEvent(fn: ListenerFn) {
        this.ee.on('newMessageEvent', fn);
    }

    async getConversationsList(userId: string) {
        try{
            let response = [
                new Conversation('1', 'Witek'),
                new Conversation('2', 'Krzysztof')];
            return response;
        }catch (e) {

        }
    }

    async postMessage(message: Message){
        this.postMessageWebSocket.send(JSON.stringify(message));
    }

    async getMessages(conversationId: string) {
        this.getMessagesWebSocket.send(conversationId);
    }

    registerRequest(username: string, password: string) {
        return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json());
    }

    loginRequest(username: string, password: string) {
        return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json());
    }
}

export default new WebController();