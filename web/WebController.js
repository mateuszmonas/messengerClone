import {Conversation} from "../model/Conversation";
import {Message} from "../model/Message";

class WebController{

    ws = new WebSocket('ws://10.0.2.2:8080');

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
        this.ws.send(JSON.stringify(message));
    }

    async getMessages(conversationId: string) {
        try{
            let response = [
                {message: new Message('1', '1', 'Cześć')},
                {message: new Message('2', '2', 'Witam')},
                {message: new Message('3', '1', 'Jak Sie Masz?')},
                {message: new Message('4', '2', 'Bardzo dobrz, a ty?')},
                {message: new Message('5', '1', 'wybitnie')},
                {message: new Message('6', '2', 'To świetnie')},
                {message: new Message('7', '1', 'zgadza sie')}];
            return response;
        }catch (e) {

        }
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