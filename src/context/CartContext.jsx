import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const [isAuthenticated, setIsAuth] = useState(false);
    const [showCart, setShowCart] = useState(false); 
    const toggleCart = () => setShowCart(prev => !prev); 

    useEffect(() => {
        fetch('/data/data.json')
            .then(respuesta => respuesta.json())
            .then(datos => {
                setTimeout(() => {
                    setProductos(datos);
                    setCargando(false);
                }, 2000);
            })
            .catch(error => {
                console.log('Error', error);
                setCargando(false);
                setError(true);
            });
    }, []);

    const handleAddToCart = (product) => {
        const productInCart = cart.find((item) => item.id === product.id);
        const cantidad = product.cantidad || 1;

        if (productInCart) {
            setCart(cart.map((item) =>
                item.id === product.id
                    ? {  ...item, cantidad: item.cantidad + cantidad }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, cantidad }]);
        }
    };

    const handleDeleteFromCart = (product) => {
        setCart(prevCart => {
            return prevCart
                .map(item => {
                    if (item.id === product.id) {
                        if (item.cantidad > 1) {
                            return { ...item, cantidad: item.cantidad - 1 };
                        } else {
                            return null;
                        }
                    }
                    return item;
                })
                .filter(item => item !== null);
        });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                productos,
                cargando,
                error,
                handleAddToCart,
                handleDeleteFromCart,
                isAuthenticated,
                setIsAuth,
                showCart,     // 👈 agregado al contexto
                toggleCart    // 👈 agregado al contexto
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
