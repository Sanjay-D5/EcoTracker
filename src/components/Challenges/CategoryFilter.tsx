import React from 'react'
import Button from '../Button';

interface Category{
  id: string,
  name: string,
  icon: string
}

interface CategoryFilterProps {
  selectedCategory: string,
  onSelectedCategory: (category: string) => void,
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({selectedCategory, onSelectedCategory}) => {
  const categories: Category[] = [
    { id: 'all', name: 'All Challenges', icon: '🌱' },
    { id: 'environmental', name: 'Environmental', icon: '🌍' },
    { id: 'waste', name: 'Waste Reduction', icon: '🚯' },
    { id: 'transport', name: 'Sustainable Transport', icon: '🚲' },
    { id: 'food', name: 'Eco-Friendly Eating', icon: '🍽️' },
    { id: 'energy', name: 'Energy Conservation', icon: '⚡' },
  ];

  return (
    <div className='hidden lg:flex flex-wrap gap-2 md:gap-3'>
      {categories.map((category) => (
        <Button 
          key={category.id}
          onClick={() => onSelectedCategory(category.id)}
          className={`px-3 py-2 rounded-full text-sm md:text-base font-medium flex items-center transition-colors duration-200 ${
            selectedCategory === category.id
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className='mr-2'>{category.icon}</span>{category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;