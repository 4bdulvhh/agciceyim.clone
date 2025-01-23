import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import data from "../data";
import { CartContext } from "./Navbar";

const ProductCard = ({ məhsulun_adı, qiymət, şəklin_linki, id }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const product = {
      id,
      məhsulun_adı,
      qiymət,
      şəklin_linki,
    };
    addToCart(product, 1);
  };

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="relative flex flex-col h-full">
      <div className="relative">
        <img
          src={şəklin_linki}
          alt={məhsulun_adı}
          className="w-full h-48 md:h-64 object-cover rounded-lg cursor-pointer"
          onClick={handleProductClick}
        />
        <button
          className="absolute right-4 top-4 p-2 rounded-full bg-[#0CE6DF] hover:bg-black transition-colors group"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="w-5 h-5 text-white" />
        </button>
      </div>
      <div className="flex flex-col justify-between flex-1 text-center mt-4">
        <div>
          <h3
            className="text-sm md:text-lg font-medium mb-2 cursor-pointer line-clamp-2"
            onClick={handleProductClick}
          >
            {məhsulun_adı}
          </h3>
          <p className="text-base md:text-lg font-bold mb-3">{qiymət}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#0CE6DF] text-white py-2 px-4 md:px-6 rounded-full hover:bg-black transition-colors text-sm md:text-base"
        >
          Səbətə
        </button>
      </div>
    </div>
  );
};

const TrendMehsullar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);

  const itemsPerView = {
    mobile: 2,
    desktop: 4,
  };

  const isMobile = window.innerWidth < 768;
  const itemsToShow = isMobile ? itemsPerView.mobile : itemsPerView.desktop;

  useEffect(() => {
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    setProducts(shuffled.slice(0, 15));
  }, []);

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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-center mb-8 relative">
        {products.length > itemsToShow && (
          <>
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-[#0CE6DF] text-white shadow-lg transition-colors absolute left-0"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1 text-center">
              <h2 className="text-4xl mb-2 font-pacifico">Trend Məhsullar</h2>
              <div className="h-1 bg-[#0CE6DF] w-24 mx-auto"></div>
            </div>
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

      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {visibleProducts.map((product) => (
            <div key={product.id}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-16">
        <button className="text-black hover:text-[#0CE6DF]/80 font-bold font-futura text-lg border-b-2 border-[#0CE6DF] hover:border-[#0CE6DF]/80 transition-colors pb-1">
          Bütün Trend Məhsullar
        </button>
      </div>
    </div>
  );
};

export default TrendMehsullar;
