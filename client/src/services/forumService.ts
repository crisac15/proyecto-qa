// API fetch routes for Activities
// - addMessage in Forum
// - addReply to Message

import type { Message } from "@/lib/types";
import { API_URL } from "@/lib/api";

/**
 * Adding message to forum
 * @param wid the workplan used
 * @param aid the activity in the workplan used
 * @param message the message that will be in the forum
 */
export async function addMessage(
  wid: string,
  aid: string,
  message: Message
): Promise<Message> {
  const response = await fetch(
    `${API_URL}/workplans/${wid}/activities/${aid}/forum`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }
  );
  const data = await response.json();
  return data;
}

/**
 * Adding message to forum
 * @param wid the workplan used
 * @param aid the activity in the workplan used
 * @param mid the message that will be replied
 * @param message the message that will be in the forum
 */
export async function replyMessage(
  wid: string,
  aid: string,
  mid: string,
  reply: Message
) {
  await fetch(`${API_URL}/workplans/${wid}/activities/${aid}/forum/${mid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reply),
  });
}
