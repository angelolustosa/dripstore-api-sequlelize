# dripstore-api

Fonte: [https://www.bezkoder.com/node-js-express-sequelize-mysql/](https://www.bezkoder.com/node-js-express-sequelize-mysql/)

Aplicação em NodeJs + Express + Sequelize + MySQL (ES6 import)

- Nodemon
- Sequelize
- MySQL
- Express

#Criar o produto

GET {{BASE_URL}}/api/produto

```json
{
    "nome": "Tênis",
    "descricao": "K-Swiss V8 - Masculino",
    "desconto": 30,
    "precoAntes": 200,
    "precoDepois": 100,
    "categoria": 1
}
```


retorno

```json
{
    "id": 4,
    "nome": "Tênis 3",
    "descricao": "K-Swiss V8 - Masculino 3",
    "desconto": 50,
    "precoAntes": "100",
    "precoDepois": "50",
    "ativo": false,
    "createdAt": "2023-11-29T00:28:59.201Z",
    "updatedAt": "2023-11-29T00:28:59.201Z",
    "categoria": {
        "id": 1,
        "nome": "Esporte",
        "codigo": 1
    }
}
```