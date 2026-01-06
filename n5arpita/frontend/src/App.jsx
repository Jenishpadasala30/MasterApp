import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartProvider';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Orders from './pages/Orders';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <WishlistProvider>
                        <div className="app">
                            <Navbar />
                            <main className="main-content">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/products" element={<Products />} />
                                    <Route path="/products/:id" element={<ProductDetails />} />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/checkout" element={<Checkout />} />
                                    <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                                    <Route path="/wishlist" element={<Wishlist />} />
                                    <Route path="/about" element={<div className="page-placeholder"><div className="container"><h1>About N5ARPITA</h1><p>Coming soon...</p></div></div>} />
                                    <Route path="/account" element={<Orders />} />
                                    <Route path="/account/orders" element={<Orders />} />
                                    <Route path="/admin" element={<div className="page-placeholder"><div className="container"><h1>Admin Panel</h1><p>Coming soon...</p></div></div>} />
                                </Routes>
                            </main>
                            <footer className="footer">
                                <div className="container">
                                    <p>&copy; 2024 N5ARPITA. Pure. Elegant. You.</p>
                                </div>
                            </footer>
                        </div>
                    </WishlistProvider>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
