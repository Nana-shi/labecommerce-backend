// export enum PRODUCT_CATEGORY {
//     CLOTHES_AND_SHOES = "Roupas e calçados",
//     ELETRONICS = "Eletrônicos",
//     FOODS = "Comidas"
// }

export type TUser = {
    id: string
    name: string
    email: string
    password: string
}

export type TProduct = {
    id: string
    name: string
    price: number
    description: string
    imageUrl: string
}

export type TPurchase = {
    id: string
    buyer_id: string
    total_price: number
    paid: number
}

export type TProductsWithPurchase = {
    id: string
    buyer_id: string
    total_price: number
    paid: number
    products: TProduct[]
}

export type TPurchaseProducts = {
    purchase_id: string
    product_id: string
    quantity: number
}