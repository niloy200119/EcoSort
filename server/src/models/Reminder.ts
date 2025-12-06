import mongoose, { Document, Schema } from "mongoose";

export interface IReminder extends Document {
  userId: mongoose.Types.ObjectId;
  dayOfWeek: number; // 0-6 (Sunday to Saturday)
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const reminderSchema = new Schema<IReminder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    dayOfWeek: {
      type: Number,
      required: [true, "Day of week is required"],
      min: [0, "Day of week must be between 0 (Sunday) and 6 (Saturday)"],
      max: [6, "Day of week must be between 0 (Sunday) and 6 (Saturday)"],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
  },
);

// Compound index to prevent duplicate reminders for same user and day
reminderSchema.index({ userId: 1, dayOfWeek: 1 }, { unique: true });

// Remove __v from JSON output
reminderSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

const Reminder = mongoose.model<IReminder>("Reminder", reminderSchema);

export default Reminder;
