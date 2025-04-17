import mongoose, { Schema } from "mongoose";
import { createFindDataLoader } from "../../lib/dataloader.js";

///////////////////////
// Conversation Model
///////////////////////

/**
 * @param {Object} params
 * @param {mongoose.Connection} params.db
 * @returns {mongoose.Model}
 */
export const createConversationModel = ({ db }) => {
  const ConversationSchema = new Schema(
    {
      isGroup: { type: Boolean, default: false },
      name: { type: String },
      avatar: { type: String },
      participants: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
      admins: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
      lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    },
    { timestamps: true }
  );

  return db.model("Conversation", ConversationSchema);
};

/**
 * @param {{ Conversation: mongoose.Model }} params
 */
export const createConversationDataLoader = ({ Conversation }) => {
  return createFindDataLoader(Conversation);
};

///////////////////////
// Message Model
///////////////////////

/**
 * @param {Object} params
 * @param {mongoose.Connection} params.db
 * @returns {mongoose.Model}
 */
export const createMessageModel = ({ db }) => {
  const MessageSchema = new Schema(
    {
      conversation: {
        type: Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
      },
      sender: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
      content: { type: String },
      type: { type: String },
      attachments: [
        {
          url: String,
          type: {
            type: String,
            enum: ["image", "video", "file", "audio"],
            required: true,
          },
        },
      ],
      status: {
        deliveredTo: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
        seenBy: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
      },
      edited: { type: Boolean, default: false },
      deleted: { type: Boolean, default: false },
      reactions: [
        {
          user: { type: Schema.Types.ObjectId, ref: "Profile" },
          emoji: String,
        },
      ],
    },
    { timestamps: true }
  );

  return db.model("Message", MessageSchema);
};

/**
 * @param {{ Message: mongoose.Model }} params
 */
export const createMessageDataLoader = ({ Message }) => {
  return createFindDataLoader(Message);
};

///////////////////////
// Typing Indicator Model
///////////////////////

/**
 * @param {Object} params
 * @param {mongoose.Connection} params.db
 * @returns {mongoose.Model}
 */
export const createTypingIndicatorModel = ({ db }) => {
  const TypingIndicatorSchema = new Schema(
    {
      conversation: { type: Schema.Types.ObjectId, ref: "Conversation" },
      user: { type: Schema.Types.ObjectId, ref: "Profile" },
      isTyping: { type: Boolean, default: false },
      expiresAt: { type: Date },
    },
    { timestamps: true }
  );

  return db.model("TypingIndicator", TypingIndicatorSchema);
};

/**
 * @param {{ TypingIndicator: mongoose.Model }} params
 */
export const createTypingIndicatorDataLoader = ({ TypingIndicator }) => {
  return createFindDataLoader(TypingIndicator);
};

///////////////////////
// Message Edit History Model
///////////////////////

/**
 * @param {Object} params
 * @param {mongoose.Connection} params.db
 * @returns {mongoose.Model}
 */
export const createMessageEditHistoryModel = ({ db }) => {
  const MessageEditHistorySchema = new Schema({
    message: { type: Schema.Types.ObjectId, ref: "Message" },
    editor: { type: Schema.Types.ObjectId, ref: "Profile" },
    previousContent: String,
    editedAt: { type: Date, default: Date.now },
  });

  return db.model("MessageEditHistory", MessageEditHistorySchema);
};

/**
 * @param {{ MessageEditHistory: mongoose.Model }} params
 */
export const createMessageEditHistoryDataLoader = ({ MessageEditHistory }) => {
  return createFindDataLoader(MessageEditHistory);
};
