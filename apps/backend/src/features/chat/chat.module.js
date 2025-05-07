import {
  createConversationDataLoader,
  createConversationModel,
  createMessageDataLoader,
  createMessageEditHistoryDataLoader,
  createMessageEditHistoryModel,
  createMessageModel,
  createTypingIndicatorDataLoader,
  createTypingIndicatorModel,
} from "./chat.model.js";
import { ChatResolver } from "./chat.resolver.js";
import { ChatServer } from "./chat.server.js";

export class ChatModule {
  /**
   * Registers services in the container.
   * @param {import("bottlejs")} di - The unique name of the service.
   */
  static async register(di) {
    di.factory("Conversation", createConversationModel);
    di.factory("Message", createMessageModel);
    di.factory("TypingIndicator", createTypingIndicatorModel);
    di.factory("MessageEditHistory", createMessageEditHistoryModel);

    di.factory("ConversationDataLoader", createConversationDataLoader);
    di.factory("MessageDataLoader", createMessageDataLoader);
    di.factory("TypingIndicatorDataLoader", createTypingIndicatorDataLoader);
    di.factory(
      "MessageEditHistoryDataLoader",
      createMessageEditHistoryDataLoader
    );

    di.service("chatResolver", ChatResolver);
    di.service("chatServer", ChatServer);
  }
}
