import { useContext, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom'
import { Product } from '../../interfaces/product'
import { getIdProduct } from '../../apis/products'
import { CartContextCT } from '../../contexs/CartContext';
import instance from '../../apis';
import { CartItem } from '../../interfaces/cart';

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1)
    const navigate = useNavigate()
    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    };
    const handleIncrement = () => {
        setQuantity(quantity + 1)
    };

    // Lấy id
    const {id} = useParams()
    const [product,setProduct] = useState<Product | null>(null)
    useEffect(() => {
        (async () => {
            const data = await getIdProduct(`${id}`)
            setProduct(data)
        })()
    },[])

    // ADD TO CART
    const {addCartItem} = useContext(CartContextCT)

    const handleAddToCart = async () => {
        if (product) {
            const cartItem: CartItem = {
                id: product.id,
                name: product.name,
                quantity,
                category: product.category,
                thumbnail: product.thumbnail,
                description: product.description,
                price: product.price,
                images: product.images
            };

            try {
                // Lấy giỏ hàng hiện tại
                const cartResponse = await instance.get('carts')
                const cartItems = cartResponse.data

                // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
                const existingItem = cartItems.find((item: CartItem) => item.id === product.id)

                if (existingItem) {
                    // Cập nhật số lượng của sản phẩm trong giỏ hàng
                    await instance.patch(`carts/${existingItem.id}`, {
                        quantity: existingItem.quantity + quantity
                    })
                } else {
                    // Thêm sản phẩm mới vào giỏ hàng
                    await instance.post('carts', cartItem)
                }

                // Thêm vào giỏ hàng thông qua context
                addCartItem(cartItem)

                // Điều hướng đến trang giỏ hàng
                navigate('/cart')
            } catch (error) {
                console.log(error)
                alert('Đã xảy ra lỗi khi thêm vào giỏ hàng.')
            }
        }
    }
  return (
    <div className='w-[1350px]'>
            <div className='ml-20 pt-20 grid grid-cols-2 mr-20'>
                <div className=''>
                    <img src={product?.thumbnail} alt="" className='w-3/6 mx-20' />
                    <div className='flex space-x-1 ml-14 mt-8'>
                        {product?.images && product.images.map(item => (
                            <img src={item} alt="" className='hover:border hover:border-gray-500 rounded-lg w-1/5' />
                        ))}
                        

                    </div>
                </div>
                <div className='w-[95%]'>
                    <p className='text-[#4E7C32] font-kumbh'>PLANT</p>
                    <h1 className='text-4xl font-kumbh font-bold mt-4 mb-4'>{product?.name}</h1>
                    <span className='text-[#68707D] mt-4'>{product?.short_description}</span>
                    <div className='flex space-x-4 mt-4'>
                        <p className='font-bold'>${product?.sale}</p>
                        <span className='bg-[#FFEDE0] text-[#4E7C32] rounded-lg P-2'>50%</span>
                    </div>
                    <del className='mt-4 text-sm font-bold'>${product?.price}</del>
                    <div className='flex space-x-10 mt-4'>
                        <div className="flex items-center justify-between w-40 p-2 bg-gray-50 rounded-lg">
                            <button
                                className=""
                                onClick={handleDecrement}
                            >
                                <span className='text-2xl'>-</span>
                            </button>
                            <span className="text-2xl font-bold">{quantity}</span>
                            <button
                                className=""
                                onClick={handleIncrement}
                            >
                                <span className='text-2xl'>+</span>

                            </button>
                        </div>
                        <div className='flex bg-[#4E7C32] w-44 py-2 pl-6 rounded-lg'>
                            <AiOutlineShoppingCart className='text-white mt-2 mr-2 text-xl' />
                            <button onClick={handleAddToCart} className='text-white'>Add to cart</button>
                        </div>
                    </div>
                </div>


            </div>
            <div className='ml-32 mt-10'>
                <div className='w-4/5'>
                    <p className='text-[#4E7C32] text-2xl'>Discription</p>
                    <span className='text-[#665345]'>{product?.description}</span>
                </div>
                <div className='mt-6'>
                    <p className='text-[#4E7C32] text-2xl'>About</p>
                    <span className='text-[#665345]' >{product?.about}</span>
                </div>
            </div>
            <div className='flex ml-32 mt-10'>
                <img src={product?.thumbnail} alt="" className='hover:border hover:border-gray-500 rounded-lg w-1/6'/>
                <p className='absolute right-96 text-white bg-[#4E7C32] p-2 rounded-lg'>Write reviews</p>
                <div className='flex mt-24 text-gray-500 ml-4'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <span className='mt-32 ml-56 text-[#4E7C32]  absolute'>5.0 (388)</span>
            </div>
            <div className='flex ml-32 mt-14 space-x-1'>
                1 <FaStar className='mt-1 border- border-gray-300' />
                <div className="relative w-3/6 h-4 mt-1 ">
                    <div className="absolute top-0 left-0 h-4 bg-[#A2A0A0] rounded" style={{ width: '75%' }}></div>
                </div>
            </div>
            <div className='flex ml-32 mt-2 space-x-1'>
                2 <FaStar className='mt-1 border- border-gray-300' />
                <div className="relative w-3/6 h-4 mt-1 ">
                    <div className="absolute top-0 left-0 h-4 bg-[#D9D9D9] rounded" style={{ width: '15%' }}></div>
                </div>
            </div>
            <div className='flex ml-32 mt-2 space-x-1'>
                3 <FaStar className='mt-1 border- border-gray-300' />
                <div className="relative w-3/6 h-4 mt-1 ">
                    <div className="absolute top-0 left-0 h-4 bg-[#D9D9D9] rounded" style={{ width: '15%' }}></div>
                </div>
            </div>
            <div className='flex ml-32 mt-2 space-x-1'>
                4 <FaStar className='mt-1 border- border-gray-300' />
                <div className="relative w-3/6 h-4 mt-1 ">
                    <div className="absolute top-0 left-0 h-4 bg-[#D9D9D9] rounded" style={{ width: '15%' }}></div>
                </div>
            </div>
            <div className='flex ml-32 mt-2 space-x-1'>
                5 <FaStar className='mt-1 border- border-gray-300' />
                <div className="relative w-3/6 h-4 mt-1 ">
                    <div className="absolute top-0 left-0 h-4 bg-[#D9D9D9] rounded" style={{ width: '15%' }}></div>
                </div>
            </div>
            <div className='mt-10 ml-32 w-3/5 grid grid-cols-2 gap-10'>
                <div className=' p-4 mt-44'>
                    <div className='flex items-center'>
                        <p className='text-[#4E7C32] mr-4 text-xl'>Aman Gupta</p>
                        <FaStar className='mt-2' />
                        <FaStar className='mt-2' />
                        <FaStar className='mt-2' />
                        <FaStar className='mt-2' />
                        <FaStar className='mt-2' />
                    </div>
                    <p className='text-sm text-[#665345] mt-2'>I've been using this cleanser for about five or six months now and my acne is almost completely gone. I really struggled for years with my skin and tried everything possible but this is the only thing that managed to clear up my skin. 100% recommend and will continue to use is for sure.</p>
                </div>
                <div className='ml-40 w-full'>
                    <div className=' p-4'>
                        <div className='flex items-center'>
                            <p className='text-[#4E7C32] mr-4 text-xl'>Aman Gupta</p>
                            <FaStar className='mt-2' />
                            <FaStar className='mt-2' />
                            <FaStar className='mt-2' />
                            <FaStar className='mt-2' />
                            <FaStar className='mt-2' />
                        </div>
                        <p className='text-sm text-[#665345] mt-2'>I've been using this cleanser for about five or six months now and my acne is almost completely gone. I really struggled for years with my skin and tried everything possible but this is the only thing that managed to clear up my skin. 100% recommend and will continue to use is for sure.</p>
                    </div>
                    <div className=' p-4'>
                        <div className='flex items-center'>
                            <p className='text-[#4E7C32] mr-4 text-xl'>Aman Gupta</p>
                            <FaStar className='mt-2' />
                            <FaStar className='mt-2' />
                            <FaStar className='mt-2' />
                            <FaStar className='mt-2' />
                            <FaStar className='mt-2' />
                        </div>
                        <p className='text-sm text-[#665345] mt-2'>I've been using this cleanser for about five or six months now and my acne is almost completely gone. I really struggled for years with my skin and tried everything possible but this is the only thing that managed to clear up my skin. 100% recommend and will continue to use is for sure.</p>
                    </div>
                </div>
            </div>
            <button className='text-white bg-[#4E7C32] p-2 px-4 rounded-lg text-center block mx-auto mb-10'>
                See all
            </button>
    </div>
  )
}

export default ProductDetail
