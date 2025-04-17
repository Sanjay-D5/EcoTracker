import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react"
import Button from "../components/Button"
import { productsData } from "../constants"
import { useMemo, useState } from "react";
import { ProductCard, ProductDetails, ProductFilter } from "@/components";

// Types
type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  ecoScore: number;
  rating: number;
  reviews: number;
  isVerified: boolean;
  certifications: string[];
};

type FilterOptions = {
  category: string;
  certification: string;
  minEcoScore: number;
  minPrice: number;
  maxPrice: number;
  minRating: number;
};

const EcoShopping = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<FilterOptions>({
    category: '',
    certification: '',
    minEcoScore: 0,
    minPrice: 0,
    maxPrice: 10000,
    minRating: 0,
  });

  // Filter products based on the current filter settings
  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
  
    return productsData.filter((product) => {
      const matchesCategory =
        !filter.category ||
        product.category.toLowerCase() === filter.category.toLowerCase();
  
      const matchesCertification =
        !filter.certification ||
        (Array.isArray(product.certifications) &&
          product.certifications.some(cert => 
            cert.toLowerCase().includes(filter.certification.toLowerCase())
          ));
  
      const matchesEcoScore =
        typeof filter.minEcoScore === 'number'
          ? product.ecoScore >= filter.minEcoScore
          : true;
  
      const matchesPriceRange =
        typeof filter.minPrice === 'number' && typeof filter.maxPrice === 'number'
          ? product.price >= filter.minPrice && product.price <= filter.maxPrice
          : true;
  
      const matchesRating =
        typeof filter.minRating === 'number'
          ? product.rating >= filter.minRating
          : true;
  
      const matchesSearchQuery =
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query);
  
      return (
        matchesCategory &&
        matchesCertification &&
        matchesEcoScore &&
        matchesPriceRange &&
        matchesRating &&
        matchesSearchQuery
      );
    });
  }, [
    filter.category,
    filter.certification,
    filter.minEcoScore,
    filter.minPrice,
    filter.maxPrice,
    filter.minRating,
    searchQuery
  ]);
 
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  }

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  }

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  }
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-8">
      <header className="bg-white shadow-sm rounded-xl">
        <div className="container mx-auto p-2 lg:py-3 lg:px-3 flex items-center space-x-1 lg:space-x-4">
          <div>
            <Button className="rounded-xl lg:p-1 hover:bg-gray-200 transition-colors">
              <ArrowLeft className="text-gray-500 h-5 w-5"/>
            </Button>
          </div>
          <div className="">
            <h1 className="font-semibold text-xl lg:text-xl">Sustainable Shopping</h1>
            <p className="text-gray-600 text-xs lg:text-lg">Find eco-friendly products for your lifestyle</p>
          </div>
        </div>
      </header>

      {/* Search bar */}
      <div className="container mx-auto mt-4 px-2 flex">
        <div className="flex-1 relative">
          <Search className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2"/>
          <input 
            type="search" 
            placeholder="Search for products or brands..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          className="bg-white rounded-xl hover:bg-emerald-300 transition-colors flex p-1 items-center ml-3 gap-3 px-3" 
          onClick={toggleFilter}
        >
          <SlidersHorizontal className="h-5 w-5" />
          Filters
        </Button>
      </div>

      {/* Product Listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={() => handleViewDetails(product)}
              />
            ))}
          </div>
        ) : (
          <Button
            className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
            onClick={() => {
              setFilter({
                category: '',
                certification: '',
                minEcoScore: 0,
                minPrice: 0,
                maxPrice: 10000,
                minRating: 0,
              });
              setSearchQuery(""); 
            }}
          >
            Clear Filter
          </Button>
        )}
      </div>

      {/* Product details */}
      {selectedProduct && (<ProductDetails product={selectedProduct} onClose={handleCloseDetails}/>)}

      {/* filter */}
      {showFilter && (<ProductFilter filter={filter} setFilter={setFilter} onClose={() => setShowFilter(false)}/>)}
    </div>
  )
}

export default EcoShopping