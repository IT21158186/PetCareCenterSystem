import { AuthProvider } from './pages/common/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/common/Login'
import Signup from './pages/common/Signup'
import NotFound from './pages/common/NotFound'
import Dashboard from './pages/common/Dashboard';
import Guest from './pages/guest/Guest';
import CustomerCart from './pages/customer/Cart';
import Home from './pages/admin/Home';
import StoreItems from './pages/store/Items';
import ItemPage from './pages/store/ItemPage';
import Checkout from './pages/customer/Checkout';
import Orders from './pages/customer/Orders';


export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} />
      <AuthProvider>

        <Routes>

          {/*Common Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<NotFound />} />


          {/* Inside dashboard layout */}
          <Route path='/' element={<Dashboard />}>
            <Route path='' element={<Guest />} />

            <Route path='items' element={<StoreItems />} />
            <Route path='itempage' element={<ItemPage />} />


            {/*Admin Routes */}
            <Route path='home' element={<Home />} />
            <Route path='admin' element={<Home />} />



            {/*Customer Routes */}
            <Route path='cart' element={<CustomerCart />} />
            <Route path='store' element={<StoreItems />} />
            <Route path='itempage/:id' element={<ItemPage />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='transactions' element={<Orders />} />

          </Route>
        </Routes>
        {/* <StickyFooter /> */}
      </AuthProvider>
    </BrowserRouter>
  )
}