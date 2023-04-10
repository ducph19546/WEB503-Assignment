import instance from "./instance";
import IProduct from "../interfaces/product";


// Sử dụng token khi call API
const jwt = "Bearer " + JSON.parse(localStorage.getItem("jwt"))

export const getAllProduct = (params: string) => {
    return instance.get("/products?" + params)
}
export const getOneProduct = (id: string | undefined) => {
    return instance.get("/products/" + id)
}
export const deleteProduct = (id: string | undefined) => {
    return instance.delete("/products/" + id, {
        headers: {
            Authorization: jwt
        }
    })
}
export const addProduct = (data: IProduct) => {
    return instance.post("/products", data, {
        headers: {
            Authorization: jwt
        }
    })
}
export const updateProduct = (data: IProduct) => {
    return instance.put("/products/" + data?._id, data, {
        headers: {
            Authorization: jwt
        }
    })
}