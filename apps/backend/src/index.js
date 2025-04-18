import express from "express";
import cors from "cors";
import { createDIContainer } from "./lib/di.js";
import { AuthModule } from "./features/auth/auth.module.js";
import { UserModule } from "./features/user/user.module.js";
import { ProfileModule } from "./features/profile/profile.module.js";
import { DBModule } from "./features/db/db.module.js";
import { EnvModule } from "./features/env/env.module.js";
import { authMiddleware } from "./features/auth/auth.middleware.js";
import { GraphQLModule } from "./features/graphql/graphql.module.js";
import { ProductModule } from "./features/product/product.module.js";

import { ReviewModule } from "./features/review/review.module.js";
import { CourseModule } from "./features/course/course.module.js";
import { ChatModule } from "./features/chat/chat.module.js";
import { CartModule } from "./features/cart/cart.module.js";
import { FileModule } from "./features/file/file.module.js";

async function main() {
  const di = createDIContainer();
  const app = express();

  await EnvModule.registerEnvModule(di);
  const _env = di.container.env;

  app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use("/files", express.static("./files"));
  app.use(express.urlencoded({ extended: true }));

  // Register the authMiddleware to be accessable throughout the app.
  di.factory("authMiddleware", authMiddleware);

  await GraphQLModule.register(di);
  await DBModule.register(di);

  await UserModule.register(di);
  await ProfileModule.register(di);
  await AuthModule.register(di);
  await ProductModule.register(di);
  await ReviewModule.register(di);
  await CourseModule.register(di);
  await ChatModule.register(di);
  await CartModule.register(di);
  await FileModule.register(di);

  /** @type {GraphQLModule} */
  const graphqlModule = di.container.graphqlModule;

  const typeDefs = await graphqlModule.readTypeDefs("./graphql/schema.graphql");
  const resolvers = {
    Date: await graphqlModule.getDateCustomType(),
    Object: await graphqlModule.getObjectCustomType(),
    JSON: await graphqlModule.getJSONCustomType(),
    ObjectId: await graphqlModule.getObjectIdCustomType(),

    Query: {
      hello: () => "Hello world!",
    },
  };

  graphqlModule.setOptions({
    introspection: true,
  });
  graphqlModule.setTypedefs(typeDefs);
  graphqlModule.setResolvers(resolvers);

  /** @type {import("./features/auth/auth.resolver.js").AuthResolver} */
  const authResolver = di.container.authResolver;
  /** @type {import("./features/profile/profile.resolver.js").ProfileResolver} */
  const profileResolver = di.container.profileResolver;
  /** @type {import("./features/user/user.resolver.js").UserResolver} */
  const userResolver = di.container.userResolver;
  /** @type {import("./features/product/product.resolver.js").ProductResolver} */
  const productResolver = di.container.productResolver;
  /** @type {import("./features/review/review.resolver.js").ReviewResolver} */
  const reviewResolver = di.container.reviewResolver;
  /** @type {import("./features/course/course.resolver.js").CourseResolver} */
  const courseResolver = di.container.courseResolver;
  /** @type {import("./features/cart/cart.resolver.js").CartResolver} */
  const cartResolver = di.container.cartResolver;
  /** @type {import("./features/chat/chat.resolver.js").ChatResolver} */
  const chatResolver = di.container.chatResolver;
  /** @type {import("./features/file/file.resolver.js").FileResolver} */
  const fileResolver = di.container.fileResolver;

  graphqlModule.addResolvers(authResolver.getResolvers());
  graphqlModule.addResolvers(profileResolver.getResolvers());
  graphqlModule.addResolvers(userResolver.getResolvers());
  graphqlModule.addResolvers(productResolver.getResolvers());
  graphqlModule.addResolvers(reviewResolver.getResolvers());
  graphqlModule.addResolvers(courseResolver.getResolvers());
  graphqlModule.addResolvers(cartResolver.getResolvers());
  graphqlModule.addResolvers(chatResolver.getResolvers());
  graphqlModule.addResolvers(fileResolver.getResolvers());

  const graphqlApolloSandboxMiddleware =
    await graphqlModule.createApolloSandboxMiddleware();

  const graphqlExpressMiddleware = await graphqlModule.createExpressMiddleware({
    context: async ({ req, res }) => {
      const authMiddleware = di.container.authMiddleware;
      const userService = di.container.userService;
      const authService = di.container.authService;

      let user = null;
      const token = req.headers["authorization"]?.split(" ")?.[1];
      if (token) {
        user = await authService.getUserFromToken(token);
      }

      return {
        req,
        res,
        authMiddleware,
        userService,
        authService,
        user,
      };
    },
  });

  app.get("/graphql", graphqlApolloSandboxMiddleware);
  app.use("/graphql", graphqlExpressMiddleware);

  // const authRouter = di.container.authRouter.build();

  const fileRouter = di.container.fileRouter;

  const v1Router = express.Router().use("/files", fileRouter);

  // Register the v1 router.
  app.use("/api/v1", v1Router);

  const PORT = process.env.PORT || 3500;

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}. :)`);
  });
}

main();
