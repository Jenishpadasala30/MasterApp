import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import './Orders.css';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            const response = await api.get('/orders/my');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="orders-page">
                <div className="container">
                    <div className="empty-state">
                        <h2>Please Login</h2>
                        <p>You need to be logged in to view your orders</p>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="orders-page">
                <div className="container">
                    <div className="loading">Loading orders...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <div className="container">
                <h1>My Orders</h1>

                {orders.length === 0 ? (
                    <div className="empty-state">
                        <h2>No Orders Yet</h2>
                        <p>Start shopping to see your orders here</p>
                        <Link to="/products" className="btn-primary">Browse Products</Link>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map(order => (
                            <div key={order.id} className="order-card">
                                <div className="order-header">
                                    <div className="order-info">
                                        <h3>Order #{order.orderNumber}</h3>
                                        <p className="order-date">
                                            Placed on {new Date(order.orderDate).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div className="order-status">
                                        <span className={`status-badge ${order.orderStatus?.toLowerCase()}`}>
                                            {order.orderStatus}
                                        </span>
                                        <span className={`status-badge ${order.paymentStatus?.toLowerCase()}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </div>
                                </div>

                                <div className="order-items">
                                    {order.items?.map((item, index) => (
                                        <div key={index} className="order-item">
                                            <div className="item-details">
                                                <span className="item-name">{item.productName}</span>
                                                <span className="item-quantity">Qty: {item.quantity}</span>
                                            </div>
                                            <span className="item-price gradient-text">₹{item.price.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="order-footer">
                                    <div className="order-total">
                                        <span>Total:</span>
                                        <span className="gradient-text">₹{order.total.toFixed(2)}</span>
                                    </div>
                                    <Link to={`/order-confirmation/${order.id}`} className="btn-secondary btn-sm">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
