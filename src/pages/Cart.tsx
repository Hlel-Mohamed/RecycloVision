import {useCart} from '../utils/cartContext';
import OrderService from '../services/order';
import toast from 'react-hot-toast';

const Cart = () => {
    const {cart, setCart} = useCart();

    const handleQuantityChange = (id: number, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? {...item, quantity: Math.max(1, quantity)} : item
            )
        );
    };

    const handleRemove = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const calculateTotal = () =>
        cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const calculateTotalCoins = () =>
        cart.reduce((totalCoins, item) => totalCoins + item.coins * item.quantity, 0);

    const handleCheckout = async () => {
        try {
            const order = {
                items: cart.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    coins: item.coins,
                })),
                totalAmount: calculateTotal(),
                totalCoins: calculateTotalCoins(),
            };

            // await OrderService.createOrder(order);
            toast.success('Order validated!');
            setCart([]);
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error('Failed to create order. Please try again.');
        }
    };

    return (
        <div className="px-10 py-5 w-full flex h-[600px] gap-8">
            <div className="bg-gray-100 rounded h-full-lg shadow-lg p-6 w-full max-w-4xl">
                <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Your Cart</h1>

                {cart.length > 0 ? (
                    <div>
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                                    <div className="flex items-center gap-4">
                                        <img src={item.image} alt={item.name}
                                             className="w-20 h-20 object-cover rounded-md"/>
                                        <div>
                                            <h5 className="text-lg font-semibold text-gray-800">{item.name}</h5>
                                            <p className="text-sm text-gray-600">{item.description}</p>
                                            <p className="text-green-700 font-medium mt-1">
                                                Price: ${item.price} | Coins: {item.coins}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                            className="w-16 border border-gray-300 rounded-md text-center"
                                        />
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="btn btn-error text-white px-4 py-2 rounded-md"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 text-right">
                            <p className="text-xl font-semibold text-green-700">Total: ${calculateTotal()}</p>
                            <p className="text-lg text-green-700">Total Coins: {calculateTotalCoins()}</p>
                            <button
                                onClick={handleCheckout}
                                className="btn btn-success text-white mt-4 px-6 py-2 rounded-md"
                            >
                                Validate Order
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Cart;