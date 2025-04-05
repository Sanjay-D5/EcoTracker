import { Heart, Leaf, ShoppingBag, Star, Verified, X } from "lucide-react";
import Button from "../Button";

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

type ProductCardProps = {
  product: Product;
  onClose: () => void;
}

const ProductDetails = ({product, onClose}: ProductCardProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4 ">
        <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full">
          <div className="relative">
            <img src={product.image} alt={product.name} className="h-64 w-full object-cover rounded-t-xl"/>
            <Button className="absolute top-4 right-4 bg-white/50 backdrop-blur-sm rounded-full z-50 hover:bg-white transition-colors" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-4 lg:p-6 space-y-1">
            <div className='flex items-center gap-3'>
              <span className='font-semibold text-base text-gray-600'>{product.brand}</span>
              {product.isVerified && ( <Verified className='h-5 w-5 text-emerald-600'/> )}
            </div>
            <h2 className='text-xl font-semibold'>{product.name}</h2>
            <div className='flex space-x-2'>
              <span className='flex items-center space-x-2'>
                <Star className='fill-current h-4 w-4 text-yellow-400'/>
                <span>{product.rating}</span>
              </span>
              <span className='text-gray-500'>({product.reviews})</span>
              <span className='flex items-center gap-1 text-sm'>
                <Leaf className='h-4 w-4 lg:h-5 lg:w-5 text-emerald-500'/>
                <span className='text-emerald-600'>{product.ecoScore}% Sustainable</span>
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-sm lg:text-base text-gray-600">This product is made with sustainable materials and eco-friendly manufacturing processes.
              It features organic materials and plastic-free packaging.</p>
              <div>
                <h3 className="font-semibold mb-2">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert) => (
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-2xl text-sm">{cert}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-3">
              <span className="font-bold text-xl">₹{product.price}</span>
              <div className="flex gap-2">
                <Button className="p-1 lg:p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className='h-5 w-5 lg:h-7 lg:w-7 text-gray-500'/>
                </Button>
                <Button className="px-5 py-2 lg:px-6 lg:py-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition flex items-center gap-2">
                  <ShoppingBag className='h-5 w-5'/>
                  Buy now
                </Button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ProductDetails;