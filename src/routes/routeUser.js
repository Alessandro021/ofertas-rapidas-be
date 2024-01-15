import { Router } from "express";
import { cretaeUser, validateReqCreateUser } from "../controllers/User/CreateUser.js";
import { handleFileUploadError, uploadProfile } from "../middleware/uploadProfile.js";
import { loginUser, validateReqLoginUser } from "../controllers/User/LoginUser.js";
import { authGuard } from "../middleware/authGuard.js";
import { updateProfileUser, validateReqUpdateProfileUser } from "../controllers/User/UpdateProfileUser.js";
import { deleteImageProfile } from "../controllers/User/DeleteImageProfile.js";
import { getUser } from "../controllers/User/GetUser.js";
import "../utils/yup/index.js";
import { authenticateUser } from "../controllers/User/AuthenticateUser.js";
import { deleteUser } from "../controllers/User/DeleteUser.js";

export const routeUser = Router();

routeUser.post("/create", validateReqCreateUser, cretaeUser);
routeUser.post("/login", validateReqLoginUser, loginUser);
routeUser.put("/profile", authGuard, uploadProfile.single("profile"), handleFileUploadError, validateReqUpdateProfileUser, updateProfileUser);
routeUser.delete("/delete/profile", authGuard, deleteImageProfile);
routeUser.delete("/delete/user", authGuard, deleteUser);
routeUser.get("/details", authGuard, getUser);
routeUser.get("/authentication/:userId", authenticateUser);
