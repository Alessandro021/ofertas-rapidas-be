import { Router } from "express";
import { authGuardAdmin } from "../middleware/authGuardAdmin.js";
import { createCategory, validateReqCreateCategory } from "../controllers/Categories/CreateCategory.js";
import { getAllCategory } from "../controllers/Categories/GetAllCategory.js";
import { validateReqUpdateCategoryBody, validateReqUpdateCategoryParams, updateCategory } from "../controllers/Categories/updateCategory.js";
import { validateReqDeleteCategory, deleteCategory } from "../controllers/Categories/DeleteCategory.js";

export {Router} from "express";


export const routeCategory = Router();

routeCategory.post("/create", authGuardAdmin, validateReqCreateCategory, createCategory );
routeCategory.get("/", getAllCategory);
routeCategory.put("/update/:id", authGuardAdmin, validateReqUpdateCategoryParams, validateReqUpdateCategoryBody, updateCategory);
routeCategory.delete("/delete/:id", authGuardAdmin, validateReqDeleteCategory, deleteCategory);