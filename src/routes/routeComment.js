import { Router } from "express";
import { authGuard } from "../middleware/authGuard.js";
import "../utils/yup/index.js";
import { validateReqCreateComment, createComment } from "../controllers/Comments/CreateComment.js";
import { validateReqDeleteCommentParams, validateReqDeleteCommentBody, deleteCommentById } from "../controllers/Comments/DeleteComment.js";


export const routeComment = Router();

routeComment.post("/create", authGuard, validateReqCreateComment, createComment);
routeComment.delete("/:id", authGuard, validateReqDeleteCommentParams, validateReqDeleteCommentBody, deleteCommentById);