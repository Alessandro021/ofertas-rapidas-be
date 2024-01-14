/* eslint-disable no-undef */
import {prisma} from "../../src/database/prismaClient.js";

const categories = [
	"Acessórios Automotivos",
	"Acessórios de Tecnologia",
	"Acessórios para Animais",
	"Acessórios para Câmeras",
	"Acessórios para Celulares",
	"Acessórios para Esportes",
	"Acessórios para Viagem",
	"Alimentos Congelados",
	"Alimentos Naturais",
	"Alimentos Orgânicos",
	"Antiguidades",
	"Artesanato",
	"Artigos de Banho",
	"Artigos de Cama, Mesa e Banho",
	"Artigos de Camping",
	"Artigos de Festas",
	"Artigos de Pesca",
	"Artigos Esportivos",
	"Artigos para Bebês",
	"Artigos para Churrasco",
	"Artigos para Confeitaria",
	"Artigos para Decoração",
	"Artigos para Jardinagem",
	"Artigos para Piscina",
	"Automóveis",
	"Bebidas Alcoólicas",
	"Bebidas Não Alcoólicas",
	"Beleza e Cosméticos",
	"Bicicletas",
	"Bijuterias e Joias",
	"Bolsas e Malas",
	"Brinquedos",
	"Calçados",
	"Câmeras e Fotografia",
	"Camping e Aventura",
	"Casa e Construção",
	"Cervejas Artesanais",
	"Chocolates e Doces",
	"Climatização",
	"Colchões e Camas",
	"Cuidados Pessoais",
	"Cursos e Educação",
	"Decoração de Interiores",
	"Eletrodomésticos",
	"Eletroportáteis",
	"Eletrônicos",
	"Equipamentos de Áudio",
	"Equipamentos de Segurança",
	"Equipamentos de Vídeo",
	"Equipamentos Médicos",
	"Esportes Aquáticos",
	"Esportes de Aventura",
	"Esportes de Inverno",
	"Ferramentas",
	"Fitness e Musculação",
	"Flores e Plantas",
	"Frutas e Verduras",
	"Games e Consoles",
	"Higiene Bucal",
	"Higiene Íntima",
	"Iluminação",
	"Imóveis",
	"Informática e Acessórios",
	"Instrumentos Musicais",
	"Jardinagem",
	"Laticínios e Frios",
	"Livros e Revistas",
	"Material de Escritório",
	"Material Escolar",
	"Material para Artes",
	"Móveis",
	"Música e Filmes",
	"Óculos e Lentes",
	"Outros",
	"Papelaria",
	"Perfumaria",
	"Pet Shop",
	"Produtos de Limpeza",
	"Produtos Diet e Light",
	"Produtos para Carros",
	"Produtos para Casa",
	"Produtos para o Cabelo",
	"Relógios",
	"Roupas",
	"Suplementos Alimentares",
	"Viagens e Turismo",
];
export const createCategories = async () => {
	try {
		const categoriesExist = await prisma.categories.count();

		if(categoriesExist > 0){
			return console.log("Já existem categorias cadastradas.");
		}

		await prisma.categories.createMany({
			data: categories.map(category => ({name: category}))
		});

		console.log("Seed de categorias foi adicionado ao banco de dados.");
        
	} catch (error) {
		// console.log(`ERROR CREATE ADMIN: ${error}`);
		return console.log("Error ao criar categorias.");
	} finally {
		await prisma.$disconnect();
	}
};