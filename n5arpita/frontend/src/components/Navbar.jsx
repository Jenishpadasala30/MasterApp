```javascript
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const { cart } = useCart();
    const { wishlist } = useWishlist();

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-brand">
                        <h1 className="gradient-text">N5ARPITA</h1>
                        <p className="navbar-tagline">Luxury in Every Drop</p>
                    </Link>

                    <div className="navbar-links">
                        <Link to="/">Home</Link>
                        <Link to="/products">Products</Link>
                        <Link to="/about">About</Link>

                        {user && (
                            <>
                                <Link to="/wishlist" className="wishlist-link">
                                    ❤️ Wishlist
                                    {wishlist.length > 0 && (
                                        <span className="wishlist-badge">{wishlist.length}</span>
                                    )}
                                </Link>
                                <Link to="/cart" className="cart-link">
                                    🛒 Cart
                                    {getCartCount() > 0 && (
                                        <span className="cart-badge">{getCartCount()}</span>
                                    )}
                                </Link>
                                <Link to="/account">Account</Link>
                                {isAdmin() && <Link to="/admin">Admin</Link>}
                                <button onClick={logout} className="btn-ghost">Logout</button>
                            </>
                        )}

                        {!user && (
                            <>
                                <Link to="/login" className="btn-ghost">Login</Link>
                                <Link to="/register" className="btn-primary">Get Started</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
