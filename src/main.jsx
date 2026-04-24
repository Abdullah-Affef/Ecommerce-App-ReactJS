import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router'
import RootLayout from './layouts/PrimaryLayout'
import Home from './pages/Home'
import {Provider} from 'react-redux'
import Store from './redux/Store'
import ProductDetails from './pages/ProductDetails'
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/Wishlist.jsx"
import Shop from "./pages/Shop.jsx"

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {index: true, Component: Home},
            {path: 'Shop', Component: Shop},
            {path: "product-details/:id", Component: ProductDetails},
            {path: "/cart", Component: Cart},
            {path: "/wishlist", Component: Wishlist},
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
        <RouterProvider router={router}/>
    </Provider>
)
