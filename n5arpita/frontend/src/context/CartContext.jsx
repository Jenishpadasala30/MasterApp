import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const fetchCart = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const response = await api.get('/cart');
            setCart(response.data);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart({ items: [] });
        }
    }, [user]);

    const addToCart = async (productId, quantity = 1) => {
        try {
            const response = await api.post('/cart/items', { productId, quantity });
            setCart(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const updateCartItem = async (productId, quantity) => {
        try {
            const response = await api.put(`/cart/items/${productId}?quantity=${quantity}`);
            setCart(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await api.delete(`/cart/items/${productId}`);
            setCart(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const clearCart = async () => {
        try {
            await api.delete('/cart');
            setCart({ items: [] });
        } catch (error) {
            throw error;
        }
    };

    const getCartTotal = () => {
        return cart.items?.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0) || 0;
    };

    const getCartCount = () => {
        return cart.items?.reduce((count, item) => count + item.quantity, 0) || 0;
    };

    return (
        <CartContext.Provider value={{
            cart,
            loading,
            addToCart,
            updateCartItem,
            removeFromCart,
            clearCart,
            fetchCart,
            getCartTotal,
            getCartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};
