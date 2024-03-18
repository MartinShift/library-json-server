import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Book } from '../types';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { updateItem, getItem } from '../api';

const EditBookForm: React.FC = () => {

const { id = '' } = useParams();

const navigate = useNavigate();
const [title, setTitle] = useState<string>('');
const [author, setAuthor] = useState<string>('');
const [publishedDate, setPublishedDate] = useState<string>('');
const [file, setFile] = useState<File | null>(null);
const [image, setImage] = useState<string>("");
const [newDate, setNewDate] = useState<Date | null>(null);

const [titleError, setTitleError] = useState<string>('');
const [authorError, setAuthorError] = useState<string>('');
const [publishedDateError, setPublishedDateError] = useState<string>('');

  const validate = () => {
    setTitleError(title.length > 0 && title.length <= 40 ? '' : 'Title must be less than 40 characters and not empty');
    setAuthorError(author.length > 0 && author.length <= 50 ? '' : 'Author must be less than 50 characters and not empty');
    setPublishedDateError(publishedDate ? '' : 'Published date is required');
  };

  useEffect(() => {
    getItem(id).then(response => {
      const book = response.data;
      setTitle(book.title);
      setAuthor(book.author);
      setPublishedDate(book.publishedDate);
      setImage(book.imageUrl);
    });
  }, [id]);

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
        imageUrl = "/images/" + file.name;
      }
    }
    else imageUrl = image;

    const updatedBook: Book = {
      id,
      title,
      author,
      imageUrl,
      publishedDate: publishedDate
    };


    updateItem(id, updatedBook).then(() => {
      navigate('/');
    });
  };

  useEffect(() => {
    validate();
  });

  const handleDateChange = (date: Date) => {
    setNewDate(date);
    setPublishedDate(date.toISOString().split('T')[0]);

  }


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

      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Published Date</label>
        <DatePicker
          selected={newDate}
          onChange={handleDateChange}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
        />
        {publishedDateError && <p className="text-red-500">{publishedDateError}</p>}
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Update Book
      </button>
    </form>
  );
};

export default EditBookForm;