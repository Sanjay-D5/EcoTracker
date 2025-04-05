import Button from '../Button'
import { X } from 'lucide-react'

// Add proper type for the filter props
type FilterOptions = {
  category: string;
  certification: string;
  minEcoScore: number;
  minPrice: number;
  maxPrice: number;
  minRating: number;
};

type ProductFilterProps = {
  filter: FilterOptions;
  setFilter: (filter: FilterOptions) => void;
  onClose: () => void;
}

const ProductFilter = ({filter, setFilter, onClose}: ProductFilterProps) => {
  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50'>
      <div className='fixed inset-y-20 lg:inset-y-0 right-0 bg-white w-full max-w-80 max-h-[28rem] lg:max-w-sm lg:max-h-screen shadow-lg'>
        <div className='py-3 flex justify-between items-center border-b-2 border-gray-200 p-4'>
          <h1 className='font-semibold text-xl'>Filter</h1>
          <Button className='p-2 rounded-full z-50 bg-white hover:bg-gray-300' onClick={onClose}>
            <X className='h-5 w-5 text-gray-600' /> 
          </Button>
        </div>
        <div className='space-y-2 lg:space-y-3 p-4 overflow-y-auto max-h-[calc(100%-8rem)]'>
          <div>
            <label htmlFor="category" className='block text-gray-700 mb-2 font-medium'>Category</label>
            <select 
            id='category'
            className='w-full rounded-sm border-gray-300 focus:border-emerald-500 focus:ring-emerald-500' 
            value={filter.category} 
            onChange={(e) => setFilter({...filter, category: e.target.value})}
            >
              <option value="all Categories">All Categories</option>
              <option value="clothing">Clothing</option>
              <option value="beauty">Beauty</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
          <div>
            <label htmlFor='ecoScore' className='block text-gray-700 mb-2 font-medium'>Minimum Eco Score</label>
            <input 
              id='ecoScore'
              type='range' 
              min='0' 
              max='100' 
              className='w-full h-2 rounded-sm bg-gray-200 accent-emerald-500 cursor-pointer appearance-none' value={filter.minEcoScore} 
              onChange={(e) => setFilter({...filter, minEcoScore: parseInt(e.target.value)})}
            />
            <span className='text-gray-600 mt-2 text-sm lg:text-base'>{filter.minEcoScore}% or higher</span>
          </div>
          <div>
            <label htmlFor='priceRange' className='block text-gray-700 mb-2 font-medium'>Price Range</label>
            <div className='flex items-center gap-2'>
              <input 
                type="number" 
                value={filter.minPrice} 
                onChange={(e) => setFilter({...filter, minPrice: parseInt(e.target.value) || 0})} placeholder="Min" name="minPrice" id="minPrice" className='w-full rounded-sm border-gray-300 focus:border-emerald-500 focus:ring-emerald-500'
              />
              <span className="text-gray-500">to</span>
              <input 
              type="number" 
              name="maxPrice" 
              id="maxPrice" 
              placeholder='Max' 
              value={filter.maxPrice} 
              onChange={(e) => setFilter({...filter, maxPrice: parseInt(e.target.value) || 0})} className='w-full rounded-sm border-gray-300 focus:border-emerald-500 focus:ring-emerald-500'
              />
            </div>
          </div>
          <div>
            <label htmlFor="rating" className='block text-gray-700 mb-2 font-medium' >Minimum rating</label>
            <div className='flex gap-2'>
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button 
                key={rating} 
                onClick={() => setFilter({...filter, minRating: rating})} className={`p-1 lg:p-3 rounded-lg ${filter.minRating === rating ? 'bg-emerald-400 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} 
                >
                  {rating}★
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className='absolute bottom-0 w-full p-2 lg:p-4 bg-white border-t'>
          <Button className='w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition' onClick={onClose}>Apply Filters</Button>
        </div>
      </div>
    </div>
  )
}

export default ProductFilter