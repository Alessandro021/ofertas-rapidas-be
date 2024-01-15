import fs from "fs";
import path from "path";
const __dirname = path.resolve();

export const deletePhoto = async (url) => {
	const photoPath = path.join(__dirname, url);
	await fs.promises.unlink(photoPath);
};