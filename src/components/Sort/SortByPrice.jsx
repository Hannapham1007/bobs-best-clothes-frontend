import React from 'react';

function SortByPrice({ setFilterPrice }) {


  const handleSortChange = (e) => {
        const sortType = e.target.value;
        setFilterPrice(sortType);
  };

  return (
    <div>
      <select
        className="form-select"
        onChange={handleSortChange}
        style={{
          width: '180px',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
          padding: '6px 12px',
        }}
      >
        <option value="">SORT BY</option>
        <option value="lowest">Price: Low to High</option>
        <option value="highest">Price: High to Low</option>
      </select>
    </div>
  );
}

export default SortByPrice;
