import {
    Users, Products, Purchases, createUser, getAllUsers, createProduct, getAllProducts,
    createPurchase, getProductById, queryProductsByName, getAllPurchasesFromUserId
} from "./database";
import { PRODUCT_CATEGORY, TProduct, TPurchase, TUser } from "./types";
import express, { Request, Response } from "express";
import cors from "cors"
import { parseArgs } from "util";

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

app.get("/ping", (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get("/users",(req:Request, res:Response)=>{
    res.status(200).send(Users)
})

app.get("/products",(req:Request,res:Response)=>{
    res.status(200).send(Products)
})

app.get("/products/search",(req:Request,res:Response)=>{
    const q = req.query.q as string
    const productsFilter = Products.filter((product)=>
        product.name.toLowerCase().includes(q.toLowerCase())
    )
    res.status(200).send(productsFilter)
})

app.post("/users",(req:Request,res:Response)=>{
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password
    const newUser:TUser = {
        id: id,
        email: email,
        password: password
    }
    Users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso")
})

app.post('/products',(req:Request,res:Response)=>{
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category
    const newProduct:TProduct = {
        id: id,
        name: name,
        price: price,
        PRODUCT_CATEGORY: category
    }
    Products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso")
})

app.post('/purchases',(req:Request,res:Response)=>{
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice
    const newPurchase:TPurchase = {
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice        
    }
    Purchases.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso")
})



//Get Products by Id
app.get("/products/:id", (req:Request, res:Response)=>{
    const id = req.params.id
    const result = Products.find((product)=>product.id === id)
    res.status(200).send(result)
})
//Get User Purchases by User Id
app.get("/users/:id/purchases", (req:Request, res:Response)=>{
    const id = req.params.id
    const result = Purchases.filter((purchase)=> purchase.userId === id)
    res.status(200).send(result)
})
//Delete User By Id
app.delete("/users/:id", (req:Request, res:Response)=>{
    const id = req.params.id
    const indexRemove = Users.findIndex((user)=> user.id === id)
    if(indexRemove >= 0){
        Users.splice(indexRemove, 1)
    }
    res.status(200).send("User apagado com sucesso")
})

//Delete Product by Id
app.delete("/products/:id", (req:Request, res:Response)=>{
    const id = req.params.id
    const indexToRemove = Products.findIndex((product)=> product.id === id)
    if(indexToRemove >= 0){
        Products.splice(indexToRemove, 1)
    }
    res.status(200).send("Produto apagado com sucesso")
})
//Edit User by Id
app.put("/users/:id", (req:Request, res:Response)=>{
    const id = req.params.id
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined
    const user = Users.find((user)=> user.id === id)
    if(user){
        user.email = newEmail || user.email
        user.password = newPassword || user.password
    }
    res.status(200).send("Cadastro atualizado com sucesso")
})
//Edit Product by Id
app.put("/products/:id", (req:Request, res:Response)=>{
    const id = req.params.id
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as PRODUCT_CATEGORY | undefined
    const product = Products.find((product)=> product.id === id)
    if(product){
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.PRODUCT_CATEGORY = newCategory || product.PRODUCT_CATEGORY
    }
    res.status(200).send("Produto atualizado com sucesso")
})