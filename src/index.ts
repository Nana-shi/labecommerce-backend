import {
    Users, Products, Purchases, createUser, getAllUsers, createProduct, getAllProducts,
    createPurchase, getProductById, queryProductsByName, getAllPurchasesFromUserId
} from "./database";
import { PRODUCT_CATEGORY, TProduct, TPurchase, TUser } from "./types";
import express, { Request, Response } from "express";
import cors from "cors"
import { db } from "./database/knex";

const app = express()
app.use(express.json())
app.use(cors())
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

// - Pegar todos os usuários
app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
            SELECT * FROM users;
        `)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado!")
        }
    }
})
// - Pegar todos os produtos
app.get("/products", async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
            SELECT * FROM products;
        `)
        res.status(200).send(result)
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado!")
        }
    }
})
// - Pegar um produto pelo nome
app.get("/products/search", async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string
        if (q !== undefined) {
            if (q.length < 1) {
                res.status(400)
                throw new Error("Query params deve possuir pelo menos um caractere!")
            }
        } else {
            res.status(400)
            throw new Error("Query params não preenchida!")
        }
        const result = await db.raw(`
            SELECT * FROM products
            WHERE name ="${q}";
        `)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado!")
        }
    }
})
// - Criar um novo usuário
app.post("/users", async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const [user] = await db("users").where({ id: id })
        if (user) {
            res.status(400)
            throw new Error("Já existe um usuário com essa 'id'!")
        } else {
            if (id !== undefined) {
                if (typeof id !== "string") {
                    res.status(400)
                    throw new Error("O conteúdo de 'id' deve ser uma 'string'!")
                }
            } else {
                res.status(400)
                throw new Error("É necessario preencher o campo de Id do usuário!")
            }
            if (name !== undefined) {
                if (typeof name !== "string") {
                    res.status(400)
                    throw new Error("O conteúdo de 'name' deve ser uma 'string'")
                }
            } else {
                res.status(400)
                throw new Error("É necessario preencher o campo de 'name' do usuário!")
            }
            if (email !== undefined) {
                if (typeof email !== "string") {
                    res.status(400)
                    throw new Error("O conteúdo de 'email' deve ser uma 'string'!")
                }
            } else {
                res.status(400)
                throw new Error("O email deve ser preenchido!")
            }
            if (password !== undefined) {
                if (typeof password !== "string") {
                    res.status(400)
                    throw new Error("O conteúdo de 'password' deve ser uma 'string'!")
                }
            } else {
                res.status(400)
                throw new Error("É necessário cadastrar uma senha!")
            }
            await db.raw(`
            INSERT INTO users (id, name, email, password)
            VALUES ('${id}', '${name}', '${email}', '${password}')
        `)
            res.status(201).send("Cadastro realizado com sucesso!")
        }
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado!")
        }
    }
})
// - Criar um novo produto
app.post('/products', async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const description = req.body.description
        const imageUrl = req.body.imageUrl
        const [product] = await db("products").where({ id: id })
        if (product) {
            res.status(400)
            throw new Error("Já existe um produto com essa 'id'!")
        } else {
            if (id !== undefined) {
                if (typeof id !== "string") {
                    res.status(400)
                    throw new Error("O conteúdo de 'id' deve ser uma 'string'!")
                }
            } else {
                res.status(400)
                throw new Error("É necessario preencher o campo de 'id' do produto!")
            }
            if (name !== undefined) {
                if (typeof name !== "string") {
                    res.status(400)
                    throw new Error("O conteúdo de 'name' deve ser uma 'string'!")
                }
            } else {
                res.status(400)
                throw new Error("É necessario preencher o campo de 'name' do produto!")
            }
            if (price !== undefined) {
                if (typeof price !== "number") {
                    res.status(400)
                    throw new Error("O conteúdo de 'id' deve ser um 'number'!")
                }
            } else {
                res.status(400)
                throw new Error("É necessario preencher o campo de 'price' do produto!")
            }
            if (description !== undefined) {
                if (typeof description !== "string") {
                    res.status(400)
                    throw new Error("O conteúdo de 'description' deve ser uma 'string'!")
                }
            } else {
                res.status(400)
                throw new Error("É necessario preencher o campo de 'description' do produto!")
            }
            if (imageUrl !== undefined) {
                if (typeof imageUrl !== "string") {
                    res.status(400)
                    throw new Error("O conteúdo de 'imageUrl' deve ser uma 'string'!")
                }
            } else {
                res.status(400)
                throw new Error("É necessario preencher o campo de 'imageUrl' do produto!")
            }
            await db.raw(`
            INSERT INTO products (id, name, price, description, imageUrl)
            VALUES ('${id}','${name}','${price}','${description}', '${imageUrl}')
            `)
            res.status(201).send("Produto cadastrado com sucesso!")
        }
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado!")
        }
    }
})
// - Criar uma nova compra
app.post('/purchases', async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const buyer_id = req.body.buyer_id
        const total_price = req.body.total_price
        const paid = req.body.paid
        const [purchase] = await db("purchases").where({ id: id })
        if (purchase) {
            res.status(400)
            throw new Error("Já existe uma compra com essa 'id'!")
        } else {
            if (id !== undefined) {
                if (typeof id !== "string") {
                    res.status(400)
                    throw new Error("O campo referente à Id precisa ser uma string!")
                }
            } else {
                res.status(400)
                throw new Error("O campo referente à Id precisa ser preenchido!")
            }
            if (buyer_id !== undefined) {
                if (typeof buyer_id !== "string") {
                    res.status(400)
                    throw new Error("O id do comprador precisa ser uma string!")
                }
            } else {
                res.status(400)
                throw new Error("O id do comprador precisa ser preenchido!")
            }
            if (total_price !== undefined) {
                if (typeof total_price !== "number") {
                    res.status(400)
                    throw new Error("O conteúdo de 'totalPrice' deve ser um 'number'!")
                }
            } else {
                res.status(400)
                throw new Error("Valor total da compra não preenchido!")
            }
            if (paid !== undefined) {
                if (typeof paid !== "number") {
                    res.status(400)
                    throw new Error("Valor pago precisa ser um 'number'")
                }
            } else {
                res.status(400)
                throw new Error("Valor pago precisa ser preenchido!")
            }

            await db.raw(`
            INSERT INTO purchases (id, total_price, paid, buyer_id)
            VALUES ('${id}','${total_price}','${paid}','${buyer_id}');
            `)
            await db.raw(`
            UPDATE purchases
            SET createdAt = DATE('now')
            WHERE id='${id}';
            `)
            res.status(201).send("Compra realizada com sucesso!")
        }
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado!")
        }
    }
})
// - Pegar produto por ID
app.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = await db.raw(`
        SELECT * FROM products
        WHERE id='${id}';
        `)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado!")
        }
    }
})
// - Pegar uma compra por ID do usuário
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = await db.raw(`
        SELECT * FROM purchases
        WHERE buyer_id='${id}';
        `)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado!")
        }
    }

})
// - Deletar um usuário por ID
app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const indexRemove = Users.findIndex((user) => user.id === id)
        if (indexRemove >= 0) {
            Users.splice(indexRemove, 1)
        } else {
            res.status(400)
            throw new Error("O User não existe!")
        }
        res.status(200).send("User apagado com sucesso!")
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado!")
        }
    }
})
// - Deletar um produto por ID
app.delete("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const indexToRemove = Products.findIndex((product) => product.id === id)
        if (indexToRemove >= 0) {
            Products.splice(indexToRemove, 1)
        } else {
            res.status(400)
            throw new Error("O produto não existe!")
        }
        res.status(200).send("Produto apagado com sucesso!")
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado!")
        }
    }

})
// - Editar usuário por ID
app.put("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined
        const user = Users.find((user) => user.id === id)
        if (user) {
            user.email = newEmail || user.email
            user.password = newPassword || user.password
        } else {
            res.status(400)
            throw new Error("O User não existe!")
        }
        if (typeof newEmail !== undefined) {
            if (typeof newEmail !== "string") {
                res.status(400)
                throw new Error("O conteúdo de 'email' deve ser uma 'string'!")
            }
        }
        if (typeof newPassword !== undefined) {
            if (typeof newPassword !== "string") {
                res.status(400)
                throw new Error("O conteúdo de 'password' deve ser uma 'string'!")
            }
        }
        res.status(200).send("Cadastro atualizado com sucesso!")
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})
// - Editar produto por ID
app.put("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newCategory = req.body.category as PRODUCT_CATEGORY | undefined
        const product = Products.find((product) => product.id === id)
        if (product) {
            product.name = newName || product.name
            product.price = newPrice || product.price
            product.category = newCategory || product.category
        } else {
            res.status(400)
            throw new Error("O Produto não existe!")
        }
        if (typeof newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("O conteúdo de 'name' deve ser uma 'string'!")
            }
        }
        if (typeof newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(400)
                throw new Error("O conteúdo de 'price' deve ser um 'number'!")
            }
        }
        if (typeof newCategory !== undefined) {
            if (newCategory !== "Roupas e calçados" && newCategory !== "Eletrônicos" && newCategory !== "Comidas") {
                res.status(400)
                throw new Error("Categoria invalida. O conteúdo de 'category' deve ser um dado valido!")
            }
        }
        res.status(200).send("Produto atualizado com sucesso!")
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado!")
        }
    }
})