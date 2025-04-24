import express from "express";
import CardController from "../controllers/cardController.js";
const cardRouter = express.Router();

// Rotas de card
// GET /cartas - Listar todas as Cartas
cardRouter.get("/", CardController.getAllCards);

// GET /cartas/:id - Obter Cartas pelo ID
cardRouter.get("/:id", CardController.getCardById);

// POST /cartas - Criar uma nova Cartas
cardRouter.post("/", CardController.createCard);

// PUT /cartas/:id - Atualizar uma Cartas
cardRouter.put("/:id", CardController.updateCard);

// DELETE /cartas/:id - Remover uma Cartas
cardRouter.delete("/:id", CardController.deleteCard);

export default cardRouter;
