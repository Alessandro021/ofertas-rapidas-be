import multer from "multer";
import {randomUUID} from "crypto";
import path from "path";
import fs from "fs";

export const uploadPromotion =  multer({
	
	storage: multer.diskStorage({
		destination: (_, __, callback) => {
			const uploadPath = "./uploads/promotion";
			if (!fs.existsSync("./uploads")) {
				fs.mkdirSync("./uploads");
			}
			if (!fs.existsSync(uploadPath)) {
				fs.mkdirSync(uploadPath);
			}
			callback(null, uploadPath);
		},
		filename: (req, file, callback) => {
			callback(null, randomUUID() + path.extname(file.originalname));
		}
	}),
	fileFilter: (req, file, callback) => {
		try {
			const extensionImg =  ["image/png","image/jpeg", "image/jpg"].find(format => format === file.mimetype);

			if(!extensionImg){
				return callback(new Error("Atenção a extensão da imagem deve ser png, jpeg ou jpg."));
			}
			callback(null, true);
		} catch (error) {
			return new Error("Houve um error  ao tentar fazer o upload da imagem.");  
		}
	}
});

export const handleFileUploadError = (err, req, res, next) => {
	if(err instanceof Error){
		return res.status(500).json({ error: true, errors: [{profile: err.message}]  });
	}
	return next();
};

