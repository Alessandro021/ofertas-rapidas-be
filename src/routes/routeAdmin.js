import "../utils/yup/index.js";
import { Router } from "express";
import { authGuardAdmin } from "../middleware/authGuardAdmin.js";
import { validateReqGetAllRatingsByPromotionId, adminDeleteUser} from "../controllers/Admin/DeletarUser.js";


export const routeAdmin = Router();

routeAdmin.delete("/delete/user/:id", authGuardAdmin, validateReqGetAllRatingsByPromotionId, adminDeleteUser);