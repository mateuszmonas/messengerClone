import {Conversation} from "../model/Conversation";
import {Message} from "../model/Message";
import {EventEmitter} from "eventemitter3";

export interface ListenerFn {
    (...args: Array<any>): void;
}

class WebController{

    constructor() {
        this.ee = new EventEmitter();
        this.ws = new WebSocket('ws://10.0.2.2:8080');
        this.ws.onmessage = (msg) => {
            this.ee.emit('newMessageEvent', msg.data);
        };
    }

    async subscribeToNewMessageEvent(fn: ListenerFn) {
        this.ee.on('newMessageEvent', fn);
    }

    async getConversationsList(userId: string) {
        try{
            let response = [
                {conversation: new Conversation('1', 'Witek')},
                {conversation: new Conversation('2', 'Krzysztof')}];
            return response;
        }catch (e) {

        }
    }

    async postMessage(message: Message){
        this.ws.send('0'+JSON.stringify(message));
    }

    async getMessages(conversationId: string) {
        this.ws.send('1');
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