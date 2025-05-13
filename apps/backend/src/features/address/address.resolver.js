import { createHttpError } from "../../lib/http.js";
import { resolver } from "../../lib/graphql.js";
import { paginate } from "../../lib/pagination.js";

export class AddressResolver {
  /** @type {import("mongoose").Model} */
  Address;
  /** @type {import("mongoose").Model} */
  Profile;

  /** @type {import("dataloader")} */
  AddressDataLoader;

  constructor() {}

  static get deps() {
    return ["Address", "Profile", "AddressDataLoader"];
  }

  createAddress = resolver(async (parent, args, context) => {
    const user = context.user;

    if (!user) {
      throw createHttpError(401, "Not logged in.");
    }

    const profile = await this.Profile.findById(args.input.profile);
    if (!profile) {
      throw createHttpError(401);
    }

    // If not the user's profile.
    if (profile.user.toString() !== user._id.toString()) {
      throw createHttpError(401);
    }

    const address = await this.Address.create(args.input);

    if (!address) {
      throw createHttpError(500, "Could not create the address.");
    }

    return {
      message: "Address created.",
      address,
    };
  });

  updateAddress = resolver(async (parent, args, context) => {
    const { id } = args;

    const address = await this.Address.findById(id);

    if (!address) {
      throw createHttpError(404, "Address not found.");
    }

    return {
      message: "Address updated.",
      address,
    };
  });

  deleteAddress = resolver(async (parent, args, context) => {
    const { id } = args;

    const address = await this.Address.findByIdAndDelete(id);

    if (!address) {
      throw createHttpError(404, "Address not found.");
    }

    return {
      message: "Address deleted.",
    };
  });

  getResolvers() {
    return {
      Query: {},
      Mutation: {
        createAddress: this.createAddress,
        updateAddress: this.updateAddress,
        deleteAddress: this.deleteAddress,
      },
    };
  }
}
