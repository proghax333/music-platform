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

import { ObjectId } from "./lib/types.js";

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
  app.use(express.urlencoded({ extended: true }));

  // Register the authMiddleware to be accessable throughout the app.
  di.service("authMiddleware", authMiddleware, "userService", "authService");

  await GraphQLModule.registerGraphQLModule(di);
  await DBModule.registerDBModule(di);

  await UserModule.registerUserModule(di);
  await ProfileModule.registerProfileModule(di);
  await AuthModule.registerAuthModule(di);
  await ProductModule.registerProductModule(di);

  /** @type {GraphQLModule} */
  const graphqlModule = di.container.graphqlModule;

  const typeDefs = await graphqlModule.readTypeDefs("./graphql/schema.graphql");
  const resolvers = {
    Date: graphqlModule.getDateCustomType(),
    Object: graphqlModule.getObjectCustomType(),
    JSON: graphqlModule.getJSONCustomType(),
    ObjectId: graphqlModule.getObjectIdCustomType(),

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

  graphqlModule.addResolvers(authResolver.getResolvers());
  graphqlModule.addResolvers(profileResolver.getResolvers());
  graphqlModule.addResolvers(userResolver.getResolvers());
  graphqlModule.addResolvers(productResolver.getResolvers());
  // graphqlModule.addResolvers();

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

  // const v1Router = express.Router().use("/auth", authRouter);

  // // Register the v1 router.
  // app.use("/api/v1", v1Router);

  const PORT = process.env.PORT || 3500;

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}. :)`);
  });
}

main();
