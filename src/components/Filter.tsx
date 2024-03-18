import React from 'react';
import { FilterProps } from '../types';

const Filter: React.FC<FilterProps> = ({ filterText, onFilterTextChange }) => {
  return (
    <input
      type="text"
      placeholder="Filter by title"
      value={filterText}
      onChange={(e) => onFilterTextChange(e.target.value)}
      className="border p-2 rounded"
    />
  );
};

export default Filter;