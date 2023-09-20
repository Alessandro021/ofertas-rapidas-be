import { Router } from "express";

export const route = Router();

route.get("/", (req, res) => {
	return res.status(200).send("SERVIDOR RODANDO!!");
});