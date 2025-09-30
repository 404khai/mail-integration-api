import mongoose, { Schema, Document } from "mongoose";

export interface Integration extends Document {
  userId: string; // Later link to user system
  provider: "mailchimp" | "getresponse";
  apiKey: string;
  createdAt: Date;
}

const IntegrationSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    provider: { type: String, enum: ["mailchimp", "getresponse"], required: true },
    apiKey: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<Integration>("Integration", IntegrationSchema);
