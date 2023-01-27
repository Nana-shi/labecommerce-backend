import { TProduct, TProductsWithPurchase, TPurchase, TPurchaseProducts, TUser } from "./types";
import express, { Request, Response } from "express";
import cors from "cors"
import { db } from "./database/knex";

const app = express()
app.use(express.json())
app.use(cors())
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

// - GET ALL USERS - X
app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await db("users")
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
// - CREATE NEW USER - X
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
            const [searchEmail] = await db("users").where({ email })
            if (searchEmail) {
                res.status(400)
                throw new Error("'Email' já cadastrado!")
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
            const newUser: TUser = {
                id: id,
                name: name,
                email: email,
                password: password
            }
            await db("users").insert(newUser)
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
// - CREATE NEW PRODUCT - X
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
            const newProduct: TProduct = {
                id,
                name,
                price,
                description,
                imageUrl
            }
            await db("products").insert(newProduct)
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
// - GET ALL PRODUCTS FUN 1 - X
app.get("/products", async (req: Request, res: Response) => {
    try {
        const result = await db("products")
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
// - GET ALL PRODUCTS FUN 2 X
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
        const result = await db("products").where("name", "LIKE", `%${q}%`)
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
// - EDIT PRODUCT BY ID - X
app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id
        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.description as string | undefined
        if (typeof newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("O conteúdo de 'id' deve ser uma 'string'!")
            }
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
        if (typeof newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                res.status(400)
                throw new Error("O conteúdo de 'description' deve ser uma 'string'!")
            }
        }
        if (typeof newImageUrl !== undefined) {
            if (typeof newImageUrl !== "string") {
                res.status(400)
                throw new Error("O conteúdo de 'imageUrl' deve ser um 'number'!")
            }
        }
        const [product]: TProduct[] | undefined[] = await db("products").where({ id: idToEdit })
        if (!product) {
            res.status(404)
            throw new Error("Produto com a 'id' não encontrado!")
        }
        const updateProduct: TProduct = {
            id: newId || product.id,
            name: newName || product.name,
            price: newPrice || product.price,
            description: newDescription || product.description,
            imageUrl: newImageUrl || product.imageUrl
        }
        await db("products").update(updateProduct).where({ id: idToEdit })
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
// - CREATE PURCHASE - X
app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const buyer_id = req.body.buyer_id
        const total_price = req.body.total_price
        const products = req.body.products
        const [purchase] = await db("purchases").where({ id: id })
        const [findUser]: TUser[] | undefined[] = await db("users").where({ id: buyer_id })
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
            if (products[0].id !== undefined) {
                if (typeof products[0].id !== "string") {
                    res.status(400)
                    throw new Error("'id' de produto deve ser uma 'string'")
                }
            } else {
                res.status(400)
                throw new Error("'id' de produto não preenchido")
            }
            if (products[0].quantity !== undefined) {
                if (typeof products[0].quantity !== "number") {
                    res.status(400)
                    throw new Error("'quantity' deve ser 'number'")
                }
            } else {
                res.status(400)
                throw new Error("'quantity' não preenchida")
            }
            if (!findUser) {
                res.status(400)
                throw new Error("'id' de usuário não existe!")
            }
            const newPurchase ={
                id,
                total_price,
                buyer_id
            }
            const newPurchaseProducts:TPurchaseProducts={
                purchase_id: id,
                product_id: products[0].id,
                quantity: products[0].quantity
            }
            await db("purchases").insert(newPurchase)
            await db("purchases_products").insert(newPurchaseProducts)
            res.status(201).send({message: "Pedido realizado com sucesso"})
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
// - DELETE PURCHASE BY ID
app.delete("/purchases/:id", async (req: Request, res: Response)=>{
    try {
        const idToDelete = req.params.id

        const [purchaseToDelete]: TPurchase[] | undefined[] = await db("purchases").where({id: idToDelete})
        if(!purchaseToDelete){
            res.status(404)
            throw new Error("'id' não encontrada!")
        }
        await db("purchases_products").del().where({purchase_id: idToDelete})
        await db("purchases").del().where({id: idToDelete}) 
        res.status(200).send({message: "Pedido cancelado com sucesso"})      
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
// - GET PURCHASE BY ID - X
app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const [purchase]: TPurchase[] = await db.select("purchases.*", "users.name", "users.email")
            .from("purchases").leftJoin("users", "users.id", "=", "purchases.buyer_id")
            .where({ "purchases.id": id })
            if(!purchase){
                res.status(404)
                throw new Error("'id' de purchase não existe")
            }
        const products = await db.select("products.*", "purchases_products.quantity")
            .from("purchases_products").leftJoin("products", "purchases_products.product_id", "=", "products.id")
            .where({ "purchases_products.purchase_id": id })
        const productsWithPurchase: TProductsWithPurchase[] = [{ ...purchase, products: products }]
        res.status(200).send(productsWithPurchase)
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

