import { useContext, useEffect, useState } from "react";
import sp8 from "../../image/annie-spratt-ncQ2sguVlgo-unsplash 1.png";
import sp3 from "../../image/dedww 1.png";
import sp4 from "../../image/gbfdf 1.png";
import sp1 from "../../image/htgyr 1.png";
import sp2 from "../../image/hthrt 1.jpg";
import { AiOutlineHeart, AiOutlineShareAlt, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Category, Product } from "../../interfaces/product";
import instance from "../../apis";
import { CartContextCT } from "../../contexs/CartContext";
import { CartItem } from "../../interfaces/cart";

const Shop = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(8000);
  const [minSize, setMinSize] = useState(2);
  const [maxSize, setMaxSize] = useState(50);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await instance.get("categorys");
      setCategorys(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (id) {
        const { data } = await instance.get(`products?category=${id}`);
        setProducts(data);
      } else {
        const { data } = await instance.get("products");
        setProducts(data);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (id) {
      const selected = categorys.find((category) => category.id === id);
      if (selected) {
        setSelectedCategory(selected.name);
      }
    } else {
      setSelectedCategory("");
    }
  }, [id, categorys]);

  const filteredProducts = products.filter(
    (product: Product) =>
      selectedCategory === "" || product.category === selectedCategory
  );

  // const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selected = categorys.find((cat) => cat.name === e.target.value);
  //   if (selected) {
  //     setSelectedCategory(selected.name);
  //     navigate(`/category/${selected.id}`);
  //   } else {
  //     setSelectedCategory("");
  //     navigate("/category");
  //   }
  // };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value));
  };

  const handleMinChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinSize(Number(e.target.value));
  };

  const handleMaxChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxSize(Number(e.target.value));
  };

  // ADD TO CART
  const [quantity, setQuantity] = useState(1);
  const { addCartItem } = useContext(CartContextCT);
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  const handleAddToCart = async (product: Product) => {
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
      const cartResponse = await instance.get("carts");
      const cartItems: CartItem[] = cartResponse.data;

      const existingItem = cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        await instance.patch(`carts/${existingItem.id}`, {
          quantity: existingItem.quantity + quantity,
        });
      } else {
        await instance.post("carts", cartItem);
      }

      addCartItem(cartItem);
      navigate("/cart");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Đã xảy ra lỗi khi thêm vào giỏ hàng.");
    }
  };
  return (
    <div>

  <div className="text-[#505F4E] text-3xl font-baloo bg-[#D2E8CD] p-20">
    <p className="ml-24 font-bold">Chậu & Hộp đựng</p>
  </div>

 
  <div className="flex gap-36 justify-center py-10 pb-20">
    <div className="flex border-2 p-3 px-6 bg-[#D2E8CD] rounded-lg">
      <img src={sp1} alt="Chậu vuông" />
      <p className="text-[#505F4E] mt-2 ml-2">Chậu vuông</p>
    </div>
    <div className="flex border-2 p-3 bg-[#D2E8CD] rounded-lg">
      <img src={sp2} alt="Chậu tròn" />
      <p className="text-[#505F4E] mt-3 ml-2">Chậu tròn</p>
    </div>
    <div className="flex border-2 p-3 bg-[#D2E8CD] rounded-lg">
      <img src={sp3} alt="Đế lót ly" />
      <p className="text-[#505F4E] mt-3 ml-2">Đế lót ly</p>
    </div>
    <div className="flex border-2 p-3 bg-[#D2E8CD] rounded-lg">
      <img src={sp4} alt="Chậu trồng cây" />
      <p className="text-[#505F4E] mt-3 ml-2">Chậu trồng cây</p>
    </div>
  </div>


  <div className="flex space-x-10 ml-32">
    <div className="flex">
      <p className="mt-1">Danh mục:</p>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="border-gray-300 text-gray-400 w-48 p-2 rounded-lg border-solid border ml-2"
      >
        <option value="">Tất cả danh mục</option>
        {categorys.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
    <div className="flex">
      <p className="mt-1">Số lượng:</p>
      <select
        name="sort"
        id="sort-select"
        className="border-gray-300 text-gray-400 w-48 p-1 rounded-lg border-solid border ml-2"
      >
        <option value="newest">1</option>
        <option value="oldest">2</option>
        <option value="alphabetical">3</option>
      </select>
    </div>
  </div>


  <div className="grid grid-cols-2 gap-30">
    <div className="ml-22 grid grid-cols-3 w-full gap-20 ml-20">
      {filteredProducts.map((item: Product) => (
        <div className="relative group mt-10" key={item.id}>
          <div className="relative">
            <Link to={`/detail/${item.id}`}>
              <img src={item.thumbnail} alt={item.name} className="" />
            </Link>
            <div className="absolute top-16 left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex space-x-2 mt-10 ml-4">
                <AiOutlineShareAlt className="text-4xl cursor-pointer rounded-sm text-[#fff] hover:text-black bg-[#4E7C32]" />
                <AiOutlineShoppingCart onClick={() => handleAddToCart(item)} className="text-4xl cursor-pointer rounded-sm text-[#fff] hover:text-black bg-[#4E7C32]" />
                <AiOutlineHeart className="text-4xl cursor-pointer rounded-sm text-[#fff] hover:text-black bg-[#4E7C32]" />
              </div>
            </div>
          </div>
          <div className="mt-2">
            <Link to={`/detail/${item.id}`}>
              <p>{item.name}</p>
            </Link>
            <span className="text-gray-400">
              ${item.price} <del className="text-gray-500 ml-3">$50</del>
            </span>
          </div>
        </div>
      ))}
    </div>

  
    <div className="mr-24">
      <div className="relative right-0 ml-80">
        <p className="font-baloo text-[#505F4E] text-2xl ml-20">Danh mục</p>
        <div className="ml-2">
          {categorys.map(category => (
            <div className="flex mt-6 ml-20" key={category.id}>
              <input type="checkbox" />
              <p className="ml-2">{category.name}</p>
            </div>
          ))}
        </div>
        <div className="relative left-1/4 bottom-3/4 mt-4">
          <div className="relative">
            <img src={sp8} alt="" className="" />
            <div className="absolute inset-0 flex flex-col items-center w-52 justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300">
              <p className="text-white font-bold absolute top-2 left-2">
                Phát triển của riêng bạn<br /> kế hoạch yêu thích
              </p>
              <span className="text-white absolute bottom-2 left-2">Sản phẩm</span>
            </div>
          </div>
        </div>
      </div>

    
      <div className="relative ml-[53%] w-56">
        <div className="mt-4 ml-10 relative left-3 pr-2 w-full">
          <div className="text-lg font-semibold mb-4">Tìm kiếm theo giá</div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="8000"
              value={minPrice}
              onChange={handleMinChange}
              className="absolute w-full h-1 bg-gray-300 rounded-lg"
            />
            <input
              type="range"
              min="0"
              max="8000"
              value={maxPrice}
              onChange={handleMaxChange}
              className="absolute w-full h-1 bg-gray-300 rounded-lg"
            />
          </div>
          <div className="flex justify-between mt-8 w-full">
            <div className="text-gray-400">từ $ {minPrice} đến $ {maxPrice}</div>
            <button className="text-gray-500 ml-4">Tìm kiếm</button>
          </div>
        </div>
        <div className="mt-4 ml-10 relative left-3 pr-2 w-full">
          <div className="text-lg font-semibold mb-4">Tìm kiếm theo size</div>
          <div className="relative">
            <input
              type="range"
              min="2"
              max="50"
              value={minSize}
              onChange={handleMinChangeSize}
              className="absolute w-full h-1 bg-gray-300 rounded-lg"
            />
            <input
              type="range"
              min="2"
              max="50"
              value={maxSize}
              onChange={handleMaxChangeSize}
              className="absolute w-full h-1 bg-gray-300 rounded-lg"
            />
          </div>
          <div className="flex justify-between mt-8 w-full">
            <div className="text-gray-400">{minSize} mm đến {maxSize} mm</div>
            <button className="text-gray-500 ml-4">Filter</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Shop;
