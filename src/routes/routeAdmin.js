import "../utils/yup/index.js";
import { Router } from "express";
import { authGuardAdmin } from "../middleware/authGuardAdmin.js";
import { validateReqdeleteUser, deleteUser} from "../controllers/Admin/DeletarUser.js";
import { validateReqUpdateUserParams, validateReqUpdateUserBody, updateUser } from "../controllers/Admin/UpdateUser.js";
import { uploadProfile, handleFileUploadError } from "../middleware/uploadProfile.js";
import { getAllusers } from "../controllers/Admin/GetAllUsers.js";
import { validateReqUpdateCommentsParams, validateReqUpdateCommentsBody, updateComments } from "../controllers/Admin/UpdateComments.js";
import { validateReqDeleteCommentsParams, validateReqDeleteCommentsBody, deleteComments  } from "../controllers/Admin/Deletecomments.js";
import { validateReqDeletePromotionParams, validateReqDeletePromotionBody, deletePromotion } from "../controllers/Admin/DeletePromotion.js";


export const routeAdmin = Router();
//USER
routeAdmin.delete("/delete/user/:id", authGuardAdmin, validateReqdeleteUser, deleteUser);
routeAdmin.put("/update/user/:id", authGuardAdmin, uploadProfile.single("profile"), handleFileUploadError ,validateReqUpdateUserParams, validateReqUpdateUserBody, updateUser);
routeAdmin.get("/get/users", authGuardAdmin, getAllusers);

//COMMENT
routeAdmin.put("/update/comment/:userId", authGuardAdmin, validateReqUpdateCommentsParams, validateReqUpdateCommentsBody, updateComments);
routeAdmin.delete("/delete/comment/:userId",authGuardAdmin, validateReqDeleteCommentsParams, validateReqDeleteCommentsBody, deleteComments);

//PROMOTION
routeAdmin.delete("/delete/promotion/:userId",authGuardAdmin, validateReqDeletePromotionParams, validateReqDeletePromotionBody, deletePromotion);