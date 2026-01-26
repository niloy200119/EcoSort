import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";
import { IEvent } from "./Event";

export interface IEventPost extends Document {
  user: IUser["_id"];
  event: IEvent["_id"];
  content: string;
  parentPost?: IEventPost["_id"]; // For replies
  likes: IUser["_id"][]; // Users who liked the post
  createdAt: Date;
  updatedAt: Date;
}

const eventPostSchema = new Schema<IEventPost>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Post content is required"],
      trim: true,
      minlength: [1, "Post cannot be empty"],
      maxlength: [1000, "Post cannot exceed 1000 characters"],
    },
    parentPost: {
      type: Schema.Types.ObjectId,
      ref: "EventPost",
      default: null,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IEventPost>("EventPost", eventPostSchema);
