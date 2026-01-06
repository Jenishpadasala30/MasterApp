import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const [wishlistIds, setWishlistIds] = useState(new Set());

    const fetchWishlist = async () => {
        try {
            const response = await api.get('/wishlist');
            setWishlist(response.data);
            setWishlistIds(new Set(response.data.map(p => p.id)));
        } catch (error) {
            // User not logged in or error fetching
            setWishlist([]);
            setWishlistIds(new Set());
        }
    };

    const addToWishlist = async (productId) => {
        try {
            await api.post(`/wishlist/${productId}`);
            await fetchWishlist();
        } catch (error) {
            throw error;
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            await api.delete(`/wishlist/${productId}`);
            await fetchWishlist();
        } catch (error) {
            throw error;
        }
    };

    const isInWishlist = (productId) => {
        return wishlistIds.has(productId);
    };

    const toggleWishlist = async (productId) => {
        if (isInWishlist(productId)) {
            await removeFromWishlist(productId);
        } else {
            await addToWishlist(productId);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const value = {
        wishlist,
        wishlistIds,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};
