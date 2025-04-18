import { createReviewDataLoader, createReviewModel } from "./review.model.js";
import { ReviewResolver } from "./review.resolver.js";

export class ReviewModule {
  /**
   * Registers a service in the container.
   * @param {import("bottlejs")} di - The unique name of the service.
   */
  static async register(di) {
    di.factory("Review", createReviewModel);

    di.factory("ReviewDataLoader", createReviewDataLoader);

    di.service("reviewResolver", ReviewResolver);
  }
}
