import {
    Users, Products, Purchases, createUser, getAllUsers, createProduct, getAllProducts,
    createPurchase, getProductById, queryProductsByName, getAllPurchasesFromUserId
} from "./database";
import { PRODUCT_CATEGORY, TProduct, TPurchase, TUser } from "./types";
import express, { Request, Response } from "express";
import cors from "cors"
import { type } from "os";

// console.log("Hello World")
// createUser("u003", "beltrano@email.com", "beltrano99")
// getAllUsers()
// createProduct("p004", "Monitor HD", 800, PRODUCT_CATEGORY.ELETRONICS)
// getAllProducts()
// createPurchase("u003", "p004", 2, 1600)
// getProductById("p001")
// queryProductsByName("Monitor")
// getAllPurchasesFromUserId("id001")
const app = express()
app.use(express.json())
app.use(cors())
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})
// app.get("/ping", (req: Request, res: Response) => {
//     res.send('Pong!')
// })

// - Pegar todos os usuários
app.get("/users", (req: Request, res: Response) => {
    try {
        res.status(200).send(Users)
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
    }
})
// - Pegar todos os produtos
app.get("/products", (req: Request, res: Response) => {
    try {
        res.status(200).send(Products)
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
    }
})
// - Pegar um produto pelo nome
app.get("/products/search", (req: Request, res: Response) => {
    try {
        const q = req.query.q as string
        if (q.length < 1) {
            res.status(400)
            throw new Error("Query params deve possuir pelo menos um caractere!")
        }
        const productsFilter = Products.filter((product) =>
            product.name.toLowerCase().includes(q.toLowerCase())
        )
        res.status(200).send(productsFilter)
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
app.post("/users", (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const email = req.body.email
        const password = req.body.password
        const findId = Users.find((user) => user.id === id)
        const findEmail = Users.find((user) => user.email === email)
        if (typeof id !== "string") {
            res.status(400)
            throw new Error("O conteúdo de 'id' deve ser uma 'string'!")
        }
        if (findId) {
            res.status(400)
            throw new Error("Já existe um usuario com esse 'id'")
        }
        if (typeof email !== "string") {
            res.status(400)
            throw new Error("O conteúdo de 'email' deve ser uma 'string'!")
        }
        if (findEmail) {
            res.status(400)
            throw new Error("Já existe um usuario com esse 'email'")
        }
        if (typeof password !== "string") {
            res.status(400)
            throw new Error("O conteúdo de 'password' deve ser uma 'string'!")
        }
        const newUser: TUser = {
            id: id,
            email: email,
            password: password
        }
        Users.push(newUser)
        res.status(201).send("Cadastro realizado com sucesso!")
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
app.post('/products', (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const category = req.body.category as PRODUCT_CATEGORY
        const findId = Products.find((product) => product.id === id)
        if (typeof id !== "string") {
            res.status(400)
            throw new Error("O conteúdo de 'id' deve ser uma 'string'!")
        }
        if (findId) {
            res.status(400)
            throw new Error("Já existe um produto com esse 'id'")
        }
        if (typeof name !== "string") {
            res.status(400)
            throw new Error("O conteúdo de 'name' deve ser uma 'string'!")
        }
        if (typeof price !== "number") {
            res.status(400)
            throw new Error("O conteúdo de 'id' deve ser um 'number'!")
        }
        if (category !== "Roupas e calçados" && category !== "Eletrônicos" && category !== "Comidas") {
            res.status(400)
            throw new Error("O conteúdo de 'category' deve ser um dado valido!")
        }
        const newProduct: TProduct = {
            id: id,
            name: name,
            price: price,
            category: category
        }
        Products.push(newProduct)
        res.status(201).send("Produto cadastrado com sucesso!")
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
app.post('/purchases', (req: Request, res: Response) => {
    try {
        const userId = req.body.userId
        const productId = req.body.productId
        const quantity = req.body.quantity
        const totalPrice = req.body.totalPrice
        const findIdUser = Users.find((user) => user.id === userId)
        const findIdProduct = Products.find((product) => product.id === productId)
        if (typeof userId !== "string") {
            res.status(400)
            throw new Error("O conteúdo de 'userId' deve ser uma 'string'!")
        }
        if (!findIdUser) {
            res.status(400)
            throw new Error("'UserId' não existe")
        }
        if (typeof productId !== "string") {
            res.status(400)
            throw new Error("O conteúdo de 'productId' deve ser uma 'string'!")
        }
        if (!findIdProduct) {
            res.status(400)
            throw new Error("'productId' não existe")
        }
        if (typeof quantity !== "number") {
            res.status(400)
            throw new Error("O conteúdo de 'quantity' deve ser um 'number'!")
        }
        if (typeof totalPrice !== "number") {
            res.status(400)
            throw new Error("O conteúdo de 'totalPrice' deve ser um 'number'!")
        }
        if (findIdProduct.price * quantity !== totalPrice) {
            res.status(400)
            throw new Error("O valor de 'totalPrice' está errado!")
        }
        const newPurchase: TPurchase = {
            userId: userId,
            productId: productId,
            quantity: quantity,
            totalPrice: totalPrice
        }
        Purchases.push(newPurchase)
        res.status(201).send("Compra realizada com sucesso!")
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
app.get("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = Products.find((product) => product.id === id)
        if (result === undefined) {
            res.status(400)
            throw new Error("O produto não existe ou o campo correspondente não foi preenchido!")
        }
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
app.get("/users/:id/purchases", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const findUser = Users.find((user)=>user.id === id)
        if(!findUser){
            res.status(400)
            throw new Error("O 'user' não existe!")
        }
        const result = Purchases.filter((purchase) => purchase.userId === id)
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
// - Deltar um produto por ID
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