import { Router } from "express";
import { authGuard } from "../middleware/authGuard.js";
import { uploadPromotion, handleFileUploadError } from "../middleware/uploadPromotion.js";
import { validateReqCreatePromotions, createPromotions} from "../controllers/Promotions/CreatePromotions.js";
import { validateReqUpdatePromotions, updatePromotions } from "../controllers/Promotions/updatePromotions.js";
import { validateReqGetAllPromotions, getAllPromotions} from "../controllers/Promotions/GetAllPromotions.js";
import { validateReqGetPromotionById, getPromotionById} from "../controllers/Promotions/GetPromotionById.js";
import { validateReqDeletePromotionById, deletePromotionById} from "../controllers/Promotions/DeletePromotionById.js";
import { validateReqDeleteImagemPromotionById, deleteImagemPromotionById } from "../controllers/Promotions/DeleteImagePromotionById.js";
import "../utils/yup/index.js";

export const routePromotion = Router();

routePromotion.post("/create", authGuard, uploadPromotion.single("promotion"), handleFileUploadError, validateReqCreatePromotions, createPromotions);
routePromotion.put("/update", authGuard, uploadPromotion.single("promotion"), handleFileUploadError, validateReqUpdatePromotions, updatePromotions);
routePromotion.get("/", authGuard, validateReqGetAllPromotions, getAllPromotions);
routePromotion.get("/:id", authGuard, validateReqGetPromotionById, getPromotionById);
routePromotion.delete("/:id", authGuard, validateReqDeletePromotionById, deletePromotionById);
routePromotion.put("/photo/:id", authGuard, validateReqDeleteImagemPromotionById, deleteImagemPromotionById);