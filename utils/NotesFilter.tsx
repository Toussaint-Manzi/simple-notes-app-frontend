interface FilterProps {
    selectedFilters: string[];
    onFilterChange: (filters: string[]) => void;
  }
  
  export default function NoteFilters({ selectedFilters, onFilterChange }: FilterProps) {
    const filters = ['All', 'personal', 'work', 'finances', 'others'];
  
    const handleFilterClick = (filter: string) => {
      if (filter === 'All') {
        onFilterChange(['All']);
        return;
      }
  
      let newFilters = [...selectedFilters];
      if (selectedFilters.includes('All')) {
        newFilters = [filter];
      } else if (selectedFilters.includes(filter)) {
        newFilters = newFilters.filter(f => f !== filter);
        if (newFilters.length === 0) newFilters = ['All'];
      } else {
        newFilters = [...newFilters.filter(f => f !== 'All'), filter];
      }
      
      onFilterChange(newFilters);
    };
  
    return (
      <div className="flex gap-2 mb-4 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize
              ${
                selectedFilters.includes(filter)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {filter}
          </button>
        ))}
      </div>
    );
  }
