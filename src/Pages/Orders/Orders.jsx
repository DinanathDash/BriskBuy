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
        <Container maxWidth="lg" className="py-4 sm:py-8 px-2 sm:px-4 lg:px-6">
            <Typography variant="h4" component="h1" className="font-bold mb-4 sm:mb-6 lg:mb-8 text-lg sm:text-xl md:text-2xl lg:text-3xl text-center sm:text-left">
                My Orders
            </Typography>

            {orders.length === 0 ? (
                <div className="text-center py-8 sm:py-16 px-4">
                    <Package className="h-16 w-16 sm:h-24 sm:w-24 mx-auto text-gray-400 mb-4 sm:mb-6" />
                    <Typography variant="h5" className="font-bold mb-2 sm:mb-4 text-lg sm:text-xl">No orders yet</Typography>
                    <Typography variant="body1" className="text-gray-600 mb-4 sm:mb-8 text-sm sm:text-base">
                        When you place an order, it will appear here.
                    </Typography>
                    {currentUser && (
                        <div className="mt-4 p-3 sm:p-4 bg-gray-100 rounded-lg max-w-md mx-auto">
                            <Typography variant="body2" className="text-gray-600 text-xs sm:text-sm break-all">
                                Debug Info: User ID: {currentUser.uid}
                            </Typography>
                            <div className="flex flex-col sm:flex-row gap-2 mt-2">
                                <Button
                                    onClick={() => loadOrders()}
                                    className="flex-1"
                                    variant="outline"
                                    size="sm"
                                >
                                    Refresh Orders
                                </Button>
                                <Button
                                    onClick={async () => {
                                        const result = await getAllOrdersDebug();
                                        console.log('Debug result:', result);
                                    }}
                                    className="flex-1"
                                    variant="outline"
                                    size="sm"
                                >
                                    Debug: Show All Orders
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
                    {orders.map((order) => (
                        <Card key={order.id} className="overflow-hidden">
                            <CardHeader className="pb-3 sm:pb-4">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
                                    <div className="flex-1">
                                        <Typography variant="h6" className="font-semibold text-sm sm:text-base lg:text-lg">
                                            Order #{order.id}
                                        </Typography>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                                <span className="whitespace-nowrap">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Package className="h-3 w-3 sm:h-4 sm:w-4" />
                                                <span>
                                                    {order.itemCount} item{order.itemCount !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <Typography variant="h6" className="font-bold text-sm sm:text-base lg:text-lg">
                                            ${order.total}
                                        </Typography>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                                            <Badge className={`${getStatusColor(order.status)} w-fit`}>
                                                <div className="flex items-center gap-1">
                                                    {getStatusIcon(order.status)}
                                                    <span className="text-xs sm:text-sm">
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </span>
                                                </div>
                                            </Badge>
                                            {canCancelOrder(order) && (
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="text-xs sm:text-sm"
                                                            disabled={cancellingOrder === order.id}
                                                        >
                                                            {cancellingOrder === order.id ? 'Cancelling...' : 'Cancel'}
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className="mx-4 max-w-md">
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to cancel this order? This action cannot be undone.
                                                                The items will be returned to stock.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                                                            <AlertDialogCancel className="w-full sm:w-auto">Keep Order</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleCancelOrder(order.id)}
                                                                className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
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

                            <CardContent className="pt-0">
                                {/* Order Items */}
                                <div className="space-y-3 mb-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex gap-2 sm:gap-3">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md flex-shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <Typography variant="body1" className="font-medium text-sm sm:text-base truncate">
                                                    {item.name}
                                                </Typography>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                                    <Typography variant="body2" className="text-gray-600 text-xs sm:text-sm">
                                                        Qty: {item.quantity} • ${item.price}
                                                    </Typography>
                                                    {(item.selectedSize || item.selectedColor) && (
                                                        <Typography variant="body2" className="text-gray-600 text-xs sm:text-sm">
                                                            {item.selectedSize && `Size: ${item.selectedSize}`}
                                                            {item.selectedSize && item.selectedColor && ' • '}
                                                            {item.selectedColor && `Color: ${item.selectedColor}`}
                                                        </Typography>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <Typography variant="body1" className="font-medium text-sm sm:text-base">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </Typography>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Delivery Info */}
                                <div className="border-t pt-4">
                                    <Typography variant="h6" className="font-semibold mb-2 text-sm sm:text-base">
                                        Delivery Information
                                    </Typography>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                                        <div>
                                            <Typography variant="body2" className="font-medium text-xs sm:text-sm">
                                                {order.deliveryInfo.fullName}
                                            </Typography>
                                            <Typography variant="body2" className="text-gray-600 text-xs sm:text-sm break-all">
                                                {order.deliveryInfo.email}
                                            </Typography>
                                            <Typography variant="body2" className="text-gray-600 text-xs sm:text-sm">
                                                {order.deliveryInfo.phone}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant="body2" className="text-gray-600 text-xs sm:text-sm">
                                                {order.deliveryInfo.address}
                                            </Typography>
                                            <Typography variant="body2" className="text-gray-600 text-xs sm:text-sm">
                                                {order.deliveryInfo.city}, {order.deliveryInfo.zipCode}
                                            </Typography>
                                            {order.deliveryInfo.country && (
                                                <Typography variant="body2" className="text-gray-600 text-xs sm:text-sm">
                                                    {order.deliveryInfo.country}
                                                </Typography>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Info */}
                                <div className="border-t pt-4 mt-4">
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-4">
                                        <div className="space-y-1">
                                            <Typography variant="body2" className="text-gray-600 text-xs sm:text-sm">
                                                Payment Method: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                                            </Typography>
                                            <Typography variant="body2" className="text-gray-600 text-xs sm:text-sm">
                                                Payment Status: {order.paymentStatus || order.status}
                                            </Typography>
                                        </div>
                                        <div className="text-left sm:text-right space-y-1">
                                            <Typography variant="body2" className="text-gray-600 text-xs sm:text-sm">
                                                Subtotal: ${order.subtotal}
                                            </Typography>
                                            {order.discount > 0 && (
                                                <Typography variant="body2" className="text-green-600 text-xs sm:text-sm">
                                                    Discount: -${order.discount}
                                                </Typography>
                                            )}
                                            <Typography variant="body1" className="font-bold text-sm sm:text-base">
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
                                                <Button variant="outline" className="w-full sm:w-auto text-red-600 border-red-600 hover:bg-red-50">
                                                    Cancel Order
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="mx-4 max-w-md">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to cancel this order? This action cannot be undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                                                    <AlertDialogCancel className="w-full sm:w-auto">Never mind</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleCancelOrder(order.id)}
                                                        disabled={cancellingOrder === order.id}
                                                        className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
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
