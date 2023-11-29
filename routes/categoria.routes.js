import express from "express";
import { categoriaController } from '../controllers/categoria.controller.js'

export const routerCategoria = app => {
    var router = express.Router();

    // Create a new Tutorial
    router.post("/", categoriaController.create)

    // Retrieve all Tutorials
    router.get("/", categoriaController.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", categoriaController.findOne);

    // Update a Tutorial with id
    router.put("/:id", categoriaController.update);

    // Delete a Tutorial with id
    router.delete("/:id", categoriaController.remove);

    // Delete all Tutorials
    router.delete("/", categoriaController.removeAll);

    app.use('/api/categoria', router);
}
