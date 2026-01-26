import mongoose, { Document, Schema } from "mongoose";

export enum LocationType {
  RECYCLING_CENTER = "recycling_center",
  COMPOST_SITE = "compost_site",
  COMPOST_FACILITY = "compost_facility",
  EWASTE_DROPOFF = "ewaste_dropoff",
  HAZARDOUS_WASTE = "hazardous_waste",
  COLLECTION_POINT = "collection_point",
}

export interface IRecyclingLocation extends Document {
  name: string;
  type: LocationType;
  address: string;
  coordinates: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  hours?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

const recyclingLocationSchema = new Schema<IRecyclingLocation>(
  {
    name: {
      type: String,
      required: [true, "Location name is required"],
      trim: true,
      minlength: [2, "Location name must be at least 2 characters long"],
      maxlength: [200, "Location name cannot exceed 200 characters"],
    },
    type: {
      type: String,
      enum: Object.values(LocationType),
      required: [true, "Location type is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      minlength: [5, "Address must be at least 5 characters long"],
      maxlength: [500, "Address cannot exceed 500 characters"],
    },
    coordinates: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: [true, "Coordinates are required"],
        validate: {
          validator: function (value: number[]) {
            return (
              value.length === 2 &&
              value[0] >= -180 &&
              value[0] <= 180 &&
              value[1] >= -90 &&
              value[1] <= 90
            );
          },
          message: "Invalid coordinates. Format: [longitude, latitude]",
        },
      },
    },
    hours: {
      type: String,
      trim: true,
      maxlength: [200, "Hours cannot exceed 200 characters"],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[+]?[\d\s-()]+$/, "Please provide a valid phone number"],
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },
  },
  {
    timestamps: true,
  },
);

recyclingLocationSchema.index({ coordinates: "2dsphere" });

recyclingLocationSchema.index({ name: "text", address: "text" });

recyclingLocationSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

const RecyclingLocation = mongoose.model<IRecyclingLocation>(
  "RecyclingLocation",
  recyclingLocationSchema,
);

export default RecyclingLocation;
