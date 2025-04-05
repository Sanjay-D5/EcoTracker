import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "../Button";

interface SortOption{
  id: string,
  name: string,
  icon: string
} 

interface SortOptionsProps {
  selectedSort: string;
  onSelectedSort: (sort: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({selectedSort, onSelectedSort}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions: SortOption[] = [
    { id: 'popular', name: 'Most Popular', icon: '📈' },
    { id: 'new', name: 'Newest First', icon: '🆕' },
    { id: 'duration-asc', name: 'Shortest Duration', icon: '⏱️' },
    { id: 'duration-desc', name: 'Longest Duration', icon: '⏳' },
  ]

  const selectedOption = sortOptions.find(option => option.id === selectedSort);
  const selectedOptionName = selectedOption?.name || 'Sort By'; 

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node))
      {
        setIsOpen(false);
      }
    };

    if(isOpen){
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSortSelection = (sortId: string) => {
    onSelectedSort(sortId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
       className="flex items-center bg-white px-3 py-2 border border-gray-400 rounded-lg hover:bg-gray-50 font-medium transition-colors"
       onClick={() => setIsOpen(!isOpen)}
      >
       <span>Sort: {selectedOptionName}</span> <ChevronDown className="h-4 w-4 ml-1"/>
      </Button>

      {isOpen && (
        <div className="absolute bg-white w-64 mt-2 py-2 rounded-lg shadow-md border border-gray-200 z-10">
          {sortOptions.map((option) => (
            <Button 
              className={`w-full text-left py-2 px-3 hover:bg-gray-100 transition-colors ${selectedSort === option.id ? 'bg-gray-100 font-medium' : ''}` }
              key={option.id}
              onClick={() => 
                handleSortSelection(option.id)
              }  
            >
              <span className="mr-2">{option.icon}</span>
              {option.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortOptions;