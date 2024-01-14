import { createAdimin } from "./seeds/createAdimin.js";

const main = async () => {
	console.log("Iniciando seeds, para popular o banco de dados...");
    
	await createAdimin();
};

main();