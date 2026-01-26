import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";

export enum EventType {
  CLEANUP = "cleanup",
  WORKSHOP = "workshop",
  SEMINAR = "seminar",
  RALLY = "rally",
  OTHER = "other",
}

export enum EventStatus {
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  organizer: IUser["_id"];
  type: EventType;
  capacity: number;
  pointsRequired: number;
  participants: IUser["_id"][];
  status: EventStatus;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(EventType),
      default: EventType.OTHER,
    },
    capacity: {
      type: Number,
      required: [true, "Event capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },
    pointsRequired: {
      type: Number,
      default: 0,
      min: [0, "Points required user cannot be negative"],
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: Object.values(EventStatus),
      default: EventStatus.UPCOMING,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IEvent>("Event", eventSchema);
