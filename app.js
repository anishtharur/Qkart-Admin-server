import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.routes.js";
import generalRoutes from "./routes/general.routes.js";
import managementRoutes from "./routes/management.routes.js";
import salesRoutes from "./routes/sales.routes.js";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); //allows to log api calls from another server
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({ extended: false })
); /*(e.g., in url we have username=johndoe&password=secret : const username = req.body.username; const password = req.body.password;)*/
app.use(cors());

/*Routes */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

const PORT = process.env.PORT || 9000;
app.listen(process.env.PORT, () =>
  console.log(`Listening to PORT ${process.env.PORT}`)
);

export default app;
