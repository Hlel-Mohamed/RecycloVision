import { useState, useEffect } from 'react';
import OrderService from '../services/order';
import { toast } from 'react-hot-toast';

type Order = {
    id: string;
    items: { productId: string; quantity: number; price: number; coins: number }[];
    totalAmount: number;
    totalCoins: number;
    user: {
        firstName: string;
        lastName: string;
    };
    status: string;
};

function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchOrders = async () => {
        try {
            const response = await OrderService.getAllOrders();
            setOrders(response);
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Failed to fetch orders. Please try again later.');
        }
    };

    const validateOrder = async (id: string) => {
        try {
            const response = await OrderService.validate(id);
            if (response.message === 'Order validated') {
                toast.success('Order validated successfully.');
                await fetchOrders();
            } else {
                toast.error('Failed to validate order.');
            }
        } catch (error) {
            console.error('Error validating order:', error);
            toast.error('Failed to validate order.');
        }
    };

    const cancelOrder = async (id: string) => {
        try {
            const response = await OrderService.cancel(id);
            if (response.message === 'Order canceled') {
                toast.success('Order canceled successfully.');
                await fetchOrders();
            } else {
                toast.error('Failed to cancel order.');
            }
        } catch (error) {
            console.error('Error canceling order:', error);
            toast.error('Failed to cancel order.');
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="px-10 py-10 h-full w-full flex flex-col gap-5">
            <h1 className="text-4xl font-bold mb-6">Admin Orders</h1>
            <table className="table-auto w-full">
                <thead>
                <tr>
                    <th className="px-4 py-2">Ordered By</th>
                    <th className="px-4 py-2">Items</th>
                    <th className="px-4 py-2">Total Amount</th>
                    <th className="px-4 py-2">Total Coins</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td className="border px-4 py-2">{order.user.firstName} {order.user.lastName}</td>
                        <td className="border px-4 py-2">{order.items.map(item => `${item.productId} (x${item.quantity})`).join(', ')}</td>
                        <td className="border px-4 py-2">{order.totalAmount}</td>
                        <td className="border px-4 py-2">{order.totalCoins}</td>
                        <td className="border px-4 py-2">{order.status}</td>
                        <td className="border px-4 py-2">
                            <button
                                className="btn bg-green-500 text-white mr-2"
                                onClick={() => validateOrder(order.id)}
                                disabled={order.status !== 'Pending'}
                            >
                                Validate
                            </button>
                            <button
                                className="btn bg-red-500 text-white"
                                onClick={() => cancelOrder(order.id)}
                                disabled={order.status !== 'Pending'}
                            >
                                Cancel
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminOrders;