import { Router } from "express";
import { authGuard } from "../middleware/authGuard.js";
import { uploadPromotion, handleFileUploadError } from "../middleware/uploadPromotion.js";
import { validateReqCreatePromotions, createPromotions} from "../controllers/Promotions/CreatePromotions.js";
import { validateReqUpdatePromotions, updatePromotions } from "../controllers/Promotions/updatePromotions.js";
import { validateReqGetAllPromotions, getAllPromotions} from "../controllers/Promotions/GetAllPromotions.js";

export const routePromotion = Router();

routePromotion.post("/create", authGuard, uploadPromotion.single("promotion"), handleFileUploadError, validateReqCreatePromotions, createPromotions);
routePromotion.put("/update", authGuard, uploadPromotion.single("promotion"), handleFileUploadError, validateReqUpdatePromotions, updatePromotions);
routePromotion.get("/", authGuard, validateReqGetAllPromotions, getAllPromotions);