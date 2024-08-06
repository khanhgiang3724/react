import React, { useContext, useEffect, useState } from 'react'
import { CartContextCT } from '../../contexs/CartContext';
import { useNavigate } from 'react-router-dom';
import instance from '../../apis';

const CheckOut = () => {
    const { cartItems,clearCart } = useContext(CartContextCT);
    const [billingInfo, setBillingInfo] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        phone: '',
        zip: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Calculate the total amount from cart items
        const amount = cartItems.reduce((total, product) => total + (product.price * (product.quantity || 1)), 0);
        setTotalAmount(amount);
    }, [cartItems]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setBillingInfo(prevInfo => ({ ...prevInfo, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Tạo đối tượng đơn hàng
            const order = {
                ...billingInfo,
                items: cartItems,
                totalAmount: totalAmount + 5.00 + 4.20 // Tổng cộng bao gồm vận chuyển và thuế
            };

            // Gửi thông tin đơn hàng đến API
            await instance.post('orders', order); // Địa chỉ API của bạn

            clearCart()
            alert('Đặt hàng thành công');
            navigate('/');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.');
        }
    };
  return (
    <div>
        <section className="checkout pt-20 pb-15">
            <div className="mx-auto">
                    <div className="row">
                        <div className="mx-auto">
                            <h6 className="text-gray-600 text-center bg-gray-100 border-t border-green-600 py-3">
                                <span className="text-lg text-green-600 mr-1 icon_tag_alt"></span>
                                Có mã giảm giá? 
                                <a href="#" className="underline text-blue-600">Nhấp vào đây</a> để nhập mã của bạn
                            </h6>
                        </div>
                    </div>
                
                    <div className="py-20 px-4 md:px-8 lg:px-12">
                        <h4 className="text-xl font-bold border-b border-gray-200 pb-5 mb-6">Chi tiết thanh toán</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-wrap -mx-4">
                                <div className="w-full lg:w-2/3 px-4">
                                    <div className="flex flex-wrap -mx-4">
                                        <div className="w-full  px-4 mb-6">
                                            <div className="">
                                                <p className="text-gray-800 mb-5">Tên<span className="text-red-500">*</span></p>
                                                <input type="text" 
                                                className="w-full h-12 mb-5 border border-gray-300 px-5 text-gray-700 text-lg rounded-md"
                                                value={billingInfo.fullName}
                                                onChange={handleInputChange}
                                                id="fullName"
                                                required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <p className="text-gray-800 mb-5">Địa chỉ<span className="text-red-500">*</span></p>
                                        <input type="text" placeholder="Địa chỉ đường" 
                                        className="w-full h-12 mb-5 border border-gray-300 px-5 text-gray-700 text-lg rounded-md"
                                        id="address"
                                        value={billingInfo.address}
                                        onChange={handleInputChange}
                                        required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <p className="text-gray-800 mb-5">Thành phố/Tỉnh<span className="text-red-500">*</span></p>
                                        <input type="text" 
                                        className="w-full h-12 border border-gray-300 px-5 text-gray-700 text-lg rounded-md"
                                        id="city"
                                        value={billingInfo.city}
                                        onChange={handleInputChange}
                                        required
                                        />
                                    </div>
                                    <div className="flex flex-wrap -mx-4">
                                        <div className="w-full lg:w-1/2 px-4 mb-6">
                                            <div className="mb-6">
                                                <p className="text-gray-800 mb-5">Điện thoại<span className="text-red-500">*</span></p>
                                                <input type="text" 
                                                className="w-full h-12 border border-gray-300 px-5 text-gray-700 text-lg rounded-md"
                                                id="phone"
                                                value={billingInfo.phone}
                                                onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-1/2 px-4 mb-6">
                                            <div className="mb-6">
                                                <p className="text-gray-800 mb-5">Email<span className="text-red-500">*</span></p>
                                                <input type="email" 
                                                className="w-full h-12 border border-gray-300 px-5 text-gray-700 text-lg rounded-md"
                                                value={billingInfo.email}
                                                onChange={handleInputChange}
                                                id="email"
                                                required
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full  px-4 mb-6">
                                            <div className="mb-6">
                                                <p className="text-gray-800 mb-5">Mã bưu điện<noscript></noscript><span className="text-red-500">*</span></p>
                                                <input type="text" 
                                                className="w-full h-12 border border-gray-300 px-5 text-gray-700 text-lg rounded-md"
                                                id="zip"
                                                value={billingInfo.zip}
                                                onChange={handleInputChange}
                                                required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <h2 className="text-xl font-bold border-b border-gray-200 pb-5 mb-6">Thông tin thanh toán</h2>
                                        <div className="mb-6">
                                            <label htmlFor="cardNumber" className="text-gray-800 mb-5">Số thẻ</label>
                                            <input
                                                type="text"
                                                id="cardNumber"
                                                value={billingInfo.cardNumber}
                                                onChange={handleInputChange}
                                                className="w-full h-12 border border-gray-300 px-5 text-gray-700 text-lg rounded-md"
                                                placeholder="1234 5678 9123 4567"
                                                required
                                            />
                                        </div>
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="expiryDate" className="text-gray-800 mb-5">Ngày hết hạn</label>
                                        <input
                                            type="date"
                                            id="expiryDate"
                                            value={billingInfo.expiryDate}
                                            onChange={handleInputChange}
                                            className="w-full h-12 border border-gray-300 px-5 text-gray-700 text-lg rounded-md"
                                            placeholder="MM/YY"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cvv" className="text-gray-800 mb-5">CVV</label>
                                        <input
                                            type="text"
                                            id="cvv"
                                            value={billingInfo.cvv}
                                            onChange={handleInputChange}
                                            className="w-full h-12 border border-gray-300 px-5 text-gray-700 text-lg rounded-md"
                                            placeholder="123"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                                </div>
                                <div className="w-full lg:w-1/3 px-4">
                                    <div className="bg-gray-100 p-6 rounded border border-gray-300">
                                            <h4 className="text-xl font-bold border-b border-gray-200 pb-5 mb-6">Đơn hàng của bạn</h4>
                                            <div className="flex justify-between mb-4">
                                                <span className="text-lg font-bold text-gray-800">Sản phẩm</span>
                                                <span className="text-lg font-bold text-gray-800">Tổng cộng</span>
                                            </div>
                                        {cartItems.map(item => (
                                            <div>
                                                <ul className="mb-4">
                                                    <li className="flex justify-between mb-2 text-gray-700">{item.name}<span>${item.price}</span></li>
                                                </ul>
                                            </div>
                                        ))}
                                        
                                        <div className="flex justify-between mb-6">
                                            <span className="text-lg font-bold text-gray-800">Tổng phụ</span>
                                            <span className="text-lg font-bold text-red-500">${totalAmount.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between mb-6">
                                            <span className="text-lg font-bold text-gray-800">Tổng phụ</span>
                                            <span className="text-lg font-bold text-red-500">${(totalAmount + 5.00 + 4.20).toFixed(2)}</span>
                                        </div>
                                        <div className="mb-6">
                                            <label className="relative text-lg text-gray-800 pl-10 cursor-pointer">
                                                <input type="checkbox" className="absolute opacity-0"/>
                                                <span className="bg-gray-300 h-4 w-4 border border-gray-500 absolute left-0 top-1 rounded-md"></span>
                                                <span className="text-gray-700">Thanh toán bằng trực tiếp</span>
                                            </label>
                                        </div>
                                        <div className="mb-6">
                                            <label className="relative text-lg text-gray-800 pl-10 cursor-pointer">
                                                <input type="checkbox" className="absolute opacity-0"/>
                                                <span className="bg-gray-300 h-4 w-4 border border-gray-500 absolute left-0 top-1 rounded-md"></span>
                                                <span className="text-gray-700">Paypal</span>
                                            </label>
                                        </div>
                                        <button type="submit" className="w-full bg-[#4E7C32] text-white py-3 rounded-md">ĐẶT HÀNG</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>


            </div>
        </section>

    </div>
  )
}

export default CheckOut
