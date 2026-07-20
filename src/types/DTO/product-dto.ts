export type createProductDTO = {
    name : string,
    slug : string,
    description : string,
    image ?: string | '/NoProduct.jpg',
    price : number,
    isDiscount : boolean,
    discountPrice ?: number | 0,
    stock : number,
    userId : string,
    categoryId: string,
}