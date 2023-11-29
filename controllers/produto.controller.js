import db from "../models/index.js";
const Produto = db.produto;
const Categoria = db.categoria;

const attributesOptions = {
    include: [{
        model: Categoria, as: 'categoria',
        attributes: ['id', 'nome', 'codigo'],
    }],
    attributes: { exclude: ['categoriaId'] }
}

export const produtoController = {
    //Create and Save a new Produto
    create: async (req, res) => {
        try {
            const { nome, descricao, desconto, precoAntes, precoDepois, ativo, categoriaId } = req.body;

            // Encontre a categoria com base no ID fornecido
            const categoriaExistente = await Categoria.findByPk(categoriaId);

            if (!categoriaExistente) {
                return res.status(400).json({ error: 'A categoria especificada não existe.' });
            }

            // Crie o produto associado à categoria usando o ID da categoria e inclua a categoria na resposta
            const novoProduto = await Produto.create({
                nome,
                descricao,
                desconto,
                precoAntes,
                precoDepois,
                ativo,
                //categoria: categoriaExistente, // Inclua a categoria diretamente durante a criação
                categoriaId,
            });

            // Retorne o produto com a categoria preenchida
            const produtoComCategoria = await Produto.findByPk(novoProduto.id, attributesOptions/* {
                include: [{
                    model: Categoria, as: 'categoria',
                    attributes: ['id', 'nome', 'codigo'],
                }],
                attributes: { exclude: ['categoriaId'] },
            } */);

            res.status(201).json(produtoComCategoria);
        } catch (error) {
            console.error('Erro:', error);
            res.status(500).json({ error: 'Erro ao criar o produto.' });
        }
    },
    //Retrieve all Produtos from the database.
    findAll: async (req, res) => {
        try {
            const produtosComCategoria = await Produto.findAll(attributesOptions/* {
                include: [{
                    model: Categoria, as: 'categoria',
                    attributes: ['id', 'nome', 'codigo'],
                }],
                attributes: { exclude: ['categoriaId'] },
            } */);

            res.json(produtosComCategoria);
        } catch (error) {
            console.error('Erro:', error);
            res.status(500).json({ error: 'Erro ao buscar produtos.' });
        }
    },
    // Retrieve a single Produto with id
    findOne: async (req, res) => {
        try {
            const { id } = req.params;

            console.log(`ID`, id)

            // Busque o produto pelo ID
            const produto = await Produto.findByPk(id, attributesOptions);

            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado.' });
            }

            res.status(200).json(produto);
        } catch (error) {
            console.error('Erro:', error);
            res.status(500).json({ error: 'Erro ao obter o produto.' });
        }
    },
    // Find all published Produtos
    findAllPublished: (req, res) => {
        //https://sentry.io/answers/how-can-i-convert-a-string-to-a-boolean-in-javascript/#:~:text=The%20Solution,false%E2%80%9D%20string%20to%20a%20boolean.
        const status = req.params.status.toLowerCase() === "true" ? true : false;

        console.log(`status`, status)

        // Exemplo de where: buscar produtos apenas ativos
        const whereClause = {
            ativo: true,
        };

        Produto.findAll({
            where: { ativo: status },
            include: [{
                model: Categoria,
                as: 'categoria',
                attributes: ['id', 'nome', 'codigo'],
            }],
            attributes: { exclude: ['categoriaId'] }
        }/* { where: { ativo: status }, attributesOptions } */)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Produtos."
                });
            });
    }
    // Update a Produto by the id in the request
    update: async (req, res) => {
        try {
            const { id } = req.params; // ID do produto a ser atualizado
            const { nome, descricao, desconto, precoAntes, precoDepois, ativo, categoriaId } = req.body;

            // Verifique se o produto existe
            const produtoExistente = await Produto.findByPk(id);

            if (!produtoExistente) {
                return res.status(404).json({ error: 'Produto não encontrado.' });
            }

            // Verifique se a categoria existe
            const categoriaExistente = await Categoria.findByPk(categoriaId);

            if (!categoriaExistente) {
                return res.status(400).json({ error: 'A categoria especificada não existe.' });
            }

            // Atualize o produto
            await produtoExistente.update({ nome, descricao, desconto, precoAntes, precoDepois, ativo, categoriaId });

            // Retorne o produto atualizado
            const produtoAtualizado = await Produto.findByPk(id, {
                include: [{ model: Categoria, as: 'categoria' }],
                attributes: { exclude: ['categoriaId'] },
            });

            res.status(200).json(produtoAtualizado);
        } catch (error) {
            console.error('Erro:', error);
            res.status(500).json({ error: 'Erro ao atualizar o produto.' });
        }
    },
    // Delete a Produto with the specified id in the request
    remove: async (req, res) => {
        try {
            const { id } = req.params;

            // Verifique se o produto existe
            const produtoExistente = await Produto.findByPk(id);

            if (!produtoExistente) {
                return res.status(404).json({ error: 'Produto não encontrado.' });
            }

            // Exclua o produto
            await produtoExistente.destroy();

            res.status(204).send(); // 204 No Content: Indica que a operação foi bem-sucedida, mas não há conteúdo para enviar na resposta.
        } catch (error) {
            console.error('Erro:', error);
            res.status(500).json({ error: 'Erro ao excluir o produto.' });
        }
    },
    // Delete all Produtos from the database.
    removeAll: (req, res) => async (req, res) => {
        try {
            // Exclua todos os produtos
            await Produto.destroy({ where: {} });

            res.status(204).send(); // 204 No Content
        } catch (error) {
            console.error('Erro:', error);
            res.status(500).json({ error: 'Erro ao excluir todos os produtos.' });
        }
    }
}

/*
// Create and Save a new Produto
export const salvar = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Produto
    const Produto = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save Produto in the database
    Produto.create(Produto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Produto."
            });
        });
}

// Retrieve all Produtos from the database.
export const findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Produto.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Produtos."
            });
        });
}

export const findOne = (req, res) => {
    const id = req.params.id;

    produtoModel.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Produto with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Produto with id=" + id
            });
        })
}

// Update a Produto by the id in the request
export const update = (req, res) => {
    const id = req.params.id;

    Produto.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Produto was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Produto with id=${id}. Maybe Produto was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Produto with id=" + id
            });
        });
}

// Delete a Produto with the specified id in the request
export const remove = (req, res) => {
    const id = req.params.id;

    Produto.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Produto was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Produto with id=${id}. Maybe Produto was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Produto with id=" + id
            });
        });
}

// Delete all Produtos from the database.
export const removeAll = (req, res) => {
    Produto.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Produtos were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Produtos."
            });
        });
}
// Find all published Produtos

export const findAllPublished = (req, res) => {
    Produto.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Produtos."
            });
        });
}
*/






