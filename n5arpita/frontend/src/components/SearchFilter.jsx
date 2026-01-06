import React, { useState, useEffect } from 'react';
import './SearchFilter.css';

const SearchFilter = ({ onSearch, onFilter, categories }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery);
        }
    };

    const handleFilterApply = () => {
        onFilter({
            categoryId: selectedCategory || null,
            minPrice: priceRange.min || null,
            maxPrice: priceRange.max || null
        });
    };

    const handleClearFilters = () => {
        setSelectedCategory('');
        setPriceRange({ min: '', max: '' });
        onFilter({ categoryId: null, minPrice: null, maxPrice: null });
    };

    return (
        <div className="search-filter-container">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="search-bar">
                <input
                    type="text"
                    placeholder="Search for luxury cosmetics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-btn">
                    🔍 Search
                </button>
            </form>

            {/* Filter Toggle */}
            <button
                className="filter-toggle-btn"
                onClick={() => setShowFilters(!showFilters)}
            >
                🎚️ Filters {showFilters ? '▲' : '▼'}
            </button>

            {/* Filters Panel */}
            {showFilters && (
                <div className="filters-panel">
                    <div className="filter-group">
                        <label>Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Price Range</label>
                        <div className="price-range-inputs">
                            <input
                                type="number"
                                placeholder="Min"
                                value={priceRange.min}
                                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                            />
                            <span>to</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={priceRange.max}
                                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="filter-actions">
                        <button className="btn-primary" onClick={handleFilterApply}>
                            Apply Filters
                        </button>
                        <button className="btn-secondary" onClick={handleClearFilters}>
                            Clear All
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchFilter;
