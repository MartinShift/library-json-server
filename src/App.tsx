import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link,Routes } from 'react-router-dom';
import { Book } from './types';
import Filter from './components/Filter';
import Sort from './components/Sort';
import BookList from './components/Booklist';
import AddBookForm from './components/AddBookForm';
import { getItems, createItem, deleteItem } from './api.ts';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditBookForm from './components/EditBookForm.tsx';

function App() {


  const [books, setBooks] = useState<Book[]>([]);
  const [filterText, setFilterText] = useState(''); 
  const [sortType, setSortType] = useState('title'); 
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    getItems().then(response => {
      setBooks(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    const sortedBooks = [...books];

    if (sortType === 'title') {
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === 'author') {
      sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortType === 'publishedDate') {
      sortedBooks.sort((a, b) => a.publishedDate.localeCompare(b.publishedDate));
    }

    setFilteredBooks(
      sortedBooks.filter((book) =>
        book.title.toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [books, filterText, sortType]);

  const addBook = (book: Book) => {
      createItem(book).then(response => {
      setBooks([...books, response.data]);
    });
  };
  
  const deleteBook = (id: string) => {
    deleteItem(id).then(() => {
      setBooks(books.filter((book: Book) => book.id !== id));
    });
  };
  
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4">
          <ul className="flex">
            <li className="mr-4"><Link to="/" className="text-blue-500 hover:text-blue-700">Books</Link></li>
            <li><Link to="/add-book" className="text-blue-500 hover:text-blue-700">Add Book</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={
            <>
              <Filter filterText={filterText} onFilterTextChange={setFilterText} />
              <Sort sortType={sortType} onSortTypeChange={setSortType} />
              <BookList books={filteredBooks} deleteBook={deleteBook} />
            </>
          } />
          <Route path="/add-book" element={<AddBookForm addBook={addBook} />} />
          <Route path="/edit-book/:id" element={<EditBookForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;