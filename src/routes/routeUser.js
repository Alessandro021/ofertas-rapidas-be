import { Router } from "express";
import { cretaeUser, validateReqCreateUser } from "../controllers/User/CreateUser.js";
import { handleFileUploadError, uploadProfile } from "../middleware/uploadProfile.js";
import { loginUser, validateReqLoginUser } from "../controllers/User/LoginUser.js";
import { authGuard } from "../middleware/authGuard.js";
import { updateProfileUser, validateReqUpdateProfileUser } from "../controllers/User/UpdateProfileUser.js";
import { deleteImageProfile } from "../controllers/User/DeleteImageProfile.js";
import { getUser } from "../controllers/User/GetUser.js";

export const routeUser = Router();

routeUser.post("/create", validateReqCreateUser, cretaeUser);
routeUser.post("/login", validateReqLoginUser, loginUser);
routeUser.put("/profile", authGuard, uploadProfile.single("profile"), handleFileUploadError, validateReqUpdateProfileUser, updateProfileUser);
routeUser.delete("/profile", authGuard, deleteImageProfile);
routeUser.get("/details", authGuard, getUser);