import instance from "./instance";
const jwt = "Bearer " + JSON.parse(localStorage.getItem("jwt"))
interface ICategory {
    _id?: string,
    name: string
}

export const getAllCategory = () => {
    return instance.get("/categories")
}
export const getCategory = (id: string | undefined) => {
    return instance.get("/categories/" + id)
}
export const deleteCategory = (id: string | undefined) => {
    return instance.delete("/categories/" + id, {
        headers: {
            Authorization: jwt
        }
    })
}
export const addCategory = (data: ICategory) => {
    return instance.post("/categories", data, {
        headers: {
            Authorization: jwt
        }
    })
}
export const updateCategory = (data: ICategory) => {
    return instance.put(`/categories/${data?._id}`, data, {
        headers: {
            Authorization: jwt
        }
    })
}
export const getProductByCategoryId = (id: string | undefined) => {
    return instance.get(`/categories/${id}?_expand=products`)
}
