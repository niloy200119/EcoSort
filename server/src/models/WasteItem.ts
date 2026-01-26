import mongoose, { Document, Schema } from "mongoose";

export enum WasteCategory {
  PLASTIC = "plastic",
  PAPER = "paper",
  METAL = "metal",
  GLASS = "glass",
  ORGANIC = "organic",
  EWASTE = "ewaste",
  HAZARDOUS = "hazardous",
  TEXTILE = "textile",
  OTHER = "other",
}

export interface IWasteItem extends Document {
  name: string;
  category: WasteCategory;
  description: string;
  properDisposalMethod: string;
  isRecyclable: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const wasteItemSchema = new Schema<IWasteItem>(
  {
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
      minlength: [2, "Item name must be at least 2 characters long"],
      maxlength: [200, "Item name cannot exceed 200 characters"],
    },
    category: {
      type: String,
      enum: Object.values(WasteCategory),
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    properDisposalMethod: {
      type: String,
      required: [true, "Proper disposal method is required"],
      trim: true,
      minlength: [5, "Disposal method must be at least 10 characters long"],
      maxlength: [1000, "Disposal method cannot exceed 1000 characters"],
    },
    isRecyclable: {
      type: Boolean,
      required: [true, "Recyclability status is required"],
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required"],
    },
  },
  {
    timestamps: true,
  },
);

wasteItemSchema.index({ name: "text", description: "text" });

wasteItemSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

const WasteItem = mongoose.model<IWasteItem>("WasteItem", wasteItemSchema);

export default WasteItem;
