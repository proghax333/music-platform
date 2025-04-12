import { paginate } from "../../lib/pagination.js";
import { resolver } from "../../lib/graphql.js";
import createHttpError from "http-errors";

export class ReviewResolver {
  /** @type {import("mongoose").Model} */
  Review;

  /** @type {import("dataloader")} */
  ReviewDataLoader;

  constructor() {}

  static get deps() {
    return ["Review", "ReviewDataLoader"];
  }

  reviews = async (parent, args, context) => {
    const { refId, ...restArgs } = args;
    const pipeline = this.Review.aggregate().match({
      refId: refId,
    });

    const reviewConnection = await paginate(pipeline, restArgs);
    return reviewConnection;
  };

  review = async (parent, args, context) => {
    const { id } = args;
    const review = await this.ReviewDataLoader.load(id);
    return review;
  };

  createReview = resolver(async (parent, args, context) => {
    const review = await this.Review.create(args.input);
    return {
      message: "Review created successfully.",
      review: review.toObject(),
    };
  });

  updateReview = resolver(async (parent, args, context) => {
    const review = await this.Review.findByIdAndUpdate(args.id, args.input, {
      new: true,
    });

    if (!review) {
      throw createHttpError(404, "Review not found.");
    }
    return {
      message: "Review updated successfully.",
      review: review.toObject(),
    };
  });

  deleteReview = resolver(async (parent, args, context) => {
    const review = await this.Review.findByIdAndDelete(args.id);

    if (!review) {
      throw createHttpError(404, "Review not found.");
    }

    return {
      message: "Review deleted successfully.",
    };
  });

  getResolvers = () => {
    return {
      Query: {
        reviews: this.reviews,
        review: this.review,
      },
      Mutation: {
        createReview: this.createReview,
        updateReview: this.updateReview,
        deleteReview: this.deleteReview,
      },
    };
  };
}
