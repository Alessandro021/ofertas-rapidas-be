import { Router } from "express";
import { routeUser } from "./routeUser.js";
import { routeCategory } from "./routeCategory.js";
import { routePromotion } from "./routePromotion.js";
import { routeComment } from "./routeComment.js";

export const route = Router();

route.use("/user", routeUser);
route.use("/category", routeCategory);
route.use("/promotion", routePromotion);
route.use("/comment", routeComment);

route.get("/", (req, res) => {
	return res.status(200).send("SERVIDOR RODANDO!!");
});