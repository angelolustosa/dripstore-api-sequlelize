import express from "express";
import { produtoController } from '../controllers/produto.controller.js'

export const routerProduto = app => {
    var router = express.Router();

    // Create a new Tutorial
    router.post("/", produtoController.create)

    // Retrieve all Tutorials
    router.get("/", produtoController.findAll);

    // Retrieve all published Tutorials
    router.get("/:status", produtoController.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", produtoController.findOne);

    // Update a Tutorial with id
    router.put("/:id", produtoController.update);

    // Delete a Tutorial with id
    router.delete("/:id", produtoController.remove);

    // Delete all Tutorials
    router.delete("/", produtoController.removeAll);

    app.use('/api/produto', router);
}
