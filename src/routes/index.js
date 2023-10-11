import { Router } from "express";
import { routeUser } from "./routeUser.js";
import { routeCategory } from "./routerCategory.js";

export const route = Router();

route.use("/user", routeUser);
route.use("/category", routeCategory);

route.get("/", (req, res) => {
	return res.status(200).send("SERVIDOR RODANDO!!");
});