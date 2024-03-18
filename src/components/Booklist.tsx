// BookList.tsx
import React from 'react';
import { BookListProps } from '../types';
import Book from './Book';

const BookList: React.FC<BookListProps> = ({ books, deleteBook }) => {
  return (
    <div className="mt-4">
          <div className="mb-2 p-2 border rounded row gap-3">
       {books.map((book) => (
        <Book key={book.id} book={book} deleteBook={deleteBook} />
      ))}
      </div>
    </div>
  );
};

export default BookList;