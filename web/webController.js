import {Conversation} from "../model/Conversation";

export class webController{
    static async getConversationsList(userId: string) {
        try{
            let response = [
                {conversation: new Conversation('1', 'Witek')},
                {conversation: new Conversation('2', 'Krzysztof')}];
            return response;
        }catch (e) {

        }
    }

    static async getMessages(conversationId: string) {

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