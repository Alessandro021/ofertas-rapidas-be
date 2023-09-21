import { Router } from "express";
import { routeUser } from "./routeUser.js";

export const route = Router();

route.use("/user", routeUser);

route.get("/", (req, res) => {
	return res.status(200).send("SERVIDOR RODANDO!!");
});