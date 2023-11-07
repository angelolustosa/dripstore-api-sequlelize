import db from "../models/index.js";
const Produto = db.produto;

export const produtoController = {
    // Create and Save a new Produto
    create: (req, res) => {
        // Validate request
        if (!req.body.nome) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        const { nome, categoria, descricao, desconto, precoAntes, precoDepois, ativo } = req.body

        // Create a Produto
        const produto = { nome, categoria, descricao, desconto, precoAntes, precoDepois, ativo }

        console.log(`produto:`, produto)
        // Save Produto in the database
        Produto.create(produto)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Produto."
                });
            });
    },
    // Retrieve all Produtos from the database.
    findAll: (req, res) => {
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
    },
    // Retrieve a single Produto with id
    findOne: (req, res) => {
        const id = req.params.id;

        Produto.findByPk(id)
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
                    message: "Error retrieving Produto with id=" + id,
                    erro: err
                });
            })
    },
    // Update a Produto by the id in the request
    update: (req, res) => {
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
    },
    // Delete a Produto with the specified id in the request
    remove: (req, res) => {
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
    },
    // Delete all Produtos from the database.
    removeAll: (req, res) => {
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
    },
    // Find all published Produtos
    findAllPublished: (req, res) => {
        //https://sentry.io/answers/how-can-i-convert-a-string-to-a-boolean-in-javascript/#:~:text=The%20Solution,false%E2%80%9D%20string%20to%20a%20boolean.
        const status = req.params.status.toLowerCase() === "true" ? true : false;

        console.log(`status`, status)

        Produto.findAll({ where: { ativo: status } })
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






