import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import DATA from "../data.json";
import { IoIosLock } from "react-icons/io";
import { FaBasketShopping } from "react-icons/fa6";
import LoginModal from "./LoginModal";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

  const addToCart = (product, quantity) => {
    if (!product || !product.id) {
      console.error("Invalid product data:", product);
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 0) + (quantity || 1) }
            : item
        );
      }

      const newItem = {
        id: product.id,
        name: product.məhsulun_adı || "Məhsul adı yoxdur",
        price: parseFloat(product.qiymət) || 0,
        quantity: quantity || 1,
        image: product.şəklin_linki || "/api/placeholder/80/80",
      };

      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, removeFromCart } = useContext(CartContext);

  const categories = useMemo(() => {
    const categoryMap = {};

    DATA.forEach((product) => {
      if (!categoryMap[product.əsas_kateqoriya]) {
        categoryMap[product.əsas_kateqoriya] = new Set();
      }
      categoryMap[product.əsas_kateqoriya].add(product.alt_kateqoriya);
    });

    Object.keys(categoryMap).forEach((key) => {
      categoryMap[key] = Array.from(categoryMap[key]).sort();
    });

    return categoryMap;
  }, []);

  const total = useMemo(() => {
    try {
      return cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 0;
        return sum + price * quantity;
      }, 0);
    } catch (error) {
      console.error("Error calculating total:", error);
      return 0;
    }
  }, [cartItems]);

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Top Navigation Bar */}
      <div className="bg-white py-4 px-4 md:px-6 flex justify-between items-center shadow-md relative">
        {/* Hamburger Menu Button - Only visible on mobile */}
        <button
          className="lg:hidden text-gray-600 hover:text-gray-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed top-[72px] left-0 right-0 h-[calc(100vh-72px)] bg-white shadow-lg z-50 custom-scroll overflow-y-auto">
            {/* Categories Section in Mobile Menu */}
            <div className="bg-gray-50 py-2 px-4">
              <h3 className="text-gray-700 font-medium mb-2">Kateqoriyalar</h3>
              {Object.entries(categories).map(([mainCategory, subcategories]) => (
                <div key={mainCategory} className="mb-3">
                  <div className="text-gray-800 font-medium mb-1">
                    {mainCategory}
                  </div>
                  <div className="pl-4">
                    {subcategories.map((subcategory) => (
                      <Link
                        onClick={() => setIsMenuOpen(false)}
                        key={subcategory}
                        to={`/category/${encodeURIComponent(
                          mainCategory
                        )}/${encodeURIComponent(subcategory)}`}
                        className="block py-1 text-gray-600 hover:text-gray-900"
                      >
                        {subcategory}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Regular Menu Items */}
            <div className="border-t border-gray-200">
              <Link
                to="/xidmetler"
                className="block px-4 py-2 text-gray-600 hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Xidmətlər
              </Link>
              <Link
                to="/sertler-ve-qaydalar"
                className="block px-4 py-2 text-gray-600 hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Çatdırılma və ödəniş
              </Link>
              <Link
                to="/filiallar"
                className="block px-4 py-2 text-gray-600 hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Filiallar
              </Link>
              <Link
                to="/statuslar"
                className="block px-4 py-2 text-gray-600 hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Statuslar
              </Link>
            </div>
          </div>
        )}

        {/* Links Section - Hidden on mobile */}
        <div className="hidden lg:flex justify-center space-x-3 px-6">
          <Link to="/xidmetler" className="text-gray-600 hover:text-gray-600">
            Xidmətlər
          </Link>
          <Link
            to="/sertler-ve-qaydalar"
            className="text-gray-600 hover:text-gray-600"
          >
            Çatdırılma və ödəniş
          </Link>
          <Link to="/filiallar" className="text-gray-600 hover:text-gray-600">
            Filiallar
          </Link>
          <Link to="/statuslar" className="text-gray-600 hover:text-gray-600">
            Statuslar
          </Link>
        </div>

        {/* Logo Section */}
        <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <Link to="/" className="flex items-center">
            <div className="w-[125px]">
              <img
                src="https://agciceyim.az/template/design/assets/images/ag2.svg"
                alt=""
              />
            </div>
          </Link>
        </div>

        {/* Icons Section */}
        <div className="flex items-center space-x-2 md:space-x-6">
          <span className="hidden md:inline text-gray-600">+99455 3502121</span>
          <div className="relative inline-block text-left"></div>
          <button
            className="text-gray-600 hover:text-gray-900 flex items-center"
            onClick={() => setIsLoginModalOpen(true)}
          >
            <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <IoIosLock />
            </div>
          </button>

          {/* Cart Button and Side Panel */}
          <div className="relative">
            <button
              className="text-gray-600 hover:text-gray-900 flex items-center"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <FaBasketShopping />
              </div>
              <span className="absolute -top-2 -right-2 bg-[#00e5e5] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            </button>

            {/* Cart Side Panel */}
            {isCartOpen && (
              <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col">
                {/* Cart Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Səbət</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 mb-4">
                      <img
                        src={item.image || "/api/placeholder/80/80"}
                        alt={item.name || "Product Image"}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">
                          {item.name || "Məhsul adı yoxdur"}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">
                              {item.quantity || 0} x{" "}
                              {(parseFloat(item.price) || 0).toFixed(2)}₼
                            </span>
                          </div>
                          <button
                            className="text-red-500 hover:text-red-600"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Footer */}
                <div className="border-t p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Cəmi:</span>
                    <span className="text-lg font-semibold text-[#00e5e5]">
                      {total.toFixed(2)}₼
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="py-2 px-4 bg-black text-white rounded hover:bg-gray-800">
                      Səbət
                    </button>
                    <button className="py-2 px-4 bg-[#00e5e5] text-white rounded hover:bg-[#00c5c5]">
                      Sifarişi tamamla
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Navigation Bar - Only visible on desktop */}
      <nav className="hidden lg:block bg-[#0CE6DF] py-2 px-4 md:px-6">
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(categories).map(([mainCategory, subcategories]) => (
            <div
              key={mainCategory}
              className="relative group text-[#FFFFFF] hover:bg-[#0daba5] p-2 rounded uppercase text-sm"
            >
              <span className="cursor-pointer">{mainCategory}</span>
              <div className="absolute left-0 mt-1 hidden group-hover:block bg-white shadow-lg w-48 z-50">
                {subcategories.map((subcategory) => (
                  <Link
                    key={subcategory}
                    to={`/category/${encodeURIComponent(
                      mainCategory
                    )}/${encodeURIComponent(subcategory)}`}
                    className="block rounded-none px-4 py-2 text-[#666] hover:text-[#0CE6DF] transition-colors duration-250 ease-in-out"
                  >
                    {subcategory}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}/>
      
     
        <style jsx global>{`
          body {
            padding-top: 72px; /* Height of the navbar */
          }
          @media (min-width: 1024px) {
            body {
              padding-top: 128px; /* Height of navbar + category bar on desktop */
            }
          }
        `}</style>
      </header>
    );
  };
  
  export default Navbar;