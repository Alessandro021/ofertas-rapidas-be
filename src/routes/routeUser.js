import { Router } from "express";
import { cretaeUser, validateReqCreateUser } from "../controllers/User/CreateUser.js";

export const routeUser = Router();

routeUser.post("/create", validateReqCreateUser, cretaeUser);