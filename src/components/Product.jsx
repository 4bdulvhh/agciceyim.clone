import React, { useState, useContext, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DATA from "../data.json";
import { CartContext } from "./Navbar";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { CiShoppingBasket } from "react-icons/ci";

const CategorySidebar = ({ categories, currentSubcategory }) => {
  const getSubcategoryCount = (mainCat, subCat) => {
    return DATA.filter(
      (product) =>
        product.əsas_kateqoriya === mainCat && product.alt_kateqoriya === subCat
    ).length;
  };

  return (
    <div className="w-60 space-y-8">
      {Object.entries(categories).map(([mainCategory, subcategories]) => (
        <div key={mainCategory}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-black"></div>
            <h2 className="font-bold text-lg tracking-wide">{mainCategory}</h2>
          </div>
          <ul className="space-y-3">
            {subcategories.map((subcategory) => (
              <li key={subcategory}>
                <Link
                  to={`/category/${encodeURIComponent(
                    mainCategory
                  )}/${encodeURIComponent(subcategory)}`}
                  className="flex justify-between items-center"
                >
                  <span className="text-gray-700 hover:text-gray-900">
                    {subcategory}
                  </span>
                  <span className="text-gray-400">
                    ({getSubcategoryCount(mainCategory, subcategory)})
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const ProductSlider = ({ products, addToCart, navigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerView = {
    mobile: 2,
    desktop: 4,
  };

  const isMobile = window.innerWidth < 768;
  const itemsToShow = isMobile ? itemsPerView.mobile : itemsPerView.desktop;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsToShow >= products.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? Math.max(0, products.length - 1) : prevIndex - 1
    );
  };

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + itemsToShow
  );

  return (
    <div className="relative  mt-16">
      <div className="flex items-center justify-center mb-8 relative">
        <div className="flex-1 text-center">
          <h2 className="text-2xl font-medium mb-2 font-pacifico">
            Məhsula əlavə edə bilərsiniz
          </h2>
          <div className="w-48 h-1 bg-[#0CE6DF] mx-auto"></div>
        </div>
        {products.length > itemsToShow && (
          <>
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-[#0CE6DF] text-white shadow-lg transition-colors absolute left-0"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-[#0CE6DF] text-white shadow-lg transition-colors absolute right-0"
              disabled={currentIndex + itemsToShow >= products.length}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      <div className="relative ">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6  ">
          {visibleProducts.map((product) => (
            <div key={product.id} className="relative flex flex-col h-full">
              <div className="relative">
                <img
                  src={product.şəklin_linki}
                  alt={product.məhsulun_adı}
                  className="w-full h-48 md:h-64 object-cover rounded-lg cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                />
                <button
                  className="absolute right-4 top-4 p-2 rounded-full bg-[#0CE6DF] hover:bg-black transition-colors group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="flex flex-col justify-between  flex-1 text-center mt-4">
                <div>
                  <h3
                    className="text-sm md:text-lg font-medium mb-2 cursor-pointer line-clamp-2"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.məhsulun_adı}
                  </h3>
                  <p className="text-base md:text-lg font-bold mb-3">
                    {product.qiymət}
                  </p>
                </div>
                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full bg-[#0CE6DF] text-white py-2 px-4 md:px-6 rounded-full hover:bg-black transition-colors text-sm md:text-base"
                >
                  Səbətə
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Product = () => {
  const { productId } = useParams();
  const product = DATA.find((p) => p.id == productId);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

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

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return DATA.filter(
      (p) => p.alt_kateqoriya === product.alt_kateqoriya && p.id !== product.id
    );
  }, [product]);

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="max-w-7xl mt-[88px] lg:mt-0 mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="product-image">
              <img
                src={product.şəklin_linki}
                alt={product.məhsulun_adı}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="product-info flex flex-col gap-6">
              <h1 className="text-3xl font-medium font-futura">
                {product.məhsulun_adı}
              </h1>
              <div className="text-2xl font-medium">{product.qiymət}</div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-700">Tərkibi: {product.tərkibi}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-full">
                  <button
                    className="px-4 py-2 text-xl"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-16 text-center  py-2 "
                  />
                  <button
                    className="px-4 py-2 text-xl"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-black text-white rounded-full py-3 px-6 hover:bg-[#00FFE5] transition-colors"
                >
                  <CiShoppingBasket className=" size-6 inline-block mx-1" />
                  Səbətə
                </button>
              </div>
              <div className="flex gap-4 items-center">
                <img
                  src="https://agciceyim.az/data/payment_icons/5.png"
                  alt="Visa"
                  className="h-8"
                />
                <img
                  src="https://agciceyim.az/data/payment_icons/5-pb.png"
                  alt="Pasha Bank"
                  className="h-8"
                />
              </div>
              <p className="text-gray-500 text-sm">
                Hal-hazırda baxır: 3 nəfər
              </p>
            </div>
          </div>

          <ProductSlider
            products={relatedProducts}
            addToCart={addToCart}
            navigate={navigate}
          />
        </div>
        <div className="hidden lg:block">
          <CategorySidebar
            categories={categories}
            currentSubcategory={product.alt_kateqoriya}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
