import instance from "./instance";

const searchProduct = (data: string) => {
    return instance.get("/search?q=" + data)
}
export default searchProduct