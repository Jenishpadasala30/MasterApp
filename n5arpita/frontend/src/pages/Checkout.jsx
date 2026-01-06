import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import './Checkout.css';

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [processing, setProcessing] = useState(false);

    const [newAddress, setNewAddress] = useState({
        fullName: user?.name || '',
        phoneNumber: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: false
    });

    useEffect(() => {
        if (user) {
            fetchAddresses();
        }
    }, [user]);

    const fetchAddresses = async () => {
        try {
            const response = await api.get('/addresses');
            setAddresses(response.data);
            const defaultAddr = response.data.find(addr => addr.isDefault);
            if (defaultAddr) {
                setSelectedAddress(defaultAddr.id);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/addresses', newAddress);
            setAddresses([...addresses, response.data]);
            setSelectedAddress(response.data.id);
            setShowAddressForm(false);
            setNewAddress({
                fullName: user?.name || '',
                phoneNumber: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                pincode: '',
                isDefault: false
            });
        } catch (error) {
            alert('Failed to save address');
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            alert('Please select a delivery address');
            return;
        }

        if (cart.items?.length === 0) {
            alert('Your cart is empty');
            return;
        }

        setProcessing(true);

        try {
            // Create order
            const orderData = {
                addressId: selectedAddress,
                notes: ''
            };

            const orderResponse = await api.post('/orders', orderData);
            const order = orderResponse.data;

            if (paymentMethod === 'razorpay') {
                // Initialize Razorpay payment
                const options = {
                    key: 'YOUR_RAZORPAY_KEY', // Replace with actual Razorpay key
                    amount: order.total * 100, // Amount in paise
                    currency: 'INR',
                    name: 'N5ARPITA',
                    description: `Order #${order.orderNumber}`,
                    order_id: order.paymentId,
                    handler: async function (response) {
                        // Payment successful
                        try {
                            await api.put(`/admin/orders/${order.id}/payment`, null, {
                                params: {
                                    status: 'PAID',
                                    paymentId: response.razorpay_payment_id
                                }
                            });

                            clearCart();
                            navigate(`/order-confirmation/${order.id}`);
                        } catch (error) {
                            alert('Payment verification failed');
                        }
                    },
                    prefill: {
                        name: user.name,
                        email: user.email
                    },
                    theme: {
                        color: '#d4af37'
                    }
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            } else {
                // Cash on Delivery
                clearCart();
                navigate(`/order-confirmation/${order.id}`);
            }
        } catch (error) {
            console.error('Order placement failed:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    if (!user) {
        return (
            <div className="checkout-page">
                <div className="container">
                    <div className="checkout-error">
                        <h2>Please Login</h2>
                        <p>You need to be logged in to checkout</p>
                        <button className="btn-primary" onClick={() => navigate('/login')}>
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <h1 className="checkout-title">Checkout</h1>

                <div className="checkout-layout">
                    {/* Left Column - Address & Payment */}
                    <div className="checkout-main">
                        {/* Delivery Address Section */}
                        <div className="checkout-section">
                            <div className="section-header">
                                <h2>1. Delivery Address</h2>
                                <button
                                    className="btn-ghost"
                                    onClick={() => setShowAddressForm(!showAddressForm)}
                                >
                                    + Add New Address
                                </button>
                            </div>

                            {showAddressForm && (
                                <form className="address-form card" onSubmit={handleAddressSubmit}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Full Name *</label>
                                            <input
                                                type="text"
                                                value={newAddress.fullName}
                                                onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone Number *</label>
                                            <input
                                                type="tel"
                                                value={newAddress.phoneNumber}
                                                onChange={(e) => setNewAddress({ ...newAddress, phoneNumber: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Address Line 1 *</label>
                                        <input
                                            type="text"
                                            value={newAddress.addressLine1}
                                            onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                                            placeholder="House No., Building Name"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Address Line 2</label>
                                        <input
                                            type="text"
                                            value={newAddress.addressLine2}
                                            onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                                            placeholder="Road name, Area, Colony"
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>City *</label>
                                            <input
                                                type="text"
                                                value={newAddress.city}
                                                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>State *</label>
                                            <input
                                                type="text"
                                                value={newAddress.state}
                                                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Pincode *</label>
                                            <input
                                                type="text"
                                                value={newAddress.pincode}
                                                onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                                pattern="[0-9]{6}"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="checkbox-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={newAddress.isDefault}
                                                onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                                            />
                                            Set as default address
                                        </label>
                                    </div>

                                    <div className="form-actions">
                                        <button type="submit" className="btn-primary">Save Address</button>
                                        <button
                                            type="button"
                                            className="btn-secondary"
                                            onClick={() => setShowAddressForm(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}

                            <div className="address-list">
                                {addresses.map(address => (
                                    <div
                                        key={address.id}
                                        className={`address-card ${selectedAddress === address.id ? 'selected' : ''}`}
                                        onClick={() => setSelectedAddress(address.id)}
                                    >
                                        <input
                                            type="radio"
                                            name="address"
                                            checked={selectedAddress === address.id}
                                            onChange={() => setSelectedAddress(address.id)}
                                        />
                                        <div className="address-content">
                                            <h4>{address.fullName}</h4>
                                            <p>{address.addressLine1}</p>
                                            {address.addressLine2 && <p>{address.addressLine2}</p>}
                                            <p>{address.city}, {address.state} - {address.pincode}</p>
                                            <p className="address-phone">Phone: {address.phoneNumber}</p>
                                            {address.isDefault && <span className="default-badge">Default</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {addresses.length === 0 && !showAddressForm && (
                                <div className="empty-state">
                                    <p>No addresses found. Please add a delivery address.</p>
                                </div>
                            )}
                        </div>

                        {/* Payment Method Section */}
                        <div className="checkout-section">
                            <h2>2. Payment Method</h2>

                            <div className="payment-methods">
                                <div
                                    className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                                    onClick={() => setPaymentMethod('cod')}
                                >
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <div className="payment-content">
                                        <h4>💵 Cash on Delivery</h4>
                                        <p>Pay when you receive the product</p>
                                    </div>
                                </div>

                                <div
                                    className={`payment-option ${paymentMethod === 'razorpay' ? 'selected' : ''}`}
                                    onClick={() => setPaymentMethod('razorpay')}
                                >
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="razorpay"
                                        checked={paymentMethod === 'razorpay'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <div className="payment-content">
                                        <h4>💳 Online Payment</h4>
                                        <p>Credit/Debit Card, UPI, Net Banking</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="checkout-summary">
                        <div className="summary-card sticky">
                            <h3>Order Summary</h3>

                            <div className="summary-items">
                                {cart.items?.map(item => (
                                    <div key={item.id} className="summary-item">
                                        <span>{item.product.name} × {item.quantity}</span>
                                        <span className="gradient-text">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="divider"></div>

                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{getCartTotal().toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span className="gradient-text">FREE</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span className="gradient-text">₹{getCartTotal().toFixed(2)}</span>
                            </div>

                            <button
                                className="btn-primary btn-block"
                                onClick={handlePlaceOrder}
                                disabled={processing || !selectedAddress}
                            >
                                {processing ? 'Processing...' : 'Place Order'}
                            </button>

                            <div className="secure-badge">
                                <span>🔒</span>
                                <p>Your transaction is secure and encrypted</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
