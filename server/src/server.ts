import { config } from "./config/env";
import connectDB from "./config/database";
import app from "./app";

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(config.port, () => {
      console.log(
        `Server running in ${config.env} mode on port ${config.port}`,
      );
    });

    process.on("unhandledRejection", (err: Error) => {
      console.error(`Unhandled Rejection: ${err.message}`);
      console.error(err.stack);

      server.close(() => {
        console.error("Server closed due to unhandled rejection");
        process.exit(1);
      });
    });

    process.on("SIGTERM", () => {
      console.log("SIGTERM received, shutting down gracefully");
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
};

startServer();