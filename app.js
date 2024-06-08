const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const imageRoutes = require("./Routes/imageRoutes");
const shortenimagie = require("./Routes/shortenroute");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const errorHandler = require("./Middlewares/errorHandler");
const { shortenUrl } = require("./Controllers/shortenController");
require("dotenv").config();
const PORT = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(bodyparser.json());
//swagger middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Serve uploaded files
app.use("/uploads", express.static("uploads"));
// Routes
app.use("/imageCRUD", imageRoutes);
app.use("/ShortCut", shortenimagie);

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
