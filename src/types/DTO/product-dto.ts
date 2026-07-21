export type createProductDTO = {
    name : string,
    slug : string,
    description : string,
    mainImage ?: string | '/NoProduct.jpg',
    productImage ?: string[],
    latestVersion ?: string,
    price : number,
    isDiscount : boolean,
    discountPrice ?: number | 0,
    stock : number,
    userId : string,
    categoryId: string,
}