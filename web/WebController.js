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

    async registerRequest(username: string, password: string) {

    }

    async loginRequest(username: string, password: string) {
        let token = '1928u498012uuer981u2hd';
        let userId = '321';
        try{
            return {token: token, userId: userId}
        }catch (e) {

        }
    }
}

export default new WebController();