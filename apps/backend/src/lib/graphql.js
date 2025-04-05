import { GraphQLError } from "graphql";

export function resolver(resolverFn) {
  return async (parent, args, context, info) => {
    try {
      const result = await resolverFn(parent, args, context, info);
      const response = {
        code: 200,
        success: true,
        message: "Request processed successfully.",
        ...result,
      };

      return response;
    } catch (error) {
      console.error("Error in resolver:", error);

      if (error instanceof GraphQLError) {
        throw error;
      }

      return {
        code: error.statusCode || 500,
        success: false,
        message:
          error.message || "An error occurred while processing your request.",
        error: error.message || "Unknown error",
      };
    }
  };
}
