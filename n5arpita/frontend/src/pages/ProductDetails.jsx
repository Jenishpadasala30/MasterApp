import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await api.get(`/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!user) {
            alert('Please login to add items to cart');
            navigate('/login');
            return;
        }

        try {
            setAddingToCart(true);
            await addToCart(product.id, quantity);
            alert('Added to cart!');
        } catch (error) {
            alert('Failed to add to cart');
        } finally {
            setAddingToCart(false);
        }
    };

    const handleBuyNow = async () => {
        if (!user) {
            alert('Please login to continue');
            navigate('/login');
            return;
        }

        try {
            setAddingToCart(true);
            await addToCart(product.id, quantity);
            navigate('/checkout');
        } catch (error) {
            alert('Failed to proceed');
        } finally {
            setAddingToCart(false);
        }
    };

    if (loading) {
        return (
            <div className="product-details-page">
                <div className="container">
                    <div className="loading">Loading product...</div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-details-page">
                <div className="container">
                    <div className="error-message">Product not found</div>
                </div>
            </div>
        );
    }

    return (
        <div className="product-details-page">
            <div className="container">
                <div className="product-details-layout">
                    {/* Product Images */}
                    <div className="product-images">
                        <div className="main-image">
                            <img
                                src={product.imageUrl || product.images?.[0]?.imageUrl || 'https://via.placeholder.com/500'}
                                alt={product.name}
                            />
                        </div>
                        {product.images && product.images.length > 1 && (
                            <div className="thumbnail-images">
                                {product.images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img.imageUrl}
                                        alt={`${product.name} ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="product-info-detailed">
                        <h1>{product.name}</h1>

                        {product.shortDescription && (
                            <p className="product-subtitle">{product.shortDescription}</p>
                        )}

                        <div className="product-rating">
                            <span className="stars">★★★★★</span>
                            <span className="rating-text">
                                {product.averageRating?.toFixed(1) || '5.0'} ({product.reviewCount || 0} reviews)
                            </span>
                        </div>

                        <div className="product-pricing-detail">
                            <span className="current-price gradient-text">₹{product.price?.toFixed(2)}</span>
                            {product.mrp && product.mrp > product.price && (
                                <>
                                    <span className="original-price">₹{product.mrp?.toFixed(2)}</span>
                                    <span className="discount-badge">
                                        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        <div className="product-stock">
                            {product.stockQuantity > 0 ? (
                                <span className="in-stock">✓ In Stock ({product.stockQuantity} available)</span>
                            ) : (
                                <span className="out-of-stock">Out of Stock</span>
                            )}
                        </div>

                        {/* Quantity Selector */}
                        <div className="quantity-selector">
                            <label>Quantity:</label>
                            <div className="quantity-controls">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={addingToCart}
                                >
                                    −
                                </button>
                                <span>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                                    disabled={addingToCart || quantity >= product.stockQuantity}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="product-actions">
                            <button
                                className="btn-primary btn-block"
                                onClick={handleAddToCart}
                                disabled={addingToCart || product.stockQuantity === 0}
                            >
                                {addingToCart ? 'Adding...' : '🛒 Add to Cart'}
                            </button>
                            <button
                                className="btn-secondary btn-block"
                                onClick={handleBuyNow}
                                disabled={addingToCart || product.stockQuantity === 0}
                            >
                                ⚡ Buy Now
                            </button>
                        </div>

                        {/* Product Details Tabs */}
                        <div className="product-tabs">
                            <div className="tab-content">
                                <h3>Product Description</h3>
                                <p>{product.description || product.shortDescription}</p>

                                {product.ingredients && (
                                    <>
                                        <h3>Ingredients</h3>
                                        <p>{product.ingredients}</p>
                                    </>
                                )}

                                {product.usage && (
                                    <>
                                        <h3>How to Use</h3>
                                        <p>{product.usage}</p>
                                    </>
                                )}

                                {product.benefits && (
                                    <>
                                        <h3>Benefits</h3>
                                        <p>{product.benefits}</p>
                                    </>
                                )}

                                {product.size && (
                                    <div className="product-specs">
                                        <h3>Specifications</h3>
                                        <ul>
                                            <li><strong>Size:</strong> {product.size}</li>
                                            <li><strong>SKU:</strong> {product.sku}</li>
                                            {product.category && (
                                                <li><strong>Category:</strong> {product.category.name}</li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
