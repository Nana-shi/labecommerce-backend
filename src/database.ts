import { TProduct, TPurchase, TUser } from "./types"

export const Users: TUser[] = [{
    id: "12345",
    email: "Fulano@gmail.com",
    password: "54321"
}, {
    id: "56789",
    email: "Beltrano@gmail.com",
    password: "98765"
}]

export const Products: TProduct[] = [{
    id: "001",
    name: "Banana",
    price: 1.00,
    category: "comida"
}, {
    id: "002",
    name: "Meia",
    price: 2.00,
    category: "roupa"
}]

export const Purchases: TPurchase[] = [{
    userId: "12345",
    productId: "001",
    quantity: 3,
    totalPrice: 3.00
}, {
    userId: "56789",
    productId: "002",
    quantity: 4,
    totalPrice: 8.00
}]