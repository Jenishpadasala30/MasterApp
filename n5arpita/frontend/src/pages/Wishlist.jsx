import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Wishlist.css';

const Wishlist = () => {
    const { wishlist, fetchWishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchWishlist();
        }
    }, [user]);

    const handleRemove = async (productId) => {
        try {
            await removeFromWishlist(productId);
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    const handleMoveToCart = async (product) => {
        try {
            await addToCart(product.id, 1);
            await removeFromWishlist(product.id);
            alert('Moved to cart!');
        } catch (error) {
            console.error('Error moving to cart:', error);
        }
    };

    if (!user) {
        return (
            <div className="wishlist-page">
                <div className="container">
                    <div className="empty-state">
                        <h2>Please Login</h2>
                        <p>Login to view your wishlist</p>
                        <Link to="/login" className="btn-primary">Login</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <div className="container">
                <h1>My Wishlist</h1>

                {wishlist.length === 0 ? (
                    <div className="empty-state">
                        <h2>❤️ Your Wishlist is Empty</h2>
                        <p>Save your favorite products here</p>
                        <Link to="/products" className="btn-primary">Browse Products</Link>
                    </div>
                ) : (
                    <div className="wishlist-grid">
                        {wishlist.map(product => (
                            <div key={product.id} className="wishlist-card">
                                <button
                                    className="remove-btn"
                                    onClick={() => handleRemove(product.id)}
                                    title="Remove from wishlist"
                                >
                                    ✕
                                </button>

                                <Link to={`/products/${product.id}`} className="product-image">
                                    <img
                                        src={product.imageUrl || product.images?.[0]?.imageUrl || 'https://via.placeholder.com/300'}
                                        alt={product.name}
                                    />
                                </Link>

                                <div className="product-info">
                                    <Link to={`/products/${product.id}`}>
                                        <h3>{product.name}</h3>
                                    </Link>
                                    <p className="product-description">{product.shortDescription}</p>

                                    <div className="price-section">
                                        <span className="current-price gradient-text">₹{product.price?.toFixed(2)}</span>
                                        {product.mrp && product.mrp > product.price && (
                                            <span className="original-price">₹{product.mrp?.toFixed(2)}</span>
                                        )}
                                    </div>

                                    <div className="wishlist-actions">
                                        <button
                                            className="btn-primary"
                                            onClick={() => handleMoveToCart(product)}
                                        >
                                            Move to Cart
                                        </button>
                                        <Link to={`/products/${product.id}`} className="btn-secondary">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
