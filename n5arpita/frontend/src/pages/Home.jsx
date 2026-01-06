import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import './Home.css';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await api.get('/products/featured');
                setFeaturedProducts(response.data);
            } catch (error) {
                console.error('Error fetching featured products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <h1 className="hero-title fade-in">
                        <span className="gradient-text">N5ARPITA</span>
                        <br />
                        Luxury in Every Drop
                    </h1>
                    <p className="hero-subtitle fade-in">
                        Experience the pinnacle of luxury cosmetics. Pure. Elegant. You.
                    </p>
                    <div className="hero-actions fade-in">
                        <Link to="/products" className="btn-primary">Explore Collection</Link>
                        <Link to="/about" className="btn-secondary">Our Story</Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="section featured-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Featured Collection</h2>
                        <p>Handpicked luxury essentials for your beauty ritual</p>
                        <div className="divider"></div>
                    </div>

                    {loading ? (
                        <div className="products-grid">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="product-card loading"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="products-grid">
                            {featuredProducts.map(product => (
                                <Link to={`/products/${product.id}`} key={product.id} className="product-card">
                                    <div className="product-image">
                                        <img
                                            src={product.imageUrl || product.images?.[0]?.imageUrl || 'https://via.placeholder.com/300'}
                                            alt={product.name}
                                        />
                                    </div>
                                    <div className="product-info">
                                        <h3>{product.name}</h3>
                                        <p className="product-description">{product.shortDescription}</p>
                                        <div className="product-footer">
                                            <span className="product-price gradient-text">₹{product.price}</span>
                                            {product.mrp && product.mrp > product.price && (
                                                <span className="product-mrp">₹{product.mrp}</span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    <div className="section-footer">
                        <Link to="/products" className="btn-secondary">View All Products</Link>
                    </div>
                </div>
            </section>

            {/* Why N5ARPITA */}
            <section className="section why-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Why N5ARPITA?</h2>
                        <div className="divider"></div>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">✨</div>
                            <h3>Premium Quality</h3>
                            <p>Only the finest ingredients, sourced globally for exceptional results</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🌿</div>
                            <h3>Skin-Friendly</h3>
                            <p>Dermatologically tested, safe for all skin types</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">👑</div>
                            <h3>Luxury Experience</h3>
                            <p>Elevate your beauty routine with premium cosmetics</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔬</div>
                            <h3>Science-Backed</h3>
                            <p>Formulated with advanced technology and proven results</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
