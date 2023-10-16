import { Router } from "express";
import { authGuard } from "../middleware/authGuard.js";
import "../utils/yup/index.js";
import { validateReqCreateComment, createComment } from "../controllers/Comments/CreateComment.js";
import { validateReqDeleteCommentParams, validateReqDeleteCommentBody, deleteCommentById } from "../controllers/Comments/DeleteCommentById.js";
import { validateReqUpdateCommentParams, validateReqUpdateCommentBody, updateCommentById } from "../controllers/Comments/UpdateCommentById.js";


export const routeComment = Router();

routeComment.post("/create", authGuard, validateReqCreateComment, createComment);
routeComment.delete("/:id", authGuard, validateReqDeleteCommentParams, validateReqDeleteCommentBody, deleteCommentById);
routeComment.put("/:id", authGuard, validateReqUpdateCommentParams, validateReqUpdateCommentBody, updateCommentById);