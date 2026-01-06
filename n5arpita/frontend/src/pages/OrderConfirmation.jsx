import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    const fetchOrder = async () => {
        try {
            const response = await api.get(`/orders/${orderId}`);
            setOrder(response.data);
        } catch (error) {
            console.error('Error fetching order:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="confirmation-page">
                <div className="container">
                    <div className="loading">Loading order details...</div>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="confirmation-page">
                <div className="container">
                    <div className="error-message">
                        <h2>Order Not Found</h2>
                        <Link to="/" className="btn-primary">Return to Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="confirmation-page">
            <div className="container">
                <div className="confirmation-card">
                    <div className="success-icon">✓</div>
                    <h1 className="gradient-text">Order Placed Successfully!</h1>
                    <p className="confirmation-subtitle">
                        Thank you for your order. We'll send you a confirmation email shortly.
                    </p>

                    <div className="order-number">
                        <span>Order Number:</span>
                        <strong>{order.orderNumber}</strong>
                    </div>

                    <div className="order-details">
                        <div className="detail-section">
                            <h3>Order Summary</h3>
                            <div className="order-items">
                                {order.items?.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <div className="item-info">
                                            <span className="item-name">{item.productName}</span>
                                            <span className="item-quantity">Qty: {item.quantity}</span>
                                        </div>
                                        <span className="item-price gradient-text">₹{item.price.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="order-total">
                                <span>Total Amount:</span>
                                <span className="gradient-text">₹{order.total?.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="detail-section">
                            <h3>Delivery Address</h3>
                            <div className="address-details">
                                <p><strong>{order.shippingName}</strong></p>
                                <p>{order.shippingAddress}</p>
                                <p>{order.shippingCity}, {order.shippingState} - {order.shippingPincode}</p>
                                <p>Phone: {order.shippingPhone}</p>
                            </div>
                        </div>

                        <div className="detail-section">
                            <h3>Payment Information</h3>
                            <div className="payment-details">
                                <div className="detail-row">
                                    <span>Payment Method:</span>
                                    <span>{order.paymentStatus === 'PAID' ? 'Online Payment' : 'Cash on Delivery'}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Payment Status:</span>
                                    <span className={`status-badge ${order.paymentStatus?.toLowerCase()}`}>
                                        {order.paymentStatus}
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span>Order Status:</span>
                                    <span className={`status-badge ${order.orderStatus?.toLowerCase()}`}>
                                        {order.orderStatus}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="confirmation-actions">
                        <Link to="/account/orders" className="btn-secondary">View All Orders</Link>
                        <Link to="/products" className="btn-primary">Continue Shopping</Link>
                    </div>

                    <div className="help-section">
                        <p>Need help with your order?</p>
                        <p>Contact us at <a href="mailto:support@n5arpita.com">support@n5arpita.com</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
