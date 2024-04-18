interface IOrderRequest {
    userId: number;
    products: IOrderProduct[];
}

interface IOrderResponse {
    id: number;
    userId: number;
    productId: number;
    product: IProduct;
    quantity: number;
    total: number;
}


interface IOrderProduct {
    productId: number;
    quantity: number;
}