// Purpose: Interface for Message.

interface MessageDTO {
  id?: string; // unique identifier of the message
  user: string; // user that sent the message
  date: Date; // date of the message
  content: string; // content of the message
  replies?: Array<MessageDTO>; // replies list of the message
}

export default MessageDTO;
