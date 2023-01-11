import { TProduct, TPurchase, TUser, PRODUCT_CATEGORY } from "./types"

export const Users: TUser[] = [{
    id: "id001",
    email: "Fulano@gmail.com",
    password: "54321"
}, {
    id: "id002",
    email: "Beltrano@gmail.com",
    password: "98765"
}]

export const Products: TProduct[] = [{
    id: "p001",
    name: "Monitor",
    price: 1200.00,
    PRODUCT_CATEGORY: PRODUCT_CATEGORY.ELETRONICS
}, {
    id: "p002",
    name: "Tênis Preto",
    price: 120.00,
    PRODUCT_CATEGORY: PRODUCT_CATEGORY.CLOTHES_AND_SHOES
}]

export const Purchases: TPurchase[] = [{
    userId: "id001",
    productId: "p001",
    quantity: 1,
    totalPrice: 1200.00
}, {
    userId: "id001",
    productId: "p002",
    quantity: 2,
    totalPrice: 240.00
}]

// FUNÇÕES ABAIXO

export function createUser(par1:string, par2:string, par3:string):void{
    const newUser: TUser = {
        id: par1,
        email: par2,
        password: par3
    }
    console.log("Cadastro realizado com sucesso!")
    Users.push(newUser)
}

export function getAllUsers():void{
    console.table(Users)
}

export function createProduct(par1:string, par2:string, par3:number, par4:string):void{
    const newProduct: TProduct = {
        id: par1,
        name: par2,
        price: par3,
        PRODUCT_CATEGORY: par4
    }
    Products.push(newProduct)
}

export function getAllProducts():void{
    console.table(Products)
}

export function getProductById(par:string):void{
    const productById = Products.filter((product)=>{
        return product.id === par
    })
    console.table(productById)   
}

export function queryProductsByName(par:string):void{
    const productByName = Products.filter((product)=>{
        return product.name === par
    })
    console.table(productByName)
}

export function createPurchase(par1:string, par2:string, par3:number, par4:number):void{
    const newPurchase: TPurchase = {
        userId: par1,
        productId: par2,
        quantity: par3,
        totalPrice: par4
    }
    Purchases.push(newPurchase)
}

export function getAllPurchasesFromUserId(par:string):void{
    const purchaseById = Purchases.filter((purchase)=>{
        return purchase.userId === par
    })
    console.table(purchaseById)    
}