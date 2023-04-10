import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import { addProduct, deleteProduct, getAllProduct, updateProduct } from './API/product'
import Dashboard from './pages/admin/Dashboard'
import ProductAdd from './pages/admin/ProductAddForm'
import ProductsManagement from './pages/admin/ProductsManagement'
import ProductUpdate from './pages/admin/ProductUpdate'
import HomePage from './pages/HomePage'
import WebsiteLayout from './pages/layouts/WebsiteLayout'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductsPage from './pages/ProductsPage'
// interfaces
import IProduct from './interfaces/product'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { IUser } from './interfaces/user'
import AdminLayout from './pages/layouts/AdminLayout'
import ICategory from './interfaces/category'
import { addCategory, deleteCategory, getAllCategory, updateCategory } from './API/category'
import CategoryManagement from './pages/admin/CategoryManagement'
import CategoryAdd from './pages/admin/CategoryAdd'
import CategoryUpdate from './pages/admin/CategoryUpdate'
import { message } from 'antd'

function App() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  // const isAuthenticated = false
  const getAllItems = async () => {
    const { data: category } = await getAllCategory()
    setCategories(category)
    const { data } = await getAllProduct()
    setProducts(data.data)

  }
  const onHandleRemove = async (_id: string | undefined) => {
    try {
      const confirm = window.confirm("Are you sure to remove this item?")
      if (confirm) {
        await deleteProduct(_id)
        getAllItems()
        message.success("Deleted successfully")
        setProducts(products.filter((item: IProduct) => item._id != _id))
      }
    } catch (error) {
      message.error(error?.response?.data?.message)
    }
  }
  const onHandleRemoveCategory = async (_id: string | undefined) => {
    try {
      const confirm = window.confirm("Are you sure to remove this item?")
      if (confirm) {
        await deleteCategory(_id)
        getAllItems()
        setCategories(categories.filter((item: ICategory) => item._id != _id))
      }
    } catch (error) {
      message.error(error.response.data.message)
    }
  }
  const onHandleAdd = async (obj: IProduct) => {
    const { data } = await addProduct(obj)
    const { message: msg, product } = data
    getAllItems()
    setProducts([product, ...products])
    message.success(msg)

  }
  const onHandleAddCategory = async (obj: ICategory) => {
    try {
      const { data: response } = await addCategory(obj)
      const { message: msg } = response
      message.success(msg)
      const { data } = await getAllCategory()
      setCategories(data)
    } catch (error) {
      message.error(error.response.data.message, 2)
    }
  }
  const onHandleUpdate = async (obj: IProduct) => {
    await updateProduct(obj)
    getAllItems()

  }
  const onHandleUpdateCategory = async (obj: ICategory) => {
    await updateCategory(obj)
    getAllItems()
  }

  useEffect(() => {
    getAllItems()
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WebsiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path='products'>
              <Route index element={<ProductsPage products={products} onRemove={onHandleRemove} />} />
              <Route path=':id' element={<ProductDetailPage />} />
            </Route>
            <Route path='sign-in' element={<SignIn />} />
            <Route path='sign-up' element={<SignUp />} />
          </Route>

          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='categories'>
              <Route index element={<CategoryManagement onRemove={onHandleRemoveCategory} categories={categories} />} />
              <Route path='add' element={<CategoryAdd onAdd={onHandleAddCategory} />} />
              <Route path=':id/update' element={<CategoryUpdate onUpdate={onHandleUpdateCategory} categories={categories} />} />
            </Route>
            <Route path='products'>
              <Route index element={<ProductsManagement categories={categories} onRemove={onHandleRemove} products={products} />} />
              <Route path='add' element={<ProductAdd onAdd={onHandleAdd} categories={categories} />} />
              <Route path=':id/update' element={<ProductUpdate onUpdate={onHandleUpdate} categories={categories} />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
