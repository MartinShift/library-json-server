import { SortProps } from '../types';
import React from 'react';

const Sort: React.FC<SortProps> = ({ sortType, onSortTypeChange }) => {
  return (
    <select
      value={sortType}
      onChange={(e) => onSortTypeChange(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="title">Sort by title</option>
      <option value="author">Sort by author</option>
      <option value="publishedDate">Sort by published date</option>
    </select>
  );
};

export default Sort;