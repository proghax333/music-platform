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

  addresses = async (parent, args, context) => {
    const user = context.user;
    if (!user) {
      throw createHttpError(401, "Not logged in.");
    }

    const profiles = await this.Profile.find({
      user: context.user,
    });
    const profileIds = profiles.map((profile) => profile._id);

    const pipeline = this.Address.aggregate().match({
      profile: {
        $in: profileIds,
      },
    });

    const page = await paginate(pipeline, {
      ...args,
      all: true,
    });

    return page;
  };

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
    const user = context.user;
    if (!user) {
      throw createHttpError(401, "Not logged in.");
    }

    const { id } = args;

    const address = await this.Address.findById(id);
    if (!address) {
      throw createHttpError(404, "Address not found.");
    }

    const profile = await this.Profile.findById(address.profile);
    if (!profile) {
      throw createHttpError(404, "Address not found.");
    }

    // If not the user's profile.
    if (profile.user.toString() !== user._id.toString()) {
      throw createHttpError(404, "Address not found.");
    }

    const result = await this.Address.findOneAndUpdate(id, args.input, {
      new: true,
    });

    if (!result) {
      throw createHttpError(500, "Could not update the address.");
    }

    return {
      message: "Address updated.",
      address: result,
    };
  });

  deleteAddress = resolver(async (parent, args, context) => {
    const user = context.user;
    if (!user) {
      throw createHttpError(401, "Not logged in.");
    }

    const { id } = args;

    const address = await this.Address.findById(id);
    if (!address) {
      throw createHttpError(404, "Address not found.");
    }

    const profile = await this.Profile.findById(address.profile);
    if (!profile) {
      throw createHttpError(404, "Address not found.");
    }

    // If not the user's profile.
    if (profile.user.toString() !== user._id.toString()) {
      throw createHttpError(404, "Address not found.");
    }

    const result = await this.Address.findOneAndDelete(id);

    if (!result) {
      throw createHttpError(500, "Could not delete the address.");
    }

    return {
      message: "Address deleted.",
      address: result,
    };
  });

  getResolvers() {
    return {
      Query: {
        addresses: this.addresses,
      },
      Mutation: {
        createAddress: this.createAddress,
        updateAddress: this.updateAddress,
        deleteAddress: this.deleteAddress,
      },
    };
  }
}
