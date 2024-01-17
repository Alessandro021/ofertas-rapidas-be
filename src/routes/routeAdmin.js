import "../utils/yup/index.js";
import { Router } from "express";
import { authGuardAdmin } from "../middleware/authGuardAdmin.js";
import { validateReqdeleteUser, deleteUser} from "../controllers/Admin/DeletarUser.js";
import { validateReqUpdateUserParams, validateReqUpdateUserBody, updateUser } from "../controllers/Admin/UpdateUser.js";
import { uploadProfile, handleFileUploadError } from "../middleware/uploadProfile.js";


export const routeAdmin = Router();

routeAdmin.delete("/delete/user/:id", authGuardAdmin, validateReqdeleteUser, deleteUser);
routeAdmin.put("/update/user/:id", authGuardAdmin, uploadProfile.single("profile"), handleFileUploadError ,validateReqUpdateUserParams, validateReqUpdateUserBody, updateUser);