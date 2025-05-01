import { createHttpError } from "../../lib/http.js";
import { resolver } from "../../lib/graphql.js";

export class ChatResolver {
  /** @type {import("mongoose").Model} */
  Conversation;
  /** @type {import("mongoose").Model} */
  Message;
  /** @type {import("mongoose").Model} */
  TypingIndicator;
  /** @type {import("mongoose").Model} */
  MessageEditHistory;

  /** @type {import("dataloader")} */
  ConversationDataLoader;
  /** @type {import("dataloader")} */
  MessageDataLoader;
  /** @type {import("dataloader")} */
  TypingIndicatorDataLoader;
  /** @type {import("dataloader")} */
  MessageEditHistoryDataLoader;

  constructor() {}

  static get deps() {
    return [
      "Conversation",
      "Message",
      "TypingIndicator",
      "MessageEditHistory",

      "ConversationDataLoader",
      "MessageDataLoader",
      "TypingIndicatorDataLoader",
      "MessageEditHistoryDataLoader",
    ];
  }

  getResolvers() {
    return {};
  }
}
