import {Conversation} from "../model/Conversation";
import {Message} from "../model/Message";

export class WebController{

    static async getConversationsList(userId: string) {
        try{
            let response = [
                {conversation: new Conversation('1', 'Witek')},
                {conversation: new Conversation('2', 'Krzysztof')}];
            return response;
        }catch (e) {

        }
    }

    static async postMessage(message: Message){

    }

    static async getMessages(conversationId: string) {
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

    static async registerRequest(username: string, password: string) {

    }

    static async loginRequest(username: string, password: string) {
        let token = '1928u498012uuer981u2hd';
        let userId = '321';
        try{
            return {token: token, userId: userId}
        }catch (e) {

        }
    }
}