import "../utils/yup/index.js";
import { Router } from "express";
import { authGuardAdmin } from "../middleware/authGuardAdmin.js";
import { validateReqdeleteUser, deleteUser} from "../controllers/Admin/DeletarUser.js";
import { validateReqUpdateUserParams, validateReqUpdateUserBody, updateUser } from "../controllers/Admin/UpdateUser.js";
import { uploadProfile, handleFileUploadError } from "../middleware/uploadProfile.js";
import { getAllusers } from "../controllers/Admin/GetAllUsers.js";
import { validateReqUpdateCommentsParams, validateReqUpdateCommentsBody, updateComments } from "../controllers/Admin/UpdateComments.js";


export const routeAdmin = Router();
//USER
routeAdmin.delete("/delete/user/:id", authGuardAdmin, validateReqdeleteUser, deleteUser);
routeAdmin.put("/update/user/:id", authGuardAdmin, uploadProfile.single("profile"), handleFileUploadError ,validateReqUpdateUserParams, validateReqUpdateUserBody, updateUser);
routeAdmin.get("/get/users", authGuardAdmin, getAllusers);

routeAdmin.put("/update/comment/:userId", validateReqUpdateCommentsParams, validateReqUpdateCommentsBody, updateComments);

