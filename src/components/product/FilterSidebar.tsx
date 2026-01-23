import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

type FilterSidebarProps = {
  categories: string[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  sliderRange: number[];
  handleChange: (_event: Event, newValue: number[]) => void;
  clearFilters: () => void;
  priceRange: { min: number; max: number } | null;
};

export default function FilterSidebar({
  categories,
  selectedCategories,
  toggleCategory,
  sliderRange,
  handleChange,
  clearFilters,
  priceRange,
}: FilterSidebarProps) {
  return (
    <div>
      {/* Price Slider */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <span className="font-semibold text-gray-700">Price Range:</span>
        <Box sx={{ width: '91%', ml: 1.3 }}>
          <Slider
            getAriaLabel={() => 'Price range'}
            value={sliderRange}
            min={priceRange?.min ?? 0}
            max={priceRange?.max ?? 0}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={(val: number) => `৳${val}`}
            disabled={!priceRange}
          />
          <div className="text-sm mt-1">
            Min: ৳{sliderRange[0]} | Max: ৳{sliderRange[1]}
          </div>
        </Box>
      </div>
      {/* Category Filters */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <span className="font-semibold text-gray-700">Categories:</span>
        <div className="flex flex-col gap-2 mt-2">
          {categories.map((category: string) => (
            <label
              key={category}
              className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded cursor-pointer hover:bg-gray-200"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                aria-checked={selectedCategories.includes(category)}
                aria-label={`Filter by category ${category}`}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        aria-label="Clear all filters"
        className="cursor-pointer w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
      >
        Clear Filters
      </button>
    </div>
  );
}
