import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import SearchFilter from '../components/SearchFilter';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [sortBy, setSortBy] = useState('newest'); // Default sort
    const [categories, setCategories] = useState([]);
    const [searchMode, setSearchMode] = useState(false);
    const { addToCart } = useCart();
    const [addingToCart, setAddingToCart] = useState({});


    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [currentPage, sortBy]);

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            let url = `/products?page=${currentPage}& size=12`;

            if (sortBy === 'priceLowHigh') {
                url += '&sort=price,asc';
            } else if (sortBy === 'priceHighLow') {
                url += '&sort=price,desc';
            } else if (sortBy === 'newest') {
                url += '&sort=createdAt,desc';
            } else if (sortBy === 'name') {
                url += '&sort=name,asc';
            }

            const response = await api.get(url);
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (query) => {
        try {
            setLoading(true);
            setSearchMode(true);
            const response = await api.get(`/products/search?query=${query}& page=0 & size=12`);
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);
            setCurrentPage(0);
        } catch (error) {
            console.error('Error searching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = async (filters) => {
        try {
            setLoading(true);
            setSearchMode(true);
            let url = `/products/filter?page=0 & size=12`;
            if (filters.categoryId) url += `& categoryId=${filters.categoryId}`;
            if (filters.minPrice) url += `& minPrice=${filters.minPrice}`;
            if (filters.maxPrice) url += `& maxPrice=${filters.maxPrice}`;

            const response = await api.get(url);
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);
            setCurrentPage(0);
        } catch (error) {
            console.error('Error filtering products:', error);
        } finally {
            setLoading(false);
        }
    };

    const clearSearchFilter = () => {
        setSearchMode(false);
        setCurrentPage(0);
        fetchProducts();
    };

    const handleAddToCart = async (productId) => {
        try {
            setAddingToCart({ ...addingToCart, [productId]: true });
            await addToCart(productId, 1);
            alert('Added to cart!');
        } catch (error) {
            if (error.response?.status === 401) {
                alert('Please login to add items to cart');
            } else {
                alert('Failed to add to cart');
            }
        } finally {
            setAddingToCart({ ...addingToCart, [productId]: false });
        }
    };

    return (
        <div className="products-page">
            <div className="container">
                <h1>Luxury Products</h1>

                <SearchFilter
                    onSearch={handleSearch}
                    onFilter={handleFilter}
                    categories={categories}
                />

                <div className="products-controls">
                    <div className="products-count">
                        {searchMode && (
                            <button className="clear-filter-btn" onClick={clearSearchFilter}>
                                ✕ Clear Search/Filter
                            </button>
                        )}
                    </div>
                    <div className="sort-controls">
                        <label>Sort by:</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="featured">Featured</option>
                            <option value="newest">Newest</option>
                            <option value="priceLowHigh">Price: Low to High</option>
                            <option value="priceHighLow">Price: High to Low</option>
                            <option value="name">Name: A-Z</option>
                        </select>
                    </div>
                </div>
                <div className="page-header">
                    <h1>Our Collection</h1>
                    <p>Discover luxury cosmetics crafted for your beauty</p>
                    <div className="divider"></div>
                </div>

                {loading ? (
                    <div className="products-grid">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="product-card loading"></div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="products-grid">
                            {products.map(product => (
                                <div key={product.id} className="product-card">
                                    <Link to={`/products/${product.id}`} className="product-image">
                                        <img
                                            src={product.imageUrl || product.images?.[0]?.imageUrl || 'https://via.placeholder.com/300'}
                                            alt={product.name}
                                        />
                                        {product.featured && <span className="product-badge">Featured</span>}
                                    </Link>
                                    <div className="product-info">
                                        <Link to={`/products/${product.id}`}>
                                            <h3>{product.name}</h3>
                                        </Link>
                                        <p className="product-description">{product.shortDescription}</p>
                                        <div className="product-footer">
                                            <div className="product-pricing">
                                                <span className="product-price gradient-text">₹{product.price}</span>
                                                {product.mrp && product.mrp > product.price && (
                                                    <span className="product-mrp">₹{product.mrp}</span>
                                                )}
                                            </div>
                                            <button
                                                className="btn-primary btn-sm"
                                                onClick={() => handleAddToCart(product.id)}
                                                disabled={addingToCart[product.id]}
                                            >
                                                {addingToCart[product.id] ? 'Adding...' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    className="btn-secondary"
                                    onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                                    disabled={currentPage === 0}
                                >
                                    Previous
                                </button>
                                <span className="page-info">Page {currentPage + 1} of {totalPages}</span>
                                <button
                                    className="btn-secondary"
                                    onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                                    disabled={currentPage === totalPages - 1}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

