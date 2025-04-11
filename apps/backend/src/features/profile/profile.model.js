import { Schema, Types } from "mongoose";
import { createFindDataLoader } from "../../lib/dataloader.js";

export const createProfileModel = ({ db }) => {
  /**
   * Profile schema supporting multiple profiles per user account.
   */
  const ProfileSchema = new Schema(
    {
      user: { type: Types.ObjectId, ref: "User", required: true }, // Reference to the User
      name: { type: String, required: true, trim: true }, // Profile name
      avatar: { type: String }, // Profile picture URL
      bio: { type: String, trim: true }, // Short bio or description
      settings: { type: Object, default: {} }, // User-specific settings/preferences
    },
    { timestamps: true }
  );

  ProfileSchema.index({ userId: 1 });

  const Profile = db.model("Profile", ProfileSchema);
  return Profile;
};

export const createProfileDataLoader = ({ Profile }) => {
  return createFindDataLoader(Profile);
};
