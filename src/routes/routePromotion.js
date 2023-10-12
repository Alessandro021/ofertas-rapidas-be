import { Router } from "express";
import { authGuard } from "../middleware/authGuard.js";
import { uploadPromotion, handleFileUploadError } from "../middleware/uploadPromotion.js";
import { validateReqCreatePromotions, createPromotions} from "../controllers/Promotions/CreatePromotions.js";

export const routePromotion = Router();

routePromotion.post("/create", authGuard, uploadPromotion.single("promotion"), handleFileUploadError, validateReqCreatePromotions, createPromotions);