export enum PRODUCT_CATEGORY {
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELETRONICS = "Eletrônicos",
    FOODS = "Comidas"
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
    category: PRODUCT_CATEGORY
}

export type TPurchase = {
    userId: string
    productId: string
    quantity: number
    totalPrice: number
}