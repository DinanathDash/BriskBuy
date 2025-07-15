import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../../components/ui/alert-dialog';
import { useAuth } from '../../Contexts/AuthContext';
import { getUserOrders, cancelOrder, getAllOrdersDebug } from '../../Firebase/orders';
import { Package, Calendar, CreditCard, Truck, X } from 'lucide-react';
import { toast } from 'sonner';
import OrbLoader from '../../components/ui/OrbLoader';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingOrder, setCancellingOrder] = useState(null);
    const { currentUser } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message);
        }
        if (currentUser) {
            loadOrders();
        }
    }, [currentUser]);

    const loadOrders = async () => {
        if (!currentUser) {
            console.error('No current user found');
            setLoading(false);
            return;
        }

        try {
            console.log('Loading orders for user:', currentUser.uid);
            const { orders: userOrders, error } = await getUserOrders(currentUser.uid);
            if (!error) {
                console.log('Orders loaded:', userOrders);
                setOrders(userOrders);
            } else {
                console.error('Error loading orders:', error);
                toast.error('Failed to load orders');
            }
        } catch (error) {
            console.error('Exception loading orders:', error);
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async (orderId) => {
        setCancellingOrder(orderId);
        try {
            const { success, error } = await cancelOrder(orderId);
            if (success) {
                toast.success('Order cancelled successfully! Stock has been restored.');
                // Refresh orders list
                loadOrders();
            } else {
                toast.error(`Failed to cancel order: ${error}`);
            }
        } catch (error) {
            toast.error('Failed to cancel order');
        } finally {
            setCancellingOrder(null);
        }
    };

    // Helper function to check if order can be cancelled
    const canCancelOrder = (order) => {
        return order.status === 'pending' || order.status === 'confirmed';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            case 'delivered':
                return 'bg-purple-100 text-purple-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'paid':
                return <CreditCard className="h-4 w-4" />;
            case 'pending':
                return <Package className="h-4 w-4" />;
            case 'shipped':
                return <Truck className="h-4 w-4" />;
            case 'cancelled':
                return <X className="h-4 w-4" />;
            default:
                return <Package className="h-4 w-4" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <OrbLoader size={200} />
            </div>
        );
    }

    return (
        <Container maxWidth="lg" className="py-8">
            <Typography variant="h4" component="h1" className="font-bold mb-8">
                My Orders
            </Typography>

            {orders.length === 0 ? (
                <div className="text-center py-16">
                    <Package className="h-24 w-24 mx-auto text-gray-400 mb-6" />
                    <Typography variant="h5" className="font-bold mb-4">No orders yet</Typography>
                    <Typography variant="body1" className="text-gray-600 mb-8">
                        When you place an order, it will appear here.
                    </Typography>
                    {currentUser && (
                        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                            <Typography variant="body2" className="text-gray-600">
                                Debug Info: User ID: {currentUser.uid}
                            </Typography>
                            <Button
                                onClick={() => loadOrders()}
                                className="mt-2 mr-2"
                                variant="outline"
                            >
                                Refresh Orders
                            </Button>
                            <Button
                                onClick={async () => {
                                    const result = await getAllOrdersDebug();
                                    console.log('Debug result:', result);
                                }}
                                className="mt-2"
                                variant="outline"
                            >
                                Debug: Show All Orders
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-6 mt-6">
                    {orders.map((order) => (
                        <Card key={order.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Typography variant="h6" className="font-semibold">
                                            Order #{order.id}
                                        </Typography>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Package className="h-4 w-4" />
                                                {order.itemCount} item{order.itemCount !== 1 ? 's' : ''}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Typography variant="h6" className="font-bold">
                                            ${order.total}
                                        </Typography>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Badge className={`${getStatusColor(order.status)}`}>
                                                <div className="flex items-center gap-1">
                                                    {getStatusIcon(order.status)}
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </div>
                                            </Badge>
                                            {canCancelOrder(order) && (
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            disabled={cancellingOrder === order.id}
                                                        >
                                                            {cancellingOrder === order.id ? 'Cancelling...' : 'Cancel'}
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to cancel this order? This action cannot be undone.
                                                                The items will be returned to stock.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Keep Order</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleCancelOrder(order.id)}
                                                                className="bg-red-600 hover:bg-red-700"
                                                            >
                                                                Cancel Order
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent>
                                {/* Order Items */}
                                <div className="space-y-3 mb-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex gap-3">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                            <div className="flex-1">
                                                <Typography variant="body1" className="font-medium">
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="body2" className="text-gray-600">
                                                    Qty: {item.quantity} • ${item.price}
                                                    {item.selectedSize && ` • Size: ${item.selectedSize}`}
                                                    {item.selectedColor && ` • Color: ${item.selectedColor}`}
                                                </Typography>
                                            </div>
                                            <div className="text-right">
                                                <Typography variant="body1" className="font-medium">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </Typography>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Delivery Info */}
                                <div className="border-t pt-4">
                                    <Typography variant="h6" className="font-semibold mb-2">
                                        Delivery Information
                                    </Typography>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <Typography variant="body2" className="font-medium">
                                                {order.deliveryInfo.fullName}
                                            </Typography>
                                            <Typography variant="body2" className="text-gray-600">
                                                {order.deliveryInfo.email}
                                            </Typography>
                                            <Typography variant="body2" className="text-gray-600">
                                                {order.deliveryInfo.phone}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant="body2" className="text-gray-600">
                                                {order.deliveryInfo.address}
                                            </Typography>
                                            <Typography variant="body2" className="text-gray-600">
                                                {order.deliveryInfo.city}, {order.deliveryInfo.zipCode}
                                            </Typography>
                                            {order.deliveryInfo.country && (
                                                <Typography variant="body2" className="text-gray-600">
                                                    {order.deliveryInfo.country}
                                                </Typography>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Info */}
                                <div className="border-t pt-4 mt-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <Typography variant="body2" className="text-gray-600">
                                                Payment Method: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                                            </Typography>
                                            <Typography variant="body2" className="text-gray-600">
                                                Payment Status: {order.paymentStatus || order.status}
                                            </Typography>
                                        </div>
                                        <div className="text-right">
                                            <Typography variant="body2" className="text-gray-600">
                                                Subtotal: ${order.subtotal}
                                            </Typography>
                                            {order.discount > 0 && (
                                                <Typography variant="body2" className="text-green-600">
                                                    Discount: -${order.discount}
                                                </Typography>
                                            )}
                                            <Typography variant="body1" className="font-bold">
                                                Total: ${order.total}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>

                                {/* Cancel Order Button */}
                                {canCancelOrder(order) && (
                                    <div className="mt-4">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="outlined" color="error">
                                                    Cancel Order
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to cancel this order? This action cannot be undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Never mind</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleCancelOrder(order.id)}
                                                        disabled={cancellingOrder === order.id}
                                                    >
                                                        {cancellingOrder === order.id ? 'Cancelling...' : 'Yes, cancel it'}
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </Container>
    );
};

export default Orders;
