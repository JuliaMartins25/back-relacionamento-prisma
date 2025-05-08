import CardModel from "../models/cardModel.js";


class CardController {
  // GET /cartas
  async getAllCards(req, res) {
    const raridade = req.query.raridade;
    console.log("Raridade:", raridade);

    const ataque = req.query.ataque;
    console.log(ataque);

    try {
      const cartas = await CardModel.findAll(raridade, ataque);
      
      res.json(cartas);
    } catch (error) {
      console.error("Erro ao buscar as cartas:", error);
      res.status(500).json({ error: "Erro ao buscar as cartas" });
    }
  }

  // GET /api/cartas/:id
  async getCardById(req, res) {
    try {
      const { id } = req.params;

      const carta = await CardModel.findById(id);

      if (!carta) {
        return res.status(404).json({ error: "Carta não encontrada" });
      }

      res.json(carta);
    } catch (error) {
      console.error("Erro ao buscar carta:", error);
      res.status(500).json({ error: "Erro ao buscar carta!" });
    }
  }

  // POST /api/cartas

async createCard(req, res) {
    try {
      // Validação básica
      const {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,
      } = req.body;

      // Verifica se todos os campos das coleções foram fornecidos
      if (!name || !rarity || !attackPoints || !defensePoints || !collectionId) {
        return res
          .status(400)
          .json({
            error:
              "Os campos nome, raridade, pontos de ataque, pontos de defesa e o id da coleção são obrigatórios",
          });
      }

      // Criar o novo personagem
      const newCard = await CardModel.create(
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,
      );

      if (!newCard) {
        return res.status(400).json({ error: "Erro ao criar carta" });
      }

      res.status(201).json(newCard);
    } catch (error) {
      console.error("Erro ao criar carta:", error);
      res.status(500).json({ error: "Erro ao criar carta!" });
    }
  }


  // PUT /api/cartas/:id
  async updateCard(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,
      } = req.body;

      // Atualizar a carta
      const updateCard = await CardModel.update(
        id,
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId
      );

      if (!updateCard) {
        return res.status(404).json({ error: "Carta não encontrada" });
      }

      res.json(updateCard);
    } catch (error) {
      console.error("Erro ao atualizar carta:", error);
      res.status(500).json({ error: "Erro ao atualizar carta!" });
    }
  }

  // DELETE /carta/:id
  async deleteCard(req, res) {
    try {
      const { id } = req.params;

      // Remover a carta
      const result = await CardModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Carta não encontrada" });
      }

      res.status(200).json({
        message: "Carta removida com sucesso",
      });
      // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover carta:", error);
      res.status(500).json({ error: "Erro ao remover carta" });
    }
  }
}

export default new CardController();
