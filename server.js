const dotenv = require("dotenv");

process.on("uncaughtException", err => {
  console.log("UNCAUGHT EXCEPTION, shutting down!!!");
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

// starting server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port} 🚀 🚀 🚀...`);
});

process.on("unhandledRejection", err => {
  console.log("UNHANDLED REJECTION, shutting down!!!");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
