import { useParams, Link, useNavigate } from "react-router-dom";
import { useMemo, useContext } from "react";
import DATA from "../data.json";
import { Heart } from "lucide-react";
import { CartContext } from "./Navbar";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
      <div className="relative">
        <img
          src={product.şəklin_linki}
          alt={product.məhsulun_adı}
          className="w-full h-64 object-cover"
          onClick={() => navigate(`/product/${product.id}`)}
        />
        <button className="absolute right-4 top-4 p-2 rounded-full bg-[#0CE6DF] hover:bg-black transition-colors group">
          <Heart className="w-5 h-5 text-white group-hover:text-white" />
        </button>
      </div>
      <div className="p-4 text-center">
        <h3
          className="text-lg font-medium hover:text-[#0CE6DF] text-gray-900 mb-2"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.məhsulun_adı}
        </h3>
        <span className="text-lg font-bold">{product.qiymət}</span>
        <div className="flex justify-between items-center"></div>
        <button
          className="px-6 py-2 bg-[#0CE6DF] mt-2 block text-white m-auto rounded-full hover:bg-black transition-colors"
          onClick={handleAddToCart}
        >
          Səbətə
        </button>
      </div>
    </div>
  );
}

function CategorySidebar({ categories, currentSubcategory }) {
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
}

function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function Content() {
  const { mainCategory, subCategory } = useParams();
  const products = DATA;
  const categories = useMemo(() => {
    const categoryMap = {};

    products.forEach((product) => {
      if (!categoryMap[product.əsas_kateqoriya]) {
        categoryMap[product.əsas_kateqoriya] = new Set();
      }
      categoryMap[product.əsas_kateqoriya].add(product.alt_kateqoriya);
    });

    Object.keys(categoryMap).forEach((key) => {
      categoryMap[key] = Array.from(categoryMap[key]).sort();
    });

    return categoryMap;
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!subCategory) return products;
    return products.filter((product) => product.alt_kateqoriya === subCategory);
  }, [subCategory, products]);

  return (
    <div className="min-h-screen mt-[88px] lg:mt-0 bg-gray-50">
      {subCategory && (
        <div className="max-w-7xl mx-auto pt-8 px-4">
          <h1 className="text-4xl font-medium font-pacifico text-center mb-4">
            {subCategory}
            <div className="w-32 h-1 bg-[#0CE6DF] mx-auto mt-2"></div>
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-8">
            <Link to="/" className="hover:text-gray-900">
              Əsas səhifə
            </Link>
            <span>&gt;</span>
            <span>{subCategory}</span>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden lg:block">
            <CategorySidebar
              categories={categories}
              currentSubcategory={subCategory}
            />
          </div>
          <div className="flex-1">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Content;
