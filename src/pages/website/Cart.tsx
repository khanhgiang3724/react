import React, { useContext } from 'react'
import { CartContextCT } from '../../contexs/CartContext'
import { CartItem } from '../../interfaces/cart';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems,removeCartItem ,updateQuantity} = useContext(CartContextCT)

    const groupedItems: { [key: string]: CartItem } = {};

    cartItems.forEach(item => {
        if (!groupedItems[item.name]) {
            groupedItems[item.name] = { ...item };
        } else {
            groupedItems[item.name].quantity += item.quantity;
        }
    });

    const groupedItemsArray = Object.values(groupedItems);

  
    const totalAmount = groupedItemsArray.reduce((total, item) => {
        // const price = parseFloat(item.price);
        return total + (item.price * item.quantity);
    }, 0);

    const handleQuantityChange = (name: string, delta: number) => {
        const product = cartItems.find(item => item.name === name);
        if (product) {
            const newQuantity = product.quantity + delta;
            if (newQuantity > 0) {
                updateQuantity(name, newQuantity);
            }
        }
    };
  return (
    <div>
          <div className="text-[#505F4E] text-3xl font-baloo bg-[#D2E8CD] p-20">
            <p className="text-center font-bold">Giỏ hàng</p>
        </div>
        <section className="pt-20 pb-20">
    <div className="container mx-auto">
        <div className="row">
            <div className="col-lg-12">
                <div className="mb-7">
                    <table className="w-full text-center">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left text-xl font-bold text-gray-800 pb-5">Products</th>
                                <th className="text-xl font-bold text-gray-800 pb-5">Price</th>
                                <th className="text-xl font-bold text-gray-800 pb-5">Quantity</th>
                                <th className="text-xl font-bold text-gray-800 pb-5">Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedItemsArray.length > 0 ? (
                                groupedItemsArray.map((item: CartItem) => (
                                    <tr key={item.id} className="border-b border-gray-200">
                                <td className="flex items-center text-left py-8">
                                    <img src="img/cart/cart-1.jpg" className="mr-6" alt=""/>
                                    <h5 className="text-gray-800">{item.name}</h5>
                                </td>
                                <td className="text-lg font-bold text-gray-800">${item.price}</td>
                                <td className="w-56">
                                <div className="inline-flex items-center">
                                            <button
                                                 onClick={() => handleQuantityChange(item.name, -1)}
                                                className="bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-300"
                                            >
                                                -
                                            </button>
                                            <span className="text-lg mx-3">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.name, 1)}
                                                className="bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                        </div>
                                </td>
                                {/* <td className="text-lg font-bold text-gray-800">${totalAmount.toFixed(2)}</td> */}
                                <td className="text-lg font-bold text-gray-800">
                                        {(item.price * item.quantity).toFixed(2)}
                                    </td>
                                <td className="text-right">
                                    <span onClick={() => removeCartItem(Number(item.id))} className="text-2xl text-gray-400 cursor-pointer">×</span>
                                </td>
                            </tr>
                                ))
                            ) : (
                                <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">Giỏ hàng của bạn đang trống.</td>
                            </tr>
                            )}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <div className="flex justify-between mb-7">
                    <a href="#" className="text-gray-600 py-3 px-8 bg-gray-200 text-sm">CONTINUE SHOPPING</a>
                    <a href="#" className="text-gray-600 py-3 px-8 bg-gray-200 text-sm flex items-center"><span className="icon_loading mr-2"></span> Update Cart</a>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="mb-11">
                    <div className="mb-11">
                        <h5 className="text-xl font-bold text-gray-800 mb-6">Discount Codes</h5>
                        <form action="#" className="flex items-center">
                            <input type="text" placeholder="Enter your coupon code" className="w-64 h-12 border border-gray-300 text-gray-400 placeholder-gray-400 text-center mr-4"/>
                            <button type="submit" className="px-8 py-4 text-xs uppercase letter-spacing-1 bg-[#4E7C32] text-white">APPLY COUPON</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="bg-gray-200 p-8 mt-12">
                    <h5 className="text-xl font-bold text-gray-800 mb-7">Cart Total</h5>
                    <ul className="mb-7">
                        <li className="text-lg font-bold text-gray-800 flex justify-between">Total <span className="text-red-600">${totalAmount.toFixed(2)}</span></li>
                    </ul>
                    <Link to={`/checkout`} className="block text-center px-8 py-4 bg-[#4E7C32] text-white">PROCEED TO CHECKOUT</Link>
                </div>
            </div>
        </div>
    </div>
</section>

    </div>
  )
}

export default Cart
