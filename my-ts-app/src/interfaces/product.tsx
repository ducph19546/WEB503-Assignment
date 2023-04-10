export default interface IProduct {
    _id?: string | undefined,
    __v?: number,
    name: string,
    desc?: string,
    price: number,
    image?: string,
    categoryId: {
        name?: string,
        _id?: string
    }
}