import { useContext } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Bienvenidos from './pages/Bienvenidos';
import NuestrosTours from './pages/NuestrosTours';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import DetallesProductos from './components/DetallesProductos';
import Login from './pages/Login';
import RutaProtegida from './auth/RutasProtegidas';
import { CartContext } from './context/CartContext';
import Cart from './components/Cart';
import {useAuth} from './context/AuthContext'



function App() {
  const { isAuthenticated } = useAuth();
  const { cart, productos, cargando, error, handleAddToCart, handleDeleteFromCart, showCart, toggleCart } = useContext(CartContext)
  

return (
    <>
      {/* Botón del carrito */}
      <button
        onClick={toggleCart}
        style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}
      >
        🛒 ({cart.reduce((acc, item) => acc + item.cantidad, 0)})
      </button>

      {/* Cart Drawer */}
      {showCart && (
        <Cart
          isOpen={showCart}
          onClose={toggleCart}
        />
      )}

      <Routes>
        <Route path='/' element={<Bienvenidos borrarProducto={handleDeleteFromCart} agregarCarrito={handleAddToCart} cart={cart} productos={productos} cargando={cargando} />} />

        <Route path='/nuestrostours' element={<NuestrosTours borrarProducto={handleDeleteFromCart} agregarCarrito={handleAddToCart} cart={cart} productos={productos} cargando={cargando} />} />
        
        <Route path='/productos/:id' element={<DetallesProductos productos={productos} />} />

        <Route path='/preguntasfrecuentes' element={<PreguntasFrecuentes borrarProducto={handleDeleteFromCart} cart={cart} cargando={cargando} />} />

        <Route path='/contacto' element={<Contacto borrarProducto={handleDeleteFromCart} cart={cart} cargando={cargando} />} />

        <Route path='/admin' element={<RutaProtegida isAuthenticated={isAuthenticated}> <Admin /> </RutaProtegida>} />

        <Route path='/login' element={<Login />} />

        <Route path='*' element={<NotFound />} />

      </Routes>
    </>
  )
}

export default App