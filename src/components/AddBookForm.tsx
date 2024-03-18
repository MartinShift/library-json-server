import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Book } from '../types';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

interface AddBookFormProps {
  addBook: (book: Book) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ addBook }) => {

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState<Date | null>(null);
  const [file, setFile] = useState<File | null>(null);
 

  const [titleError, setTitleError] = useState('');
  const [authorError, setAuthorError] = useState('');
  const [publishedDateError, setPublishedDateError] = useState('');
  const [imageError, setImageError] = useState('');

  const validate = () => {
    setTitleError(title.length > 0 && title.length <= 40 ? '' : 'Title must be less than 40 characters and not empty');
    setAuthorError(author.length > 0 && author.length <= 50 ? '' : 'Author must be less than 50 characters and not empty');
    setPublishedDateError(publishedDate ? '' : 'Published date is required');
    setImageError(file ? '' : 'Image is required');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validate();

    if (titleError || authorError || publishedDateError) {
      return;
    }

    let imageUrl = '';
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:3000/upload.php', {
        method: 'POST',
        body: formData,
      });

      if(response.ok) {
      console.log(response);
      imageUrl = "/images/" + file.name;
      }
    }

    const newBook: Book = {
      id: Date.now().toString(),
      title,
      author,
      imageUrl,
      publishedDate: publishedDate!.toISOString().split('T')[0],
    };

    addBook(newBook);
    navigate('/');
  };
  useEffect(() => {
    validate();
  });

   return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
        />
        {titleError && <p className="text-red-500">{titleError}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
        />
        {authorError && <p className="text-red-500">{authorError}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Image</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="mt-1"
        />
          {imageError && <p className="text-red-500">{imageError}</p>}
     
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Published Date</label>
        <DatePicker
          selected={publishedDate}
          onChange={(date: Date) => setPublishedDate(date)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
        />
        {publishedDateError && <p className="text-red-500">{publishedDateError}</p>}
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;