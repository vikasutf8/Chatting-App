import { Schema, model, models } from "mongoose";

const schema = new Schema(
  {
    content: {
      type: String,
    },
    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    Chat: {
      type: Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    attachment: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Message = models.Message || model("Message", schema);
