import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
    const { cart, updateCartItem, removeFromCart, getCartTotal, loading } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="empty-cart">
                        <h2>Please Login</h2>
                        <p>You need to be logged in to view your cart</p>
                        <button className="btn-primary" onClick={() => navigate('/login')}>
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="loading-cart">Loading cart...</div>
                </div>
            </div>
        );
    }

    if (!cart.items || cart.items.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="empty-cart">
                        <h2>Your Cart is Empty</h2>
                        <p>Add some luxury products to get started</p>
                        <button className="btn-primary" onClick={() => navigate('/products')}>
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await updateCartItem(productId, newQuantity);
        } catch (error) {
            alert('Failed to update quantity');
        }
    };

    const handleRemove = async (productId) => {
        if (confirm('Remove this item from cart?')) {
            try {
                await removeFromCart(productId);
            } catch (error) {
                alert('Failed to remove item');
            }
        }
    };

    return (
        <div className="cart-page">
            <div className="container">
                <div className="page-header">
                    <h1>Shopping Cart</h1>
                    <p>{cart.items.length} item(s) in your cart</p>
                </div>

                <div className="cart-layout">
                    <div className="cart-items">
                        {cart.items.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-image">
                                    <img
                                        src={item.product.images?.[0]?.imageUrl || 'https://via.placeholder.com/150'}
                                        alt={item.product.name}
                                    />
                                </div>
                                <div className="cart-item-details">
                                    <h3>{item.product.name}</h3>
                                    <p className="cart-item-price gradient-text">₹{item.product.price}</p>
                                </div>
                                <div className="cart-item-actions">
                                    <div className="quantity-control">
                                        <button
                                            className="quantity-btn"
                                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                        >
                                            −
                                        </button>
                                        <span className="quantity-value">{item.quantity}</span>
                                        <button
                                            className="quantity-btn"
                                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => handleRemove(item.product.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                                <div className="cart-item-total">
                                    <p className="gradient-text">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{getCartTotal().toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>FREE</span>
                        </div>
                        <div className="divider"></div>
                        <div className="summary-row summary-total">
                            <span>Total</span>
                            <span className="gradient-text">₹{getCartTotal().toFixed(2)}</span>
                        </div>
                        <button className="btn-primary btn-block" onClick={() => navigate('/checkout')}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
