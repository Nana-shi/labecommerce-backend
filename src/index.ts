import { Users, Products, Purchases, createUser, getAllUsers, createProduct, getAllProducts, 
createPurchase, getProductById, queryProductsByName, getAllPurchasesFromUserId } from "./database";
import { PRODUCT_CATEGORY } from "./types";

// console.log("Hello World")

// createUser("u003", "beltrano@email.com", "beltrano99")
// getAllUsers()

// createProduct("p004", "Monitor HD", 800, PRODUCT_CATEGORY.ELETRONICS)
// getAllProducts()

// createPurchase("u003", "p004", 2, 1600)

// getProductById("p001")
// queryProductsByName("Monitor")
getAllPurchasesFromUserId("id001")