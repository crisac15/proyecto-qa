"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor(IDorDTO, user, date, content, replies) {
        if (typeof IDorDTO === "string") {
            this.id = IDorDTO;
            this.user = user;
            this.date = date;
            this.content = content;
            this.replies = replies;
        }
        else {
            this.id = IDorDTO.id;
            this.user = IDorDTO.user;
            this.date = IDorDTO.date;
            this.content = IDorDTO.content;
            if (IDorDTO.replies) {
                this.replies = IDorDTO.replies.map((replyDTO) => new Message(replyDTO));
            }
            else {
                this.replies = [];
            }
        }
    }
    //Getters
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getUser() {
        return this.user;
    }
    getdate() {
        return this.date;
    }
    getcontent() {
        return this.content;
    }
    getReplies() {
        return this.replies;
    }
    //Setters
    setUser(user) {
        this.user = user;
    }
    setDate(date) {
        this.date = date;
    }
    setContent(content) {
        this.content = content;
    }
    setReplies(replies) {
        this.replies = replies;
    }
    addReply(reply) {
        this.replies.push(reply);
    }
}
exports.default = Message;
//# sourceMappingURL=Message.js.map