"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Forum {
    // Constructor
    constructor(messages // list of messages of the forum
    ) {
        messages ? (this.messages = messages) : (this.messages = []);
    }
    getMessages() {
        return this.messages;
    }
    setMessages(messages) {
        this.messages = messages;
    }
    addMessage(message) {
        this.messages.push(message);
    }
}
exports.default = Forum;
//# sourceMappingURL=Forum.js.map