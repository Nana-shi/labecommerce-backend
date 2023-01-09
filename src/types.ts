export enum PRODUCT_CATEGORY {
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELETRONICS = "Eletrônicos",
    FOOD = "Comida"
}

export type TUser = {
    id: string
    email: string
    password: string
}

export type TProduct = {
    id: string
    name: string
    price: number
    PRODUCT_CATEGORY: string
}

export type TPurchase = {
    userId: string
    productId: string
    quantity: number
    totalPrice: number
}