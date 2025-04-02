import { Schema, Types } from "mongoose";

export const createUserModel = ({ db }) => {
  /**
   * User schema supporting local authentication and OAuth providers.
   */
  const UserSchema = new Schema(
    {
      username: { type: String, unique: true, required: true },
      email: { type: String, unique: true, required: true, trim: true },
      passwordHash: { type: String, select: false }, // Only for local auth
      providers: [
        {
          provider: { type: String, required: true }, // e.g., 'google', 'github', 'facebook'
          providerId: { type: String, sparse: true }, // OAuth provider's unique user ID (optional)
          email: { type: String, required: true }, // Email from provider (fallback identifier)
          accessToken: { type: String, select: false }, // (optional) Store token if needed
        },
      ],
      profiles: [{ type: Types.ObjectId, ref: "Profile" }], // Multiple profiles per user
      createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
  );

  // Indexing to enforce unique email and provider-based login
  UserSchema.index(
    { "providers.provider": 1, "providers.providerId": 1 },
    { unique: true, sparse: true }
  );

  const User = db.model("User", UserSchema);
  return User;
};
