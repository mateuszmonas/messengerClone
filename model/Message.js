export class Message{
    messageId: String;
    authorId: String;
    text: String;

    constructor(messageId: String, authorId: String, text: String) {
        this.messageId = messageId;
        this.authorId = authorId;
        this.text = text;
    }
}