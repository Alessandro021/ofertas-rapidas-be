import { Router } from "express";
import { authGuard } from "../middleware/authGuard.js";
import "../utils/yup/index.js";
import { validateReqCreateRating, createRating } from "../controllers/Ratings/CreateRating.js";
import { validateReqDeleteRatingById, deleteRatingById } from "../controllers/Ratings/DeleteRatingById.js";
import { validateReqGetAllRatingsByPromotionId, getAllRatingsByPromotionId } from "../controllers/Ratings/GetAllRatingsByPromotionId.js";

export const routeRating = Router();

routeRating.post("/create", authGuard, validateReqCreateRating, createRating);
routeRating.delete("/:id", authGuard, validateReqDeleteRatingById, deleteRatingById);
routeRating.get("/:id", validateReqGetAllRatingsByPromotionId,getAllRatingsByPromotionId);
