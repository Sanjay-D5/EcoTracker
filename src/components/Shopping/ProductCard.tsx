import Button from '../Button';
import { Heart, Leaf, ShoppingBag, Star, Verified } from 'lucide-react';

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
    onViewDetails: () => void;
}

const ProductCard = ({product, onViewDetails}: ProductCardProps) => {
    
  return (
    <div className='bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow'>
        <div className='relative'>
            <img src={product.image} alt="image" className='w-full h-48 object-cover'/>
            <Button className='bg-white/80 rounded-full absolute top-2 right-2 p-1 backdrop-blur-sm'>
                <Heart className='h-5 w-5 text-gray-500'/>
            </Button>
        </div>
        <div className='p-5 space-y-1'>
    
            <div className='flex items-center gap-3'>
                <span className='font-semibold text-sm text-gray-600'>{product.brand}</span>
                {product.isVerified && ( <Verified className='h-5 w-5 text-emerald-600'/> )}
            </div>
            <h2 className='text-[20px] font-semibold'>{product.name}</h2>
            <div className='flex space-x-2 text-sm'>
                <span className='flex items-center space-x-2'>
                    <Star className='fill-yellow-300 h-4 w-4 text-yellow-400'/>
                    <span>{product.rating}</span>
                </span>
                <span className='text-gray-500'>({product.reviews})</span>
            </div>
            <div className='flex flex-col space-x-3 text-lg'>
                <div className='flex items-center space-x-2'>
                    <Leaf className='h-3 w-3 text-emerald-500'/>
                    <span className='text-emerald-600 text-xs'>{product.ecoScore}% Sustainable</span>
                </div>
                <div className='font-semibold'>₹{product.price}</div>
            </div>
            
           <Button className='bg-emerald-500 text-white hover:bg-emerald-600 flex items-center justify-center gap-2 w-full rounded-md'  onClick={onViewDetails}>
                <ShoppingBag className='h-5 w-5'/>
                View Details
            </Button> 
        </div> 
    </div>
  )
}

export default ProductCard