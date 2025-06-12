import MessageDTO from "./message";

interface ForumDTO {
  id?: string; // unique identifier of the forum
  messages: Array<MessageDTO>; // list of messages of the forum
}

export default ForumDTO;
