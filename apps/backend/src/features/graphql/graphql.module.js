import fs from "node:fs/promises";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { GraphQLScalarType, Kind } from "graphql";
import { ObjectId } from "../../lib/types.js";
import _ from "lodash";

export class GraphQLModule {
  /**
   * Registers a service in the container.
   * @param {import("bottlejs")} di - The unique name of the service.
   */
  static async registerGraphQLModule(di) {
    di.service("graphqlModule", GraphQLModule);

    return di;
  }

  /**
   * Returns the GraphQL schema type definitions.
   * @returns {Promise<string>} The GraphQL schema type definitions.
   */
  async readTypeDefs(filePath = "./graphql/schema.graphql") {
    const contents = await fs.readFile(filePath, "utf-8");
    return contents;
  }

  constructor(options = {}) {
    this.options = options || {};
    if (!this.options) {
      this.options = {};
    }

    if (!this.options.typeDefs) {
      this.options.typeDefs = `#graphql
      type Query {
        hello: String
      }
      `;
    }

    if (!this.options.resolvers) {
      this.options.resolvers = {
        Query: {
          hello: () => {
            return "Hello, World!";
          },
        },
      };
    }
  }

  getTypeDefs() {
    return this.options.typeDefs;
  }

  setTypedefs(typeDefs) {
    this.options.typeDefs = typeDefs;
    return this;
  }

  getResolvers() {
    return this.options.resolvers;
  }

  setResolvers(resolvers) {
    this.options.resolvers = resolvers;
    return this;
  }

  addResolvers(resolvers = {}) {
    _.merge(this.options.resolvers, resolvers);
    return this;
  }

  removeResolvers(resolvers) {
    for (const key in resolvers) {
      if (this.options.resolvers[key]) {
        delete this.options.resolvers[key];
      }
    }
  }

  getOptions() {
    return this.options;
  }

  setOptions(options) {
    this.options = options;
    return this;
  }

  createServer() {
    const server = new ApolloServer({
      typeDefs: this.options.typeDefs,
      resolvers: this.options.resolvers,
      ...this.options,
    });

    return server;
  }

  async createExpressMiddleware(middlewareOptions = {}) {
    const server = this.createServer();
    await server.start();
    return expressMiddleware(server, middlewareOptions);
  }

  async createApolloSandboxMiddleware() {
    return (req, res) => {
      res.send(`<!DOCTYPE html><html>
        <head>
        <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body {
          height: 100%;
          width: 100%;
          overflow: hidden;
        }
        </style>
        </head>
<body><div style="width: 100%; height: 100%;" id='embedded-sandbox'></div>
<script src="https://embeddable-sandbox.cdn.apollographql.com/_latest/embeddable-sandbox.umd.production.min.js"></script> 
<script>
  new window.EmbeddedSandbox({
    target: '#embedded-sandbox',
    initialEndpoint: 'http://localhost:3500/graphql',
  });
</script></body></html>`);
    };
  }

  async getDateCustomType() {
    return new GraphQLScalarType({
      name: "Date",
      description: "A date string, such as 2007-12-03 or 2007-12-03T10:15:30Z",
      parseValue(value) {
        return new Date(value); // value from the client
      },
      serialize(value) {
        return value.toUTCString(); // value sent to the client
      },
      parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
          return new Date(ast.value); // ast value is always in string format
        }
        return null;
      },
    });
  }

  async getJSONCustomType() {
    return new GraphQLScalarType({
      name: "JSON",
      description: "A JSON object",
      parseValue(value) {
        return value; // value from the client
      },
      serialize(value) {
        return value; // value sent to the client
      },
      parseLiteral(ast) {
        if (ast.kind === Kind.OBJECT) {
          return ast.value; // ast value is always in string format
        }
        return null;
      },
    });
  }

  async getObjectCustomType() {
    return new GraphQLScalarType({
      name: "Object",
      description: "A generic object",
      parseValue(value) {
        return value; // value from the client
      },
      serialize(value) {
        return value; // value sent to the client
      },
      parseLiteral(ast) {
        if (ast.kind === Kind.OBJECT) {
          return ast.value; // ast value is always in string format
        }
        return null;
      },
    });
  }

  async getObjectIdCustomType() {
    return new GraphQLScalarType({
      name: "ObjectId",
      description: "A MongoDB ObjectId",
      parseValue(value) {
        return new ObjectId(value); // value from the client
      },
      serialize(value) {
        return value; // value sent to the client
      },
      parseLiteral(ast) {
        if (ast.kind === Kind.OBJECT) {
          return new ObjectId(ast.value); // ast value is always in string format
        }
        return null;
      },
    });
  }
}
