import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";
import { IEvent } from "./Event";

export enum TicketStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  ATTENDED = "attended",
  CANCELLED = "cancelled",
}

export interface IEventTicket extends Document {
  user: IUser["_id"];
  event: IEvent["_id"];
  status: TicketStatus;
  ticketNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

const eventTicketSchema = new Schema<IEventTicket>(
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
    status: {
      type: String,
      enum: Object.values(TicketStatus),
      default: TicketStatus.PENDING,
    },
    ticketNumber: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent multiple tickets for same event by same user
eventTicketSchema.index({ user: 1, event: 1 }, { unique: true });

export default mongoose.model<IEventTicket>("EventTicket", eventTicketSchema);
