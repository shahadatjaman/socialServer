const { ApolloServer } = require("apollo-server-express");

const express = require("express");

const cors = require("cors");

const { createServer } = require("http");

const app = express();

const httpServer = createServer(app);

const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");

const { mongoose } = require("mongoose");

const resolvers = require("./GraphQL/resolvers/index");

const typeDefs = require("./GraphQL/typeDefs");

require("dotenv").config();

const startServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await apolloServer.start();

  app.use(cors());
  app.use(express.json());
  app.use("/", require("./router/index"));
  app.use("/images", express.static("files"));

  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("/", (req, res) => {
      res.send("Welcome");
    });
  }
  /*   sendFile(path.resolve(__dirname, "client", "build", "index.html")); */
  app.use(graphqlUploadExpress());

  apolloServer.applyMiddleware({
    app,
    path: "/",
  });

  mongoose
    .connect(process.env.MONGODB)
    .then(() => {
      console.log("MongoDB Connected...");
      httpServer.listen({ port: process.env.PORT || 5000 });
    })
    .then(() => {
      console.log(
        `Server listening on localhost:5000${apolloServer.graphqlPath}`
      );
    });
};

startServer();
