/* eslint-disable no-undef */
import express, {json} from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { route } from "./routes/index.js";

const app = express();
app.use(json());
app.use(cors({
	origin: "*"
}));
app.use("/uploads", express.static(path.join("uploads")));

app.use(route);


app.listen(process.env.PORT || 3333, () => {
	console.log(`SERVDOR RODANDO NA PORTA ${process.env.PORT || 3333}`);
});